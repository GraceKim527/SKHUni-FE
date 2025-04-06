'use client';

import { useAuthStore } from '@/store/useAuthStore';
import { useEffect } from 'react';

export default function AuthInitializer() {
  const { fetchUserInfo, fetchRole } = useAuthStore();
  useEffect(() => {
    fetchUserInfo();
    fetchRole();
  }, []);

  return null;
}
