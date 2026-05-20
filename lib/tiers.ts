/**
 * Tier specifications — used by:
 *   - the marketing /tiers page (display)
 *   - the checkout flow (price selection)
 *   - the dashboard (feature gating)
 *
 * Keep in sync with Stripe price IDs in .env.local
 */
export const TIERS = {
  standard: {
    id: "standard",
    name: "Standard",
    price: 500,
    priceLabel: "$500",
    priceSuffix: "minimum",
    tagline:
      "The way in. Real product, real AI, real Prowl Reports — for the price of a weekend away.",
    features: [
      "AI mining + trading across 20+ chains",
      "Weekly Prowl Report",
      "Principal protection during lock",
      "Full dashboard access",
      "12-month lock period",
      "Email support",
    ],
    accent: "operator" as const,
  },
  apex: {
    id: "apex",
    name: "Apex",
    price: 5000,
    priceLabel: "$5,000",
    priceSuffix: "minimum",
    tagline:
      "The flagship. Full chain coverage, the higher-tier strategy stack, priority everything.",
    features: [
      "AI mining + trading across all 40+ chains",
      "Higher-tier strategy stack",
      "Weekly Prowl Report + monthly deep-dive",
      "Principal protection during lock",
      "Priority execution",
      "12-month lock period",
      "Direct support line",
    ],
    accent: "agent" as const,
    flagship: true,
  },
} as const;

export type TierId = keyof typeof TIERS;
