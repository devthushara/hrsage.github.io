exports.handler = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify({ 
      // 1. The Public Key
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
      
      // 2. The Price IDs (Mapped securely)
      prices: {
          monthly: {
              individual: process.env.PRICE_MONTHLY_IND,
              sme: process.env.PRICE_MONTHLY_SME
          },
          yearly: {
              individual: process.env.PRICE_YEARLY_IND,
              sme: process.env.PRICE_YEARLY_SME
          }
      },
      
      // 3. Optional: Maintenance Mode Switch
      maintenanceMode: process.env.MAINTENANCE_MODE === 'true'
    }),
  };
};