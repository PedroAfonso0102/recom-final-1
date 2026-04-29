export const LeadStates = {
  new: "new",
  contacted: "contacted",
  qualified: "qualified",
  lost: "lost",
  archived: "archived",
} as const;

export type LeadState = (typeof LeadStates)[keyof typeof LeadStates];
