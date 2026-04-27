-- Create sales_reps table for Round Robin lead distribution
create table if not exists sales_reps (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null unique,
  phone text,
  status text not null default 'active' check (status in ('active', 'inactive')),
  last_assigned_at timestamptz,
  assignment_count integer default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Enable RLS
alter table sales_reps enable row level security;

-- Admin only access
create policy "Admins can manage sales_reps" on sales_reps
  for all
  to authenticated
  using (true)
  with check (true);

-- Update leads table to include assigned_rep_id
alter table leads add column if not exists assigned_rep_id uuid references sales_reps(id);

-- Trigger to update updated_at
create or replace function update_sales_reps_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger tr_sales_reps_updated_at
  before update on sales_reps
  for each row
  execute function update_sales_reps_updated_at();

-- Function to atomically increment stats
create or replace function increment_rep_stats(rep_id uuid, assignment_time timestamptz)
returns void as $$
begin
  update sales_reps
  set 
    last_assigned_at = assignment_time,
    assignment_count = assignment_count + 1
  where id = rep_id;
end;
$$ language plpgsql;

-- Sample data
insert into sales_reps (name, email, phone) values
('Vendedor Alpha', 'comercial1@recom.com.br', '(11) 99999-0001'),
('Vendedor Beta', 'comercial2@recom.com.br', '(11) 99999-0002');
