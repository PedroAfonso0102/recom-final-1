/**
 * Dados centralizados de fornecedores.
 * Etapa 2: "catálogo como hub de fornecedores e catálogos oficiais"
 * Etapa 4: "cada card com logo, descrição curta, CTA para página individual"
 */

import mitsubishiLogo from '../assets/images/Mitsubishi.png';
import sevenLeadersLogo from '../assets/images/logo-7leaders.svg';
import btFixoLogo from '../assets/images/logo_btfixo.png';
import kifixLogo from '../assets/images/optimized/logo-kifix.png';

export const catalogoCategorias = {
  tecnico: 'Catálogo técnico',
  online: 'Catálogo online',
  downloads: 'Downloads oficiais',
  institucional: 'Portal institucional',
};

export const fornecedores = [
  {
    id: 'mitsubishi-materials',
    nome: 'Mitsubishi Materials',
    slug: 'mitsubishi-materials',
    logo: mitsubishiLogo,
    logoWidth: 542,
    logoHeight: 152,
    descricaoCurta: 'Ferramentas de corte para torneamento, fresamento e furação em aplicações industriais.',
    descricao:
      'A Mitsubishi Materials desenvolve ferramentas para torneamento, fresamento e furação com foco em estabilidade de processo, repetibilidade e produtividade em aplicações industriais.',
    catalogoUrl: 'https://www.mmc-carbide.com/br/download/catalog-1',
    catalogoLabel: 'Catálogo geral oficial da Mitsubishi Materials',
    linkInstitucional: 'https://www.mmc-carbide.com/br',
    status: 'published',
    observacoes: 'Fornecedor destaque e com mais de um catálogo oficial disponível.',
    catalogos: [
      {
        tipo: 'tecnico',
        label: 'Catálogo geral Mitsubishi Materials (PDF)',
        url: 'https://www.mmc-carbide.com/br/download/catalog-1',
      },
      {
        tipo: 'online',
        label: 'Consulta online Mitsubishi Materials',
        url: 'https://www.mmc-carbide.com/en_jp/webcatalog',
      },
      {
        tipo: 'institucional',
        label: 'Portal Mitsubishi Materials Brasil',
        url: 'https://www.mmc-carbide.com/br',
      },
    ],
    processosRelacionados: ['torneamento', 'fresamento', 'furacao'],
    destaque: true,
    altText: 'Logo da Mitsubishi Materials — fabricante global de ferramentas de corte para usinagem',
  },
  {
    id: '7leaders',
    nome: '7Leaders',
    slug: '7leaders',
    logo: sevenLeadersLogo,
    logoWidth: 152,
    logoHeight: 54,
    descricaoCurta: 'Ferramentas em metal duro para fresamento, furação, alargamento e aplicações complementares.',
    descricao:
      'A 7Leaders reúne ferramentas em metal duro para apoio ao corte, ao acabamento e às operações complementares de usinagem industrial.',
    catalogoUrl: 'https://www.7leaders.com/e-catalog',
    catalogoLabel: 'Catálogo digital oficial da 7Leaders',
    linkInstitucional: 'https://www.7leaders.com',
    status: 'published',
    observacoes: 'Possui catálogo digital e página de produtos complementar.',
    catalogos: [
      {
        tipo: 'online',
        label: 'Catálogo digital 7Leaders',
        url: 'https://www.7leaders.com/e-catalog',
      },
      {
        tipo: 'institucional',
        label: 'Página geral de produtos 7Leaders',
        url: 'https://www.7leaders.com/products',
      },
    ],
    processosRelacionados: ['fresamento', 'torneamento'],
    destaque: false,
    altText: 'Logo da 7Leaders — ferramentas e acessórios para usinagem industrial',
  },
  {
    id: 'bt-fixo',
    nome: 'BT Fixo',
    slug: 'bt-fixo',
    logo: btFixoLogo,
    logoWidth: 146,
    logoHeight: 71,
    descricaoCurta: 'Porta-ferramentas, sistemas de fixação e acessórios para máquinas CNC.',
    descricao:
      'A BT Fixo atua com porta-ferramentas, sistemas de fixação e acessórios voltados à estabilidade de setup e ao desempenho da operação.',
    catalogoUrl: 'https://www.btfixo.com.br/catalogos',
    catalogoLabel: 'Central oficial de catálogos BT Fixo',
    linkInstitucional: 'https://www.btfixo.com.br',
    status: 'published',
    observacoes: 'Catálogo principal consolidado em uma central de materiais oficiais.',
    catalogos: [
      {
        tipo: 'downloads',
        label: 'Central oficial de catálogos BT Fixo',
        url: 'https://www.btfixo.com.br/catalogos',
      },
    ],
    processosRelacionados: [],
    destaque: false,
    altText: 'Logo da BT Fixo — sistemas de fixação e porta-ferramentas para usinagem',
  },
  {
    id: 'kifix',
    nome: 'Kifix',
    slug: 'kifix',
    logo: kifixLogo,
    logoWidth: 500,
    logoHeight: 155,
    descricaoCurta: 'Grampos e acessórios de fixação para apoio à montagem e à usinagem.',
    descricao:
      'A Kifix fornece grampos e acessórios de fixação para apoio à montagem, ao setup e à rotina industrial de usinagem.',
    catalogoUrl: 'https://www.kifix.com.br/catalogo/1_pt_Catalogo_2025_baixa.pdf?v=2025-03-05',
    catalogoLabel: 'Catálogo Kifix 2025 (PDF)',
    linkInstitucional: 'https://www.kifix.com.br',
    status: 'published',
    observacoes: 'O catálogo oficial é um PDF versionado; o parâmetro de cache sugere atualização temporária de publicação.',
    catalogos: [
      {
        tipo: 'tecnico',
        label: 'Catálogo Kifix 2025 (PDF)',
        url: 'https://www.kifix.com.br/catalogo/1_pt_Catalogo_2025_baixa.pdf?v=2025-03-05',
      },
      {
        tipo: 'downloads',
        label: 'Página de downloads Kifix',
        url: 'https://www.kifix.com.br/downloads/',
      },
    ],
    processosRelacionados: [],
    destaque: false,
    altText: 'Logo da Kifix — acessórios de fixação para usinagem',
  },
];

