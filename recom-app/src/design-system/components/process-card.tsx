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
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProcessCardProps {
  title: string;
  description: string;
  suppliers?: string[];
  link: string;
  className?: string;
}

export function ProcessCard({
  title,
  description,
  suppliers = [],
  link,
  className
}: ProcessCardProps) {
  return (
    <RecomCard className={cn("flex flex-col h-full", className)}>
      <RecomCardHeader>
        <RecomCardTitle>{title}</RecomCardTitle>
        <RecomCardDescription className="mt-2">
          {description}
        </RecomCardDescription>
      </RecomCardHeader>
      
      <RecomCardContent className="flex-grow">
        {suppliers.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Fornecedores Relacionados
            </p>
            <div className="flex flex-wrap gap-2">
              {suppliers.map((supplier) => (
                <span 
                  key={supplier}
                  className="inline-flex items-center rounded-md border border-border bg-background px-2 py-1 text-xs font-medium"
                >
                  {supplier}
                </span>
              ))}
            </div>
          </div>
        )}
      </RecomCardContent>

      <RecomCardFooter>
        <RecomButton asChild className="w-full" intent="outline">
          <a href={link}>
            Ver Processo
            <ArrowRight className="h-4 w-4 ml-2" />
          </a>
        </RecomButton>
      </RecomCardFooter>
    </RecomCard>
  );
}
