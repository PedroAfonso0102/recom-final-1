"use client";

/**
 * Utilitários para rastreamento de eventos no lado do cliente.
 * Design defensivo: não quebra se o GA4 não estiver carregado.
 */

type AnalyticsParams = Record<string, string | number | boolean | undefined | null>;

export const analytics = {
  /**
   * Dispara um evento para o Google Analytics (gtag) se disponível.
   */
  trackEvent: (action: string, params?: AnalyticsParams) => {
    if (typeof window === "undefined") return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const gtag = (window as any).gtag;

    if (typeof gtag === "function") {
      try {
        gtag("event", action, params);
        if (process.env.NODE_ENV === "development") {
          console.log(`[Analytics] Event tracked: ${action}`, params);
        }
      } catch (err) {
        console.error("[Analytics] Error tracking event:", err);
      }
    } else if (process.env.NODE_ENV === "development") {
      console.warn(`[Analytics] gtag not found. Event ${action} suppressed.`, params);
    }
  },

  // Atalhos para eventos comuns
  leadFormSubmit: (source: string) => analytics.trackEvent("lead_form_submit", { event_category: "lead", event_label: source }),
  leadFormError: (source: string, error: string) => analytics.trackEvent("lead_form_error", { event_category: "lead", event_label: source, error_msg: error }),
  contactPhoneClick: (phone: string) => analytics.trackEvent("contact_phone_click", { event_category: "contact", event_label: phone }),
  contactEmailClick: (email: string) => analytics.trackEvent("contact_email_click", { event_category: "contact", event_label: email }),
  whatsappClick: (location: string) => analytics.trackEvent("whatsapp_click", { event_category: "contact", event_label: location }),
  supplierCatalogClick: (supplierName: string) => analytics.trackEvent("supplier_catalog_click", { event_category: "conversion", event_label: supplierName }),
  externalLinkClick: (url: string) => analytics.trackEvent("external_link_click", { event_category: "outbound", event_label: url }),
};
