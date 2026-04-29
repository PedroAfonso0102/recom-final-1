import {
  ANALYTICS_EVENT_NAMES,
  analyticsEvents,
  getAnalyticsEvent,
  type AnalyticsEventName,
} from "./analytics-events";

const EXPECTED_EVENTS = [
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
] as const satisfies readonly AnalyticsEventName[];

for (const eventName of EXPECTED_EVENTS) {
  const event = getAnalyticsEvent(eventName);

  if (event.name !== eventName || analyticsEvents[eventName].name !== eventName) {
    throw new Error(`${eventName} is not registered correctly.`);
  }
}

if (ANALYTICS_EVENT_NAMES.length !== EXPECTED_EVENTS.length) {
  throw new Error("Analytics event registry is out of sync with the public showcase contract.");
}
