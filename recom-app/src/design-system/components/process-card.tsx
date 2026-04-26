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
  name: string;
  description: string;
  imageUrl?: string;
  suppliers?: string[];
  link: string;
  className?: string;
}

import { 
  Wrench, 
  Settings, 
  RotateCw, 
  Maximize, 
  Target, 
  Layers, 
  Shield, 
  Cpu
} from "lucide-react";

const ICON_MAP: Record<string, React.ReactNode> = {
  "torneamento": <RotateCw className="h-5 w-5" />,
  "fresamento": <Settings className="h-5 w-5" />,
  "furação": <Target className="h-5 w-5" />,
  "fixação": <Shield className="h-5 w-5" />,
  "mandrilamento": <Maximize className="h-5 w-5" />,
  "rosqueamento": <Layers className="h-5 w-5" />,
  "default": <Wrench className="h-5 w-5" />
};

export function ProcessCard({
  name,
  description,
  suppliers = [],
  link,
  className
}: ProcessCardProps) {
  const slug = name.toLowerCase();
  const icon = ICON_MAP[slug] || ICON_MAP[Object.keys(ICON_MAP).find(k => slug.includes(k)) || "default"];

  return (
    <RecomCard className={cn("group flex flex-col h-full hover:shadow-premium transition-all duration-500 border-border/60", className)}>
      <RecomCardHeader className="pb-2">
        <div className="bg-primary/5 text-primary w-10 h-10 rounded-md flex items-center justify-center mb-4 transition-colors group-hover:bg-primary group-hover:text-white duration-300">
          {icon}
        </div>
        <RecomCardTitle>{name}</RecomCardTitle>
        <RecomCardDescription className="mt-2 line-clamp-2 min-h-[2.5rem]">
          {description}
        </RecomCardDescription>
      </RecomCardHeader>
      
      <RecomCardContent className="flex-grow">
        {suppliers.length > 0 && (
          <div className="space-y-3">
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60">
              Marcas Parceiras
            </p>
            <div className="flex flex-wrap gap-1.5">
              {suppliers.map((supplier) => (
                <span 
                  key={supplier}
                  className="inline-flex items-center rounded-sm border border-border/50 bg-muted/30 px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
                >
                  {supplier}
                </span>
              ))}
            </div>
          </div>
        )}
      </RecomCardContent>

      <RecomCardFooter>
        <RecomButton asChild className="w-full h-10 text-[10px] rounded-full group-hover:bg-primary group-hover:text-white transition-all" intent="outline">
          <a href={link}>
            Ver Soluções Técnicas
            <ArrowRight className="h-3 w-3 ml-2 transition-transform group-hover:translate-x-1" />
          </a>
        </RecomButton>
      </RecomCardFooter>
    </RecomCard>
  );
}
