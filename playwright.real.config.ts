import { defineConfig, devices } from "@playwright/test";

// REAL end-to-end run (Phase F): real Next.js + real FastAPI + local Postgres
// test database + Redis db 14. No LLM is called (generation is only queued).
// Prepare the database first: see tests/e2e-real/README.md.
const WEB = 3300;
const API = 8100;
const SECRET = "real-e2e-proxy-secret-0123456789";
const BACKEND = process.env.GROVII_BACKEND_DIR || "../grovii-backend";

export default defineConfig({
  testDir: "tests/e2e-real",
  timeout: 90_000,
  workers: 1,
  reporter: [["list"]],
  use: { baseURL: `http://localhost:${WEB}`, ...devices["Desktop Chrome"] },
  webServer: [
    {
      command: `cd ${BACKEND} && venv/bin/uvicorn src.main:app --port ${API}`,
      url: `http://127.0.0.1:${API}/health`,
      reuseExistingServer: false,
      timeout: 60_000,
      env: {
        DATABASE_URL: process.env.REAL_E2E_DATABASE_URL || "postgresql://localhost:5432/grovii_e2e_test",
        REDIS_URL: "redis://localhost:6379/14",
        JWT_SECRET_KEY: process.env.REAL_E2E_JWT_SECRET || "",
        CORS_ORIGINS: `http://localhost:${WEB}`,
        PROXY_SHARED_SECRET: SECRET,
        GEMINI_API_KEY: "not-a-real-key-e2e",
        ALLOW_INPROCESS_JOBS: "false",
      },
    },
    {
      command: `npx next dev -p ${WEB}`,
      url: `http://localhost:${WEB}`,
      reuseExistingServer: false,
      timeout: 180_000,
      env: { API_PROXY_TARGET: `http://127.0.0.1:${API}`, PROXY_SHARED_SECRET: SECRET },
    },
  ],
});
