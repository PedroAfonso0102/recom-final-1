export const ANALYTICS_EVENT_NAMES = [
  "lead_form_submit",
  "lead_form_error",
  "contact_phone_click",
  "contact_email_click",
  "whatsapp_click",
  "supplier_card_click",
  "supplier_detail_click",
  "supplier_catalog_click",
  "supplier_catalog_unavailable_click",
  "process_card_click",
  "process_supplier_click",
  "promotion_click",
  "promotion_contact_click",
  "external_link_click",
  "file_download",
] as const;

export type AnalyticsEventName = (typeof ANALYTICS_EVENT_NAMES)[number];

export type AnalyticsEventParam =
  | "page_location"
  | "page_type"
  | "placement"
  | "entity_type"
  | "entity_slug"
  | "cta_label"
  | "outbound_url"
  | "form_name"
  | "field_name"
  | "error_type";

export type AnalyticsEventContract = {
  name: AnalyticsEventName;
  description: string;
  requiredParams: AnalyticsEventParam[];
  optionalParams: AnalyticsEventParam[];
};

export type AnalyticsEventParams = Partial<Record<AnalyticsEventParam, string>>;

function event(input: AnalyticsEventContract): AnalyticsEventContract {
  return input;
}

export const analyticsEvents = {
  lead_form_submit: event({
    name: "lead_form_submit",
    description: "Lead enviado com sucesso por formulario publico.",
    requiredParams: ["page_location", "page_type", "form_name"],
    optionalParams: ["placement", "entity_type", "entity_slug", "cta_label"],
  }),
  lead_form_error: event({
    name: "lead_form_error",
    description: "Erro de validacao ou servidor em formulario publico.",
    requiredParams: ["page_location", "page_type", "form_name", "error_type"],
    optionalParams: ["field_name", "placement"],
  }),
  contact_phone_click: event({
    name: "contact_phone_click",
    description: "Clique em link telefonico.",
    requiredParams: ["page_location", "placement"],
    optionalParams: ["page_type", "cta_label"],
  }),
  contact_email_click: event({
    name: "contact_email_click",
    description: "Clique em link de e-mail.",
    requiredParams: ["page_location", "placement"],
    optionalParams: ["page_type", "cta_label"],
  }),
  whatsapp_click: event({
    name: "whatsapp_click",
    description: "Clique em link estruturado de WhatsApp.",
    requiredParams: ["page_location", "placement"],
    optionalParams: ["page_type", "entity_type", "entity_slug", "cta_label"],
  }),
  supplier_card_click: event({
    name: "supplier_card_click",
    description: "Clique em card de fornecedor.",
    requiredParams: ["page_location", "placement", "entity_slug"],
    optionalParams: ["page_type", "cta_label"],
  }),
  supplier_detail_click: event({
    name: "supplier_detail_click",
    description: "Clique para pagina individual de fornecedor.",
    requiredParams: ["page_location", "placement", "entity_slug"],
    optionalParams: ["page_type", "cta_label"],
  }),
  supplier_catalog_click: event({
    name: "supplier_catalog_click",
    description: "Clique em catalogo oficial de fornecedor.",
    requiredParams: ["page_location", "placement", "entity_slug", "outbound_url"],
    optionalParams: ["page_type", "cta_label"],
  }),
  supplier_catalog_unavailable_click: event({
    name: "supplier_catalog_unavailable_click",
    description: "Clique em fallback de contato quando catalogo nao esta disponivel.",
    requiredParams: ["page_location", "placement", "entity_slug"],
    optionalParams: ["page_type", "cta_label"],
  }),
  process_card_click: event({
    name: "process_card_click",
    description: "Clique em card ou link de processo.",
    requiredParams: ["page_location", "placement", "entity_slug"],
    optionalParams: ["page_type", "cta_label"],
  }),
  process_supplier_click: event({
    name: "process_supplier_click",
    description: "Clique em fornecedor relacionado dentro de pagina de processo.",
    requiredParams: ["page_location", "placement", "entity_slug"],
    optionalParams: ["page_type", "cta_label"],
  }),
  promotion_click: event({
    name: "promotion_click",
    description: "Clique em promocao ativa ou encerrada permitida.",
    requiredParams: ["page_location", "placement", "entity_slug"],
    optionalParams: ["page_type", "cta_label"],
  }),
  promotion_contact_click: event({
    name: "promotion_contact_click",
    description: "Clique em CTA de contato/orcamento de promocao.",
    requiredParams: ["page_location", "placement", "entity_slug"],
    optionalParams: ["page_type", "cta_label"],
  }),
  external_link_click: event({
    name: "external_link_click",
    description: "Clique em link externo rastreavel.",
    requiredParams: ["page_location", "placement", "outbound_url"],
    optionalParams: ["page_type", "entity_type", "entity_slug", "cta_label"],
  }),
  file_download: event({
    name: "file_download",
    description: "Download de arquivo publico aprovado.",
    requiredParams: ["page_location", "placement", "outbound_url"],
    optionalParams: ["page_type", "entity_type", "entity_slug", "cta_label"],
  }),
} satisfies Record<AnalyticsEventName, AnalyticsEventContract>;

export function getAnalyticsEvent(eventName: AnalyticsEventName): AnalyticsEventContract {
  return analyticsEvents[eventName];
}