export const getFornecedorBySlug = (slug) => fornecedores.find((f) => f.slug === slug);

export const getCatalogosDoFornecedor = (fornecedor) => {
  if (fornecedor.catalogos?.length) {
    return fornecedor.catalogos;
  }

  if (fornecedor.catalogoUrl) {
    return [
      {
        label: fornecedor.catalogoLabel || 'Catálogo oficial',
        tipo: 'tecnico',
        url: fornecedor.catalogoUrl,
      },
    ];
  }

  return [];
};

export const getFornecedorCatalogoPrincipal = (fornecedor) => getCatalogosDoFornecedor(fornecedor)[0] || null;

export const getCatalogosPorCategoria = (fornecedor) => {
  const grupos = getCatalogosDoFornecedor(fornecedor).reduce((acc, catalogo) => {
    const tipo = catalogo.tipo || 'tecnico';

    if (!acc[tipo]) {
      acc[tipo] = [];
    }

    acc[tipo].push(catalogo);
    return acc;
  }, {});

  return Object.entries(grupos).map(([tipo, items]) => ({
    tipo,
    titulo: catalogoCategorias[tipo] || 'Catálogo oficial',
    items,
  }));
};

export const hasCatalogoValido = (fornecedor) => {
  const catalogoPrincipal = getFornecedorCatalogoPrincipal(fornecedor);
  return Boolean(catalogoPrincipal?.url && catalogoPrincipal.url !== '#' && !catalogoPrincipal.url.startsWith('javascript:'));
};
