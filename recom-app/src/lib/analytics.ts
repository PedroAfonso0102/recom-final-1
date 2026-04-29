/**
 * Utilitários de Analytics para RECOM.
 * Focado em rastreamento mínimo e seguro (no-op se GA4 ausente).
 */

type TrackEventParams = {
  action: string;
  category?: string;
  label?: string;
  value?: number;
  [key: string]: any;
};

/**
 * Dispara um evento para o Google Analytics (gtag) se disponível.
 */
export function trackEvent({ action, category, label, value, ...rest }: TrackEventParams) {
  if (typeof window === "undefined") return;

  // Verifica se gtag está definido no window (GA4 carregado)
  const gtag = (window as any).gtag;

  if (typeof gtag === "function") {
    try {
      gtag("event", action, {
        event_category: category,
        event_label: label,
        value: value,
        ...rest,
      });
      if (process.env.NODE_ENV === "development") {
        console.log(`[Analytics] Event tracked: ${action}`, { category, label, value, ...rest });
      }
    } catch (err) {
      console.error("[Analytics] Error tracking event:", err);
    }
  } else if (process.env.NODE_ENV === "development") {
    console.warn(`[Analytics] gtag not found. Event ${action} suppressed.`, { category, label, value, ...rest });
  }
}

/**
 * Hook ou Helper para ações comuns de conversão.
 */
export const analytics = {
  // Leads
  leadFormSubmit: (source: string) => trackEvent({ action: "lead_form_submit", category: "lead", label: source }),
  leadFormError: (source: string, error: string) => trackEvent({ action: "lead_form_error", category: "lead", label: source, error_msg: error }),
  
  // Contato
  contactPhoneClick: (phone: string) => trackEvent({ action: "contact_phone_click", category: "contact", label: phone }),
  contactEmailClick: (email: string) => trackEvent({ action: "contact_email_click", category: "contact", label: email }),
  whatsappClick: (location: string) => trackEvent({ action: "whatsapp_click", category: "contact", label: location }),
  
  // Catálogos e Fornecedores
  supplierCatalogClick: (supplierName: string) => trackEvent({ action: "supplier_catalog_click", category: "conversion", label: supplierName }),
  externalLinkClick: (url: string, context: string) => trackEvent({ action: "external_link_click", category: "engagement", label: url, context }),
};
