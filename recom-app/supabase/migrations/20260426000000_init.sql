-- Enum Types
CREATE TYPE status_type AS ENUM ('draft', 'active', 'archived');
CREATE TYPE lead_status_type AS ENUM ('new', 'contacted', 'qualified', 'lost');

-- Processes Table
CREATE TABLE processes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  image_url TEXT,
  short_description TEXT NOT NULL,
  long_description TEXT NOT NULL,
  status status_type NOT NULL DEFAULT 'draft',
  sort_order INTEGER NOT NULL DEFAULT 0,
  seo_title TEXT,
  seo_description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Suppliers Table
CREATE TABLE suppliers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  logo_url TEXT,
  catalog_url TEXT,
  short_description TEXT NOT NULL,
  long_description TEXT NOT NULL,
  related_processes UUID[] DEFAULT '{}',
  status status_type NOT NULL DEFAULT 'draft',
  sort_order INTEGER NOT NULL DEFAULT 0,
  seo_title TEXT,
  seo_description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Promotions Table
CREATE TABLE promotions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  supplier_id UUID REFERENCES suppliers(id) ON DELETE SET NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  starts_at TIMESTAMPTZ NOT NULL,
  ends_at TIMESTAMPTZ NOT NULL,
  status status_type NOT NULL DEFAULT 'draft',
  cta_label TEXT,
  cta_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Leads Table
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  status lead_status_type NOT NULL DEFAULT 'new',
  name TEXT NOT NULL,
  company TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  supplier_interest UUID REFERENCES suppliers(id) ON DELETE SET NULL,
  process_interest UUID REFERENCES processes(id) ON DELETE SET NULL,
  item_code TEXT,
  message TEXT,
  source_page TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create a junction table for suppliers <-> processes just in case we need referential integrity later
-- For now, `related_processes UUID[]` on suppliers handles the zod schema array.

-- Set up Row Level Security (RLS)
ALTER TABLE processes ENABLE ROW LEVEL SECURITY;
ALTER TABLE suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE promotions ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Public Read Access Policies (Only 'active' records for public, but we allow all reads if needed, 
-- or we can restrict it to only 'active' status. For now, let's allow public read to all for simplicity in SSR, 
-- or better: only authenticated can read all, anon can read active).

CREATE POLICY "Allow public read-only access for active processes" ON processes
  FOR SELECT USING (status = 'active');

CREATE POLICY "Allow public read-only access for active suppliers" ON suppliers
  FOR SELECT USING (status = 'active');

CREATE POLICY "Allow public read-only access for active promotions" ON promotions
  FOR SELECT USING (status = 'active');

-- Leads: Anyone can insert (contact form), only authenticated can read/update/delete
CREATE POLICY "Allow anon insert leads" ON leads
  FOR INSERT WITH CHECK (true);

-- Admin full access policies (Requires authentication)
-- Note: 'authenticated' role comes from Supabase Auth
CREATE POLICY "Allow admin full access processes" ON processes
  TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow admin full access suppliers" ON suppliers
  TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow admin full access promotions" ON promotions
  TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow admin full access leads" ON leads
  TO authenticated USING (true) WITH CHECK (true);

-- Triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_processes_updated_at
BEFORE UPDATE ON processes
FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_suppliers_updated_at
BEFORE UPDATE ON suppliers
FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_promotions_updated_at
BEFORE UPDATE ON promotions
FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_leads_updated_at
BEFORE UPDATE ON leads
FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
