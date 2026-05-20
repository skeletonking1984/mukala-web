"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase-client";
import { Field } from "../signup/page";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/api/auth/callback?next=/settings`,
    });

    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    setSent(true);
  }

  if (sent) {
    return (
      <div className="text-center">
        <div className="text-5xl mb-6">📬</div>
        <h1 className="text-3xl font-bold tracking-tight mb-4">Check your email</h1>
        <p className="text-white/55 leading-relaxed">
          If an account exists for <span className="text-white">{email}</span>, a reset link is on its way.
        </p>
        <Link href="/login" className="text-operator underline hover:text-white text-sm mt-6 inline-block">
          ← Back to login
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-2">Reset password.</h1>
      <p className="text-white/55 mb-8 leading-relaxed">
        Enter your email and we'll send you a recovery link. It expires after a while — that's the point.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Field label="Email" type="email" value={email} onChange={setEmail} required />

        {error && (
          <div className="text-sm text-red-300 bg-red-500/10 border border-red-500/30 px-4 py-3 rounded-xl">
            {error}
          </div>
        )}

        <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
          {loading ? "Sending..." : "Send reset link"}
        </button>
      </form>

      <p className="text-sm text-white/55 mt-8 text-center">
        Remember it?{" "}
        <Link href="/login" className="text-operator underline hover:text-white">Log in</Link>
      </p>
    </div>
  );
}
