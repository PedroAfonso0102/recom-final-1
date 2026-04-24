/**
 * Dados centralizados dos processos de usinagem.
 * Etapa 2: "Soluções / Processos como hub de descoberta por necessidade prática"
 */

export const processos = [
  {
    id: 'torneamento',
    nome: 'Torneamento',
    slug: 'torneamento',
    icone: 'Crosshair',
    descricaoCurta: 'Usinagem de peças giratórias para formar diâmetros, faces, canais e roscas com controle dimensional.',
    descricao:
      'O torneamento é o processo em que a peça gira enquanto a ferramenta remove material para gerar superfícies cilíndricas, cônicas, planas e roscadas. É a rota indicada quando o objetivo é transformar barras, blanks ou peças fundidas em geometrias de revolução com precisão e repetibilidade.',
    fornecedoresRelacionados: ['mitsubishi-materials', '7leaders'],
    keywords: ['torneamento', 'insertos', 'suportes', 'torno CNC', 'usinagem rotativa'],
    metaTitle: 'Torneamento — Ferramentas de Corte para Torno | RECOM Metal Duro',
    metaDescription:
      'Acesse ferramentas para torneamento externo, interno, rosqueamento e canal. Encontre fornecedores, catálogos oficiais e o contato da RECOM.',
    atalhos: [
      {
        titulo: 'Tenho código, desenho ou nome da peça',
        descricao:
          'Envie a referência para validar a aplicação em torneamento e seguir para o caminho correto sem retrabalho.',
        ctaLabel: 'Ir para contato',
        to: '/contato',
      },
      {
        titulo: 'Quero localizar no catálogo oficial',
        descricao:
          'Abra o catálogo principal e encontre a ferramenta pela aplicação, pela família ou pela referência do fabricante.',
        ctaLabel: 'Abrir catálogo',
        to: 'catalogo-principal',
      },
      {
        titulo: 'Preciso comparar alternativas',
        descricao:
          'Veja os fornecedores relacionados a torneamento e compare linhas equivalentes para a mesma operação.',
        ctaLabel: 'Ver fornecedores',
        to: '/fornecedores-catalogos',
      },
      {
        titulo: 'Ainda não defini a rota',
        descricao:
          'Volte à página de soluções e escolha a operação antes de avançar para catálogo, fornecedor ou contato.',
        ctaLabel: 'Ver soluções',
        to: '/solucoes',
      },
    ],
  },
  {
    id: 'fresamento',
    nome: 'Fresamento',
    slug: 'fresamento',
    icone: 'Box',
    descricaoCurta: 'Usinagem de superfícies, canais, cavidades e contornos com ferramenta rotativa de corte.',
    descricao:
      'O fresamento é o processo em que a ferramenta gira enquanto a peça permanece fixa ou avança em eixos controlados. Ele é usado para formar planos, canais, cavidades, rasgos e contornos com flexibilidade de geometria e acabamento.',
    fornecedoresRelacionados: ['mitsubishi-materials', '7leaders'],
    keywords: ['fresamento', 'fresas', 'insertos', 'centro de usinagem', 'CNC'],
    metaTitle: 'Fresamento — Fresas e Insertos para Usinagem | RECOM Metal Duro',
    metaDescription:
      'Confira fresas e insertos para faceamento, topo e perfil. Consulte fornecedores, catálogos oficiais e contato técnico da RECOM.',
    atalhos: [
      {
        titulo: 'Tenho código, desenho ou nome da peça',
        descricao:
          'Envie os dados da peça para validar a aplicação em fresamento e seguir para a solução mais adequada.',
        ctaLabel: 'Ir para contato',
        to: '/contato',
      },
      {
        titulo: 'Quero localizar no catálogo oficial',
        descricao:
          'Abra o catálogo principal e encontre a ferramenta pela aplicação, pela família ou pela necessidade de corte.',
        ctaLabel: 'Abrir catálogo',
        to: 'catalogo-principal',
      },
      {
        titulo: 'Preciso comparar alternativas',
        descricao:
          'Veja os fornecedores relacionados a fresamento e compare opções para faceamento, topo, perfil e altas taxas de avanço.',
        ctaLabel: 'Ver fornecedores',
        to: '/fornecedores-catalogos',
      },
      {
        titulo: 'Ainda não defini a rota',
        descricao:
          'Volte à página de soluções e escolha a operação antes de avançar para catálogo, fornecedor ou contato.',
        ctaLabel: 'Ver soluções',
        to: '/solucoes',
      },
    ],
  },
  {
    id: 'furacao',
    nome: 'Furação',
    slug: 'furacao',
    icone: 'Circle',
    descricaoCurta: 'Abertura e aprofundamento de furos com brocas e sistemas projetados para precisão e produtividade.',
    descricao:
      'A furação é o processo usado para abrir, aprofundar, corrigir ou expandir furos com brocas e sistemas específicos. É a etapa que define posição, diâmetro e repetibilidade em grande parte das aplicações mecânicas e de montagem.',
    fornecedoresRelacionados: ['mitsubishi-materials'],
    keywords: ['furação', 'brocas', 'furação profunda', 'broca CNC', 'ferramentas de corte'],
    metaTitle: 'Furação — Brocas e Sistemas de Furação | RECOM Metal Duro',
    metaDescription:
      'Encontre brocas inteiriças e com insertos para furação de alta performance. Consulte catálogo oficial, fornecedor e contato da RECOM.',
    atalhos: [
      {
        titulo: 'Tenho código, desenho ou nome da peça',
        descricao:
          'Envie a referência para validar a furação, a profundidade e a aplicação correta antes de seguir.',
        ctaLabel: 'Ir para contato',
        to: '/contato',
      },
      {
        titulo: 'Quero localizar no catálogo oficial',
        descricao:
          'Abra o catálogo principal e encontre a broca ou o sistema pela aplicação, pelo diâmetro ou pela família.',
        ctaLabel: 'Abrir catálogo',
        to: 'catalogo-principal',
      },
      {
        titulo: 'Preciso comparar alternativas',
        descricao:
          'Veja o fornecedor relacionado à furação e compare soluções para produtividade, profundidade e acabamento.',
        ctaLabel: 'Ver fornecedores',
        to: '/fornecedores-catalogos',
      },
      {
        titulo: 'Ainda não defini a rota',
        descricao:
          'Volte à página de soluções e escolha a operação antes de avançar para catálogo, fornecedor ou contato.',
        ctaLabel: 'Ver soluções',
        to: '/solucoes',
      },
    ],
  },
];

export const getProcessoBySlug = (slug) => processos.find((p) => p.slug === slug);
