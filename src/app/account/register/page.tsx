'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCustomer } from '@/context/CustomerContext';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import RegisterForm from '@/components/RegisterForm';

export default function RegisterPage() {
  const { isLoggedIn, isLoading } = useCustomer();
  const router = useRouter();

  useEffect(() => {
    // Redirect to account dashboard if already logged in
    if (!isLoading && isLoggedIn) {
      router.push('/account');
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

  return (
    <div>
      <Navigation />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <RegisterForm />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}