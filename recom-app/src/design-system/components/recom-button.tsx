import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const recomButtonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-bold uppercase tracking-wide transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      intent: {
        primary: "bg-primary-gradient text-primary-foreground shadow-sm hover:brightness-110",
        accent: "bg-accent text-accent-foreground shadow-sm hover:brightness-110",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        outline: "border border-border bg-background hover:bg-muted text-foreground/70 hover:text-foreground",
        ghost: "hover:bg-muted text-foreground/70 hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline lowercase tracking-normal font-semibold",
      },
      size: {
        sm: "h-8 px-4 text-[10px]",
        md: "h-11 px-6 text-[10px]",
        lg: "h-12 px-8 text-[11px]",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      intent: "primary",
      size: "md",
    },
  }
);

export interface RecomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof recomButtonVariants> {
  asChild?: boolean;
}

const RecomButton = React.forwardRef<HTMLButtonElement, RecomButtonProps>(
  ({ className, intent, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(recomButtonVariants({ intent, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
RecomButton.displayName = "RecomButton";

export { RecomButton };

