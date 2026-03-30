'use client';

import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { RootState } from '@/store/store';

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { token } = useSelector((state: RootState) => state.auth);

  const storedToken =
    typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  useEffect(() => {
    if (!token && !storedToken) {
      router.push('/login');
    }
  }, [token, storedToken, router]);

  // 🚀 Block rendering if not authenticated
  if (!token && !storedToken) {
    return null;
  }

  return <>{children}</>;
}
