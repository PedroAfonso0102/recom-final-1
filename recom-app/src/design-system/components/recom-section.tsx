import * as React from "react";
import { cn } from "@/lib/utils";

interface RecomSectionProps extends React.HTMLAttributes<HTMLElement> {
  eyebrow?: string;
  title: string;
  description?: string;
  containerSize?: "main" | "editorial" | "wide";
}

const RecomSection = React.forwardRef<HTMLElement, RecomSectionProps>(
  ({ className, eyebrow, title, description, containerSize = "main", children, ...props }, ref) => {
    const maxWidthClass = {
      main: "max-w-[1180px]",
      editorial: "max-w-[760px]",
      wide: "max-w-[1280px]",
    }[containerSize];

    return (
      <section 
        ref={ref} 
        className={cn("py-20 md:py-24", className)} 
        {...props}
      >
        <div className={cn("mx-auto px-4 md:px-8", maxWidthClass)}>
          <div className="max-w-2xl mb-12">
            {eyebrow && (
              <p className="text-sm font-medium uppercase tracking-wide text-primary">
                {eyebrow}
              </p>
            )}
            <h2 className={cn(
              "mt-3 text-3xl md:text-4xl font-semibold tracking-tight text-foreground",
              !eyebrow && "mt-0"
            )}>
              {title}
            </h2>
            {description && (
              <p className="mt-4 text-base md:text-lg leading-7 text-muted-foreground">
                {description}
              </p>
            )}
          </div>
          {children}
        </div>
      </section>
    );
  }
);
RecomSection.displayName = "RecomSection";

export { RecomSection };
