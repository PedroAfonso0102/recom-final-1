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
      <section ref={ref} className={cn("py-12 md:py-16", className)} {...props}>
        <div className={cn("mx-auto px-4 md:px-8", maxWidthClass)}>
          {(title || description) && (
            <div className="max-w-2xl">
              {eyebrow && (
                <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-recom-blue">
                  {eyebrow}
                </p>
              )}
              {title && <h2 className={cn("text-recom-graphite tracking-tight", !eyebrow && "mt-0")}>{title}</h2>}
              {description && <p className="mt-4 text-[16px] leading-relaxed text-muted-foreground">{description}</p>}
            </div>
          )}
          {!title && !description && eyebrow && (
            <div className="mb-6">
              <p className="text-[10px] font-bold uppercase tracking-wider text-primary/70">{eyebrow}</p>
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
