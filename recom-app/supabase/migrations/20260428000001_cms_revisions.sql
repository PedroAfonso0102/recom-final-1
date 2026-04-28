-- 20260428000001_cms_revisions.sql
-- Creating a table for granular revision history (autosaves and drafts)

CREATE TABLE IF NOT EXISTS cms_revisions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id uuid NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
  snapshot jsonb NOT NULL,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  is_autosave boolean DEFAULT false,
  label text -- optional label like 'Manual Save', 'Auto-recovery', etc.
);

-- Index for fast lookup of a page's history
CREATE INDEX IF NOT EXISTS cms_revisions_page_id_idx ON cms_revisions (page_id, created_at DESC);

-- Enable RLS
ALTER TABLE cms_revisions ENABLE ROW LEVEL SECURITY;

-- Hardened RLS (using is_admin() from previous migration)
CREATE POLICY "Admins can manage revisions" ON cms_revisions
  FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
