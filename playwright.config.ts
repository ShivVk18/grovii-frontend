import { defineConfig, devices } from "@playwright/test";

// Browser tests run the real Next.js app against a MOCKED backend: every call to
// API_URL is answered by tests/e2e/mockApi.ts. Nothing reaches a real server or LLM.
export const API_URL = "http://api.grovii.test";
const PORT = Number(process.env.E2E_PORT || 3100);
// E2E_PROD=1 runs against a production build (build it first with
// NEXT_PUBLIC_API_URL=http://api.grovii.test npx next build).
const PROD = process.env.E2E_PROD === "1";

export default defineConfig({
  testDir: "tests/e2e",
  timeout: 60_000,
  expect: { timeout: 10_000 },
  fullyParallel: true,
  workers: process.env.CI ? 2 : 4,
  reporter: [["list"]],
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: "retain-on-failure",
    ...devices["Desktop Chrome"],
  },
  webServer: {
    command: PROD ? `npx next start -p ${PORT}` : `npx next dev -p ${PORT}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI && !PROD,
    timeout: 180_000,
    env: { NEXT_PUBLIC_API_URL: API_URL },
  },
});
