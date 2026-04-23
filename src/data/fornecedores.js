/**
 * Dados centralizados de fornecedores.
 * Etapa 2: "catálogo como hub de fornecedores e catálogos oficiais"
 * Etapa 4: "cada card com logo, descrição curta, CTA para página individual"
 */

import logoMitsubishi from '../assets/images/logo_mitsubishi.png';
import logo7leaders from '../assets/images/logo_7leaders.png';
import logoBTFixo from '../assets/images/logo_btfixo.png';
import logoKifix from '../assets/images/logo_kifix.png';

export const fornecedores = [
  {
    id: 'mitsubishi-materials',
    nome: 'Mitsubishi Materials',
    slug: 'mitsubishi-materials',
    logo: logoMitsubishi,
    descricaoCurta: 'Líder global em ferramentas de corte e soluções de usinagem de alta performance.',
    descricao: 'A Mitsubishi Materials é uma das maiores fabricantes de ferramentas de corte do mundo, com tecnologia avançada para torneamento, fresamento e furação. A RECOM é distribuidor autorizado Mitsubishi Materials desde 1998, conectando clientes industriais na região de Campinas e interior de São Paulo às soluções mais avançadas da marca.',
    catalogoUrl: 'https://www.mitsubishicarbide.com/pt/product',
    catalogoLabel: 'Acessar catálogo oficial da Mitsubishi Materials',
    processosRelacionados: ['torneamento', 'fresamento', 'furacao'],
    destaque: true,
    altText: 'Logo da Mitsubishi Materials — fabricante global de ferramentas de corte para usinagem',
  },
  {
    id: '7leaders',
    nome: '7Leaders',
    slug: '7leaders',
    logo: logo7leaders,
    descricaoCurta: 'Soluções complementares em ferramentas e acessórios para usinagem industrial.',
    descricao: 'A 7Leaders oferece uma linha complementar de ferramentas e acessórios voltados à usinagem industrial, ampliando as opções disponíveis para operações de corte e acabamento.',
    catalogoUrl: null,
    catalogoLabel: 'Consultar catálogo 7Leaders',
    processosRelacionados: ['fresamento', 'torneamento'],
    destaque: false,
    altText: 'Logo da 7Leaders — ferramentas e acessórios para usinagem industrial',
  },
  {
    id: 'bt-fixo',
    nome: 'BT Fixo',
    slug: 'bt-fixo',
    logo: logoBTFixo,
    descricaoCurta: 'Sistemas de fixação e porta-ferramentas para operações de usinagem.',
    descricao: 'A BT Fixo é especializada em sistemas de fixação e porta-ferramentas, oferecendo soluções robustas que garantem estabilidade e precisão durante operações de usinagem.',
    catalogoUrl: null,
    catalogoLabel: 'Consultar catálogo BT Fixo',
    processosRelacionados: [],
    destaque: false,
    altText: 'Logo da BT Fixo — sistemas de fixação e porta-ferramentas para usinagem',
  },
  {
    id: 'kifix',
    nome: 'Kifix',
    slug: 'kifix',
    logo: logoKifix,
    descricaoCurta: 'Acessórios e fixação complementar para processos de usinagem.',
    descricao: 'A Kifix fornece acessórios de fixação complementares para processos de usinagem, contribuindo para uma cadeia de ferramentaria mais completa e eficiente.',
    catalogoUrl: null,
    catalogoLabel: 'Consultar catálogo Kifix',
    processosRelacionados: [],
    destaque: false,
    altText: 'Logo da Kifix — acessórios de fixação para usinagem',
  },
];

export const getFornecedorBySlug = (slug) => fornecedores.find(f => f.slug === slug);
