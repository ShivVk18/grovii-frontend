import axios from 'axios';
import { clearSavedPlans } from '@/lib/savedPlans';
import { signInUrl } from '@/lib/session';

// Same-origin by default: /api is proxied to the API server by src/proxy.ts,
// so the session cookie is first-party. NEXT_PUBLIC_API_URL can point straight
// at an API for local experiments (cookies then need that API on the same site).
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

/** Non-secret hint that this browser had a session, so a 401 reads "expired". */
export const SIGNED_IN_HINT = 'grovii_signed_in';

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  // A stuck request should fail visibly instead of spinning forever.
  timeout: 30_000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const UNSAFE = new Set(['post', 'put', 'patch', 'delete']);

/** The CSRF token the API set at login (readable cookie; the session cookie is not). */
export function readCsrfToken(): string | null {
  if (typeof document === 'undefined') return null;
  for (const part of document.cookie.split(';')) {
    const [name, ...rest] = part.trim().split('=');
    if (name === 'grovii_csrf' || name === '__Host-grovii_csrf') return decodeURIComponent(rest.join('='));
  }
  return null;
}

api.interceptors.request.use((config) => {
  if (UNSAFE.has((config.method || 'get').toLowerCase())) {
    const csrf = readCsrfToken();
    if (csrf) config.headers['X-CSRF-Token'] = csrf;
  }
  return config;
});

/** Public pages where a 401 just means "not signed in" and must not redirect. */
function isPublicPath(path: string): boolean {
  return path === '/' || path.startsWith('/sign-in') || path.startsWith('/sign-up') || path.startsWith('/forgot-password');
}

function hadSession(): boolean {
  try {
    return localStorage.getItem(SIGNED_IN_HINT) === '1';
  } catch {
    return false;
  }
}

// A 401 on a signed-in page means the session expired or was revoked: say so,
// and come back to the same page after signing in again.
// Several requests can fail with 401 at once; only the first one decides where
// to go (later ones would see the hint already cleared and drop "expired").
let redirecting = false;

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== 'undefined' && !redirecting) {
      const expired = hadSession();
      try {
        localStorage.removeItem(SIGNED_IN_HINT);
      } catch {
        /* ignore */
      }
      clearSavedPlans();
      const { pathname, search } = window.location;
      if (!isPublicPath(pathname)) {
        redirecting = true;
        window.location.replace(signInUrl({ expired, next: pathname + search }));
      }
    }
    return Promise.reject(error);
  }
);
