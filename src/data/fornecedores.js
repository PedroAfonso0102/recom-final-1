/**
 * Dados centralizados de fornecedores.
 * Etapa 2: "catálogo como hub de fornecedores e catálogos oficiais"
 * Etapa 4: "cada card com logo, descrição curta, CTA para página individual"
 */

import mitsubishiLogo from '../assets/images/Mitsubishi.png';
import sevenLeadersLogo from '../assets/images/logo-7leaders.svg';
import kifixLogo from '../assets/images/logo-kifix.png';

const assetBase = `${import.meta.env.BASE_URL}assets/fornecedores/`;

export const fornecedores = [
  {
    id: 'mitsubishi-materials',
    nome: 'Mitsubishi Materials',
    slug: 'mitsubishi-materials',
    logo: mitsubishiLogo,
    descricaoCurta: 'Referência global em ferramentas de corte para usinagem de alta precisão.',
    descricao:
      'A Mitsubishi Materials desenvolve soluções para torneamento, fresamento e furação com foco em estabilidade, repetibilidade e vida útil consistente. A linha atende operações industriais que exigem controle dimensional, acabamento uniforme e produtividade previsível.',
    catalogoUrl: 'https://www.mmc-carbide.com/br/download/catalog-1',
    catalogoLabel: 'Catálogo geral oficial da Mitsubishi Materials',
    catalogos: [
      {
        label: 'Catálogo geral oficial',
        url: 'https://www.mmc-carbide.com/br/download/catalog-1',
      },
      {
        label: 'Catálogo digital / consulta online',
        url: 'https://www.mmc-carbide.com/en_jp/webcatalog',
      },
      {
        label: 'Página da Mitsubishi Materials do Brasil',
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
    descricaoCurta: 'Linha complementar de ferramentas e acessórios para usinagem industrial.',
    descricao:
      'A 7Leaders reúne soluções complementares para usinagem industrial, ampliando as opções de corte, apoio e acabamento em rotas de produção que pedem flexibilidade e variação de aplicação.',
    catalogoUrl: 'https://www.7leaders.com/e-catalog',
    catalogoLabel: 'Catálogo digital oficial da 7Leaders',
    catalogos: [
      {
        label: 'Catálogo digital oficial',
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
    descricao:
      'A BT Fixo atua com sistemas de fixação e porta-ferramentas voltados à estabilidade da operação, contribuindo para precisão, segurança de setup e melhor desempenho durante a usinagem.',
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
    logo: kifixLogo,
    descricaoCurta: 'Acessórios de fixação complementar para processos de usinagem.',
    descricao:
      'A Kifix fornece acessórios de fixação que apoiam a rotina de usinagem com soluções complementares para setup, apoio e organização da ferramenta no chão de fábrica.',
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

export const getFornecedorBySlug = (slug) => fornecedores.find((f) => f.slug === slug);

export const getCatalogosDoFornecedor = (fornecedor) => {
  if (fornecedor.catalogos?.length) {
    return fornecedor.catalogos;
  }

  if (fornecedor.catalogoUrl) {
    return [
      {
        label: fornecedor.catalogoLabel || 'Catálogo oficial',
        url: fornecedor.catalogoUrl,
      },
    ];
  }

  return [];
};
