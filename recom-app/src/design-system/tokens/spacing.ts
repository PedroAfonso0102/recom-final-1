export const spacing = {
  fine: "4px",
  tight: "8px",
  close: "12px",
  base: "16px",
  standard: "24px",
  group: "32px",
  block: "48px",
  section: "64px",
  strong: "96px",
  hero: "128px",
} as const;

export const containers = {
  main: "1180px",
  editorial: "760px",
  wide: "1280px",
} as const;

export type RecomSpacing = typeof spacing;
