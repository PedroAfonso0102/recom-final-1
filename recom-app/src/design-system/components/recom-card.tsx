import * as React from "react";
import { cn } from "@/lib/utils";

const RecomCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border border-border bg-background shadow-sm transition-all duration-200 hover:border-primary/30 hover:shadow-md",
      className
    )}
    {...props}
  />
));
RecomCard.displayName = "RecomCard";

const RecomCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
RecomCardHeader.displayName = "RecomCardHeader";

const RecomCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
RecomCardTitle.displayName = "RecomCardTitle";

const RecomCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
RecomCardDescription.displayName = "RecomCardDescription";

const RecomCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
RecomCardContent.displayName = "RecomCardContent";

const RecomCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
RecomCardFooter.displayName = "RecomCardFooter";

export { 
  RecomCard, 
  RecomCardHeader, 
  RecomCardFooter, 
  RecomCardTitle, 
  RecomCardDescription, 
  RecomCardContent 
};
