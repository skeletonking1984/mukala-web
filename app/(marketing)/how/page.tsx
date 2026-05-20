import Link from "next/link";
import { Eyebrow } from "@/components/brand/eyebrow";
import { CtaSection } from "../page";

const steps = [
  {
    n: "01",
    title: "Pick your tier.",
    body: "Standard or Apex. The amount you put in is the amount that gets put to work. There are no hidden fees skimmed off the top. You choose the number; you know the number.",
  },
  {
    n: "02",
    title: "Pay how you want.",
    body: "Card or bank now, crypto coming soon. Same product either way. You get a receipt. The system confirms. The Agent starts working within the day.",
  },
  {
    n: "03",
    title: "The Agent goes to work.",
    body: "Mining and trading across 40+ chains, 24/7. It looks for yield. It moves between chains. It doesn't sleep, panic, or wait for permission. The work is constant and quiet.",
  },
  {
    n: "04",
    title: "The Operator tells you what happened.",
    body: "Every week: a Prowl Report. What the agents did. What it earned. What didn't work and why. Real numbers, not vibes. Honest gaps when something's still in progress.",
  },
  {
    n: "05",
    title: "You live your life.",
    body: "That's the whole point. You don't watch the dashboard all day. You don't refresh charts. You drop in when you feel like it. The prowl keeps prowling.",
  },
  {
    n: "06",
    title: "At twelve months, you decide.",
    body: "The lock ends. You see the full year. You renew, you withdraw, or you do something else entirely. Your money, your call. No pressure.",
  },
];

export default function HowPage() {
  return (
    <>
      <section className="py-24 lg:py-32">
        <div className="max-w-[1240px] mx-auto px-8">
          <Eyebrow>How It Works</Eyebrow>
          <h1 className="text-[clamp(40px,6.5vw,84px)] font-extrabold leading-[0.96] tracking-[-0.035em] mb-7">
            The whole thing, <em className="font-serif italic font-normal gradient-text">in plain English.</em>
          </h1>
          <p className="text-lg text-white/55 max-w-[540px] mb-10 leading-relaxed">
            No jargon. No tricks. Here's what happens from the moment you sign up to the moment the prowl is working for you.
          </p>
        </div>
      </section>

      <section className="max-w-[1240px] mx-auto px-8">
        <div className="mt-10">
          {steps.map((s, i) => (
            <div
              key={s.n}
              className={`grid grid-cols-1 sm:grid-cols-[80px_1fr] gap-4 sm:gap-8 py-10 border-t border-white/10 items-start ${
                i === steps.length - 1 ? "border-b" : ""
              }`}
            >
              <div className="font-serif italic text-[40px] sm:text-[56px] leading-none gradient-text">{s.n}</div>
              <div>
                <h3 className="text-2xl sm:text-[26px] font-semibold tracking-tight mb-3">{s.title}</h3>
                <p className="text-white/55 leading-relaxed max-w-[640px]">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CtaSection
        title={<>Ready to start the prowl?</>}
        sub="Choose your tier and we'll handle the rest."
        ctaLabel="See the tiers"
        ctaHref="/tiers"
      />
    </>
  );
}
