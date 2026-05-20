import Link from "next/link";
import { Eyebrow } from "@/components/brand/eyebrow";
import { CtaSection } from "@/components/ui/cta-section";
import { TIERS } from "@/lib/tiers";

export default function TiersPage() {
  return (
    <>
      <section className="py-24 lg:py-32">
        <div className="max-w-[1240px] mx-auto px-8">
          <Eyebrow>The Tiers</Eyebrow>
          <h1 className="text-[clamp(40px,6.5vw,84px)] font-extrabold leading-[0.96] tracking-[-0.035em] mb-7">
            Two ways <em className="font-serif italic font-normal gradient-text">to prowl.</em>
          </h1>
          <p className="text-lg text-white/55 max-w-[540px] mb-10 leading-relaxed">
            Standard is the on-ramp. Apex is the flagship. Both run the same AI. Apex unlocks more chains, faster execution, and the higher-tier strategy stack.
          </p>
        </div>
      </section>

      <section className="max-w-[1240px] mx-auto px-8">
        <div className="grid md:grid-cols-2 gap-6">
          {Object.values(TIERS).map((tier) => (
            <TierCard key={tier.id} tier={tier} />
          ))}
        </div>

        <div className="mt-20">
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-operator mb-5">Side by side</div>
          <h2 className="text-[clamp(32px,4vw,52px)] font-bold tracking-tight leading-[1.05] mb-6">
            The honest <em className="font-serif italic font-normal">difference.</em>
          </h2>

          <div className="mt-10">
            <ComparisonRow header label="Feature" standard="Standard" apex="Apex" />
            <ComparisonRow label="Minimum" standard="$499" apex="$1,999" />
            <ComparisonRow label="Chains covered" standard="20+" apex="40+" />
            <ComparisonRow label="Strategy stack" standard="Core" apex="Full" />
            <ComparisonRow label="Weekly Prowl Report" standard="✓" apex="✓" />
            <ComparisonRow label="Monthly deep-dive" standard="—" apex="✓" />
            <ComparisonRow label="Execution priority" standard="Standard" apex="Priority" />
            <ComparisonRow label="Support" standard="Email" apex="Direct line" />
            <ComparisonRow label="Lock period" standard="12 months" apex="12 months" />
          </div>
        </div>
      </section>

      <CtaSection
        title={<>Still deciding? <em className="font-serif italic font-normal">Read the FAQ.</em></>}
        sub="The real questions, answered straight. No defensiveness, no spin."
        ctaLabel="Read the FAQ"
        ctaHref="/faq"
      />
    </>
  );
}

function TierCard({ tier }: { tier: typeof TIERS[keyof typeof TIERS] }) {
  const isApex = tier.id === "apex";
  return (
    <div
      className={`relative p-10 lg:p-12 rounded-3xl border ${
        isApex ? "border-agent/40" : "border-white/10"
      }`}
      style={{
        background: isApex
          ? "linear-gradient(180deg, rgba(162,76,240,0.06) 0%, #171225 100%)"
          : "linear-gradient(180deg, #171225 0%, rgba(23,18,37,0.3) 100%)",
      }}
    >
      {isApex && (
        <span className="absolute top-5 right-6 font-mono text-[10px] tracking-[0.2em] px-2.5 py-1 bg-gradient-prowl text-void rounded-full font-bold">
          FLAGSHIP
        </span>
      )}
      <div className="font-serif italic text-sm uppercase tracking-[0.3em] text-white/55 mb-3">{tier.name}</div>
      <div className="text-[56px] font-bold tracking-[-0.03em] mb-2">
        {tier.priceLabel}
        <small className="text-lg font-normal text-white/55"> {tier.priceSuffix}</small>
      </div>
      <p className="text-white/55 text-base mb-8 leading-relaxed">{tier.tagline}</p>

      <ul className="my-8 pt-6 border-t border-white/10 space-y-0">
        {tier.features.map((f) => (
          <li key={f} className="py-3 flex items-start gap-3 text-sm text-white/85">
            <span className={isApex ? "text-agent" : "text-operator"}>✓</span>
            {f}
          </li>
        ))}
      </ul>

      <Link
        href={`/checkout?tier=${tier.id}`}
        className={isApex ? "btn-primary w-full" : "btn-ghost w-full"}
      >
        {isApex ? "Go Apex" : "Start with Standard"}
      </Link>
    </div>
  );
}

function ComparisonRow({ label, standard, apex, header = false }: {
  label: string; standard: string; apex: string; header?: boolean;
}) {
  return (
    <div className={`grid grid-cols-[2fr_1fr_1fr] py-3.5 border-b border-white/10 text-sm ${
      header ? "font-mono text-[11px] uppercase tracking-[0.15em] text-white/55" : ""
    }`}>
      <span className={header ? "" : "text-white/85"}>{label}</span>
      <span className="text-center text-white/90">{standard}</span>
      <span className="text-center text-white/90">{apex}</span>
    </div>
  );
}
