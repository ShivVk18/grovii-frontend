import axios from 'axios';
import { clearSavedPlans } from '@/lib/savedPlans';
import { signInUrl } from '@/lib/session';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const api = axios.create({
  baseURL: API_BASE_URL,
  // A stuck request should fail visibly instead of spinning forever.
  timeout: 30_000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    // We only access localStorage on the client side
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('grovii_auth_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/** Public pages where a 401 just means "not signed in" and must not redirect. */
function isPublicPath(path: string): boolean {
  return path === '/' || path.startsWith('/sign-in') || path.startsWith('/sign-up') || path.startsWith('/forgot-password');
}

// A 401 on a signed-in page means the session expired: say so, and come back
// to the same page after signing in again.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      const hadToken = !!localStorage.getItem('grovii_auth_token');
      localStorage.removeItem('grovii_auth_token');
      clearSavedPlans();
      const { pathname, search } = window.location;
      if (!isPublicPath(pathname)) {
        window.location.replace(signInUrl({ expired: hadToken, next: pathname + search }));
      }
    }
    return Promise.reject(error);
  }
);
