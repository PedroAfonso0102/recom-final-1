import React from "react";
import type { SiteSettings } from "@/cms/schemas/site-settings.schema";
import type { CmsPageRow } from "@/cms/types";

// Helper function to convert Hex to HSL string matching shadcn format (H S L)
function hexToHslString(hex: string): string {
  hex = hex.replace(/^#/, '');
  if (hex.length === 3) {
    hex = hex.split('').map(c => c + c).join('');
  }
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

export function ThemeProvider({
  settings,
  page,
  children
}: {
  settings: SiteSettings,
  page?: CmsPageRow,
  children: React.ReactNode
}) {
  const t = (page?.theme_override as SiteSettings["theme"]) || settings.theme;

  const style = {} as React.CSSProperties & Record<string, string>;
  if (t) {
    if (t.primaryColor) style["--primary"] = hexToHslString(t.primaryColor);
    if (t.secondaryColor) style["--secondary"] = hexToHslString(t.secondaryColor);
    if (t.backgroundColor) style["--background"] = hexToHslString(t.backgroundColor);
    if (t.textColor) style["--foreground"] = hexToHslString(t.textColor);
  }

  // Adding contents class so this div doesn't break any flex/grid layouts.
  // CSS variables defined here will cascade down properly.
  return (
    <div style={style} className="contents">
      {children}
    </div>
  );
}
