export type PageContract = {
  slug: string;
  title: string;
  seoTitleFallback: string;
  seoDescriptionFallback: string;
  ctas: Array<{ label: string; href: string }>;
};

export const publicPageContracts: PageContract[] = [
  {
    slug: "/",
    title: "Home",
    seoTitleFallback: "RECOM | Distribuidor B2B desde 1990",
    seoDescriptionFallback: "Hub institucional e comercial com fornecedores, solucoes, promocoes e contato.",
    ctas: [
      { label: "Ver fornecedores", href: "/fornecedores-catalogos" },
      { label: "Ver solucoes", href: "/solucoes" },
      { label: "Falar com a RECOM", href: "/contato" },
    ],
  },
  {
    slug: "/fornecedores-catalogos",
    title: "Fornecedores e catalogos",
    seoTitleFallback: "Fornecedores e Catalogos Oficiais | RECOM",
    seoDescriptionFallback: "Acesso a marcas atendidas e catalogos oficiais.",
    ctas: [{ label: "Solicitar orcamento", href: "/contato" }],
  },
  {
    slug: "/solucoes",
    title: "Solucoes e processos",
    seoTitleFallback: "Solucoes e Processos de Usinagem | RECOM",
    seoDescriptionFallback: "Processos e aplicacoes com orientacao comercial.",
    ctas: [{ label: "Falar com a RECOM", href: "/contato" }],
  },
  {
    slug: "/promocoes",
    title: "Promocoes",
    seoTitleFallback: "Promocoes e Condicoes Comerciais | RECOM",
    seoDescriptionFallback: "Ofertas vigentes e comunicacao comercial controlada.",
    ctas: [{ label: "Consultar disponibilidade", href: "/contato" }],
  },
];
