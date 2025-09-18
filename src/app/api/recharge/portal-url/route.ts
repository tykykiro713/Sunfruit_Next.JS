import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Get customer from Recharge API
    const customerResponse = await fetch(
      `https://api.rechargeapps.com/customers?email=${encodeURIComponent(email)}`,
      {
        headers: {
          'X-Recharge-Access-Token': process.env.RECHARGE_API_KEY!,
          'Accept': 'application/json',
        },
      }
    );

    if (!customerResponse.ok) {
      console.error('Failed to fetch customer:', await customerResponse.text());
      return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
    }

    const customerData = await customerResponse.json();
    const customers = customerData.customers;

    if (!customers || customers.length === 0) {
      return NextResponse.json({ error: 'No subscription customer found' }, { status: 404 });
    }

    const customer = customers[0];
    const customerHash = customer.hash;

    // For embedded portal, we need to generate a session token
    // Try creating a portal session for embedded use
    try {
      const sessionResponse = await fetch(
        'https://api.rechargeapps.com/portal_sessions',
        {
          method: 'POST',
          headers: {
            'X-Recharge-Access-Token': process.env.RECHARGE_API_KEY!,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            customer_id: customer.id,
          }),
        }
      );

      if (sessionResponse.ok) {
        const sessionData = await sessionResponse.json();
        const token = sessionData.portal_session?.token || sessionData.token;
        
        if (token) {
          // Embedded portal URL with correct embedded structure
          const portalUrl = `https://checkout.sunfruit.com/tools/recurring/portal/${customerHash}/overview?token=${token}`;
          
          return NextResponse.json({
            portalUrl,
            customerHash,
            customerId: customer.id,
            token,
          });
        }
      }
    } catch (sessionError) {
      console.error('Failed to create portal session:', sessionError);
    }

    // Fallback: Return basic embedded portal URL without token
    const portalUrl = `https://checkout.sunfruit.com/tools/recurring/portal/${customerHash}/overview`;
    
    return NextResponse.json({
      portalUrl,
      customerHash,
      customerId: customer.id,
      warning: 'No session token available - portal may require authentication',
    });

  } catch (error) {
    console.error('Portal URL generation error:', error);
    return NextResponse.json({ error: 'Failed to generate portal URL' }, { status: 500 });
  }
}