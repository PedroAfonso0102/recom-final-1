ALTER TABLE public.admin_configs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read admin_configs" ON admin_configs FOR SELECT USING (true);
CREATE POLICY "Authenticated can manage admin_configs" ON admin_configs FOR ALL TO authenticated USING (true) WITH CHECK (true);
