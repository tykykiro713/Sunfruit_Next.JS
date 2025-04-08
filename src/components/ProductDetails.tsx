"use client";

import { useEffect } from 'react';  // Added missing React import
import type { UIProduct, MediaNode } from '@/lib/shopify';  // Import both UIProduct and MediaNode types
import { useCart } from '@/context/CartContext';

// Add this to fix the Klaviyo window type issue
declare global {
  interface Window {
    _klOnsite: any; // Or define a more specific type if you know the structure
  }
}

export default function ProductDetails({ product }: { product: UIProduct }) {
  // ... [other state and variables]

  useEffect(() => {
    window._klOnsite = window._klOnsite || [];
  }, []);

  const { addItem } = useCart();
  
  const handleAddToCart = (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      if (window._klOnsite && typeof window._klOnsite.openForm === 'function') {
        window._klOnsite.openForm('RU73Kw');
      } else {
        console.error('Klaviyo form function not available');
      }
    } catch (error) {
      console.error('Error opening Klaviyo form:', error);
    }
  };

  // Example of rendering media items with proper typing
  return (
    <div>
      {/* Example usage - assuming you have a mediaItems array or similar */}
      {product.media?.edges.map(({ node: mediaItem }) => (
        <div key={mediaItem.id}>
          {mediaItem.mediaContentType === 'VIDEO' && (
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full aspect-square object-cover sm:rounded-lg"
              poster={(mediaItem.previewImage?.image?.url || mediaItem.image?.url || '')}
            >
              {mediaItem.sources?.map((source: { url: string; mimeType: string }, sourceIdx: number) => (
                <source
                  key={sourceIdx}
                  src={source.url}
                  type={source.mimeType}
                />
              ))}
              Your browser does not support the video tag.
            </video>
          )}
          
          {/* Add other media type conditions as needed */}
        </div>
      ))}
      
      {/* ... rest of your component */}
    </div>
  );
}