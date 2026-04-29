-- Media Assets: centralized library for all uploaded files
create table if not exists media_assets (
  id uuid primary key default gen_random_uuid(),
  file_name text not null,
  file_path text not null,
  public_url text not null,
  alt_text text,
  mime_type text not null,
  size_bytes bigint not null default 0,
  width integer,
  height integer,
  bucket text not null default 'media',
  uploaded_by uuid,
  created_at timestamptz not null default now()
);

create index if not exists media_assets_created_at_idx on media_assets (created_at desc);
create index if not exists media_assets_mime_type_idx on media_assets (mime_type);

alter table media_assets enable row level security;

-- Public can read all media (images are public assets)
create policy "Public can read media" on media_assets
  for select
  using (true);

-- Authenticated users can manage media
create policy "Authenticated can manage media" on media_assets
  for all
  to authenticated
  using (true)
  with check (true);
