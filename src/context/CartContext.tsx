'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  createCart,
  addToCart,
  updateCartLines,
  removeFromCart,
  getCart,
  Cart,
  CartLine,
  CartEdge
} from '@/lib/cart'; // Updated path to match your file structure

// Extend with subscription types
interface SubscriptionDetails {
  frequency: string;
  discountPercentage?: number;
  sellingPlanId?: string;
}

interface CartContextType {
  cart: Cart | null;
  isCartOpen: boolean;
  isLoading: boolean;
  cartCount: number;
  subscriptionItems: Record<string, SubscriptionDetails>;
  openCart: () => void;
  closeCart: () => void;
  addItem: (variantId: string, quantity: number, subscriptionDetails?: SubscriptionDetails) => Promise<void>;
  updateItem: (lineId: string, quantity: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
  checkout: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cartId, setCartId] = useState<string>('');

  // Store cart items with subscription metadata
  const [subscriptionItems, setSubscriptionItems] = useState<Record<string, SubscriptionDetails>>({});

  // Function to safely interact with localStorage (client-side only)
  const getFromStorage = useCallback((key: string) => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key);
    }
    return null;
  }, []);

  const setInStorage = useCallback((key: string, value: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, value);
    }
  }, []);

  // Calculate cart count
  const cartCount = cart?.lines?.edges?.reduce(
    (total: number, { node }: CartEdge) => total + node.quantity,
    0
  ) || 0;

  // Initialize cart on mount
  useEffect(() => {
    const initializeCart = async () => {
      try {
        // Try to get cart ID from local storage
        const storedCartId = getFromStorage('cartId');
        
        if (storedCartId) {
          setCartId(storedCartId);
          const existingCart = await getCart(storedCartId);
          
          if (existingCart) {
            setCart(existingCart);
            
            // Also try to restore subscription metadata from localStorage
            const storedSubscriptionItems = getFromStorage('subscriptionItems');
            if (storedSubscriptionItems) {
              setSubscriptionItems(JSON.parse(storedSubscriptionItems));
            }
            
            return;
          }
        }
        
        // If no stored cart or cart not found, create a new one
        const newCartId = await createCart();
        setCartId(newCartId);
        setInStorage('cartId', newCartId);
      } catch (error) {
      }
    };

    initializeCart();
  }, [getFromStorage, setInStorage]);

  // Function to open cart
  const openCart = () => setIsCartOpen(true);
  
  // Function to close cart
  const closeCart = () => setIsCartOpen(false);

  // Function to add item to cart with subscription support
  const addItem = async (
    variantId: string, 
    quantity: number, 
    subscriptionDetails?: SubscriptionDetails
  ) => {
    if (!cartId) return;
    
    setIsLoading(true);
    
    try {
      // If this is a subscription and has a selling plan ID, pass it to the API
      const sellingPlanId = subscriptionDetails?.sellingPlanId;
      
      const updatedCart = await addToCart(
        cartId, 
        variantId, 
        quantity, 
        sellingPlanId
      );
      
      if (updatedCart) {
        setCart(updatedCart);
        
        // If this is a subscription item, save the metadata for UI purposes
        if (subscriptionDetails) {
          // Find the line ID that was just added
          const newLine = updatedCart.lines.edges.find(
            (edge: CartEdge) => edge.node.merchandise.id === variantId
          );
          
          if (newLine) {
            const lineId = newLine.node.id;
            const updatedSubscriptionItems = {
              ...subscriptionItems,
              [lineId]: subscriptionDetails
            };
            
            setSubscriptionItems(updatedSubscriptionItems);
            setInStorage('subscriptionItems', JSON.stringify(updatedSubscriptionItems));
          }
        }
        
        openCart();
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  // Function to update item in cart
  const updateItem = async (lineId: string, quantity: number) => {
    if (!cartId) return;
    
    setIsLoading(true);
    
    try {
      const updatedCart = await updateCartLines(cartId, lineId, quantity);
      
      if (updatedCart) {
        setCart(updatedCart);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  // Function to remove item from cart
  const removeItem = async (lineId: string) => {
    if (!cartId) return;
    
    setIsLoading(true);
    
    try {
      const updatedCart = await removeFromCart(cartId, lineId);
      
      if (updatedCart) {
        setCart(updatedCart);
        
        // Also remove any subscription metadata for this item
        if (subscriptionItems[lineId]) {
          const { [lineId]: _, ...remainingItems } = subscriptionItems;
          setSubscriptionItems(remainingItems);
          setInStorage('subscriptionItems', JSON.stringify(remainingItems));
        }
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  // Function to checkout
  const checkout = () => {
    if (cart?.checkoutUrl) {
      // Attach subscription data as URL parameters to the checkout URL
      let checkoutUrl = cart.checkoutUrl;
      
      // Add subscription parameters for items in checkout
      if (Object.keys(subscriptionItems).length > 0) {
        // Convert subscription data to URL parameters
        const params = new URLSearchParams();
        params.append('subscriptionData', JSON.stringify(subscriptionItems));
        
        // Append to checkout URL
        checkoutUrl = `${checkoutUrl}&${params.toString()}`;
      }
      
      window.location.href = checkoutUrl;
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        isLoading,
        cartCount,
        subscriptionItems,
        openCart,
        closeCart,
        addItem,
        updateItem,
        removeItem,
        checkout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  
  return context;
}