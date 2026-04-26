/**
 * ComponentVariants
 * Centraliza as classes de variantes para componentes reutilizáveis.
 * Mimicando o comportamento do CVA (Class Variance Authority).
 */
export const buttonVariants = {
    base: "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
    intent: {
        primary: "button", // Classes definidas no components.css
        secondary: "button secondary",
        ghost: "hover:bg-muted p-sm",
        link: "underline-offset-4 hover:underline text-brand",
    },
    size: {
        sm: "small",
        md: "",
        lg: "text-lg px-lg py-md",
    },
};

export const cardVariants = {
    base: "card",
    intent: {
        default: "card",
        featured: "card border-left-brand",
        muted: "card bg-muted",
    }
};

if (typeof window !== 'undefined') {
    window.ComponentVariants = { buttonVariants, cardVariants };
}
