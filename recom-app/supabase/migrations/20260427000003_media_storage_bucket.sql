-- Storage bucket and object policies for the media library.
-- This keeps the CMS media flow declarative: bucket, table, and access rules live together.

-- Ensure the bucket exists and is public so public URLs resolve correctly.
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do update
set name = excluded.name,
    public = excluded.public;

-- Keep the media table aligned with the auth layer and query patterns.
alter table media_assets
  add constraint media_assets_uploaded_by_fkey
  foreign key (uploaded_by) references auth.users(id) on delete set null;

create index if not exists media_assets_uploaded_by_idx on media_assets (uploaded_by);
create index if not exists media_assets_bucket_idx on media_assets (bucket);

-- Storage object access is scoped to the media bucket.
create policy "Public can read media objects" on storage.objects
  for select
  using (bucket_id = 'media');

create policy "Authenticated can upload media objects" on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'media');

create policy "Authenticated can update media objects" on storage.objects
  for update
  to authenticated
  using (bucket_id = 'media')
  with check (bucket_id = 'media');

create policy "Authenticated can delete media objects" on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'media');
