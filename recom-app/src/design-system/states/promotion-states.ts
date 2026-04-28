export const PromotionStates = {
  draft: "draft",
  active: "active",
  scheduled: "scheduled",
  expired: "expired",
  archived: "archived",
} as const;

export type PromotionState = (typeof PromotionStates)[keyof typeof PromotionStates];
