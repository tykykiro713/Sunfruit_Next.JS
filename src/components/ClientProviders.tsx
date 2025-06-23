"use client";

import { ApolloProvider } from "@apollo/client";
import client from "@/lib/apollo-client";
import { MyProvider } from "@/context/MyContext";
import { CartProvider } from "@/context/CartContext";
import { CustomerProvider } from "@/context/CustomerContext";
import CartDrawer from "@/components/CartDrawer";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Priority 2: Customer Support (load on demand or after 2 seconds)
const ZendeskLauncher = dynamic(
  () => import('@/components/ZendeskLauncher').catch(() => ({ default: () => null })),
  { ssr: false }
);

// Priority 3: Nice-to-have analytics (load after interaction or 4 seconds)
const ClarityProvider = dynamic(
  () => import('@/components/ClarityProvider').then(mod => mod.ClarityProvider).catch(() => () => null),
  { ssr: false }
);

// Priority 4: Marketing tools (load last, after 7 seconds)
const KlaviyoProvider = dynamic(
  () => import('@/components/KlaviyoProvider').then(mod => mod.KlaviyoProvider).catch(() => () => null),
  { ssr: false }
);

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loadZendesk, setLoadZendesk] = useState(false);
  const [loadClarity, setLoadClarity] = useState(false);
  const [loadKlaviyo, setLoadKlaviyo] = useState(false);
  
  useEffect(() => {
    // Load scripts based on priority and user interaction
    let zendeskTimeout: NodeJS.Timeout;
    let clarityTimeout: NodeJS.Timeout;
    let klaviyoTimeout: NodeJS.Timeout;
    
    // Interaction handler for earlier loading
    const handleEarlyInteraction = () => {
      // Load Zendesk immediately on any interaction
      setLoadZendesk(true);
      
      // Load Clarity after 1 second of interaction
      setTimeout(() => setLoadClarity(true), 1000);
      
      // Remove listeners after first interaction
      window.removeEventListener('click', handleEarlyInteraction);
      window.removeEventListener('scroll', handleEarlyInteraction);
      window.removeEventListener('touchstart', handleEarlyInteraction);
    };
    
    // Add interaction listeners with multiple event types
    window.addEventListener('click', handleEarlyInteraction, { once: true, passive: true });
    window.addEventListener('scroll', handleEarlyInteraction, { once: true, passive: true });
    window.addEventListener('touchstart', handleEarlyInteraction, { once: true, passive: true });
    
    // Staggered loading schedule
    zendeskTimeout = setTimeout(() => setLoadZendesk(true), 2000);  // 2 seconds
    clarityTimeout = setTimeout(() => setLoadClarity(true), 4000);  // 4 seconds
    klaviyoTimeout = setTimeout(() => setLoadKlaviyo(true), 7000);  // 7 seconds
    
    return () => {
      clearTimeout(zendeskTimeout);
      clearTimeout(clarityTimeout);
      clearTimeout(klaviyoTimeout);
      window.removeEventListener('click', handleEarlyInteraction);
      window.removeEventListener('scroll', handleEarlyInteraction);
      window.removeEventListener('touchstart', handleEarlyInteraction);
    };
  }, []);

  return (
    <ApolloProvider client={client}>
      <MyProvider>
        <CustomerProvider>
          <CartProvider>
            {children}
            <CartDrawer />
            
            {/* Staggered third-party script loading with error boundaries */}
            <div style={{ display: 'none' }}>
              {loadZendesk && <ZendeskLauncher />}
              {loadClarity && <ClarityProvider />}
              {loadKlaviyo && <KlaviyoProvider />}
            </div>
          </CartProvider>
        </CustomerProvider>
      </MyProvider>
    </ApolloProvider>
  );
}