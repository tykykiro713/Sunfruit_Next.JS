// Recharge TypeScript Types

export interface RechargeSubscription {
  id: string;
  customer_id: string;
  product_id: string;
  variant_id: string;
  external_product_id: string;
  external_variant_id: string;
  status: 'active' | 'cancelled' | 'paused' | 'expired';
  frequency: number;
  frequency_unit: 'month' | 'week' | 'day';
  next_charge_date: string;
  price: string;
  quantity: number;
  created_at: string;
  updated_at: string;
}

export interface RechargeSellingPlan {
  id: string;
  name: string;
  discount_percentage: number;
  frequency: string;
  delivery_interval: number;
  delivery_interval_unit: string;
}

export interface RechargeAddress {
  id: string;
  customer_id: string;
  address1: string;
  address2?: string;
  city: string;
  province: string;
  zip: string;
  country: string;
  phone?: string;
  first_name: string;
  last_name: string;
}

export interface RechargeCustomer {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  external_customer_id: string;
  created_at: string;
  updated_at: string;
}

export interface RechargeOrder {
  id: string;
  customer_id: string;
  charge_id: string;
  status: string;
  total_price: string;
  shipping_price: string;
  tax_lines: any[];
  line_items: RechargeLineItem[];
  created_at: string;
  processed_at: string;
}

export interface RechargeLineItem {
  id: string;
  product_id: string;
  variant_id: string;
  title: string;
  variant_title: string;
  quantity: number;
  price: string;
  subscription_id?: string;
}

export interface RechargeSession {
  customerId: string;
  email: string;
  token: string;
  expiresAt: string;
}

// Selling Plan IDs for current configuration (actual Shopify IDs)
export const SELLING_PLAN_IDS = {
  LEMON_MINT: 'gid://shopify/SellingPlan/7288389839',
  RASPBERRY_HIBISCUS: 'gid://shopify/SellingPlan/7288422607',
  GRAPEFRUIT_GINGER: 'gid://shopify/SellingPlan/7288455375',
  BLUEBERRY_LAVENDER: 'gid://shopify/SellingPlan/7290421455'
} as const;

// External Plan Group IDs (Shopify IDs)
export const EXTERNAL_PLAN_GROUP_IDS = {
  DEFAULT: '4110942415',
  BLUEBERRY: '4112777423'
} as const;