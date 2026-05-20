"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase-client";
import { Field } from "../signup/page";

export default function LoginPage() {
  const router = useRouter();
  const search = useSearchParams();
  const redirect = search.get("redirect") || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.push(redirect);
    router.refresh();
  }

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome back.</h1>
      <p className="text-white/55 mb-8 leading-relaxed">
        Log in to check the prowl.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Field label="Email" type="email" value={email} onChange={setEmail} required />
        <Field label="Password" type="password" value={password} onChange={setPassword} required />

        {error && (
          <div className="text-sm text-red-300 bg-red-500/10 border border-red-500/30 px-4 py-3 rounded-xl">
            {error}
          </div>
        )}

        <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>

      <div className="flex justify-between items-center text-sm mt-8">
        <Link href="/reset-password" className="text-white/55 hover:text-white">Forgot password?</Link>
        <Link href="/signup" className="text-operator underline hover:text-white">Create account</Link>
      </div>
    </div>
  );
}
