import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { BackgroundPreset, MediaObjectPosition, OverlayStrength, OverlayTone } from "./types";

type VisualBackgroundProps = {
  preset?: BackgroundPreset | null;
  backgroundImageUrl?: string | null;
  backgroundPosition?: MediaObjectPosition | null;
  overlayStrength?: OverlayStrength | null;
  overlayTone?: OverlayTone | null;
  textureEnabled?: boolean | null;
  className?: string;
  children: ReactNode;
};

const overlayAlpha: Record<OverlayStrength, string> = {
  20: "0.2",
  40: "0.4",
  60: "0.6",
  80: "0.8",
};

const toneRgb: Record<OverlayTone, string> = {
  black: "0 0 0",
  red: "120 18 26",
  steel: "15 23 42",
  neutral: "39 44 49",
};

export function VisualBackground({
  preset = "none",
  backgroundImageUrl,
  backgroundPosition = "center",
  overlayStrength = 60,
  overlayTone = "black",
  textureEnabled = false,
  className,
  children,
}: VisualBackgroundProps) {
  const hasImage = Boolean(backgroundImageUrl && backgroundImageUrl.trim());
  const imagePreset = preset === "image-dark-overlay" || preset === "image-red-overlay" || preset === "split-dark-image";
  const strength = overlayStrength ?? 60;
  const tone = overlayTone ?? "black";
  const style: CSSProperties = {};

  if (hasImage && imagePreset) {
    style.backgroundImage = `linear-gradient(rgba(${toneRgb[tone]} / ${overlayAlpha[strength]}), rgba(${toneRgb[tone]} / ${overlayAlpha[strength]})), url("${backgroundImageUrl}")`;
    style.backgroundSize = "cover";
    style.backgroundPosition = backgroundPosition ?? "center";
  }

  return (
    <section
      className={cn(
        "relative overflow-hidden",
        preset === "solid-dark" && "bg-recom-graphite text-white",
        preset === "solid-light" && "bg-white text-recom-graphite",
        preset === "industrial-gradient" && "bg-recom-graphite text-white",
        preset === "image-dark-overlay" && "bg-recom-graphite text-white",
        preset === "image-red-overlay" && "bg-recom-graphite text-white",
        preset === "split-dark-image" && "bg-recom-graphite text-white",
        preset === "texture-dark" && "bg-black text-white",
        preset === "technical-grid" && "bg-recom-gray-50 text-recom-graphite",
        (!preset || preset === "none") && "bg-transparent",
        className
      )}
      style={style}
    >
      {preset === "industrial-gradient" && (
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(10,61,98,0.55),transparent_45%),radial-gradient(circle_at_top_right,rgba(205,29,46,0.28),transparent_35%)]" />
      )}
      {preset === "technical-grid" && (
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.06)_1px,transparent_1px)] bg-[size:28px_28px]" />
      )}
      {preset === "texture-dark" && (
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.04)_0,transparent_45%)]" />
      )}
      {textureEnabled && (
        <div className="pointer-events-none absolute inset-0 opacity-[0.08] bg-[linear-gradient(45deg,currentColor_25%,transparent_25%,transparent_75%,currentColor_75%,currentColor),linear-gradient(45deg,currentColor_25%,transparent_25%,transparent_75%,currentColor_75%,currentColor)] bg-[size:18px_18px] bg-[position:0_0,9px_9px]" />
      )}
      <div className="relative z-10">{children}</div>
    </section>
  );
}
