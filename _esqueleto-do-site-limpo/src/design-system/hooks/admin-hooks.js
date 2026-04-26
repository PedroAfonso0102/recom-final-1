/**
 * AdminHooks Registry (Admin Area)
 * Padrão: [area].[page].[section].[component].[slot].[state]
 */
export const AdminHooks = {
    layout: {
        sidebar: "admin.global.sidebar",
        topbar: "admin.global.topbar",
        content: "admin.global.content",
    },
    leads: {
        hub: "admin.leads.hub",
        tableRow: "admin.leads.hub.table-row",
        detail: "admin.leads.detail",
        statusSelect: "admin.leads.detail.status-select",
    },
    promotions: {
        hub: "admin.promotions.hub",
        form: "admin.promotions.detail.form",
        dateEnd: "admin.promotions.detail.field.date-end",
    },
};

if (typeof window !== 'undefined') window.AdminHooks = AdminHooks;
