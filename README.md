# Mukala Web

The Mukala marketing site + authenticated app.

```
🐾 · 👤
one panther, one gradient
```

Live at: https://mukala-web.vercel.app (production target: https://mukala.ai)

---

## Stack

- **Next.js 15.0.7** (App Router) + TypeScript — *patched for CVE-2025-66478*
- **React 18.3**
- **Tailwind CSS** with locked brand tokens
- **Supabase** — auth, Postgres, RLS
- **Stripe** — payments, webhooks
- **Vercel** — hosting + auto-deploy on push to `main`

---

## Three dashboards you'll live in

| What | Where | Holds |
|---|---|---|
| Hosting / env vars / deploys | [Vercel](https://vercel.com) | `mukala-web` project |
| Users / DB / auth config | [Supabase](https://supabase.com/dashboard) | `mukala-web` project |
| Payments / products / webhooks | [Stripe](https://dashboard.stripe.com) | Both test mode + live mode |

Vercel hosts the site. Supabase is the backend. Stripe is the money side. Don't conflate them.

---

## Quick start (local dev)

### 1. Clone + install

```bash
git clone https://github.com/skeletonking1984/mukala-web.git
cd mukala-web
npm install
```

### 2. Set up Supabase

1. Create a project at https://supabase.com/dashboard
2. **Settings → API** — copy the Project URL, anon key, and service_role key
3. **SQL Editor → New query** — paste in `supabase/migrations/0001_subscriptions.sql` and run it
4. **Authentication → Sign In / Providers** — make sure Email is enabled
5. **Authentication → URL Configuration**:
   - Site URL: `http://localhost:3000` (for local dev)
   - Redirect URLs: add `http://localhost:3000/api/auth/callback`

### 3. Set up Stripe

1. Sign up at https://dashboard.stripe.com
2. **Stay in Test mode** (toggle top-left) while developing
3. Create two products with one-time prices:
   - Standard — $500 (or $1 for testing)
   - Apex — $5,000 (or $1 for testing)
4. Copy each **Price ID** (starts with `price_`, NOT `prod_`)
5. **API Keys** — copy your test `sk_test_...` and `pk_test_...`

### 4. Configure env vars

```bash
cp .env.example .env.local
```

Fill in:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...    # see Step 5
STRIPE_PRICE_STANDARD=price_...
STRIPE_PRICE_APEX=price_...

NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 5. Set up the Stripe webhook (local)

In a separate terminal (leave running):

```bash
brew install stripe/stripe-cli/stripe
stripe login
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Copy the `whsec_...` it prints into `STRIPE_WEBHOOK_SECRET` in `.env.local`.

### 6. Run it

```bash
npm run dev
```

Open http://localhost:3000

Test with card `4242 4242 4242 4242`, any future expiry, any CVC.

---

## Deployment (Vercel)

The repo auto-deploys to Vercel on every push to `main`.

### Initial setup (one-time)

1. Connect the GitHub repo to Vercel — it auto-detects Next.js
2. Add **all env vars** in Vercel → Settings → Environments → Production:
   - Same vars as `.env.local`
   - For `NEXT_PUBLIC_APP_URL`, use your Vercel URL (e.g. `https://mukala-web.vercel.app`) — change to `https://mukala.ai` once domain is wired
3. Create a **production webhook in Stripe**:
   - Dashboard → Developers → Webhooks → Add endpoint
   - URL: `https://mukala-web.vercel.app/api/webhooks/stripe`
   - Events: `checkout.session.completed`, `payment_intent.payment_failed`
   - Copy its signing secret → paste into Vercel's `STRIPE_WEBHOOK_SECRET`
4. Update Supabase URL Configuration to include your Vercel URL in:
   - Site URL
   - Redirect URLs

### Auto-deploy

Every `git push origin main` triggers a Vercel build. Watch in Vercel → Deployments.

### Environment variable changes

Vercel does **not** auto-redeploy when env vars change. After updating env vars, manually redeploy:
**Deployments → click ⋯ on latest → Redeploy**

---

## Architecture

```
app/
├── (marketing)/        Public — home, how, tiers, about, faq
├── (auth)/             Login, signup, password reset, verify
├── (app)/              Protected — dashboard, settings, checkout
└── api/
    ├── auth/callback   Supabase email-link exchange
    ├── checkout        Creates Stripe Checkout sessions
    └── webhooks/stripe Receives Stripe events

components/
├── brand/    Logo, panther orb, eyebrow
├── layout/   Nav, footer, app-nav
└── ui/       Field, CtaSection (shared UI bits)

lib/
├── supabase-*.ts   Browser + server Supabase clients
├── stripe.ts       Server-side Stripe client
├── tiers.ts        Tier configuration (single source of truth)
└── utils.ts        cn() helper

middleware.ts        Refreshes Supabase session + protects routes
supabase/migrations/ SQL migrations to run in Supabase SQL editor
```

### Route protection

`middleware.ts` runs on every request — refreshes the auth session and redirects unauthenticated users away from `/dashboard`, `/settings`, `/checkout`. Marketing pages are public.

### Stripe stub mode

When `STRIPE_SECRET_KEY` contains the word `PLACEHOLDER`, `/api/checkout` returns a fake URL instead of calling Stripe. Useful for early UX iteration without a Stripe account.

### Webhook signature verification

`/api/webhooks/stripe` validates the `stripe-signature` header against `STRIPE_WEBHOOK_SECRET`. Mismatched signatures = rejected. The same code runs locally (with the CLI secret) and in production (with the Vercel/dashboard secret); just the secret differs.

### Subscriptions table

Has a unique constraint on `stripe_session_id` to prevent duplicate rows if Stripe retries a webhook. The webhook uses `upsert` with `{ onConflict: "stripe_session_id" }` so retries are idempotent.

---

## Brand tokens

The visual system is locked. See `tailwind.config.ts` for the full palette:

- **`bg-void`** `#0C0A14` — primary background
- **`bg-deep`** `#171225` — cards, surfaces
- **`text-operator`** `#22D3EE` — the Operator pillar (cyan)
- **`text-agent`** `#A24CF0` — the Agent pillar (violet)
- **`text-gold`** `#E0A93C` — Signal Gold accent (use sparingly)
- **`bg-gradient-prowl`** — Operator → Agent gradient

Typography:
- **Geist** (sans) — body and headlines
- **Instrument Serif** (serif italic) — accents inside headlines, drop caps
- **JetBrains Mono** — eyebrows, status labels, technical content

---

## Status

| Feature | Status |
|---|---|
| Marketing pages | ✅ Live |
| Sign up + email verification | ✅ Live (email confirmation disabled until SMTP is configured — see below) |
| Login + password reset | ✅ Live |
| Stripe checkout (test mode) | ✅ Live and verified end-to-end |
| Stripe webhooks (test mode) | ✅ Live — writes to `subscriptions` table |
| Dashboard | ✅ Live (empty state until active subscription) |
| 2FA | 🟡 UI says "coming soon" — Supabase MFA API is ready to wire |
| Custom email service (Resend) | ⏳ Not yet configured — Supabase default is rate-limited |
| Real domain (mukala.ai) | ⏳ Not yet pointed at Vercel |
| Live Stripe mode | ⏳ Currently test mode only |
| Crypto payments | ⏳ Phase 6 (post-launch) |

---

## Common operations

### Re-confirm a stuck user (when email verification fails)

```sql
UPDATE auth.users
SET email_confirmed_at = now()
WHERE email = 'user@example.com';
```

Run in Supabase → SQL Editor.

### Delete a user to retest signup

Authentication → Users → click user → Danger zone → Delete user.
Cascades to subscriptions automatically (foreign key with `ON DELETE CASCADE`).

### Disable email confirmation (testing only)

Supabase → Authentication → Sign In / Providers → toggle off **"Confirm email"** at the top.
Re-enable before launch.

### See live webhook events

In Stripe dashboard → Developers → Events (test mode).
Each event shows delivery attempts and response codes.

### Replay a failed webhook

Stripe dashboard → Developers → Events → click event → Resend.

---

## Pre-launch checklist

Things to do before going live with real users:

- [ ] Set up Resend for verification emails (replaces Supabase's rate-limited default)
- [ ] Verify `mukala.ai` domain in Resend (SPF, DKIM, DMARC records)
- [ ] Configure Supabase SMTP to use Resend
- [ ] Re-enable "Confirm email" in Supabase
- [ ] Point `mukala.ai` at Vercel (DNS records from Vercel → Settings → Domains)
- [ ] Update `NEXT_PUBLIC_APP_URL` in Vercel to `https://mukala.ai`
- [ ] Update Supabase Site URL + Redirect URLs to use `mukala.ai`
- [ ] Switch Stripe to **live mode** — recreate products, copy live price IDs
- [ ] Create a **new webhook endpoint** in live Stripe pointing at `https://mukala.ai/api/webhooks/stripe`
- [ ] Update Vercel env vars to live Stripe keys + new webhook secret
- [ ] Legal pages: Terms of Service, Privacy Policy, Risk Disclosures
- [ ] Replace panther-paw emoji logo with the locked Mukala SVG logo
- [ ] Final accessibility pass (keyboard nav, color contrast, screen readers)
- [ ] Set up error monitoring (Sentry recommended)

---

## Brand non-negotiables

Apply to every page, every email, every error message:

- **No fear-driven copy.** No urgency timers. No "limited spots."
- **No anti-trader framing.** Mukala is the alternative, not the correction.
- **Operator voice** owns trust-building surfaces (marketing, dashboard, settings).
- **Agent voice** lives in mystique-only surfaces (lore, the prowl activity feed).
- **Build-in-public energy.** If something isn't ready, say so.
- **🐾 + 👤** in the footer signature.

See vault: `📋 Brand/mukala_brand_identity.md`, `📋 Brand/mukala_content_pillars.md`, `📋 Brand/mukala_visual_style.md`.

---

*Not financial advice — for now.*