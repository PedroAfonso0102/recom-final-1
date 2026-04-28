export const colors = {
  background: "hsl(var(--background))",
  foreground: "hsl(var(--foreground))",
  brand: {
    blue: "var(--recom-blue)",
    red: "var(--recom-red)",
    graphite: "var(--recom-graphite)",
  },
  surface: {
    canvas: "hsl(var(--background))",
    muted: "var(--recom-gray-50)",
    panel: "#ffffff",
  },
  status: {
    draft: "#92400e",
    published: "#047857",
    scheduled: "#1d4ed8",
    archived: "#475569",
    expired: "#be123c",
    unavailable: "#64748b",
  },
  primary: {
    DEFAULT: "hsl(var(--primary))",
    foreground: "hsl(var(--primary-foreground))",
  },
  secondary: {
    DEFAULT: "hsl(var(--secondary))",
    foreground: "hsl(var(--secondary-foreground))",
  },
  muted: {
    DEFAULT: "hsl(var(--muted))",
    foreground: "hsl(var(--muted-foreground))",
  },
  accent: {
    DEFAULT: "hsl(var(--accent))",
    foreground: "hsl(var(--accent-foreground))",
  },
  border: "hsl(var(--border))",
  input: "hsl(var(--input))",
  ring: "hsl(var(--ring))",
} as const;

export type RecomColors = typeof colors;
