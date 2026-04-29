-- 20260428000007_rls_hardening_v2.sql
-- Fixes leaks and enables RLS on legacy tables

-- 1. Enable RLS on admin_configs (legacy but still used)
ALTER TABLE public.admin_configs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins can manage admin_configs" ON public.admin_configs;
CREATE POLICY "Admins can manage admin_configs" ON public.admin_configs
  FOR ALL TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- 2. Harden page_sections policy to exclude drafts from public view
DROP POLICY IF EXISTS "Public can read visible sections from published pages" ON public.page_sections;
CREATE POLICY "Public can read published sections from published pages" ON public.page_sections
  FOR SELECT USING (
    visibility = 'visible'
    AND status = 'published'
    AND EXISTS (
      SELECT 1
      FROM public.pages
      WHERE pages.id = page_sections.page_id
        AND pages.status = 'published'
    )
  );

-- 3. Ensure pages policy is strict (redundant check but safe)
DROP POLICY IF EXISTS "Public can read published pages" ON public.pages;
CREATE POLICY "Public can read published pages" ON public.pages
  FOR SELECT USING (status = 'published');

-- 4. Double check profiles RLS
DROP POLICY IF EXISTS "Users can read their own profile" ON public.profiles;
CREATE POLICY "Users can read their own profile" ON public.profiles
  FOR SELECT TO authenticated
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Admins can manage all profiles" ON public.profiles;
CREATE POLICY "Admins can manage all profiles" ON public.profiles
  FOR ALL TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());
