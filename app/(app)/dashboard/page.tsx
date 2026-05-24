import { createClient } from "@/lib/supabase-server";
import Link from "next/link";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Look up subscription
  const { data: sub } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", user!.id)
    .eq("status", "active")
    .single();

  const hasActive = !!sub;
  const tier = sub?.tier as "standard" | "apex" | undefined;
  const lockEnds =  new Date(2027, 3, 1);
  const daysLeft = lockEnds
    ? Math.max(0, Math.ceil((lockEnds.getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : null;


  //API call here
  
  const pk = sub?.product_key;

  if (!hasActive) {
    return (
      <div className="max-w-[1240px] mx-auto px-8 py-20">
        <div
          className="text-center py-20 px-10 rounded-3xl border border-white/10"
          style={{ background: "linear-gradient(180deg, #171225 0%, rgba(23,18,37,0.3) 100%)" }}
        >
          <div className="text-5xl mb-6">🐾</div>
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            The prowl <em className="font-serif italic font-normal gradient-text">hasn't started yet.</em>
          </h1>
          <p className="text-white/55 leading-relaxed max-w-md mx-auto mb-8">
            Pick a tier. We do the rest. No pressure — but when you're ready, the Agent is waiting.
          </p>
          <Link href="/tiers" className="btn-primary">Choose your tier</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1240px] mx-auto px-8 py-12">
      {/* Tier banner */}
      <div className="mb-10 flex items-center justify-between flex-wrap gap-4">
        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-operator mb-2">
            Active Tier
          </div>
          <h1 className="text-4xl font-bold tracking-tight">
            {tier === "apex" ? "Apex" : "Standard"} prowl (PK = {pk})
          </h1>
        </div>
        <div className="text-right">
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/55 mb-2">
            Lock Ends In
          </div>
          <div className="text-3xl font-bold">
            {daysLeft}
            <span className="text-base font-normal text-white/55"> days</span>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid md:grid-cols-3 gap-4 mb-10">
        <StatCard label="Total earned" value="—" sub="Awaiting first cycle" />
        <StatCard label="Chains active" value={tier === "apex" ? "40+" : "20+"} sub="Live and prowling" />
        <StatCard label="This week" value="—" sub="Report drops Monday" />
      </div>

      {/* Prowl report */}
      <div
        className="rounded-3xl border border-white/10 p-10 mb-10"
        style={{ background: "linear-gradient(180deg, #171225 0%, rgba(23,18,37,0.3) 100%)" }}
      >
        <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-operator mb-3">
          The Prowl Report
        </div>
        <h2 className="text-2xl font-bold tracking-tight mb-4">This week, in plain English.</h2>
        <p className="text-white/55 leading-relaxed mb-6">
          Your first Prowl Report will land here at the end of the week. You'll see what the agents did, what they earned, what didn't work, and why. Real numbers. Honest gaps.
        </p>
        <div className="font-serif italic text-white/40 text-lg">
          "The prowl is fresh. Check back Monday." 🐾
        </div>
      </div>

      {/* Two-voice section */}
      <div className="grid md:grid-cols-2 gap-6">
        <VoiceCard
          icon="🐾"
          label="The Agent"
          labelColor="text-agent"
          title="Currently prowling."
          body="Mining and trading across all available chains. The agents adjust positions continuously. You'll see specifics in the next weekly summary."
        />
        <VoiceCard
          icon="👤"
          label="The Operator"
          labelColor="text-operator"
          title="Welcome in."
          body="Thanks for trusting Mukala. Your principal is held safely. The Agent is working. We'll be in your inbox every week with the truth, including the weeks that don't go our way."
        />
      </div>
    </div>
  );
}

function StatCard({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div
      className="rounded-2xl border border-white/10 p-6"
      style={{ background: "linear-gradient(180deg, #171225 0%, rgba(23,18,37,0.3) 100%)" }}
    >
      <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/55 mb-2">{label}</div>
      <div className="text-3xl font-bold mb-1">{value}</div>
      <div className="text-xs text-white/40">{sub}</div>
    </div>
  );
}

function VoiceCard({ icon, label, labelColor, title, body }: {
  icon: string; label: string; labelColor: string; title: string; body: string;
}) {
  return (
    <div
      className="rounded-2xl border border-white/10 p-8"
      style={{ background: "linear-gradient(180deg, #171225 0%, rgba(23,18,37,0.3) 100%)" }}
    >
      <div className="text-2xl mb-3">{icon}</div>
      <div className={`font-mono text-[11px] uppercase tracking-[0.2em] mb-3 ${labelColor}`}>{label}</div>
      <h3 className="text-xl font-bold tracking-tight mb-3">{title}</h3>
      <p className="text-white/55 leading-relaxed text-sm">{body}</p>
    </div>
  );
}
