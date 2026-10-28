import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

/**
 * Same-origin API proxy (Phase F).
 *
 * The browser calls /api/* on the frontend's own domain; this forwards the
 * request to the API server. Session cookies are therefore first-party
 * (SameSite=Lax works, and browsers that block third-party cookies still sign
 * in), even though the API is hosted on a different site.
 *
 * The API's rate limits need the real client IP, but behind this proxy the API
 * only sees the proxy. So we pass the IP in X-Grovii-Client-IP together with a
 * shared secret (PROXY_SHARED_SECRET, server-side only, same value on the API).
 * The API ignores the IP header unless the secret matches.
 */
const STRIP = ["x-grovii-proxy-secret", "x-grovii-client-ip"]

function clientIp(request: NextRequest): string {
  // Set by the hosting platform's edge (e.g. Vercel replaces any value the
  // client sent). On other hosts make sure the load balancer does the same.
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
  return forwarded || request.headers.get("x-real-ip") || "unknown"
}

export function proxy(request: NextRequest) {
  const target = process.env.API_PROXY_TARGET || "http://localhost:8000"
  const path = request.nextUrl.pathname.replace(/^\/api/, "") || "/"
  const url = new URL(path + request.nextUrl.search, target)

  const headers = new Headers(request.headers)
  for (const h of STRIP) headers.delete(h) // never trust a client-supplied value
  const secret = process.env.PROXY_SHARED_SECRET
  if (secret) {
    headers.set("x-grovii-proxy-secret", secret)
    headers.set("x-grovii-client-ip", clientIp(request))
  }
  return NextResponse.rewrite(url, { request: { headers } })
}

export const config = {
  matcher: "/api/:path*",
}
