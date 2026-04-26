/**
 * ComponentContracts
 * Define campos, estados e eventos para cada componente.
 */
export const ComponentContracts = {
    SupplierCard: {
        requiredFields: ["name", "slug", "shortDescription", "status"],
        optionalFields: ["logoUrl", "catalogUrl", "relatedProcesses"],
        states: ["default", "hover", "focus", "catalog_unavailable", "loading", "error"],
        events: ["supplier_card_click", "supplier_catalog_click"],
        hooks: ["suppliers.card", "suppliers.catalog-link", "suppliers.internal-link"],
    },

    ProcessCard: {
        requiredFields: ["name", "slug", "description"],
        optionalFields: ["imageUrl", "relatedSuppliers"],
        states: ["default", "hover", "focus"],
        events: ["process_card_click"],
        hooks: ["processes.card"],
    },

    ContactForm: {
        requiredFields: ["name", "company", "email", "message"],
        optionalFields: ["phone", "supplierInterest", "processInterest"],
        states: ["empty", "focused", "invalid", "submitting", "success", "error"],
        events: ["generate_lead_form_submit", "form_error"],
        hooks: ["contact.form", "contact.form.field.name", "contact.form.submit"],
    },
};

if (typeof window !== 'undefined') {
    window.ComponentContracts = ComponentContracts;
}
