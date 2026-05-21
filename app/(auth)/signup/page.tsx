"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-client";
import { Field } from "@/components/ui/field";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords don't match.");
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/api/auth/callback`,
      },
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
          We sent a verification link to <span className="text-white">{email}</span>. Click it to finish creating your account.
        </p>
        <p className="text-xs text-white/40 mt-6">
          Didn't get it? Check spam, or{" "}
          <button onClick={() => setSent(false)} className="text-operator underline hover:text-white">try again</button>.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-2">
        Start <em className="font-serif italic font-normal gradient-text">the prowl.</em>
      </h1>
      <p className="text-white/55 mb-8 leading-relaxed">
        Create an account. Confirm your email. Pick a tier when you're ready.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Field label="Email" type="email" value={email} onChange={setEmail} required />
        <Field
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
          required
          minLength={8}
          hint="At least 8 characters."
        />
        <Field
          label="Confirm password"
          type="password"
          value={confirm}
          onChange={setConfirm}
          required
          minLength={8}
        />

        {error && (
          <div className="text-sm text-red-300 bg-red-500/10 border border-red-500/30 px-4 py-3 rounded-xl">
            {error}
          </div>
        )}

        <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
          {loading ? "Creating account..." : "Create account"}
        </button>
      </form>

      <p className="text-sm text-white/55 mt-8 text-center">
        Already have one?{" "}
        <Link href="/login" className="text-operator underline hover:text-white">Log in</Link>
      </p>
    </div>
  );
}