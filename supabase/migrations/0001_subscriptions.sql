-- ============================================
-- Mukala — Subscriptions table
-- Run this in your Supabase SQL editor:
--   https://supabase.com/dashboard → SQL Editor → New query
-- ============================================

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  tier text not null check (tier in ('standard', 'apex')),
  status text not null default 'pending' check (status in ('pending', 'active', 'expired', 'cancelled')),
  stripe_session_id text,
  stripe_customer_id text,
  activated_at timestamptz,
  lock_ends_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists subscriptions_user_id_idx on public.subscriptions(user_id);
create index if not exists subscriptions_status_idx on public.subscriptions(status);

-- Updated-at trigger
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists subscriptions_updated_at on public.subscriptions;
create trigger subscriptions_updated_at
  before update on public.subscriptions
  for each row execute function public.set_updated_at();

-- Row Level Security
alter table public.subscriptions enable row level security;

-- Users can read their own subscriptions
drop policy if exists "Users can read own subscriptions" on public.subscriptions;
create policy "Users can read own subscriptions"
  on public.subscriptions for select
  using (auth.uid() = user_id);

-- Only the service role can insert/update (via Stripe webhook)
-- The anon/authenticated role does NOT need write access.
-- Webhook uses SUPABASE_SERVICE_ROLE_KEY which bypasses RLS.
