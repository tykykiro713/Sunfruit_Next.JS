'use client';

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { fetchProductByHandle, type UIProduct } from '@/lib/shopify';
import { createCart, addToCart } from '@/lib/cart';
import { trackSampleRequest } from '@/lib/analytics';

const SAMPLE_PACK_HANDLE = 'sunfruit-sample-pack';
const KLAVIYO_FORM_ID = 'RU73Kw';

interface SamplePackContextValue {
  product: UIProduct | null;
  isAvailable: boolean;
  isLoading: boolean;
  handleCheckout: () => Promise<void>;
}

const SamplePackContext = createContext<SamplePackContextValue | null>(null);

export function SamplePackProvider({ children }: { children: ReactNode }) {
  const [product, setProduct] = useState<UIProduct | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window._klOnsite = window._klOnsite || [];
    let cancelled = false;
    fetchProductByHandle(SAMPLE_PACK_HANDLE)
      .then((p) => {
        if (!cancelled) setProduct(p);
      })
      .catch((err) => console.error('Error fetching sample pack product:', err));
    return () => {
      cancelled = true;
    };
  }, []);

  const isAvailable = Boolean(
    product?.availableForSale && product?.variants?.edges?.[0]?.node?.availableForSale,
  );
  const variantId = product?.variants?.edges?.[0]?.node?.id;

  const handleCheckout = useCallback(async () => {
    trackSampleRequest(SAMPLE_PACK_HANDLE, isAvailable);
    setIsLoading(true);
    try {
      if (isAvailable && variantId) {
        const cartId = await createCart();
        const updatedCart = await addToCart(cartId, variantId, 1);
        if (updatedCart?.checkoutUrl) {
          window.location.href = updatedCart.checkoutUrl;
          return;
        }
        setIsLoading(false);
        console.error('Failed to get checkout URL');
        return;
      }
      if (window._klOnsite && typeof window._klOnsite.openForm === 'function') {
        window._klOnsite.openForm(KLAVIYO_FORM_ID);
      } else {
        console.error('Klaviyo form function not available');
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error handling samples:', error);
      setIsLoading(false);
    }
  }, [isAvailable, variantId]);

  return (
    <SamplePackContext.Provider value={{ product, isAvailable, isLoading, handleCheckout }}>
      {children}
    </SamplePackContext.Provider>
  );
}

export function useSamplePack(): SamplePackContextValue {
  const ctx = useContext(SamplePackContext);
  if (!ctx) {
    throw new Error('useSamplePack must be used inside <SamplePackProvider>');
  }
  return ctx;
}
