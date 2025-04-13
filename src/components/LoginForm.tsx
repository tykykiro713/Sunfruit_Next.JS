'use client';

import React, { useState } from 'react';
import { useCustomer } from '@/context/CustomerContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { login, isLoading, isLoggedIn } = useCustomer();
  const router = useRouter();

  console.log("LoginForm rendered, isLoggedIn:", isLoggedIn, "isLoading:", isLoading);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login form submitted with email:", email);
    
    setError('');
    setSuccess('');
    
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }
    
    try {
      console.log("Calling login function...");
      const result = await login(email, password);
      console.log("Login result:", result);
      
      if (result.success) {
        console.log("Login successful, showing success message");
        setSuccess('Logged in successfully!');
        
        // Check login status after login
        console.log("Login status after login - isLoggedIn:", isLoggedIn);
        
        // Use both router.push and window.location as fallbacks for each other
        setTimeout(() => {
          console.log("Attempting to redirect to account page...");
          try {
            router.push('/account');
            // Add a fallback in case router.push doesn't trigger navigation
            setTimeout(() => {
              console.log("Fallback redirect using window.location");
              window.location.href = '/account';
            }, 1000);
          } catch (navError) {
            console.error("Navigation error:", navError);
            window.location.href = '/account';
          }
        }, 1500);
      } else {
        if (result.error === "Unidentified customer") {
          setError("Account not found or not activated. Please check your email for a verification link or try another email address.");
        } else {
          console.error("Login failed:", result.error);
          setError(result.error || 'Failed to log in');
        }
      }
    } catch (error: any) {
      console.error('Login error:', error);
      setError(error.message || 'An unexpected error occurred');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900">Sign In</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mb-4 p-3 bg-green-50 text-emeraldgreen-600 rounded-md">
          {success}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-800">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emeraldgreen-500 focus:border-emeraldgreen-500 text-gray-900"
          />
        </div>
        
        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium text-gray-800">
              Password
            </label>
            <Link href="/account/recover" className="text-sm text-emeraldgreen-600 hover:text-emeraldgreen-500 font-medium">
              Forgot password?
            </Link>
          </div>
          <input
            id="password"
            name="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emeraldgreen-500 focus:border-emeraldgreen-500 text-gray-900"
          />
        </div>
        
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emeraldgreen-500 hover:bg-emeraldgreen-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emeraldgreen-500"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </div>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-800">
          Don&apos;t have an account?{' '}
          <Link href="/account/register" className="text-emeraldgreen-600 hover:text-emeraldgreen-500 font-medium">
            Create one now
          </Link>
        </p>
      </div>
    </div>
  );
}