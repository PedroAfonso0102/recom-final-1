export const UIStates = {
  default: "default",
  hover: "hover",
  focus: "focus",
  active: "active",
  disabled: "disabled",
  loading: "loading",
  success: "success",
  error: "error",
  empty: "empty",
  unavailable: "unavailable",
} as const;

export type UIState = (typeof UIStates)[keyof typeof UIStates];
