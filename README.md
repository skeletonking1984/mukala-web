# Mukala Web

The Mukala marketing site + authenticated app.

```
🐾 · 👤
one panther, one gradient
```

## Stack

- **Next.js 15** (App Router) + TypeScript
- **Tailwind CSS** with locked brand tokens
- **Supabase** for auth + Postgres
- **Stripe** for payments (stubbed until keys are set)
- **Cloudflare Pages** for hosting (via `@opennextjs/cloudflare`)

## Quick start

### 1. Install dependencies

```bash
npm install
```

### 2. Set up Supabase

1. Create a project at https://supabase.com/dashboard
2. Copy your project URL and anon key from **Settings → API**
3. Run the migration: open **SQL Editor → New query**, paste in
   `supabase/migrations/0001_subscriptions.sql`, click Run
4. Enable email confirmations: **Auth → Providers → Email**, toggle on
5. (Optional but recommended) Configure SMTP for emails — Supabase's default
   SMTP is rate-limited; for production use Resend, Postmark, or your own SMTP.

### 3. Set up Stripe (optional — site runs stubbed without it)

1. Create an account at https://dashboard.stripe.com
2. Grab your **test** secret and publishable keys
3. Create two products: **Standard** ($500) and **Apex** ($5,000), one-time
   payments. Copy the Price IDs.
4. For local webhook testing: install the Stripe CLI and run
   `stripe listen --forward-to localhost:3000/api/webhooks/stripe` — it'll
   print a webhook signing secret. Copy it.

### 4. Configure env vars

```bash
cp .env.example .env.local
```

Fill in the Supabase and Stripe values. The Stripe vars can stay as
`PLACEHOLDER` — the checkout flow will detect this and run in stubbed mode
(useful for design/UX iteration before payments are live).

### 5. Run it

```bash
npm run dev
```

Open http://localhost:3000

## Architecture

```
app/
├── (marketing)/         Public pages — home, how, tiers, about, faq
├── (auth)/              Login, signup, password reset, verify
├── (app)/               Protected — dashboard, settings, checkout
└── api/
    ├── auth/callback    Supabase email-link exchange
    ├── checkout         Creates Stripe Checkout sessions
    └── webhooks/stripe  Receives Stripe events

components/
├── brand/    Logo, panther orb, eyebrow — the visual identity
└── layout/   Nav, footer, app-nav

lib/
├── supabase-*.ts   Browser + server Supabase clients
├── stripe.ts       Server-side Stripe client
├── tiers.ts        Tier configuration (single source of truth)
└── utils.ts        cn() helper

middleware.ts   Refreshes Supabase session + protects routes
```

### Route protection

The middleware (`middleware.ts`) refreshes the auth session on every
request and redirects unauthenticated users away from `/dashboard`,
`/settings`, and `/checkout`. Marketing pages remain public.

### Stripe stub mode

When `STRIPE_SECRET_KEY` contains the word `PLACEHOLDER`, the
`/api/checkout` route returns a fake URL instead of calling Stripe.
This lets the rest of the app be tested without a real Stripe account.

Once real keys are set, behavior changes automatically — no code edits needed.

## Brand tokens

The brand visual system is locked. See `tailwind.config.ts` for the full
palette. Quick reference:

- **`bg-void`** `#0C0A14` — primary background
- **`bg-deep`** `#171225` — cards, surfaces
- **`text-operator`** `#22D3EE` — the Operator pillar (cyan)
- **`text-agent`** `#A24CF0` — the Agent pillar (violet)
- **`text-gold`** `#E0A93C` — Signal Gold accent (use sparingly)
- **`bg-gradient-prowl`** — Operator → Agent gradient

Typography:
- **Geist** (sans) — primary, all body and headlines
- **Instrument Serif** (serif italic) — accents inside headlines, drop caps
- **JetBrains Mono** — eyebrows, status labels, technical content

## Deploy to Cloudflare Pages

The Cloudflare adapter was left out of the initial install (npm registry
issue with one of its prerelease deps). Add it back when you're ready to
deploy:

```bash
npm install --save-dev @opennextjs/cloudflare wrangler
```

Then add these scripts to `package.json`:

```json
"preview:cf": "opennextjs-cloudflare && wrangler pages dev .open-next/dist",
"deploy:cf": "opennextjs-cloudflare && wrangler pages deploy .open-next/dist"
```

You'll need to be logged in to Wrangler (`wrangler login`). Set the same
env vars in the Cloudflare Pages dashboard under **Settings → Environment
variables**. Do NOT commit `.env.local`.

For initial dev, plain `npm run dev` works fine — Cloudflare is only
needed when you're ready to deploy.

## What's stubbed / what's not

| Feature | Status |
|---|---|
| Marketing pages | ✅ Live |
| Sign up + email verification | ✅ Live (needs Supabase) |
| Login + password reset | ✅ Live (needs Supabase) |
| 2FA | 🟡 Wired but UI says "coming soon" — Supabase MFA API is ready |
| Stripe checkout | 🟡 Stubbed — drops real Stripe URL when keys are set |
| Stripe webhooks | 🟡 Handler ready, needs real signing secret |
| Dashboard | ✅ Live (empty state until subscription is active) |
| Crypto payments | ⏳ Phase 6 (post-launch) |
| Weekly Prowl Report content | ⏳ Manual for now, automation later |

## Brand non-negotiables

These apply to every page, every email, every error message:

- **No fear-driven copy.** No urgency timers. No "limited spots."
- **No anti-trader framing.** Mukala is the alternative, not the correction.
- **Operator voice** owns trust-building surfaces (marketing, dashboard, settings).
- **Agent voice** lives in mystique-only surfaces (lore, the prowl activity feed).
- **Build-in-public energy.** If something isn't ready, say so.
- **🐾 + 👤** in the footer signature.

---

*Not financial advice — for now.*
