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
    <section className={cn("relative overflow-hidden bg-background py-16 md:py-24 lg:py-32", className)}>
      <div className="mx-auto max-w-[1180px] px-4 md:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16">
          <div className="flex-1 max-w-2xl">
            {eyebrow && (
              <div className="mb-6 inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                {eyebrow}
              </div>
            )}
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:leading-[1.1]">
              {title}
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground md:text-xl">
              {description}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              {primaryCta && (
                <RecomButton asChild size="lg" intent="primary">
                  <a href={primaryCta.href}>{primaryCta.label}</a>
                </RecomButton>
              )}
              {secondaryCta && (
                <RecomButton asChild size="lg" intent="outline">
                  <a href={secondaryCta.href}>{secondaryCta.label}</a>
                </RecomButton>
              )}
            </div>
          </div>
          {image && (
            <div className="mt-16 flex-1 lg:mt-0">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-muted lg:aspect-square">
                {image}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
