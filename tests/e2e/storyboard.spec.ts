import { test, expect } from "@playwright/test";
import { mockApi, shot, SB_ID, API } from "./mockApi";

const URL_ = `/dashboard/storyboards/${SB_ID}`;

test("repurpose tab renders the real API output, with an empty state", async ({ page }) => {
  await mockApi(page);
  await page.goto(URL_);
  await page.getByRole("tab", { name: /Repurpose/ }).click();
  const panel = page.getByRole("tabpanel");
  for (const text of ["REAL-LINKEDIN", "REAL-X", "REAL-CAROUSEL", "REAL-NEWSLETTER"]) {
    await expect(panel).toContainText(text);
  }
  await expect(panel).toContainText(/No blog post was generated/i);
  // The old hardcoded copy is gone.
  await expect(panel).not.toContainText("Most creators overcomplicate their pre-production");
  await shot(page, "06-repurpose");
});

test("repurpose tab with no output at all shows one empty state", async ({ page }) => {
  await mockApi(page, { storyboard: { repurpose: null } });
  await page.goto(URL_);
  await page.getByRole("tab", { name: /Repurpose/ }).click();
  await expect(page.getByRole("tabpanel")).toContainText(/No repurposed posts/i);
});

test("music shows why it fits and that it is an unverified style reference", async ({ page }) => {
  await mockApi(page);
  await page.goto(URL_);
  await page.getByRole("tab", { name: /Audio/ }).click();
  const panel = page.getByRole("tabpanel");
  await expect(panel).toContainText("Calm build matches the slow push-in.");
  await expect(panel).toContainText(/Style reference, not verified/i);
  await expect(panel).toContainText("Commercial accounts: use the royalty-free alternative.");
  await shot(page, "07-music");
});

test("posting tips (trends) are shown", async ({ page }) => {
  await mockApi(page);
  await page.goto(URL_);
  await page.getByRole("tab", { name: /Posting tips/ }).click();
  const panel = page.getByRole("tabpanel");
  await expect(panel).toContainText("Weekdays 7-9am");
  await expect(panel).toContainText("Few creators show the paper planner up close");
  await shot(page, "08-posting-tips");
});

test("Phase D details: timestamps, chosen example, constraints and partial warning", async ({ page }) => {
  await mockApi(page, {
    storyboard: { status: "partial", status_reason: "Some parts are missing: hashtags. Everything else is ready." },
  });
  await page.goto(URL_);
  await expect(page.getByText("0:00–0:06")).toBeVisible();
  await expect(page.getByText("0:06–0:30")).toBeVisible();
  await expect(page.getByText("A 6am desk routine with a paper planner")).toBeVisible();
  await expect(page.getByText(/Faceless/)).toBeVisible();
  await expect(page.getByText("Some parts are missing: hashtags. Everything else is ready.")).toBeVisible();
  await shot(page, "09-phase-d-details");
});

const XSS = [
  `<script>window.__xss = 1</script>`,
  `<img src=x onerror="window.__xss = 2">`,
  `"><svg onload="window.__xss = 3">`,
];

test("XSS: script tags in generated and user text render as plain text", async ({ page }) => {
  let dialog = false;
  page.on("dialog", (d) => { dialog = true; void d.dismiss(); });
  await mockApi(page, {
    storyboard: {
      title: XSS[0], idea: XSS[1], hook: XSS[1], script: XSS.join(" "), brief_choice: XSS[2],
      status_reason: XSS[0],
      scenes: [{ id: "x1", scene_number: 1, title: XSS[0], duration: "30", start_seconds: 0, end_seconds: 30,
        what_to_show: XSS[1], voiceover_example: XSS[2], onscreen_text: XSS[0], tips: XSS[1] }],
      captions: [{ id: "c", caption: XSS[1] }],
      hashtags: [{ id: "h", hashtag: XSS[2] }],
      music: [{ id: "m", song_name: XSS[0], artist: XSS[1], why_fits: XSS[2], licensing_note: XSS[0] }],
      trends: [{ id: "t", posting_time: XSS[0], editing_style: XSS[1], content_gap: XSS[2] }],
      repurpose: { id: "r", linkedin: XSS[0], twitter: XSS[1], carousel: XSS[2], blog: XSS[0], newsletter: XSS[1] },
    },
  });
  await page.goto(URL_);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(XSS[0]);
  for (const tab of ["Scenes", "Script", "Shot list", "Audio", "Captions", "Posting tips", "Repurpose"]) {
    await page.getByRole("tab", { name: new RegExp(tab) }).click();
    await expect(page.getByRole("tabpanel")).toBeVisible();
  }
  await expect(page.getByRole("tabpanel")).toContainText(XSS[1]); // shown literally
  expect(await page.evaluate(() => (window as unknown as { __xss?: number }).__xss)).toBeUndefined();
  expect(await page.locator('img[src="x"], svg[onload]').count()).toBe(0);
  expect(dialog).toBe(false);
  await shot(page, "10-xss-as-text");
});

test("shot list works with the keyboard", async ({ page }) => {
  await mockApi(page);
  await page.goto(URL_);
  await page.getByRole("tab", { name: /Shot list/ }).click();
  const first = page.getByRole("checkbox").first();
  await first.focus();
  await page.keyboard.press("Space");
  await expect(first).toBeChecked();
  await expect(page.getByRole("tabpanel")).toContainText("1 of 2 recorded");
});

test("offline: a plan opened before still loads from the saved copy", async ({ page }) => {
  await mockApi(page);
  await page.goto(URL_);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Morning focus routine");

  // Now the network drops: the storyboard request fails outright.
  await page.route(`${API}/storyboards/${SB_ID}`, (r) => r.abort("internetdisconnected"));
  await page.reload();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Morning focus routine");
  await expect(page.getByText(/saved copy/i)).toBeVisible();
  await shot(page, "11-offline-saved-copy");
});

test("load error (not offline, no saved copy) shows a retry, not a blank page", async ({ page }) => {
  await mockApi(page);
  await page.route(`${API}/storyboards/${SB_ID}`, (r) =>
    r.fulfill({ status: 500, contentType: "application/json", body: '{"detail":"Internal error"}' }));
  await page.goto(URL_);
  await expect(page.locator("main").getByRole("alert")).toContainText(/couldn.t load/i);
  await expect(page.getByRole("button", { name: "Try again" })).toBeVisible();
});
