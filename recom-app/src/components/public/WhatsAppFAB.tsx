"use client";

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { siteConfig } from '@/lib/config';

export function WhatsAppFAB() {
  return (
    <a
      href={siteConfig.contact.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-[100] group flex items-center gap-3"
      aria-label="Atendimento via WhatsApp"
    >
      {/* Label Tooltip (Industrial Style) */}
      <div className="bg-primary text-primary-foreground px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0 pointer-events-none">
        Canal de Atendimento
      </div>

      {/* Industrial Button */}
      <div className="h-14 w-14 bg-accent text-accent-foreground flex items-center justify-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-[2px] group-hover:translate-y-[2px] group-hover:shadow-none transition-all">
        <MessageCircle className="h-6 w-6 stroke-[3px]" />
      </div>

      {/* Decorative Corner (Technical aesthetic) */}
      <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-primary opacity-50 group-hover:opacity-100 transition-opacity" />
    </a>
  );
}
