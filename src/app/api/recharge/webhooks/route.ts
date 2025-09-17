import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// Webhook endpoint for Recharge events
export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('X-Recharge-Hmac-Sha256');
    const topic = request.headers.get('X-Recharge-Topic');
    
    // Verify webhook signature
    if (!signature || !process.env.RECHARGE_WEBHOOK_SECRET) {
      console.error('Missing webhook signature or secret');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const hash = crypto
      .createHmac('sha256', process.env.RECHARGE_WEBHOOK_SECRET)
      .update(body, 'utf8')
      .digest('base64');
      
    if (hash !== signature) {
      console.error('Invalid webhook signature');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const data = JSON.parse(body);
    
    console.log(`Received Recharge webhook: ${topic}`, {
      topic,
      timestamp: new Date().toISOString(),
      dataKeys: Object.keys(data)
    });
    
    // Handle different webhook topics
    switch (topic) {
      case 'subscription/created':
        await handleSubscriptionCreated(data);
        break;
      case 'subscription/updated':
        await handleSubscriptionUpdated(data);
        break;
      case 'subscription/cancelled':
        await handleSubscriptionCancelled(data);
        break;
      case 'subscription/activated':
        await handleSubscriptionActivated(data);
        break;
      case 'subscription/paused':
        await handleSubscriptionPaused(data);
        break;
      case 'charge/created':
        await handleChargeCreated(data);
        break;
      case 'charge/failed':
        await handleChargeFailed(data);
        break;
      case 'order/created':
        await handleOrderCreated(data);
        break;
      default:
        console.log(`Unhandled webhook topic: ${topic}`);
    }
    
    return NextResponse.json({ 
      received: true, 
      topic,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}

// Subscription created - track new subscription
async function handleSubscriptionCreated(data: any) {
  console.log('Processing subscription created:', {
    subscriptionId: data.id,
    customerId: data.customer_id,
    productId: data.product_id,
    status: data.status
  });
  
  // TODO: Add analytics tracking for new subscription
  // TODO: Send welcome email or notification
  // TODO: Update customer data in your database if needed
}

// Subscription updated - track changes
async function handleSubscriptionUpdated(data: any) {
  console.log('Processing subscription updated:', {
    subscriptionId: data.id,
    customerId: data.customer_id,
    status: data.status,
    nextChargeDate: data.next_charge_scheduled_at
  });
  
  // TODO: Track subscription modifications in analytics
  // TODO: Update customer notifications if needed
}

// Subscription cancelled - track churn
async function handleSubscriptionCancelled(data: any) {
  console.log('Processing subscription cancelled:', {
    subscriptionId: data.id,
    customerId: data.customer_id,
    cancellationReason: data.cancellation_reason
  });
  
  // TODO: Track cancellation in analytics
  // TODO: Trigger retention campaigns
  // TODO: Update customer segment data
}

// Subscription activated - track reactivation
async function handleSubscriptionActivated(data: any) {
  console.log('Processing subscription activated:', {
    subscriptionId: data.id,
    customerId: data.customer_id,
    status: data.status
  });
  
  // TODO: Track reactivation in analytics
  // TODO: Send reactivation confirmation
}

// Subscription paused - track pause events
async function handleSubscriptionPaused(data: any) {
  console.log('Processing subscription paused:', {
    subscriptionId: data.id,
    customerId: data.customer_id,
    pausedUntil: data.paused_until
  });
  
  // TODO: Track pause events in analytics
  // TODO: Set reminder for reactivation
}

// Charge created - track billing events
async function handleChargeCreated(data: any) {
  console.log('Processing charge created:', {
    chargeId: data.id,
    subscriptionId: data.subscription_id,
    amount: data.subtotal_price,
    status: data.status
  });
  
  // TODO: Track subscription revenue in analytics
  // TODO: Update customer LTV calculations
}

// Charge failed - handle payment failures
async function handleChargeFailed(data: any) {
  console.log('Processing charge failed:', {
    chargeId: data.id,
    subscriptionId: data.subscription_id,
    amount: data.subtotal_price,
    error: data.error
  });
  
  // TODO: Track failed payments in analytics
  // TODO: Trigger payment retry notifications
  // TODO: Update subscription status if needed
}

// Order created - track fulfilled orders
async function handleOrderCreated(data: any) {
  console.log('Processing order created:', {
    orderId: data.id,
    chargeId: data.charge_id,
    shopifyOrderId: data.shopify_order_id,
    status: data.status
  });
  
  // TODO: Track order fulfillment in analytics
  // TODO: Sync with inventory management
}