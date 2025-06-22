"use client";

import { ApolloProvider } from "@apollo/client";
import client from "@/lib/apollo-client";
import { MyProvider } from "@/context/MyContext";
import { CartProvider } from "@/context/CartContext";
import { CustomerProvider } from "@/context/CustomerContext";
import CartDrawer from "@/components/CartDrawer";
import { useEffect, useState, Suspense } from "react";
import dynamic from "next/dynamic";

// Dynamic imports with better error boundaries
const ZendeskLauncher = dynamic(
  () => import('@/components/ZendeskLauncher').catch(err => {
    console.error('Failed to load Zendesk:', err);
    return { default: () => null };
  }), 
  { ssr: false }
);

const ClarityProvider = dynamic(
  () => import('@/components/ClarityProvider').then(mod => mod.ClarityProvider).catch(err => {
    console.error('Failed to load Clarity:', err);
    return () => null;
  }), 
  { ssr: false }
);

const KlaviyoProvider = dynamic(
  () => import('@/components/KlaviyoProvider').then(mod => mod.KlaviyoProvider).catch(err => {
    console.error('Failed to load Klaviyo:', err);
    return () => null;
  }), 
  { ssr: false }
);

// Component to handle third-party scripts loading
function ThirdPartyScripts() {
  const [shouldLoad, setShouldLoad] = useState(false);
  
  useEffect(() => {
    // More sophisticated loading strategy
    const checkAndLoad = () => {
      // Check if the page has been interacted with
      const hasInteracted = sessionStorage.getItem('hasInteracted') === 'true';
      
      if (hasInteracted) {
        setShouldLoad(true);
        return;
      }
      
      // Set up interaction listeners
      const interactionEvents = ['click', 'scroll', 'touchstart', 'keydown'];
      const handleInteraction = () => {
        sessionStorage.setItem('hasInteracted', 'true');
        setShouldLoad(true);
        
        // Clean up listeners
        interactionEvents.forEach(event => {
          window.removeEventListener(event, handleInteraction);
        });
      };
      
      // Add listeners
      interactionEvents.forEach(event => {
        window.addEventListener(event, handleInteraction, { once: true, passive: true });
      });
      
      // Also use requestIdleCallback with a timeout
      if ('requestIdleCallback' in window) {
        const id = window.requestIdleCallback(() => {
          setShouldLoad(true);
        }, { timeout: 5000 });
        
        return () => {
          if ('cancelIdleCallback' in window) {
            window.cancelIdleCallback(id);
          }
          interactionEvents.forEach(event => {
            window.removeEventListener(event, handleInteraction);
          });
        };
      } else {
        // Fallback timeout
        const timer = setTimeout(() => {
          setShouldLoad(true);
        }, 3000);
        
        return () => {
          clearTimeout(timer);
          interactionEvents.forEach(event => {
            window.removeEventListener(event, handleInteraction);
          });
        };
      }
    };
    
    checkAndLoad();
  }, []);
  
  if (!shouldLoad) return null;
  
  return (
    <Suspense fallback={null}>
      <ZendeskLauncher />
      <ClarityProvider />
      <KlaviyoProvider />
    </Suspense>
  );
}

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ApolloProvider client={client}>
      <MyProvider>
        <CustomerProvider>
          <CartProvider>
            {children}
            <CartDrawer />
            <ThirdPartyScripts />
          </CartProvider>
        </CustomerProvider>
      </MyProvider>
    </ApolloProvider>
  );
}