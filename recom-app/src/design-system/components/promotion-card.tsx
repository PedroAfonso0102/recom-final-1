import React from "react";
import { RecomCard, RecomCardHeader, RecomCardTitle, RecomCardContent, RecomCardFooter } from "./recom-card";
import { RecomButton } from "./recom-button";
import { Tag, Calendar, ArrowRight, AlertCircle, Package } from "lucide-react";
import { cn } from "@/lib/utils";

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
  ctaLabel = "Solicitar Lote",
  ctaLink = "/sobre#contato",
  supplierName,
  imageUrl,
  className,
}: PromotionCardProps) {
  const isActive = status === "active";

  return (
    <RecomCard
      className={cn(
        "flex flex-col h-full transition-all duration-300 rounded-md shadow-sm hover:shadow-md animate-in fade-in slide-in-from-right-4 duration-700 fill-mode-both",
        !isActive && "opacity-60 grayscale bg-muted/50",
        className
      )}
    >
      <div className="aspect-[4/3] bg-muted relative overflow-hidden flex items-center justify-center p-6 border-b border-border group/img">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-contain transition-all duration-700 saturate-[0.7] group-hover/img:saturate-100 group-hover/img:scale-105"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-muted-foreground/30 uppercase tracking-widest font-bold">
            <Package className="w-8 h-8 opacity-40" />
            <span className="text-[9px]">Lote Industrial</span>
          </div>
        )}
        
        <div className={cn(
          "absolute top-3 left-3 px-2 py-1 text-white text-[9px] font-bold uppercase tracking-widest rounded shadow-sm z-10",
          isActive ? "bg-recom-red" : "bg-muted-foreground"
        )}>
          {isActive ? "Oferta Ativa" : "Encerrada"}
        </div>
      </div>

      <RecomCardContent className="p-4 md:p-6 flex-grow">
        {supplierName && (
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-recom-blue mb-2 block">
            {supplierName}
          </span>
        )}
        <RecomCardTitle className="text-[20px] text-recom-graphite font-bold tracking-tight leading-tight mb-3">
          {title}
        </RecomCardTitle>
        <p className="text-[15px] text-recom-graphite/70 leading-relaxed mb-4">
          {description}
        </p>
        <div className="flex items-center text-[10px] font-medium text-muted-foreground pt-4 border-t border-border/50">
          <Calendar className="w-3 h-3 mr-2 text-primary" />
          <span>Válido até: {new Date(endsAt).toLocaleDateString("pt-BR")}</span>
        </div>
      </RecomCardContent>

      <RecomCardFooter className="pt-2">
        <RecomButton 
          asChild 
          intent={isActive ? "primary" : "outline"} 
          className="w-full"
          disabled={!isActive}
        >
          {isActive ? (
            <a href={ctaLink}>
              {ctaLabel} <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          ) : (
            <span>Promoção Encerrada</span>
          )}
        </RecomButton>
      </RecomCardFooter>
    </RecomCard>
  );
}
