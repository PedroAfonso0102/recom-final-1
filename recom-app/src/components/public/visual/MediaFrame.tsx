import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { MediaObjectFit, MediaObjectPosition } from "./types";

type MediaFrameProps = {
  imageUrl?: string | null;
  alt?: string | null;
  aspectRatio?: "1 / 1" | "4 / 3" | "16 / 9" | "21 / 9" | "3 / 2";
  objectFit?: MediaObjectFit;
  objectPosition?: MediaObjectPosition;
  rounded?: "none" | "sm" | "md" | "lg";
  bleed?: boolean;
  overlay?: "none" | "soft" | "dark" | "red";
  priority?: boolean;
  sizes?: string;
  fallbackLabel?: string;
  className?: string;
};

const positionClass: Record<MediaObjectPosition, string> = {
  center: "object-center",
  top: "object-top",
  bottom: "object-bottom",
  left: "object-left",
  right: "object-right",
};

const roundedClass = {
  none: "rounded-none",
  sm: "rounded-md",
  md: "rounded-lg",
  lg: "rounded-xl",
};

const overlayClass = {
  none: "",
  soft: "after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/18 after:to-transparent",
  dark: "after:absolute after:inset-0 after:bg-black/45",
  red: "after:absolute after:inset-0 after:bg-recom-red/35",
};

export function MediaFrame({
  imageUrl,
  alt,
  aspectRatio = "16 / 9",
  objectFit = "cover",
  objectPosition = "center",
  rounded = "md",
  bleed = false,
  overlay = "none",
  priority = false,
  sizes = "(max-width: 768px) 100vw, 33vw",
  fallbackLabel = "Imagem indisponivel",
  className,
}: MediaFrameProps) {
  const hasImage = Boolean(imageUrl && imageUrl.trim());

  return (
    <div
      className={cn(
        "relative overflow-hidden border border-recom-border/60 bg-recom-gray-50",
        roundedClass[rounded],
        overlayClass[overlay],
        bleed && "border-x-0 border-t-0",
        className
      )}
      style={{ aspectRatio }}
    >
      {hasImage ? (
        <Image
          src={imageUrl!}
          alt={alt ?? ""}
          fill
          priority={priority}
          sizes={sizes}
          className={cn(
            objectFit === "contain" ? "object-contain p-4" : "object-cover",
            positionClass[objectPosition],
            "transition-transform duration-700 group-hover:scale-[1.03]"
          )}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center p-6 text-muted-foreground/45">
          <div className="flex flex-col items-center gap-2 text-center">
            <ImageIcon className="h-8 w-8" />
            <span className="text-[10px] font-bold uppercase tracking-[0.18em]">
              {fallbackLabel}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

