"use client";

import { useCallback } from "react";

/**
 * Hook para disparar eventos de analytics e rastreamento.
 * Centraliza a lógica de integração com GTM (dataLayer) e GA4 (gtag).
 */
export function useAnalytics() {
  /**
   * Dispara um evento personalizado.
   */
  const trackEvent = useCallback((eventName: string, params?: Record<string, string | number | boolean | undefined | null>) => {
    // Log básico em desenvolvimento
    if (process.env.NODE_ENV === "development") {
      console.log(`[Analytics] Event: ${eventName}`, params);
    }

    if (typeof window === "undefined") return;

    // GA4 (gtag)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const gtag = (window as any).gtag;
    if (typeof gtag === "function") {
      gtag("event", eventName, params);
    }

    // GTM (dataLayer)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const win = window as any;
    if (win.dataLayer) {
      win.dataLayer.push({
        event: eventName,
        ...params,
      });
    }
  }, []);

  return {
    trackEvent,
    // Atalhos específicos solicitados
    leadFormSubmit: (source: string) => trackEvent("lead_form_submit", { source }),
    leadFormError: (source: string, error: string) => trackEvent("lead_form_error", { source, error_msg: error }),
    contactPhoneClick: (phone: string) => trackEvent("contact_phone_click", { phone }),
    contactEmailClick: (email: string) => trackEvent("contact_email_click", { email }),
    whatsappClick: (location: string) => trackEvent("whatsapp_click", { location }),
    supplierCatalogClick: (supplierName: string) => trackEvent("supplier_catalog_click", { supplier_name: supplierName }),
    externalLinkClick: (url: string, context: string) => trackEvent("external_link_click", { url, context }),
  };
}
