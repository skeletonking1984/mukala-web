"use client";

import { useEffect, useState } from "react";

type Status = "loading" | "ready" | "error";

export function BalanceCard({ productKey }: { productKey: string }) {
  const [balance, setBalance] = useState<string>("—");
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    let cancelled = false;

    fetch(`https://mukalatech.com/api/php?action=getBalance&product_key=${encodeURIComponent(productKey)}`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        if (cancelled) return;
        setBalance(data.balance ?? "—");
        setStatus("ready");
      })
      .catch(() => {
        if (cancelled) return;
        setStatus("error");
      });

    return () => { cancelled = true; };
  }, [productKey]);

  return (
    <div
      className="rounded-2xl border border-white/10 p-6 relative"
      style={{ background: "linear-gradient(180deg, #171225 0%, rgba(23,18,37,0.3) 100%)" }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/55">
          Balance
        </div>
        <StatusDot status={status} />
      </div>

      {status === "loading" && (
        <>
          <div className="text-3xl font-bold mb-1 text-white/30">…</div>
          <div className="text-xs text-white/40">Checking the prowl</div>
        </>
      )}

      {status === "ready" && (
        <>
          <div className="text-3xl font-bold mb-1">{balance}</div>
          <div className="text-xs text-white/40">Live from the rig</div>
        </>
      )}

      {status === "error" && (
        <>
          <div className="text-3xl font-bold mb-1 text-white/40">—</div>
          <div className="text-xs text-white/55 leading-relaxed">
            Can't reach the rig right now. The prowl continues — check back in a minute.
          </div>
        </>
      )}
    </div>
  );
}

function StatusDot({ status }: { status: Status }) {
  const color =
    status === "ready" ? "bg-operator" :
    status === "error" ? "bg-red-400" :
    "bg-white/30";

  const shadow =
    status === "ready" ? "0 0 12px #22D3EE" :
    status === "error" ? "0 0 12px rgb(248,113,113)" :
    "none";

  const label =
    status === "ready" ? "Connected" :
    status === "error" ? "Offline" :
    "Connecting";

  return (
    <div className="flex items-center gap-2">
      <span
        className={`w-1.5 h-1.5 rounded-full ${color} ${status === "loading" ? "animate-pulse" : ""}`}
        style={{ boxShadow: shadow }}
        aria-label={label}
      />
      <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/40">
        {label}
      </span>
    </div>
  );
}