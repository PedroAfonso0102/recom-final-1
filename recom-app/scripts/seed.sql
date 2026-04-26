-- Script de seed dos dados reais da RECOM
-- Executar via: psql postgresql://postgres:postgres@127.0.0.1:54322/postgres -f scripts/seed.sql

-- Limpa dados existentes
DELETE FROM suppliers;
DELETE FROM processes;

-- ─── FORNECEDORES ─────────────────────────────────────────────────

INSERT INTO suppliers (name, slug, logo_url, catalog_url, short_description, long_description, status, sort_order, seo_title, seo_description) VALUES
(
  'Mitsubishi Materials',
  'mitsubishi-materials',
  '/assets/images/Mitsubishi.png',
  'https://www.mmc-hardmetal.com/',
  'Excelência japonesa em metal duro para torneamento, fresamento e furação de alta performance.',
  'A Mitsubishi Materials Corporation é uma das maiores fabricantes mundiais de ferramentas de corte em metal duro. Com mais de 100 anos de experiência, a empresa desenvolve tecnologias avançadas de cobertura (como o revestimento Miracle) e geometrias de quebra-cavaco para maximizar a vida útil e a performance em usinagem de aços, inox, ferro fundido e superligas.

A RECOM atende clientes que buscam produtos da Mitsubishi Materials para aplicações em torneamento, fresamento e furação. Nossa equipe comercial orienta na escolha do inserto, classe e quebra-cavaco ideais para cada material e condição de corte.',
  'active',
  1,
  'Mitsubishi Materials | Ferramentas de Corte em Metal Duro - RECOM',
  'Distribuidor oficial Mitsubishi Materials em Campinas. Insertos, fresas e brocas com suporte técnico especializado.'
),
(
  '7Leaders',
  '7leaders',
  '/assets/images/logo-7leaders.svg',
  'https://7leaders.com.br/',
  'Especialista em fresas de metal duro de alto rendimento e ferramentas rotativas precisas.',
  'A 7Leaders é uma empresa brasileira focada no desenvolvimento e fabricação de ferramentas rotativas de metal duro de alta performance. Suas fresas inteiriças se destacam pelo custo-benefício competitivo e pela qualidade dos revestimentos aplicados.

A RECOM distribui a linha completa 7Leaders, com foco em fresas de topo, fresas de canto reto, fresas de alto avanço e ferramentas especiais. Suporte técnico local para seleção de parâmetros de corte e geometrias.',
  'active',
  2,
  '7Leaders | Fresas de Metal Duro - RECOM Campinas',
  'Distribuidor 7Leaders em Campinas. Fresas inteiriças de metal duro com suporte técnico e pronta entrega.'
),
(
  'BT-Fixo',
  'bt-fixo',
  '/assets/images/logo_btfixo.png',
  'https://www.btfixo.com.br/',
  'Soluções em acessórios de máquinas-ferramenta, mandris e sistemas de fixação de precisão.',
  'A BT-Fixo é referência nacional em acessórios para máquinas-ferramenta CNC. Sua linha inclui mandris hidráulicos, portaferramentas térmicos, buchas de precisão, divisores e sistemas de fixação para tornos e centros de usinagem.

Com a BT-Fixo, a RECOM oferece soluções completas de setup e fixação, reduzindo o tempo de troca de ferramentas e aumentando a rigidez do sistema porta-ferramenta, o que impacta diretamente na qualidade do acabamento superficial.',
  'active',
  3,
  'BT-Fixo | Fixação e Acessórios para CNC - RECOM',
  'Distribuidor BT-Fixo em Campinas. Mandris, portaferramentas e sistemas de fixação para tornos e centros de usinagem.'
),
(
  'Kifix',
  'kifix',
  NULL,
  NULL,
  'Ferramentas de fixação e sistemas de aperto de alta confiabilidade para usinagem industrial.',
  'A Kifix desenvolve sistemas de fixação especializados para uso em ambientes industriais de alta exigência. Seus produtos incluem prendedores, braçadeiras e sistemas de aperto rápido que garantem a repetibilidade e a segurança no processo produtivo.

A RECOM oferece a linha Kifix como complemento às soluções de fixação BT-Fixo, cobrindo necessidades específicas de gabaritos, fixtures e dispositivos de fixação customizados.',
  'active',
  4,
  'Kifix | Sistemas de Fixação Industrial - RECOM',
  'Distribuidor Kifix em Campinas. Sistemas de fixação e aperto rápido para usinagem industrial.'
);

