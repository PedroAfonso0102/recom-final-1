/**
 * AnalyticsEvents Registry
 * Taxonomia oficial de eventos para mensuração.
 */
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
};

if (typeof window !== 'undefined') {
    window.AnalyticsEvents = AnalyticsEvents;
}
