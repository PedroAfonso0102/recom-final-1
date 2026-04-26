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
    <section className={cn("relative w-full py-16 md:py-20 overflow-hidden bg-recom-graphite text-white", className)}>
      {/* Industrial Background with Overlay */}
      <div className="absolute inset-0 z-0 opacity-40">
        <img 
          src="/assets/images/hero-industrial.png" 
          alt="Usinagem Industrial" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-industrial-overlay" />
      </div>
      
      {/* Pattern for extra texture */}
      <div className="absolute inset-0 z-1 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
      
      <div className="container-recom relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16">
          <div className="flex-1 text-left">
            {eyebrow && (
              <div className="mb-6 flex items-center gap-4">
                <span className="h-px w-10 bg-recom-red" />
                <span className="text-[12px] font-bold uppercase tracking-[0.3em] text-white/90">
                  {eyebrow}
                </span>
              </div>
            )}
            <h1 className="text-white mb-6">
              {title}
            </h1>
            <p className="mt-6 text-[17px] md:text-[19px] leading-relaxed text-white/70 max-w-xl">
              {description}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row flex-wrap gap-5">
              {primaryCta && (
                <RecomButton asChild size="lg" intent="accent" className="w-full sm:w-auto sm:min-w-[220px]">
                  <a href={primaryCta.href}>{primaryCta.label}</a>
                </RecomButton>
              )}
              {secondaryCta && (
                <RecomButton asChild size="lg" intent="outline" className="w-full sm:w-auto sm:min-w-[220px] bg-transparent border-white/30 text-white hover:bg-white/10 hover:text-white">
                  <a href={secondaryCta.href}>{secondaryCta.label}</a>
                </RecomButton>
              )}
            </div>
          </div>
          {image && (
            <div className="mt-12 flex-1 lg:mt-0 hidden md:block">
              <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-white/10 shadow-2xl backdrop-blur-sm bg-white/5 p-1">
                <div className="rounded-md overflow-hidden h-full w-full">
                  {image}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

