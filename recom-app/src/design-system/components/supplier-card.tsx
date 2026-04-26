import * as React from "react";
import {
  RecomCard,
  RecomCardHeader,
  RecomCardTitle,
  RecomCardDescription,
  RecomCardContent,
  RecomCardFooter
} from "./recom-card";
import { RecomButton } from "./recom-button";
import { ExternalLink, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Factory } from "lucide-react";

interface SupplierCardProps {
  name: string;
  description: string;
  logoUrl?: string;
  processes?: string[];
  internalLink: string;
  externalCatalogLink?: string;
  eCatalogLink?: string;
  catalogAvailable?: boolean;
  className?: string;
}

export function SupplierCard({
  name,
  description,
  logoUrl,
  processes = [],
  internalLink,
  externalCatalogLink,
  eCatalogLink,
  catalogAvailable = true,
  className
}: SupplierCardProps) {
  return (
    <RecomCard className={cn("group flex flex-col h-full bg-white border-recom-border hover:border-recom-blue/30 transition-all duration-500 animate-in fade-in zoom-in-95 duration-700", className)}>
      <RecomCardHeader className="flex flex-col gap-5 pb-5">
        <div className="h-16 w-full rounded-md border border-recom-gray-100 bg-recom-gray-50 p-4 shrink-0 flex items-center justify-center transition-all group-hover:bg-white group-hover:border-recom-blue/10">
          {logoUrl ? (
            <img src={logoUrl} alt={name} className="h-full w-full object-contain saturate-[0.7] group-hover:saturate-100 transition-all duration-500" />
          ) : (
            <Factory className="h-8 w-8 text-muted-foreground/20" />
          )}
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-recom-red mb-2">
            Distribuidor Autorizado
          </span>
          <RecomCardTitle className="text-[22px] text-recom-graphite font-bold tracking-tight leading-tight">{name}</RecomCardTitle>
        </div>
      </RecomCardHeader>

      <RecomCardContent className="flex-grow pt-2">
        <RecomCardDescription className="line-clamp-3 text-[16px] leading-relaxed text-recom-graphite/70 mb-6">
          {description}
        </RecomCardDescription>

        {processes.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-auto">
            {processes.map((process) => (
              <span
                key={process}
                className="inline-flex items-center rounded-sm bg-recom-gray-100 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70 border border-recom-border/50"
              >
                {process}
              </span>
            ))}
          </div>
        )}
      </RecomCardContent>

      <RecomCardFooter className="flex flex-col gap-3 pt-6 mt-4 border-t border-recom-gray-100">
        <RecomButton asChild className="w-full h-11 text-[11px] justify-center recom-tooltip" intent="primary" data-tooltip="Abrir Detalhes Técnicos">
          <a href={internalLink}>
            Ficha Técnica RECOM
            <ArrowRight className="h-4 w-4 ml-2" />
          </a>
        </RecomButton>

        {externalCatalogLink && (
          <RecomButton
            asChild
            intent="outline"
            className={cn("w-full h-11 text-[11px] justify-center recom-tooltip", !catalogAvailable && "opacity-50 cursor-not-allowed")}
            disabled={!catalogAvailable}
            data-tooltip={catalogAvailable ? "Baixar Catálogo PDF Oficial" : "Indisponível no momento"}
          >
            <a
              href={catalogAvailable ? externalCatalogLink : "#"}
              target={catalogAvailable ? "_blank" : undefined}
              rel="noopener noreferrer"
            >
              {catalogAvailable ? "Catálogo PDF" : "Catálogo Indisponível"}
              <ExternalLink className="h-4 w-4 ml-2 opacity-50" />
            </a>
          </RecomButton>
        )}

        {eCatalogLink && (
          <RecomButton
            asChild
            intent="link"
            className="w-full h-9 text-[10px] justify-center text-recom-blue/60 hover:text-recom-red underline decoration-recom-blue/20 underline-offset-4 recom-tooltip"
            data-tooltip="Acessar Versão Online Interativa"
          >
            <a
              href={eCatalogLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Consultar Catálogo Eletrônico
              <ExternalLink className="h-3.5 w-3.5 ml-2 opacity-40" />
            </a>
          </RecomButton>
        )}
      </RecomCardFooter>
    </RecomCard>
  );
}

