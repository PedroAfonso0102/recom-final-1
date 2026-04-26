-- Adiciona suporte a múltiplos catálogos e configurações de exibição para fornecedores
ALTER TABLE suppliers ADD COLUMN catalogs JSONB DEFAULT '[]'::jsonb;
ALTER TABLE suppliers ADD COLUMN settings JSONB DEFAULT '{"show_menu": true, "show_promotions": true}'::jsonb;
