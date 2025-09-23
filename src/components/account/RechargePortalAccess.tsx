'use client';

import { useState, useEffect } from 'react';
import { useCustomer } from '@/context/CustomerContext';
import { useRechargeAuth } from '@/hooks/useRechargeAuth';

export default function RechargePortalAccess() {
  const { customer } = useCustomer();
  const [code, setCode] = useState('');
  const [sessionToken, setSessionToken] = useState('');
  const [step, setStep] = useState<'button' | 'code'>('button');
  
  const { sendCode, validateAndRedirect, isLoading, error, clearError } = useRechargeAuth();

  const handleManageSubscriptions = async () => {
    if (!customer?.email) return;

    clearError();
    
    try {
      const token = await sendCode(customer.email);
      setSessionToken(token);
      setStep('code');
    } catch (err) {
      // Error displayed via hook
    }
  };

  const handleValidateCode = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    
    if (!customer?.email || !sessionToken) return;
    
    try {
      await validateAndRedirect(customer.email, sessionToken, code);
    } catch (err) {
      // Error displayed via hook
    }
  };

  const handleBackToButton = () => {
    setStep('button');
    setCode('');
    setSessionToken('');
    clearError();
  };

  // Show code entry form
  if (step === 'code') {
    return (
      <div className="col-span-full">
        <div className="bg-white p-6 rounded-lg border-2 border-emeraldgreen-500">
          <form onSubmit={handleValidateCode} className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Enter Verification Code
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                We sent a 4-digit code to your phone. Enter it below to access your subscription portal.
              </p>
            </div>
            
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}
            
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
                Verification Code
              </label>
              <input
                id="code"
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 4))}
                placeholder="0000"
                maxLength={4}
                required
                disabled={isLoading}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emeraldgreen-500 focus:border-emeraldgreen-500 text-center text-2xl tracking-widest"
              />
            </div>
            
            <div className="flex space-x-3">
              <button
                type="submit"
                disabled={isLoading || code.length !== 4}
                className={`flex-1 flex items-center justify-center px-4 py-3 rounded-md text-base font-medium text-white transition-colors ${
                  isLoading || code.length !== 4
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-emeraldgreen-500 hover:bg-emeraldgreen-600 focus:outline-none focus:ring-2 focus:ring-emeraldgreen-500'
                }`}
              >
                {isLoading ? 'Accessing...' : 'Access Portal'}
              </button>
              
              <button
                type="button"
                onClick={handleBackToButton}
                className="px-4 py-3 text-sm text-emeraldgreen-600 hover:text-emeraldgreen-700 border border-emeraldgreen-200 hover:border-emeraldgreen-300 rounded-md transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Show the main button that matches other account buttons
  return (
    <button
      onClick={handleManageSubscriptions}
      disabled={!customer || isLoading}
      className={`px-4 py-4 rounded-md flex items-center justify-center transition-colors ${
        !customer || isLoading
          ? 'bg-gray-400 cursor-not-allowed' 
          : 'bg-emeraldgreen-500 hover:bg-brightgreen-500'
      }`}
    >
      <span className="text-white font-medium">
        {isLoading ? 'Sending Code...' : 'Manage Subscriptions'}
      </span>
    </button>
  );
}