import * as React from "react";
import { cn } from "@/lib/utils";

const RecomCard = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-xl border border-border bg-white shadow-recom-card transition-all duration-300",
        className
      )}
      {...props}
    />
  )
);
RecomCard.displayName = "RecomCard";

const RecomCardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col gap-2 p-5 md:p-6", className)} {...props} />
  )
);
RecomCardHeader.displayName = "RecomCardHeader";

const RecomCardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("text-[19px] md:text-[22px] font-bold leading-tight tracking-tight text-recom-graphite", className)}
      {...props}
    />
  )
);
RecomCardTitle.displayName = "RecomCardTitle";

const RecomCardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-[15px] leading-relaxed text-muted-foreground", className)} {...props} />
  )
);
RecomCardDescription.displayName = "RecomCardDescription";

const RecomCardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("p-5 md:p-6 pt-0", className)} {...props} />
);
RecomCardContent.displayName = "RecomCardContent";

const RecomCardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center p-5 md:p-6 pt-0", className)} {...props} />
  )
);
RecomCardFooter.displayName = "RecomCardFooter";

export { RecomCard, RecomCardHeader, RecomCardFooter, RecomCardTitle, RecomCardDescription, RecomCardContent };
