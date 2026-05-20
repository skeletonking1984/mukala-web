import { Eyebrow } from "@/components/brand/eyebrow";
import { CtaSection } from "../page";

export default function AboutPage() {
  return (
    <>
      <section className="py-24 lg:py-32">
        <div className="max-w-[1240px] mx-auto px-8">
          <Eyebrow>The Origin</Eyebrow>
          <h1 className="text-[clamp(40px,6.5vw,84px)] font-extrabold leading-[0.96] tracking-[-0.035em] mb-7">
            Built by people <em className="font-serif italic font-normal gradient-text">who got burned.</em>
          </h1>
          <p className="text-lg text-white/55 max-w-[540px] mb-10 leading-relaxed">
            Mukala didn't start in a pitch deck. It started in the wreckage of bad bets and bad actors. Here's the real version.
          </p>
        </div>
      </section>

      <section className="max-w-[1240px] mx-auto px-8">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-start mt-10">
          <div
            className="font-serif italic text-2xl lg:text-[28px] leading-[1.4] tracking-[-0.01em] p-8 border-l-2 border-operator"
            style={{ background: "linear-gradient(90deg, rgba(34,211,238,0.04), transparent)" }}
          >
            "I lost money to crypto scams before I understood the game. The pattern was always the same: pay up front, get promised a number, watch them disappear. Mukala is built to be the opposite of that. That's not marketing. That's the reason it exists."
            <div className="mt-6 font-sans not-italic font-mono text-[11px] uppercase tracking-[0.2em] text-white/55">
              — Todd, Founder
            </div>
          </div>

          <div className="space-y-5">
            <p className="text-[17px] leading-[1.75] text-white/85 first-letter:font-serif first-letter:text-[64px] first-letter:font-normal first-letter:float-left first-letter:leading-[0.9] first-letter:mr-3 first-letter:mt-2 first-letter:gradient-text">
              Crypto sold itself as a level playing field. It isn't. The people winning had information, tools, and time. The rest of us had hope and a phone with a chart on it. The promises got louder, the timelines got shorter, and the "this is not financial advice" got added at the bottom of every post yelling at you to do something.
            </p>
            <p className="text-[17px] leading-[1.75] text-white/85">
              We built Mukala because we wanted exposure to crypto without that whole experience. We wanted the AI to do the work — the same way AI runs the supply chains, the trading desks, the routing systems we already trust with our money one layer of abstraction removed. And we wanted a real human to tell us the truth about what was happening.
            </p>
            <p className="text-[17px] leading-[1.75] text-white/85">
              So that's what Mukala is. The Agent does the work. The Operator tells the truth. The dashboard shows the receipts. The disclaimer at the bottom is still there — for now — but we know what we're aiming at.
            </p>
            <p className="text-[17px] leading-[1.75] text-white/85">
              This isn't anti-trading. Plenty of people love that work and do it well, and we respect it. Mukala is for everyone else. The people who don't want crypto to be a second job. The people who've decided that calm decisions made with more information beat pressured ones made in the moment.
            </p>
            <p className="text-[17px] leading-[1.75] text-white/85">
              So if you want to trade — go trade. Me and the panther agents will be over here, prowling, showing up more and more, week after week. You'll see us in the feed. You'll see us in the numbers.
            </p>
            <p className="text-[17px] leading-[1.75] text-white/85">
              That's the whole pitch. No hype. Just the prowl. 🐾
            </p>
          </div>
        </div>
      </section>

      <CtaSection
        title={<>See the work.</>}
        sub="Numbers, not promises. Mechanics, not mystique. (Well — a little mystique. We have a panther.)"
        ctaLabel="How it works"
        ctaHref="/how"
      />
    </>
  );
}
