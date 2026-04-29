import * as React from "react";
import Image from "next/image";
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
  dataHook?: string;
}

export function RecomHero({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  image,
  className,
  dataHook = "public.global.hero",
}: RecomHeroProps) {
  return (
    <section
      data-hook={dataHook}
      className={cn(
        "relative overflow-hidden bg-recom-graphite py-16 text-white md:py-20",
        className
      )}
    >
      <div className="absolute inset-0 z-0 opacity-35">
        <Image
          src="/assets/images/hero-industrial.png"
          alt="Usinagem industrial"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-industrial-overlay" />
      </div>

      <div className="container-recom relative z-10">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">
          <div className="flex-1 text-left">
            {eyebrow && (
              <div className="mb-6 flex items-center gap-4">
                <span className="h-px w-10 bg-recom-red" />
                <span className="text-[12px] font-bold uppercase tracking-[0.3em] text-white/88">
                  {eyebrow}
                </span>
              </div>
            )}
            <h1 className="text-white">{title}</h1>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-white/72">
              {description}
            </p>
            <div className="mt-10 flex flex-col flex-wrap gap-4 sm:flex-row">
              {primaryCta && (
                <RecomButton asChild size="lg" intent="accent" className="w-full sm:min-w-[220px] sm:w-auto">
                  <a href={primaryCta.href}>{primaryCta.label}</a>
                </RecomButton>
              )}
              {secondaryCta && (
                <RecomButton
                  asChild
                  size="lg"
                  intent="outline"
                  className="w-full border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white sm:min-w-[220px] sm:w-auto"
                >
                  <a href={secondaryCta.href}>{secondaryCta.label}</a>
                </RecomButton>
              )}
            </div>
          </div>

          {image && (
            <div className="mt-12 flex-1 md:block lg:mt-0">
              <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-white/5 p-1 shadow-2xl backdrop-blur-sm">
                <div className="h-full w-full overflow-hidden rounded-lg">{image}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
