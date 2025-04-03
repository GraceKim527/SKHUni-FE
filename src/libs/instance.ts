// src/lib/instance.ts
import { refreshAccessToken } from '@/apis/auth';
import { useAuthStore } from '@/store/useAuthStore';
import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

// 요청 헤더에 엑세스 토큰 추가
instance.interceptors.request.use(
  (config) => {
    const accessToken = useAuthStore.getState().accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // accessToken 만료로 401 응답이 왔다면,
    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      useAuthStore.getState().refreshToken
    ) {
      originalRequest._retry = true;
      try {
        const { accessToken } = await refreshAccessToken();
        useAuthStore
          .getState()
          .setTokens({ accessToken, refreshToken: useAuthStore.getState().refreshToken! });

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return instance(originalRequest);
      } catch (error) {
        console.log('refreshToken 재발급 실패');
        useAuthStore.getState().clearTokens();
        window.location.href = '/login';
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);
export default instance;
