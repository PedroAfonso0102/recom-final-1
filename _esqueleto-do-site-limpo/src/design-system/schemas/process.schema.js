/**
 * Process Schema (Zod-like definition)
 */
export const processSchema = {
    id: "uuid",
    name: "string",
    slug: "string",
    description: "string",
    relatedSuppliers: "array(string)",
    primaryCta: "object",
    secondaryCta: "object",
};

if (typeof window !== 'undefined') window.RECOM_DS_PROCESS_SCHEMA = processSchema;
