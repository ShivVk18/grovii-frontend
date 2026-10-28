import type { JobStatus } from "@/types";

/**
 * Plain-language progress. The backend reports a percentage as each step
 * finishes (src/services/jobs_services.py PROGRESS): hook 15, scenes 45,
 * script 60, then captions/hashtags/music/tips/repurpose (70-90, these run at
 * the same time and finish in any order), finishing 95. We name what is
 * running now, and group the parallel steps instead of inventing an order.
 */
export function stageFor(status: JobStatus | null, progress: number): string {
  if (status === "queued" || status === null) return "Waiting to start…";
  if (status === "completed") return "Your shoot plan is ready!";
  if (progress < 15) return "Writing your hook…";
  if (progress < 45) return "Planning your scenes…";
  if (progress < 95) return "Writing captions, hashtags, music ideas and posting tips…";
  return "Finishing touches…";
}

/** Shown progress: never 0 once running, never 100 before it's done. */
export function displayProgress(status: JobStatus | null, progress: number): number {
  if (status === "completed") return 100;
  if (status === "queued" || status === null) return 5;
  return Math.min(95, Math.max(10, progress));
}

/** Poll delay: 2s, then x1.5 per poll, capped at 10s. */
export const POLL_START_MS = 2000;
export const POLL_MAX_MS = 10_000;
export function nextPollDelay(attempt: number): number {
  return Math.min(POLL_MAX_MS, Math.round(POLL_START_MS * Math.pow(1.5, attempt)));
}

/** After this long we tell the creator it's still working (the job keeps going). */
export const CLIENT_TIMEOUT_MS = 5 * 60 * 1000;
/** Consecutive failed checks before we say we can't reach the server. */
export const OFFLINE_AFTER_FAILURES = 3;

export const FINISHED: JobStatus[] = ["completed", "failed", "cancelled"];
