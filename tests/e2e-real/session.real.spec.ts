import { test, expect } from "@playwright/test";

const PASSWORD = "violet-lamp-orbit-27";

test("real stack: sign-up, cookie session, CSRF-protected write, export, sign-out, delete", async ({ page, context, baseURL }) => {
  const id = Math.random().toString(36).slice(2, 8);
  const email = `real_${id}@example.com`;

  // Sign up and sign in through the UI.
  await page.goto("/sign-up");
  await page.getByLabel(/username/i).fill(`real_${id}`);
  await page.getByLabel(/email/i).fill(email);
  await page.getByLabel(/^password/i).fill(PASSWORD);
  await page.getByLabel(/confirm password/i).fill(PASSWORD);
  await page.getByRole("button", { name: /create free account/i }).click();
  await expect(page).toHaveURL(/\/sign-in/);
  await page.getByLabel(/email/i).fill(email);
  await page.getByLabel(/^password/i).fill(PASSWORD);
  await page.getByRole("button", { name: /sign in/i }).click();
  await expect(page).toHaveURL(/\/dashboard/);

  // The session cookie belongs to the frontend's own origin and is httpOnly.
  const cookies = await context.cookies(baseURL!);
  // "__Host-" prefix in production mode (APP_ENV=production), plain name in dev.
  const isSession = (n: string) => n === "grovii_session" || n === "__Host-grovii_session";
  const session = cookies.find((c) => isSession(c.name));
  expect(session?.httpOnly).toBe(true);
  expect(session?.sameSite).toBe("Lax");
  expect(cookies.find((c) => c.name.endsWith("grovii_csrf"))?.httpOnly).toBe(false);
  expect(await page.evaluate(() => document.cookie)).not.toContain("grovii_session");

  // A write through the UI (queues a generation; no worker runs, no LLM is called).
  await page.goto("/dashboard/create");
  await page.getByLabel("Your video idea").fill("A 30 second espresso routine for busy mornings");
  await page.getByRole("button", { name: "Generate shoot plan" }).click();
  await expect(page).toHaveURL(/job=/);
  // With a worker running (compose stack) it may already be generating or finished.
  await expect(page.locator("main")).toContainText(
    /Waiting to start|Writing your hook|Planning your scenes|couldn.t be finished|ready/i);

  // The same write without the CSRF header is refused by the real API.
  const noCsrf = await page.evaluate(async () => {
    const r = await fetch("/api/storyboards", { method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idea: "csrf probe idea text", goal: "educate", tone: "calm", style: "talking_head",
        audience: "x y", duration: 30, platform: "reels" }) });
    return { status: r.status, body: await r.json() };
  });
  expect(noCsrf.status).toBe(403);
  expect(noCsrf.body.code).toBe("csrf_failed");

  // Security headers from both layers.
  const pageRes = await page.request.get("/dashboard");
  expect(pageRes.headers()["content-security-policy"]).toContain("frame-ancestors 'none'");
  const apiRes = await page.request.get("/api/auth/me");
  expect(apiRes.status()).toBe(200);
  expect(apiRes.headers()["x-content-type-options"]).toBe("nosniff");

  // Export my data.
  await page.goto("/dashboard/settings");
  const download = page.waitForEvent("download");
  await page.getByRole("button", { name: /download my data/i }).click();
  const file = await (await download).path();
  const data = JSON.parse(require("fs").readFileSync(file, "utf8"));
  expect(data.account.email).toBe(email);
  expect(data.storyboards.length).toBe(1);
  expect(JSON.stringify(data)).not.toContain("hashed_password");

  // Sign out revokes the server session: the old cookie no longer works.
  const old = (await context.cookies(baseURL!)).find((c) => isSession(c.name))!;
  await page.locator("main").getByRole("button", { name: /^log out$/i }).click();
  await expect(page).toHaveURL(/\/sign-in/);
  await context.addCookies([{ ...old }]);
  expect((await page.request.get("/api/auth/me")).status()).toBe(401);

  // Sign in again and delete the account for real.
  await page.goto("/sign-in");
  await page.getByLabel(/email/i).fill(email);
  await page.getByLabel(/^password/i).fill(PASSWORD);
  await page.getByRole("button", { name: /sign in/i }).click();
  await expect(page).toHaveURL(/\/dashboard/);
  await page.goto("/dashboard/settings");
  await page.getByRole("button", { name: /^delete account$/i }).click();
  await page.getByRole("dialog").getByLabel(/password/i).fill(PASSWORD);
  await page.getByRole("dialog").getByRole("button", { name: /delete my account/i }).click();
  await expect(page).toHaveURL(/\/sign-in/);
  const relogin = await page.request.post("/api/auth/login", { data: { email, password: PASSWORD } });
  expect(relogin.status()).toBe(401);
});
