export {
  ANALYTICS_EVENT_NAMES,
  analyticsEvents,
  getAnalyticsEvent,
  type AnalyticsEventContract,
  type AnalyticsEventName,
  type AnalyticsEventParams,
} from "@/design-system/events/analytics-events";

export const AnalyticsEvents = {
  leadFormSubmit: "lead_form_submit",
  formError: "lead_form_error",
  phoneClick: "contact_phone_click",
  emailClick: "contact_email_click",
  whatsappClick: "whatsapp_click",
  supplierCardClick: "supplier_card_click",
  supplierDetailClick: "supplier_detail_click",
  supplierCatalogClick: "supplier_catalog_click",
  supplierCatalogUnavailableClick: "supplier_catalog_unavailable_click",
  processCardClick: "process_card_click",
  processSupplierClick: "process_supplier_click",
  promotionClick: "promotion_click",
  promotionContactClick: "promotion_contact_click",
  externalLinkClick: "external_link_click",
  fileDownload: "file_download",
} as const;
