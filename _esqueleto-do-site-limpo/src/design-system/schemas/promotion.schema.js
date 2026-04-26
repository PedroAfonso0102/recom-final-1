/**
 * Promotion Schema (Zod-like definition)
 */
export const promotionSchema = {
    id: "uuid",
    title: "string",
    description: "string",
    image: "string",
    startDate: "date",
    endDate: "date",
    status: "PromotionStates",
    discountType: "string",
    discountValue: "number",
};

if (typeof window !== 'undefined') window.RECOM_DS_PROMOTION_SCHEMA = promotionSchema;
