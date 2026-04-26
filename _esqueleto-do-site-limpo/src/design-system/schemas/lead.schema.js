/**
 * Lead Schema (Zod-like definition)
 */
export const leadSchema = {
    id: "uuid",
    name: "string",
    company: "string",
    email: "string",
    phone: "string",
    message: "string",
    source: "string", // ex: "contact-form"
    status: "LeadStates",
    createdAt: "timestamp",
    supplierInterest: "string",
    processInterest: "string",
};

if (typeof window !== 'undefined') window.RECOM_DS_LEAD_SCHEMA = leadSchema;
