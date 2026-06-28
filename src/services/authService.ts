import { api } from './api';
import { AuthResponse } from '../types';

export const authService = {
  async register(data: any): Promise<any> {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  async login(data: any): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', data);
    return response.data;
  },

  async getMe(): Promise<any> {
    const response = await api.get('/auth/me');
    return response.data;
  },
  
  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('grovii_auth_token');
    }
  }
};
