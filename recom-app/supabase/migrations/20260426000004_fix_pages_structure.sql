-- Update pages table to support system pages and dynamic templates
do $$ 
begin
  -- page_type: static | dynamic_template | landing
  if not exists (select 1 from information_schema.columns where table_name = 'pages' and column_name = 'page_type') then
    alter table pages add column page_type text not null default 'static' check (page_type in ('static', 'dynamic_template', 'landing'));
  end if;

  -- template_key: home, about, suppliers, supplier_detail, etc.
  if not exists (select 1 from information_schema.columns where table_name = 'pages' and column_name = 'template_key') then
    alter table pages add column template_key text;
  end if;

  -- is_system: true for essential site pages
  if not exists (select 1 from information_schema.columns where table_name = 'pages' and column_name = 'is_system') then
    alter table pages add column is_system boolean not null default false;
  end if;

  -- is_dynamic_template: redundant but explicitly requested
  if not exists (select 1 from information_schema.columns where table_name = 'pages' and column_name = 'is_dynamic_template') then
    alter table pages add column is_dynamic_template boolean not null default false;
  end if;

  -- route_pattern: for dynamic routes like /fornecedores-catalogos/[slug]
  if not exists (select 1 from information_schema.columns where table_name = 'pages' and column_name = 'route_pattern') then
    alter table pages add column route_pattern text;
  end if;
end $$;

-- Update existing pages
update pages set 
  route_pattern = slug,
  is_dynamic_template = (page_type = 'dynamic_template')
where route_pattern is null;

-- Seed system pages
insert into pages (title, slug, route_pattern, page_type, template_key, is_system, is_dynamic_template, status)
values
  ('Início', '/', '/', 'static', 'home', true, false, 'published'),
  ('A RECOM', '/a-recom', '/a-recom', 'static', 'about', true, false, 'published'),
  ('Fornecedores & Catálogos', '/fornecedores-catalogos', '/fornecedores-catalogos', 'static', 'suppliers', true, false, 'published'),
  ('Template de Fornecedor', '/fornecedores-catalogos/[slug]', '/fornecedores-catalogos/[slug]', 'dynamic_template', 'supplier_detail', true, true, 'published'),
  ('Soluções / Processos', '/solucoes', '/solucoes', 'static', 'solutions', true, false, 'published'),
  ('Template de Processo', '/solucoes/[slug]', '/solucoes/[slug]', 'dynamic_template', 'solution_detail', true, true, 'published'),
  ('Promoções', '/promocoes', '/promocoes', 'static', 'promotions', true, false, 'published'),
  ('Contato', '/contato', '/contato', 'static', 'contact', true, false, 'published')
on conflict (slug) do update set
  title = excluded.title,
  route_pattern = excluded.route_pattern,
  page_type = excluded.page_type,
  template_key = excluded.template_key,
  is_system = excluded.is_system,
  is_dynamic_template = excluded.is_dynamic_template,
  status = excluded.status;
