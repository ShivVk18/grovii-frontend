import { defineConfig, devices } from "@playwright/test";

// Browser tests run the real Next.js app against a MOCKED backend: every call
// to /api/* is answered in the browser by tests/e2e/mockApi.ts. The proxy target
// points at a closed port, so nothing can reach a real server or LLM.
const DEAD_API = "http://127.0.0.1:9";
const PORT = Number(process.env.E2E_PORT || 3100);
// E2E_PROD=1 runs against a production build (run `npx next build` first).
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
    env: { API_PROXY_TARGET: DEAD_API, PROXY_SHARED_SECRET: "e2e-proxy-secret" },
  },
});
