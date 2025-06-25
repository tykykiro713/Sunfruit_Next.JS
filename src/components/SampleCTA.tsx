'use client';

import { useState, useEffect } from 'react';
import { fetchProductByHandle } from '@/lib/shopify';
import { createCart, addToCart } from '@/lib/cart';
import { trackSampleRequest } from '@/lib/analytics';
import Image from 'next/image';

export default function SampleCTA() {
  const [isLoading, setIsLoading] = useState(false);
  const [samplePackProduct, setSamplePackProduct] = useState<any>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Sample pack product handle - update this to your actual sample pack handle
  const SAMPLE_PACK_HANDLE = 'sunfruit-sample-pack';
  const KLAVIYO_FORM_ID = 'RU73Kw'; // Your Klaviyo form ID for out-of-stock notifications
  
  // Check if mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);
  
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
      <div className="mx-auto max-w-7xl py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-none">
          {/* Grid layout similar to VideoCTA */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Text Section - Matching VideoCTA styling */}
            <div className="text-center lg:text-left">
              {/* Title matching VideoCTA font size - avoiding all special characters */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-poppins font-semibold tracking-tight text-emeraldgreen-500">
                <span className="block">Not sure? Try them all</span>
                <span className="block">Get FREE samples now!</span>
              </h2>
              
              {/* Description text - using template literal to avoid entity issues */}
              <p className="mt-4 sm:mt-6 text-lg sm:text-xl text-gray-600">
                {`*We'll ship you 8 samples for free. Receive 2 stick packs of each flavor, just pay $4 shipping. Samples ship today!`}
              </p>
              
              {/* Button matching VideoCTA styling */}
              <div className="mt-4 md:mt-8">
                <button
                  onClick={handleGetSamples}
                  disabled={isLoading}
                  className="inline-block rounded-3xl bg-emeraldgreen-500 px-8 sm:px-12 py-3 text-base md:text-lg font-medium text-white transition hover:bg-brightgreen-500 focus:outline-none focus:ring focus:ring-green-500"
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
            </div>

            {/* Enhanced Image Section - Larger and more prominent */}
            <div className="relative w-full">
              {/* Adjusted aspect ratio for larger display */}
              <div className="relative aspect-[4/3] lg:aspect-[3/2] w-full rounded-lg overflow-hidden">
                {!imageLoaded && (
                  <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" />
                )}
                <Image
                  src={isMobile ? "/images/samples-mobile.jpg" : "/images/samples-desktop.jpg"}
                  alt="Sunfruit Sample Stick Packs - All 4 Flavors"
                  fill
                  className={`object-cover rounded-lg ${imageLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
                  onLoad={() => setImageLoaded(true)}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
                  loading="lazy" // LAZY LOADING: This component is below the fold
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAwDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0Dp9R6WxagHJ6PPRgACw2UE7gY+1axTKMYt8K5xUbhqq/HSIZeeOXIy03jBELFYhEchT5c3RmfavhJbAHDUPGkREyLAMR7WNuqxJNK//2Q=="
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}