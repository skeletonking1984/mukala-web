import Link from "next/link";

/**
 * Brand mark — panther orb + MUKALA wordmark.
 * Used in nav, footer, and anywhere the brand needs to appear.
 *
 * TODO: Replace .logo-mark gradient circle + emoji with the locked SVG panther logo
 * once the asset is finalized.
 */
export function Logo({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="flex items-center gap-3 text-white no-underline">
      <div className="relative w-8 h-8 rounded-full bg-gradient-prowl flex items-center justify-center flex-shrink-0">
        <span className="text-base" style={{ filter: "drop-shadow(0 0 6px rgba(0,0,0,0.5))" }}>
          🐾
        </span>
      </div>
      <span className="font-extrabold tracking-[0.18em] text-base">MUKALA</span>
    </Link>
  );
}
