import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";

/**
 * GET /api/balance
 *
 * Server-side proxy to mukalatech.com — fetches the balance list,
 * filters to the current user's product_key, returns just their balance.
 *
 * Solves CORS (browser can't call mukalatech.com directly) and security
 * (users can only see their own balance, not the full list).
 */
export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { data: sub } = await supabase
    .from("subscriptions")
    .select("product_key")
    .eq("user_id", user.id)
    .eq("status", "active")
    .maybeSingle();

  if (!sub?.product_key) {
    return NextResponse.json({ balance: null, reason: "no_subscription" });
  }

  try {
    const res = await fetch(`https://mukalatech.com/api.php?action=getBalance&productKey=${sub.product_key}`, {
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      return NextResponse.json({ balance: null, reason: "upstream_error" }, { status: 502 });
    }
    const data = await res.json();
    console.log(data)
    const match = data?.data
      ? data.data
      : null;
    console.log(match)
    return NextResponse.json({
      balance: match?.balance ?? null,
      reason: match ? "ok" : "not_found",
    });
  } catch {
    return NextResponse.json({ balance: null, reason: "upstream_unreachable" }, { status: 502 });
  }
}
