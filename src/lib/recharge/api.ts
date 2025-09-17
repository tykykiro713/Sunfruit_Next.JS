import { 
  listSubscriptions, 
  updateSubscription,
  cancelSubscription,
  activateSubscription,
  skipSubscriptionCharge,
  listAddresses,
  updateSubscriptionAddress,
  listOrders,
  getCustomer
} from '@rechargeapps/storefront-client';
import type { RechargeSession, RechargeSubscription } from './types';

// Get customer subscriptions
export async function getCustomerSubscriptions(session: RechargeSession): Promise<RechargeSubscription[]> {
  try {
    const subscriptions = await listSubscriptions(session, {
      limit: 50,
      sort_by: 'created_at-desc'
    });
    
    return subscriptions.subscriptions;
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
    throw error;
  }
}

// Pause a subscription (using updateSubscription with status)
export async function pauseCustomerSubscription(
  session: RechargeSession, 
  subscriptionId: string, 
  pauseDate: string
): Promise<RechargeSubscription> {
  try {
    const result = await updateSubscription(session, subscriptionId, {
      status: 'paused',
      scheduled_at: pauseDate
    });
    
    return result.subscription;
  } catch (error) {
    console.error('Error pausing subscription:', error);
    throw error;
  }
}

// Cancel a subscription
export async function cancelCustomerSubscription(
  session: RechargeSession,
  subscriptionId: string,
  reason?: string
): Promise<RechargeSubscription> {
  try {
    const result = await cancelSubscription(session, subscriptionId, {
      cancellation_reason: reason || 'Customer requested cancellation'
    });
    
    return result.subscription;
  } catch (error) {
    console.error('Error cancelling subscription:', error);
    throw error;
  }
}

// Reactivate a cancelled subscription
export async function reactivateCustomerSubscription(
  session: RechargeSession,
  subscriptionId: string
): Promise<RechargeSubscription> {
  try {
    const result = await activateSubscription(session, subscriptionId);
    
    return result.subscription;
  } catch (error) {
    console.error('Error reactivating subscription:', error);
    throw error;
  }
}

// Skip next subscription charge
export async function skipNextCharge(
  session: RechargeSession,
  subscriptionId: string,
  chargeId: string
): Promise<void> {
  try {
    await skipSubscriptionCharge(session, chargeId, {
      subscription_id: subscriptionId
    });
  } catch (error) {
    console.error('Error skipping charge:', error);
    throw error;
  }
}

// Update subscription frequency
export async function updateFrequency(
  session: RechargeSession,
  subscriptionId: string,
  frequency: number,
  frequencyUnit: 'month' | 'week' | 'day'
): Promise<RechargeSubscription> {
  try {
    const result = await updateSubscription(session, subscriptionId, {
      order_interval_frequency: frequency,
      order_interval_unit: frequencyUnit
    });
    
    return result.subscription;
  } catch (error) {
    console.error('Error updating frequency:', error);
    throw error;
  }
}

// Get customer addresses
export async function getCustomerAddresses(session: RechargeSession) {
  try {
    const addresses = await listAddresses(session, {
      limit: 50
    });
    
    return addresses.addresses;
  } catch (error) {
    console.error('Error fetching addresses:', error);
    throw error;
  }
}

// Update subscription address
export async function updateSubscriptionShippingAddress(
  session: RechargeSession,
  subscriptionId: string,
  addressId: string
): Promise<RechargeSubscription> {
  try {
    const result = await updateSubscriptionAddress(session, subscriptionId, {
      address_id: addressId
    });
    
    return result.subscription;
  } catch (error) {
    console.error('Error updating subscription address:', error);
    throw error;
  }
}

// Get customer orders
export async function getCustomerOrders(session: RechargeSession) {
  try {
    const orders = await listOrders(session, {
      limit: 50,
      sort_by: 'created_at-desc'
    });
    
    return orders.orders;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
}

// Get customer details
export async function getCustomerDetails(session: RechargeSession) {
  try {
    const customer = await getCustomer(session);
    
    return customer.customer;
  } catch (error) {
    console.error('Error fetching customer details:', error);
    throw error;
  }
}

// Helper to get the customer portal URL
export function getCustomerPortalUrl(customerId: string): string {
  return `https://checkout.sunfruit.com/tools/recurring/login/${customerId}`;
}