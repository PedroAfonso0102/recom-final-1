-- 20260428000000_cms_security_hardening.sql
-- Hardening RLS policies to enforce 'admin' role check instead of just 'authenticated'

-- 1. Create a helper function to check admin role from JWT app_metadata
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean AS $$
BEGIN
  RETURN (
    COALESCE(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Drop existing overly permissive policies for CMS tables
DROP POLICY IF EXISTS "Authenticated can manage pages" ON pages;
DROP POLICY IF EXISTS "Authenticated can manage sections" ON page_sections;
DROP POLICY IF EXISTS "Authenticated can read versions" ON page_versions;
DROP POLICY IF EXISTS "Authenticated can manage versions" ON page_versions;

-- 3. Create hardened policies for CMS tables
-- Pages
CREATE POLICY "Admins can manage pages" ON pages
  FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Page Sections
CREATE POLICY "Admins can manage sections" ON page_sections
  FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Page Versions
CREATE POLICY "Admins can manage versions" ON page_versions
  FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- 4. Also harden core tables (Processes, Suppliers, Promotions, Leads)
DROP POLICY IF EXISTS "Allow admin full access processes" ON processes;
DROP POLICY IF EXISTS "Allow admin full access suppliers" ON suppliers;
DROP POLICY IF EXISTS "Allow admin full access promotions" ON promotions;
DROP POLICY IF EXISTS "Allow admin full access leads" ON leads;

CREATE POLICY "Admins can manage processes" ON processes
  FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE POLICY "Admins can manage suppliers" ON suppliers
  FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE POLICY "Admins can manage promotions" ON promotions
  FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE POLICY "Admins can read leads" ON leads
  FOR SELECT TO authenticated USING (public.is_admin());

CREATE POLICY "Admins can manage leads" ON leads
  FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Audit Logs (Only admins can read/write)
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admins can manage audit_logs" ON audit_logs;
CREATE POLICY "Admins can manage audit_logs" ON audit_logs
  FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
