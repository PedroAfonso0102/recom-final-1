import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const recomButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md font-bold uppercase tracking-[0.12em] transition-[background-color,color,border-color,box-shadow,transform] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      intent: {
        primary: "bg-recom-blue text-primary-foreground shadow-recom-soft hover:bg-recom-blue-dark",
        accent: "bg-recom-red text-accent-foreground shadow-recom-soft hover:brightness-110",
        secondary: "bg-secondary text-secondary-foreground hover:bg-recom-gray-200",
        outline:
          "border border-recom-border bg-background text-recom-graphite/80 hover:border-recom-blue/25 hover:bg-recom-gray-50 hover:text-recom-graphite",
        ghost: "text-recom-graphite/70 hover:bg-recom-gray-50 hover:text-recom-graphite",
        link: "text-recom-blue underline-offset-4 hover:underline",
        dark: "bg-recom-graphite text-white shadow-recom-soft hover:bg-black",
      },
      size: {
        sm: "h-9 px-4 text-[10px]",
        md: "h-11 px-6 text-[10px]",
        lg: "h-12 px-8 text-[12px]",
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
