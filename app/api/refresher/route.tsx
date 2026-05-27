import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";

export async function GET() {

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { error: "Not authenticated" },
      { status: 401 }
    );
  }

  // Get active subscription
  const { data: sub } = await supabase
    .from("subscriptions")
    .select("product_key")
    .eq("user_id", user.id)
    .eq("status", "active")
    .maybeSingle();

  if (!sub?.product_key) {
    return NextResponse.json({
      status: "error",
      reason: "no_subscription",
    });
  }

  try {

    // Call PHP update.php endpoint
    const res = await fetch(
      `https://mukalatech.com/refresh.php?productKey=${sub.product_key}`,
      {
        signal: AbortSignal.timeout(10000),
        cache: "no-store",
      }
    );

    if (!res.ok) {

      return NextResponse.json(
        {
          status: "error",
          reason: "upstream_error",
        },
        { status: 502 }
      );
    }

    const data = await res.json();

    return NextResponse.json(data);

  } catch (error) {

    return NextResponse.json(
      {
        status: "error",
        reason: "upstream_unreachable",
      },
      { status: 502 }
    );
  }
}
