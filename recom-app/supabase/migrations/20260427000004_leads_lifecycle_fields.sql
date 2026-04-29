-- Extend leads with the lifecycle fields already used by the admin UI.
-- This keeps the DB, generated types, and admin actions aligned.

alter table leads
  add column if not exists process_id uuid references processes(id) on delete set null,
  add column if not exists notified_at timestamptz,
  add column if not exists revenue_value numeric(12,2),
  add column if not exists loss_reason text,
  add column if not exists closed_at timestamptz;

create index if not exists leads_process_id_idx on leads (process_id);
create index if not exists leads_assigned_rep_id_idx on leads (assigned_rep_id);
create index if not exists leads_notified_at_idx on leads (notified_at desc);
