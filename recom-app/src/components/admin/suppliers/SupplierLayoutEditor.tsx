"use client";

import React from 'react';
import { SupplierLayout } from '@/cms/schemas/supplier.schema';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { FieldGroup } from '../admin-kit';
import { Input } from '@/components/ui/input';

interface SupplierLayoutEditorProps {
  value: SupplierLayout;
  onChange: (value: SupplierLayout) => void;
}

export function SupplierLayoutEditor({ value, onChange }: SupplierLayoutEditorProps) {
  const updateLayout = (updates: Partial<SupplierLayout>) => {
    onChange({ ...value, ...updates });
  };

  const labelStyles = "text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-3 block";

  return (
    <div className="space-y-10">
      <div className="space-y-6">
        <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-primary border-b border-slate-100 pb-2">Identidade e Tema</h4>
        <FieldGroup columns={2}>
          <div className="space-y-2">
            <Label className={labelStyles}>Tema Visual</Label>
            <select
              value={value.theme}
              onChange={e => updateLayout({ theme: e.target.value as any })}
              className="flex h-12 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 outline-none transition focus:ring-4 focus:ring-primary/5"
            >
              <option value="industrial">INDUSTRIAL (DARK MODE)</option>
              <option value="light">LIMPO (LIGHT MODE)</option>
              <option value="dark">DARK (PURE BLACK)</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label className={labelStyles}>Layout de Catálogos</Label>
            <select
              value={value.catalogLayout}
              onChange={e => updateLayout({ catalogLayout: e.target.value as any })}
              className="flex h-12 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 outline-none transition focus:ring-4 focus:ring-primary/5"
            >
              <option value="grid">GRID (PADRÃO)</option>
              <option value="list">LISTA (DETALHADO)</option>
              <option value="featured">DESTAQUE (EDITORIAL)</option>
            </select>
          </div>
        </FieldGroup>
      </div>

      <div className="space-y-6">
        <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-primary border-b border-slate-100 pb-2">Hero Section (Topo)</h4>
        <FieldGroup columns={2}>
          <div className="space-y-2">
            <Label className={labelStyles}>Modo do Hero</Label>
            <select
              value={value.heroMode}
              onChange={e => updateLayout({ heroMode: e.target.value as any })}
              className="flex h-12 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 outline-none transition focus:ring-4 focus:ring-primary/5"
            >
              <option value="image">IMAGEM ESTÁTICA</option>
              <option value="video">VÍDEO EM LOOP</option>
              <option value="carousel">CARROSSEL</option>
              <option value="none">OCULTAR HERO</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label className={labelStyles}>Cor de Overlay</Label>
            <div className="flex gap-3 items-center h-12 px-4 rounded-xl border border-slate-200 bg-white">
               <input 
                 type="color" 
                 value={value.overlayColor} 
                 onChange={e => updateLayout({ overlayColor: e.target.value })}
                 className="h-6 w-6 rounded cursor-pointer border-0 p-0 bg-transparent"
               />
               <Input 
                 value={value.overlayColor} 
                 onChange={e => updateLayout({ overlayColor: e.target.value })}
                 className="flex-1 h-8 border-0 shadow-none text-xs font-mono uppercase"
               />
            </div>
          </div>
        </FieldGroup>

        <div className="space-y-4">
            <Label className={labelStyles}>Opacidade do Overlay (0.0 a 1.0)</Label>
            <Input 
              type="number"
              min={0}
              max={1}
              step={0.05}
              value={value.overlayOpacity} 
              onChange={e => updateLayout({ overlayOpacity: parseFloat(e.target.value) || 0 })} 
              className="h-12 rounded-xl"
            />
        </div>

        <FieldGroup columns={2}>
           <div className="space-y-2">
              <Label className={labelStyles}>Imagem do Hero (URL)</Label>
              <Input 
                value={value.heroImage || ''} 
                onChange={e => updateLayout({ heroImage: e.target.value })}
                placeholder="https://..."
                className="h-12 rounded-xl"
              />
           </div>
           <div className="space-y-2">
              <Label className={labelStyles}>Vídeo do Hero (URL)</Label>
              <Input 
                value={value.heroVideo || ''} 
                onChange={e => updateLayout({ heroVideo: e.target.value })}
                placeholder="https://..."
                className="h-12 rounded-xl"
              />
           </div>
        </FieldGroup>
      </div>

      <div className="space-y-6">
        <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-primary border-b border-slate-100 pb-2">Visibilidade de Seções</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
           <div className="flex items-center space-x-3 p-4 rounded-xl border border-slate-100 bg-slate-50/50">
              <Checkbox 
                id="show-catalogs" 
                checked={value.showCatalogs}
                onCheckedChange={checked => updateLayout({ showCatalogs: !!checked })}
              />
              <Label htmlFor="show-catalogs" className="text-[10px] font-bold uppercase text-slate-700 cursor-pointer">Catálogos</Label>
           </div>
           <div className="flex items-center space-x-3 p-4 rounded-xl border border-slate-100 bg-slate-50/50">
              <Checkbox 
                id="show-products" 
                checked={value.showProductLines}
                onCheckedChange={checked => updateLayout({ showProductLines: !!checked })}
              />
              <Label htmlFor="show-products" className="text-[10px] font-bold uppercase text-slate-700 cursor-pointer">Produtos</Label>
           </div>
           <div className="flex items-center space-x-3 p-4 rounded-xl border border-slate-100 bg-slate-50/50">
              <Checkbox 
                id="show-media" 
                checked={value.showMediaGallery}
                onCheckedChange={checked => updateLayout({ showMediaGallery: !!checked })}
              />
              <Label htmlFor="show-media" className="text-[10px] font-bold uppercase text-slate-700 cursor-pointer">Galeria</Label>
           </div>
        </div>
      </div>
    </div>
  );
}
