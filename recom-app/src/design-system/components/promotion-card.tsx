import React from "react";
import { ArrowRight, Calendar, Package } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  RecomCard,
  RecomCardContent,
  RecomCardFooter,
  RecomCardHeader,
  RecomCardTitle,
} from "./recom-card";
import { RecomButton } from "./recom-button";
import Link from "next/link";

interface PromotionCardProps {
  title: string;
  description: string;
  endsAt: string;
  status: "active" | "archived";
  ctaLabel?: string;
  ctaLink?: string;
  supplierName?: string;
  imageUrl?: string;
  className?: string;
}

export function PromotionCard({
  title,
  description,
  endsAt,
  status,
  ctaLabel = "Consultar disponibilidade",
  ctaLink = "/sobre#contato",
  supplierName,
  imageUrl,
  className,
}: PromotionCardProps) {
  const isActive = status === "active";
  const validityLabel = isActive ? "Válido até" : "Encerrado em";

  return (
    <RecomCard
      data-hook="public.promotions.card"
      className={cn(
        "group flex h-full flex-col overflow-hidden border-recom-border transition-all duration-300 hover:-translate-y-0.5 hover:border-recom-blue/25 hover:shadow-recom",
        !isActive && "opacity-90",
        className
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden border-b border-recom-border/60 bg-recom-gray-50">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
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
            isActive ? "bg-recom-red" : "bg-recom-graphite"
          )}
        >
          {isActive ? "Oferta ativa" : "Sob consulta"}
        </div>
      </div>

      <RecomCardHeader className="pb-4">
        {supplierName && (
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-recom-blue">
            {supplierName}
          </span>
        )}
        <RecomCardTitle>{title}</RecomCardTitle>
      </RecomCardHeader>

      <RecomCardContent className="flex-grow">
        <p className="mb-5 text-[15px] leading-relaxed text-recom-graphite/72">
          {description}
        </p>
        <div className="flex items-center gap-2 border-t border-border/60 pt-4 text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
          <Calendar className="h-3.5 w-3.5 text-recom-blue" />
          <span>
            {validityLabel}: {new Date(endsAt).toLocaleDateString("pt-BR")}
          </span>
        </div>
      </RecomCardContent>

      <RecomCardFooter className="pt-2">
        <RecomButton asChild intent={isActive ? "primary" : "outline"} className="h-11 w-full justify-center">
          <Link href={ctaLink}>
            {ctaLabel}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </RecomButton>
      </RecomCardFooter>
    </RecomCard>
  );
}
