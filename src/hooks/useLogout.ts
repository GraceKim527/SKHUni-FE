// src/hooks/useLogout.ts
import { logout } from '@/apis/auth';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';

export const useLogout = () => {
  const clearTokens = useAuthStore((state) => state.clearTokens);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error('로그아웃 오류:', err);
    } finally {
      clearTokens();
      router.replace('/');
    }
  };

  return { handleLogout };
};
