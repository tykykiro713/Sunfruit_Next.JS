"use client";

import { ApolloProvider } from "@apollo/client";
import client from "@/lib/apollo-client";
import { MyProvider } from "@/context/MyContext";
import { CartProvider } from "@/context/CartContext";
import { CustomerProvider } from "@/context/CustomerContext";
import CartDrawer from "@/components/CartDrawer";
import { Suspense, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import RechargeSDKProvider from "@/components/RechargeSDKProvider";

// Priority 2: Customer Support (load ONLY on interaction or after 10 seconds)
const ZendeskLauncher = dynamic(
  () => import('@/components/ZendeskLauncher').catch(() => ({ default: () => null })),
  { ssr: false }
);

// Priority 4: Marketing tools (load last, after 8 seconds)
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
  const [loadKlaviyo, setLoadKlaviyo] = useState(false);

  useEffect(() => {
    // Load scripts based on priority and user interaction

    // More aggressive interaction handler for Zendesk
    const handleZendeskInteraction = () => {
      if (!loadZendesk) {
        setLoadZendesk(true);
      }
    };

    // Klaviyo-specific triggers (for e-commerce actions)
    const handleKlaviyoInteraction = () => {
      if (!loadKlaviyo) {
        setLoadKlaviyo(true);
      }
    };

    // Check for e-commerce intent
    const handleEcommerceIntent = (e: Event) => {
      const target = e.target as HTMLElement;

      // Check if user clicked on add to cart, out of stock, or sample buttons
      if (target && (
        target.textContent?.toLowerCase().includes('add to cart') ||
        target.textContent?.toLowerCase().includes('out of stock') ||
        target.textContent?.toLowerCase().includes('notify') ||
        target.textContent?.toLowerCase().includes('sample') ||
        target.closest('button[data-add-to-cart]') ||
        target.closest('button[data-product-handle]') ||
        target.closest('[data-klaviyo]') ||
        target.id === 'get-free-samples-button'
      )) {
        handleKlaviyoInteraction();
      }
    };

    // Zendesk-specific triggers (more aggressive)
    // These events suggest user might need support
    window.addEventListener('click', handleZendeskInteraction, { passive: true });
    window.addEventListener('scroll', handleZendeskInteraction, { passive: true });
    window.addEventListener('touchstart', handleZendeskInteraction, { passive: true });

    // Also trigger on specific user actions that might indicate need for support
    const handleSupportIntent = (e: Event) => {
      const target = e.target as HTMLElement;

      // Check if user clicked on anything that might indicate support need
      if (target && (
        target.textContent?.toLowerCase().includes('help') ||
        target.textContent?.toLowerCase().includes('contact') ||
        target.textContent?.toLowerCase().includes('support') ||
        target.textContent?.toLowerCase().includes('question') ||
        target.closest('a[href*="contact"]') ||
        target.closest('a[href*="help"]') ||
        target.closest('button[data-zendesk]')
      )) {
        handleZendeskInteraction();
      }
    };

    window.addEventListener('click', handleSupportIntent, { passive: true });
    window.addEventListener('click', handleEcommerceIntent, { passive: true });

    // Fallback loading schedule (much later than before)
    const zendeskTimeout = setTimeout(() => {
      if (!loadZendesk) {
        setLoadZendesk(true);
      }
    }, 10000);  // 10 seconds (was 2 seconds)

    const klaviyoTimeout = setTimeout(() => {
      if (!loadKlaviyo) {
        setLoadKlaviyo(true);
      }
    }, 3000);  // 3 seconds - loads after initial page load

    return () => {
      clearTimeout(zendeskTimeout);
      clearTimeout(klaviyoTimeout);
      window.removeEventListener('click', handleZendeskInteraction);
      window.removeEventListener('scroll', handleZendeskInteraction);
      window.removeEventListener('touchstart', handleZendeskInteraction);
      window.removeEventListener('click', handleSupportIntent);
      window.removeEventListener('click', handleEcommerceIntent);
    };
  }, [loadZendesk, loadKlaviyo]);

  return (
    <ApolloProvider client={client}>
      <MyProvider>
        <CustomerProvider>
          <CartProvider>
            <RechargeSDKProvider />
            {children}
            <Suspense fallback={null}>
              <CartDrawer />
            </Suspense>

            {/* Staggered third-party script loading with error boundaries.
                Session replay is handled by PostHog (see PostHogProvider) — the
                Microsoft Clarity recorder was removed to avoid double-recording. */}
            <div style={{ display: 'none' }}>
              {loadZendesk && <ZendeskLauncher />}
              {loadKlaviyo && <KlaviyoProvider />}
            </div>
          </CartProvider>
        </CustomerProvider>
      </MyProvider>
    </ApolloProvider>
  );
}
