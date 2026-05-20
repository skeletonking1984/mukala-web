import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";
import { stripe, TIER_PRICES, type Tier } from "@/lib/stripe";

/**
 * POST /api/checkout
 * Body: { tier: "standard" | "apex" }
 *
 * Creates a Stripe Checkout session for the authenticated user
 * and returns the session URL for the browser to redirect to.
 *
 * STUBBED: Will return placeholder responses until real Stripe + Supabase keys are set in .env.local.
 */
export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { tier } = (await request.json()) as { tier: Tier };
  const priceId = TIER_PRICES[tier];
  if (!priceId) {
    return NextResponse.json({ error: "Invalid tier" }, { status: 400 });
  }

  // Stub guard — if Stripe key is still the placeholder, return a fake URL
  // so the rest of the flow is testable without a real Stripe account.
  if (process.env.STRIPE_SECRET_KEY?.includes("PLACEHOLDER")) {
    return NextResponse.json({
      url: `/dashboard?stub_checkout=1&tier=${tier}`,
      stubbed: true,
      note: "Stripe is stubbed. Set STRIPE_SECRET_KEY in .env.local to enable real checkout.",
    });
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    customer_email: user.email,
    client_reference_id: user.id,
    line_items: [{ price: priceId, quantity: 1 }],
    metadata: { tier, user_id: user.id },
    success_url: `${appUrl}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${appUrl}/tiers`,
  });

  return NextResponse.json({ url: session.url });
}
