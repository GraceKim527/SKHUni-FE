// src/apis/auth.ts

import instance from '@/libs/instance';
import { useAuthStore } from '@/store/useAuthStore';

// 소셜 로그인 토큰 발급
export const exchangeToken = async (provider: string, code: string) => {
  const response = await instance.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${provider}/token`,
    {
      code: code || '',
    }
  );
  return response.data.data;
};

// 엑세스 토큰 재발급
export const refreshAccessToken = async () => {
  const response = await instance.post('/api/token/access', {
    refreshToken: useAuthStore.getState().refreshToken,
  });
  return response.data;
};

// 로그아웃
export const logout = async () => {
  const response = await instance.post('/api/logout');
  return response.data;
};
