'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';

// Define Klaviyo window object
declare global {
  interface Window {
    _klOnsite: any;
  }
}

interface AddToCartButtonProps {
  variantId: string;
  availableForSale?: boolean;
  isSubscription?: boolean;
  subscriptionFrequency?: string;
  subscriptionDiscount?: number;
  sellingPlanId?: string;
  klaviyoFormId?: string;
  productTitle?: string;
}

export default function AddToCartButton({ 
  variantId, 
  availableForSale = true,
  isSubscription = false,
  subscriptionFrequency = 'monthly',
  subscriptionDiscount = 0,
  sellingPlanId,
  klaviyoFormId = 'RU73Kw',
  productTitle = 'this product'
}: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1);
  const { addItem, isLoading } = useCart();
  
  // Initialize Klaviyo
  useEffect(() => {
    window._klOnsite = window._klOnsite || [];
  }, []);
  
  const handleAddToCart = async () => {
    if (!availableForSale) {
      // If out of stock, open Klaviyo form
      try {
        if (window._klOnsite && typeof window._klOnsite.openForm === 'function') {
          window._klOnsite.openForm(klaviyoFormId);
        } else {
          console.error('Klaviyo form function not available');
        }
      } catch (error) {
        console.error('Error opening Klaviyo form:', error);
      }
    } else {
      // Otherwise, add to cart as normal
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
  
  // Get the appropriate button text based on product availability
  const getButtonText = () => {
    if (isLoading) return 'Adding...';
    
    if (!availableForSale) {
      return 'Notify me when back in stock';
    }
    
    if (isSubscription && subscriptionDiscount) {
      return `Subscribe & Save ${subscriptionDiscount}%`;
    }
    
    return 'Add to cart';
  };
  
  return (
    <div>
      {/* Quantity selector - only show when product is in stock */}
      {availableForSale && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-900">Quantity</h3>
          <div className="mt-2 inline-flex items-center border border-gray-900 rounded">
            <button
              type="button"
              className="text-black px-4 py-2 text-lg"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
            >
              -
            </button>
            <span className="text-black px-4 py-2 text-base">
              {quantity}
            </span>
            <button
              type="button"
              className="text-black px-4 py-2 text-lg"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </button>
          </div>
        </div>
      )}
      
      {/* Out of stock message */}
      {!availableForSale && (
        <div className="mb-6">
          <p className="text-red-600 font-medium">Currently out of stock</p>
          <p className="text-gray-500 text-sm mt-1">
            Enter your email to be notified when {productTitle} is back in stock.
          </p>
        </div>
      )}
      
      <button
        type="button"
        className={`md:w-1/2 w-full flex items-center justify-center rounded-md border border-transparent px-16 py-3 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-emeraldgreen-500 focus:ring-offset-2 ${
          availableForSale
            ? 'bg-emeraldgreen-500 hover:bg-brightgreen-500'
            : 'bg-emeraldgreen-500 hover:bg-brightgreen-500' // Keep consistent styling for both states
        }`}
        onClick={handleAddToCart}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {availableForSale ? 'Adding...' : 'Loading...'}
          </>
        ) : (
          getButtonText()
        )}
      </button>
    </div>
  );
}