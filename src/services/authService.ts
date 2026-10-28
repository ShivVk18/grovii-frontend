import { api, SIGNED_IN_HINT } from './api';
import type { User } from '../types';
import { clearSavedPlans } from '@/lib/savedPlans';

type Credentials = { email: string; password: string };
type Registration = Credentials & { username: string };

function setHint(on: boolean) {
  try {
    if (on) localStorage.setItem(SIGNED_IN_HINT, '1');
    else localStorage.removeItem(SIGNED_IN_HINT);
    // Tokens were kept here before Phase F; make sure none is left behind.
    localStorage.removeItem('grovii_auth_token');
  } catch {
    /* storage blocked: the hint is optional */
  }
}

function forgetLocalData() {
  setHint(false);
  clearSavedPlans();
}

export const authService = {
  async register(data: Registration): Promise<void> {
    await api.post('/auth/register', data);
  },

  /** The API sets the session as an httpOnly cookie; nothing to store here. */
  async login(data: Credentials): Promise<void> {
    await api.post('/auth/login', data);
    setHint(true);
  },

  /** Throws on failure so callers can tell "expired" (401) from "unreachable". */
  async getMe(): Promise<User> {
    const response = await api.get<User>('/auth/me');
    return response.data;
  },

  /** Revokes this session on the server, then forgets local data. */
  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout');
    } finally {
      forgetLocalData();
    }
  },

  async logoutEverywhere(): Promise<void> {
    try {
      await api.post('/auth/logout-all');
    } finally {
      forgetLocalData();
    }
  },

  async updateUsername(username: string): Promise<User> {
    const response = await api.patch<User>('/auth/me', { username });
    return response.data;
  },

  async changePassword(current_password: string, new_password: string): Promise<void> {
    await api.post('/auth/change-password', { current_password, new_password });
  },

  /** Downloads everything Grovii stores about this account as a JSON file. */
  async exportMyData(): Promise<void> {
    const response = await api.get('/auth/me/export', { responseType: 'blob' });
    const url = URL.createObjectURL(response.data as Blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'grovii-my-data.json';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  },

  async deleteAccount(password: string): Promise<void> {
    await api.delete('/auth/me', { data: { password } });
    forgetLocalData();
  },
};
