INSERT INTO site_settings (
    company_name, company_short_name, company_full_name, company_description, 
    company_subtitle, company_since, company_cnpj, email, phone, whatsapp, 
    address, cep, social_links, default_seo_title, default_seo_description, 
    seo_keywords, title_template
) VALUES (
    'RECOM Test', 'RECOM', 'RECOM Comercio Teste Ltda', 'Uma empresa de teste.', 
    'Subtítulo', '2024', '12.345.678/0001-90', 'teste@recom.com.br', 
    '(19) 3216-1234', '5519999999999', 'Rua Teste', '13000-000', 
    '{"linkedin": "https://linkedin.com"}'::jsonb, 'Título', 'Descrição', 
    'keywords', '%s | RECOM'
);
