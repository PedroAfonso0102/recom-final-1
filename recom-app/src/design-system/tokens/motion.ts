export const motion = {
  duration: {
    fast: "120ms",
    base: "180ms",
    slow: "240ms",
  },
  easing: {
    standard: "cubic-bezier(0.2, 0, 0, 1)",
    decel: "cubic-bezier(0, 0, 0.2, 1)",
  },
  distance: {
    tiny: "2px",
    small: "4px",
    medium: "8px",
  },
} as const;

export type RecomMotion = typeof motion;
