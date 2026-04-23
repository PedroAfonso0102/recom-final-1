/**
 * Dados centralizados de fornecedores.
 * Etapa 2: "catálogo como hub de fornecedores e catálogos oficiais"
 * Etapa 4: "cada card com logo, descrição curta, CTA para página individual"
 */

const assetBase = `${import.meta.env.BASE_URL}assets/fornecedores/`;

export const fornecedores = [
  {
    id: 'mitsubishi-materials',
    nome: 'Mitsubishi Materials',
    slug: 'mitsubishi-materials',
    logo: `${assetBase}mitsubishi-materials/logo.png`,
    descricaoCurta: 'Líder global em ferramentas de corte e soluções de usinagem de alta performance.',
    descricao: 'A Mitsubishi Materials é uma das maiores fabricantes de ferramentas de corte do mundo, com tecnologia avançada para torneamento, fresamento e furação. A RECOM é distribuidor autorizado Mitsubishi Materials desde 1998, conectando clientes industriais na região de Campinas e interior de São Paulo às soluções mais avançadas da marca.',
    catalogoUrl: 'https://www.mmc-carbide.com/br/download/catalog-1',
    catalogoLabel: 'Catálogo geral oficial da Mitsubishi Materials',
    catalogos: [
      {
        label: 'Catálogo geral oficial',
        url: 'https://www.mmc-carbide.com/br/download/catalog-1',
      },
      {
        label: 'Catálogo eletrônico / Web Catalog',
        url: 'https://www.mmc-carbide.com/en_jp/webcatalog',
      },
      {
        label: 'Portal da Mitsubishi Materials do Brasil',
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
    logo: `${assetBase}7leaders/logo.png`,
    descricaoCurta: 'Soluções complementares em ferramentas e acessórios para usinagem industrial.',
    descricao: 'A 7Leaders oferece uma linha complementar de ferramentas e acessórios voltados à usinagem industrial, ampliando as opções disponíveis para operações de corte e acabamento.',
    catalogoUrl: 'https://www.7leaders.com/e-catalog',
    catalogoLabel: 'E-Catalog oficial da 7Leaders',
    catalogos: [
      {
        label: 'E-Catalog oficial',
        url: 'https://www.7leaders.com/e-catalog',
      },
      {
        label: 'Página geral de produtos',
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
    logo: `${assetBase}bt-fixo/logo.png`,
    descricaoCurta: 'Sistemas de fixação e porta-ferramentas para operações de usinagem.',
    descricao: 'A BT Fixo é especializada em sistemas de fixação e porta-ferramentas, oferecendo soluções robustas que garantem estabilidade e precisão durante operações de usinagem.',
    catalogoUrl: 'https://www.btfixo.com.br/catalogos',
    catalogoLabel: 'Central oficial de catálogos BT Fixo',
    catalogos: [
      {
        label: 'Central oficial de catálogos',
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
    logo: `${assetBase}kifix/logo.png`,
    descricaoCurta: 'Acessórios e fixação complementar para processos de usinagem.',
    descricao: 'A Kifix fornece acessórios de fixação complementares para processos de usinagem, contribuindo para uma cadeia de ferramentaria mais completa e eficiente.',
    catalogoUrl: 'https://www.kifix.com.br/catalogo/1_pt_Catalogo_2025_baixa.pdf?v=2025-03-05',
    catalogoLabel: 'Catálogo Kifix 2025 (PDF)',
    catalogos: [
      {
        label: 'Catálogo Kifix 2025 (PDF)',
        url: 'https://www.kifix.com.br/catalogo/1_pt_Catalogo_2025_baixa.pdf?v=2025-03-05',
      },
      {
        label: 'Página de downloads',
        url: 'https://www.kifix.com.br/downloads/',
      },
    ],
    processosRelacionados: [],
    destaque: false,
    altText: 'Logo da Kifix — acessórios de fixação para usinagem',
  },
];

export const getFornecedorBySlug = (slug) => fornecedores.find(f => f.slug === slug);

export const getCatalogosDoFornecedor = (fornecedor) => {
  if (fornecedor.catalogos?.length) {
    return fornecedor.catalogos;
  }

  if (fornecedor.catalogoUrl) {
    return [{
      label: fornecedor.catalogoLabel || 'Catálogo oficial',
      url: fornecedor.catalogoUrl,
    }];
  }

  return [];
};
