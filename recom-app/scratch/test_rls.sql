BEGIN;
-- Simulate Admin
SET LOCAL auth.uid = '00000000-0000-0000-0000-000000000001';
SELECT 'Testing as Admin' as context, public.current_admin_role() as role;
SELECT count(*) as site_settings_count FROM site_settings;
SELECT count(*) as leads_count FROM leads;

-- Simulate a non-existent user (viewer)
SET LOCAL auth.uid = '00000000-0000-0000-0000-000000000002';
SELECT 'Testing as Unknown (Viewer)' as context, public.current_admin_role() as role;
SELECT count(*) as site_settings_count_viewer FROM site_settings;
SELECT count(*) as leads_count_viewer FROM leads;

ROLLBACK;
