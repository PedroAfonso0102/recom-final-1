import * as React from "react";
import { cn } from "@/lib/utils";

interface RecomSectionProps extends React.HTMLAttributes<HTMLElement> {
  eyebrow?: string;
  title?: string;
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
        className={cn("py-10 md:py-12", className)} 
        {...props}
      >
        <div className={cn("mx-auto px-4 md:px-8", maxWidthClass)}>
            {(title || description) && (
              <div className="max-w-2xl mb-6">
                {eyebrow && (
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-recom-blue mb-4">
                    {eyebrow}
                  </p>
                )}
                {title && (
                  <h2 className={cn(
                    "text-recom-graphite uppercase tracking-tight",
                    !eyebrow && "mt-0"
                  )}>
                    {title}
                  </h2>
                )}
                {description && (
                  <p className="mt-4 text-muted-foreground">
                    {description}
                  </p>
                )}
              </div>
            )}
            {!title && !description && eyebrow && (
              <div className="mb-6">
                <p className="text-[10px] font-bold uppercase tracking-wider text-primary/70">
                  {eyebrow}
                </p>
              </div>
            )}
          {children}
        </div>
      </section>
    );
  }
);
RecomSection.displayName = "RecomSection";

export { RecomSection };
