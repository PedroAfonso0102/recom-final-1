-- Governance additions for the RECOM admin.
-- Keeps existing values compatible while adding scheduled publishing, review dates and role taxonomy.

create table if not exists public.admin_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'viewer',
  display_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint admin_profiles_role_check check (role in ('owner', 'admin', 'editor', 'comercial', 'viewer'))
);

alter table public.admin_profiles enable row level security;

create or replace function public.current_admin_role()
returns text as $$
declare
  profile_role text;
begin
  select role into profile_role
  from public.admin_profiles
  where id = auth.uid();

  return coalesce(profile_role, auth.jwt() -> 'app_metadata' ->> 'role', 'viewer');
end;
$$ language plpgsql security definer;

create or replace function public.has_admin_role(allowed_roles text[])
returns boolean as $$
begin
  return public.current_admin_role() = any(allowed_roles);
end;
$$ language plpgsql security definer;

create or replace function public.is_admin()
returns boolean as $$
begin
  return public.has_admin_role(array['owner', 'admin']);
end;
$$ language plpgsql security definer;

drop policy if exists "Admins can manage admin profiles" on public.admin_profiles;
create policy "Admins can manage admin profiles" on public.admin_profiles
  for all to authenticated
  using (public.has_admin_role(array['owner', 'admin']))
  with check (public.has_admin_role(array['owner', 'admin']));

alter table if exists public.pages add column if not exists scheduled_at timestamptz;
alter table if exists public.pages add column if not exists last_reviewed_at timestamptz;
alter table if exists public.page_sections add column if not exists last_reviewed_at timestamptz;
alter table if exists public.suppliers add column if not exists created_by uuid;
alter table if exists public.suppliers add column if not exists updated_by uuid;
alter table if exists public.suppliers add column if not exists published_at timestamptz;
alter table if exists public.suppliers add column if not exists last_reviewed_at timestamptz;
alter table if exists public.promotions add column if not exists created_by uuid;
alter table if exists public.promotions add column if not exists updated_by uuid;
alter table if exists public.promotions add column if not exists published_at timestamptz;
alter table if exists public.promotions add column if not exists last_reviewed_at timestamptz;
alter table if exists public.processes add column if not exists created_by uuid;
alter table if exists public.processes add column if not exists updated_by uuid;
alter table if exists public.processes add column if not exists published_at timestamptz;
alter table if exists public.processes add column if not exists last_reviewed_at timestamptz;

do $$
begin
  if exists (
    select 1 from information_schema.table_constraints
    where constraint_name = 'pages_status_check'
      and table_name = 'pages'
  ) then
    alter table public.pages drop constraint pages_status_check;
  end if;

  alter table public.pages
    add constraint pages_status_check check (status in ('draft', 'published', 'scheduled', 'archived'));
end $$;

do $$
begin
  if exists (
    select 1 from information_schema.table_constraints
    where constraint_name = 'page_sections_status_check'
      and table_name = 'page_sections'
  ) then
    alter table public.page_sections drop constraint page_sections_status_check;
  end if;

  alter table public.page_sections
    add constraint page_sections_status_check check (status in ('draft', 'published', 'scheduled', 'hidden', 'archived'));
end $$;

create index if not exists pages_status_review_idx on public.pages (status, last_reviewed_at desc);
create index if not exists suppliers_status_review_idx on public.suppliers (status, last_reviewed_at desc);
create index if not exists audit_logs_entity_created_idx on public.audit_logs (entity_type, entity_id, created_at desc);

drop policy if exists "Admins can manage pages" on public.pages;
create policy "Editorial roles can manage pages" on public.pages
  for all to authenticated
  using (public.has_admin_role(array['owner', 'admin', 'editor']))
  with check (public.has_admin_role(array['owner', 'admin', 'editor']));

drop policy if exists "Admins can manage sections" on public.page_sections;
create policy "Editorial roles can manage sections" on public.page_sections
  for all to authenticated
  using (public.has_admin_role(array['owner', 'admin', 'editor']))
  with check (public.has_admin_role(array['owner', 'admin', 'editor']));

drop policy if exists "Admins can manage suppliers" on public.suppliers;
create policy "Catalog roles can manage suppliers" on public.suppliers
  for all to authenticated
  using (public.has_admin_role(array['owner', 'admin', 'editor']))
  with check (public.has_admin_role(array['owner', 'admin', 'editor']));

drop policy if exists "Admins can manage promotions" on public.promotions;
create policy "Commercial roles can manage promotions" on public.promotions
  for all to authenticated
  using (public.has_admin_role(array['owner', 'admin', 'comercial', 'editor']))
  with check (public.has_admin_role(array['owner', 'admin', 'comercial', 'editor']));

drop policy if exists "Admins can read leads" on public.leads;
drop policy if exists "Admins can manage leads" on public.leads;
create policy "Commercial roles can read leads" on public.leads
  for select to authenticated
  using (public.has_admin_role(array['owner', 'admin', 'comercial', 'viewer']));
create policy "Commercial roles can manage leads" on public.leads
  for all to authenticated
  using (public.has_admin_role(array['owner', 'admin', 'comercial']))
  with check (public.has_admin_role(array['owner', 'admin', 'comercial']));
