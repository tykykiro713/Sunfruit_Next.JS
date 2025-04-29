// lib/analytics.ts
type EventParams = Record<string, any>;

/**
 * Track a general event in Google Analytics
 */
export const trackEvent = (eventName: string, params: EventParams = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }
};

/**
 * Track button clicks with standardized parameters
 */
export const trackButtonClick = (
  buttonName: string, 
  buttonId: string, 
  additionalParams: EventParams = {}
) => {
  trackEvent('button_click', {
    button_name: buttonName,
    button_id: buttonId,
    ...additionalParams
  });
};

/**
 * Track add to cart events with standardized parameters
 */
export const trackAddToCart = (
  productId: string,
  productName: string,
  variantId: string,
  price: number,
  quantity: number = 1,
  isSubscription: boolean = false,
  subscriptionFrequency?: string
) => {
  trackEvent('add_to_cart', {
    currency: 'USD',
    value: price * quantity,
    items: [{
      item_id: productId,
      item_name: productName,
      variant_id: variantId,
      price: price,
      quantity: quantity
    }],
    is_subscription: isSubscription,
    subscription_frequency: subscriptionFrequency || null
  });
  
  // Send a conversion event to Google Ads
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      'send_to': 'AW-16998825904/add_to_cart',
      'value': price * quantity,
      'currency': 'USD',
      'transaction_id': ''
    });
  }
};

/**
 * Track sample pack requests
 */
export const trackSampleRequest = (
  productHandle: string,
  isAvailable: boolean
) => {
  trackEvent('sample_request', {
    product_handle: productHandle,
    is_available: isAvailable
  });
  
  // Send a conversion event to Google Ads
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      'send_to': 'AW-16998825904/sample_request',
      'value': 4.00, // Shipping cost as value
      'currency': 'USD',
      'transaction_id': ''
    });
  }
};