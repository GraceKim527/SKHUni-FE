// src/store/useAuthStore.ts

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthTokens {
  accessToken: string | null;
  refreshToken: string | null;
}

interface AuthState extends AuthTokens {
  setTokens: (tokens: AuthTokens) => void;
  clearTokens: () => void;
  isLoggedIn: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      refreshToken: null,
      setTokens: ({ accessToken, refreshToken }) => set({ accessToken, refreshToken }),
      clearTokens: () => set({ accessToken: null, refreshToken: null }),
      isLoggedIn: () => get().accessToken !== null,
    }),
    {
      name: 'auth-storage',
    }
  )
);
