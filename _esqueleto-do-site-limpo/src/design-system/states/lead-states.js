/**
 * LeadStates Registry
 */
export const LeadStates = {
    new: "new",
    open: "open",
    contacted: "contacted",
    qualified: "qualified",
    negotiation: "negotiation",
    won: "won",
    lost: "lost",
    junk: "junk",
};

if (typeof window !== 'undefined') window.RECOM_DS_LEAD_STATES = LeadStates;
