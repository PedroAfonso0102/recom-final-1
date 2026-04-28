export const PAGE_BLOCK_TYPES = [
  "hero",
  "trust_proof",
  "supplier_preview",
  "supplier_grid",
  "supplier_detail_header",
  "process_preview",
  "process_grid",
  "process_detail_header",
  "promotion_preview",
  "promotion_grid",
  "editorial_text",
  "feature_list",
  "related_suppliers",
  "related_processes",
  "catalog_cta",
  "contact_cta",
  "contact_methods",
  "lead_form",
  "faq",
  "location_block",
  "not_found_recovery",
] as const;

export const PAGE_TYPES = [
  "home",
  "institutional",
  "suppliers_hub",
  "supplier_detail_template",
  "processes_hub",
  "process_detail_template",
  "promotions",
  "contact",
  "privacy",
  "not_found",
] as const;

export type PageBlockType = (typeof PAGE_BLOCK_TYPES)[number];
export type PageType = (typeof PAGE_TYPES)[number];

export type BackgroundPreset =
  | "none"
  | "solid-dark"
  | "solid-light"
  | "industrial-gradient"
  | "image-dark-overlay"
  | "image-red-overlay"
  | "split-dark-image"
  | "texture-dark"
  | "technical-grid";

export type GridPreset =
  | "auto"
  | "two-columns"
  | "three-columns"
  | "four-columns"
  | "featured-left"
  | "featured-first"
  | "dense"
  | "editorial";

export type CardMediaMode = "none" | "logo" | "thumbnail" | "cover" | "background" | "split";

export type VisualBlockProps = {
  layoutPreset?: "default" | "compact" | "split" | "feature" | "dense";
  backgroundPreset?: BackgroundPreset;
  backgroundImageUrl?: string;
  backgroundPosition?: "center" | "top" | "bottom" | "left" | "right";
  overlayStrength?: 20 | 40 | 60 | 80;
  gridPreset?: GridPreset;
  mediaMode?: CardMediaMode;
  cardVariant?: "default" | "industrial" | "technical" | "catalog" | "promotion";
  cardDensity?: "compact" | "normal" | "relaxed";
  mobileBehavior?: "stack" | "carousel" | "compact";
};

export type PublicBlockState =
  | "loading"
  | "error"
  | "empty"
  | "unavailable"
  | "expired"
  | "active"
  | "published"
  | "fallback";

export type FieldValidationRule =
  | { type: "required"; message: string }
  | { type: "minLength"; value: number; message: string }
  | { type: "maxLength"; value: number; message: string }
  | { type: "recommendedLength"; min?: number; max?: number; message: string }
  | { type: "url"; message: string }
  | { type: "noGenericPrimaryCta"; blockedLabels: string[]; message: string }
  | { type: "requiredWhen"; field: string; equals: unknown; message: string }
  | { type: "maxItems"; value: number; message: string }
  | { type: "minItems"; value: number; message: string };

export type PageBlockField = {
  name: string;
  label: string;
  kind:
    | "text"
    | "textarea"
    | "rich_text"
    | "url"
    | "boolean"
    | "number"
    | "image"
    | "entity_reference"
    | "list"
    | "select";
  required?: boolean;
  characterLimit?: {
    min?: number;
    max?: number;
    recommendedMin?: number;
    recommendedMax?: number;
  };
  validations?: FieldValidationRule[];
  helpText?: string;
};

export type PageBlockContract = {
  blockType: PageBlockType;
  adminLabel: string;
  editorDescription: string;
  allowedPageTypes: PageType[];
  reorderable: "free" | "limited" | "fixed";
  requiredFields: PageBlockField[];
  optionalFields: PageBlockField[];
  publicStates: PublicBlockState[];
  fallback: string;
  preview: {
    mode: "inline" | "responsive" | "entity_card" | "checklist";
    description: string;
  };
  analyticsEvents: string[];
  publicComponent: string;
  adminEditorComponent: string;
};

const genericPrimaryCtaRule: FieldValidationRule = {
  type: "noGenericPrimaryCta",
  blockedLabels: ["saiba mais", "mais informacoes", "clique aqui"],
  message: "Use um CTA especifico de acao comercial, como Solicitar orcamento ou Falar com a RECOM.",
};

