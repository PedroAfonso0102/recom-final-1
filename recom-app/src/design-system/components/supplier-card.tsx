import * as React from "react";
import Image from "next/image";
import { ArrowRight, ExternalLink, Factory } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  RecomCard,
  RecomCardContent,
  RecomCardDescription,
  RecomCardFooter,
  RecomCardHeader,
  RecomCardTitle,
} from "./recom-card";
import { RecomButton } from "./recom-button";
import Link from "next/link";

interface SupplierCardProps {
  name: string;
  description: string;
  logoUrl?: string;
  processes?: string[];
  internalLink: string;
  externalCatalogLink?: string;
  catalogAvailable?: boolean;
  className?: string;
  isAuthorized?: boolean;
}

export function SupplierCard({
  name,
  description,
  logoUrl,
  processes = [],
  internalLink,
  externalCatalogLink,
  catalogAvailable = true,
  className,
  isAuthorized = false,
}: SupplierCardProps) {
  return (
    <RecomCard
      data-hook="public.suppliers.card"
      className={cn("group flex h-full flex-col overflow-hidden border-recom-border transition-all duration-300 hover:-translate-y-0.5 hover:border-recom-blue/25 hover:shadow-recom", className)}
    >
      <RecomCardHeader className="gap-4 pb-4">
        {isAuthorized && (
          <div className="mb-[-12px] flex items-center px-0.5">
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-recom-graphite/40">
              Agente autorizado
            </span>
          </div>
        )}
        <div className="flex h-18 w-full items-center justify-center rounded-lg border border-recom-border/60 bg-recom-gray-50 p-4 transition-colors group-hover:bg-white">
          {logoUrl && logoUrl.trim() !== "" ? (
            <div className="relative h-full w-full">
              <Image
                src={logoUrl}
                alt={name}
                fill
                sizes="(max-width: 1279px) 50vw, 33vw"
                className="object-contain"
              />
            </div>
          ) : (
            <div className="flex items-center gap-3 text-muted-foreground/35">
              <Factory className="h-8 w-8" />
              <span className="text-[10px] font-bold uppercase tracking-[0.18em]">{name}</span>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-recom-blue">
            {isAuthorized ? "Agente autorizado" : "Fornecedor parceiro"}
          </span>
          <RecomCardTitle>{name}</RecomCardTitle>
        </div>
      </RecomCardHeader>

      <RecomCardContent className="flex-grow">
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
      </RecomCardContent>

      <RecomCardFooter className="mt-2 flex flex-col gap-3 border-t border-recom-gray-100 pt-5">
        <RecomButton asChild intent="primary" className="h-11 w-full justify-center">
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
          <RecomButton
            type="button"
            intent="outline"
            disabled
            className="h-11 w-full justify-center"
          >
            Catálogo sob consulta
          </RecomButton>
        )}
      </RecomCardFooter>
    </RecomCard>
  );
}
