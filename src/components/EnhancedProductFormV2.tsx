// components/EnhancedProductFormV2.tsx
"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import type { UIProduct, SellingPlan } from '@/lib/shopify';
import { getSubscriptionOptions } from '@/lib/shopify';
import AddToCartButton from '@/components/AddToCartButton';
import { PurchaseOption } from './SubscriptionSelector';
import SubscriptionSelectorV2 from './SubscriptionSelectorV2';
import SizeSelector from './SizeSelector';
import SampleOptionDisplay from './SampleOptionDisplay';
import {
  ProductSize,
  getProductSize,
  findProductBySize,
  getProductFlavorName,
} from '@/lib/productUtils';

interface ProductFormV2Props {
  product: UIProduct;
  relatedProducts: UIProduct[];
  initialSize: ProductSize;
  onSubscriptionChange?: (isSubscription: boolean, discount: number) => void;
  onProductChange?: (product: UIProduct) => void;
}

export default function EnhancedProductFormV2({
  product,
  relatedProducts,
  initialSize,
  onSubscriptionChange,
  onProductChange
}: ProductFormV2Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State
  const [selectedSize, setSelectedSize] = useState<ProductSize>(initialSize);
  const [selectedPurchaseOption, setSelectedPurchaseOption] = useState<PurchaseOption | null>(null);
  const [subscriptionOptions, setSubscriptionOptions] = useState<PurchaseOption[]>([]);
  const [selectedSellingPlan, setSelectedSellingPlan] = useState<SellingPlan | null>(null);

  // Get the flavor name for display
  const flavorName = useMemo(() => getProductFlavorName(product), [product]);

  // Map products by size for quick lookup
  const productsBySize = useMemo(() => {
    const map: Partial<Record<ProductSize, UIProduct>> = {};
    relatedProducts.forEach(p => {
      const size = getProductSize(p);
      if (size) {
        map[size] = p;
      }
    });
    return map;
  }, [relatedProducts]);

  // Get available sizes based on related products
  const availableSizes = useMemo(() => {
    return Object.keys(productsBySize) as ProductSize[];
  }, [productsBySize]);

  // Get the currently selected product
  const currentProduct = useMemo(() => {
    return productsBySize[selectedSize] || product;
  }, [productsBySize, selectedSize, product]);

  // Get variant info from current product
  const firstVariant = currentProduct.variants?.edges?.[0]?.node;
  const variantId = firstVariant?.id || '';
  const availableForSale = (firstVariant?.availableForSale || false) && (firstVariant?.quantityAvailable || 0) > 0;
  const price = firstVariant?.priceV2?.amount
    ? parseFloat(firstVariant.priceV2.amount)
    : 0;

  // Handle size change - update URL and state
  const handleSizeChange = (newSize: ProductSize) => {
    setSelectedSize(newSize);

    // Update URL with new size param (shallow navigation, no scroll)
    const params = new URLSearchParams(searchParams.toString());
    params.set('size', newSize);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  // Set up subscription options when product changes (only for non-sample)
  useEffect(() => {
    // Sample doesn't have subscription options
    if (selectedSize === 'sample') {
      setSubscriptionOptions([]);
      setSelectedPurchaseOption(null);
      setSelectedSellingPlan(null);
      return;
    }

    const options: PurchaseOption[] = [];
    const DEFAULT_DISCOUNT = 30; // 30% discount for subscriptions

    // Try to get subscription plans from product
    let discountPercentage = DEFAULT_DISCOUNT;
    let monthlyPlan = null;

    if (currentProduct.hasSubscriptionOption) {
      const { subscriptionPlans, discountPercentage: productDiscount } = getSubscriptionOptions(currentProduct);

      if (subscriptionPlans.length > 0 && productDiscount > 0) {
        discountPercentage = productDiscount;

        // Find monthly plan
        monthlyPlan = subscriptionPlans.find(plan =>
          plan.name.toLowerCase().includes('month') ||
          plan.options.some(opt => opt.value.toLowerCase().includes('month'))
        );
      }
    }

    // Always add subscription option for 30pack and 60pack
    options.push({
      id: 'subscription',
      title: `Subscribe and Save ${discountPercentage}%`,
      description: `Monthly delivery, save ${discountPercentage}%`,
      value: 'subscription',
      discountPercentage: discountPercentage,
      deliveryFrequency: 'monthly'
    });

    if (monthlyPlan) {
      setSelectedSellingPlan(monthlyPlan);
    } else {
      setSelectedSellingPlan(null);
    }

    // Add one-time option
    options.push({
      id: 'one-time',
      title: 'One-time purchase',
      description: 'Single purchase, no recurring charges',
      value: 'one-time'
    });

    setSubscriptionOptions(options);
    setSelectedPurchaseOption(options[0]); // Default to subscription (first option)
  }, [currentProduct, selectedSize]);

  // Notify parent about subscription changes
  useEffect(() => {
    if (onSubscriptionChange) {
      if (selectedSize === 'sample') {
        // Sample is not a subscription
        onSubscriptionChange(false, 0);
      } else if (selectedPurchaseOption) {
        const isSubscription = selectedPurchaseOption.id === 'subscription';
        const discount = selectedPurchaseOption.discountPercentage || 0;
        onSubscriptionChange(isSubscription, discount);
      }
    }
  }, [selectedPurchaseOption, selectedSize, onSubscriptionChange]);

  // Notify parent about product changes (for updating images)
  useEffect(() => {
    if (onProductChange) {
      onProductChange(currentProduct);
    }
  }, [currentProduct, onProductChange]);

  // Handle purchase option change
  const handlePurchaseOptionChange = (option: PurchaseOption) => {
    setSelectedPurchaseOption(option);
  };

  // Determine quantity for AddToCartButton
  // For sample: 1 (it's a single product)
  // For 30pack: 1 (it's 1 tin)
  // For 60pack: 1 (it's a single product that contains 2 tins worth)
  const quantity = 1;

  return (
    <div className="mt-6">
      {/* Size Selector */}
      <div className="mb-6">
        <SizeSelector
          selectedSize={selectedSize}
          onChange={handleSizeChange}
          availableSizes={availableSizes}
        />
      </div>

      {/* Conditional rendering based on size */}
      {selectedSize === 'sample' ? (
        // Sample option - special UI, no subscription
        <SampleOptionDisplay flavorName={flavorName} />
      ) : (
        // 30pack or 60pack - show subscription options
        subscriptionOptions.length > 1 && selectedPurchaseOption && (
          <SubscriptionSelectorV2
            options={subscriptionOptions}
            selectedOption={selectedPurchaseOption}
            onChange={handlePurchaseOptionChange}
            productPrice={firstVariant?.priceV2?.amount}
            quantity={quantity}
          />
        )
      )}

      {/* Add to Cart Button */}
      <div className="mt-10">
        <AddToCartButton
          variantId={variantId}
          productId={currentProduct.id}
          productName={currentProduct.title}
          productHandle={currentProduct.handle}
          price={price}
          availableForSale={availableForSale}
          quantity={quantity}
          isSubscription={selectedSize !== 'sample' && selectedPurchaseOption?.value === 'subscription'}
          subscriptionFrequency={selectedPurchaseOption?.deliveryFrequency}
          subscriptionDiscount={selectedPurchaseOption?.discountPercentage}
          sellingPlanId={
            selectedSize !== 'sample' && selectedPurchaseOption?.value === 'subscription' && selectedSellingPlan
              ? selectedSellingPlan.id
              : undefined
          }
        />
      </div>
    </div>
  );
}
