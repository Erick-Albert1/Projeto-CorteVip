import Stripe from 'stripe';

export const stripe = new Stripe(
    process.env.STRIPE_API_KEY,
    {
        apiVersion: '2025-03-31.basil',
        appInfo:{
            name: 'CorteVip',
            version: '1'
        }
    }
)