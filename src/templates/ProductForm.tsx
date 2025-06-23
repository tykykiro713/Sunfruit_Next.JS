"use client"; 

import { useState, useEffect } from "react";
import { Radio, RadioGroup } from "@headlessui/react";
import { HeartIcon } from "@heroicons/react/24/outline";
import type { UIProduct } from '@/lib/shopify';

// Use the same type as in ProductDetails.tsx or make it compatible

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface ProductFormProps {
  product: UIProduct;
}

type Color = {
  name: string;
  bgColor: string;
  selectedColor: string;
};

export default function ProductForm({ product }: ProductFormProps) {
  const [selectedColor, setSelectedColor] = useState<Color | null>(
    product.colors && product.colors.length > 0 ? product.colors[0] : null
  );

  useEffect(() => {
    // Ensure Klaviyo's global object is initialized
    window._klOnsite = window._klOnsite || [];
  }, []);

  // Note: Cart functionality is commented out as per your mention that it's not currently being used
  // const { addToCart } = useCart();
  /* Uncomment when cart is needed:
  addToCart({
    id: product.id,
    title: product.title,
    price: parseFloat(product.priceRange?.minVariantPrice?.amount) || 0,
    quantity: 1,
  });
  */

  const handleAddToCart = (e: React.FormEvent) => {
    e.preventDefault();
  
    // Trigger the Klaviyo form
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

  return (
    <form className="mt-6" onSubmit={handleAddToCart}>
      {/* Colors */}
      {product.colors && (
        <div>
          <h3 className="text-sm font-medium text-gray-600">Color</h3>
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

      <div className="mt-10 flex">
        <button
          type="submit"
          className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-emeraldgreen-500 px-8 py-3 text-base font-medium text-white hover:bg-brightgreen-500 focus:outline-none focus:ring-2 focus:ring-brightgreen-500 sm:w-full"
        >
          Add to Cart
        </button>
        <button
          type="button"
          className="ml-4 flex items-center justify-center rounded-md px-3 py-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
        >
          <HeartIcon aria-hidden="true" className="size-6 shrink-0" />
          <span className="sr-only">Add to favorites</span>
        </button>
      </div>
    </form>
  );
}