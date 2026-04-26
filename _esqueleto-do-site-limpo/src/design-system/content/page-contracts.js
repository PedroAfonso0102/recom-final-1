/**
 * PageContracts
 * Define os blocos editáveis e campos por página.
 */
export const PageContracts = {
    home: {
        route: "/",
        editableBlocks: {
            hero: { fields: ["title", "subtitle", "primaryCta"] },
            trustProof: { fields: ["title", "items"] },
            suppliersPreview: { fields: ["title", "description"] },
        },
    },
    supplierDetail: {
        route: "/fornecedores/[slug].html",
        editableBlocks: {
            header: { fields: ["name", "shortDescription", "logo"] },
            content: { fields: ["hero", "highlights", "faq", "quotationGuide"] },
        },
    },
    processDetail: {
        route: "/processos/[slug].html",
        editableBlocks: {
            header: { fields: ["name", "hero"] },
            content: { fields: ["applications", "brands", "faq"] },
        },
    },
};

if (typeof window !== 'undefined') window.PageContracts = PageContracts;
