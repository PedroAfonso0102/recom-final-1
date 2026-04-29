import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { LayoutPreset } from "./types";

type SectionLayoutProps = {
  eyebrow?: string | null;
  title?: string | null;
  description?: string | null;
  layoutPreset?: LayoutPreset | null;
  inverse?: boolean;
  children: ReactNode;
  className?: string;
};

export function SectionLayout({
  eyebrow,
  title,
  description,
  layoutPreset = "default",
  inverse = false,
  children,
  className,
}: SectionLayoutProps) {
  const compact = layoutPreset === "compact" || layoutPreset === "dense";

  return (
    <div className={cn("container-recom", compact ? "py-10 md:py-12" : "py-12 md:py-16", className)}>
      {(eyebrow || title || description) && (
        <div className={cn("max-w-3xl", layoutPreset === "feature" && "mx-auto text-center")}>
          {eyebrow && (
            <p className={cn("mb-3 text-[11px] font-bold uppercase tracking-[0.28em]", inverse ? "text-white/55" : "text-recom-blue")}>
              {eyebrow}
            </p>
          )}
          {title && (
            <h2 className={cn("tracking-tight", inverse ? "text-white" : "text-recom-graphite")}>
              {title}
            </h2>
          )}
          {description && (
            <p className={cn("mt-4 text-[16px] leading-relaxed", inverse ? "text-white/75" : "text-muted-foreground")}>
              {description}
            </p>
          )}
        </div>
      )}
      <div className={cn(eyebrow || title || description ? (compact ? "mt-7" : "mt-10") : "")}>{children}</div>
    </div>
  );
}

