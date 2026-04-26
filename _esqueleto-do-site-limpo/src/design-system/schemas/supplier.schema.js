/**
 * Supplier Schema
 * Simulação de validação Zod para ambiente Vanilla.
 */
export const supplierSchema = {
    validate: (data) => {
        const required = ["id", "name", "slug", "shortDescription"];
        const missing = required.filter(field => !data[field]);
        if (missing.length > 0) {
            console.warn(`[Schema Warning] Supplier faltando campos: ${missing.join(', ')}`);
            return false;
        }
        return true;
    }
};

if (typeof window !== 'undefined') window.RECOM_SCHEMAS = { supplierSchema };
