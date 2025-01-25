"use client";

import { useState } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Radio,
  RadioGroup,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetails({ product }: { product: any }) {
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || null);

  const accordionItems = [
    {
      name: "Description",
      content: [
        "Made from organic lemon and organic mint",
        "Prebiotics to improve gut health",
        "5 Calories, Zero sugar, Zero Carbs, Zero Preservatives",
        "Simply mix with 16oz of water and enjoy",
        "20 stick packs per can",
      ],
    },
    {
      name: "Ingredients",
      content: [
        "Organic Lemon Juice",
        "Organic Acacia Fiber (Prebiotic)",
        "Organic Mint",
        "Organic Monk Fruit Extract",
      ],
    },
    {
      name: "Shipping & Returns",
      content: [
        "Free Shipping on all orders",
        "100% Satisfaction Guarantee or your money back",
        "We are unable to accept returns on opened product",
      ],
    },
    {
      name: "Subscription",
      content: [
        "Free Shipping on all orders",
        "100% Satisfaction Guarantee or your money back",
        "We are unable to accept returns on opened product",
      ],
    },
  ];

  const handleAddToCart = () => {
    console.log("Triggered Klaviyo modal for product:", product);

    // Commented out the cart drawer trigger
    addToCart({
       id: product.id,
       title: product.title,
       price: product.priceRange?.minVariantPrice?.amount || "N/A",
       image: product.images?.edges[0]?.node.url || "/placeholder-image.png",
       selectedColor: selectedColor?.name || null,
    });

    // Trigger the Klaviyo modal
    if (typeof window !== "undefined" && window._klOnsite) {
      window._klOnsite.openForm([
        "WkfLba", // Replace with your Klaviyo form ID
        () => console.log("Klaviyo modal triggered"),
      ]);
    }
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          {/* Image gallery */}
          <TabGroup className="flex flex-col-reverse">
            <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
              <TabList className="grid grid-cols-4 gap-6">
                {product.images?.edges.map((image: any, idx: number) => (
                  <Tab
                    key={idx}
                    className="group relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-green-500/50 focus:ring-offset-4"
                  >
                    <span className="sr-only">{image.node.altText || "Product Image"}</span>
                    <span className="absolute inset-0 overflow-hidden rounded-md">
                      <img
                        alt={image.node.altText || "Product Image"}
                        src={image.node.url}
                        className="size-full object-cover"
                      />
                    </span>
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 rounded-md ring-2 ring-transparent ring-offset-2 group-data-[selected]:ring-green-500"
                    />
                  </Tab>
                ))}
              </TabList>
            </div>

            <TabPanels>
              {product.images?.edges.map((image: any, idx: number) => (
                <TabPanel key={idx}>
                  <img
                    alt={image.node.altText || "Product Image"}
                    src={image.node.url}
                    className="aspect-square w-full object-cover sm:rounded-lg"
                  />
                </TabPanel>
              ))}
            </TabPanels>
          </TabGroup>

          {/* Product info */}
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {product.title}
            </h1>

            <div className="mt-3">
              <p className="text-3xl tracking-tight text-gray-900">
                {product.priceRange
                  ? `${product.priceRange.minVariantPrice.amount} ${product.priceRange.minVariantPrice.currencyCode}`
                  : "N/A"}
              </p>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>
              <div
                className="space-y-6 text-base text-gray-700"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>

            <form className="mt-6">
              <div className="mt-10 flex">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-brightgreen-500 px-8 py-3 text-base font-medium text-white hover:bg-darkteal-500 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2 focus:ring-offset-green-700 sm:w-full"
                >
                  Add to bag
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
