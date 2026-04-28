import type { CmsComponentType } from "@/cms/component-registry";

export const PAGE_EXPERIENCE_KEYS = [
  "home",
  "institutional",
  "commercial_hub",
  "entity_detail",
  "technical_content",
  "promotion",
  "contact",
  "not_found",
] as const;

export type PageExperienceKey = (typeof PAGE_EXPERIENCE_KEYS)[number];

export type PagePrimaryIntent = "orientation" | "trust" | "discovery" | "education" | "conversion" | "recovery";

export type PageExperiencePreset = {
  key: PageExperienceKey;
  label: string;
  description: string;
  primaryIntent: PagePrimaryIntent;
  sectionDensity: Array<"compact" | "standard" | "editorial" | "technical">;
  preferredHeroVariant: "default" | "split" | "compact" | "simple" | "industrial" | "technical" | "contact" | "catalog";
  allowedComponents: CmsComponentType[];
  recommendedComponents: CmsComponentType[];
  className: string;
  editorialGuardrails: string[];
};

const BASE_COMPONENTS: CmsComponentType[] = ["HeroSection", "TextSection", "GridSection", "CtaSection", "TrustLogos"];

export const PAGE_EXPERIENCE_PRESETS = {
  home: {
    key: "home",
    label: "Home orientadora",
    description: "Entrada principal com proposta, fornecedores, processos, prova e CTA.",
    primaryIntent: "orientation",
    sectionDensity: ["standard", "editorial"],
    preferredHeroVariant: "industrial",
    allowedComponents: BASE_COMPONENTS,
    recommendedComponents: ["HeroSection", "TrustLogos", "GridSection", "CtaSection"],
    className: "page-experience-home bg-white",
    editorialGuardrails: ["Nao abrir com noticia antiga.", "Nao depender de carrossel como conteudo principal.", "Usar CTAs especificos."],
  },
  institutional: {
    key: "institutional",
    label: "Institucional / confianca",
    description: "Historia, Campinas, fornecedores reconhecidos e CTA humano.",
    primaryIntent: "trust",
    sectionDensity: ["editorial", "standard"],
    preferredHeroVariant: "simple",
    allowedComponents: BASE_COMPONENTS,
    recommendedComponents: ["HeroSection", "TextSection", "GridSection", "CtaSection"],
    className: "page-experience-institutional bg-white",
    editorialGuardrails: ["Preservar 1990 e Campinas se confirmados.", "Evitar promessa sem prova.", "Encerrar com caminho de contato."],
  },
  commercial_hub: {
    key: "commercial_hub",
    label: "Hub comercial",
    description: "Listagem de fornecedores, catalogos ou processos com filtros e cards.",
    primaryIntent: "discovery",
    sectionDensity: ["compact", "standard"],
    preferredHeroVariant: "catalog",
    allowedComponents: BASE_COMPONENTS,
    recommendedComponents: ["HeroSection", "GridSection", "CtaSection"],
    className: "page-experience-commercial-hub bg-white",
    editorialGuardrails: ["Diferenciar catalogo oficial de atendimento RECOM.", "Nao usar 'clique aqui'.", "Cards precisam ter proximo passo claro."],
  },
  entity_detail: {
    key: "entity_detail",
    label: "Detalhe de entidade",
    description: "Pagina individual de fornecedor ou processo com contexto, relacoes e CTA.",
    primaryIntent: "discovery",
    sectionDensity: ["standard", "technical"],
    preferredHeroVariant: "technical",
    allowedComponents: BASE_COMPONENTS,
    recommendedComponents: ["HeroSection", "TextSection", "GridSection", "CtaSection"],
    className: "page-experience-entity-detail bg-white",
    editorialGuardrails: ["Contextualizar antes do catalogo externo.", "Nao publicar pagina rasa.", "Relacionar processos e fornecedores."],
  },
  technical_content: {
    key: "technical_content",
    label: "Conteudo tecnico",
    description: "Acervo tecnico de apoio, seguranca, uso ou biblioteca.",
    primaryIntent: "education",
    sectionDensity: ["technical", "editorial"],
    preferredHeroVariant: "technical",
    allowedComponents: ["HeroSection", "TextSection", "GridSection", "CtaSection"],
    recommendedComponents: ["HeroSection", "TextSection", "GridSection"],
    className: "page-experience-technical bg-recom-gray-50",
    editorialGuardrails: ["Citar fonte quando o material vier de fornecedor.", "Adicionar data de revisao.", "Nao misturar com fluxo comercial principal."],
  },
  promotion: {
    key: "promotion",
    label: "Promocao comercial",
    description: "Condicao comercial com validade, ressalvas e CTA.",
    primaryIntent: "conversion",
    sectionDensity: ["compact", "standard"],
    preferredHeroVariant: "catalog",
    allowedComponents: BASE_COMPONENTS,
    recommendedComponents: ["HeroSection", "GridSection", "CtaSection"],
    className: "page-experience-promotion bg-white",
    editorialGuardrails: ["Promocao nao pode depender apenas de imagem.", "Sempre expor validade e termos.", "Evitar urgencia artificial."],
  },
  contact: {
    key: "contact",
    label: "Contato / orcamento",
    description: "Formulario, canais diretos e orientacao para retorno comercial.",
    primaryIntent: "conversion",
    sectionDensity: ["compact", "standard"],
    preferredHeroVariant: "contact",
    allowedComponents: BASE_COMPONENTS,
    recommendedComponents: ["HeroSection", "TextSection", "CtaSection"],
    className: "page-experience-contact bg-white",
    editorialGuardrails: ["Labels permanentes.", "Canais diretos visiveis.", "Explicar que informacao ajuda o retorno."],
  },
  not_found: {
    key: "not_found",
    label: "Recuperacao",
    description: "Pagina de recuperacao com caminhos reais.",
    primaryIntent: "recovery",
    sectionDensity: ["compact"],
    preferredHeroVariant: "simple",
    allowedComponents: ["HeroSection", "TextSection", "GridSection", "CtaSection"],
    recommendedComponents: ["HeroSection", "GridSection"],
    className: "page-experience-recovery bg-white",
    editorialGuardrails: ["Oferecer links reais.", "Nao deixar beco sem saida.", "Manter mensagem curta."],
  },
} satisfies Record<PageExperienceKey, PageExperiencePreset>;

