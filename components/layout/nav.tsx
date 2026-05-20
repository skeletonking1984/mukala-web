"use client";

import Link from "next/link";
import { useState } from "react";
import { Logo } from "@/components/brand/logo";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/how", label: "How it works" },
  { href: "/tiers", label: "Tiers" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
];

export function Nav({ user }: { user: { email?: string } | null }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-void/70 border-b border-white/10">
      <div className="max-w-[1240px] mx-auto px-8 py-4 flex items-center justify-between">
        <Logo />

        <div className="hidden md:flex items-center gap-9">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-white/55 hover:text-white text-sm font-medium tracking-wide transition-colors"
            >
              {l.label}
            </Link>
          ))}
          {user ? (
            <Link href="/dashboard" className="btn-primary !px-5 !py-2.5 !text-xs">
              Dashboard
            </Link>
          ) : (
            <Link href="/signup" className="btn-primary !px-5 !py-2.5 !text-xs">
              Get Started
            </Link>
          )}
        </div>

        <button
          aria-label="Toggle menu"
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-white/10 bg-void">
          <div className="px-8 py-6 flex flex-col gap-5">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-white/70 hover:text-white text-base font-medium"
              >
                {l.label}
              </Link>
            ))}
            {user ? (
              <Link href="/dashboard" className="btn-primary self-start">
                Dashboard
              </Link>
            ) : (
              <Link href="/signup" className="btn-primary self-start">
                Get Started
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
