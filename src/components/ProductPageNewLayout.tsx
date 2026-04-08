'use client';

import { useState, useCallback } from 'react';
import ProductMedia from '@/components/ProductMedia';
import ProductInfo from '@/components/ProductInfo';
import EnhancedProductFormV2 from '@/components/EnhancedProductFormV2';
import ProductAccordion from '@/components/ProductAccordion';
import type { UIProduct } from '@/lib/shopify';
import type { ProductAccordionData } from '@/data/productAccordionData';
import { getProductFlavorName, type ProductSize } from '@/lib/productUtils';

interface ProductPageNewLayoutProps {
  product: UIProduct;
  relatedProducts: UIProduct[];
  initialSize: ProductSize;
  accordionData: ProductAccordionData;
}

export default function ProductPageNewLayout({
  product,
  relatedProducts,
  initialSize,
  accordionData
}: ProductPageNewLayoutProps) {
  const [currentProduct, setCurrentProduct] = useState<UIProduct>(product);
  const [isSubscriptionSelected, setIsSubscriptionSelected] = useState(false);
  const [subscriptionDiscount, setSubscriptionDiscount] = useState(0);

  const handleSubscriptionChange = useCallback((isSubscription: boolean, discount: number) => {
    setIsSubscriptionSelected(isSubscription);
    setSubscriptionDiscount(discount);
  }, []);

  const handleProductChange = useCallback((newProduct: UIProduct) => {
    setCurrentProduct(newProduct);
  }, []);

  // Get the flavor name (e.g., "Lemon Mint" instead of "Lemon Mint - 30 Pack")
  const flavorName = getProductFlavorName(product);

  return (
    <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
      {/* Left column - Product Media (updates based on selected size) */}
      <ProductMedia product={currentProduct} />

      {/* Right column - Product Info & Form */}
      <div className="mt-10 px-4 sm:mt-16 sm:px-6 lg:mt-0 lg:px-8 xl:px-12">
        <ProductInfo
          product={currentProduct}
          isSubscriptionSelected={isSubscriptionSelected}
          subscriptionDiscountPercentage={subscriptionDiscount}
          displayTitle={flavorName}
        />
        <EnhancedProductFormV2
          product={product}
          relatedProducts={relatedProducts}
          initialSize={initialSize}
          onSubscriptionChange={handleSubscriptionChange}
          onProductChange={handleProductChange}
        />
        <ProductAccordion items={accordionData.items} />
      </div>
    </div>
  );
}
