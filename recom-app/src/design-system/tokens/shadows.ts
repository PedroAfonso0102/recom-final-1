export const shadows = {
  none: "none",
  recom: "var(--shadow-recom)",
  card: "var(--shadow-recom-card)",
  hover: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
} as const;

export type RecomShadows = typeof shadows;
