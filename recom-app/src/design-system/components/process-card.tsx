import * as React from "react";
import Image from "next/image";
import {
  ArrowRight,
  Layers,
  Maximize,
  RotateCw,
  Settings,
  Shield,
  Target,
  Wrench,
} from "lucide-react";
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

interface ProcessCardProps {
  name: string;
  description: string;
  imageUrl?: string;
  suppliers?: string[];
  link: string;
  contactLink?: string;
  contactLabel?: string;
  className?: string;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  torneamento: <RotateCw className="h-5 w-5" />,
  fresamento: <Settings className="h-5 w-5" />,
  "furação": <Target className="h-5 w-5" />,
  furaçao: <Target className="h-5 w-5" />,
  fixação: <Shield className="h-5 w-5" />,
  mandrilamento: <Maximize className="h-5 w-5" />,
  rosqueamento: <Layers className="h-5 w-5" />,
  default: <Wrench className="h-5 w-5" />,
};

export function ProcessCard({
  name,
  description,
  imageUrl,
  suppliers = [],
  link,
  contactLink = "/contato",
  contactLabel = "Falar com especialista",
  className,
}: ProcessCardProps) {
  const slug = name.toLowerCase();
  const icon = ICON_MAP[slug] || ICON_MAP[Object.keys(ICON_MAP).find((key) => slug.includes(key)) || "default"];

  return (
    <RecomCard
      data-hook="public.processes.card"
      className={cn("group flex h-full flex-col overflow-hidden border-recom-border transition-all duration-300 hover:-translate-y-0.5 hover:border-recom-blue/25 hover:shadow-recom", className)}
    >
      <div className="relative aspect-[16/9] overflow-hidden border-b border-recom-border/60 bg-recom-gray-50">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            fill
            sizes="(max-width: 1279px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-recom-border/60 bg-white text-recom-blue shadow-sm">
              {icon}
            </div>
          </div>
        )}
        <div className="absolute left-4 top-4 rounded-md bg-recom-graphite/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white shadow-sm">
          Processo
        </div>
      </div>

      <RecomCardHeader className="pb-4">
        <RecomCardTitle>{name}</RecomCardTitle>
        <RecomCardDescription className="line-clamp-2 min-h-[3rem]">
          {description}
        </RecomCardDescription>
      </RecomCardHeader>

      <RecomCardContent className="flex-grow">
        {suppliers.length > 0 && (
          <div className="space-y-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground/55">
              Fornecedores relacionados
            </p>
            <div className="flex flex-wrap gap-2">
              {suppliers.map((supplier) => (
                <span
                  key={supplier}
                  className="inline-flex items-center rounded-md border border-recom-border/40 bg-recom-gray-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-muted-foreground/75"
                >
                  {supplier}
                </span>
              ))}
            </div>
          </div>
        )}
      </RecomCardContent>

      <RecomCardFooter className="mt-2 flex flex-col gap-3 border-t border-recom-gray-100 pt-5">
        <RecomButton asChild intent="outline" className="h-11 w-full justify-center">
          <Link href={link}>
            Ver processo
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </RecomButton>

        <RecomButton asChild intent="ghost" className="h-11 w-full justify-center">
          <Link href={contactLink}>{contactLabel}</Link>
        </RecomButton>
      </RecomCardFooter>
    </RecomCard>
  );
}
