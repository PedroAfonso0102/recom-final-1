import Link from "next/link";
import { PackageSearch } from "lucide-react";
import { cn } from "@/lib/utils";
import { RecomButton } from "./recom-button";

interface EmptyStateProps {
  title: string;
  description: string;
  primaryCta?: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
  className?: string;
  dataHook?: string;
}

export function EmptyState({
  title,
  description,
  primaryCta,
  secondaryCta,
  className,
  dataHook = "public.global.empty-state",
}: EmptyStateProps) {
  return (
    <div
      data-hook={dataHook}
      className={cn(
        "rounded-xl border border-dashed border-recom-border bg-white px-6 py-12 text-center shadow-recom-card",
        className
      )}
    >
      <PackageSearch className="mx-auto mb-5 h-10 w-10 text-recom-blue/40" aria-hidden="true" />
      <h3 className="text-[16px] font-bold uppercase tracking-[0.14em] text-recom-graphite">
        {title}
      </h3>
      <p className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
        {description}
      </p>
      {(primaryCta || secondaryCta) && (
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          {primaryCta && (
            <RecomButton asChild size="md" intent="primary" className="h-11 px-6">
              <Link href={primaryCta.href}>{primaryCta.label}</Link>
            </RecomButton>
          )}
          {secondaryCta && (
            <RecomButton asChild size="md" intent="outline" className="h-11 px-6">
              <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
            </RecomButton>
          )}
        </div>
      )}
    </div>
  );
}
