import { defineConfig, devices } from "@playwright/test";

// Browser tests run the real Next.js app against a MOCKED backend: every call to
// API_URL is answered by tests/e2e/mockApi.ts. Nothing reaches a real server or LLM.
export const API_URL = "http://api.grovii.test";
const PORT = Number(process.env.E2E_PORT || 3100);

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
    command: `npx next dev -p ${PORT}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
    env: { NEXT_PUBLIC_API_URL: API_URL },
  },
});