const titleField = (label = "Titulo"): PageBlockField => ({
  name: "title",
  label,
  kind: "text",
  required: true,
  characterLimit: { recommendedMin: 45, recommendedMax: 95 },
  validations: [
    { type: "required", message: "Informe um titulo." },
    { type: "recommendedLength", min: 45, max: 95, message: "Prefira um titulo objetivo entre 45 e 95 caracteres." },
  ],
});

const descriptionField = (name = "description", label = "Descricao"): PageBlockField => ({
  name,
  label,
  kind: "textarea",
  required: true,
  characterLimit: { max: 180 },
  validations: [
    { type: "required", message: "Informe uma descricao." },
    { type: "maxLength", value: 180, message: "Mantenha o texto com ate 180 caracteres." },
  ],
});

const primaryCtaFields: PageBlockField[] = [
  {
    name: "primary_cta_label",
    label: "Texto do CTA principal",
    kind: "text",
    required: true,
    validations: [{ type: "required", message: "Informe o texto do CTA principal." }, genericPrimaryCtaRule],
  },
  {
    name: "primary_cta_href",
    label: "Link do CTA principal",
    kind: "url",
    required: true,
    validations: [
      { type: "required", message: "Informe o destino do CTA principal." },
      { type: "url", message: "Use um href real, interno ou externo." },
    ],
  },
];

const secondaryCtaFields: PageBlockField[] = [
  { name: "secondary_cta_label", label: "Texto do CTA secundario", kind: "text" },
  { name: "secondary_cta_href", label: "Link do CTA secundario", kind: "url", validations: [{ type: "url", message: "Use um href real." }] },
];

const imageFields: PageBlockField[] = [
  { name: "image_url", label: "Imagem", kind: "image" },
  {
    name: "image_alt",
    label: "Texto alternativo da imagem",
    kind: "text",
    validations: [{ type: "requiredWhen", field: "image_url", equals: "informative", message: "Imagem informativa precisa de alt text." }],
  },
];

const visualBlockFields: PageBlockField[] = [
  { name: "layoutPreset", label: "Aparencia da secao", kind: "select" },
  { name: "backgroundPreset", label: "Fundo", kind: "select" },
  { name: "backgroundImageUrl", label: "Imagem de fundo", kind: "image" },
  { name: "backgroundPosition", label: "Enquadramento do fundo", kind: "select" },
  { name: "overlayStrength", label: "Intensidade do overlay", kind: "select" },
  { name: "gridPreset", label: "Layout dos cards", kind: "select" },
  { name: "mediaMode", label: "Modo da imagem", kind: "select" },
  { name: "cardVariant", label: "Visual do card", kind: "select" },
  { name: "cardDensity", label: "Densidade do card", kind: "select" },
  { name: "mobileBehavior", label: "Comportamento mobile", kind: "select" },
];

function contract(input: PageBlockContract): PageBlockContract {
  return input;
}

