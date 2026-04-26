import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { RecomButton } from "@/design-system/components/recom-button";
import { RecomCard, RecomCardContent, RecomCardDescription, RecomCardFooter, RecomCardHeader, RecomCardTitle } from "@/design-system/components/recom-card";
import type { CtaSectionProps } from "./schemas/cta-section.schema";
import type { HeroSectionProps } from "./schemas/hero-section.schema";
import type { TextSectionProps } from "./schemas/text-section.schema";

export function HeroSectionBlock({
  eyebrow,
  title,
  subtitle,
  primaryCtaLabel,
  primaryCtaHref,
  secondaryCtaLabel,
  secondaryCtaHref,
  imageUrl,
  variant,
}: HeroSectionProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden border-b border-border bg-recom-graphite py-16 text-white md:py-20",
        variant === "compact" && "py-12 md:py-14"
      )}
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(10,61,98,0.18),transparent_42%),radial-gradient(circle_at_top_right,rgba(205,29,46,0.18),transparent_34%)]" />
      <div className="container-recom relative z-10">
        <div className={cn("grid gap-10 lg:items-center", imageUrl && variant !== "compact" ? "lg:grid-cols-[1.2fr_0.8fr]" : "lg:grid-cols-1")}>
          <div className="max-w-3xl">
            {eyebrow && (
              <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.3em] text-white/55">
                {eyebrow}
              </p>
            )}
            <h1 className="text-white">{title}</h1>
            {subtitle && <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-white/72">{subtitle}</p>}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              {primaryCtaLabel && primaryCtaHref && (
                <RecomButton asChild size="lg" intent="accent" className="h-12 px-8">
                  <Link href={primaryCtaHref}>
                    {primaryCtaLabel}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </RecomButton>
              )}
              {secondaryCtaLabel && secondaryCtaHref && (
                <RecomButton asChild size="lg" intent="outline" className="h-12 border-white/20 bg-transparent px-8 text-white hover:bg-white/10">
                  <Link href={secondaryCtaHref}>{secondaryCtaLabel}</Link>
                </RecomButton>
              )}
            </div>
          </div>

          {imageUrl && variant !== "compact" && (
            <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 p-1 shadow-2xl backdrop-blur-sm">
              <img src={imageUrl} alt={title} className="aspect-[4/3] w-full rounded-lg object-cover" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export function TextSectionBlock({ title, body, variant }: TextSectionProps) {
  return (
    <section className={cn("py-12 md:py-16", variant === "panel" && "bg-recom-gray-50")}>
      <div className="container-recom">
        <RecomCard className={cn("overflow-hidden border-border", variant === "panel" ? "bg-white" : "bg-transparent shadow-none")}>
          <RecomCardHeader className="gap-3 border-b border-border/60">
            {title && <RecomCardTitle>{title}</RecomCardTitle>}
          </RecomCardHeader>
          <RecomCardContent className="pt-6">
            <div className="prose max-w-none prose-p:my-0 prose-p:leading-relaxed prose-p:text-muted-foreground">
              <p className="whitespace-pre-line text-[16px] leading-relaxed text-muted-foreground">{body}</p>
            </div>
          </RecomCardContent>
        </RecomCard>
      </div>
    </section>
  );
}

export function CtaSectionBlock({
  eyebrow,
  title,
  description,
  primaryCtaLabel,
  primaryCtaHref,
  secondaryCtaLabel,
  secondaryCtaHref,
  variant,
}: CtaSectionProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden py-16 md:py-20",
        variant === "light" ? "bg-white" : "bg-recom-graphite text-white"
      )}
    >
      {variant !== "light" && (
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(10,61,98,0.14),transparent_42%),radial-gradient(circle_at_top_right,rgba(205,29,46,0.14),transparent_34%)]" />
      )}
      <div className="container-recom relative z-10">
        <div className="max-w-3xl">
          {eyebrow && (
            <p className={cn("mb-4 text-[11px] font-bold uppercase tracking-[0.3em]", variant === "light" ? "text-recom-blue" : "text-white/45")}>
              {eyebrow}
            </p>
          )}
          <h2 className={cn(variant === "light" ? "text-recom-graphite" : "text-white")}>{title}</h2>
          <p className={cn("mt-5 max-w-2xl text-[16px] leading-relaxed", variant === "light" ? "text-muted-foreground" : "text-white/68")}>
            {description}
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <RecomButton asChild size="lg" intent="accent" className="h-12 px-8">
              <Link href={primaryCtaHref}>
                {primaryCtaLabel}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </RecomButton>
            {secondaryCtaLabel && secondaryCtaHref && (
              <RecomButton asChild size="lg" intent={variant === "light" ? "outline" : "outline"} className={cn("h-12 px-8", variant !== "light" && "border-white/20 bg-transparent text-white hover:bg-white/8")}>
                <Link href={secondaryCtaHref}>{secondaryCtaLabel}</Link>
              </RecomButton>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

