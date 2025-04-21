'use client';

import { useState } from 'react';
import { useCustomer } from '@/context/CustomerContext';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function RecoverPasswordPage() {
  const { requestReset } = useCustomer();
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    
    if (!email) {
      setError('Email address is required');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const result = await requestReset(email);
      
      if (result.success) {
        setSuccess('Check your email for a password reset link');
        setEmail(''); // Clear the field after success
      } else {
        setError(result.error || 'An error occurred');
      }
    } catch (error: any) {
      setError(error.message || 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Navigation />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow rounded-lg p-8">
            <h1 className="text-2xl font-semibold text-gray-900 mb-6">Forgot Password</h1>
            
            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">
                {error}
              </div>
            )}
            
            {success && (
              <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-md">
                {success}
              </div>
            )}
            
            {!success ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-800">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-emeraldgreen-500 focus:ring-emeraldgreen-500 text-gray-900"
                    required
                  />
                  <p className="mt-1 text-xs text-gray-700">
                    We&apos;ll send a password reset link to this email
                  </p>
                </div>
                
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emeraldgreen-500 hover:bg-emeraldgreen-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emeraldgreen-500"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Reset Link'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-800">
                  A password reset link has been sent to your email address. 
                  Please check your inbox and follow the instructions.
                </p>
              </div>
            )}
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-800">
                Remember your password?{' '}
                <Link href="/account/login" className="text-emeraldgreen-600 hover:text-emeraldgreen-500 font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}