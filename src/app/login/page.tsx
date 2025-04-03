// app/login/page.tsx
import { Suspense } from 'react';
import LoginPage from '@/app/login/LoginPage';

export default function Login() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <LoginPage />
    </Suspense>
  );
}
