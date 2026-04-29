-- Expand site_settings schema to include all necessary fields for RECOM CMS
ALTER TABLE public.site_settings 
ADD COLUMN IF NOT EXISTS company_short_name text,
ADD COLUMN IF NOT EXISTS company_full_name text,
ADD COLUMN IF NOT EXISTS company_since text,
ADD COLUMN IF NOT EXISTS company_cnpj text,
ADD COLUMN IF NOT EXISTS company_subtitle text,
ADD COLUMN IF NOT EXISTS company_description text,
ADD COLUMN IF NOT EXISTS cep text,
ADD COLUMN IF NOT EXISTS seo_keywords text,
ADD COLUMN IF NOT EXISTS title_template text;

-- Add comment for clarity
COMMENT ON TABLE public.site_settings IS 'Global site settings and institutional information for RECOM CMS.';
