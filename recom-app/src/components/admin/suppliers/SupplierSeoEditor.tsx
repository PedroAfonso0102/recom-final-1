"use client";

import React from 'react';
import { Seo } from '@/cms/schemas/seo.schema';
import { FieldGroup } from '../admin-kit';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Globe, Share2, Search } from 'lucide-react';

interface SupplierSeoEditorProps {
  value: Seo;
  onChange: (value: Seo) => void;
}

export function SupplierSeoEditor({ value, onChange }: SupplierSeoEditorProps) {
  const updateSeo = (updates: Partial<Seo>) => {
    onChange({ ...value, ...updates });
  };

  const labelStyles = "text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-3 block";

  return (
    <div className="space-y-12">
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-2">
           <Search className="h-4 w-4 text-primary" />
           <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-primary">SEO & Indexação</h4>
        </div>
        <div className="space-y-4">
           <div className="space-y-2">
              <Label className={labelStyles}>Título da Página (Meta Title)</Label>
              <Input 
                value={value.title || ''} 
                onChange={e => updateSeo({ title: e.target.value })}
                placeholder="Ex: Fabricante X | Soluções em Usinagem"
                className="h-12 rounded-xl"
              />
              <p className="text-[9px] text-muted-foreground uppercase tracking-tight">Recomendado: 50-60 caracteres.</p>
           </div>
           <div className="space-y-2">
              <Label className={labelStyles}>Meta Descrição</Label>
              <Textarea 
                value={value.description || ''} 
                onChange={e => updateSeo({ description: e.target.value })}
                placeholder="Breve resumo da página para os resultados de busca..."
                className="min-h-[100px] rounded-xl"
              />
              <p className="text-[9px] text-muted-foreground uppercase tracking-tight">Recomendado: 150-160 caracteres.</p>
           </div>
            <div className="space-y-2">
               <Label className={labelStyles}>Palavras-chave (Keywords)</Label>
               <Input 
                 value={typeof value.keywords === 'string' ? value.keywords : ''} 
                 onChange={e => updateSeo({ keywords: e.target.value })}
                 placeholder="usinagem, ferramentas, fresamento..."
                 className="h-12 rounded-xl"
               />
            </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-2">
           <Share2 className="h-4 w-4 text-primary" />
           <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-primary">Social (Open Graph)</h4>
        </div>
        <div className="space-y-4">
           <div className="space-y-2">
              <Label className={labelStyles}>Imagem de Compartilhamento (URL)</Label>
              <div className="flex gap-4 items-start">
                 <div className="flex h-24 w-40 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 overflow-hidden">
                    {value.ogImage ? (
                       <img src={value.ogImage} alt="Preview" className="h-full w-full object-cover" />
                    ) : (
                       <Globe className="h-8 w-8 text-slate-200" />
                    )}
                 </div>
                 <div className="flex-1 space-y-3">
                    <Input 
                      value={value.ogImage || ''} 
                      onChange={e => updateSeo({ ogImage: e.target.value })}
                      placeholder="https://..."
                      className="h-10 rounded-lg"
                    />
                    <p className="text-[9px] text-muted-foreground uppercase tracking-tight">Imagem que aparecerá ao compartilhar no WhatsApp, LinkedIn, etc. (1200x630px ideal)</p>
                 </div>
              </div>
           </div>
        </div>
      </div>

      <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
         <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Preview do Google</h5>
         <div className="space-y-1">
            <p className="text-blue-700 text-lg hover:underline cursor-pointer truncate">{value.title || 'Título da Página Fabricante'}</p>
            <p className="text-green-700 text-sm truncate">recom.com.br/fabricante/nome-do-fabricante</p>
            <p className="text-slate-600 text-sm line-clamp-2">{value.description || 'Nenhuma descrição definida. Defina uma meta descrição para melhorar o clique nos resultados de busca.'}</p>
         </div>
      </div>
    </div>
  );
}
