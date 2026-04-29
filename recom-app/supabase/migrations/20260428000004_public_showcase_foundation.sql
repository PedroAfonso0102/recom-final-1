-- Public showcase foundation: route data, lead governance and RLS hardening.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'viewer',
  display_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint profiles_role_check check (role in ('owner', 'admin', 'editor', 'comercial', 'viewer'))
);

create table if not exists public.site_settings (
  id uuid primary key default gen_random_uuid(),
  company_name text not null default 'RECOM',
  phone text,
  whatsapp text,
  email text,
  address text,
  business_hours text,
  google_maps_url text,
  social_links jsonb not null default '{}'::jsonb,
  default_seo_title text,
  default_seo_description text,
  updated_at timestamptz not null default now()
);

create table if not exists public.supplier_processes (
  supplier_id uuid not null references public.suppliers(id) on delete cascade,
  process_id uuid not null references public.processes(id) on delete cascade,
  sort_order integer not null default 0,
  primary key (supplier_id, process_id)
);

create table if not exists public.lead_events (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads(id) on delete cascade,
  created_at timestamptz not null default now(),
  event_type text not null,
  description text,
  created_by uuid references auth.users(id),
  metadata jsonb not null default '{}'::jsonb
);

create table if not exists public.lead_files (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads(id) on delete cascade,
  media_asset_id uuid references public.media_assets(id) on delete set null,
  file_name text,
  file_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.activity_log (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references auth.users(id),
  entity_type text not null,
  entity_id text,
  action text not null,
  before jsonb,
  after jsonb,
  created_at timestamptz not null default now()
);

alter table public.leads add column if not exists priority text not null default 'normal';
alter table public.leads add column if not exists source_type text not null default 'contact';
alter table public.leads add column if not exists whatsapp text;
alter table public.leads add column if not exists assigned_to uuid references auth.users(id);
alter table public.leads add column if not exists notes text;
alter table public.leads add column if not exists last_contacted_at timestamptz;
alter table public.leads add column if not exists whatsapp_url text;

alter table public.processes add column if not exists body text;
alter table public.processes add column if not exists published_at timestamptz;
alter table public.processes add column if not exists scheduled_at timestamptz;
alter table public.suppliers add column if not exists published_at timestamptz;
alter table public.suppliers add column if not exists scheduled_at timestamptz;
alter table public.promotions add column if not exists terms text;
alter table public.promotions add column if not exists seo_title text;
alter table public.promotions add column if not exists seo_description text;
alter table public.promotions add column if not exists published_at timestamptz;
alter table public.promotions add column if not exists scheduled_at timestamptz;

alter table public.profiles enable row level security;
alter table public.site_settings enable row level security;
alter table public.supplier_processes enable row level security;
alter table public.lead_events enable row level security;
alter table public.lead_files enable row level security;
alter table public.activity_log enable row level security;

drop policy if exists "Public can read site settings" on public.site_settings;
create policy "Public can read site settings" on public.site_settings
  for select using (true);

drop policy if exists "Admins can manage site settings" on public.site_settings;
create policy "Admins can manage site settings" on public.site_settings
  for all to authenticated
  using (public.has_admin_role(array['owner', 'admin']))
  with check (public.has_admin_role(array['owner', 'admin']));

drop policy if exists "Public can read published supplier processes" on public.supplier_processes;
create policy "Public can read published supplier processes" on public.supplier_processes
  for select using (
    exists (select 1 from public.suppliers s where s.id = supplier_id and s.status in ('active', 'published'))
    and exists (select 1 from public.processes p where p.id = process_id and p.status in ('active', 'published'))
  );

drop policy if exists "Editors can manage supplier processes" on public.supplier_processes;
create policy "Editors can manage supplier processes" on public.supplier_processes
  for all to authenticated
  using (public.has_admin_role(array['owner', 'admin', 'editor']))
  with check (public.has_admin_role(array['owner', 'admin', 'editor']));

drop policy if exists "Public can insert leads" on public.leads;
drop policy if exists "Allow anon insert leads" on public.leads;
create policy "Public can insert leads" on public.leads
  for insert to anon, authenticated
  with check (true);

drop policy if exists "Commercial roles can manage lead events" on public.lead_events;
create policy "Commercial roles can manage lead events" on public.lead_events
  for all to authenticated
  using (public.has_admin_role(array['owner', 'admin', 'comercial']))
  with check (public.has_admin_role(array['owner', 'admin', 'comercial']));

drop policy if exists "Commercial roles can manage lead files" on public.lead_files;
create policy "Commercial roles can manage lead files" on public.lead_files
  for all to authenticated
  using (public.has_admin_role(array['owner', 'admin', 'comercial']))
  with check (public.has_admin_role(array['owner', 'admin', 'comercial']));

drop policy if exists "Admins can read activity log" on public.activity_log;
create policy "Admins can read activity log" on public.activity_log
  for select to authenticated
  using (public.has_admin_role(array['owner', 'admin']));

drop policy if exists "System/admin can insert activity log" on public.activity_log;
create policy "System/admin can insert activity log" on public.activity_log
  for insert to authenticated
  with check (public.has_admin_role(array['owner', 'admin', 'editor', 'comercial']));

drop policy if exists "Allow public read-only access for active processes" on public.processes;
drop policy if exists "Public can read published processes" on public.processes;
create policy "Public can read published processes" on public.processes
  for select using (status in ('active', 'published'));

drop policy if exists "Allow public read-only access for active suppliers" on public.suppliers;
drop policy if exists "Public can read published suppliers" on public.suppliers;
create policy "Public can read published suppliers" on public.suppliers
  for select using (status in ('active', 'published'));

drop policy if exists "Allow public read-only access for active promotions" on public.promotions;
drop policy if exists "Public can read active promotions" on public.promotions;
create policy "Public can read active promotions" on public.promotions
  for select using (status in ('active', 'published') and ends_at >= now());

create index if not exists supplier_processes_process_idx on public.supplier_processes (process_id, sort_order);
create index if not exists leads_status_priority_idx on public.leads (status, priority, created_at desc);
create index if not exists lead_events_lead_created_idx on public.lead_events (lead_id, created_at desc);
create index if not exists activity_log_entity_created_idx on public.activity_log (entity_type, entity_id, created_at desc);
