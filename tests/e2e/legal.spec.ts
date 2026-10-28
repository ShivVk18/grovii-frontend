import { test, expect } from "@playwright/test";
import { mockApi } from "./mockApi";

test("privacy and terms pages exist, are marked as drafts, and are linked from sign-up", async ({ page }) => {
  for (const [path, heading] of [["/privacy", "Privacy policy"], ["/terms", "Terms of use"]]) {
    await page.goto(path);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(heading);
    await expect(page.getByRole("note")).toContainText(/not been reviewed by a lawyer/i);
  }
  await page.goto("/sign-up");
  await expect(page.getByRole("link", { name: /privacy policy/i })).toHaveAttribute("href", "/privacy");
  await expect(page.getByRole("link", { name: "Terms" })).toHaveAttribute("href", "/terms");
});

test("settings makes no paid-plan promises", async ({ page }) => {
  await mockApi(page);
  await page.goto("/dashboard/settings");
  await expect(page.locator("main")).toContainText(/paid plans aren.t available yet/i);
  await expect(page.locator("main")).not.toContainText(/upgrade to pro|billing cycle/i);
});
