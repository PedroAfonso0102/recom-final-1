/**
 * PromotionStates Registry
 */
export const PromotionStates = {
    draft: "draft",
    active: "active",
    scheduled: "scheduled",
    expired: "expired",
    archived: "archived",
};

if (typeof window !== 'undefined') window.RECOM_DS_PROMOTION_STATES = PromotionStates;
