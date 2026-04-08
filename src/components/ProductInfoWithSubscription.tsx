'use client';

import { useState, useCallback } from 'react';
import ProductInfo from '@/components/ProductInfo';
import EnhancedProductForm from '@/components/EnhancedProductForm';
import EnhancedProductFormV2 from '@/components/EnhancedProductFormV2';
import ProductAccordion from '@/components/ProductAccordion';
import type { UIProduct } from '@/lib/shopify';
import type { ProductAccordionData } from '@/data/productAccordionData';
import { getProductFlavorName, type ProductSize } from '@/lib/productUtils';

interface ProductInfoWithSubscriptionProps {
  product: UIProduct;
  accordionData: ProductAccordionData;
  useNewLayout?: boolean;
  relatedProducts?: UIProduct[];
  initialSize?: ProductSize;
}

export default function ProductInfoWithSubscription({
  product,
  accordionData,
  useNewLayout = false,
  relatedProducts = [],
  initialSize = '30pack'
}: ProductInfoWithSubscriptionProps) {
  const [isSubscriptionSelected, setIsSubscriptionSelected] = useState(false);
  const [subscriptionDiscount, setSubscriptionDiscount] = useState(0);

  const handleSubscriptionChange = useCallback((isSubscription: boolean, discount: number) => {
    setIsSubscriptionSelected(isSubscription);
    setSubscriptionDiscount(discount);
  }, []);

  // Get the flavor name for the new layout (e.g., "Lemon Mint" instead of "Lemon Mint - 30 Pack")
  const flavorName = useNewLayout ? getProductFlavorName(product) : undefined;

  return (
    <>
      <ProductInfo
        product={product}
        isSubscriptionSelected={isSubscriptionSelected}
        subscriptionDiscountPercentage={subscriptionDiscount}
        displayTitle={flavorName}
      />
      {useNewLayout ? (
        <EnhancedProductFormV2
          product={product}
          relatedProducts={relatedProducts}
          initialSize={initialSize}
          onSubscriptionChange={handleSubscriptionChange}
        />
      ) : (
        <EnhancedProductForm
          product={product}
          onSubscriptionChange={handleSubscriptionChange}
        />
      )}
      <ProductAccordion items={accordionData.items} />
    </>
  );
}