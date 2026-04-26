import React from "react";
import { RecomCard, RecomCardHeader, RecomCardTitle, RecomCardContent, RecomCardFooter } from "./recom-card";
import { RecomButton } from "./recom-button";
import { Tag, Calendar, ArrowRight, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface PromotionCardProps {
  title: string;
  description: string;
  endsAt: string;
  status: "active" | "archived";
  ctaLabel?: string;
  ctaLink?: string;
  className?: string;
}

export function PromotionCard({
  title,
  description,
  endsAt,
  status,
  ctaLabel = "Solicitar Lote",
  ctaLink = "/sobre#contato",
  className,
}: PromotionCardProps) {
  const isActive = status === "active";

  return (
    <RecomCard
      className={cn(
        "flex flex-col h-full transition-all duration-300",
        !isActive && "opacity-60 grayscale bg-muted/50",
        isActive && "hover:border-accent/50",
        className
      )}
    >
      <RecomCardHeader className="pb-4">
        <div className="flex items-center justify-between mb-4">
          <span className={cn(
            "inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider",
            isActive ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
          )}>
            <Tag className="w-3 h-3 mr-1.5" />
            Lote Especial
          </span>
          {!isActive && (
            <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-wider text-destructive">
              <AlertCircle className="w-3 h-3 mr-1" />
              Encerrada
            </span>
          )}
        </div>
        <RecomCardTitle className="text-xl md:text-2xl font-bold uppercase tracking-tight leading-tight">
          {title}
        </RecomCardTitle>
      </RecomCardHeader>
      
      <RecomCardContent className="flex-grow">
        <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6">
          {description}
        </p>
        <div className="flex items-center text-xs font-medium text-muted-foreground pt-4 border-t border-border/50">
          <Calendar className="w-4 h-4 mr-2 text-primary" />
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
