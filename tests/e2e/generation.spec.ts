import { test, expect } from "@playwright/test";
import { mockApi, shot, JOB_ID, SB_ID } from "./mockApi";

const IDEA = "3 habits that doubled my morning focus as a solo creator";

async function startGeneration(page: import("@playwright/test").Page) {
  await page.goto("/dashboard/create");
  await page.getByLabel("Your video idea").fill(IDEA);
  await page.getByRole("button", { name: "Generate shoot plan" }).click();
}

test("create: progress is shown in plain words, then the shoot plan opens", async ({ page }) => {
  const api = await mockApi(page, {
    jobSteps: [
      { status: "queued", progress: 0 },
      { status: "running", progress: 15 },
      { status: "running", progress: 45 },
      { status: "running", progress: 45 },
      { status: "completed", progress: 100 },
    ],
  });
  await startGeneration(page);

  // The job id goes in the URL so a refresh can resume, but never on screen.
  await expect(page).toHaveURL(new RegExp(`job=${JOB_ID}`));
  await expect(page.locator("main").getByRole("status")).toContainText(/Planning your scenes/i);
  await shot(page, "01-create-progress");
  await expect(page.locator("body")).not.toContainText(JOB_ID.slice(0, 8));

  await expect(page).toHaveURL(new RegExp(`/dashboard/storyboards/${SB_ID}`), { timeout: 20_000 });
  expect(api.generateCalls).toHaveLength(1);
  expect(api.generateCalls[0]).toMatchObject({ idea: IDEA, platform: "reels" });
});

test("refresh during generation resumes progress instead of losing it", async ({ page }) => {
  const api = await mockApi(page, { jobSteps: [{ status: "running", progress: 15 }] });
  await startGeneration(page);
  await expect(page).toHaveURL(/job=/);
  await expect(page.locator("main").getByRole("status")).toContainText(/Planning your scenes/i);

  await page.reload();
  // Still generating after the reload: no blank form.
  await expect(page.locator("main").getByRole("status")).toContainText(/Planning your scenes/i);
  await expect(page.getByLabel("Your video idea")).toHaveCount(0);
  await shot(page, "02-after-refresh");

  api.setJobSteps([{ status: "completed", progress: 100 }]);
  await expect(page).toHaveURL(new RegExp(`/dashboard/storyboards/${SB_ID}`), { timeout: 20_000 });
  expect(api.generateCalls).toHaveLength(1); // the reload did not start (and charge) a second run
});

test("failure: shows a clear message and Try again resubmits the same inputs", async ({ page }) => {
  const api = await mockApi(page, {
    jobSteps: [
      { status: "running", progress: 15 },
      { status: "failed", progress: 15, error_message: "Something went wrong while generating. Your credits were refunded." },
    ],
  });
  await startGeneration(page);
  const alert = page.locator("main").getByRole("alert");
  await expect(alert).toContainText("Your credits were refunded");
  await shot(page, "03-failed");

  api.setJobSteps([{ status: "completed", progress: 100 }]);
  await page.getByRole("button", { name: "Try again" }).click();
  await expect(page).toHaveURL(new RegExp(`/dashboard/storyboards/${SB_ID}`), { timeout: 20_000 });
  expect(api.generateCalls).toHaveLength(2);
  // Retry uses the stored storyboard's inputs (works even after a refresh).
  expect(api.generateCalls[1]).toMatchObject({ idea: expect.any(String), duration: 30, faceless: true });
});

test("client timeout: after 5 minutes says it is still working, with options", async ({ page }) => {
  await page.clock.install();
  await mockApi(page, { jobSteps: [{ status: "running", progress: 15 }] });
  await startGeneration(page);
  await expect(page.locator("main").getByRole("status")).toContainText(/Planning your scenes/i);

  await page.clock.fastForward("05:30");
  await expect(page.getByText(/still working/i)).toBeVisible();
  await expect(page.getByRole("button", { name: "Keep waiting" })).toBeVisible();
  await expect(page.getByRole("link", { name: /check later/i })).toBeVisible();
  await shot(page, "04-timeout");
});

test("polling backs off instead of hammering the API every 2 seconds", async ({ page }) => {
  await page.clock.install();
  const api = await mockApi(page, { jobSteps: [{ status: "running", progress: 15 }] });
  await startGeneration(page);
  await expect(page.locator("main").getByRole("status")).toContainText(/Planning/i);
  const before = api.jobPolls;
  await page.clock.runFor(120_000);
  const polls = api.jobPolls - before;
  // A fixed 2s interval would poll 60 times in 2 minutes; backoff to 10s caps it near 15.
  expect(polls).toBeGreaterThan(5);
  expect(polls).toBeLessThan(25);
});

test("cancel: a waiting generation can be cancelled", async ({ page }) => {
  const api = await mockApi(page, { jobSteps: [{ status: "queued", progress: 0 }] });
  await startGeneration(page);
  await page.getByRole("button", { name: "Cancel generation" }).click();
  await expect(page.locator("main").getByRole("alert")).toContainText(/cancelled/i);
  expect(api.cancelCalls).toBe(1);
});

test("validation errors from the API appear next to the right field", async ({ page }) => {
  await mockApi(page, {
    generateError: {
      status: 422,
      body: {
        detail: "Please fix the highlighted fields.",
        code: "validation_error",
        errors: { idea: "Idea must be at least 10 characters.", location: "Location must be at most 120 characters." },
      },
    },
  });
  await page.goto("/dashboard/create");
  await page.getByLabel("Your video idea").fill("short idea");
  await page.getByRole("button", { name: "Generate shoot plan" }).click();

  const idea = page.getByLabel("Your video idea");
  await expect(idea).toHaveAttribute("aria-invalid", "true");
  await expect(page.locator("#idea-error")).toHaveText("Idea must be at least 10 characters.");
  // The location field lives in the optional section; it opens to show its error.
  await expect(page.locator("#location-error")).toHaveText("Location must be at most 120 characters.");
  await shot(page, "05-validation");
});

test("non-field API errors (no credits) are shown as a message, form kept", async ({ page }) => {
  await mockApi(page, {
    generateError: { status: 402, body: { detail: "You're out of credits.", code: "insufficient_credits", credits: 0 } },
  });
  await startGeneration(page);
  await expect(page.locator("main").getByRole("alert")).toContainText("You're out of credits.");
  await expect(page.getByLabel("Your video idea")).toHaveValue(IDEA);
});
