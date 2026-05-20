import { createClient } from "@/lib/supabase-server";

export default async function SettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="max-w-3xl mx-auto px-8 py-12">
      <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-operator mb-3">Account</div>
      <h1 className="text-4xl font-bold tracking-tight mb-10">Settings.</h1>

      <Section title="Profile">
        <Field label="Email" value={user?.email || "—"} />
        <Field label="User ID" value={user?.id || "—"} mono />
        <Field
          label="Account created"
          value={
            user?.created_at
              ? new Date(user.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "—"
          }
        />
      </Section>

      <Section title="Security">
        <Setting
          label="Password"
          desc="Change your password. We'll email a reset link."
          action={<a href="/reset-password" className="btn-ghost text-xs !px-5 !py-2.5">Reset</a>}
        />
        <Setting
          label="Two-factor authentication"
          desc="Add an authenticator app. We use TOTP with backup codes."
          action={<button className="btn-ghost text-xs !px-5 !py-2.5 opacity-50 cursor-not-allowed">Coming soon</button>}
          note="2FA via Supabase MFA — wiring it up after first launch."
        />
      </Section>

      <Section title="Danger zone">
        <Setting
          label="Delete account"
          desc="Closes your account. Doesn't trigger early withdrawal from any active prowl — contact us for that."
          action={<button className="text-red-300 text-xs uppercase tracking-widest font-semibold hover:text-red-200">Delete</button>}
        />
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-12">
      <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/55 mb-5">{title}</h2>
      <div
        className="rounded-2xl border border-white/10 divide-y divide-white/10"
        style={{ background: "linear-gradient(180deg, #171225 0%, rgba(23,18,37,0.3) 100%)" }}
      >
        {children}
      </div>
    </div>
  );
}

function Field({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="px-6 py-5 flex items-center justify-between gap-6 flex-wrap">
      <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/55">{label}</div>
      <div className={mono ? "font-mono text-xs text-white/80 break-all" : "text-sm text-white"}>{value}</div>
    </div>
  );
}

function Setting({ label, desc, action, note }: {
  label: string; desc: string; action: React.ReactNode; note?: string;
}) {
  return (
    <div className="px-6 py-5 flex items-center justify-between gap-6 flex-wrap">
      <div className="flex-1 min-w-0">
        <div className="font-medium text-white mb-1">{label}</div>
        <div className="text-sm text-white/55 leading-relaxed">{desc}</div>
        {note && <div className="text-xs text-white/40 mt-2 italic">{note}</div>}
      </div>
      <div>{action}</div>
    </div>
  );
}
