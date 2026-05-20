/**
 * The hero visual — a glowing panther orb with two orbiting rings.
 * Placeholder for richer Agent imagery (Grok Imagine renders, etc.) once available.
 */
export function PantherOrb() {
  return (
    <div className="relative aspect-square max-w-[480px] w-[80%] mx-auto md:mx-0 md:ml-auto">
      {/* outer dashed ring */}
      <div className="absolute -inset-[50px] border border-dashed border-white/10 rounded-full animate-rotate-slow [animation-duration:50s] [animation-direction:reverse]">
        <div
          className="absolute -bottom-1 left-[30%] w-1.5 h-1.5 rounded-full bg-agent"
          style={{ boxShadow: "0 0 12px #A24CF0" }}
        />
      </div>
      {/* inner ring */}
      <div className="absolute -inset-5 border border-white/10 rounded-full animate-rotate-slow">
        <div
          className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-operator"
          style={{ boxShadow: "0 0 16px #22D3EE" }}
        />
      </div>
      {/* the orb */}
      <div
        className="absolute inset-0 rounded-full animate-orb-float"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, #22D3EE 0%, transparent 40%), radial-gradient(circle at 70% 70%, #A24CF0 0%, transparent 50%), radial-gradient(circle at 50% 50%, rgba(162,76,240,0.6), transparent 70%)",
          filter: "blur(2px)",
        }}
      />
      <div
        className="absolute inset-0 grid place-items-center text-[clamp(120px,18vw,200px)] z-10"
        style={{ filter: "drop-shadow(0 0 40px rgba(162,76,240,0.5))" }}
      >
        🐾
      </div>
    </div>
  );
}
