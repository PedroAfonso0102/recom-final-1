create table if not exists pages (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text,
  status text not null default 'draft',
  seo_title text,
  seo_description text,
  og_image_url text,
  published_at timestamptz,
  created_by uuid,
  updated_by uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint pages_status_check check (status in ('draft', 'published', 'archived'))
);

create table if not exists page_sections (
  id uuid primary key default gen_random_uuid(),
  page_id uuid not null references pages(id) on delete cascade,
  component_type text not null,
  props jsonb not null default '{}'::jsonb,
  sort_order integer not null default 0,
  status text not null default 'draft',
  visibility text not null default 'visible',
  anchor_id text,
  created_by uuid,
  updated_by uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint page_sections_status_check check (status in ('draft', 'published', 'archived')),
  constraint page_sections_visibility_check check (visibility in ('visible', 'hidden'))
);

create table if not exists page_versions (
  id uuid primary key default gen_random_uuid(),
  page_id uuid not null references pages(id) on delete cascade,
  version_number integer not null,
  snapshot jsonb not null,
  created_by uuid,
  created_at timestamptz not null default now(),
  constraint page_versions_page_id_version_number_key unique (page_id, version_number)
);

create index if not exists page_sections_page_id_sort_order_idx on page_sections (page_id, sort_order);
create index if not exists page_versions_page_id_created_at_idx on page_versions (page_id, created_at desc);

alter table pages enable row level security;
alter table page_sections enable row level security;
alter table page_versions enable row level security;

create policy "Public can read published pages" on pages
  for select
  using (status = 'published');

create policy "Authenticated can manage pages" on pages
  for all
  to authenticated
  using (true)
  with check (true);

create policy "Public can read visible sections from published pages" on page_sections
  for select
  using (
    visibility = 'visible'
    and exists (
      select 1
      from pages
      where pages.id = page_sections.page_id
        and pages.status = 'published'
    )
  );

create policy "Authenticated can manage sections" on page_sections
  for all
  to authenticated
  using (true)
  with check (true);

create policy "Authenticated can read versions" on page_versions
  for select
  to authenticated
  using (true);

create policy "Authenticated can manage versions" on page_versions
  for all
  to authenticated
  using (true)
  with check (true);

drop trigger if exists update_pages_updated_at on pages;
create trigger update_pages_updated_at
before update on pages
for each row execute procedure update_updated_at_column();

drop trigger if exists update_page_sections_updated_at on page_sections;
create trigger update_page_sections_updated_at
before update on page_sections
for each row execute procedure update_updated_at_column();
