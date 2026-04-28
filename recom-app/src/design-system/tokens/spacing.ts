export const spacing = {
  4: "4px",
  8: "8px",
  12: "12px",
  16: "16px",
  24: "24px",
  32: "32px",
  48: "48px",
  64: "64px",
  96: "96px",
  fine: "4px",
  tight: "8px",
  close: "12px",
  base: "16px",
  standard: "24px",
  group: "32px",
  block: "48px",
  section: "64px",
  strong: "96px",
} as const;

export const containers = {
  main: "1180px",
  editorial: "760px",
  wide: "1280px",
} as const;

export type RecomSpacing = typeof spacing;
