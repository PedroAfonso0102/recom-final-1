import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Factory, ShieldCheck, CheckCircle2, Wrench, MapPin, Package } from "lucide-react";
import { cn } from "@/lib/utils";
import { RecomButton } from "@/design-system/components/recom-button";
import { RecomCard, RecomCardContent, RecomCardHeader, RecomCardTitle } from "@/design-system/components/recom-card";
import { RecomSection } from "@/design-system/components/recom-section";
import { HeroCarousel } from "@/components/public/HeroCarousel";
import type { CtaSectionProps } from "./schemas/cta-section.schema";
import type { HeroSectionProps } from "./schemas/hero-section.schema";
import type { TextSectionProps } from "./schemas/text-section.schema";
import type { GridSectionProps } from "./schemas/grid-section.schema";
import type { TrustLogosProps } from "./schemas/trust-logos.schema";

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
  const hasMedia = Boolean(imageUrl && imageUrl.trim()) || showCarousel;

  return (
    <section
      className={cn(
        "relative overflow-hidden border-b border-border bg-recom-graphite py-16 text-white md:py-20",
        variant === "compact" && "py-12 md:py-14",
        variant === "full" && "min-h-[85vh] flex items-center md:py-32",
        variant === "simple" && "py-10 md:py-12 bg-white text-recom-graphite border-none"
      )}
    >
      {(variant === "default" || variant === "split" || variant === "full" || variant === "compact") && (
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(10,61,98,0.18),transparent_42%),radial-gradient(circle_at_top_right,rgba(205,29,46,0.18),transparent_34%)]" />
      )}
      {variant === "simple" && (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(205,29,46,0.03),transparent_35%)]" />
      )}
      <div className="container-recom relative z-10">
        <div className={cn(
          "grid gap-10 lg:items-center", 
          (variant === "default" || variant === "split" || variant === "full") ? "lg:grid-cols-[1.2fr_0.8fr]" : "lg:grid-cols-1 text-center items-center justify-center mx-auto"
        )}>
          <div className="max-w-3xl">
            {eyebrow && (
              <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.3em] text-white/55">
                {eyebrow}
              </p>
            )}
            <h1 className={cn(variant === "simple" ? "text-recom-graphite" : "text-white")}>{title}</h1>
            {subtitle && (
              <p className={cn(
                "mt-6 max-w-2xl text-[16px] leading-relaxed",
                variant === "simple" ? "text-muted-foreground mx-auto" : "text-white/72",
                variant === "compact" && "max-w-xl"
              )}>
                {subtitle}
              </p>
            )}
            <div className={cn(
              "mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap",
              variant === "simple" && "justify-center",
              variant === "compact" && "justify-start"
            )}>
              {primaryCtaLabel && primaryCtaHref && (
                <RecomButton asChild size="lg" intent="accent" className="h-12 px-8">
                  <Link href={primaryCtaHref}>
                    {primaryCtaLabel}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </RecomButton>
              )}
              {secondaryCtaLabel && secondaryCtaHref && (
                <RecomButton asChild size="lg" intent="outline" className={cn(
                  "h-12 px-8",
                  variant === "simple" ? "border-recom-border text-recom-graphite hover:bg-recom-gray-50" : "border-white/20 bg-transparent text-white hover:bg-white/10"
                )}>
                  <Link href={secondaryCtaHref}>{secondaryCtaLabel}</Link>
                </RecomButton>
              )}
            </div>
          </div>

          {(variant === "default" || variant === "split" || variant === "full") && (
            <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 p-1 shadow-2xl backdrop-blur-sm h-full max-h-[500px]">
              {showCarousel ? (
                <div className="w-full h-full rounded-lg overflow-hidden relative">
                  <HeroCarousel />
                </div>
              ) : hasMedia ? (
                <div className="relative h-full min-h-[280px] w-full overflow-hidden rounded-lg">
                  <Image
                    src={imageUrl!}
                    alt={typeof title === "string" ? title : "Imagem do hero"}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="flex h-full min-h-[280px] items-end overflow-hidden rounded-lg bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_45%),linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-6">
                  <div className="space-y-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-white">
                      <ShieldCheck className="h-6 w-6" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/70">
                        Conteúdo em destaque
                      </p>
                      <p className="max-w-sm text-[15px] leading-relaxed text-white/78">
                        Adicione uma imagem no CMS para reforçar esta seção, ou mantenha este painel como apoio visual.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {["Apoio na fábrica", "Catálogos oficiais", "Atendimento direto"].map((item) => (
                        <span key={item} className="rounded-full border border-white/15 bg-white/8 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white/80">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
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
        "relative overflow-hidden py-16 md:py-24",
        variant === "light" && "bg-white",
        variant === "primary" && "bg-recom-blue text-white",
        variant === "dark" && "bg-black text-white",
        (!variant || variant === "default") && "bg-recom-graphite text-white"
      )}
    >
      {variant !== "light" && (
        <div className={cn(
          "absolute inset-0 opacity-40",
          variant === "primary" ? "bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent_40%)]" : "bg-[linear-gradient(135deg,rgba(10,61,98,0.14),transparent_42%),radial-gradient(circle_at_top_right,rgba(205,29,46,0.14),transparent_34%)]"
        )} />
      )}
      <div className="container-recom relative z-10">
        <div className="max-w-3xl">
          {eyebrow && (
            <p className={cn("mb-4 text-[11px] font-bold uppercase tracking-[0.3em]", variant === "light" ? "text-recom-blue" : "text-white/45")}>
              {eyebrow}
            </p>
          )}
          <h2 className={cn(variant === "light" ? "text-recom-graphite" : "text-white")}>{title}</h2>
          <p className={cn("mt-6 max-w-2xl text-[17px] leading-relaxed", variant === "light" ? "text-muted-foreground" : "text-white/80")}>
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
      eyebrow={eyebrow || undefined}
      title={title || undefined}
      description={description || undefined}
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

export function TrustLogosBlock({ title, supplierIds, showAll, grayscale, suppliers: propSuppliers }: TrustLogosProps) {
  const allSuppliers = propSuppliers ?? [];
  const suppliers = (!showAll && supplierIds && supplierIds.length > 0)
    ? allSuppliers.filter((supplier) => supplierIds.includes(supplier.id))
    : allSuppliers;

  if (suppliers.length === 0) return null;

  return (
    <section className="border-b border-recom-gray-100 bg-white py-12">
      <div className="container-recom">
        {title && (
          <p className="mb-10 text-center text-[10px] font-bold uppercase tracking-[0.4em] text-recom-graphite/30">
            {title}
          </p>
        )}
        <div className={cn("flex flex-wrap items-center justify-center gap-12 transition-all duration-700 md:gap-20", grayscale && "opacity-45 grayscale hover:opacity-100 hover:grayscale-0")}>
          {suppliers.map((supplier) => {
            const isMitsubishi = supplier.name.toLowerCase().includes("mitsubishi");
            const logoUrl = isMitsubishi 
              ? "/assets/images/MITSUBISHI_MATERIALS_BRASIL_Colour_RGB.svg" 
              : supplier.logoUrl;

            return logoUrl ? (
              <div key={supplier.id} className="relative h-7 w-28 md:h-8 md:w-32">
                <Image
                  src={logoUrl}
                  alt={supplier.name}
                  fill
                  sizes="(max-width: 768px) 112px, 128px"
                  className="object-contain"
                />
              </div>
            ) : (
              <div
                key={supplier.id}
                className="inline-flex items-center gap-2 rounded-full border border-recom-border bg-recom-gray-50 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-recom-graphite/55"
              >
                <Factory className="h-3.5 w-3.5" />
                {supplier.name}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
