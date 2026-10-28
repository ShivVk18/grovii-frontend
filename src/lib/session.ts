/** Only same-site paths may be used as a post-login destination (no open redirect). */
export function safeNextPath(next: string | null | undefined): string | null {
  if (!next || !next.startsWith("/") || next.startsWith("//") || next.startsWith("/\\")) return null;
  return next;
}

export function signInUrl(opts: { expired?: boolean; next?: string } = {}): string {
  const q = new URLSearchParams();
  if (opts.expired) q.set("expired", "1");
  const next = safeNextPath(opts.next);
  if (next && !next.startsWith("/sign-in")) q.set("next", next);
  const s = q.toString();
  return s ? `/sign-in?${s}` : "/sign-in";
}
