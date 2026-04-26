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

interface SupplierCardProps {
  name: string;
  description: string;
  processes?: string[];
  internalLink: string;
  externalCatalogLink?: string;
  catalogAvailable?: boolean;
  className?: string;
}

export function SupplierCard({
  name,
  description,
  processes = [],
  internalLink,
  externalCatalogLink,
  catalogAvailable = true,
  className
}: SupplierCardProps) {
  return (
    <RecomCard className={cn("flex flex-col h-full", className)}>
      <RecomCardHeader>
        <RecomCardTitle>{name}</RecomCardTitle>
        <RecomCardDescription className="line-clamp-2 mt-2">
          {description}
        </RecomCardDescription>
      </RecomCardHeader>
      
      <RecomCardContent className="flex-grow">
        {processes.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {processes.map((process) => (
              <span 
                key={process}
                className="inline-flex items-center rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground"
              >
                {process}
              </span>
            ))}
          </div>
        )}
      </RecomCardContent>

      <RecomCardFooter className="flex flex-col gap-3">
        <RecomButton asChild className="w-full justify-between" intent="primary">
          <a href={internalLink}>
            Ver Fornecedor
            <ArrowRight className="h-4 w-4 ml-2" />
          </a>
        </RecomButton>
        
        {externalCatalogLink && (
          <RecomButton 
            asChild 
            variant="outline" 
            className={cn("w-full justify-between", !catalogAvailable && "opacity-50 cursor-not-allowed")}
            disabled={!catalogAvailable}
          >
            <a 
              href={catalogAvailable ? externalCatalogLink : "#"} 
              target={catalogAvailable ? "_blank" : undefined}
              rel="noopener noreferrer"
            >
              {catalogAvailable ? "Acessar Catálogo Oficial" : "Catálogo Indisponível"}
              <ExternalLink className="h-4 w-4 ml-2" />
            </a>
          </RecomButton>
        )}
      </RecomCardFooter>
    </RecomCard>
  );
}
