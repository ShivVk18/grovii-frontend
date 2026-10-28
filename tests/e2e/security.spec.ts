import { test, expect } from "@playwright/test";
import { mockApi, shot, USER } from "./mockApi";

const IDEA = "3 habits that doubled my morning focus as a solo creator";

test("sign-in: the session is a cookie; no token is stored where page scripts can read it", async ({ page }) => {
  const api = await mockApi(page);
  await page.addInitScript(() => localStorage.removeItem("grovii_signed_in"));
  await page.goto("/sign-in");
  await page.getByLabel(/email/i).fill(USER.email);
  await page.getByLabel(/^password/i).fill("correct-horse-battery-staple");
  await page.getByRole("button", { name: /sign in/i }).click();
  await expect(page).toHaveURL(/\/dashboard/);
  const stored = await page.evaluate(() => JSON.stringify({ ...localStorage, ...sessionStorage }));
  expect(stored).not.toMatch(/eyJ|access_token|grovii_auth_token/);
  const login = api.requests.find((r) => r.path === "/auth/login");
  expect(login?.headers.authorization).toBeUndefined();
});

test("all API calls go through the same-origin /api proxy", async ({ page }) => {
  const origins = new Set<string>();
  page.on("request", (r) => { if (r.url().includes("/auth/") || r.url().includes("/storyboards")) origins.add(new URL(r.url()).origin); });
  await mockApi(page);
  await page.goto("/dashboard/storyboards");
  await expect(page.getByRole("heading", { name: "My Storyboards" })).toBeVisible();
  expect([...origins]).toEqual([new URL(page.url()).origin]);
});

test("writes carry the CSRF token from its cookie; reads don't need it", async ({ page, context, baseURL }) => {
  await context.addCookies([{ name: "grovii_csrf", value: "csrf-test-value", url: baseURL! }]);
  const api = await mockApi(page);
  await page.goto("/dashboard/create");
  await page.getByLabel("Your video idea").fill(IDEA);
  await page.getByRole("button", { name: "Generate shoot plan" }).click();
  await expect(page).toHaveURL(/job=/);
  const gen = api.requests.find((r) => r.path === "/storyboards/generate");
  expect(gen?.headers["x-csrf-token"]).toBe("csrf-test-value");
  expect(gen?.headers.authorization).toBeUndefined();
});

test("pages are served with security headers", async ({ page }) => {
  await mockApi(page);
  const res = await page.goto("/dashboard/create");
  const h = res!.headers();
  expect(h["content-security-policy"]).toContain("frame-ancestors 'none'");
  expect(h["content-security-policy"]).toContain("object-src 'none'");
  expect(h["x-frame-options"]).toBe("DENY");
  expect(h["x-content-type-options"]).toBe("nosniff");
  expect(h["referrer-policy"]).toBe("strict-origin-when-cross-origin");
});

test("sign out tells the server (session revoked), then shows sign-in", async ({ page }) => {
  const api = await mockApi(page);
  await page.goto("/dashboard/settings");
  await page.locator("main").getByRole("button", { name: /^log out$/i }).click();
  await expect(page).toHaveURL(/\/sign-in/);
  expect(api.requests.some((r) => r.method === "POST" && r.path === "/auth/logout")).toBe(true);
});

test("settings: download my data", async ({ page }) => {
  await mockApi(page);
  await page.goto("/dashboard/settings");
  const download = page.waitForEvent("download");
  await page.getByRole("button", { name: /download my data/i }).click();
  expect((await download).suggestedFilename()).toBe("grovii-my-data.json");
});

