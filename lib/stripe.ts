import Stripe from "stripe";

/**
 * Server-side Stripe client.
 * NEVER import this in a Client Component — it uses the secret key.
 *
 * TODO: Replace placeholder in .env.local with real STRIPE_SECRET_KEY before going live.
 */
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_PLACEHOLDER", {
  apiVersion: "2024-10-28.acacia",
  typescript: true,
});

/**
 * Tier → Stripe Price ID mapping.
 * Create these prices in the Stripe dashboard and put the IDs in .env.local.
 */
export const TIER_PRICES = {
  standard: process.env.STRIPE_PRICE_STANDARD || "price_PLACEHOLDER_STANDARD",
  apex: process.env.STRIPE_PRICE_APEX || "price_PLACEHOLDER_APEX",
} as const;

export type Tier = keyof typeof TIER_PRICES;
