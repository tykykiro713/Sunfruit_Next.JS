'use client';

import React from 'react';
import Image from 'next/image';
import type { UIProduct } from '@/lib/shopify';

interface ProductHeroSplitProps {
  product: UIProduct;
}

export default function ProductHeroSplit({ product }: ProductHeroSplitProps) {
  const productImages = product.images?.edges || [];
  
  // If we have fewer than 3 images, return null to avoid errors
  if (productImages.length < 3) {
    return null;
  }
  
  // Get the second and third images from the gallery (index 1 and 2)
  const secondImage = productImages[1].node;
  const thirdImage = productImages[2].node;
  
  return (
    <section className="w-full flex flex-col md:flex-row">
      {/* Left Image Section - Second Product Image */}
      <div className="relative w-full md:w-1/2 h-80 md:h-96 lg:h-screen lg:max-h-[800px]">
        <Image
          src={secondImage.url}
          alt={secondImage.altText || `${product.title} Gallery Image 2`}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Right Image Section - Third Product Image */}
      <div className="relative w-full md:w-1/2 h-80 md:h-96 lg:h-screen lg:max-h-[800px]">
        <Image
          src={thirdImage.url}
          alt={thirdImage.altText || `${product.title} Gallery Image 3`}
          fill
          className="object-cover"
          priority
        />
      </div>
    </section>
  );
}