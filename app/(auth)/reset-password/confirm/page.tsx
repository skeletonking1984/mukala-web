"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase-client";
import { Field } from "@/components/ui/field";

export default function ResetPasswordConfirmPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

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
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }
    setDone(true);
    // Auto-redirect after a beat
    setTimeout(() => {
      router.push("/dashboard");
      router.refresh();
    }, 1500);
  }

  if (done) {
    return (
      <div className="text-center">
        <div className="text-5xl mb-6">🐾</div>
        <h1 className="text-3xl font-bold tracking-tight mb-4">
          Password <em className="font-serif italic font-normal gradient-text">set.</em>
        </h1>
        <p className="text-white/55 leading-relaxed">Sending you to the dashboard…</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-2">Set a new password.</h1>
      <p className="text-white/55 mb-8 leading-relaxed">
        At least 8 characters. Make it good — and write it down somewhere.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Field label="New password" type="password" value={password} onChange={setPassword} required minLength={8} />
        <Field label="Confirm new password" type="password" value={confirm} onChange={setConfirm} required minLength={8} />

        {error && (
          <div className="text-sm text-red-300 bg-red-500/10 border border-red-500/30 px-4 py-3 rounded-xl">
            {error}
          </div>
        )}

        <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
          {loading ? "Setting password..." : "Set password"}
        </button>
      </form>

      <p className="text-sm text-white/55 mt-8 text-center">
        Changed your mind?{" "}
        <Link href="/login" className="text-operator underline hover:text-white">Back to login</Link>
      </p>
    </div>
  );
}