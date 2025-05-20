'use client';

import { useState, useEffect } from 'react';
import { fetchProductByHandle } from '@/lib/shopify';
import { createCart, addToCart } from '@/lib/cart';
import { trackSampleRequest } from '@/lib/analytics';
import Image from 'next/image';

// Define Klaviyo window object
declare global {
  interface Window {
    _klOnsite: any;
  }
}

export default function SampleCTA() {
  const [isLoading, setIsLoading] = useState(false);
  const [samplePackProduct, setSamplePackProduct] = useState<any>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Sample pack product handle - update this to your actual sample pack handle
  const SAMPLE_PACK_HANDLE = 'sunfruit-sample-pack';
  const KLAVIYO_FORM_ID = 'RU73Kw'; // Your Klaviyo form ID for out-of-stock notifications
  
  // Initialize Klaviyo
  useEffect(() => {
    window._klOnsite = window._klOnsite || [];
  }, []);
  
  // Fetch sample pack product on component mount
  useEffect(() => {
    async function fetchSamplePack() {
      try {
        const product = await fetchProductByHandle(SAMPLE_PACK_HANDLE);
        setSamplePackProduct(product);
      } catch (error) {
        console.error('Error fetching sample pack product:', error);
      }
    }
    
    fetchSamplePack();
  }, []);
  
  // Check if the sample pack is available
  const isAvailable = samplePackProduct?.availableForSale && 
                     samplePackProduct?.variants?.edges?.[0]?.node?.availableForSale;

  // Get variant ID
  const variantId = samplePackProduct?.variants?.edges?.[0]?.node?.id;
  
  const handleGetSamples = async () => {
    // Track the sample request event
    trackSampleRequest(SAMPLE_PACK_HANDLE, isAvailable || false);
    
    setIsLoading(true);
    
    try {
      if (isAvailable && variantId) {
        // Create a new cart and add the sample pack directly
        const cartId = await createCart();
        
        // Add only the sample pack to the cart
        const updatedCart = await addToCart(cartId, variantId, 1);
        
        if (updatedCart?.checkoutUrl) {
          // Redirect directly to checkout, bypassing the cart drawer
          window.location.href = updatedCart.checkoutUrl;
        } else {
          setIsLoading(false);
          console.error('Failed to get checkout URL');
        }
      } else {
        // If out of stock, open Klaviyo form
        if (window._klOnsite && typeof window._klOnsite.openForm === 'function') {
          window._klOnsite.openForm(KLAVIYO_FORM_ID);
          setIsLoading(false);
        } else {
          console.error('Klaviyo form function not available');
          setIsLoading(false);
        }
      }
    } catch (error) {
      console.error('Error handling samples:', error);
      setIsLoading(false);
    }
  };

  return (
    <div id="samples" className="bg-gray-50">
      <div className="mx-auto max-w-7xl py-24 sm:px-2 sm:py-32 lg:px-4">
        <div className="mx-auto max-w-2xl px-4 lg:max-w-none">
          {/* Hero Content */}
          <div className="grid grid-cols-1 items-center gap-x-16 gap-y-10 lg:grid-cols-2">
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
              <h2 className="text-2xl md:text-4xl font-poppins font-semibold tracking-tight text-emeraldgreen-500">
                Not sure which flavor to try? <br />
                Get FREE samples now!
              </h2>
              <p className="mt-4 text-xl/8 text-gray-500">
                *We&apos;ll ship you 8 samples for free. Receive 2 stick packs of
                each flavor, just pay $4 shipping. Samples ship today!
              </p>
              <button
                onClick={handleGetSamples}
                disabled={isLoading}
                className="mt-6 inline-block rounded-3xl bg-emeraldgreen-500 px-12 py-3 text-base md:text-lg font-medium text-white transition hover:bg-brightgreen-500 focus:outline-none focus:ring focus:ring-green-500"
                id="get-free-samples-button"
                data-product-handle={SAMPLE_PACK_HANDLE}
              >
                {isLoading ? (
                  <>
                    <span className="inline-block animate-spin mr-2">↻</span>
                    Processing...
                  </>
                ) : (
                  'Get FREE Samples*'
                )}
              </button>
            </div>

            {/* Optimized image section with Next.js Image */}
            <div className="relative aspect-[3/2] w-full rounded-lg overflow-hidden">
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" />
              )}
              <Image
                src="/images/Samples.png" 
                alt="Stick Packs"
                width={800}
                height={533}
                className={`rounded-lg object-cover ${imageLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
                onLoad={() => setImageLoaded(true)}
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}