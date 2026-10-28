import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mockApi, shot, JOB_ID, SB_ID } from "./mockApi";

// Words that describe our plumbing, not the creator's work.
const JARGON = /\bjob id\b|\bqueue[ds]?\b|\bworker\b|enqueue|\buuid\b|\bpipeline\b|\bLLM\b|AI Director|\bnode\b/i;

test("401: an expired session sends you to sign in with an explanation and a way back", async ({ page }) => {
  await mockApi(page, { unauthorized: true });
  await page.goto(`/dashboard/storyboards/${SB_ID}`);
  await expect(page).toHaveURL(/\/sign-in\?/);
  const url = new URL(page.url());
  expect(url.searchParams.get("expired")).toBe("1");
  expect(url.searchParams.get("next")).toBe(`/dashboard/storyboards/${SB_ID}`);
  await expect(page.getByText(/session expired/i)).toBeVisible();
  await shot(page, "12-session-expired");
});

test("history page uses creator words: no job ids, queues or workers", async ({ page }) => {
  await mockApi(page);
  await page.goto("/dashboard/jobs");
  await expect(page.getByText("Morning focus routine")).toBeVisible();
  const text = await page.locator("main").innerText();
  expect(text).not.toMatch(JARGON);
  expect(text).not.toContain(JOB_ID.slice(0, 8));
  await expect(page.getByText(/Failed/).first()).toBeVisible();
  await expect(page.getByText(/Ready/).first()).toBeVisible();
  await shot(page, "13-history");
});

test("create page while generating has no jargon", async ({ page }) => {
  await mockApi(page, { jobSteps: [{ status: "queued", progress: 0 }] });
  await page.goto("/dashboard/create");
  expect(await page.locator("main").innerText()).not.toMatch(JARGON);
  await page.getByLabel("Your video idea").fill("3 habits that doubled my morning focus");
  await page.getByRole("button", { name: "Generate shoot plan" }).click();
  await expect(page.locator("main").getByRole("status")).toContainText(/Waiting to start|Getting started/i);
  expect(await page.locator("main").innerText()).not.toMatch(JARGON);
});

test("offline banner appears when the browser goes offline", async ({ page, context }) => {
  await mockApi(page);
  await page.goto("/dashboard/storyboards");
  await context.setOffline(true);
  await expect(page.getByText(/you.re offline/i)).toBeVisible();
  await context.setOffline(false);
  await expect(page.getByText(/you.re offline/i)).toHaveCount(0);
});

for (const [name, path] of [
  ["create", "/dashboard/create"],
  ["storyboard", `/dashboard/storyboards/${SB_ID}`],
  ["history", "/dashboard/jobs"],
  ["storyboards list", "/dashboard/storyboards"],
] as const) {
  test(`accessibility (axe, serious+critical): ${name}`, async ({ page }) => {
    await mockApi(page);
    await page.goto(path);
    // Wait for data to render (Next dev keeps a socket open, so no networkidle).
    await page.locator("main h1").first().waitFor();
    await page.waitForTimeout(500);
    const results = await new AxeBuilder({ page }).include("main").analyze();
    const bad = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
    expect(bad.map((v) => `${v.id}: ${v.nodes.length} (${v.nodes[0]?.target})`)).toEqual([]);
  });
}

test("home and storyboards list show an error (not 'no storyboards') when loading fails", async ({ page }) => {
  await mockApi(page);
  await page.route("http://api.grovii.test/storyboards", (r) =>
    r.fulfill({ status: 500, contentType: "application/json", body: '{"detail":"Internal error"}' }));
  await page.goto("/dashboard/storyboards");
  await expect(page.locator("main").getByRole("alert")).toContainText(/couldn.t load/i);
  await expect(page.getByText(/No storyboards yet/i)).toHaveCount(0);
  await page.goto("/dashboard");
  await expect(page.locator("main").getByRole("alert")).toContainText(/couldn.t load/i);
});

test("history is reachable from the sidebar", async ({ page }) => {
  await mockApi(page);
  await page.goto("/dashboard");
  await page.getByRole("link", { name: "Generations" }).click();
  await expect(page).toHaveURL(/\/dashboard\/jobs/);
});
