export const AnalyticsEvents = {
  leadFormSubmit: "generate_lead_form_submit",
  formError: "form_error",
  phoneClick: "contact_phone_click",
  emailClick: "contact_email_click",
  whatsappClick: "whatsapp_click",
  supplierCardClick: "supplier_card_click",
  supplierCatalogClick: "supplier_catalog_click",
  processCardClick: "process_card_click",
  promotionClick: "promotion_click",
  fileDownload: "file_download",
  externalCatalogUnavailableClick: "external_catalog_unavailable_click",
} as const;

export type AnalyticsEventName = (typeof AnalyticsEvents)[keyof typeof AnalyticsEvents];

export type AnalyticsEventParams = {
  page_location?: string;
  placement?: string;
  entity_type?: "supplier" | "process" | "promotion" | "page";
  entity_slug?: string;
  cta_label?: string;
  outbound_url?: string;
  form_name?: string;
  field_name?: string;
  error_type?: string;
};
