import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import type Stripe from "stripe";
import { createServerClient } from "@supabase/ssr";

/**
 * POST /api/webhooks/stripe
 *
 * Stripe webhook receiver. Verifies signature, processes payment events,
 * and updates the user's tier in the database.
 *
 * SETUP: Configure the webhook endpoint in Stripe dashboard,
 * pointing to this URL. Copy the signing secret into STRIPE_WEBHOOK_SECRET.
 * Locally, use `stripe listen --forward-to localhost:3000/api/webhooks/stripe`.
 */
export async function POST(request: Request) {
  const body = await request.text();
  const sig = (await headers()).get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret || webhookSecret.includes("PLACEHOLDER")) {
    return NextResponse.json(
      { error: "Webhook not configured. Set STRIPE_WEBHOOK_SECRET in .env.local." },
      { status: 503 }
    );
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: `Webhook signature invalid: ${message}` }, { status: 400 });
  }

  // Service-role Supabase client — writes regardless of user session
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { cookies: { getAll: () => [], setAll: () => {} } }
  );

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      const userId = session.client_reference_id || session.metadata?.user_id;
      const tier = session.metadata?.tier;

      if (userId && tier) {
        await supabase.from("subscriptions").upsert({
          user_id: userId,
          tier,
          stripe_session_id: session.id,
          status: "active",
          activated_at: new Date().toISOString(),
          lock_ends_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
        });
      }
      break;
    }
    case "payment_intent.payment_failed":
      // TODO: notify the user, log the failure
      break;
    default:
      // ignore other events for now
      break;
  }

  return NextResponse.json({ received: true });
}
