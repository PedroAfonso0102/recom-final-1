import * as React from "react";
import { RecomButton } from "./recom-button";
import { cn } from "@/lib/utils";

interface RecomHeroProps {
  eyebrow?: string;
  title: React.ReactNode;
  description: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  image?: React.ReactNode;
  className?: string;
}

export function RecomHero({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  image,
  className
}: RecomHeroProps) {
  return (
    <section className={cn("relative w-full py-10 md:py-12 lg:py-14 overflow-hidden bg-background", className)}>
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="container relative z-10 mx-auto px-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-12">
          <div className="flex-1 text-left">
            {eyebrow && (
              <div className="mb-4 flex items-center gap-3">
                <span className="h-px w-8 bg-primary/30" />
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary/80">
                  {eyebrow}
                </span>
              </div>
            )}
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:leading-[1.1] text-slate-900 max-w-2xl">
              {title}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg max-w-xl">
              {description}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              {primaryCta && (
                <RecomButton asChild size="lg" intent="primary" className="min-w-[180px] shadow-sm">
                  <a href={primaryCta.href}>{primaryCta.label}</a>
                </RecomButton>
              )}
              {secondaryCta && (
                <RecomButton asChild size="lg" intent="outline" className="min-w-[180px]">
                  <a href={secondaryCta.href}>{secondaryCta.label}</a>
                </RecomButton>
              )}
            </div>
          </div>
          {image && (
            <div className="mt-10 flex-1 lg:mt-0">
              <div className="relative aspect-[4/3] max-h-[440px] w-full overflow-hidden rounded-md bg-white border border-border/60 shadow-premium group">
                {image}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

