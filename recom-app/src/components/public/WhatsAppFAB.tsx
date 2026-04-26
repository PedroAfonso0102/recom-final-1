"use client";

import React from "react";
import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const siteConfig = {
  contact: {
    phone: "5519999999999", // Replace with actual phone number
    whatsapp: "https://wa.me/5519999999999", // Replace with actual WhatsApp link
    email: "[EMAIL_ADDRESS]", // Replace with actual email
  },
};

export function WhatsAppFAB() {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <a
      href={`https://wa.me/${siteConfig.contact.phone.replace(/\D/g, "")}`}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[60] flex items-center justify-center h-12 w-12 md:h-14 md:w-14 rounded-full bg-accent text-accent-foreground shadow-premium transition-all duration-500 hover:scale-110 active:scale-95 group",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
      )}
      aria-label="Contato via WhatsApp"
    >
      <div className="absolute -top-12 right-0 bg-white text-foreground text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-md border border-border whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        Fale conosco agora
        <div className="absolute -bottom-1 right-5 w-2 h-2 bg-white border-b border-r border-border rotate-45" />
      </div>
      <MessageCircle className="h-6 w-6 animate-pulse" />
      <span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-20 pointer-events-none" />
    </a>
  );
}
