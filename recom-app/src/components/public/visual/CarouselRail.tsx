"use client";

import { useRef } from "react";
import type { ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type CarouselRailProps = {
  children: ReactNode;
  label?: string;
  showArrows?: boolean;
  showDots?: boolean;
  className?: string;
};

export function CarouselRail({ children, label = "Carrossel", showArrows = true, showDots = false, className }: CarouselRailProps) {
  const railRef = useRef<HTMLDivElement>(null);

  function scrollBy(direction: "prev" | "next") {
    const rail = railRef.current;
    if (!rail) return;
    const delta = rail.clientWidth * 0.85 * (direction === "next" ? 1 : -1);
    rail.scrollBy({ left: delta, behavior: "smooth" });
  }

  return (
    <div className={cn("relative", className)}>
      {showArrows && (
        <div className="mb-4 flex justify-end gap-2">
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-recom-border bg-white text-recom-graphite shadow-sm transition hover:bg-recom-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-recom-blue"
            aria-label={`Anterior em ${label}`}
            onClick={() => scrollBy("prev")}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-recom-border bg-white text-recom-graphite shadow-sm transition hover:bg-recom-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-recom-blue"
            aria-label={`Proximo em ${label}`}
            onClick={() => scrollBy("next")}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
      <div
        ref={railRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:thin]"
        role="region"
        aria-label={label}
      >
        {children}
      </div>
      {showDots && <div className="mt-2 h-1 rounded-full bg-recom-border" aria-hidden="true" />}
    </div>
  );
}

