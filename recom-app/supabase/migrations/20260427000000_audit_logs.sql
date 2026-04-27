-- Create audit_logs table to track all administrative actions
create table if not exists audit_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id),
  action text not null,
  entity_type text not null,
  entity_id text,
  details jsonb default '{}'::jsonb,
  created_at timestamptz not null default now()
);

-- Enable RLS
alter table audit_logs enable row level security;

-- Only authenticated users (admins) can read audit logs
create policy "Authenticated can read audit logs" on audit_logs
  for select
  to authenticated
  using (true);

-- System can insert logs
create policy "System can insert audit logs" on audit_logs
  for insert
  to authenticated
  with check (true);

-- Index for performance
create index if not exists audit_logs_created_at_idx on audit_logs (created_at desc);
create index if not exists audit_logs_entity_idx on audit_logs (entity_type, entity_id);
