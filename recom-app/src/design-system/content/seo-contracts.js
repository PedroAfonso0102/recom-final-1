/**
 * SeoContracts
 * Centraliza metadados de SEO por página.
 */
export const SeoContracts = {
    home: {
        title: "RECOM Metal Duro | Distribuidor B2B de ferramentas de corte",
        description: "Distribuição de ferramentas para usinagem, fresamento, torneamento e furação.",
        canonical: "/",
    },
    suppliers: {
        title: "Fornecedores e Catálogos | RECOM",
        description: "Acesse catálogos oficiais e conheça nossos parceiros comerciais.",
        canonical: "/fornecedores.html",
    },
    processes: {
        title: "Soluções e Processos Industriais | RECOM",
        description: "Suporte comercial para usinagem, torneamento e furação industrial.",
        canonical: "/processos.html",
    },
};

if (typeof window !== 'undefined') window.SeoContracts = SeoContracts;
