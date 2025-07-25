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
import { useCustomer } from "@/context/CustomerContext"; // Import customer context
import Link from "next/link";
import Image from "next/image"; // Import Next.js Image component
import { useRouter } from 'next/navigation';

// Import the custom logo component
import SunfruitLogo from "./SunfruitLogo";

// Import the optimized image component
import OptimizedImage from "./OptimizedImage";

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState<ProductNode[]>([]);
  const { openCart, cartCount } = useCart();
  const { isLoggedIn, customer } = useCustomer(); // Use customer context
  const router = useRouter();

  // Function to handle logo click and force navigation to home
  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default to ensure our handling works
    router.push('/');   // Use Next.js Router for client-side navigation
  };

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
      { name: "About Us", href: "/aboutus" },
      { name: "Find Us", href: "/findus" },
    ],
  };

  // Get the appropriate account link and text based on login status
  const accountLink = isLoggedIn ? "/account" : "/account/login";
  const accountText = isLoggedIn ? "My Account" : "Sign In";

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
                      className="flex-1 whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-lg font-bold text-gray-900 data-[selected]:border-emeraldgreen-500 data-[selected]:text-emeraldgreen-500"
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
                          <Link href={item.href} className="block relative aspect-square w-full rounded-md bg-gray-100 overflow-hidden">
                            <Image
                              alt={item.imageAlt}
                              src={item.imageSrc}
                              className="object-cover group-hover:opacity-75 transition duration-200"
                              fill
                              sizes="(max-width: 640px) 50vw, 25vw"
                              loading="lazy" // LAZY LOADING: Dropdown images are hidden by default
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
            
            {/* Added mobile links for About Us and Find Us */}
            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              {navigation.pages.map((page) => (
                <div key={page.name} className="flow-root">
                  <Link href={page.href} className="-m-2 block p-2 font-medium text-gray-900">
                    {page.name}
                  </Link>
                </div>
              ))}
            </div>

            {/* Updated user profile link for mobile */}
            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              <div className="flow-root">
                <Link href={accountLink} className="-m-2 block p-2 font-medium text-gray-900">
                  {accountText}
                </Link>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <header className="relative z-40 lg:z-50">
        <nav aria-label="Top">
          <div className="bg-white w-full border-b border-gray-200">
            <div className="px-4 sm:px-6 md:px-6 lg:px-32 xl:px-40">
              <div className="w-full">
                {/* Preserve the original layout structure */}
                <div className="flex h-16 items-center">
                  {/* Mobile menu button - taking up equal space as cart on mobile */}
                  <div className="flex w-10 lg:hidden">
                    <button
                      type="button"
                      onClick={() => setOpen(true)}
                      className="inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    >
                      <span className="sr-only">Open menu</span>
                      <Bars3Icon aria-hidden="true" className="h-6 w-6" />
                    </button>
                  </div>

                  {/* Desktop navigation - left side */}
                  <div className="hidden lg:flex lg:w-1/3 lg:items-center lg:justify-end">
                    <div className="flex space-x-16 mr-10">
                      {navigation.categories.map((category) => (
                        <Popover key={category.name} className="flex">
                          <div className="relative flex">
                            <PopoverButton className="relative z-10 flex items-center pt-px text-xl font-bold text-black transition-colors duration-200 ease-out hover:text-emeraldgreen-500 data-[open]:text-emeraldgreen-500 focus:outline-none">
                              {category.name}
                            </PopoverButton>
                          </div>
                          <PopoverPanel
                            transition
                            className="absolute inset-x-0 top-full text-base text-gray-500 transition data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
                          >
                            <div className="relative bg-white">
                              <div className="mx-auto max-w-7xl px-8">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10 py-16">
                                  {category.featured.map((item) => (
                                    <div key={item.name} className="group relative">
                                      <Link href={item.href} className="relative block aspect-square w-full rounded-md bg-gray-100 overflow-hidden">
                                        <Image
                                          alt={item.imageAlt}
                                          src={item.imageSrc}
                                          className="object-cover group-hover:opacity-75 transition duration-200"
                                          fill
                                          sizes="(max-width: 768px) 50vw, 25vw"
                                          loading="lazy" // LAZY LOADING: Dropdown images are hidden by default
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
                          className="flex items-center text-xl font-bold text-black hover:text-emeraldgreen-500 whitespace-nowrap"
                        >
                          {page.name}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Tablet navigation - fixed spacing and proper link */}
                  <div className="hidden md:flex lg:hidden justify-start w-1/3 pl-4">
                    <div className="flex space-x-3 md:space-x-4">
                      <Link
                        href="/shop"
                        className="flex items-center text-sm md:text-base font-bold text-black hover:text-emeraldgreen-500 whitespace-nowrap transition-colors duration-200 ease-out focus:outline-none"
                      >
                        Shop
                      </Link>
                      {navigation.pages.map((page) => (
                        <Link
                          key={page.name}
                          href={page.href}
                          className="flex items-center text-sm md:text-base font-bold text-black hover:text-emeraldgreen-500 whitespace-nowrap"
                        >
                          {page.name}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Logo - center, with OVERLAY DIV to handle clicks */}
                  <div className="flex flex-1 justify-center md:w-1/3 lg:w-1/3">
                    <div className="relative">
                      {/* Keep your original Link and SunfruitLogo */}
                      <Link href="/" className="flex items-center justify-center">
                        <SunfruitLogo />
                      </Link>
                      
                      {/* Add overlay div that will actually capture clicks */}
                      <div 
                        className="absolute inset-0 cursor-pointer z-10" 
                        onClick={handleLogoClick}
                        role="link"
                        tabIndex={0}
                        aria-label="Go to homepage"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleLogoClick(e as any);
                        }}
                      />
                    </div>
                  </div>

                  {/* User and Cart icons - right, restored original structure */}
                  <div className="flex w-10 md:w-1/3 lg:w-1/3 items-center justify-center md:justify-end lg:justify-end">
                    <div className="md:pr-6 flex items-center space-x-4">
                      {/* User Icon - updated without pulsing green dot */}
                      <Link href={accountLink} className="hidden md:flex group items-center gap-1.5 p-2 whitespace-nowrap">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          fill="none" 
                          aria-hidden="true" 
                          viewBox="0 0 24 24" 
                          role="img"
                          width="28" 
                          height="28"
                          className="shrink-0 text-black group-hover:text-emeraldgreen-500"
                          style={{transform: "scale(1.2)"}}
                        >
                          <path 
                            vectorEffect="non-scaling-stroke" 
                            stroke="currentColor" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeMiterlimit="10" 
                            strokeWidth="1.5" 
                            d="M12 21a9 9 0 100-18 9 9 0 000 18z"
                          ></path>
                          <path 
                            vectorEffect="non-scaling-stroke" 
                            stroke="currentColor" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeMiterlimit="10" 
                            strokeWidth="1.5" 
                            d="M12 11.73a2.97 2.97 0 100-5.94 2.97 2.97 0 000 5.94zm0 1.89c-2.88 0-5.31 2.34-5.31 5.31v.36C8.22 20.37 10.02 21 12 21c1.98 0 3.78-.63 5.31-1.71v-.36c0-2.88-2.43-5.31-5.31-5.31z"
                          ></path>
                        </svg>
                        <span className="text-gray-900 group-hover:text-emeraldgreen-500 font-sans">
                          {accountText}
                        </span>
                      </Link>
                      
                      {/* Cart Icon - visible on all screen sizes */}
                      <button
                        onClick={openCart}
                        className="group flex items-center gap-1.5 p-2 whitespace-nowrap relative"
                      >
                        <div className="relative">
                          <ShoppingBagIcon
                            aria-hidden="true"
                            className="size-6 lg:size-7 shrink-0 text-black group-hover:text-emeraldgreen-500"
                          />
                          {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-emeraldgreen-500 text-xs font-medium text-white">
                              {cartCount}
                            </span>
                          )}
                        </div>
                        <span className="hidden md:inline text-black group-hover:text-emeraldgreen-500 font-sans">Cart</span>
                        <span className="sr-only">View cart</span>
                      </button>
                    </div>
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