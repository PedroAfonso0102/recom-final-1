import * as React from "react";
import { ArrowRight, ExternalLink, Factory } from "lucide-react";
import Link from "next/link";
import { CardSurface, CardSurfaceActions, CardSurfaceBody, MediaFrame } from "@/components/public/visual";
import type { CardDensity, CardMediaMode, CardVariant, CtaStyle, MediaObjectPosition } from "@/components/public/visual";
import { RecomCardDescription, RecomCardTitle } from "./recom-card";
import { RecomButton } from "./recom-button";

interface SupplierCardProps {
  name: string;
  description: string;
  logoUrl?: string;
  processes?: string[];
  internalLink: string;
  externalCatalogLink?: string;
  catalogAvailable?: boolean;
  contactLink?: string;
  contactLabel?: string;
  className?: string;
  isAuthorized?: boolean;
  imageUrl?: string;
  imageAlt?: string;
  mediaMode?: CardMediaMode;
  imagePosition?: MediaObjectPosition;
  cardVariant?: CardVariant;
  cardDensity?: CardDensity;
  ctaStyle?: CtaStyle;
}

export function SupplierCard({
  name,
  description,
  logoUrl,
  processes = [],
  internalLink,
  externalCatalogLink,
  catalogAvailable = true,
  contactLink = "/contato",
  contactLabel = "Falar com a RECOM sobre esta marca",
  className,
  isAuthorized = false,
  imageUrl,
  imageAlt,
  mediaMode = "logo",
  imagePosition = "center",
  cardVariant = "catalog",
  cardDensity = "normal",
  ctaStyle = "primary",
}: SupplierCardProps) {
  const mediaUrl = imageUrl || logoUrl;

  return (
    <CardSurface
      data-hook="public.suppliers.card"
      variant={cardVariant}
      density={cardDensity}
      className={className}
    >
      {mediaMode !== "none" && mediaMode !== "background" && (
        <MediaFrame
          imageUrl={mediaUrl}
          alt={imageAlt || name}
          aspectRatio={mediaMode === "logo" ? "3 / 2" : "16 / 9"}
          objectFit={mediaMode === "logo" ? "contain" : "cover"}
          objectPosition={imagePosition}
          rounded="none"
          bleed
          fallbackLabel={name}
        />
      )}
      <CardSurfaceBody density={cardDensity}>
        <div className="flex flex-col gap-2">
          {isAuthorized && (
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-recom-graphite/40">
              Agente autorizado
            </span>
          )}
          {mediaMode === "none" && (
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-md border border-recom-border/60 bg-recom-gray-50 text-recom-blue">
              <Factory className="h-6 w-6" />
            </div>
          )}
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-recom-blue">
            {isAuthorized ? "Agente autorizado" : "Fornecedor parceiro"}
          </span>
          <RecomCardTitle>{name}</RecomCardTitle>
        </div>

        <RecomCardDescription className="line-clamp-3 text-[15px] text-recom-graphite/72">
          {description}
        </RecomCardDescription>

        {processes.length > 0 && (
          <div className="mt-6 space-y-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground/55">
              Processos relacionados
            </p>
            <div className="flex flex-wrap gap-2">
              {processes.map((process) => (
                <span
                  key={process}
                  className="inline-flex items-center rounded-md border border-recom-border/40 bg-recom-gray-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-muted-foreground/75"
                >
                  {process}
                </span>
              ))}
            </div>
          </div>
        )}

      <CardSurfaceActions className="border-t border-recom-gray-100">
        <RecomButton asChild intent={ctaStyle === "quiet" ? "outline" : "primary"} className="h-11 w-full justify-center">
          <Link href={internalLink} data-hook="public.suppliers.internal-link">
            Ver fornecedor
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </RecomButton>

        {externalCatalogLink && catalogAvailable ? (
          <RecomButton
            asChild
            intent="outline"
            className="h-11 w-full justify-center"
            data-hook="public.suppliers.catalog-link"
          >
            <a href={externalCatalogLink} target="_blank" rel="noopener noreferrer">
              Acessar catálogo oficial
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </RecomButton>
        ) : (
          <RecomButton asChild intent="outline" className="h-11 w-full justify-center">
            <Link href={contactLink}>
              {contactLabel}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </RecomButton>
        )}
      </CardSurfaceActions>
      </CardSurfaceBody>
    </CardSurface>
  );
}
