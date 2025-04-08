'use client';

import React from 'react';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import { useCart } from '@/context/cartContext';

export default function CartButton() {
  const { openCart, cartCount } = useCart();
  
  return (
    <button
      className="group relative p-2 text-gray-600 hover:text-gray-900"
      onClick={openCart}
      aria-label="Cart"
    >
      <ShoppingBagIcon className="h-6 w-6" aria-hidden="true" />
      {cartCount > 0 && (
        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-emeraldgreen-500 text-xs font-medium text-white">
          {cartCount}
        </span>
      )}
    </button>
  );
}