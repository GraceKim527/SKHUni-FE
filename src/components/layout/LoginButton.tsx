'use client';

import { useAuthStore } from '@/store/useAuthStore';
import Link from 'next/link';
import { useLogout } from '@/hooks/useLogout';
import useIsMounted from '@/hooks/useIsMounted';

export default function LoginButton() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn());
  const { handleLogout } = useLogout();
  const mounted = useIsMounted();

  if (!mounted) return null;

  return isLoggedIn ? (
    <div className="flex gap-4">
      <p>000님 안녕하세요!</p>
      <button onClick={handleLogout}>로그아웃</button>
    </div>
  ) : (
    <Link href="/login">로그인/회원가입</Link>
  );
}
