import Link from "next/link";
import type { ReactNode } from "react";
import { TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import { RecomButton } from "./recom-button";

interface ErrorStateProps {
  title: string;
  description: string;
  children?: ReactNode;
  primaryCta?: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
  retryLabel?: string;
  onRetry?: () => void;
  className?: string;
  dataHook?: string;
}

export function ErrorState({
  title,
  description,
  children,
  primaryCta,
  secondaryCta,
  retryLabel = "Tentar novamente",
  onRetry,
  className,
  dataHook = "public.global.error-state",
}: ErrorStateProps) {
  return (
    <div
      data-hook={dataHook}
      className={cn(
        "rounded-xl border border-recom-red/20 bg-white px-6 py-12 text-center shadow-recom-card",
        className
      )}
    >
      <TriangleAlert className="mx-auto mb-5 h-10 w-10 text-recom-red" aria-hidden="true" />
      <h3 className="text-[16px] font-bold uppercase tracking-[0.14em] text-recom-graphite">
        {title}
      </h3>
      <p className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
        {description}
      </p>
      {children}
      {(primaryCta || secondaryCta || onRetry) && (
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          {primaryCta && (
            <RecomButton asChild size="md" intent="accent" className="h-11 px-6">
              <Link href={primaryCta.href}>{primaryCta.label}</Link>
            </RecomButton>
          )}
          {secondaryCta && (
            <RecomButton asChild size="md" intent="outline" className="h-11 px-6">
              <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
            </RecomButton>
          )}
          {onRetry && (
            <RecomButton type="button" size="md" intent="primary" className="h-11 px-6" onClick={onRetry}>
              {retryLabel}
            </RecomButton>
          )}
        </div>
      )}
    </div>
  );
}
