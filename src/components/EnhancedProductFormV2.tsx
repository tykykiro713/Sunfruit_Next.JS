// components/EnhancedProductFormV2.tsx
"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import type { UIProduct, SellingPlan } from '@/lib/shopify';
import { getSubscriptionOptions } from '@/lib/shopify';
import { useCart } from '@/context/CartContext';
import { trackAddToCart } from '@/lib/analytics';
import AddToCartButton from '@/components/AddToCartButton';
import SubscriptionMonthly3MonthCards, { PurchaseOptionV2 } from './SubscriptionMonthly3MonthCards';
import SizeSelector2Cards from './SizeSelector2Cards';
import SampleOptionDisplay from './SampleOptionDisplay';
import {
  ProductSize,
  getProductSize,
  findProductBySize,
  getProductFlavorName,
  getSizeOption,
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
  const { addItem } = useCart();

  // State. `selectedSize` is the single source of truth — it drives the image,
  // the URL (?size=...), the cart variant, AND which radio option is checked.
  // (Monthly ↔ '24pack', 3-Month ↔ '72pack'.)
  const [selectedSize, setSelectedSize] = useState<ProductSize>(initialSize);
  const [buyOnceLoading, setBuyOnceLoading] = useState(false);

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

  // Available tile sizes — shown in the SizeSelector. '72pack' is intentionally
  // excluded since it has no tile of its own (reachable only via the 3-Month radio).
  const availableSizes = useMemo(() => {
    return (Object.keys(productsBySize) as ProductSize[]).filter(s => s !== '72pack');
  }, [productsBySize]);

  // The "currently displayed" product — drives image/display, URL, and cart variant.
  const currentProduct = useMemo(() => {
    return productsBySize[selectedSize] || product;
  }, [productsBySize, selectedSize, product]);

  const firstVariant = currentProduct.variants?.edges?.[0]?.node;
  const availableForSale = (firstVariant?.availableForSale || false) && (firstVariant?.quantityAvailable || 0) > 0;

  // Handle size change — updates state + URL. Called both from the size tiles
  // (SizeSelector) and from the subscription radio (Monthly/3-Month).
  const handleSizeChange = (newSize: ProductSize) => {
    setSelectedSize(newSize);
    const params = new URLSearchParams(searchParams.toString());
    params.set('size', newSize);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  // Build the subscription radio options (Monthly + 3-Month). These are stable
  // regardless of which tile/radio is selected — selection state is derived below.
  const twentyFourPack = productsBySize['24pack'];
  const seventyTwoPack = productsBySize['72pack'];
  const twentyFourPackPrice = twentyFourPack?.variants?.edges?.[0]?.node?.priceV2?.amount;
  const seventyTwoPackPrice = seventyTwoPack?.variants?.edges?.[0]?.node?.priceV2?.amount;

  const subscriptionOptions = useMemo<PurchaseOptionV2[]>(() => {
    if (selectedSize === 'sample') return [];

    const options: PurchaseOptionV2[] = [];
    const DEFAULT_MONTHLY_DISCOUNT = 15;
    const THREE_MONTH_DISCOUNT = 25;

    // Monthly (24-pack)
    if (twentyFourPack) {
      let monthlyDiscount = DEFAULT_MONTHLY_DISCOUNT;
      if (twentyFourPack.hasSubscriptionOption) {
        const { discountPercentage } = getSubscriptionOptions(twentyFourPack);
        if (discountPercentage > 0) monthlyDiscount = discountPercentage;
      }
      options.push({
        id: 'monthly',
        title: `Monthly Delivery - Save ${monthlyDiscount}%`,
        description: `Monthly delivery, save ${monthlyDiscount}%`,
        value: 'subscription',
        discountPercentage: monthlyDiscount,
        deliveryFrequency: 'monthly',
        basePrice: twentyFourPackPrice,
        stickCount: 24,
        badgeLabel: 'Most Popular',
        deliveryLabel: '1 Tin delivered monthly',
      });
    }

    // 3-Month (72-pack)
    if (seventyTwoPack && seventyTwoPackPrice) {
      options.push({
        id: '3-month',
        title: `3 Month Delivery - Save ${THREE_MONTH_DISCOUNT}%`,
        description: `Ships every 3 months, save ${THREE_MONTH_DISCOUNT}%`,
        value: 'subscription',
        discountPercentage: THREE_MONTH_DISCOUNT,
        deliveryFrequency: '3-month',
        basePrice: seventyTwoPackPrice,
        stickCount: 72,
        badgeLabel: 'Best Value',
        deliveryLabel: '3 Tins delivered every 3 months',
      });
    }

    return options;
  }, [selectedSize, twentyFourPack, seventyTwoPack, twentyFourPackPrice, seventyTwoPackPrice]);

  // Which radio option is currently checked — derived from selectedSize.
  const selectedPurchaseOption = useMemo<PurchaseOptionV2 | null>(() => {
    if (selectedSize === 'sample') return null;
    const id = selectedSize === '72pack' ? '3-month' : 'monthly';
    return subscriptionOptions.find(o => o.id === id) ?? subscriptionOptions[0] ?? null;
  }, [selectedSize, subscriptionOptions]);

  // Selling plan for cart — always from the currently displayed product
  // (which is 24-pack when Monthly is selected, 72-pack when 3-Month is selected).
  const selectedSellingPlan = useMemo<SellingPlan | null>(() => {
    if (selectedSize === 'sample' || !currentProduct.hasSubscriptionOption) return null;
    const { subscriptionPlans } = getSubscriptionOptions(currentProduct);
    return subscriptionPlans[0] ?? null;
  }, [currentProduct, selectedSize]);

  // Notify parent about subscription changes (for pricing display, etc.)
  useEffect(() => {
    if (!onSubscriptionChange) return;
    if (selectedSize === 'sample') {
      onSubscriptionChange(false, 0);
    } else if (selectedPurchaseOption) {
      onSubscriptionChange(true, selectedPurchaseOption.discountPercentage || 0);
    }
  }, [selectedPurchaseOption, selectedSize, onSubscriptionChange]);

  // Notify parent about product changes (for updating images)
  useEffect(() => {
    if (onProductChange) {
      onProductChange(currentProduct);
    }
  }, [currentProduct, onProductChange]);

  // Radio click → flip the size (which triggers URL + image + cart updates in lockstep).
  const handlePurchaseOptionChange = (option: PurchaseOptionV2) => {
    handleSizeChange(option.id === '3-month' ? '72pack' : '24pack');
  };

  // Handle one-click "Buy Once" — always adds the 24-pack as a one-time purchase
  // (no selling plan) and opens the cart drawer. Independent of the radio selection.
  const oneTimeProduct = productsBySize['24pack'];
  const oneTimeVariant = oneTimeProduct?.variants?.edges?.[0]?.node;
  const oneTimeVariantId = oneTimeVariant?.id;
  const oneTimePriceNum = oneTimeVariant?.priceV2?.amount ? parseFloat(oneTimeVariant.priceV2.amount) : null;
  const oneTimeAvailable = !!oneTimeVariant?.availableForSale && (oneTimeVariant?.quantityAvailable || 0) > 0;

  const handleBuyOnce = async () => {
    if (!oneTimeVariantId || !oneTimeAvailable || buyOnceLoading) return;
    setBuyOnceLoading(true);
    try {
      trackAddToCart(
        oneTimeProduct!.id,
        oneTimeProduct!.title,
        oneTimeVariantId,
        oneTimePriceNum ?? 0,
        1,
        false,
        undefined
      );
      await addItem(oneTimeVariantId, 1); // addItem opens the cart drawer on success
    } finally {
      setBuyOnceLoading(false);
    }
  };

  // Determine quantity for AddToCartButton
  // For sample: 1 (it's a single product)
  // For 24pack: 1 (it's a single product)
  const quantity = 1;

  return (
    <div className="mt-6">
      {/* Size Selector */}
      <div className="mb-6">
        <SizeSelector2Cards
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
        // 24pack or 72pack — show subscription options (Monthly + 3-Month)
        subscriptionOptions.length > 0 && selectedPurchaseOption && (
          <SubscriptionMonthly3MonthCards
            options={subscriptionOptions}
            selectedOption={selectedPurchaseOption}
            onChange={handlePurchaseOptionChange}
            productPrice={firstVariant?.priceV2?.amount}
            quantity={quantity}
            stickCount={getSizeOption(selectedSize)?.stickCount || 24}
          />
        )
      )}

      {/* Add to Cart Button — variant, price, selling plan all flow from currentProduct,
          which has already swapped to the 24/72-pack based on the selected radio. */}
      <div className="mt-10">
        <AddToCartButton
          variantId={firstVariant?.id || ''}
          productId={currentProduct.id}
          productName={currentProduct.title}
          productHandle={currentProduct.handle}
          price={firstVariant?.priceV2?.amount ? parseFloat(firstVariant.priceV2.amount) : 0}
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

        {/* One-time "Buy Once" text link — independent of the radio above.
            Always adds the 24-pack as a non-subscription line and opens the cart drawer.
            Width matches the Add-to-Cart button (md:w-1/2) so `text-center` visually
            centers the link directly beneath the button, not the full page. */}
        {selectedSize !== 'sample' && oneTimeVariantId && oneTimeAvailable && oneTimePriceNum !== null && (
          <div className="md:w-1/2 w-full mt-8 text-center">
            <button
              type="button"
              onClick={handleBuyOnce}
              disabled={buyOnceLoading}
              className="text-base text-gray-800 underline underline-offset-4 hover:text-emeraldgreen-500 disabled:opacity-60"
            >
              {buyOnceLoading
                ? 'Adding...'
                : `Buy Once for $${oneTimePriceNum.toFixed(2)}`}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
