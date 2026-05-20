import Link from "next/link";
import { Eyebrow } from "@/components/brand/eyebrow";
import { PantherOrb } from "@/components/brand/panther-orb";

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1240px] mx-auto px-8">
          <div className="grid lg:grid-cols-[1.3fr_1fr] gap-20 items-center">
            <div>
              <Eyebrow>The prowl is live · May 2026</Eyebrow>
              <h1 className="text-[clamp(40px,6.5vw,84px)] font-extrabold leading-[0.96] tracking-[-0.035em] mb-7">
                AI that mines and trades{" "}
                <em className="font-serif italic font-normal gradient-text not-italic [&]:italic">
                  crypto
                </em>{" "}
                for you.
              </h1>
              <p className="text-lg text-white/55 max-w-[540px] mb-10 leading-relaxed">
                Set your amount. The Agent works 24/7 across 40+ chains. The Operator tells you the truth about what's happening — every week, in plain English.
              </p>
              <div className="flex flex-wrap gap-3.5 items-center">
                <Link href="/tiers" className="btn-primary">Start the prowl</Link>
                <Link href="/how" className="btn-ghost">How it works</Link>
              </div>
            </div>
            <PantherOrb />
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="max-w-[1240px] mx-auto px-8">
        <div className="border-y border-white/10 py-8 my-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Chains", value: "40", em: "+" },
              { label: "Uptime", value: "24", em: "/7" },
              { label: "Lock Period", value: "12", em: "mo" },
              { label: "Watch Charts", value: "", em: "Never" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col gap-1.5">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/55">{s.label}</span>
                <span className="text-3xl font-bold tracking-tight">
                  {s.value}
                  <em className="font-serif italic font-normal gradient-text">{s.em}</em>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DUALITY */}
      <section className="py-24">
        <div className="max-w-[1240px] mx-auto px-8">
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-operator mb-5">The Architecture</div>
          <h2 className="text-[clamp(32px,4vw,52px)] font-bold tracking-tight leading-[1.05] mb-6 max-w-[800px]">
            One panther. <em className="font-serif italic font-normal">Two voices.</em>
          </h2>
          <p className="text-lg text-white/55 max-w-[640px] mb-14">
            Most crypto products pick mystique or utility. Mukala does both because the product itself is both — an autonomous AI agent doing the work, and real humans telling you the truth about it.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <DualityCard
              icon="👤"
              label="The Operator"
              labelColor="text-operator"
              accentLine="from-transparent via-operator to-transparent"
              title="Plain English. Honest numbers."
              body="The human voice. No urgency, no hype, no 'stay broke or join.' If something isn't ready, we say so. If a week was a loss, you'll see it. Trust gets built by telling the truth, especially when it costs us."
              tags={["Clarity", "Honesty", "Plain Speech"]}
              tagBg="bg-operator/10 text-operator border-operator/20"
            />
            <DualityCard
              icon="🐾"
              label="The Agent"
              labelColor="text-agent"
              accentLine="from-transparent via-agent to-transparent"
              title="Autonomous. Patient. Awake."
              body="The AI. It doesn't get bored, panic, FOMO, or revenge-trade at 3am. It hunts opportunity across chains while you sleep, eat dinner, raise your kids, or do whatever the hell you'd rather be doing. The prowl never ends."
              tags={["Autonomy", "Precision", "Patience"]}
              tagBg="bg-agent/10 text-agent border-agent/20"
            />
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="py-24">
        <div className="max-w-[1240px] mx-auto px-8">
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-operator mb-5">Who It's For</div>
          <h2 className="text-[clamp(32px,4vw,52px)] font-bold tracking-tight leading-[1.05] mb-6 max-w-[800px]">
            Mukala isn't for everyone. <em className="font-serif italic font-normal">That's the point.</em>
          </h2>
          <p className="text-lg text-white/55 max-w-[640px] mb-14">
            Some people love watching charts. Some thrive on the urgency. Mukala isn't here to tell anyone they're wrong — plenty of people do this and that's fine. Mukala is the alternative for everyone else.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <Feature
              num="01"
              title="You're busy."
              body="You have a job, a family, things you'd rather think about than a candle on a 4-hour chart. The market doesn't sleep but you should."
            />
            <Feature
              num="02"
              title="You got burned."
              body="You tried crypto. Maybe lost something to a '100x' project that disappeared. You want exposure without the casino."
            />
            <Feature
              num="03"
              title="You want room."
              body="Sometimes you're forced — and then you decide. But if you have the room to step back and look at the whole picture, you almost always should. Mukala helps you do that."
            />
          </div>
        </div>
      </section>

      <CtaSection
        title={<>Stop watching charts. <em className="font-serif italic font-normal">Start living.</em></>}
        sub="The prowl is live. The dashboard is honest. The next twelve months are about to look different."
        ctaLabel="Choose your tier"
        ctaHref="/tiers"
      />
    </>
  );
}

function DualityCard({ icon, label, labelColor, accentLine, title, body, tags, tagBg }: {
  icon: string; label: string; labelColor: string; accentLine: string;
  title: string; body: string; tags: string[]; tagBg: string;
}) {
  return (
    <div className="relative p-10 lg:p-12 rounded-3xl border border-white/10 overflow-hidden min-h-[360px]"
      style={{ background: "linear-gradient(180deg, #171225 0%, rgba(23,18,37,0.4) 100%)" }}>
      <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${accentLine}`} />
      <div className="text-3xl mb-6">{icon}</div>
      <div className={`font-mono text-[11px] uppercase tracking-[0.2em] ${labelColor} mb-4`}>{label}</div>
      <h3 className="text-3xl font-bold tracking-tight mb-4">{title}</h3>
      <p className="text-white/55 leading-relaxed mb-6">{body}</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((t) => (
          <span key={t} className={`font-mono text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-full border ${tagBg}`}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function Feature({ num, title, body }: { num: string; title: string; body: string }) {
  return (
    <div className="p-8 border-l border-white/10">
      <div className="font-mono text-[11px] text-operator tracking-[0.2em] mb-4">{num}</div>
      <h4 className="text-xl font-semibold tracking-tight mb-3">{title}</h4>
      <p className="text-white/55 leading-relaxed">{body}</p>
    </div>
  );
}

export function CtaSection({ title, sub, ctaLabel, ctaHref }: {
  title: React.ReactNode; sub: string; ctaLabel: string; ctaHref: string;
}) {
  return (
    <section className="max-w-[1240px] mx-auto px-8">
      <div className="my-20 py-20 px-10 rounded-[2rem] border border-white/10 text-center relative overflow-hidden"
        style={{ background: "radial-gradient(ellipse at top, rgba(162,76,240,0.15), transparent 70%), linear-gradient(180deg, #171225, #0C0A14)" }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-52 h-px"
          style={{ background: "linear-gradient(90deg, transparent, #22D3EE, #A24CF0, transparent)" }} />
        <h2 className="text-[clamp(32px,4vw,52px)] font-bold tracking-tight leading-[1.05] mb-6 max-w-3xl mx-auto">{title}</h2>
        <p className="text-lg text-white/55 max-w-xl mx-auto mb-8">{sub}</p>
        <Link href={ctaHref} className="btn-primary">{ctaLabel}</Link>
      </div>
    </section>
  );
}
