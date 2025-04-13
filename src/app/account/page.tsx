'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCustomer } from '@/context/CustomerContext';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import AccountPage from '@/components/AccountPage';

export default function AccountDashboard() {
  const { isLoggedIn, isLoading } = useCustomer();
  const router = useRouter();

  useEffect(() => {
    // Redirect to login if not logged in and not currently loading
    if (!isLoading && !isLoggedIn) {
      router.push('/account/login');
    }
  }, [isLoading, isLoggedIn, router]);

  // While checking authentication status, show a loading state
  if (isLoading) {
    return (
      <div>
        <Navigation />
        <div className="min-h-screen flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-emeraldgreen-600"></div>
        </div>
      </div>
    );
  }

  // Only render account page if logged in
  if (!isLoggedIn) {
    return null; // Will redirect due to useEffect
  }

  return (
    <div>
      <Navigation />
      <AccountPage />
      <Footer />
    </div>
  );
}