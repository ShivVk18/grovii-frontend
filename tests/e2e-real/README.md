# Real end-to-end check (Phase F)

Runs the real frontend, the `/api` proxy, and the real API against a local
throwaway test database. Nothing calls an LLM.

```
createdb grovii_e2e_test
cd ../grovii-backend && DATABASE_URL=postgresql://localhost:5432/grovii_e2e_test \
  JWT_SECRET_KEY=$(venv/bin/python -c "import secrets;print(secrets.token_urlsafe(64))") venv/bin/alembic upgrade head
cd ../frontend && REAL_E2E_JWT_SECRET=$(node -e "console.log(require('crypto').randomBytes(48).toString('base64url'))") \
  npx playwright test -c playwright.real.config.ts
dropdb grovii_e2e_test   # afterwards
```
