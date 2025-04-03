"use client";

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import type { UIProduct } from '@/lib/shopify';

interface ProductMediaProps {
  product: UIProduct;
}

export default function ProductMedia({ product }: ProductMediaProps) {
  // Use the product images directly for a consistent gallery
  const productImages = product.images?.edges || [];
  
  // If we have no images at all, return empty to avoid errors
  if (productImages.length === 0) {
    return null;
  }
  
  return (
    <TabGroup>
      {/* Main image display */}
      <TabPanels className="mb-6">
        {productImages.map((image, idx) => (
          <TabPanel key={idx}>
            <img
              alt={image.node.altText || "Product Image"}
              src={image.node.url}
              className="aspect-square w-full object-cover sm:rounded-lg"
            />
          </TabPanel>
        ))}
      </TabPanels>

      {/* Thumbnail gallery */}
      <div className="w-full">
        <TabList className="grid grid-cols-4 gap-3 md:gap-4">
          {productImages.map((image, idx) => (
            <Tab
              key={idx}
              className="group relative aspect-square cursor-pointer rounded-md bg-white focus:outline-none"
            >
              <span className="sr-only">
                Product Image {idx + 1}
              </span>
              <div className="overflow-hidden rounded-md h-full w-full border border-gray-200">
                <img
                  alt={image.node.altText || "Product Image"}
                  src={image.node.url}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-md ring-2 ring-transparent ring-offset-2 group-data-[selected]:ring-green-500"
              />
            </Tab>
          ))}
        </TabList>
      </div>
    </TabGroup>
  );
}