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
    description: "Banner de destaque com título, CTA e imagem ou carrossel.",
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
      showCarousel: true,
      variant: "default",
      carouselSpeed: 5000,
    },
    fields: [
      { name: "eyebrow", label: "Eyebrow", type: "text", description: "Texto curto acima do título." },
      { name: "title", label: "Título H1", type: "text", required: true },
      { name: "subtitle", label: "Subtítulo", type: "textarea", rows: 3 },
      { name: "primaryCtaLabel", label: "Botão Principal", type: "text" },
      { name: "primaryCtaHref", label: "Link Botão Principal", type: "text" },
      { name: "secondaryCtaLabel", label: "Botão Secundário", type: "text" },
      { name: "secondaryCtaHref", label: "Link Botão Secundário", type: "text" },
      { name: "imageUrl", label: "Imagem de Fundo", type: "media", description: "Imagem estática caso o carrossel esteja desativado." },
      { name: "showCarousel", label: "Ativar Carrossel", type: "checkbox" },
      { name: "carouselSpeed", label: "Velocidade (ms)", type: "number", description: "Tempo entre slides (ex: 5000)." },
      {
        name: "variant",
        label: "Estilo Visual",
        type: "select",
        options: [
          { label: "Padrão (Lado a Lado)", value: "default" },
          { label: "Split (Dividido)", value: "split" },
          { label: "Compacto (Centralizado)", value: "compact" },
          { label: "Full Width (Tela Cheia)", value: "full" },
          { label: "Simples (Apenas Texto)", value: "simple" },
        ],
      },
    ],
    allowedVariants: ["default", "split", "compact", "full", "simple"],
  },
  TextSection: {
    type: "TextSection",
    label: "Texto Institucional",
    description: "Bloco para conteúdos textuais longos ou explicativos.",
    category: "content",
    component: TextSectionBlock,
    schema: textSectionSchema,
    defaultProps: {
      title: "",
      body: "",
      variant: "default",
    },
    fields: [
      { name: "title", label: "Título da Seção", type: "text" },
      { name: "body", label: "Conteúdo (Markdown)", type: "textarea", required: true, rows: 10 },
      {
        name: "variant",
        label: "Estilo",
        type: "select",
        options: [
          { label: "Padrão", value: "default" },
          { label: "Destaque (Fundo Cinza)", value: "panel" },
        ],
      },
    ],
    allowedVariants: ["default", "panel"],
  },
  CtaSection: {
    type: "CtaSection",
    label: "Chamada para Ação (CTA)",
    description: "Seção de conversão com fundo contrastante e botões.",
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
      { name: "eyebrow", label: "Texto de Apoio", type: "text" },
      { name: "title", label: "Título de Impacto", type: "text", required: true },
      { name: "description", label: "Breve Descrição", type: "textarea", required: true, rows: 3 },
      { name: "primaryCtaLabel", label: "Texto Botão 1", type: "text", required: true },
      { name: "primaryCtaHref", label: "Link Botão 1", type: "text", required: true },
      { name: "secondaryCtaLabel", label: "Texto Botão 2", type: "text" },
      { name: "secondaryCtaHref", label: "Link Botão 2", type: "text" },
      {
        name: "variant",
        label: "Tema",
        type: "select",
        options: [
          { label: "Escuro (Padrão RECOM)", value: "default" },
          { label: "Claro", value: "light" },
          { label: "Azul Primário", value: "primary" },
          { label: "Preto Absoluto", value: "dark" },
        ],
      },
    ],
    allowedVariants: ["default", "light", "primary", "dark"],
  },
  GridSection: {
    type: "GridSection",
    label: "Grade de Recursos",
    description: "Exibe diferenciais, serviços ou links em colunas.",
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
      { name: "eyebrow", label: "Eyebrow", type: "text" },
      { name: "title", label: "Título Principal", type: "text" },
      { name: "description", label: "Texto Introdutório", type: "textarea" },
      {
        name: "columns",
        label: "Número de Colunas",
        type: "select",
        options: [
          { label: "2 Colunas", value: "2" },
          { label: "3 Colunas", value: "3" },
          { label: "4 Colunas", value: "4" },
          { label: "5 Colunas", value: "5" },
          { label: "6 Colunas", value: "6" },
        ],
      },
      {
        name: "variant",
        label: "Estilo do Cartão",
        type: "select",
        options: [
          { label: "Padrão (Bordas)", value: "default" },
          { label: "Cartão Branco", value: "white" },
          { label: "Sutil (Fundo Cinza)", value: "gray" },
          { label: "Destaque (Azul)", value: "primary" },
        ],
      },
      {
        name: "items",
        label: "Adicionar Itens",
        type: "list",
        itemFields: [
          { name: "title", label: "Título do Item", type: "text", required: true },
          { name: "description", label: "Descrição", type: "textarea" },
          {
            name: "icon",
            label: "Ícone",
            type: "select",
            options: [
              { label: "Segurança (Escudo)", value: "shield" },
              { label: "Sucesso (Check)", value: "check" },
              { label: "Indústria (Fábrica)", value: "factory" },
              { label: "Suporte (Chave)", value: "wrench" },
              { label: "Localização (Pin)", value: "pin" },
              { label: "Produto (Caixa)", value: "package" },
            ],
          },
          { name: "linkLabel", label: "Texto do Link", type: "text" },
          { name: "linkHref", label: "URL do Link", type: "text" },
        ],
      },
    ],
  },
  TrustLogos: {
    type: "TrustLogos",
    label: "Logotipos de Fornecedores",
    description: "Vitrine de marcas oficiais representadas pela RECOM.",
    category: "content",
    component: TrustLogosBlock,
    schema: trustLogosSchema,
    defaultProps: {
      title: "Nossos Parceiros Oficiais",
      showAll: true,
      grayscale: true,
    },
    fields: [
      { name: "title", label: "Título Superior", type: "text" },
      { name: "showAll", label: "Mostrar Todos", type: "checkbox", description: "Se desmarcado, use IDs para filtrar." },
      { name: "grayscale", label: "Efeito P&B (Grayscale)", type: "checkbox" },
    ],
  },
} satisfies Record<string, EditableComponentDefinition>;

export type CmsComponentType = keyof typeof componentRegistry;

export function getComponentDefinition(componentType: string) {
  return componentRegistry[componentType as CmsComponentType] ?? null;
}
