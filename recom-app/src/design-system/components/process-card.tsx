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
    <RecomCard className={cn("group flex flex-col h-full bg-white border-recom-border hover:border-recom-blue/30 transition-all duration-500 animate-in fade-in slide-in-from-bottom-6 duration-1000 fill-mode-both", className)}>
      <RecomCardHeader className="pb-4">
        <div 
          className="bg-recom-gray-50 text-recom-blue w-12 h-12 rounded-md flex items-center justify-center mb-6 transition-all group-hover:bg-recom-blue group-hover:text-white border border-recom-border/50"
          data-tooltip={`Soluções para ${name}`}
        >
          {icon}
        </div>
        <RecomCardTitle className="text-[22px] text-recom-graphite">{name}</RecomCardTitle>
        <RecomCardDescription className="mt-3 text-[15px] leading-relaxed text-muted-foreground/80 line-clamp-2 min-h-[3rem]">
          {description}
        </RecomCardDescription>
      </RecomCardHeader>
      
      <RecomCardContent className="flex-grow pt-2">
        {suppliers.length > 0 && (
          <div className="space-y-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/50">
              Fabricantes Principais
            </p>
            <div className="flex flex-wrap gap-2">
              {suppliers.map((supplier) => (
                <span 
                  key={supplier}
                  className="inline-flex items-center rounded-sm bg-recom-gray-50 border border-recom-border/30 px-2 py-1 text-[10px] font-bold text-muted-foreground/70 uppercase tracking-wider"
                >
                  {supplier}
                </span>
              ))}
            </div>
          </div>
        )}
      </RecomCardContent>

      <RecomCardFooter className="pt-6 border-t border-recom-gray-100">
        <RecomButton asChild className="w-full h-11 text-[11px]" intent="outline">
          <a href={link}>
            Ver Soluções Técnicas
            <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
          </a>
        </RecomButton>
      </RecomCardFooter>
    </RecomCard>
  );
}
