export type ComponentContract = {
  name: string;
  purpose: string;
  appearsIn: string[];
  dataSource: string;
  requiredFields: string[];
  optionalFields: string[];
  states: string[];
  analyticsEvents: string[];
  mobileRules: string[];
  fallback: string;
  permissions: string[];
  acceptance: string[];
};

export const publicComponentContracts: ComponentContract[] = [
  {
    name: "PublicHeader",
    purpose: "Navegacao global rastreavel com CTA de contato/orcamento.",
    appearsIn: ["layout publico"],
    dataSource: "site_settings + navigation contracts",
    requiredFields: ["links", "primary CTA"],
    optionalFields: ["telefone", "WhatsApp"],
    states: ["default", "active", "mobile-open"],
    analyticsEvents: ["whatsapp_click", "contact_phone_click"],
    mobileRules: ["menu acionavel por teclado", "links usam href real"],
    fallback: "links minimos para home, fornecedores, solucoes, promocoes e contato",
    permissions: ["public"],
    acceptance: ["menu tem estado ativo", "CTA usa Link/a href"],
  },
  {
    name: "SupplierCard",
    purpose: "Apresentar fornecedor B2B sem parecer SKU/e-commerce.",
    appearsIn: ["/fornecedores-catalogos", "/", "/solucoes/[slug]"],
    dataSource: "suppliers + supplier_processes/relatedProcesses",
    requiredFields: ["name", "slug", "shortDescription", "status"],
    optionalFields: ["logoUrl", "catalogUrl", "processes"],
    states: ["published", "catalog-unavailable", "loading", "empty"],
    analyticsEvents: ["supplier_card_click", "supplier_catalog_click", "external_catalog_unavailable_click"],
    mobileRules: ["CTA interno e externo empilhados", "logo nao causa layout shift"],
    fallback: "falar com a RECOM quando catalogo nao existir",
    permissions: ["public read published"],
    acceptance: ["card vazio nao publica", "link externo tem rotulo claro"],
  },
  {
    name: "LeadForm",
    purpose: "Gerar lead comercial com validacao server-side.",
    appearsIn: ["/contato", "/a-recom", "CTA final"],
    dataSource: "server action + leadSchema",
    requiredFields: ["name", "company", "email", "phone", "message"],
    optionalFields: ["supplierInterest", "processInterest", "itemCode", "sourcePage"],
    states: ["idle", "focused", "invalid", "submitting", "success", "error"],
    analyticsEvents: ["generate_lead_form_submit", "form_error"],
    mobileRules: ["labels permanentes", "alvos >= 44px para submit principal"],
    fallback: "telefone, WhatsApp e email visiveis em erro",
    permissions: ["public create lead only"],
    acceptance: ["dados preservados em erro", "erro aparece junto ao campo"],
  },
];

export const adminComponentContracts: ComponentContract[] = [
  {
    name: "AdminShell",
    purpose: "Organizar operacao comercial/editorial por grupos cognitivos.",
    appearsIn: ["/admin/*"],
    dataSource: "auth + nav config",
    requiredFields: ["groups", "activePath"],
    optionalFields: ["role", "systemHealth"],
    states: ["active", "permission-denied", "mobile"],
    analyticsEvents: [],
    mobileRules: ["navegacao horizontal compacta", "links com href real"],
    fallback: "menu minimo com dashboard e logout",
    permissions: ["authenticated"],
    acceptance: ["estado ativo claro", "header compacto"],
  },
  {
    name: "DataTable",
    purpose: "Expor inventarios operacionais antes de detalhes.",
    appearsIn: ["leads", "fornecedores", "paginas", "processos", "promocoes"],
    dataSource: "server queries",
    requiredFields: ["columns", "rows"],
    optionalFields: ["empty", "filters", "bulkActions"],
    states: ["loading", "empty", "no-results", "error"],
    analyticsEvents: [],
    mobileRules: ["overflow horizontal controlado", "acoes com texto"],
    fallback: "EmptyState com proximo passo",
    permissions: ["role based"],
    acceptance: ["status visivel sem abrir registro", "acoes criticas nao dependem de icone"],
  },
  {
    name: "SaveBar",
    purpose: "Tornar edicao segura e explicita.",
    appearsIn: ["CMS editor", "entity editors"],
    dataSource: "form dirty state + publish action",
    requiredFields: ["state"],
    optionalFields: ["disabledReason", "publishAction"],
    states: ["saving", "saved", "unsaved", "published", "error"],
    analyticsEvents: [],
    mobileRules: ["fixa no rodape sem cobrir campos finais"],
    fallback: "salvar rascunho visivel",
    permissions: ["editor", "admin", "owner"],
    acceptance: ["alteracoes nao salvas aparecem", "publicar explica bloqueio"],
  },
];
