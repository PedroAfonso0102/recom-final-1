-- Seeding Processes
DELETE FROM processes;
INSERT INTO processes (name, slug, short_description, long_description, status, sort_order, image_url)
VALUES 
(
  'Torneamento', 
  'torneamento', 
  'Remoção de material em peças rotativas com máxima precisão e controle de cavaco.', 
  'Soluções completas para operações de revolução. A RECOM oferece suporte técnico para a escolha da melhor combinação de classe e quebra-cavaco para torneamento externo, interno e rosqueamento.',
  'active',
  1,
  '/assets/images/optimized/koudoe.jpg'
),
(
  'Fresamento', 
  'fresamento', 
  'Usinagem de superfícies complexas com ferramentas rotativas de alta velocidade.', 
  'Soluções de fresamento para alta remoção de material e acabamento superior. A RECOM provê as ferramentas ideais para faceamento, esquadrejamento e fresamento de cópia.',
  'active',
  2,
  '/assets/images/optimized/fresamento-bg.jpg'
),
(
  'Furação', 
  'furacao', 
  'Criação de furos precisos com sistemas de alta estabilidade e refrigeração.', 
  'Sistemas de furação de alta performance para furos curtos e profundos. Foco em estabilidade, precisão dimensional e excelente acabamento superficial.',
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
  'Testes Técnicos 7Leaders', 
  'testes-tecnicos-7leaders', 
  '503750e9-9b48-4d98-b2da-de68ce02b654', 
  'Solicite uma amostra para teste em sua produção e comprove o rendimento das novas fresas rotativas.',
  '2024-05-01 00:00:00+00',
  '2026-12-31 23:59:59+00',
  'active',
  'Agendar Teste',
  '/sobre#contato'
);
