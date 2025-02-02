"use client";

import { Fragment, useState, useEffect } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/react";
import { Bars3Icon, ShoppingBagIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { fetchProducts, ProductNode } from "@/lib/shopify";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { cart } = useCart();
  const [products, setProducts] = useState<ProductNode[]>([]);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (cart.length > 0) {
      setDrawerOpen(true);
    }
  }, [cart]);

  useEffect(() => {
    async function loadProducts() {
      try {
        const fetchedProducts = await fetchProducts(4);
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    loadProducts();
  }, []);

  const navigation = {
    categories: [
      {
        name: "Shop",
        featured: products.map((product) => ({
          name: product.title,
          href: `/products/${product.handle}`,
          imageSrc: product.images?.edges[0]?.node.url || "/placeholder-image.png",
          imageAlt: product.images?.edges[0]?.node.altText || product.title,
        })),
      },
    ],
    pages: [
      { name: "About Us", href: "#" },
      { name: "Find Us", href: "#" },
    ],
  };

  return (
    <div className="bg-white">
      {/* Mobile menu */}
      <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
        />
        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:-translate-x-full"
          >
            <div className="flex px-4 pb-2 pt-5">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <TabGroup className="mt-2">
              <div className="border-b border-gray-200">
                <TabList className="-mb-px flex space-x-8 px-4">
                  {navigation.categories.map((category) => (
                    <Tab
                      key={category.name}
                      className="flex-1 whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-base font-medium text-gray-900 data-[selected]:border-indigo-600 data-[selected]:text-indigo-600"
                    >
                      {category.name}
                    </Tab>
                  ))}
                </TabList>
              </div>
              <TabPanels as={Fragment}>
                {navigation.categories.map((category) => (
                  <TabPanel key={category.name} className="space-y-12 px-4 py-6">
                    <div className="grid grid-cols-2 gap-x-4 gap-y-10">
                      {category.featured.map((item) => (
                        <div key={item.name} className="group relative">
                          <Link href={item.href}>
                            <img
                              alt={item.imageAlt}
                              src={item.imageSrc}
                              className="aspect-square w-full rounded-md bg-gray-100 object-cover group-hover:opacity-75 transition duration-200"
                            />
                          </Link>
                          <Link href={item.href} className="mt-6 block text-sm font-medium text-gray-900">
                            {item.name}
                          </Link>
                        </div>
                      ))}
                    </div>
                  </TabPanel>
                ))}
              </TabPanels>
            </TabGroup>
          </DialogPanel>
        </div>
      </Dialog>

      <header className="relative z-40 lg:z-50">
        <nav aria-label="Top">
          <div className="bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="border-b border-gray-200">
                <div className="flex h-16 items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setOpen(true)}
                    className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 lg:hidden"
                  >
                    <span className="sr-only">Open menu</span>
                    <Bars3Icon aria-hidden="true" className="h-6 w-6" />
                  </button>
                  <div className="flex-1 flex justify-center lg:justify-start">
                    <Link href="/">
                      <img alt="" src="/images/Sunfruit_Green_Logo.png" className="h-8 w-auto" />
                    </Link>
                  </div>

                  <div className="hidden h-full lg:flex">
                    <PopoverGroup className="inset-x-0 bottom-0 px-4">
                      <div className="flex h-full justify-center space-x-8">
                        {navigation.categories.map((category) => (
                          <Popover key={category.name} className="flex">
                            <div className="relative flex">
                              <PopoverButton className="relative z-10 -mb-px flex items-center border-b-2 border-transparent pt-px text-lg font-bold text-emeraldgreen-500 transition-colors duration-200 ease-out hover:text-brightgreen-500 data-[open]:border-indigo-600 data-[open]:text-indigo-600">
                                {category.name}
                              </PopoverButton>
                            </div>
                            <PopoverPanel
                              transition
                              className="absolute inset-x-0 top-full text-sm text-gray-500 transition data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
                            >
                              <div className="relative bg-white">
                                <div className="mx-auto max-w-7xl px-8">
                                  <div className="grid grid-cols-4 gap-x-8 gap-y-10 py-16">
                                    {category.featured.map((item) => (
                                      <div key={item.name} className="group relative">
                                        <Link href={item.href}>
                                          <img
                                            alt={item.imageAlt}
                                            src={item.imageSrc}
                                            className="aspect-square w-full rounded-md bg-gray-100 object-cover group-hover:opacity-75 transition duration-200"
                                          />
                                        </Link>
                                        <Link href={item.href} className="mt-4 block font-medium text-gray-900">
                                          {item.name}
                                        </Link>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </PopoverPanel>
                          </Popover>
                        ))}

                        {navigation.pages.map((page) => (
                          <Link
                            key={page.name}
                            href={page.href}
                            className="flex items-center text-lg font-bold text-emeraldgreen-500 hover:text-brightgreen-500"
                          >
                            {page.name}
                          </Link>
                        ))}
                      </div>
                    </PopoverGroup>
                  </div>

                  <div className="flex flex-1 items-center justify-end">
                    <div className="flex items-center lg:ml-8">
                      <button
                        onClick={() => setDrawerOpen(!isDrawerOpen)}
                        className="group -m-2 flex items-center p-2"
                      >
                        <ShoppingBagIcon
                          aria-hidden="true"
                          className="size-6 shrink-0 text-gray-400 group-hover:text-gray-500"
                        />
                        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                          {cart.length}
                        </span>
                        <span className="sr-only">items in cart, view bag</span>
                      </button>
                    </div>

                    {/* Cart Drawer */}
                    {isDrawerOpen && (
                      <div className="fixed inset-y-0 right-0 w-96 bg-white shadow-lg z-50">
                        <div className="p-4">
                          <h2 className="text-xl font-bold">The Cart</h2>
                          <ul>
                            {cart.map((item) => (
                              <li key={item.id} className="flex items-center justify-between py-2">
                                <div>
                                  <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-16 h-16 object-cover"
                                  />
                                  <p>{item.title}</p>
                                </div>
                                <p>${item.price}</p>
                              </li>
                            ))}
                          </ul>
                          <button
                            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md"
                            onClick={() => setDrawerOpen(false)}
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
