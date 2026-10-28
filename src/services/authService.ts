import { api } from './api';
import type { AuthResponse, User } from '../types';
import { clearSavedPlans } from '@/lib/savedPlans';

type Credentials = { email: string; password: string };
type Registration = Credentials & { username?: string; full_name?: string; name?: string };

export const authService = {
  async register(data: Registration): Promise<unknown> {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  async login(data: Credentials): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', data);
    return response.data;
  },

  /** Throws on failure so callers can tell "expired" (401) from "unreachable". */
  async getMe(): Promise<User> {
    const response = await api.get<User>('/auth/me');
    return response.data;
  },
  
  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('grovii_auth_token');
      clearSavedPlans();
    }
  }
};
