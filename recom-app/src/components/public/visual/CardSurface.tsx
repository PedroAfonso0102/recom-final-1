import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { CardDensity, CardVariant } from "./types";

type CardSurfaceProps = {
  variant?: CardVariant | null;
  density?: CardDensity | null;
  interactive?: boolean;
  children: ReactNode;
  className?: string;
};

const densityClass: Record<CardDensity, string> = {
  compact: "p-5",
  normal: "p-6",
  relaxed: "p-8",
};

export function CardSurface({
  variant = "default",
  density = "normal",
  interactive = true,
  children,
  className,
}: CardSurfaceProps) {
  return (
    <article
      className={cn(
        "group flex h-full min-h-0 flex-col overflow-hidden rounded-lg border bg-white",
        "border-recom-border shadow-sm",
        interactive && "transition-all duration-300 hover:-translate-y-0.5 hover:border-recom-blue/25 hover:shadow-recom-card",
        variant === "industrial" && "border-recom-blue/20 bg-white",
        variant === "technical" && "border-dashed bg-recom-gray-50/50",
        variant === "catalog" && "border-recom-blue/25",
        variant === "promotion" && "border-recom-red/25",
        className
      )}
    >
      {children}
    </article>
  );
}

export function CardSurfaceBody({
  density = "normal",
  children,
  className,
}: {
  density?: CardDensity | null;
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("flex flex-1 flex-col", densityClass[density ?? "normal"], className)}>{children}</div>;
}

export function CardSurfaceActions({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mt-auto flex flex-col gap-3 pt-5", className)}>{children}</div>;
}

