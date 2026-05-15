"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import type { UIProduct, SellingPlan } from '@/lib/shopify';
import { getSubscriptionOptions } from '@/lib/shopify';
import AddToCartButton from '@/components/AddToCartButton';
import SubscriptionMonthlyOneTimeCards, { PurchaseOption } from './SubscriptionMonthlyOneTimeCards';
import SizeSelector3Cards from './SizeSelector3Cards';
import SampleOptionDisplay from './SampleOptionDisplay';
import {
  ProductSize,
  getProductSize,
  getProductFlavorName,
  getSizeOption,
} from '@/lib/productUtils';

interface ProductFormV3Props {
  product: UIProduct;
  relatedProducts: UIProduct[];
  initialSize: ProductSize;
  onSubscriptionChange?: (isSubscription: boolean, discount: number) => void;
  onProductChange?: (product: UIProduct) => void;
}

const DEFAULT_MONTHLY_DISCOUNT = 15;

export default function EnhancedProductFormV3({
  product,
  relatedProducts,
  initialSize,
  onSubscriptionChange,
  onProductChange,
}: ProductFormV3Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // '48pack' is no longer a PDP-visible tile (Phase 1 of launch offer stack).
  // Clamp incoming initialSize so direct-links to ?size=48pack don't land on
  // a missing tile. The 48-pack product itself remains live in Shopify.
  const [selectedSize, setSelectedSize] = useState<ProductSize>(
    initialSize === '48pack' ? '24pack' : initialSize
  );
  const [purchaseMode, setPurchaseMode] = useState<'subscription' | 'one-time'>('subscription');

  const flavorName = useMemo(() => getProductFlavorName(product), [product]);

  const productsBySize = useMemo(() => {
    const map: Partial<Record<ProductSize, UIProduct>> = {};
    relatedProducts.forEach(p => {
      const size = getProductSize(p);
      if (size) map[size] = p;
    });
    return map;
  }, [relatedProducts]);

  const availableSizes = useMemo(() => {
    return (Object.keys(productsBySize) as ProductSize[]).filter(s =>
      s === 'sample' || s === '24pack'
    );
  }, [productsBySize]);

  const currentProduct = useMemo(() => {
    return productsBySize[selectedSize] || product;
  }, [productsBySize, selectedSize, product]);

  const firstVariant = currentProduct.variants?.edges?.[0]?.node;
  const availableForSale =
    (firstVariant?.availableForSale || false) && (firstVariant?.quantityAvailable || 0) > 0;

  const handleSizeChange = (newSize: ProductSize) => {
    setSelectedSize(newSize);
    const params = new URLSearchParams(searchParams.toString());
    params.set('size', newSize);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  // Build the two purchase-option cards for the currently-selected size.
  // Both cards reference the same product (currentProduct) — Monthly is a
  // subscription line, One-Time is a non-subscription line at full price.
  const purchaseOptions = useMemo<PurchaseOption[]>(() => {
    if (selectedSize === 'sample') return [];

    const sizeOption = getSizeOption(selectedSize);
    const stickCount = sizeOption?.stickCount ?? 24;
    const tinLabel = '1 Tin delivered monthly';
    const basePrice = firstVariant?.priceV2?.amount;

    let monthlyDiscount = DEFAULT_MONTHLY_DISCOUNT;
    if (currentProduct.hasSubscriptionOption) {
      const { discountPercentage } = getSubscriptionOptions(currentProduct);
      if (discountPercentage > 0) monthlyDiscount = discountPercentage;
    }

    return [
      {
        id: 'monthly',
        title: `Subscribe and Save ${monthlyDiscount}%`,
        description: `Monthly delivery, save ${monthlyDiscount}%`,
        value: 'subscription',
        discountPercentage: monthlyDiscount,
        deliveryFrequency: 'monthly',
        basePrice,
        stickCount,
        badgeLabel: 'Best Value',
        deliveryLabel: tinLabel,
      },
      {
        id: 'one-time',
        title: 'One-time purchase',
        description: 'Single purchase, no recurring charges',
        value: 'one-time',
        basePrice,
        stickCount,
      },
    ];
  }, [selectedSize, currentProduct, firstVariant]);

  const selectedPurchaseOption = useMemo<PurchaseOption | null>(() => {
    if (selectedSize === 'sample') return null;
    return purchaseOptions.find(o => o.value === purchaseMode) ?? purchaseOptions[0] ?? null;
  }, [selectedSize, purchaseMode, purchaseOptions]);

  const selectedSellingPlan = useMemo<SellingPlan | null>(() => {
    if (selectedSize === 'sample' || purchaseMode !== 'subscription') return null;
    if (!currentProduct.hasSubscriptionOption) return null;
    const { subscriptionPlans } = getSubscriptionOptions(currentProduct);
    return subscriptionPlans[0] ?? null;
  }, [currentProduct, selectedSize, purchaseMode]);

  useEffect(() => {
    if (!onSubscriptionChange) return;
    if (selectedSize === 'sample') {
      onSubscriptionChange(false, 0);
    } else if (selectedPurchaseOption) {
      const isSub = selectedPurchaseOption.value === 'subscription';
      onSubscriptionChange(isSub, isSub ? selectedPurchaseOption.discountPercentage || 0 : 0);
    }
  }, [selectedPurchaseOption, selectedSize, onSubscriptionChange]);

  useEffect(() => {
    if (onProductChange) onProductChange(currentProduct);
  }, [currentProduct, onProductChange]);

  const handlePurchaseOptionChange = (option: PurchaseOption) => {
    setPurchaseMode(option.value);
  };

  return (
    <div className="mt-6">
      <div className="mb-6">
        <SizeSelector3Cards
          selectedSize={selectedSize}
          onChange={handleSizeChange}
          availableSizes={availableSizes}
        />
      </div>

      {selectedSize === 'sample' ? (
        <SampleOptionDisplay flavorName={flavorName} />
      ) : (
        purchaseOptions.length > 0 && selectedPurchaseOption && (
          <SubscriptionMonthlyOneTimeCards
            options={purchaseOptions}
            selectedOption={selectedPurchaseOption}
            onChange={handlePurchaseOptionChange}
            productPrice={firstVariant?.priceV2?.amount}
            quantity={1}
            stickCount={getSizeOption(selectedSize)?.stickCount || 24}
          />
        )
      )}

      <div className="mt-10">
        <AddToCartButton
          variantId={firstVariant?.id || ''}
          productId={currentProduct.id}
          productName={currentProduct.title}
          productHandle={currentProduct.handle}
          price={firstVariant?.priceV2?.amount ? parseFloat(firstVariant.priceV2.amount) : 0}
          availableForSale={availableForSale}
          quantity={1}
          isSubscription={selectedSize !== 'sample' && selectedPurchaseOption?.value === 'subscription'}
          subscriptionFrequency={selectedPurchaseOption?.deliveryFrequency}
          subscriptionDiscount={selectedPurchaseOption?.discountPercentage}
          sellingPlanId={
            selectedSize !== 'sample' &&
            selectedPurchaseOption?.value === 'subscription' &&
            selectedSellingPlan
              ? selectedSellingPlan.id
              : undefined
          }
        />
      </div>
    </div>
  );
}
