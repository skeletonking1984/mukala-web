"use client";

import { useEffect, useState } from "react";

type Status = "loading" | "ready" | "not_found" | "error";

type BalanceData = {
  total_val: number;
  mining_bot: number;
  trading_bot: number;
  prediction_bot: number;
  airdrop_hunter: number;
};

export function BalanceCard({ productKey }: { productKey: string }) {
  const [balance, setBalance] = useState<BalanceData | null>(null);
  const [status, setStatus] = useState<Status>("loading");
  // Keep previous balance visible while re-fetching so the number doesn't flash away
  const [prevBalance, setPrevBalance] = useState<BalanceData | null>(null);

  useEffect(() => {
    let cancelled = false;

    const updateMining = async () => {
      try {
        // Only show "loading" spinner on the very first fetch (no previous data yet)
        if (!prevBalance) setStatus("loading");

        const res = await fetch(`/api/refresher?productKey=${productKey}`, {
          cache: "no-store",
        });

        const data = await res.json();

        if (cancelled) return;

        if (data.status === "success") {
          const next: BalanceData = {
            total_val: data.total_val,
            mining_bot: data.mining_bot,
            trading_bot: data.trading_bot,
            prediction_bot: data.prediction_bot,
            airdrop_hunter: data.airdrop_hunter,
          };
          setPrevBalance(next);
          setBalance(next);
          setStatus("ready");
        } else if (data.status === "not_found") {
          setStatus("not_found");
        } else {
          setStatus("error");
        }
      } catch (error) {
        console.log("Error:", error);
        if (!cancelled) setStatus("error");
      }
    };

    updateMining();
    const interval = setInterval(updateMining, 10000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [productKey]);

  // While re-fetching after the first load, show stale balance with a subtle overlay
  const displayBalance = balance ?? prevBalance;
  const isRefetching = status === "loading" && prevBalance !== null;

  return (
    <div
      className="rounded-2xl border border-white/10 p-6 relative overflow-hidden transition-all duration-300"
      style={{
        background:
          "linear-gradient(180deg, #171225 0%, rgba(23,18,37,0.3) 100%)",
      }}
    >
      {/* Subtle shimmer bar when re-fetching in background */}
      <div
        className="absolute inset-x-0 top-0 h-[2px] transition-opacity duration-500"
        style={{
          opacity: isRefetching ? 1 : 0,
          background:
            "linear-gradient(90deg, transparent, #22D3EE55, transparent)",
          animation: isRefetching ? "shimmer 1.4s ease-in-out infinite" : "none",
        }}
      />

      <div className="flex items-center justify-between mb-2">
        <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/55">
          Balance
        </div>
        <StatusDot status={status} />
      </div>

      {/* Content area — fades between states */}
      <div
        className="transition-opacity duration-300"
        style={{ opacity: status === "loading" && !prevBalance ? 0.4 : 1 }}
      >
        {status === "loading" && !prevBalance && (
          <>
            <div className="text-3xl font-bold mb-1 text-white/30 animate-pulse">
              …
            </div>
            <div className="text-xs text-white/40">Checking the prowl</div>
          </>
        )}

        {(status === "ready" || isRefetching) && displayBalance && (
          <>
            <div
              className="text-3xl font-bold mb-1 tabular-nums transition-all duration-500"
              style={{ opacity: isRefetching ? 0.6 : 1 }}
            >
              ${displayBalance.total_val}
            </div>
            <div className="text-xs text-white/40">Live from the rig</div>
          </>
        )}

        {status === "not_found" && (
          <>
            <div className="text-3xl font-bold mb-1 text-white/40">—</div>
            <div className="text-xs text-white/55 leading-relaxed">
              Rig spinning up. Your balance will appear once your first cycle
              completes.
            </div>
          </>
        )}

        {status === "error" && (
          <>
            <div className="text-3xl font-bold mb-1 text-white/40">—</div>
            <div className="text-xs text-white/55 leading-relaxed">
              Can't reach the rig right now.
            </div>
          </>
        )}
      </div>

      <style>{`
        @keyframes shimmer {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}

function StatusDot({ status }: { status: Status }) {
  const colorMap: Record<Status, string> = {
    ready:     "bg-green-400",
    loading:   "bg-cyan-400",
    not_found: "bg-yellow-400",
    error:     "bg-red-500",
  };

  const labelMap: Record<Status, string> = {
    ready:     "live",
    loading:   "syncing",
    not_found: "pending",
    error:     "error",
  };

  const shouldPulse = status === "loading";

  return (
    <div className="flex items-center gap-2">
      <span className="relative flex h-2 w-2">
        {shouldPulse && (
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${colorMap[status]}`}
          />
        )}
        <span
          className={`relative inline-flex rounded-full h-2 w-2 transition-colors duration-500 ${colorMap[status]}`}
        />
      </span>

      <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/40 transition-all duration-300">
        {labelMap[status]}
      </span>
    </div>
  );
}