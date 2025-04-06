'use client';

import { exchangeToken } from '@/apis/auth';
import { SocialLoginButton } from '@/components/auth/SocialLoginButton';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function Login() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const code = searchParams.get('code');
  let provider = '';

  if (typeof window !== 'undefined') {
    provider = localStorage.getItem('provider') || '';
  }

  useEffect(() => {
    if (!code) return;

    const fetchToken = async () => {
      try {
        const { accessToken, refreshToken } = await exchangeToken(provider, code);
        useAuthStore.getState().setTokens({ accessToken, refreshToken });
        useAuthStore.getState().fetchRole();
        useAuthStore.getState().fetchUserInfo();
        router.push('/');
      } catch (error) {
        console.error(error);
      }
    };

    fetchToken();
  }, [code]);

  return (
    <section className="flex flex-col w-[24.375rem] justify-center mx-auto mt-16 gap-6">
      <div className="flex flex-col gap-3">
        <h2 className="text-2xl font-bold text-center text-gray-900">로그인/회원가입</h2>
        <p className="text-base text-center text-gray-400">
          로그인을 통해 스쿠니에서 더 많은 서비스를 이용해보세요!
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <SocialLoginButton
          socialType="kakao"
          iconSrc="/assets/icons/kakao.svg"
          backgroundColor="#FAE64D"
          border="none"
          text="카카오로 시작하기"
          iconWidth={32}
        />
        <SocialLoginButton
          socialType="google"
          iconSrc="/assets/icons/google.svg"
          backgroundColor="#FFFFFF"
          border="#C5C5C5"
          text="Google로 시작하기"
        />
      </div>
    </section>
  );
}
