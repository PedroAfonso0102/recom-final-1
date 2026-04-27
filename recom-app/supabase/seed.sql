-- Clear existing suppliers to avoid duplicates (optional, but good for a clean seed)
DELETE FROM suppliers;

-- Insert Suppliers with Official 2026 Data
INSERT INTO suppliers (name, slug, logo_url, catalog_url, e_catalog_url, short_description, long_description, status, sort_order)
VALUES 
(
  'Mitsubishi Materials', 
  'mitsubishi', 
  '/assets/images/mitsubishi-logo.png', 
  'https://www.mmc-carbide.com/br/download/catalog-1', 
  'https://www.mitsubishicarbide.net/mht/pt/', 
  'Líder em ferramentas de corte e metal duro para usinagem de precisão.', 
  'A Mitsubishi Materials é referência mundial em inovação de materiais e revestimentos. Sua linha abrange torneamento, fresamento e furação com tecnologia para produtividade industrial e confiabilidade.', 
  'active', 
  1
),
(
  '7Leaders', 
  '7leaders', 
  '/assets/images/logo-7leaders.svg', 
  'https://www.7leaders.com/e-catalog', 
  'https://www.7leaders.com/e-catalog', 
  'Fresas de metal duro 7Leaders e ferramentas rotativas de alto rendimento.', 
  'A 7Leaders foca em ferramentas rotativas, com destaque para fresas de topo e brocas integrais. Seus produtos atendem operações em moldes, matrizes e componentes que exigem qualidade de acabamento.', 
  'active', 
  2
),
(
  'BT Fixo', 
  'bt-fixo', 
  '/assets/images/logo_btfixo.png', 
  'https://www.btfixo.com.br/catalogos', 
  NULL, 
  'Acessórios para máquinas-ferramenta, mandris e fixação de precisão.', 
  'A BT Fixo fornece acessórios para máquinas CNC, incluindo cones, pinças, morsas e sistemas de fixação que garantem estabilidade para processos de usinagem.', 
  'active', 
  3
),
(
  'Kifix', 
  'kifix', 
  '/assets/images/logo-kifix.png', 
  'https://www.kifix.com.br/catalogo/1_pt_Catalogo_2025_baixa.pdf?v=2025-03-05&utm_source=chatgpt.com', 
  NULL, 
  'Grampos rápidos e dispositivos de fixação manual e pneumática.', 
  'A Kifix fornece dispositivos de fixação rápida (toggle clamps). Seus produtos são usados em montagens, soldagens e processos de usinagem leve onde a agilidade na fixação é necessária.', 
  'active', 
  4
);
-- Seeding Processes
DELETE FROM processes;
INSERT INTO processes (name, slug, short_description, long_description, status, sort_order, image_url)
VALUES 
(
  'Torneamento', 
  'torneamento', 
  'Remoção de material em peças rotativas com controle de cavaco.', 
  'Linha completa para operações de revolução. A RECOM oferece apoio na escolha da combinação de classe e quebra-cavaco para torneamento externo, interno e rosqueamento.',
  'active',
  1,
  '/assets/images/optimized/koudoe.jpg'
),
(
  'Fresamento', 
  'fresamento', 
  'Usinagem de superfícies com ferramentas rotativas.', 
  'Ferramentas de fresamento para remoção de material e acabamento. A RECOM provê as ferramentas para faceamento, esquadrejamento e fresamento de cópia.',
  'active',
  2,
  '/assets/images/optimized/fresamento-bg.jpg'
),
(
  'Furação', 
  'furacao', 
  'Furação com sistemas de estabilidade e refrigeração.', 
  'Sistemas de furação para furos curtos e profundos. Foco em estabilidade e precisão dimensional em diversos materiais.',
  'active',
  3,
  '/assets/images/optimized/furacao-bg.jpg'
);

-- Seeding Promotions
DELETE FROM promotions;
INSERT INTO promotions (title, slug, supplier_id, description, starts_at, ends_at, status, cta_label, cta_url)
VALUES 
(
  'Kit Fresamento Mitsubishi', 
  'kit-fresamento-mitsubishi', 
  '0eb92b70-1998-4568-a983-c8d83a70e374', 
  'Na compra de 10 insertos da linha MP, ganhe o corpo da fresa compatível.',
  '2024-01-01 00:00:00+00',
  '2026-12-31 23:59:59+00',
  'active',
  'Solicitar Kit',
  '/sobre#contato'
),
(
  'Lote Especial Metal Duro', 
  'lote-especial-metal-duro', 
  '0eb92b70-1998-4568-a983-c8d83a70e374', 
  'Preços diferenciados para pedidos acima de 50 unidades de insertos para aço inox.',
  '2024-05-01 00:00:00+00',
  '2026-12-31 23:59:59+00',
  'active',
  'Ver Tabela',
  '/sobre#contato'
),
(
  'Testes em sua produção 7Leaders', 
  'testes-pratica-7leaders', 
  '503750e9-9b48-4d98-b2da-de68ce02b654', 
  'Peça uma amostra para teste em sua produção e comprove o rendimento das fresas rotativas.',
  '2024-05-01 00:00:00+00',
  '2026-12-31 23:59:59+00',
  'active',
  'Agendar Teste',
  '/sobre#contato'
);
