"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function CheckoutFlow() {
  const search = useSearchParams();
  const tier = search.get("tier");

  const [status, setStatus] = useState<"loading" | "stubbed" | "error">("loading");
  const [error, setError] = useState<string | null>(null);
  const [stubMessage, setStubMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!tier || (tier !== "standard" && tier !== "apex")) {
      setStatus("error");
      setError("Invalid tier selected.");
      return;
    }

    async function startCheckout() {
      try {
        const res = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tier }),
        });
        const data = await res.json();
        if (data.error) {
          setStatus("error");
          setError(data.error);
          return;
        }
        if (data.stubbed) {
          setStatus("stubbed");
          setStubMessage(data.note);
          return;
        }
        window.location.href = data.url;
      } catch (err) {
        setStatus("error");
        setError(err instanceof Error ? err.message : "Unknown error");
      }
    }

    startCheckout();
  }, [tier]);

  if (status === "stubbed") {
    return (
      <div className="max-w-3xl mx-auto px-8 py-20 text-center">
        <div className="text-5xl mb-6">🛠️</div>
        <h1 className="text-3xl font-bold tracking-tight mb-4">
          Stripe is <em className="font-serif italic font-normal gradient-text">stubbed.</em>
        </h1>
        <p className="text-white/55 leading-relaxed max-w-md mx-auto mb-6">{stubMessage}</p>
        <p className="text-xs text-white/40 mb-8 font-mono">
          (This is the dev environment. In production this would launch real Stripe Checkout.)
        </p>
        <Link href="/dashboard" className="btn-primary">Skip to dashboard</Link>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="max-w-3xl mx-auto px-8 py-20 text-center">
        <div className="text-5xl mb-6">⚠️</div>
        <h1 className="text-3xl font-bold tracking-tight mb-4">Something went wrong.</h1>
        <p className="text-white/55 leading-relaxed max-w-md mx-auto mb-8">{error}</p>
        <Link href="/tiers" className="btn-ghost">Back to tiers</Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-8 py-20 text-center">
      <div className="text-5xl mb-6 animate-pulse">🐾</div>
      <h1 className="text-3xl font-bold tracking-tight mb-4">Preparing checkout…</h1>
      <p className="text-white/55">Sending you to Stripe in a moment.</p>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="max-w-3xl mx-auto px-8 py-20 text-center">
        <div className="text-5xl mb-6 animate-pulse">🐾</div>
        <p className="text-white/55">Loading...</p>
      </div>
    }>
      <CheckoutFlow />
    </Suspense>
  );
}