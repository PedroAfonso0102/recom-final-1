import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { GridAlignItems, GridGap, GridPreset, MobileBehavior } from "./types";

type GridLayoutProps = {
  preset?: GridPreset | null;
  gap?: GridGap | null;
  alignItems?: GridAlignItems | null;
  mobileBehavior?: MobileBehavior | null;
  children: ReactNode;
  className?: string;
};

const gapClass: Record<GridGap, string> = {
  compact: "gap-4",
  normal: "gap-6",
  relaxed: "gap-8",
};

export function GridLayout({
  preset = "auto",
  gap = "normal",
  alignItems = "stretch",
  mobileBehavior = "stack",
  children,
  className,
}: GridLayoutProps) {
  const mobileCarousel = mobileBehavior === "carousel";

  return (
    <div
      className={cn(
        mobileCarousel
          ? "flex snap-x snap-mandatory overflow-x-auto pb-4 [scrollbar-width:thin] md:grid md:overflow-visible md:pb-0"
          : "grid grid-cols-1",
        !mobileCarousel && preset !== "dense" && "sm:grid-cols-2",
        preset === "auto" && "md:grid-cols-3 xl:grid-cols-4",
        preset === "two-columns" && "md:grid-cols-2",
        preset === "three-columns" && "md:grid-cols-3",
        preset === "four-columns" && "md:grid-cols-4",
        preset === "featured-left" && "md:grid-cols-3 [&>*:first-child]:md:col-span-2",
        preset === "featured-first" && "md:grid-cols-3 [&>*:first-child]:md:row-span-2",
        preset === "dense" && "grid-cols-1 sm:grid-cols-2 md:grid-cols-4",
        preset === "editorial" && "md:grid-cols-[1.15fr_0.85fr]",
        gapClass[gap ?? "normal"],
        alignItems === "stretch" ? "items-stretch" : "items-start",
        mobileCarousel && "[&>*]:min-w-[82%] [&>*]:snap-start md:[&>*]:min-w-0",
        className
      )}
    >
      {children}
    </div>
  );
}

