import Link from "next/link";
import { Logo } from "@/components/brand/logo";

export function Footer() {
  return (
    <footer className="border-t border-white/10 pt-16 pb-8 mt-20 relative z-10">
      <div className="max-w-[1240px] mx-auto px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-2 md:col-span-1">
            <Logo />
            <p className="text-white/55 text-sm mt-4 leading-relaxed max-w-[320px]">
              AI that mines and trades crypto for you, run by people who tell you the truth about it — so you can stop watching charts and live your life.
            </p>
          </div>

          <div>
            <h5 className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/55 mb-4">Product</h5>
            <div className="flex flex-col gap-1.5">
              <Link href="/how" className="text-white/70 hover:text-white text-sm py-1">How it works</Link>
              <Link href="/tiers" className="text-white/70 hover:text-white text-sm py-1">Tiers</Link>
              <Link href="/faq" className="text-white/70 hover:text-white text-sm py-1">FAQ</Link>
            </div>
          </div>

          <div>
            <h5 className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/55 mb-4">Company</h5>
            <div className="flex flex-col gap-1.5">
              <Link href="/about" className="text-white/70 hover:text-white text-sm py-1">About</Link>
              <span className="text-white/30 text-sm py-1 cursor-not-allowed">The Prowl Report</span>
              <span className="text-white/30 text-sm py-1 cursor-not-allowed">Press</span>
            </div>
          </div>

          <div>
            <h5 className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/55 mb-4">Legal</h5>
            <div className="flex flex-col gap-1.5">
              <span className="text-white/30 text-sm py-1 cursor-not-allowed">Terms</span>
              <span className="text-white/30 text-sm py-1 cursor-not-allowed">Privacy</span>
              <span className="text-white/30 text-sm py-1 cursor-not-allowed">Risk Disclosure</span>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-wrap justify-between items-center gap-4 text-xs text-white/55">
          <div className="font-mono tracking-wider">
            🐾 · 👤 · one panther, one gradient. © Mukala {new Date().getFullYear()}
          </div>
          <div>Not financial advice — for now.</div>
        </div>
      </div>
    </footer>
  );
}
