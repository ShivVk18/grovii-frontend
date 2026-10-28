'use client';

import React, { createContext, useCallback, useContext, useEffect, useState, ReactNode } from 'react';
import { User } from '../types';
import { authService } from '../services/authService';
import { isNetworkError, statusOf } from '@/lib/apiErrors';

/** Why there is no signed-in user. */
export type AuthProblem = 'signed-out' | 'expired' | 'unreachable' | null;

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  problem: AuthProblem;
  login: (token: string) => Promise<void>;
  logout: () => void;
  retry: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [problem, setProblem] = useState<AuthProblem>(null);

  const initAuth = useCallback(async () => {
    const token = localStorage.getItem('grovii_auth_token');
    if (!token) {
      setProblem('signed-out');
      setIsLoading(false);
      return;
    }
    try {
      setUser(await authService.getMe());
      setProblem(null);
    } catch (error) {
      setUser(null);
      // 401: the API client already cleared the token. Anything else (offline,
      // server down) keeps the session so a blip doesn't sign the creator out.
      if (statusOf(error) === 401) setProblem('expired');
      else if (isNetworkError(error) || (statusOf(error) ?? 0) >= 500) setProblem('unreachable');
      else {
        localStorage.removeItem('grovii_auth_token');
        setProblem('signed-out');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void initAuth();
  }, [initAuth]);

  const login = async (token: string) => {
    localStorage.setItem('grovii_auth_token', token);
    const userData = await authService.getMe();
    setUser(userData);
    setProblem(null);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setProblem('signed-out');
  };

  const retry = () => {
    setIsLoading(true);
    void initAuth();
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, problem, login, logout, retry }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
