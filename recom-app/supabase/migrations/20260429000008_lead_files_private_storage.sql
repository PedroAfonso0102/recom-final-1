-- Private Storage bucket for lead attachments.
-- Public media remains in the `media` bucket; lead files must never be public.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'lead-files',
  'lead-files',
  false,
  10485760,
  array[
    'application/pdf',
    'image/jpeg',
    'image/png',
    'image/webp',
    'text/plain'
  ]
)
on conflict (id) do update
set
  public = false,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Commercial roles can read lead file objects" on storage.objects;
create policy "Commercial roles can read lead file objects" on storage.objects
  for select to authenticated
  using (
    bucket_id = 'lead-files'
    and public.has_admin_role(array['owner', 'admin', 'comercial'])
  );

drop policy if exists "Commercial roles can upload lead file objects" on storage.objects;
create policy "Commercial roles can upload lead file objects" on storage.objects
  for insert to authenticated
  with check (
    bucket_id = 'lead-files'
    and public.has_admin_role(array['owner', 'admin', 'comercial'])
  );

drop policy if exists "Commercial roles can update lead file objects" on storage.objects;
create policy "Commercial roles can update lead file objects" on storage.objects
  for update to authenticated
  using (
    bucket_id = 'lead-files'
    and public.has_admin_role(array['owner', 'admin', 'comercial'])
  )
  with check (
    bucket_id = 'lead-files'
    and public.has_admin_role(array['owner', 'admin', 'comercial'])
  );

drop policy if exists "Commercial roles can delete lead file objects" on storage.objects;
create policy "Commercial roles can delete lead file objects" on storage.objects
  for delete to authenticated
  using (
    bucket_id = 'lead-files'
    and public.has_admin_role(array['owner', 'admin', 'comercial'])
  );
