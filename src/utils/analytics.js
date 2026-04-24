/**
 * Analytics helpers.
 * Keeps form and CTA events consistent while avoiding PII in tracking payloads.
 */

const getPageLocation = () => {
  if (typeof window === 'undefined' || !window.location) {
    return '';
  }

  return window.location.href;
};

export const trackEvent = (eventName, eventParams = {}) => {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: eventName,
      ...eventParams,
    });
  }

  if (import.meta.env.DEV) {
    console.log(`[Analytics Stub] Event: ${eventName}`, eventParams);
  }
};

export const trackLeadGen = (method, formName = '', extraParams = {}) => {
  trackEvent('generate_lead', {
    lead_method: method,
    form_name: formName,
    page_location: getPageLocation(),
    ...extraParams,
  });
};

export const trackContactFormInvalid = ({
  errorTypes = [],
  formName = 'contact_orcamento',
  endpointAvailable = false,
  processInterest = '',
  supplierInterest = '',
} = {}) => {
  trackEvent('contact_form_invalid', {
    form_name: formName,
    page_location: getPageLocation(),
    error_types: errorTypes.slice(0, 6),
    endpoint_available: endpointAvailable,
    supplier_interest: supplierInterest || 'none',
    process_interest: processInterest || 'none',
  });
};

export const trackContactFormError = ({
  errorType = 'unknown',
  formName = 'contact_orcamento',
  endpointAvailable = false,
  processInterest = '',
  supplierInterest = '',
} = {}) => {
  trackEvent('contact_form_error', {
    form_name: formName,
    page_location: getPageLocation(),
    error_type: errorType,
    endpoint_available: endpointAvailable,
    supplier_interest: supplierInterest || 'none',
    process_interest: processInterest || 'none',
  });
};

export const trackContactFallbackClick = (channel, context = {}) => {
  trackEvent('contact_fallback_click', {
    channel,
    form_name: context.formName || 'contact_orcamento',
    page_location: getPageLocation(),
    reason: context.reason || 'fallback',
    supplier_interest: context.supplierInterest || 'none',
    process_interest: context.processInterest || 'none',
  });
};

export const trackOutboundLink = (url, linkType) => {
  trackEvent('outbound_click', {
    outbound_url: url,
    link_type: linkType,
    page_location: getPageLocation(),
  });
};

export const trackDownload = (fileName, documentType) => {
  trackEvent('file_download', {
    file_name: fileName,
    document_type: documentType,
    page_location: getPageLocation(),
  });
};
