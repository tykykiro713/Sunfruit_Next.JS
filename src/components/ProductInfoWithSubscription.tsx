'use client';

import { useState, useCallback } from 'react';
import ProductInfo from '@/components/ProductInfo';
import EnhancedProductForm from '@/components/EnhancedProductForm';
import ProductAccordion from '@/components/ProductAccordion';
import type { UIProduct } from '@/lib/shopify';

interface ProductInfoWithSubscriptionProps {
  product: UIProduct;
  accordionData: {
    items: Array<{
      id: string;
      question: string;
      answer: string;
    }>;
  };
}

export default function ProductInfoWithSubscription({ product, accordionData }: ProductInfoWithSubscriptionProps) {
  const [isSubscriptionSelected, setIsSubscriptionSelected] = useState(false);
  const [subscriptionDiscount, setSubscriptionDiscount] = useState(0);

  const handleSubscriptionChange = useCallback((isSubscription: boolean, discount: number) => {
    setIsSubscriptionSelected(isSubscription);
    setSubscriptionDiscount(discount);
  }, []);

  return (
    <>
      <ProductInfo 
        product={product}
        isSubscriptionSelected={isSubscriptionSelected}
        subscriptionDiscountPercentage={subscriptionDiscount}
      />
      <EnhancedProductForm 
        product={product}
        onSubscriptionChange={handleSubscriptionChange}
      />
      <ProductAccordion items={accordionData.items} />
    </>
  );
}