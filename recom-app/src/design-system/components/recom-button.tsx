import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const recomButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      intent: {
        primary: "bg-recom-blue text-primary-foreground shadow-sm hover:brightness-110",
        accent: "bg-recom-red text-accent-foreground shadow-sm hover:brightness-110",
        secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200",
        outline:
          "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300",
        ghost: "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
        link: "text-recom-blue underline-offset-4 hover:underline",
        dark: "bg-slate-900 text-white shadow-sm hover:bg-black",
      },
      size: {
        sm: "h-9 px-4 text-xs",
        md: "h-10 px-5 text-sm",
        lg: "h-12 px-8 text-base",
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
    return <Comp ref={ref} className={cn(recomButtonVariants({ intent, size, className }))} {...props} />;
  }
);
RecomButton.displayName = "RecomButton";

export { RecomButton };