test("settings: delete account really calls the API with the password", async ({ page }) => {
  const api = await mockApi(page);
  await page.goto("/dashboard/settings");
  await page.getByRole("button", { name: /^delete account$/i }).click();
  const dialog = page.getByRole("dialog");
  await dialog.getByLabel(/password/i).fill("correct-horse-battery-staple");
  await dialog.getByRole("button", { name: /delete my account/i }).click();
  await expect(page).toHaveURL(/\/sign-in/);
  const del = api.requests.find((r) => r.method === "DELETE" && r.path === "/auth/me");
  expect(del?.body).toEqual({ password: "correct-horse-battery-staple" });
  await shot(page, "f-01-after-delete");
});

test("settings: wrong password on delete shows the error and deletes nothing", async ({ page }) => {
  await mockApi(page, { errors: { "DELETE /auth/me": { status: 403, body: { detail: "That password is wrong. Your account was not deleted.", code: "wrong_password" } } } });
  await page.goto("/dashboard/settings");
  await page.getByRole("button", { name: /^delete account$/i }).click();
  const dialog = page.getByRole("dialog");
  await dialog.getByLabel(/password/i).fill("nope-nope-nope");
  await dialog.getByRole("button", { name: /delete my account/i }).click();
  await expect(dialog.getByRole("alert")).toContainText("That password is wrong");
  await expect(page).toHaveURL(/\/dashboard\/settings/);
});

test("settings: change password calls the API and shows its field errors", async ({ page }) => {
  const api = await mockApi(page, {
    errors: { "POST /auth/change-password": { status: 422, body: { detail: "That password is too common.", code: "validation_error", errors: { new_password: "That password is too common." } } } },
  });
  await page.goto("/dashboard/settings");
  await page.getByLabel(/current password/i).fill("correct-horse-battery-staple");
  await page.getByLabel(/^new password/i).fill("password12345");
  await page.getByLabel(/confirm new password/i).fill("password12345");
  await page.getByRole("button", { name: /update password/i }).click();
  await expect(page.getByText("That password is too common.")).toBeVisible();
  const call = api.requests.find((r) => r.path === "/auth/change-password");
  expect(call?.body).toEqual({ current_password: "correct-horse-battery-staple", new_password: "password12345" });
  await shot(page, "f-02-settings-password-error");
});

test("settings: username update is saved through the API", async ({ page }) => {
  const api = await mockApi(page);
  await page.goto("/dashboard/settings");
  const name = page.getByLabel(/username/i);
  await name.fill("new_creator_name");
  await page.getByRole("button", { name: /save profile/i }).click();
  await expect(page.getByText(/profile updated/i)).toBeVisible();
  expect(api.requests.find((r) => r.method === "PATCH" && r.path === "/auth/me")?.body).toEqual({ username: "new_creator_name" });
});

test("sign-up: weak passwords are explained before sending; API field errors are shown", async ({ page }) => {
  const api = await mockApi(page, {
    errors: { "POST /auth/register": { status: 409, body: { detail: "An account with this email or username already exists. Try signing in.", code: "account_exists" } } },
  });
  await page.goto("/sign-up");
  await page.getByLabel(/username/i).fill("maria_c");
  await page.getByLabel(/email/i).fill("maria@example.com");
  await page.getByLabel(/^password/i).fill("short");
  await page.getByLabel(/confirm password/i).fill("short");
  await page.getByRole("button", { name: /create free account/i }).click();
  await expect(page.getByText(/at least 10 characters/i)).toBeVisible();
  expect(api.requests.some((r) => r.path === "/auth/register")).toBe(false);

  await page.getByLabel(/^password/i).fill("violet-lamp-orbit-27");
  await page.getByLabel(/confirm password/i).fill("violet-lamp-orbit-27");
  await page.getByRole("button", { name: /create free account/i }).click();
  await expect(page.getByText(/already exists/i)).toBeVisible();
});

test("forgot password does not pretend to send an email", async ({ page }) => {
  await page.goto("/forgot-password");
  await expect(page.getByText(/isn.t available yet/i)).toBeVisible();
  await expect(page.getByText(/check your (inbox|email)|we.ve sent|link has been sent/i)).toHaveCount(0);
});
