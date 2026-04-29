-- Ensure the public contact form can create leads while keeping reads private.

grant usage on schema public to anon, authenticated;
grant insert on public.leads to anon, authenticated;
grant select, update, delete on public.leads to authenticated;

drop policy if exists "Public can insert leads" on public.leads;
drop policy if exists "Allow anon insert leads" on public.leads;
create policy "Public can insert leads" on public.leads
  for insert to anon, authenticated
  with check (true);
