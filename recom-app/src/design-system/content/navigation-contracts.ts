export const navigationContracts = {
  public: [
    { label: "Inicio", href: "/" },
    { label: "A RECOM", href: "/a-recom" },
    { label: "Fornecedores", href: "/fornecedores-catalogos" },
    { label: "Solucoes", href: "/solucoes" },
    { label: "Promocoes", href: "/promocoes" },
    { label: "Contato", href: "/contato" },
  ],
  admin: [
    { label: "Painel", href: "/admin" },
    { label: "Leads", href: "/admin/leads" },
    { label: "Fornecedores", href: "/admin/fornecedores" },
    { label: "Processos", href: "/admin/processos" },
    { label: "Promocoes", href: "/admin/promocoes" },
    { label: "Paginas", href: "/admin/pages" },
  ],
} as const;
