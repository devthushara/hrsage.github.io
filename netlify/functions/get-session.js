const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  const sessionId = event.queryStringParameters.session_id;

  if (!sessionId) {
    return { statusCode: 400, body: JSON.stringify({ error: "Missing session_id" }) };
  }

  try {
    // 1. Retrieve the session from Stripe to get the customer details
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    return {
      statusCode: 200,
      body: JSON.stringify({
        email: session.customer_details.email, // The email they typed in Stripe
        name: session.customer_details.name    // Optional: their name
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};