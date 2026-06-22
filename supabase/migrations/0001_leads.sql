-- Leads captured from the Get Started form.
create table if not exists public.leads (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text not null,
  email       text not null,
  company     text,
  service     text not null,
  budget      text,
  timeline    text,
  message     text not null,
  source      text not null default 'website',
  user_agent  text,
  status      text not null default 'new'
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx on public.leads (status);
create index if not exists leads_service_idx on public.leads (service);

-- Row Level Security: browsers can submit leads, but cannot read, update, or
-- delete them. The public anon key is safe to expose because this policy only
-- grants INSERT and there is intentionally no SELECT policy.
alter table public.leads enable row level security;

drop policy if exists "anon can submit leads" on public.leads;
create policy "anon can submit leads"
  on public.leads
  for insert
  to anon
  with check (
    length(trim(name)) > 0
    and email ~* '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'
    and length(trim(service)) > 0
    and length(trim(message)) >= 10
  );
