// components/AddToCartButton.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { trackAddToCart } from '@/lib/analytics';

// Define Klaviyo window object

interface AddToCartButtonProps {
  variantId: string;
  productId?: string;
  productName?: string;
  productHandle?: string;
  price?: number;
  availableForSale?: boolean;
  quantity?: number;
  isSubscription?: boolean;
  subscriptionFrequency?: string;
  subscriptionDiscount?: number;
  sellingPlanId?: string;
  klaviyoFormId?: string;
}

export default function AddToCartButton({ 
  variantId, 
  productId = '',
  productName = '',
  productHandle = '',
  price = 0,
  availableForSale = true,
  quantity = 1,
  isSubscription = false,
  subscriptionFrequency = 'monthly',
  subscriptionDiscount = 0,
  sellingPlanId,
  klaviyoFormId = 'RU73Kw'
}: AddToCartButtonProps) {
  const [klaviyoLoading, setKlaviyoLoading] = useState(false);
  const { addItem, isLoading } = useCart();
  
  // Initialize Klaviyo
  useEffect(() => {
    window._klOnsite = window._klOnsite || [];
  }, []);
  
  const handleAddToCart = async () => {
    if (!availableForSale) {
      // If out of stock, open Klaviyo form
      setKlaviyoLoading(true);
      try {
        // Check if Klaviyo is loaded
        if (window._klOnsite && typeof window._klOnsite.openForm === 'function') {
          window._klOnsite.openForm(klaviyoFormId);
          setKlaviyoLoading(false);
        } else {
          // Klaviyo not loaded yet, wait for it
          const checkKlaviyo = () => {
            if (window._klOnsite && typeof window._klOnsite.openForm === 'function') {
              window._klOnsite.openForm(klaviyoFormId);
              setKlaviyoLoading(false);
            } else {
              // Check again in 100ms
              setTimeout(checkKlaviyo, 100);
            }
          };
          checkKlaviyo();
        }
      } catch (error) {
        console.error('Error opening Klaviyo form:', error);
        setKlaviyoLoading(false);
      }
    } else {
      // Calculate effective price (with discount if subscription)
      const effectivePrice = isSubscription && subscriptionDiscount 
        ? price * (1 - (subscriptionDiscount / 100)) 
        : price;
      
      // Track the add to cart event
      trackAddToCart(
        productId,
        productName,
        variantId,
        effectivePrice,
        quantity,
        isSubscription,
        subscriptionFrequency
      );
      
      // Add to cart as normal
      await addItem(
        variantId, 
        quantity, 
        isSubscription ? {
          frequency: subscriptionFrequency,
          discountPercentage: subscriptionDiscount,
          sellingPlanId: sellingPlanId
        } : undefined
      );
    }
  };
  
  // Get button text - now consistent regardless of availability
  const getButtonText = () => {
    if (isLoading) return 'Adding...';
    if (klaviyoLoading) return 'Loading...';
    if (!availableForSale) return 'Notify When Available';
    
    return 'Add to cart';
  };
  
  return (
    <div>
      
      <button
        type="button"
        className={`md:w-1/2 sm:w-1/2 w-full flex items-center justify-center rounded-md border border-transparent px-16 py-3 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-emeraldgreen-500 focus:ring-offset-2 whitespace-nowrap ${
          'bg-emeraldgreen-500 hover:bg-brightgreen-500'
        }`}
        onClick={handleAddToCart}
        disabled={isLoading || klaviyoLoading}
        id={`add-to-cart-${productHandle || variantId}`}
        data-product-id={productId}
        data-variant-id={variantId}
      >
        {(isLoading || klaviyoLoading) ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {getButtonText()}
          </>
        ) : (
          getButtonText()
        )}
      </button>
    </div>
  );
}