export function getPageExperiencePreset(key: PageExperienceKey): PageExperiencePreset {
  return PAGE_EXPERIENCE_PRESETS[key];
}

export function inferPageExperienceKey({
  templateKey,
  slug,
}: {
  templateKey?: string | null;
  slug?: string | null;
}): PageExperienceKey {
  const source = `${templateKey ?? ""} ${slug ?? ""}`.toLowerCase();

  if (source.includes("contact") || source.includes("contato")) return "contact";
  if (source.includes("promotion") || source.includes("promoco")) return "promotion";
  if (source.includes("entity_detail")) return "entity_detail";
  if (source.includes("technical_content")) return "technical_content";
  if (source.includes("commercial_hub")) return "commercial_hub";
  if (source.includes("supplier_detail") || source.includes("process_detail") || source.includes("[slug]")) return "entity_detail";
  if (source.includes("technical") || source.includes("seguranca") || source.includes("metal-duro") || source.includes("videos")) return "technical_content";
  if (source.includes("supplier") || source.includes("fornecedor") || source.includes("solutions") || source.includes("solucoes") || source.includes("processos")) return "commercial_hub";
  if (source.includes("about") || source.includes("a-recom") || source.includes("sobre") || source.includes("empresa")) return "institutional";
  if (source.includes("not_found") || source.includes("404")) return "not_found";

  return "home";
}

export function getPageExperienceFromPage(page: { template_key?: string | null; slug?: string | null }) {
  return getPageExperiencePreset(inferPageExperienceKey({ templateKey: page.template_key, slug: page.slug }));
}
