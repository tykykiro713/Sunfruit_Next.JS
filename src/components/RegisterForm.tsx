'use client';

import React, { useState } from 'react';
import { useCustomer } from '@/context/CustomerContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { register, isLoading, isLoggedIn } = useCustomer();
  const router = useRouter();

  console.log("RegisterForm rendered, isLoggedIn:", isLoggedIn, "isLoading:", isLoading);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Register form submitted with:", { firstName, lastName, email });
    
    setError('');
    setSuccess('');
    
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }
    
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }
    
    try {
      console.log("Calling register function...");
      const result = await register(email, password, firstName, lastName);
      console.log("Register result:", result);
      
      if (result.success) {
        console.log("Registration successful, showing success message");
        setSuccess('Account created and logged in successfully!');
        
        // Check login status after registration
        console.log("Login status after registration - isLoggedIn:", isLoggedIn);
        
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
        console.error("Registration failed:", result.error);
        setError(result.error || 'Failed to create account');
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      setError(error.message || 'An unexpected error occurred');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900">Create Account</h2>
      
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
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-800">
              First Name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emeraldgreen-500 focus:border-emeraldgreen-500 text-gray-900"
            />
          </div>
          
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-800">
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emeraldgreen-500 focus:border-emeraldgreen-500 text-gray-900"
            />
          </div>
        </div>
        
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
          <label htmlFor="password" className="block text-sm font-medium text-gray-800">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emeraldgreen-500 focus:border-emeraldgreen-500 text-gray-900"
          />
          <p className="mt-1 text-xs text-gray-700">
            Password must be at least 8 characters long
          </p>
        </div>
        
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emeraldgreen-500 hover:bg-emeraldgreen-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emeraldgreen-500"
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </div>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-800">
          Already have an account?{' '}
          <Link href="/account/login" className="text-emeraldgreen-600 hover:text-emeraldgreen-500 font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}