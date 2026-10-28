'use client';

import React, { createContext, useCallback, useContext, useEffect, useState, ReactNode } from 'react';
import { User } from '../types';
import { authService } from '../services/authService';
import { SIGNED_IN_HINT } from '../services/api';
import { isNetworkError, statusOf } from '@/lib/apiErrors';

/** Why there is no signed-in user. */
export type AuthProblem = 'signed-out' | 'expired' | 'unreachable' | null;

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  problem: AuthProblem;
  /** Call after the API accepted the credentials (the cookie is already set). */
  login: () => Promise<void>;
  logout: () => Promise<void>;
  /** Re-read the user (after a profile change). */
  refresh: () => Promise<void>;
  retry: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [problem, setProblem] = useState<AuthProblem>(null);

  const initAuth = useCallback(async () => {
    // The session is an httpOnly cookie the page can't read, so ask the API.
    let hadSession = false;
    try {
      hadSession = localStorage.getItem(SIGNED_IN_HINT) === '1';
    } catch {
      /* ignore */
    }
    try {
      setUser(await authService.getMe());
      setProblem(null);
    } catch (error) {
      setUser(null);
      // Offline or server down keeps the session: a blip doesn't sign out.
      if (statusOf(error) === 401) setProblem(hadSession ? 'expired' : 'signed-out');
      else if (isNetworkError(error) || (statusOf(error) ?? 0) >= 500) setProblem('unreachable');
      else setProblem('signed-out');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void initAuth();
  }, [initAuth]);

  const login = async () => {
    const userData = await authService.getMe();
    setUser(userData);
    setProblem(null);
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch {
      /* the cookie may already be invalid; local data is cleared either way */
    }
    setUser(null);
    setProblem('signed-out');
  };

  const refresh = async () => {
    setUser(await authService.getMe());
  };

  const retry = () => {
    setIsLoading(true);
    void initAuth();
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, problem, login, logout, retry, refresh }}>
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
