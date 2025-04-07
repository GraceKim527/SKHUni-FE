'use client';

import { useAuthStore } from '@/store/useAuthStore';
import Link from 'next/link';
import { useLogout } from '@/hooks/useLogout';
import useIsMounted from '@/hooks/useIsMounted';

export default function LoginButton() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn());
  const userInfo = useAuthStore((state) => state.userInfo);
  const { handleLogout } = useLogout();
  const mounted = useIsMounted();

  if (!mounted) return null;

  return isLoggedIn ? (
    <div className="flex gap-8 items-center">
      <div className="flex gap-4 items-center">
        <p className="text-base">
          <b>{userInfo.name}</b>님 안녕하세요!
        </p>
        <Link href="/mypage">
          <img
            src={userInfo.profileImage}
            alt="profile"
            width={32}
            height={32}
            className="object-cover w-8 h-8 rounded-full"
          />
        </Link>
      </div>

      <button onClick={handleLogout}>로그아웃</button>
    </div>
  ) : (
    <Link href="/login">로그인/회원가입</Link>
  );
}
