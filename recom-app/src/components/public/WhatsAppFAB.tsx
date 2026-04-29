"use client";

import React from "react";
import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/config";
import { useAnalytics } from "@/hooks/use-analytics";

export function WhatsAppFAB({ whatsapp }: { whatsapp?: string }) {
  const { whatsappClick } = useAnalytics();
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <a
      href={`https://wa.me/${whatsapp || siteConfig.contact.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group fixed bottom-4 right-4 z-[60] flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-premium transition-all duration-500 hover:scale-110 active:scale-95 md:bottom-8 md:right-8 md:h-14 md:w-14",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
      )}
      onClick={() => whatsappClick("floating_button")}
      aria-label="Contato via WhatsApp"
    >
      <div className="pointer-events-none absolute -top-12 right-0 whitespace-nowrap rounded-lg border border-border bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-foreground opacity-0 shadow-md transition-opacity duration-300 group-hover:opacity-100">
        Fale com a RECOM
        <div className="absolute -bottom-1 right-5 h-2 w-2 rotate-45 border-b border-r border-border bg-white" />
      </div>
      <MessageCircle className="h-6 w-6 animate-pulse" />
      <span className="pointer-events-none absolute inset-0 rounded-full bg-accent opacity-20 animate-ping" aria-hidden="true" />
    </a>
  );
}