export const pageBlockContracts = {
  hero: contract({
    blockType: "hero",
    adminLabel: "Abertura / Hero",
    editorDescription: "Apresenta a pagina com H1 unico, promessa objetiva e CTAs comerciais.",
    allowedPageTypes: ["home", "institutional", "suppliers_hub", "processes_hub", "promotions", "contact", "privacy"],
    reorderable: "limited",
    requiredFields: [titleField(), descriptionField("subtitle", "Subtitulo"), ...primaryCtaFields],
    optionalFields: [
      { name: "eyebrow", label: "Chamada curta superior", kind: "text", characterLimit: { max: 80 } },
      { name: "support_text", label: "Texto de apoio", kind: "textarea", characterLimit: { max: 220 } },
      ...secondaryCtaFields,
      ...imageFields,
      { name: "trust_line", label: "Linha de confianca", kind: "text", characterLimit: { max: 120 } },
      ...visualBlockFields,
    ],
    publicStates: ["published", "fallback"],
    fallback: "Renderizar titulo, subtitulo e CTA de contato quando imagem ou apoio nao existirem.",
    preview: { mode: "responsive", description: "Preview desktop/mobile com contadores de caracteres e validacao de CTA generico." },
    analyticsEvents: ["external_link_click"],
    publicComponent: "HomeHeroBlock / InstitutionalHeroBlock / HubHeroBlock",
    adminEditorComponent: "HeroBlockEditor",
  }),
  trust_proof: contract({
    blockType: "trust_proof",
    adminLabel: "Provas de confianca",
    editorDescription: "Lista curta de fatos confirmados que sustentam a legitimidade da RECOM.",
    allowedPageTypes: ["home", "institutional"],
    reorderable: "limited",
    requiredFields: [
      {
        name: "items",
        label: "Itens de prova",
        kind: "list",
        required: true,
        validations: [
          { type: "minItems", value: 3, message: "Informe pelo menos 3 provas." },
          { type: "maxItems", value: 4, message: "Use no maximo 4 provas curtas." },
        ],
      },
      { name: "proof_text", label: "Texto de apoio", kind: "textarea", required: true, characterLimit: { max: 180 } },
    ],
    optionalFields: [
      { name: "link_label", label: "Texto do link", kind: "text" },
      { name: "link_href", label: "Href do link", kind: "url" },
    ],
    publicStates: ["published", "empty", "fallback"],
    fallback: "Ocultar itens nao confirmados e manter CTA de contato.",
    preview: { mode: "inline", description: "Preview em linha com alerta para dados nao confirmados." },
    analyticsEvents: ["external_link_click"],
    publicComponent: "TrustProofBlock",
    adminEditorComponent: "TrustProofBlockEditor",
  }),
  supplier_preview: contract({
    blockType: "supplier_preview",
    adminLabel: "Previa de fornecedores",
    editorDescription: "Seleciona fornecedores publicados para a Home sem expor rascunhos.",
    allowedPageTypes: ["home"],
    reorderable: "limited",
    requiredFields: [titleField(), descriptionField(), { name: "max_items", label: "Quantidade maxima", kind: "number", required: true }],
    optionalFields: [
      { name: "supplier_ids", label: "Fornecedores selecionados", kind: "entity_reference" },
      { name: "show_featured", label: "Usar destacados", kind: "boolean" },
      { name: "cta_label", label: "Texto do CTA", kind: "text" },
      { name: "cta_href", label: "Href do CTA", kind: "url" },
    ],
    publicStates: ["loading", "error", "empty", "published", "fallback"],
    fallback: "Mostrar CTA para hub de fornecedores quando nao houver fornecedores publicados.",
    preview: { mode: "entity_card", description: "Preview de cards e avisos para fornecedores nao publicados." },
    analyticsEvents: ["supplier_card_click", "supplier_detail_click", "supplier_catalog_click"],
    publicComponent: "SupplierPreviewBlock",
    adminEditorComponent: "SupplierPreviewBlockEditor",
  }),
  supplier_grid: contract({
    blockType: "supplier_grid",
    adminLabel: "Grade de fornecedores",
    editorDescription: "Lista ou grade filtravel de marcas e catalogos oficiais.",
    allowedPageTypes: ["suppliers_hub"],
    reorderable: "fixed",
    requiredFields: [
      { name: "items_source", label: "Origem dos itens", kind: "select", required: true },
      { name: "display_mode", label: "Modo de exibicao", kind: "select", required: true },
    ],
    optionalFields: [titleField("Titulo opcional"), descriptionField(), { name: "supplier_ids", label: "Fornecedores manuais", kind: "entity_reference" }, ...visualBlockFields],
    publicStates: ["loading", "error", "empty", "unavailable", "published"],
    fallback: "Exibir estado vazio com contato quando nao houver fornecedores publicados.",
    preview: { mode: "responsive", description: "Preview com filtros, badges de catalogo e CTAs externos." },
    analyticsEvents: ["supplier_card_click", "supplier_detail_click", "supplier_catalog_click", "supplier_catalog_unavailable_click", "external_link_click"],
    publicComponent: "SupplierGridBlock",
    adminEditorComponent: "SupplierGridBlockEditor",
  }),
  supplier_detail_header: contract({
    blockType: "supplier_detail_header",
    adminLabel: "Cabecalho de fornecedor",
    editorDescription: "Header rigido para pagina individual de fornecedor.",
    allowedPageTypes: ["supplier_detail_template"],
    reorderable: "fixed",
    requiredFields: [{ name: "supplier", label: "Fornecedor publicado", kind: "entity_reference", required: true }],
    optionalFields: [{ name: "support_text", label: "Texto de apoio", kind: "textarea" }],
    publicStates: ["loading", "error", "unavailable", "published", "fallback"],
    fallback: "Renderizar nome, descricao curta e CTA de contato quando o catalogo estiver indisponivel.",
    preview: { mode: "entity_card", description: "Preview real da marca, status de catalogo e ultima revisao." },
    analyticsEvents: ["supplier_detail_click", "supplier_catalog_click", "supplier_catalog_unavailable_click"],
    publicComponent: "SupplierDetailHero",
    adminEditorComponent: "SupplierDetailHeaderEditor",
  }),
  process_preview: contract({
    blockType: "process_preview",
    adminLabel: "Previa de processos",
    editorDescription: "Mostra processos publicados na Home com caminho para solucoes.",
    allowedPageTypes: ["home"],
    reorderable: "limited",
    requiredFields: [titleField(), descriptionField(), { name: "max_items", label: "Quantidade maxima", kind: "number", required: true }],
    optionalFields: [{ name: "process_ids", label: "Processos selecionados", kind: "entity_reference" }, { name: "cta_label", label: "Texto do CTA", kind: "text" }, { name: "cta_href", label: "Href do CTA", kind: "url" }],
    publicStates: ["loading", "error", "empty", "published"],
    fallback: "Mostrar CTA para contato se nenhum processo estiver publicado.",
    preview: { mode: "entity_card", description: "Preview de cards por processo e relacao com fornecedores." },
    analyticsEvents: ["process_card_click"],
    publicComponent: "ProcessPreviewBlock",
    adminEditorComponent: "ProcessPreviewBlockEditor",
  }),
  process_grid: contract({
    blockType: "process_grid",
    adminLabel: "Grade de processos",
    editorDescription: "Hub por aplicacao/processo, conectando processos a fornecedores.",
    allowedPageTypes: ["processes_hub"],
    reorderable: "fixed",
    requiredFields: [{ name: "items_source", label: "Origem dos processos", kind: "select", required: true }],
    optionalFields: [titleField("Titulo opcional"), descriptionField(), { name: "max_items", label: "Limite de itens", kind: "number" }, ...visualBlockFields],
    publicStates: ["loading", "error", "empty", "published"],
    fallback: "Estado vazio com contato comercial.",
    preview: { mode: "responsive", description: "Preview dos ProcessCards e fornecedores relacionados." },
    analyticsEvents: ["process_card_click", "process_supplier_click"],
    publicComponent: "ProcessGridBlock",
    adminEditorComponent: "ProcessGridBlockEditor",
  }),
  process_detail_header: contract({
    blockType: "process_detail_header",
    adminLabel: "Cabecalho de processo",
    editorDescription: "Header rigido para pagina individual de processo.",
    allowedPageTypes: ["process_detail_template"],
    reorderable: "fixed",
    requiredFields: [{ name: "process", label: "Processo publicado", kind: "entity_reference", required: true }],
    optionalFields: [...imageFields],
    publicStates: ["loading", "error", "published", "fallback"],
    fallback: "Renderizar nome, descricao curta e CTA de orientacao comercial.",
    preview: { mode: "entity_card", description: "Preview do processo e CTAs relacionados." },
    analyticsEvents: ["process_card_click"],
    publicComponent: "ProcessDetailHero",
    adminEditorComponent: "ProcessDetailHeaderEditor",
  }),
  promotion_preview: contract({
    blockType: "promotion_preview",
    adminLabel: "Previa de promocoes",
    editorDescription: "Exibe promocoes ativas na Home com validade visivel.",
    allowedPageTypes: ["home"],
    reorderable: "limited",
    requiredFields: [titleField(), descriptionField(), { name: "max_items", label: "Quantidade maxima", kind: "number", required: true }],
    optionalFields: [{ name: "show_only_active", label: "Somente ativas", kind: "boolean" }, { name: "cta_label", label: "Texto do CTA", kind: "text" }, { name: "cta_href", label: "Href do CTA", kind: "url" }],
    publicStates: ["loading", "error", "empty", "expired", "active", "published"],
    fallback: "Ocultar discretamente se nao houver promocao ativa, conforme configuracao.",
    preview: { mode: "entity_card", description: "Preview de cards com alerta de validade." },
    analyticsEvents: ["promotion_click", "promotion_contact_click"],
    publicComponent: "PromotionPreviewBlock",
    adminEditorComponent: "PromotionPreviewBlockEditor",
  }),
  promotion_grid: contract({
    blockType: "promotion_grid",
    adminLabel: "Grade de promocoes",
    editorDescription: "Listagem de condicoes comerciais sem linguagem varejista.",
    allowedPageTypes: ["promotions"],
    reorderable: "fixed",
    requiredFields: [{ name: "items_source", label: "Origem das promocoes", kind: "select", required: true }],
    optionalFields: [titleField("Titulo opcional"), descriptionField(), { name: "show_expired", label: "Mostrar encerradas", kind: "boolean" }, ...visualBlockFields],
    publicStates: ["loading", "error", "empty", "expired", "active", "published"],
    fallback: "Estado vazio com CTA para orcamento.",
    preview: { mode: "responsive", description: "Preview com status, validade, termos e CTA." },
    analyticsEvents: ["promotion_click", "promotion_contact_click"],
    publicComponent: "PromotionGridBlock",
    adminEditorComponent: "PromotionGridBlockEditor",
  }),
  editorial_text: contract({
    blockType: "editorial_text",
    adminLabel: "Texto editorial",
    editorDescription: "Texto institucional limitado, sem HTML livre perigoso.",
    allowedPageTypes: ["institutional", "supplier_detail_template", "process_detail_template", "privacy"],
    reorderable: "limited",
    requiredFields: [{ name: "body", label: "Conteudo", kind: "rich_text", required: true }],
    optionalFields: [titleField("Titulo opcional"), { name: "bullets", label: "Topicos", kind: "list" }, ...visualBlockFields],
    publicStates: ["published", "fallback"],
    fallback: "Renderizar apenas conteudo validado; ocultar bloco vazio.",
    preview: { mode: "inline", description: "Preview de rich text seguro com limites de concisao." },
    analyticsEvents: ["external_link_click"],
    publicComponent: "EditorialTextBlock",
    adminEditorComponent: "EditorialTextBlockEditor",
  }),
  feature_list: contract({
    blockType: "feature_list",
    adminLabel: "Lista de destaques",
    editorDescription: "Lista curta de atributos, etapas ou aplicacoes.",
    allowedPageTypes: ["home", "institutional", "process_detail_template"],
    reorderable: "limited",
    requiredFields: [titleField(), { name: "items", label: "Itens", kind: "list", required: true, validations: [{ type: "minItems", value: 1, message: "Informe ao menos um item." }] }],
    optionalFields: [descriptionField(), ...visualBlockFields],
    publicStates: ["empty", "published"],
    fallback: "Ocultar bloco quando a lista estiver vazia.",
    preview: { mode: "inline", description: "Preview de lista com densidade tecnica." },
    analyticsEvents: [],
    publicComponent: "FeatureListBlock",
    adminEditorComponent: "FeatureListBlockEditor",
  }),
  related_suppliers: contract({
    blockType: "related_suppliers",
    adminLabel: "Fornecedores relacionados",
    editorDescription: "Relaciona processo a fornecedores publicados.",
    allowedPageTypes: ["process_detail_template"],
    reorderable: "fixed",
    requiredFields: [{ name: "source", label: "Origem da relacao", kind: "select", required: true }],
    optionalFields: [titleField("Titulo opcional"), descriptionField()],
    publicStates: ["loading", "error", "empty", "published"],
    fallback: "Mostrar CTA de contato quando nao houver fornecedor relacionado.",
    preview: { mode: "entity_card", description: "Preview de SupplierCards compactos." },
    analyticsEvents: ["process_supplier_click", "supplier_card_click", "supplier_catalog_click"],
    publicComponent: "RelatedSuppliersBlock",
    adminEditorComponent: "RelatedSuppliersBlockEditor",
  }),
  related_processes: contract({
    blockType: "related_processes",
    adminLabel: "Processos relacionados",
    editorDescription: "Relaciona fornecedor a processos publicados.",
    allowedPageTypes: ["supplier_detail_template"],
    reorderable: "fixed",
    requiredFields: [{ name: "source", label: "Origem da relacao", kind: "select", required: true }],
    optionalFields: [titleField("Titulo opcional"), descriptionField()],
    publicStates: ["loading", "error", "empty", "published"],
    fallback: "Mostrar CTA de contato quando nao houver processo relacionado.",
    preview: { mode: "entity_card", description: "Preview de ProcessCards compactos." },
    analyticsEvents: ["process_card_click", "supplier_detail_click"],
    publicComponent: "RelatedProcessesBlock",
    adminEditorComponent: "RelatedProcessesBlockEditor",
  }),
  catalog_cta: contract({
    blockType: "catalog_cta",
    adminLabel: "CTA de catalogo",
    editorDescription: "Leva ao catalogo oficial ou a contato quando indisponivel.",
    allowedPageTypes: ["supplier_detail_template"],
    reorderable: "fixed",
    requiredFields: [{ name: "catalog_status", label: "Status do catalogo", kind: "select", required: true }],
    optionalFields: [{ name: "catalog_url", label: "URL do catalogo", kind: "url" }, { name: "catalog_label", label: "Texto do botao", kind: "text" }, { name: "support_text", label: "Microcopy", kind: "textarea" }, ...visualBlockFields],
    publicStates: ["unavailable", "published", "fallback"],
    fallback: "Trocar catalogo por CTA Falar com a RECOM sobre esta marca.",
    preview: { mode: "inline", description: "Preview da regra available/unavailable/under_review." },
    analyticsEvents: ["supplier_catalog_click", "supplier_catalog_unavailable_click", "external_link_click"],
    publicComponent: "SupplierCatalogCtaBlock",
    adminEditorComponent: "CatalogCtaBlockEditor",
  }),
  contact_cta: contract({
    blockType: "contact_cta",
    adminLabel: "CTA de contato",
    editorDescription: "Fechamento comercial com proximo passo claro.",
    allowedPageTypes: ["home", "institutional", "suppliers_hub", "supplier_detail_template", "processes_hub", "process_detail_template", "promotions", "not_found"],
    reorderable: "limited",
    requiredFields: [titleField(), descriptionField(), ...primaryCtaFields],
    optionalFields: [...secondaryCtaFields, ...visualBlockFields],
    publicStates: ["published", "fallback"],
    fallback: "Usar contato principal de site_settings.",
    preview: { mode: "responsive", description: "Preview com links reais de contato." },
    analyticsEvents: ["whatsapp_click", "contact_phone_click", "contact_email_click"],
    publicComponent: "FinalContactCtaBlock / ContactCtaBlock",
    adminEditorComponent: "ContactCtaBlockEditor",
  }),
  contact_methods: contract({
    blockType: "contact_methods",
    adminLabel: "Canais de contato",
    editorDescription: "Canais derivados de site_settings, com links tel/mailto/WhatsApp.",
    allowedPageTypes: ["contact", "institutional"],
    reorderable: "fixed",
    requiredFields: [{ name: "source", label: "Origem dos dados", kind: "select", required: true }],
    optionalFields: [{ name: "override_reason", label: "Justificativa de override", kind: "textarea" }],
    publicStates: ["empty", "published", "fallback"],
    fallback: "Usar fallback de siteConfig quando site_settings estiver vazio.",
    preview: { mode: "checklist", description: "Checklist de telefone, email, WhatsApp, endereco e mapa." },
    analyticsEvents: ["contact_phone_click", "contact_email_click", "whatsapp_click"],
    publicComponent: "ContactMethodsBlock",
    adminEditorComponent: "ContactMethodsBlockEditor",
  }),
  lead_form: contract({
    blockType: "lead_form",
    adminLabel: "Formulario de lead",
    editorDescription: "Formulario server-side com validacao, preservacao de dados e estados acessiveis.",
    allowedPageTypes: ["contact"],
    reorderable: "fixed",
    requiredFields: [{ name: "message", label: "Mensagem", kind: "textarea", required: true }],
    optionalFields: [
      { name: "supplier_interest", label: "Fornecedor de interesse", kind: "entity_reference" },
      { name: "process_interest", label: "Processo de interesse", kind: "entity_reference" },
      { name: "file", label: "Anexo", kind: "image" },
      { name: "consent", label: "Consentimento", kind: "boolean" },
    ],
    publicStates: ["loading", "error", "active", "fallback"],
    fallback: "Exibir canais diretos quando a submissao falhar.",
    preview: { mode: "responsive", description: "Preview dos estados idle, invalid, submitting, success e server_error." },
    analyticsEvents: ["lead_form_submit", "lead_form_error"],
    publicComponent: "LeadFormBlock",
    adminEditorComponent: "LeadFormBlockEditor",
  }),
  faq: contract({
    blockType: "faq",
    adminLabel: "FAQ",
    editorDescription: "Perguntas reais e indexaveis, com accordion acessivel quando usado.",
    allowedPageTypes: ["process_detail_template", "supplier_detail_template", "contact"],
    reorderable: "limited",
    requiredFields: [{ name: "questions", label: "Perguntas e respostas", kind: "list", required: true, validations: [{ type: "minItems", value: 1, message: "Inclua ao menos uma pergunta real." }] }],
    optionalFields: [titleField("Titulo opcional")],
    publicStates: ["empty", "published"],
    fallback: "Ocultar FAQ vazio.",
    preview: { mode: "inline", description: "Preview do accordion e hierarquia de headings." },
    analyticsEvents: [],
    publicComponent: "ProcessFaqBlock",
    adminEditorComponent: "FaqBlockEditor",
  }),
  location_block: contract({
    blockType: "location_block",
    adminLabel: "Localizacao",
    editorDescription: "Endereco, horario e mapa vindos preferencialmente de site_settings.",
    allowedPageTypes: ["institutional", "contact"],
    reorderable: "fixed",
    requiredFields: [{ name: "source", label: "Origem dos dados", kind: "select", required: true }],
    optionalFields: [{ name: "map_url", label: "URL do mapa", kind: "url" }, { name: "business_hours", label: "Horario", kind: "textarea" }, ...imageFields],
    publicStates: ["empty", "published", "fallback"],
    fallback: "Mostrar endereco textual e canais de contato quando mapa nao existir.",
    preview: { mode: "responsive", description: "Preview mobile/desktop com links de rota e telefone." },
    analyticsEvents: ["external_link_click", "contact_phone_click", "contact_email_click", "whatsapp_click"],
    publicComponent: "LocationBlock",
    adminEditorComponent: "LocationBlockEditor",
  }),
  not_found_recovery: contract({
    blockType: "not_found_recovery",
    adminLabel: "Recuperacao 404",
    editorDescription: "Links fixos de recuperacao para tirar o usuario do beco sem saida.",
    allowedPageTypes: ["not_found"],
    reorderable: "fixed",
    requiredFields: [titleField(), descriptionField()],
    optionalFields: [{ name: "show_search", label: "Mostrar busca", kind: "boolean" }],
    publicStates: ["published", "fallback"],
    fallback: "Renderizar links para Inicio, Fornecedores, Solucoes e Contato.",
    preview: { mode: "inline", description: "Preview da mensagem e dos links de recuperacao." },
    analyticsEvents: ["external_link_click"],
    publicComponent: "NotFoundRecovery",
    adminEditorComponent: "NotFoundRecoveryEditor",
  }),
} satisfies Record<PageBlockType, PageBlockContract>;

export function getPageBlockContract(blockType: PageBlockType): PageBlockContract {
  return pageBlockContracts[blockType];
}

export function isPageBlockAllowedOnPage(blockType: PageBlockType, pageType: PageType) {
  return pageBlockContracts[blockType].allowedPageTypes.includes(pageType);
}
