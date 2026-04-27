import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { RecomButton } from "@/design-system/components/recom-button";
import { RecomCard, RecomCardContent, RecomCardDescription, RecomCardFooter, RecomCardHeader, RecomCardTitle } from "@/design-system/components/recom-card";
import type { CtaSectionProps } from "./schemas/cta-section.schema";
import type { HeroSectionProps } from "./schemas/hero-section.schema";
import type { TextSectionProps } from "./schemas/text-section.schema";
import type { GridSectionProps } from "./schemas/grid-section.schema";
import type { TrustLogosProps } from "./schemas/trust-logos.schema";
import { RecomSection } from "@/design-system/components/recom-section";
import { Factory, ShieldCheck, CheckCircle2, Wrench, MapPin, Package } from "lucide-react";
import { HeroCarousel } from "@/components/public/HeroCarousel";

export function HeroSectionBlock({
  eyebrow,
  title,
  subtitle,
  primaryCtaLabel,
  primaryCtaHref,
  secondaryCtaLabel,
  secondaryCtaHref,
  imageUrl,
  showCarousel = true,
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
        <div className={cn("grid gap-10 lg:items-center", (imageUrl || showCarousel) && variant !== "compact" ? "lg:grid-cols-[1.2fr_0.8fr]" : "lg:grid-cols-1")}>
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

          {(imageUrl || showCarousel) && variant !== "compact" && (
            <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 p-1 shadow-2xl backdrop-blur-sm h-full max-h-[500px]">
              {showCarousel ? (
                <div className="w-full h-full rounded-lg overflow-hidden relative">
                  <HeroCarousel />
                </div>
              ) : (
                <img src={imageUrl!} alt={title} className="aspect-[4/3] w-full rounded-lg object-cover h-full" />
              )}
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

const iconMap: Record<string, React.ElementType> = {
  shield: ShieldCheck,
  check: CheckCircle2,
  factory: Factory,
  wrench: Wrench,
  pin: MapPin,
  package: Package,
};

export function GridSectionBlock({ eyebrow, title, description, items, columns, variant }: GridSectionProps) {
  const colClass = columns === "2" ? "md:grid-cols-2" : columns === "4" ? "md:grid-cols-4" : "md:grid-cols-3";
  
  return (
    <RecomSection
      eyebrow={eyebrow}
      title={title}
      description={description}
      className={cn(variant === "gray" ? "bg-recom-gray-50" : variant === "white" ? "bg-white" : "")}
    >
      <div className={cn("mt-10 grid grid-cols-1 gap-6", colClass)}>
        {items.map((item, i) => {
          const Icon = iconMap[item.icon || ""] || CheckCircle2;
          return (
            <div key={i} className="group flex flex-col rounded-xl border border-recom-border bg-white p-8 transition-all hover:border-recom-blue/20 hover:shadow-recom-card">
              {item.icon && (
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-md border border-recom-border/50 bg-recom-gray-50 text-recom-blue transition-all duration-500 group-hover:bg-recom-blue group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </div>
              )}
              <h3 className="mb-3">{item.title}</h3>
              <p className="mb-8 flex-grow text-[15px] leading-relaxed text-muted-foreground">
                {item.description}
              </p>
              {item.linkHref && item.linkLabel && (
                <RecomButton asChild intent="outline" className="h-11 w-full justify-center border-recom-border">
                  <Link href={item.linkHref}>
                    {item.linkLabel}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </RecomButton>
              )}
            </div>
          );
        })}
      </div>
    </RecomSection>
  );
}

export function TrustLogosBlock({ title, grayscale }: TrustLogosProps) {
  // In a real scenario, this would fetch from a service or context
  // For now we'll show a placeholder or handle it via a client component if dynamic
  return (
    <section className="border-b border-recom-gray-100 bg-white py-12">
      <div className="container-recom">
        {title && (
          <p className="mb-10 text-center text-[10px] font-bold uppercase tracking-[0.4em] text-recom-graphite/30">
            {title}
          </p>
        )}
        <div className={cn("flex flex-wrap items-center justify-center gap-12 transition-all duration-700 md:gap-20", grayscale && "opacity-45 grayscale hover:opacity-100 hover:grayscale-0")}>
           <p className="text-sm text-muted-foreground italic">Seção de logotipos (dinâmica via CMS)</p>
        </div>
      </div>
    </section>
  );
}

