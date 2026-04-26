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
  catalogAvailable = true,
  className
}: SupplierCardProps) {
  return (
    <RecomCard className={cn("flex flex-col h-full bg-white", className)}>
      <RecomCardHeader className="flex flex-col gap-4 pb-4">
        <div className="h-14 w-14 rounded-md border border-border bg-white p-2 shrink-0 flex items-center justify-center shadow-sm">
          {logoUrl ? (
            <img src={logoUrl} alt={name} className="h-full w-full object-contain" />
          ) : (
            <Factory className="h-6 w-6 text-muted-foreground/20" />
          )}
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-bold uppercase tracking-wider text-primary mb-1">
            Distribuidor Autorizado
          </span>
          <RecomCardTitle className="text-xl leading-tight">{name}</RecomCardTitle>
        </div>
      </RecomCardHeader>

      <RecomCardContent className="flex-grow pt-2">
        <RecomCardDescription className="line-clamp-3 text-sm leading-relaxed mb-6">
          {description}
        </RecomCardDescription>

        {processes.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-auto">
            {processes.map((process) => (
              <span
                key={process}
                className="inline-flex items-center rounded-full bg-muted/50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground"
              >
                {process}
              </span>
            ))}
          </div>
        )}
      </RecomCardContent>

      <RecomCardFooter className="flex flex-col gap-2 pt-5 border-t border-border/40">
        <RecomButton asChild className="w-full h-10 text-[10px] justify-between px-4 rounded-full" intent="primary">
          <a href={internalLink}>
            Ficha Técnica RECOM
            <ArrowRight className="h-3 w-3 ml-2" />
          </a>
        </RecomButton>

        {externalCatalogLink && (
          <RecomButton
            asChild
            intent="outline"
            className={cn("w-full h-10 text-[10px] justify-between px-4 rounded-full", !catalogAvailable && "opacity-50 cursor-not-allowed")}
            disabled={!catalogAvailable}
          >
            <a
              href={catalogAvailable ? externalCatalogLink : "#"}
              target={catalogAvailable ? "_blank" : undefined}
              rel="noopener noreferrer"
            >
              {catalogAvailable ? "Catálogo do Fabricante" : "Catálogo Indisponível"}
              <ExternalLink className="h-3 w-3 ml-2" />
            </a>
          </RecomButton>
        )}
      </RecomCardFooter>
    </RecomCard>
  );
}

