// components/EnhancedProductForm.tsx
"use client"; 

import { useState, useEffect } from "react";
import { Radio, RadioGroup } from "@headlessui/react";
import type { UIProduct, SellingPlan } from '@/lib/shopify';
import { getSubscriptionOptions } from '@/lib/shopify';
import AddToCartButton from '@/components/AddToCartButton';
import SubscriptionSelector, { PurchaseOption } from './SubscriptionSelector';
import SubscriptionSelectorV2, { PurchaseOptionV2 } from './SubscriptionSelectorV2';
import QuantitySelector from './QuantitySelector';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface ProductFormProps {
  product: UIProduct;
  onSubscriptionChange?: (isSubscription: boolean, discount: number) => void;
}

type Color = {
  name: string;
  bgColor: string;
  selectedColor: string;
};

export default function EnhancedProductForm({ product, onSubscriptionChange }: ProductFormProps) {
  const [selectedColor, setSelectedColor] = useState<Color | null>(
    product.colors && product.colors.length > 0 ? product.colors[0] : null
  );
  
  // State for selected subscription option
  const [selectedPurchaseOption, setSelectedPurchaseOption] = useState<PurchaseOption | null>(null);
  const [subscriptionOptions, setSubscriptionOptions] = useState<PurchaseOption[]>([]);
  const [selectedSellingPlan, setSelectedSellingPlan] = useState<SellingPlan | null>(null);
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
  
  // Get the first available variant ID
  const firstVariant = product.variants?.edges?.[0]?.node;
  const variantId = firstVariant?.id || '';
  const availableForSale = (firstVariant?.availableForSale || false) && (firstVariant?.quantityAvailable || 0) > 0;
  
  // Get the price
  const price = firstVariant?.priceV2?.amount 
    ? parseFloat(firstVariant.priceV2.amount) 
    : 0;
  
  // Set up subscription options based on product data
  useEffect(() => {
    const options: PurchaseOption[] = [];
    
    // Only show subscription option if the product supports it
    if (product.hasSubscriptionOption) {
      const { subscriptionPlans, discountPercentage } = getSubscriptionOptions(product);
      
      if (subscriptionPlans.length > 0) {
        // Find monthly plan for simplicity (could be enhanced to show multiple options)
        const monthlyPlan = subscriptionPlans.find(plan => 
          plan.name.toLowerCase().includes('month') || 
          plan.options.some(opt => opt.value.toLowerCase().includes('month'))
        );
        
        if (monthlyPlan) {
          // Add subscription option first (will be auto-selected)
          options.push({
            id: 'subscription',
            title: 'Subscribe and Save 33%',
            description: `Monthly delivery, save ${discountPercentage}%`,
            value: 'subscription',
            discountPercentage: discountPercentage,
            deliveryFrequency: 'monthly'
          });
          
          setSelectedSellingPlan(monthlyPlan);
        }
      }
    }
    
    // Add one-time option second
    options.push({
      id: 'one-time',
      title: 'One-time purchase',
      description: 'Single purchase, no recurring charges',
      value: 'one-time'
    });
    
    setSubscriptionOptions(options);
    setSelectedPurchaseOption(options[0]); // Default to subscription (first option)
  }, [product]);

  // Separate effect to notify parent about initial state
  useEffect(() => {
    if (onSubscriptionChange && selectedPurchaseOption) {
      const isSubscription = selectedPurchaseOption.id === 'subscription';
      const discount = selectedPurchaseOption.discountPercentage || 0;
      onSubscriptionChange(isSubscription, discount);
    }
  }, [selectedPurchaseOption, onSubscriptionChange]); 

  // Handle purchase option change
  const handlePurchaseOptionChange = (option: PurchaseOption) => {
    setSelectedPurchaseOption(option);
    
    // Notify parent about subscription change
    if (onSubscriptionChange) {
      const isSubscription = option.id === 'subscription';
      const discount = option.discountPercentage || 0;
      onSubscriptionChange(isSubscription, discount);
    }
  };

  return (
    <div className="mt-6">
      {/* Colors */}
      {product.colors && (
        <div>
          <h3 className="text-sm font-medium text-gray-900">Color</h3>
          <fieldset aria-label="Choose a color" className="mt-2">
            <RadioGroup
              value={selectedColor}
              onChange={setSelectedColor}
              className="flex items-center gap-x-3"
            >
              {product.colors.map((color: Color) => (
                <Radio
                  key={color.name}
                  value={color}
                  aria-label={color.name}
                  className={classNames(
                    color.selectedColor,
                    "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none data-[checked]:ring-2 data-[focus]:data-[checked]:ring data-[focus]:data-[checked]:ring-offset-1"
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={classNames(
                      color.bgColor,
                      "size-8 rounded-full border border-black/10"
                    )}
                  />
                </Radio>
              ))}
            </RadioGroup>
          </fieldset>
        </div>
      )}
      
      {/* Quantity Selector */}
      <QuantitySelector 
        selectedQuantity={selectedQuantity}
        onChange={setSelectedQuantity}
      />
      
      {/* Subscription Options - Only show if product has subscription option */}
      {product.hasSubscriptionOption && subscriptionOptions.length > 1 && selectedPurchaseOption && (
        <SubscriptionSelectorV2 
          options={subscriptionOptions}
          selectedOption={selectedPurchaseOption}
          onChange={handlePurchaseOptionChange}
          productPrice={firstVariant?.priceV2?.amount}
          quantity={selectedQuantity}
        />
      )}

      <div className="mt-10">
        <AddToCartButton 
          variantId={variantId} 
          productId={product.id}
          productName={product.title}
          productHandle={product.handle}
          price={price}
          availableForSale={availableForSale}
          quantity={selectedQuantity}
          isSubscription={selectedPurchaseOption?.value === 'subscription'}
          subscriptionFrequency={selectedPurchaseOption?.deliveryFrequency}
          subscriptionDiscount={selectedPurchaseOption?.discountPercentage}
          sellingPlanId={
            selectedPurchaseOption?.value === 'subscription' && selectedSellingPlan
              ? selectedSellingPlan.id
              : undefined
          }
        />
      </div>
    </div>
  );
}