import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Factory, ShieldCheck, CheckCircle2, Wrench, MapPin, Package } from "lucide-react";
import { cn } from "@/lib/utils";
import { RecomButton } from "@/design-system/components/recom-button";
import { RecomCard, RecomCardContent, RecomCardHeader, RecomCardTitle } from "@/design-system/components/recom-card";
import { HeroCarousel } from "@/components/public/HeroCarousel";
import {
  CardSurface,
  CardSurfaceActions,
  CardSurfaceBody,
  GridLayout,
  MediaFrame,
  SectionLayout,
  VisualBackground,
} from "@/components/public/visual";
import type { CtaSectionProps } from "./schemas/cta-section.schema";
import type { HeroSectionProps } from "./schemas/hero-section.schema";
import type { TextSectionProps } from "./schemas/text-section.schema";
import type { GridSectionProps } from "./schemas/grid-section.schema";
import type { TrustLogosProps } from "./schemas/trust-logos.schema";

function isDarkBackground(preset?: string | null, variant?: string | null) {
  return (
    preset === "solid-dark" ||
    preset === "industrial-gradient" ||
    preset === "image-dark-overlay" ||
    preset === "image-red-overlay" ||
    preset === "split-dark-image" ||
    preset === "texture-dark" ||
    variant === "default" ||
    variant === "split" ||
    variant === "full" ||
    variant === "compact" ||
    variant === "industrial" ||
    variant === "catalog" ||
    variant === "primary" ||
    variant === "dark" ||
    variant === "contact"
  );
}

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
  backgroundPreset,
  backgroundImageUrl,
  backgroundPosition,
  overlayStrength,
  overlayTone,
  textureEnabled,
  layoutPreset,
}: HeroSectionProps) {
  const hasMedia = Boolean(imageUrl && imageUrl.trim()) || showCarousel;
  const effectiveBackground =
    backgroundPreset && backgroundPreset !== "none"
      ? backgroundPreset
      : variant === "technical" || variant === "contact" || variant === "simple"
        ? "solid-light"
        : "industrial-gradient";
  const usesDarkHero = isDarkBackground(effectiveBackground, variant);

  return (
    <VisualBackground
      preset={effectiveBackground}
      backgroundImageUrl={backgroundImageUrl || imageUrl}
      backgroundPosition={backgroundPosition}
      overlayStrength={overlayStrength}
      overlayTone={overlayTone}
      textureEnabled={textureEnabled}
      className={cn(
        "border-b border-border py-14 md:py-20",
        variant === "compact" && "py-12 md:py-14",
        variant === "full" && "flex min-h-[85vh] items-center md:py-32",
        variant === "simple" && "py-10 md:py-12",
        variant === "technical" && "py-12 md:py-16",
        variant === "contact" && "py-12 md:py-16"
      )}
    >
      <div className="container-recom relative z-10">
        <div className={cn(
          "grid gap-10 lg:items-center", 
          (variant === "default" || variant === "split" || variant === "full" || layoutPreset === "split") ? "lg:grid-cols-[1.2fr_0.8fr]" : "mx-auto items-center justify-center text-center lg:grid-cols-1"
        )}>
          <div className="max-w-3xl">
            {eyebrow && (
              <p className={cn("mb-4 text-[11px] font-bold uppercase tracking-[0.3em]", usesDarkHero ? "text-white/60" : "text-recom-blue")}>
                {eyebrow}
              </p>
            )}
            <h1 className={cn(!usesDarkHero ? "text-recom-graphite" : "text-white")}>{title}</h1>
            {subtitle && (
              <p className={cn(
                "mt-6 max-w-2xl text-[16px] leading-relaxed",
                !usesDarkHero ? "text-muted-foreground mx-auto" : "text-white/72",
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
                  !usesDarkHero ? "border-recom-border text-recom-graphite hover:bg-recom-gray-50" : "border-white/20 bg-transparent text-white hover:bg-white/10"
                )}>
                  <Link href={secondaryCtaHref}>{secondaryCtaLabel}</Link>
                </RecomButton>
              )}
            </div>
          </div>

          {(variant === "default" || variant === "split" || variant === "full" || layoutPreset === "split") && (
            <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 p-1 shadow-2xl backdrop-blur-sm h-full max-h-[500px]">
              {showCarousel ? (
                <div className="w-full h-full rounded-lg overflow-hidden relative">
                  <HeroCarousel />
                </div>
              ) : hasMedia ? (
                <MediaFrame
                  imageUrl={imageUrl}
                  alt={typeof title === "string" ? title : "Imagem do hero"}
                  aspectRatio="4 / 3"
                  rounded="md"
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="min-h-[280px] border-white/10"
                />
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
    </VisualBackground>
  );
}

export function TextSectionBlock({
  title,
  body,
  variant,
  backgroundPreset,
  backgroundImageUrl,
  backgroundPosition,
  overlayStrength,
  overlayTone,
  textureEnabled,
  layoutPreset,
}: TextSectionProps) {
  const effectiveBackground =
    backgroundPreset && backgroundPreset !== "none"
      ? backgroundPreset
      : variant === "technical"
        ? "technical-grid"
        : variant === "panel" || variant === "note"
          ? "solid-light"
          : "none";
  const inverse = isDarkBackground(effectiveBackground, variant);

  return (
    <VisualBackground
      preset={effectiveBackground}
      backgroundImageUrl={backgroundImageUrl}
      backgroundPosition={backgroundPosition}
      overlayStrength={overlayStrength}
      overlayTone={overlayTone}
      textureEnabled={textureEnabled}
      className={cn(variant === "compact" && "py-0")}
    >
      <div className={cn("container-recom py-12 md:py-16", variant === "compact" && "py-8 md:py-10", (variant === "editorial" || variant === "technical" || variant === "note") && "max-w-4xl", layoutPreset === "compact" && "py-8 md:py-10")}>
        <RecomCard className={cn("overflow-hidden border-border", variant === "panel" || variant === "technical" || variant === "note" ? "bg-white" : "bg-transparent shadow-none", variant === "note" && "border-l-4 border-l-recom-blue")}>
          <RecomCardHeader className="gap-3 border-b border-border/60">
            {title && <RecomCardTitle className={cn(inverse && variant === "default" && "text-white")}>{title}</RecomCardTitle>}
          </RecomCardHeader>
          <RecomCardContent className="pt-6">
            <div className="prose max-w-none prose-p:my-0 prose-p:leading-relaxed prose-p:text-muted-foreground">
              <p className={cn("whitespace-pre-line text-[16px] leading-relaxed text-muted-foreground", variant === "technical" && "font-mono text-[14px]", variant === "editorial" && "text-[17px]")}>{body}</p>
            </div>
          </RecomCardContent>
        </RecomCard>
      </div>
    </VisualBackground>
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
  backgroundPreset,
  backgroundImageUrl,
  backgroundPosition,
  overlayStrength,
  overlayTone,
  textureEnabled,
  layoutPreset,
}: CtaSectionProps) {
  const effectiveBackground =
    backgroundPreset && backgroundPreset !== "none"
      ? backgroundPreset
      : variant === "light" || variant === "quiet"
        ? "solid-light"
        : variant === "catalog"
          ? "image-dark-overlay"
          : "industrial-gradient";
  const inverse = isDarkBackground(effectiveBackground, variant);

  return (
    <VisualBackground
      preset={effectiveBackground}
      backgroundImageUrl={backgroundImageUrl}
      backgroundPosition={backgroundPosition}
      overlayStrength={overlayStrength}
      overlayTone={overlayTone}
      textureEnabled={textureEnabled}
      className={cn("py-16 md:py-24", layoutPreset === "compact" && "py-12 md:py-14")}
    >
      <div className="container-recom relative z-10">
        <div className="max-w-3xl">
          {eyebrow && (
            <p className={cn("mb-4 text-[11px] font-bold uppercase tracking-[0.3em]", inverse ? "text-white/55" : "text-recom-blue")}>
              {eyebrow}
            </p>
          )}
          <h2 className={cn(inverse ? "text-white" : "text-recom-graphite")}>{title}</h2>
          <p className={cn("mt-6 max-w-2xl text-[17px] leading-relaxed", inverse ? "text-white/80" : "text-muted-foreground")}>
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
              <RecomButton asChild size="lg" intent="outline" className={cn("h-12 px-8", inverse && "border-white/20 bg-transparent text-white hover:bg-white/8")}>
                <Link href={secondaryCtaHref}>{secondaryCtaLabel}</Link>
              </RecomButton>
            )}
          </div>
        </div>
      </div>
    </VisualBackground>
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

export function GridSectionBlock({
  eyebrow,
  title,
  description,
  items,
  columns,
  variant,
  backgroundPreset,
  backgroundImageUrl,
  backgroundPosition,
  overlayStrength,
  overlayTone,
  textureEnabled,
  layoutPreset,
  gridPreset,
  gridGap,
  alignItems,
  mobileBehavior,
  mediaMode,
  imagePosition,
  cardVariant,
  cardDensity,
}: GridSectionProps) {
  const effectiveGridPreset = gridPreset || (columns === "2" ? "two-columns" : columns === "4" ? "four-columns" : "three-columns");
  const effectiveBackground =
    backgroundPreset && backgroundPreset !== "none"
      ? backgroundPreset
      : variant === "technical"
        ? "technical-grid"
        : variant === "primary"
          ? "solid-dark"
          : variant === "gray"
            ? "solid-light"
            : "none";
  const inverse = isDarkBackground(effectiveBackground, variant);

  return (
    <VisualBackground
      preset={effectiveBackground}
      backgroundImageUrl={backgroundImageUrl}
      backgroundPosition={backgroundPosition}
      overlayStrength={overlayStrength}
      overlayTone={overlayTone}
      textureEnabled={textureEnabled}
    >
      <SectionLayout
        eyebrow={eyebrow || undefined}
        title={title || undefined}
        description={description || undefined}
        layoutPreset={layoutPreset}
        inverse={inverse}
      >
      <GridLayout
        preset={effectiveGridPreset}
        gap={gridGap}
        alignItems={alignItems}
        mobileBehavior={mobileBehavior}
      >
        {items.map((item, i) => {
          const Icon = iconMap[item.icon || ""] || CheckCircle2;
          const itemMediaMode = mediaMode && mediaMode !== "none" ? mediaMode : item.imageUrl ? "thumbnail" : "none";
          return (
            <CardSurface
              key={i}
              variant={cardVariant || (variant === "promotion" ? "promotion" : variant === "technical" ? "technical" : variant === "supplier" ? "catalog" : "default")}
              density={cardDensity}
              className={cn(mobileBehavior === "carousel" && "min-w-[82%] md:min-w-0")}
            >
              {itemMediaMode !== "none" && itemMediaMode !== "background" && (
                <MediaFrame
                  imageUrl={item.imageUrl}
                  alt={item.imageAlt || item.title}
                  aspectRatio={itemMediaMode === "logo" ? "3 / 2" : itemMediaMode === "cover" ? "4 / 3" : "16 / 9"}
                  objectFit={itemMediaMode === "logo" ? "contain" : "cover"}
                  objectPosition={item.imagePosition || imagePosition || "center"}
                  rounded="none"
                  bleed
                  fallbackLabel={variant === "supplier" ? "Marca" : "Imagem"}
                />
              )}
              <CardSurfaceBody density={cardDensity}>
                {item.icon && itemMediaMode !== "background" && (
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-md border border-recom-border/50 bg-recom-gray-50 text-recom-blue transition-all duration-500 group-hover:bg-recom-blue group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                )}
                <h3 className="mb-3 line-clamp-2">{item.title}</h3>
                <p className="line-clamp-4 flex-1 text-[15px] leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
                {item.linkHref && item.linkLabel && (
                  <CardSurfaceActions>
                    <RecomButton asChild intent="outline" className="h-11 w-full justify-center border-recom-border">
                      <Link href={item.linkHref}>
                        {item.linkLabel}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </RecomButton>
                  </CardSurfaceActions>
                )}
              </CardSurfaceBody>
            </CardSurface>
          );
        })}
      </GridLayout>
      </SectionLayout>
    </VisualBackground>
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
