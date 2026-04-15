-- OnGuard backend (Supabase)
-- Minimal tables for Solana webhook ingestion + later push notification processing.

create table if not exists public.solana_webhook_events (
  id bigserial primary key,
  received_at timestamptz not null default now(),
  processed boolean not null default false,
  payload jsonb not null
);

create index if not exists solana_webhook_events_received_at_idx on public.solana_webhook_events(received_at desc);
create index if not exists solana_webhook_events_processed_idx on public.solana_webhook_events(processed);

-- Note: in production we will add:
-- - a dedupe key (signature) + unique index
-- - tables for users, wallets, notification tokens
-- - RLS policies
