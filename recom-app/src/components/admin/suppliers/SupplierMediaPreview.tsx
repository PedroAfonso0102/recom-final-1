"use client";

import React from 'react';
import { SupplierMediaItem } from '@/cms/schemas/supplier.schema';
import { ImageIcon, Video, FileText, AlertCircle, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SupplierMediaPreviewProps {
  media: SupplierMediaItem[];
}

export function SupplierMediaPreview({ media }: SupplierMediaPreviewProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="h-4 w-4" />;
      case 'pdf': 
      case 'technical_file': return <FileText className="h-4 w-4" />;
      default: return <ImageIcon className="h-4 w-4" />;
    }
  };

  const validateItem = (item: SupplierMediaItem) => {
    const issues = [];
    if (!item.title) issues.push("Sem título");
    if (item.type === 'image' && !item.alt) issues.push("Sem ALT text");
    if (!item.url) issues.push("URL faltando");
    return issues;
  };

  if (media.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 border border-dashed border-slate-200 rounded-xl bg-slate-50/50 text-slate-400">
        <ImageIcon className="h-6 w-6 mb-2 opacity-20" />
        <p className="text-[10px] font-bold uppercase tracking-widest">Nenhuma mídia para preview</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Preview da Galeria</h4>
        <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 rounded-full text-slate-600">
          {media.length} ITENS
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {media.map((item) => {
          const issues = validateItem(item);
          const hasIssues = issues.length > 0;

          return (
            <div 
              key={item.id}
              className={cn(
                "group flex flex-col border rounded-xl overflow-hidden transition-all bg-white",
                hasIssues ? "border-amber-100 hover:border-amber-200" : "border-slate-100 hover:border-slate-200"
              )}
            >
              <div className="flex gap-3 p-3">
                {/* Thumbnail Preview */}
                <div className="relative h-16 w-20 shrink-0 bg-slate-50 rounded-lg overflow-hidden border border-slate-100">
                  {item.url && item.type === 'image' ? (
                    <img 
                      src={item.thumbnailUrl || item.url} 
                      alt={item.alt || ''} 
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-slate-200">
                      {getIcon(item.type)}
                    </div>
                  )}
                  <div className="absolute top-1 left-1 p-1 bg-white/90 backdrop-blur rounded shadow-sm">
                    {getIcon(item.type)}
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 py-0.5">
                  <p className="text-[11px] font-bold text-slate-900 truncate uppercase tracking-tight">
                    {item.title || 'Mídia sem título'}
                  </p>
                  <p className="text-[9px] font-medium text-slate-400 uppercase tracking-widest mt-1">
                    {item.type} • {item.url ? 'URL Configurada' : 'Aguardando URL'}
                  </p>
                  
                  {/* Status Badges */}
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {hasIssues ? (
                      issues.map(issue => (
                        <span key={issue} className="flex items-center gap-1 px-1.5 py-0.5 bg-amber-50 text-amber-600 rounded text-[8px] font-bold uppercase tracking-tighter">
                          <AlertCircle className="h-2.5 w-2.5" />
                          {issue}
                        </span>
                      ))
                    ) : (
                      <span className="flex items-center gap-1 px-1.5 py-0.5 bg-emerald-50 text-emerald-600 rounded text-[8px] font-bold uppercase tracking-tighter">
                        <CheckCircle2 className="h-2.5 w-2.5" />
                        Pronto
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {(item.caption || item.alt) && (
                <div className="px-3 pb-3 pt-0 border-t border-slate-50 mt-1">
                  {item.alt && (
                    <p className="text-[9px] text-slate-500 italic mt-2">
                      <span className="font-bold uppercase not-italic text-[8px] mr-1 text-slate-400">Alt:</span>
                      &quot;{item.alt}&quot;
                    </p>
                  )}
                  {item.caption && (
                    <p className="text-[9px] text-slate-500 mt-1">
                      <span className="font-bold uppercase text-[8px] mr-1 text-slate-400">Legenda:</span>
                      {item.caption}
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
