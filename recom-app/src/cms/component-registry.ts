import { ctaSectionSchema } from "./schemas/cta-section.schema";
import { heroSectionSchema } from "./schemas/hero-section.schema";
import { textSectionSchema } from "./schemas/text-section.schema";
import { gridSectionSchema } from "./schemas/grid-section.schema";
import { trustLogosSchema } from "./schemas/trust-logos.schema";
import { CtaSectionBlock, HeroSectionBlock, TextSectionBlock, GridSectionBlock, TrustLogosBlock } from "./components";
import type { EditableComponentDefinition } from "./types";

export const componentRegistry = {
  HeroSection: {
    type: "HeroSection",
    label: "Hero principal",
    description: "Banner principal da página com CTAs e imagem opcional.",
    category: "content",
    component: HeroSectionBlock,
    schema: heroSectionSchema,
    defaultProps: {
      eyebrow: "",
      title: "",
      subtitle: "",
      primaryCtaLabel: "Falar com a RECOM",
      primaryCtaHref: "/sobre#contato",
      secondaryCtaLabel: "",
      secondaryCtaHref: "",
      imageUrl: "",
      variant: "default",
    },
    fields: [
      { name: "eyebrow", label: "Texto superior", type: "text" },
      { name: "title", label: "Título", type: "text", required: true },
      { name: "subtitle", label: "Subtítulo", type: "textarea", rows: 4 },
      { name: "primaryCtaLabel", label: "CTA principal", type: "text" },
      { name: "primaryCtaHref", label: "Link do CTA principal", type: "url" },
      { name: "secondaryCtaLabel", label: "CTA secundário", type: "text" },
      { name: "secondaryCtaHref", label: "Link do CTA secundário", type: "url" },
      { name: "imageUrl", label: "URL da imagem", type: "url" },
      { name: "showCarousel", label: "Mostrar Carrossel", type: "checkbox", description: "Ative para exibir o carrossel na Home." },
      {
        name: "variant",
        label: "Variante",
        type: "select",
        options: [
          { label: "Padrão", value: "default" },
          { label: "Split", value: "split" },
          { label: "Compacto", value: "compact" },
        ],
      },
    ],
    allowedVariants: ["default", "split", "compact"],
  },
  TextSection: {
    type: "TextSection",
    label: "Bloco de texto",
    description: "Seção simples para redação e conteúdo institucional.",
    category: "content",
    component: TextSectionBlock,
    schema: textSectionSchema,
    defaultProps: {
      title: "",
      body: "",
      variant: "default",
    },
    fields: [
      { name: "title", label: "Título", type: "text" },
      { name: "body", label: "Texto", type: "textarea", required: true, rows: 8 },
      {
        name: "variant",
        label: "Variante",
        type: "select",
        options: [
          { label: "Padrão", value: "default" },
          { label: "Painel", value: "panel" },
        ],
      },
    ],
    allowedVariants: ["default", "panel"],
  },
  CtaSection: {
    type: "CtaSection",
    label: "CTA final",
    description: "Chamada para ação com dois botões.",
    category: "cta",
    component: CtaSectionBlock,
    schema: ctaSectionSchema,
    defaultProps: {
      eyebrow: "",
      title: "",
      description: "",
      primaryCtaLabel: "Falar com a RECOM",
      primaryCtaHref: "/sobre#contato",
      secondaryCtaLabel: "",
      secondaryCtaHref: "",
      variant: "default",
    },
    fields: [
      { name: "eyebrow", label: "Texto superior", type: "text" },
      { name: "title", label: "Título", type: "text", required: true },
      { name: "description", label: "Texto de apoio", type: "textarea", required: true, rows: 5 },
      { name: "primaryCtaLabel", label: "CTA principal", type: "text", required: true },
      { name: "primaryCtaHref", label: "Link do CTA principal", type: "url", required: true },
      { name: "secondaryCtaLabel", label: "CTA secundário", type: "text" },
      { name: "secondaryCtaHref", label: "Link do CTA secundário", type: "url" },
      {
        name: "variant",
        label: "Variante",
        type: "select",
        options: [
          { label: "Padrão", value: "default" },
          { label: "Claro", value: "light" },
        ],
      },
    ],
    allowedVariants: ["default", "light"],
  },
  GridSection: {
    type: "GridSection",
    label: "Grade de conteúdo",
    description: "Lista de itens com ícone, título e descrição.",
    category: "content",
    component: GridSectionBlock,
    schema: gridSectionSchema,
    defaultProps: {
      title: "",
      items: [],
      columns: "3",
      variant: "default",
    },
    fields: [
      { name: "eyebrow", label: "Texto superior", type: "text" },
      { name: "title", label: "Título", type: "text" },
      { name: "description", label: "Descrição", type: "textarea" },
      {
        name: "columns",
        label: "Colunas",
        type: "select",
        options: [
          { label: "2 colunas", value: "2" },
          { label: "3 colunas", value: "3" },
          { label: "4 colunas", value: "4" },
        ],
      },
      {
        name: "variant",
        label: "Variante",
        type: "select",
        options: [
          { label: "Transparente", value: "default" },
          { label: "Fundo Branco", value: "white" },
          { label: "Fundo Cinza", value: "gray" },
        ],
      },
      {
        name: "items",
        label: "Itens da grade",
        type: "list",
        itemFields: [
          { name: "title", label: "Título", type: "text", required: true },
          { name: "description", label: "Descrição", type: "textarea" },
          {
            name: "icon",
            label: "Ícone",
            type: "select",
            options: [
              { label: "Escudo", value: "shield" },
              { label: "Check", value: "check" },
              { label: "Fábrica", value: "factory" },
              { label: "Ferramenta", value: "wrench" },
              { label: "Pin", value: "pin" },
              { label: "Pacote", value: "package" },
            ],
          },
          { name: "linkLabel", label: "Texto do botão", type: "text" },
          { name: "linkHref", label: "Link do botão", type: "text" },
        ],
      },
    ],
  },
  TrustLogos: {
    type: "TrustLogos",
    label: "Logotipos de parceiros",
    description: "Exibe os logotipos dos fornecedores.",
    category: "content",
    component: TrustLogosBlock,
    schema: trustLogosSchema,
    defaultProps: {
      title: "Nossos parceiros",
      grayscale: true,
    },
    fields: [
      { name: "title", label: "Título", type: "text" },
      { name: "grayscale", label: "Preto e Branco", type: "checkbox" },
    ],
  },
} satisfies Record<string, EditableComponentDefinition>;

export type CmsComponentType = keyof typeof componentRegistry;

export function getComponentDefinition(componentType: string) {
  return componentRegistry[componentType as CmsComponentType] ?? null;
}

