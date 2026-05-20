"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-client";
import { cn } from "@/lib/utils";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/settings", label: "Settings" },
];

export function AppNav({ email }: { email: string }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <div className="flex items-center gap-7">
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
      </div>
      <div className="hidden md:block h-5 w-px bg-white/10" />
      <div className="font-mono text-[11px] uppercase tracking-[0.15em] text-white/55 hidden md:block">
        {email}
      </div>
      <button
        onClick={handleSignOut}
        className="font-mono text-[11px] uppercase tracking-[0.15em] text-white/55 hover:text-white transition-colors"
      >
        Sign out
      </button>
    </div>
  );
}
