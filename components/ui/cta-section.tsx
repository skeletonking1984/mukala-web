import Link from "next/link";

/**
 * Reusable bottom-of-page call-to-action panel.
 * Used on home, how, tiers, about — anywhere we close with a clear next step.
 */
export function CtaSection({ title, sub, ctaLabel, ctaHref }: {
  title: React.ReactNode;
  sub: string;
  ctaLabel: string;
  ctaHref: string;
}) {
  return (
    <section className="max-w-[1240px] mx-auto px-8">
      <div
        className="my-20 py-20 px-10 rounded-[2rem] border border-white/10 text-center relative overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(162,76,240,0.15), transparent 70%), linear-gradient(180deg, #171225, #0C0A14)",
        }}
      >
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-52 h-px"
          style={{ background: "linear-gradient(90deg, transparent, #22D3EE, #A24CF0, transparent)" }}
        />
        <h2 className="text-[clamp(32px,4vw,52px)] font-bold tracking-tight leading-[1.05] mb-6 max-w-3xl mx-auto">
          {title}
        </h2>
        <p className="text-lg text-white/55 max-w-xl mx-auto mb-8">{sub}</p>
        <Link href={ctaHref} className="btn-primary">{ctaLabel}</Link>
      </div>
    </section>
  );
}