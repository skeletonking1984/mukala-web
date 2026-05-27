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

export function BalanceCard({
  productKey,
}: {
  productKey: string;
}) {
  const [balance, setBalance] = useState<BalanceData | null>(null);
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    let cancelled = false;

    const updateMining = async () => {
      try {
        setStatus("loading");

        const res = await fetch(
          `/api/refresher?productKey=${productKey}`,
          {
            cache: "no-store",
          }
        );

        const data = await res.json();

        if (cancelled) return;

        if (data.status === "success") {
          setBalance({
            total_val: data.total_val,
            mining_bot: data.mining_bot,
            trading_bot: data.trading_bot,
            prediction_bot: data.prediction_bot,
            airdrop_hunter: data.airdrop_hunter,
          });

          setStatus("ready");
        } else if (data.status === "not_found") {
          setStatus("not_found");
        } else {
          setStatus("error");
        }
      } catch (error) {
        console.log("Error:", error);

        if (!cancelled) {
          setStatus("error");
        }
      }
    };

    updateMining();

    const interval = setInterval(() => {
      updateMining();
    }, 10000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [productKey]);

  return (
    <div
      className="rounded-2xl border border-white/10 p-6 relative"
      style={{
        background:
          "linear-gradient(180deg, #171225 0%, rgba(23,18,37,0.3) 100%)",
      }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/55">
          Balance
        </div>

        <StatusDot status={status} />
      </div>

      {status === "loading" && (
        <>
          <div className="text-3xl font-bold mb-1 text-white/30">
            …
          </div>

          <div className="text-xs text-white/40">
            Checking the prowl
          </div>
        </>
      )}

      {status === "ready" && balance && (
        <>
          <div className="text-3xl font-bold mb-1">
            ${balance.total_val}
          </div>

          <div className="text-xs text-white/40">
            Live from the rig
          </div>
        </>
      )}

      {status === "not_found" && (
        <>
          <div className="text-3xl font-bold mb-1 text-white/40">
            —
          </div>

          <div className="text-xs text-white/55 leading-relaxed">
            Rig spinning up. Your balance will appear once your
            first cycle completes.
          </div>
        </>
      )}

      {status === "error" && (
        <>
          <div className="text-3xl font-bold mb-1 text-white/40">
            —
          </div>

          <div className="text-xs text-white/55 leading-relaxed">
            Can't reach the rig right now.
          </div>
        </>
      )}
    </div>
  );
}

function StatusDot({
  status,
}: {
  status: Status;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-1.5 h-1.5 rounded-full bg-green-400" />

      <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/40">
        {status}
      </span>
    </div>
  );
}
