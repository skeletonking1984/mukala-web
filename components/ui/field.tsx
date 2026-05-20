"use client";

/**
 * Shared input field used in auth forms.
 * Lives in components/ui so multiple auth pages can import it
 * without violating Next.js page export rules.
 */
export function Field({ label, type, value, onChange, required, minLength, hint }: {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  minLength?: number;
  hint?: string;
}) {
  return (
    <div>
      <label className="block font-mono text-[11px] uppercase tracking-[0.2em] text-white/55 mb-2">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        minLength={minLength}
        className="w-full px-4 py-3.5 rounded-xl bg-deep border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-operator focus:bg-deep/80 transition-colors"
      />
      {hint && <p className="text-xs text-white/40 mt-2">{hint}</p>}
    </div>
  );
}