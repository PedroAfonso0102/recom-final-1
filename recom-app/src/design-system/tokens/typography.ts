export const typography = {
  fonts: {
    primary: '"Inter", system-ui, sans-serif',
  },
  weights: {
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },
  scale: {
    h1: {
      desktop: "56px",
      mobile: "40px",
    },
    h2: {
      desktop: "40px",
      mobile: "32px",
    },
    h3: "24px",
    body: "16px",
    small: "14px",
    caption: "12px",
  }
} as const;

export type RecomTypography = typeof typography;
