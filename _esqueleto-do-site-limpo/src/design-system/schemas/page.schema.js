/**
 * Page Schema (Zod-like definition)
 */
export const pageSchema = {
    id: "string",
    title: "string",
    slug: "string",
    seo: "SeoContracts",
    content: "object", // Variável por página
    status: "string",
};

if (typeof window !== 'undefined') window.RECOM_DS_PAGE_SCHEMA = pageSchema;
