'use client';

import { KlaviyoFacade } from './KlaviyoFacade';
import { useCart } from '@/context/CartContext';

interface SmartCTAButtonProps {
  text: string;
  className?: string;
  productId?: string;
  variantId?: string;
  quantity?: number;
  isAvailable?: boolean; // Based on inventory/availability
  alternateText?: string; // Text to show when not available
}

export function SmartCTAButton({ 
  text, 
  className,
  productId,
  variantId,
  quantity = 1,
  isAvailable = true, // Default to available
  alternateText = "Notify When Available"
}: SmartCTAButtonProps) {
  const { addItem } = useCart();
  
  // If not available (out of stock), use Klaviyo facade
  if (!isAvailable) {
    return (
      <KlaviyoFacade
        triggerText={alternateText}
        buttonClassName={className}
        onClick={() => {
          // Track product interest for out of stock items
          if (productId && window.gtag) {
            window.gtag('event', 'out_of_stock_interest', {
              button_text: alternateText,
              product_id: productId,
              variant_id: variantId
            });
          }
        }}
      />
    );
  }
  
  // Regular add to cart when in stock
  return (
    <button
      onClick={() => {
        if (variantId) {
          addItem(variantId, quantity);
        }
        
        // Track add to cart event
        if (window.gtag) {
          window.gtag('event', 'add_to_cart', {
            product_id: productId,
            variant_id: variantId,
            quantity: quantity
          });
        }
      }}
      className={className}
    >
      {text}
    </button>
  );
}