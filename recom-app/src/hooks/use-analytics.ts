"use client";

import { useCallback } from "react";

type EventParams = Record<string, string | number | boolean | undefined | null>;

/**
 * Hook para disparar eventos de analytics e rastreamento.
 * Centraliza a lógica de integração com GTM (dataLayer) ou outros serviços.
 */
export function useAnalytics() {
  /**
   * Dispara um evento personalizado.
   * Se houver um dataLayer (GTM), envia para lá. Caso contrário, apenas loga em desenvolvimento.
   */
  const trackEvent = useCallback((eventName: string, params?: EventParams) => {
    // Log básico em desenvolvimento
    if (process.env.NODE_ENV === "development") {
      console.log(`[Analytics] Event: ${eventName}`, params);
    }

    // Integração com dataLayer (GTM/GA4)
    if (typeof window !== "undefined" && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: eventName,
        ...params,
      });
    }
  }, []);

  /**
   * Atalho para rastreamento de cliques em CTAs.
   */
  const trackCtaClick = useCallback(
    (label: string, href: string, section?: string) => {
      trackEvent("cta_click", {
        cta_label: label,
        cta_href: href,
        section_name: section,
      });
    },
    [trackEvent]
  );

  /**
   * Atalho para rastreamento de visualização de seções (impressions).
   */
  const trackSectionView = useCallback(
    (sectionName: string, componentType: string) => {
      trackEvent("section_view", {
        section_name: sectionName,
        component_type: componentType,
      });
    },
    [trackEvent]
  );

  return {
    trackEvent,
    trackCtaClick,
    trackSectionView,
  };
}
