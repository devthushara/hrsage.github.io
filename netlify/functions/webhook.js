const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  const sig = event.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let stripeEvent;

  try {
    // 1. Verify the signature (Security Check)
    stripeEvent = stripe.webhooks.constructEvent(event.body, sig, endpointSecret);
  } catch (err) {
    console.error(`Webhook Signature Error: ${err.message}`);
    return { statusCode: 400, body: `Webhook Error: ${err.message}` };
  }

  // 2. Handle the specific event
  if (stripeEvent.type === 'checkout.session.completed') {
    const session = stripeEvent.data.object;
    
    // TODO: Connect this to your database later
    console.log(`✅ Payment Success: ${session.id}`);
    console.log(`User Email: ${session.customer_details.email}`);
  }

  return { statusCode: 200, body: JSON.stringify({ received: true }) };
};