-- ─── PROCESSOS ────────────────────────────────────────────────────

INSERT INTO processes (name, slug, image_url, short_description, long_description, status, sort_order, seo_title, seo_description) VALUES
(
  'Torneamento',
  'torneamento',
  '/assets/images/optimized/koudoe.jpg',
  'Remoção de material em peças rotativas com máxima precisão e controle de cavaco.',
  'O torneamento é um dos processos de usinagem mais fundamentais da indústria metalomecânica. Nele, a peça gira enquanto a ferramenta de corte avança, removendo material de forma controlada para gerar geometrias de revolução.

A RECOM oferece suporte técnico completo para otimizar operações de torneamento externo, interno, radial (facear), rosqueamento e mandrilamento. Trabalhamos com as melhores classes de insertos e quebra-cavacos para cada material e condição de corte.

Por que investir em ferramentas de qualidade para torneamento? Insertos de alta performance reduzem o tempo de ciclo, aumentam a vida útil da ferramenta e garantem melhor controle dimensional e de acabamento superficial. A escolha correta da classe e quebra-cavaco é determinante para a estabilidade do processo.',
  'active',
  1,
  'Torneamento | Ferramentas de Corte para Tornos CNC - RECOM',
  'Soluções completas para torneamento: insertos, suportes e quebra-cavacos Mitsubishi Materials. Suporte técnico RECOM em Campinas.'
),
(
  'Fresamento',
  'fresamento',
  '/assets/images/optimized/fresamento-bg.jpg',
  'Usinagem de superfícies complexas com ferramentas rotativas de alta velocidade.',
  'O fresamento é o processo de usinagem mais versátil, utilizado para gerar superfícies planas, contornadas, perfis complexos e detalhes de moldes e matrizes. Diferente do torneamento, no fresamento a ferramenta rotaciona enquanto a peça avança.

A RECOM atende demandas de fresamento de faceamento, esquadrejamento, cópia 3D, fresagem de alto avanço (High Feed Milling) e fresagem inteiriça. Contamos com a linha completa Mitsubishi Materials e 7Leaders para cobrir desde operações de desbaste até acabamento fino.

Fresagem de Alto Avanço (High Feed Milling): Uma das principais evoluções na produtividade, o HFM utiliza pequenas profundidades de corte axial (ap) com altíssimos avanços por dente (fz), resultando em forças de corte direcionadas axialmente ao eixo da máquina, reduzindo vibrações e maximizando a taxa de remoção de material.',
  'active',
  2,
  'Fresamento | Fresas e Cabeçotes de Alta Performance - RECOM',
  'Ferramentas para fresamento CNC: cabeçotes intercambiáveis, fresas inteiriças e insertos Mitsubishi e 7Leaders. RECOM Campinas.'
),
(
  'Furação',
  'furacao',
  '/assets/images/optimized/furacao-bg.jpg',
  'Criação de furos precisos com sistemas de alta estabilidade e refrigeração.',
  'A furação é um processo crítico em qualquer célula de usinagem. A precisão dimensional, a retilineidade e o acabamento interno do furo dependem diretamente da qualidade da ferramenta e dos parâmetros de corte utilizados.

A RECOM oferece soluções para furação com metal duro inteiriço (para diâmetros menores com alta precisão), brocas de pontas intercambiáveis (para versatilidade em lotes maiores) e brocas de insertos (para grandes diâmetros e máxima remoção de material).

Refrigeração interna: quando é necessária? Para furos com profundidade acima de 3×D (três vezes o diâmetro), a refrigeração interna passa a ser essencial. Ela garante a evacuação eficiente dos cavacos, controla a temperatura na aresta de corte e aumenta significativamente a vida útil da ferramenta.',
  'active',
  3,
  'Furação | Brocas de Metal Duro e Sistemas de Alta Performance - RECOM',
  'Soluções de furação: brocas inteiriças, pontas intercambiáveis e insertos Mitsubishi Materials. RECOM Campinas.'
);

SELECT 'Seed concluído!' AS status;
SELECT name, slug, status FROM suppliers ORDER BY sort_order;
SELECT name, slug, status FROM processes ORDER BY sort_order;
