const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }
  
  const { customerId } = JSON.parse(event.body); // You must store this ID when they sign up

  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: process.env.URL,
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ url: session.url }),
  };
};