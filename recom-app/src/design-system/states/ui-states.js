/**
 * UIStates
 * Vocabulário oficial de estados de componentes.
 */
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
};

if (typeof window !== 'undefined') {
    window.UIStates = UIStates;
}
