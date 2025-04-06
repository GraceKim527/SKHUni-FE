// src/store/useAuthStore.ts

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getRole, getUserInfo } from '@/apis/members';
import { logout } from '@/apis/auth';

type Role = 'ROLE_USER' | 'ROLE_STUDENT' | 'ROLE_GUEST';

interface UserInfo {
  name: string;
  profileImage: string;
  email: string;
}
interface AuthTokens {
  accessToken: string | null;
  refreshToken: string | null;
}

interface AuthState extends AuthTokens {
  role: Role;
  userInfo: UserInfo;
  setTokens: (tokens: AuthTokens) => void;
  clearTokens: () => void;
  isLoggedIn: () => boolean;
  fetchRole: () => Promise<void>;
  fetchUserInfo: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      role: 'ROLE_GUEST',
      userInfo: {
        name: '',
        profileImage: '',
        email: '',
      },
      accessToken: null,
      refreshToken: null,
      setTokens: ({ accessToken, refreshToken }) => set({ accessToken, refreshToken }),
      clearTokens: () => set({ accessToken: null, refreshToken: null, role: 'ROLE_GUEST' }),
      isLoggedIn: () => get().accessToken !== null,
      fetchRole: async () => {
        const response = await getRole();
        set({ role: response.data });
      },
      fetchUserInfo: async () => {
        const response = await getUserInfo();
        set({
          userInfo: {
            name: response.data.name,
            profileImage: response.data.picture,
            email: response.data.email,
          },
        });
      },
      logout: async () => {
        await logout();
        set({ accessToken: null, refreshToken: null, role: 'ROLE_GUEST' });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
