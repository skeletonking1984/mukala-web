"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase-client";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/settings", label: "Settings" },
];

export function AppNav({ email }: { email: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <>
      {/* Desktop */}
      <div className="hidden md:flex items-center gap-7">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={cn(
              "text-sm font-medium tracking-wide transition-colors",
              pathname?.startsWith(l.href) ? "text-white" : "text-white/55 hover:text-white"
            )}
          >
            {l.label}
          </Link>
        ))}
        <div className="h-5 w-px bg-white/10" />
        <div className="font-mono text-[11px] uppercase tracking-[0.15em] text-white/55">
          {email}
        </div>
        <button
          onClick={handleSignOut}
          className="font-mono text-[11px] uppercase tracking-[0.15em] text-white/55 hover:text-white transition-colors"
        >
          Sign out
        </button>
      </div>

      {/* Mobile toggle */}
      <button
        aria-label="Toggle menu"
        className="md:hidden text-white"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden absolute top-full left-0 right-0 border-t border-white/10 bg-void z-40">
          <div className="px-8 py-6 flex flex-col gap-5">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "text-base font-medium",
                  pathname?.startsWith(l.href) ? "text-white" : "text-white/70 hover:text-white"
                )}
              >
                {l.label}
              </Link>
            ))}
            <div className="h-px bg-white/10 my-1" />
            <div className="font-mono text-[11px] uppercase tracking-[0.15em] text-white/55 break-all">
              {email}
            </div>
            <button
              onClick={() => {
                setOpen(false);
                handleSignOut();
              }}
              className="font-mono text-[11px] uppercase tracking-[0.15em] text-white/55 hover:text-white transition-colors text-left"
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </>
  );
}