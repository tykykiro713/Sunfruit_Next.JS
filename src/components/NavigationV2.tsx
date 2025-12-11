"use client";

import { Fragment, useState, useEffect } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useCart } from "@/context/CartContext";
import { useCustomer } from "@/context/CustomerContext";
import { fetchProducts, ProductNode } from "@/lib/shopify";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import SunfruitLogo from "./SunfruitLogo";

interface NavigationV2Props {
  className?: string;
}

export default function NavigationV2({ className = "" }: NavigationV2Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [products, setProducts] = useState<ProductNode[]>([]);
  const { openCart, cartCount } = useCart();
  const { isLoggedIn } = useCustomer();
  const router = useRouter();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch products for navigation
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

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push('/');
  };

  const navigation = {
    shop: products.map((product) => ({
      name: product.title,
      href: `/products/${product.handle}`,
      imageSrc: product.images?.edges[0]?.node.url || "/placeholder-image.png",
      imageAlt: product.images?.edges[0]?.node.altText || product.title,
    })),
    pages: [
      { name: "About Us", href: "/aboutus" },
      { name: "Find Us", href: "/vine" },
    ],
  };

  const accountLink = isLoggedIn ? "/account" : "/account/login";

  return (
    <>
      {/* Navigation */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-[150] transition-all duration-300 ${className}`}
        style={{
          backgroundColor: mobileMenuOpen ? '#ffffff' : isScrolled ? '#ffffff' : 'transparent',
          borderBottom: mobileMenuOpen ? '1px solid #e5e7eb' : 'none'
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Left side - Logo and Hamburger */}
            <div className="flex items-center gap-4">
              {/* Hamburger menu button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className={`rounded-md p-2 transition-colors ${
                  isScrolled || mobileMenuOpen ? 'text-gray-700 hover:text-emeraldgreen-500' : 'text-white hover:text-gray-200'
                }`}
              >
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div className="relative">
                <Link href="/" className="flex items-center">
                  <div className={`transition-opacity duration-300 ${!isScrolled && !mobileMenuOpen ? 'brightness-0 invert' : ''}`}>
                    <SunfruitLogo />
                  </div>
                </Link>
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

            {/* Right side - Sign In and Cart */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Sign In Icon */}
              <Link 
                href={accountLink} 
                className={`rounded-full p-2 transition-colors ${
                  isScrolled || mobileMenuOpen ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
                }`}
                aria-label={isLoggedIn ? "My Account" : "Sign In"}
              >
                <svg 
                  className="h-6 w-6" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor" 
                  strokeWidth="1.5"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" 
                  />
                </svg>
              </Link>

              {/* Cart Icon */}
              <button
                onClick={openCart}
                className={`relative rounded-full p-2 transition-colors ${
                  isScrolled || mobileMenuOpen ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
                }`}
                aria-label="View cart"
              >
                <svg 
                  className="h-6 w-6" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor" 
                  strokeWidth="1.5"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" 
                  />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-emeraldgreen-500 text-xs font-medium text-white">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Menu pop-in - Full width like live site but positioned under nav */}
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="relative z-[100]">
        <DialogBackdrop
          transition
          className="fixed top-16 left-0 right-0 bottom-0 bg-black/25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
        />
        <div className="fixed left-0 top-16 bottom-0 z-[100] w-80">
          <DialogPanel
            transition
            className="relative flex w-full max-w-xs h-full transform flex-col overflow-y-auto bg-white pb-12 transition duration-300 ease-in-out data-[closed]:-translate-x-full"
            style={{ boxShadow: 'none', border: 'none', outline: 'none' }}
          >
            <div className="flex px-4 pb-2 pt-5">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>

            {/* Shop section with tab-like styling */}
            <div className="mt-2">
              <div className="border-b border-gray-200">
                <div className="-mb-px flex space-x-8 px-4">
                  <div className="flex-1 whitespace-nowrap border-b-2 border-emeraldgreen-500 px-1 py-4 text-lg font-bold text-emeraldgreen-500">
                    Shop
                  </div>
                </div>
              </div>
              <div className="space-y-12 px-4 py-6">
                <div className="grid grid-cols-2 gap-x-4 gap-y-10">
                  {navigation.shop.map((item) => (
                    <div key={item.name} className="group relative">
                      <Link href={item.href} className="block relative aspect-square w-full rounded-md bg-gray-100 overflow-hidden" onClick={() => setMobileMenuOpen(false)}>
                        <Image
                          alt={item.imageAlt}
                          src={item.imageSrc}
                          className="object-cover group-hover:opacity-75 transition duration-200"
                          fill
                          sizes="(max-width: 640px) 50vw, 25vw"
                          loading="lazy"
                        />
                      </Link>
                      <Link href={item.href} className="mt-6 block text-sm font-medium text-gray-900" onClick={() => setMobileMenuOpen(false)}>
                        {item.name}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Other pages */}
            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              {navigation.pages.map((page) => (
                <div key={page.name} className="flow-root">
                  <Link href={page.href} className="-m-2 block p-2 font-medium text-gray-900" onClick={() => setMobileMenuOpen(false)}>
                    {page.name}
                  </Link>
                </div>
              ))}
            </div>

            {/* Account link */}
            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              <div className="flow-root">
                <Link
                  href={accountLink}
                  className="-m-2 block p-2 font-medium text-gray-900"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {isLoggedIn ? "My Account" : "Sign In"}
                </Link>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}