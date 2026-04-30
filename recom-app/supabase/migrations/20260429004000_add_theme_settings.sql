ALTER TABLE public.site_settings
ADD COLUMN IF NOT EXISTS theme_primary_color text,
ADD COLUMN IF NOT EXISTS theme_secondary_color text,
ADD COLUMN IF NOT EXISTS theme_background_color text,
ADD COLUMN IF NOT EXISTS theme_text_color text,
ADD COLUMN IF NOT EXISTS theme_button_color text,
ADD COLUMN IF NOT EXISTS theme_button_hover_color text,
ADD COLUMN IF NOT EXISTS theme_heading_font text,
ADD COLUMN IF NOT EXISTS theme_body_font text,
ADD COLUMN IF NOT EXISTS theme_font_weight text,
ADD COLUMN IF NOT EXISTS theme_heading_size text,
ADD COLUMN IF NOT EXISTS theme_body_size text;

ALTER TABLE public.pages
ADD COLUMN IF NOT EXISTS theme_override jsonb;
