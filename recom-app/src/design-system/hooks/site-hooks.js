/**
 * SiteHooks Registry (Public Area)
 * Padrão: [area].[page].[section].[component].[slot].[state]
 */
export const SiteHooks = {
    layout: {
        header: "public.global.header",
        footer: "public.global.footer",
        main: "public.global.main",
        breadcrumb: "public.global.breadcrumb",
    },

    home: {
        hero: "public.home.hero",
        trustProof: "public.home.trust-proof",
        suppliersPreview: "public.home.suppliers-preview",
        processesPreview: "public.home.processes-preview",
        promotionsPreview: "public.home.promotions-preview",
        finalCta: "public.home.final-cta",
    },

    suppliers: {
        hub: "public.suppliers.hub",
        card: "public.suppliers.card",
        catalogLink: "public.suppliers.catalog-link",
        internalLink: "public.suppliers.internal-link",
        detailHero: "public.suppliers.detail.hero",
        resolvesSection: "public.suppliers.detail.resolves",
    },

    processes: {
        hub: "public.processes.hub",
        card: "public.processes.card",
        relatedSuppliers: "public.processes.related-suppliers",
        detailHero: "public.processes.detail.hero",
    },

    contact: {
        form: "public.contact.form",
        fieldName: "public.contact.form.field.name",
        fieldCompany: "public.contact.form.field.company",
        fieldEmail: "public.contact.form.field.email",
        submitButton: "public.contact.form.submit",
        successMessage: "public.contact.form.success",
        errorMessage: "public.contact.form.error",
    },
};

if (typeof window !== 'undefined') {
    window.SiteHooks = SiteHooks;
}
