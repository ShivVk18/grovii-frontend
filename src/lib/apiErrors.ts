import type { ApiErrorBody } from "@/types";

type MaybeAxiosError = {
  response?: { status?: number; data?: unknown };
  message?: string;
  code?: string;
};

/** True when the request never got an answer (offline, DNS, server down). */
export function isNetworkError(error: unknown): boolean {
  const e = error as MaybeAxiosError;
  return !!e && !e.response && (e.code === "ERR_NETWORK" || e.message === "Network Error" || e.code === "ECONNABORTED");
}

/** The HTTP status, or undefined when there was no response. */
export function statusOf(error: unknown): number | undefined {
  return (error as MaybeAxiosError)?.response?.status;
}

/**
 * A sentence a creator can read. The API's `detail` is already user-safe since
 * Phase B; anything else falls back to a plain message (never a stack trace).
 */
export function apiErrorMessage(error: unknown, fallback = "Something went wrong. Please try again."): string {
  if (isNetworkError(error)) return "Can't reach Grovii right now. Check your connection and try again.";
  const data = (error as MaybeAxiosError)?.response?.data as Partial<ApiErrorBody> | undefined;
  if (data && typeof data.detail === "string" && data.detail.trim()) return data.detail;
  return fallback;
}

/** Field -> message map from a 422 `validation_error` body. */
export function fieldErrors(error: unknown): Record<string, string> {
  const data = (error as MaybeAxiosError)?.response?.data as Partial<ApiErrorBody> | undefined;
  if (!data || typeof data.errors !== "object" || data.errors === null) return {};
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(data.errors)) if (typeof v === "string") out[k] = v;
  return out;
}
