'use client';

import dynamic from 'next/dynamic';

// Import the test component with no SSR to avoid hydration issues
const TestRechargeContent = dynamic(
  () => import('./TestRechargeContent'),
  { 
    ssr: false,
    loading: () => (
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">Recharge Integration Test</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <p>Loading test page...</p>
        </div>
      </div>
    )
  }
);

export default function TestRechargePage() {
  return <TestRechargeContent />;
}