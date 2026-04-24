/**
 * Analytics Utils
 * Etapa 6: "dataLayer stubs para futura integração com GA4/GTM"
 * Permite capturar eventos de conversão e intenção sem acoplamento rígido.
 */

export const trackEvent = (eventName, eventParams = {}) => {
  // Push to dataLayer if available (GTM pattern)
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: eventName,
      ...eventParams,
    });
  }

  // Fallback / Debug para console em ambiente de desenvolvimento
  if (import.meta.env.DEV) {
    console.log(`[Analytics Stub] Event: ${eventName}`, eventParams);
  }
};

// --- Funções Helper Específicas ---

export const trackLeadGen = (method, formName = '') => {
  trackEvent('generate_lead', {
    lead_method: method, // 'whatsapp', 'email', 'phone', 'form'
    form_name: formName,
  });
};

export const trackOutboundLink = (url, linkType) => {
  trackEvent('outbound_click', {
    outbound_url: url,
    link_type: linkType, // 'whatsapp', 'catalogo', 'social'
  });
};

export const trackDownload = (fileName, documentType) => {
  trackEvent('file_download', {
    file_name: fileName,
    document_type: documentType, // 'catalogo', 'manual'
  });
};
