import { Logo } from "@/components/brand/logo";
import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="px-8 py-6 border-b border-white/10">
        <div className="max-w-[1240px] mx-auto">
          <Logo />
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center px-6 py-16 relative z-10">
        <div className="w-full max-w-md">
          {children}
        </div>
      </main>
      <footer className="px-8 py-6 border-t border-white/10 text-center text-xs text-white/55 font-mono tracking-wider">
        🐾 · 👤 · Mukala — Not financial advice for now.{" "}
        <Link href="/" className="underline hover:text-white">Back to site</Link>
      </footer>
    </div>
  );
}
