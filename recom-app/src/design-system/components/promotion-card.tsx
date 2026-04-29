import React from "react";
import { ArrowRight, Calendar, Package } from "lucide-react";
import { cn } from "@/lib/utils";
import { CardSurface, CardSurfaceActions, CardSurfaceBody, MediaFrame } from "@/components/public/visual";
import type { CardDensity, CardMediaMode, CardVariant, CtaStyle, MediaObjectPosition } from "@/components/public/visual";
import { RecomCardTitle } from "./recom-card";
import { RecomButton } from "./recom-button";
import Link from "next/link";

interface PromotionCardProps {
  title: string;
  description: string;
  endsAt: string;
  status: "active" | "expired" | "archived";
  ctaLabel?: string;
  ctaLink?: string;
  supplierName?: string;
  imageUrl?: string;
  className?: string;
  imageAlt?: string;
  mediaMode?: CardMediaMode;
  imagePosition?: MediaObjectPosition;
  cardVariant?: CardVariant;
  cardDensity?: CardDensity;
  ctaStyle?: CtaStyle;
}

export function PromotionCard({
  title,
  description,
  endsAt,
  status,
  ctaLabel = "Consultar disponibilidade",
  ctaLink = "/contato",
  supplierName,
  imageUrl,
  className,
  imageAlt,
  mediaMode = "cover",
  imagePosition = "center",
  cardVariant = "promotion",
  cardDensity = "normal",
  ctaStyle = "primary",
}: PromotionCardProps) {
  const isActive = status === "active";
  const isExpired = status === "expired";
  const validityLabel = isActive ? "Valido ate" : isExpired ? "Encerrado em" : "Sob consulta";

  return (
    <CardSurface
      data-hook="public.promotions.card"
      variant={cardVariant}
      density={cardDensity}
      className={cn(
        !isActive && "opacity-90",
        className
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden border-b border-recom-border/60 bg-recom-gray-50">
        {mediaMode !== "none" ? (
          <MediaFrame
            imageUrl={imageUrl}
            alt={imageAlt || title}
            aspectRatio="4 / 3"
            objectFit={mediaMode === "logo" ? "contain" : "cover"}
            objectPosition={imagePosition}
            rounded="none"
            bleed
            overlay={mediaMode === "background" ? "soft" : "none"}
            fallbackLabel="Oportunidade B2B"
          />
        ) : (
          <div className="flex h-full items-center justify-center p-6">
            <div className="flex flex-col items-center gap-2 text-muted-foreground/35">
              <Package className="h-10 w-10" />
              <span className="text-[10px] font-bold uppercase tracking-[0.18em]">Oportunidade B2B</span>
            </div>
          </div>
        )}

        <div
          className={cn(
            "absolute left-4 top-4 rounded-md px-3 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-white shadow-sm",
            isActive ? "bg-recom-red" : isExpired ? "bg-slate-500" : "bg-recom-graphite"
          )}
        >
          {isActive ? "Oferta ativa" : isExpired ? "Oferta expirada" : "Sob consulta"}
        </div>
      </div>

      <CardSurfaceBody density={cardDensity}>
        {supplierName && (
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-recom-blue">
            {supplierName}
          </span>
        )}
        <RecomCardTitle>{title}</RecomCardTitle>

        <p className="mb-5 text-[15px] leading-relaxed text-recom-graphite/72">
          {description}
        </p>
        <div className="flex items-center gap-2 border-t border-border/60 pt-4 text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
          <Calendar className="h-3.5 w-3.5 text-recom-blue" />
          <span>
            {validityLabel}: {new Date(endsAt).toLocaleDateString("pt-BR")}
          </span>
        </div>

      <CardSurfaceActions>
        <RecomButton asChild intent={isActive && ctaStyle !== "quiet" ? "primary" : "outline"} className="h-11 w-full justify-center">
          <Link href={ctaLink}>
            {ctaLabel}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </RecomButton>
      </CardSurfaceActions>
      </CardSurfaceBody>
    </CardSurface>
  );
}
