import type { Page, Route } from "@playwright/test";
import path from "node:path";

// Shapes below copy the backend's response models (src/Schemas/storyboard_schema.py
// and the job routes in src/api/storyboard.py), so the UI is tested against the
// same fields the real API returns.

// Since Phase F the browser calls the frontend's own /api path (Next.js
// proxies it to the API server), so session cookies are first-party.
export const API = "/api";
export const API_GLOB = "**/api/**";
export const EVIDENCE = path.resolve(__dirname, "../../../fix/evidence/phase_e/screens");

export const SB_ID = "5b7c1a2e-0000-4000-8000-00000000a001";
export const JOB_ID = "9d3e4f50-0000-4000-8000-00000000b001";

export const USER = { id: "u-1", email: "creator@example.com", username: "creator", credits: 40 };

export function storyboard(overrides: Record<string, unknown> = {}) {
  return {
    id: SB_ID,
    title: "Morning focus routine",
    idea: "3 habits that doubled my morning focus as a solo creator",
    goal: "educate",
    tone: "energetic",
    style: "talking_head",
    audience: "Solo creators",
    duration: 30,
    platform: "reels",
    language: "English",
    thumbnail_url: null,
    thumbnail_status: "pending",
    thumbnail_prompt: null,
    constraints: { faceless: true, location: "Home desk", equipment: "Phone only" },
    brief_choice: "A 6am desk routine with a paper planner",
    created_at: "2026-10-28T09:00:00Z",
    hook: "I doubled my focus with one boring habit.",
    script: "I doubled my focus with one boring habit. First, phone in another room. Then one task on paper.",
    status: "completed",
    status_reason: null,
    scenes: [
      {
        id: "s1", scene_number: 1, title: "The hook", duration: "6", start_seconds: 0, end_seconds: 6,
        what_to_show: "Hands placing a phone in a drawer. Where: home desk. Framing: phone on a stack of books, top-down.",
        voiceover_example: "I doubled my focus with one boring habit.", onscreen_text: "One boring habit",
        tips: "Shoot by the window for soft light.", camera_angle: "Top-down", camera_movement: "Static",
      },
      {
        id: "s2", scene_number: 2, title: "Paper plan", duration: "24", start_seconds: 6, end_seconds: 30,
        what_to_show: "Writing one task on a sticky note.", voiceover_example: "Then one task on paper.",
        onscreen_text: "One task", camera_angle: "Close-up", camera_movement: "Slow push-in",
      },
    ],
    captions: [{ id: "c1", caption: "One habit. Double the focus." }],
    hashtags: [{ id: "h1", hashtag: "#focus" }, { id: "h2", hashtag: "#morningroutine" }],
    hooks: [],
    music: [
      {
        id: "m1", song_name: "Lo-fi Sunrise", artist: "Example Artist", why_fits: "Calm build matches the slow push-in.",
        best_scene: "Scene 2", mood: "Calm", genre: "Lo-fi", royalty_free_alt: "Any lo-fi beat from the platform library",
        verified: false, licensing_note: "Commercial accounts: use the royalty-free alternative.",
      },
    ],
    trends: [
      {
        id: "t1", posting_time: "Weekdays 7-9am", editing_style: "Jump cuts on every beat",
        content_gap: "Few creators show the paper planner up close", transitions: ["Hand wipe"], sounds: ["Soft lo-fi"],
      },
    ],
    repurpose: {
      id: "r1",
      linkedin: "REAL-LINKEDIN: Most of my focus problems were a phone problem.",
      twitter: "REAL-X: I tried 12 focus hacks. One worked.",
      carousel: "REAL-CAROUSEL: Slide 1 - The drawer rule",
      blog: null,
      newsletter: "REAL-NEWSLETTER: This week: the drawer rule.",
    },
    ...overrides,
  };
}

type JobStep = { status: string; progress?: number; error_message?: string | null };

export interface MockOptions {
  /** Status returned on each successive poll; the last one repeats. */
  jobSteps?: JobStep[];
  storyboard?: Record<string, unknown>;
  /** Respond to POST /storyboards/generate with this status/body instead of success. */
  generateError?: { status: number; body: unknown };
  /** Make every request answer 401 (session expired). */
  unauthorized?: boolean;
  /** Body for 422/403 answers from settings endpoints, keyed by "METHOD path". */
  errors?: Record<string, { status: number; body: unknown }>;
}

export interface RecordedRequest {
  method: string;
  path: string;
  headers: Record<string, string>;
  body: unknown;
}

export interface MockState {
  /** Every API request the page made, in order. */
  requests: RecordedRequest[];
  generateCalls: unknown[];
  jobPolls: number;
  cancelCalls: number;
  /** Change the job script mid-test. */
  setJobSteps(steps: JobStep[]): void;
}

const json = (route: Route, status: number, body: unknown) =>
  route.fulfill({ status, contentType: "application/json", body: JSON.stringify(body) });

