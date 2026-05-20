"use client";

import { useState } from "react";
import { Eyebrow } from "@/components/brand/eyebrow";

const faqs = [
  {
    q: "Is this a scam?",
    a: "Fair question. Ask it about everything in crypto. Here's our answer: your principal is held so it can't be spent out from under you, you choose your own starting amount, and we show you what the system did every week. Judge us on the work, not on a promise.",
  },
  {
    q: "Are you against trading?",
    a: "No. If you want to trade, trade. People do it well and we respect the work. Mukala is for everyone else — the people who don't want crypto to be a second job. Both can be true.",
  },
  {
    q: "What if I want out before the year is up?",
    a: "Fair. The answer isn't 'you'll regret it.' The answer is: here's how the lock works, here's what you'd get back, here's the timeline. If Mukala isn't right for you, Mukala isn't right for you. No pressure either way.",
  },
  {
    q: "What kind of return should I expect?",
    a: "We won't promise you a number. Anyone promising a number is selling something. What we'll show you is what the system actually did — every week, honestly, including the weeks that didn't go our way. The track record is the answer.",
  },
  {
    q: "Why a 12-month lock?",
    a: "Because the strategy needs room to compound and reposition without being yanked around. The lock isn't a trap — it's what makes the strategy actually work. Short-term holding makes the AI's job impossible. A year gives it the runway it needs.",
  },
  {
    q: "What's the difference between Standard and Apex?",
    a: "Standard runs the core strategy on 20+ chains. Apex unlocks all 40+ chains plus the full strategy stack and priority execution. Same Agent, more surface area. See the side-by-side on the Tiers page.",
  },
  {
    q: "What happens if the AI loses money?",
    a: "A week can be down. A month can be down. That's how markets work and we'll tell you when it happens. Your principal is held separately and protected during the lock period — what the AI is putting to work is the yield-generating activity, not your base. The system is designed for the year, not the week.",
  },
  {
    q: "Is the site finished?",
    a: "No, and we'll tell you what isn't. The Prowl Report cadence is live. The dashboard is functional. Some flows are still rough — buying with crypto is coming after launch, the mobile experience is being polished, and a few buttons go to placeholders. Building in public is part of the brand, not a confession.",
  },
  {
    q: "Why 'not financial advice' at the bottom?",
    a: "Because we're not licensed to give financial advice yet, and saying we are would be illegal. We know that disclaimer is the whole industry's escape hatch and we don't love it. The destination is a Mukala that can stand behind its calls. That's a long road and we're walking it deliberately.",
  },
  {
    q: "Do I need to buy a device or set anything up?",
    a: "No. The moment you sign up, you're running on Mukala's infrastructure. No hardware, no install, no waiting for a box to ship. The prowl starts within the day. If you ever want a dedicated device of your own, that's an option later — but it's never required.",
  },
];

export default function FaqPage() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      <section className="py-24 lg:py-32">
        <div className="max-w-[1240px] mx-auto px-8">
          <Eyebrow>The Honest Answer</Eyebrow>
          <h1 className="text-[clamp(40px,6.5vw,84px)] font-extrabold leading-[0.96] tracking-[-0.035em] mb-7">
            The real questions, <em className="font-serif italic font-normal gradient-text">answered straight.</em>
          </h1>
          <p className="text-lg text-white/55 max-w-[540px] mb-10 leading-relaxed">
            Ask anything you want. Here are the ones people ask the most — and the answers, with no defensiveness and no spin.
          </p>
        </div>
      </section>

      <section className="max-w-[1240px] mx-auto px-8">
        <div className="max-w-3xl mt-10">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className="border-b border-white/10 py-7 cursor-pointer"
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <div className="flex justify-between items-start gap-6">
                  <div className="text-xl font-medium tracking-[-0.01em] flex-1">{f.q}</div>
                  <div
                    className={`font-mono text-2xl text-operator transition-transform shrink-0 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </div>
                </div>
                <div
                  className={`overflow-hidden transition-all duration-400 text-white/55 text-base leading-relaxed ${
                    isOpen ? "max-h-[500px] pt-4" : "max-h-0"
                  }`}
                >
                  {f.a}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="max-w-[1240px] mx-auto px-8 my-20">
        <div
          className="py-20 px-10 rounded-[2rem] border border-white/10 text-center relative overflow-hidden"
          style={{
            background:
              "radial-gradient(ellipse at top, rgba(162,76,240,0.15), transparent 70%), linear-gradient(180deg, #171225, #0C0A14)",
          }}
        >
          <h2 className="text-[clamp(32px,4vw,52px)] font-bold tracking-tight leading-[1.05] mb-6">
            Got more questions? <em className="font-serif italic font-normal">Ask us.</em>
          </h2>
          <p className="text-lg text-white/55 mb-8">Email the team. We answer. (Yes, a real person.)</p>
          <a href="mailto:hello@mukala.example" className="btn-ghost">hello@mukala</a>
        </div>
      </section>
    </>
  );
}
