"use client";

declare global {
  interface KlaviyoObject {
    openForm(formId: string): void;
    push(args: any[]): void;
  }
  
  interface Window {
    _klOnsite: KlaviyoObject;
  }
}

import { useState, useEffect } from "react";
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
import { useCart } from '@/context/CartContext';
import { StarIcon } from "@heroicons/react/20/solid";
import type { UIProduct } from '@/types/shopify';
import { HeartIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/outline";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface Product {
  title: string;
  description: string;
  priceRange?: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  images?: {
    edges: { 
      node: { 
        url: string; 
        altText: string | null;
      } 
    }[];
  };
  media?: {
    edges: {
      node: {
        mediaContentType: string;
        alt: string | null;
        image?: {
          url: string;
          altText: string | null;
        };
        previewImage?: {
          image: {
            url: string;
            altText: string | null;
          };
        };
        sources?: {
          url: string;
          mimeType: string;
        }[];
      };
    }[];
  };
  colors?: Color[];
  rating?: number;
}

type Color = {
  name: string;
  bgColor: string;
  selectedColor: string;
};

export default function ProductDetails({ product }: { product: UIProduct }) {
  const [selectedColor, setSelectedColor] = useState<Color | null>(
    product.colors && product.colors.length > 0 ? product.colors[0] : null
  );

  const accordionItems = [
    {
      name: "Description",
      content: [
        "Now made from organic lemon and organic mint",
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

  useEffect(() => {
    // Ensure Klaviyo's global object is initialized
    window._klOnsite = window._klOnsite || [];
  }, []);

  const { addToCart } = useCart();
  
  const handleAddToCart = (e: React.FormEvent) => {
    e.preventDefault();
  
    // Add the product to the cart
    //addToCart({
      //id: product.id,
      //title: product.title,
      //price: parseFloat(product.priceRange?.minVariantPrice?.amount) || 0,
      //quantity: 1,
    //});
  
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
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          {/* Image and Video gallery */}
          <TabGroup className="flex flex-col-reverse">
            {/* Media selector */}
            <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
            <TabList className="grid grid-cols-4 gap-6">
              {product.media?.edges.map((mediaItem, idx) => (
                <Tab
                  key={idx}
                  className="group relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-green-500/50 focus:ring-offset-4"
                >
                  <span className="sr-only">
                    {mediaItem.node.alt || "Product Media"}
                  </span>
                  <span className="absolute inset-0 overflow-hidden rounded-md">
                    {mediaItem.node.mediaContentType === 'VIDEO' ? (
                      <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full aspect-square object-cover sm:rounded-lg"
                        poster={mediaItem.node.previewImage?.image?.url || mediaItem.node.image?.url}
                      >
                        {mediaItem.node.sources?.map((source, sourceIdx) => (
                          <source
                            key={sourceIdx}
                            src={source.url}
                            type={source.mimeType}
                          />
                        ))}
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <img
                        alt={mediaItem.node.alt || "Product Image"}
                        src={mediaItem.node.image?.url}
                        className="aspect-square w-full object-cover sm:rounded-lg"
                      />
                    )}
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
              {product.media?.edges.map((mediaItem, idx) => (
                <TabPanel key={idx}>
                  {mediaItem.node.mediaContentType === 'VIDEO' ? (
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full aspect-square object-cover sm:rounded-lg"
                      poster={mediaItem.node.previewImage?.image?.url || mediaItem.node.image?.url}
                    >
                      {mediaItem.node.sources?.map((source, sourceIdx) => (
                        <source
                          key={sourceIdx}
                          src={source.url}
                          type={source.mimeType}
                        />
                      ))}
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <img
                      alt={mediaItem.node.alt || "Product Image"}
                      src={mediaItem.node.image?.url}
                      className="aspect-square w-full object-cover sm:rounded-lg"
                    />
                  )}
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
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">
                {product.priceRange
                  ? `${product.priceRange.minVariantPrice.amount} ${product.priceRange.minVariantPrice.currencyCode}`
                  : "N/A"}
              </p>
            </div>

            {/* Reviews */}
            <div className="mt-3">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      aria-hidden="true"
                      className={classNames(
                        (product.rating || 0) > rating
                          ? "text-green-500"
                          : "text-gray-300",
                        "size-5 shrink-0"
                      )}
                    />
                  ))}
                </div>
                <p className="sr-only">{product.rating || 0} out of 5 stars</p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>
              <div
                className="space-y-6 text-base text-gray-700"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>

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
                  className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-green-500 px-8 py-3 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2 focus:ring-offset-green-700 sm:w-full"
                >
                  Add to Bag
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

            <section aria-labelledby="details-heading" className="mt-12">
              <h2 id="details-heading" className="sr-only">
                Additional details
              </h2>

              <div className="divide-y divide-gray-200 border-t">
                {accordionItems.map((item, idx) => (
                  <Disclosure key={idx} as="div">
                    <h3>
                      <DisclosureButton className="group relative flex w-full items-center justify-between py-6 text-left">
                        <span className="text-sm font-medium text-gray-900 group-data-[open]:text-green-600">
                          {item.name}
                        </span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon
                            aria-hidden="true"
                            className="block size-6 text-gray-400 group-hover:text-gray-500 group-data-[open]:hidden"
                          />
                          <MinusIcon
                            aria-hidden="true"
                            className="hidden size-6 text-green-400 group-hover:text-green-500 group-data-[open]:block"
                          />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pb-6">
                      <ul
                        role="list"
                        className="list-disc space-y-1 pl-5 text-sm text-gray-700 marker:text-gray-300"
                      >
                        {item.content.map((content, idx) => (
                          <li key={idx} className="pl-2">
                            {content}
                          </li>
                        ))}
                      </ul>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}


