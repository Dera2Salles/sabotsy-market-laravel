'use client';

import { AuthService } from '@/services/auth.service';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    if (AuthService.isAuthenticated()) {
      router.push('/admin/dashboard');
    } else {
      router.push('/admin/login');
    }
  }, [router]);

  return <div className="h-screen w-full flex items-center justify-center bg-brand-primary-navy text-white">
    Chargement...
  </div>;
}