export async function mockApi(page: Page, opts: MockOptions = {}): Promise<MockState> {
  let steps: JobStep[] = opts.jobSteps ?? [
    { status: "queued", progress: 0 },
    { status: "running", progress: 15 },
    { status: "running", progress: 45 },
    { status: "completed", progress: 100 },
  ];
  // Poll counter per job id so a retried job starts its script from the top.
  const polls: Record<string, number> = {};
  let jobCounter = 0;
  const state: MockState = {
    requests: [],
    generateCalls: [],
    jobPolls: 0,
    cancelCalls: 0,
    setJobSteps(s) {
      steps = s;
      for (const k of Object.keys(polls)) polls[k] = 0;
    },
  };

  // The session itself is an httpOnly cookie the page can't see; the page only
  // keeps a non-secret "was signed in" hint to word the expiry message.
  await page.addInitScript(() => {
    if (!localStorage.getItem("grovii_signed_in")) localStorage.setItem("grovii_signed_in", "1");
  });

  await page.route(API_GLOB, async (route) => {
    const req = route.request();
    const url = new URL(req.url());
    if (!url.pathname.startsWith("/api/")) return route.fallback();
    const p = url.pathname.slice(4); // strip the /api proxy prefix
    const method = req.method();
    let body: unknown = null;
    try { body = req.postDataJSON(); } catch { body = req.postData(); }
    state.requests.push({ method, path: p, headers: await req.allHeaders(), body });

    if (method === "OPTIONS") return route.fulfill({ status: 204 });
    const custom = opts.errors?.[`${method} ${p}`];
    if (custom) return json(route, custom.status, custom.body);
    if (opts.unauthorized && p !== "/auth/login") return json(route, 401, { detail: "Please sign in again.", code: "not_authenticated" });

    if (p === "/auth/login" && method === "POST") {
      return route.fulfill({
        status: 200, contentType: "application/json", body: JSON.stringify({ message: "Signed in" }),
        headers: { "set-cookie": "grovii_csrf=csrf-from-login; Path=/; SameSite=Lax" },
      });
    }
    if (p === "/auth/register" && method === "POST") return json(route, 200, { message: "User registered", user_id: "u-2" });
    if (p === "/auth/logout" && method === "POST") return json(route, 200, { message: "Logout successful" });
    if (p === "/auth/logout-all" && method === "POST") return json(route, 200, { message: "Signed out of 2 session(s)." });
    if (p === "/auth/change-password" && method === "POST") return json(route, 200, { message: "Password changed." });
    if (p === "/auth/me" && method === "PATCH") return json(route, 200, { ...USER, ...(body as object) });
    if (p === "/auth/me" && method === "DELETE") return json(route, 200, { message: "Deleted" });
    if (p === "/auth/me/export") {
      return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ account: USER, storyboards: [] }),
        headers: { "content-disposition": 'attachment; filename="grovii-my-data.json"' } });
    }
    if (p === "/auth/me") return json(route, 200, USER);

    if (p === "/storyboards/generate" && method === "POST") {
      state.generateCalls.push(req.postDataJSON());
      if (opts.generateError) return json(route, opts.generateError.status, opts.generateError.body);
      jobCounter += 1;
      const id = jobCounter === 1 ? JOB_ID : `${JOB_ID.slice(0, -1)}${jobCounter}`;
      return json(route, 200, { job_id: id, storyboard_id: SB_ID, status: "queued" });
    }

    const cancel = p.match(/^\/storyboards\/jobs\/([^/]+)\/cancel$/);
    if (cancel && method === "POST") {
      state.cancelCalls += 1;
      steps = [{ status: "cancelled", progress: 0, error_message: "You cancelled this generation." }];
      return json(route, 200, { id: cancel[1], status: "cancelled" });
    }

    const job = p.match(/^\/storyboards\/jobs\/([^/]+)$/);
    if (job) {
      state.jobPolls += 1;
      const n = polls[job[1]] ?? 0;
      polls[job[1]] = n + 1;
      const step = steps[Math.min(n, steps.length - 1)];
      return json(route, 200, {
        id: job[1], storyboard_id: SB_ID, progress: step.progress ?? 0, status: step.status,
        error_message: step.error_message ?? null, created_at: "2026-10-28T09:00:00Z", completed_at: null,
      });
    }

    if (p === "/storyboards/jobs") {
      return json(route, 200, [
        {
          id: JOB_ID, status: "failed", storyboard_id: SB_ID, storyboard_title: "Morning focus routine", progress: 45,
          error_message: "Generation failed. Your credits were refunded.", created_at: "2026-10-28T09:00:00Z",
          completed_at: "2026-10-28T09:01:00Z", started_at: "2026-10-28T09:00:05Z",
        },
        {
          id: `${JOB_ID.slice(0, -1)}9`, status: "completed", storyboard_id: SB_ID, storyboard_title: "Coffee reel",
          progress: 100, error_message: null, created_at: "2026-10-27T09:00:00Z",
          completed_at: "2026-10-27T09:01:30Z", started_at: "2026-10-27T09:00:02Z",
        },
      ]);
    }

    if (p === `/storyboards/${SB_ID}`) return json(route, 200, storyboard(opts.storyboard));
    if (p === "/storyboards") return json(route, 200, [storyboard(opts.storyboard)]);

    return json(route, 404, { detail: "Not found (no mock for this route)" });
  });

  return state;
}

export async function shot(page: Page, name: string) {
  await page.screenshot({ path: path.join(EVIDENCE, `${name}.png`), fullPage: true });
}
