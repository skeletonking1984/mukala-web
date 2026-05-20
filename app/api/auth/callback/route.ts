import { createClient } from "@/lib/supabase-server";
import { NextResponse } from "next/server";

/**
 * Auth callback — Supabase redirects here after email verification
 * or password reset link clicks. Exchanges the code for a session.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/verify";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // If something went wrong, send them to login with a flag
  return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`);
}
