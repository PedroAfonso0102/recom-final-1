"use client";

import React from 'react';
import { Supplier } from '@/cms/schemas/supplier.schema';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { FieldGroup } from '../admin-kit';
import { Textarea } from '@/components/ui/textarea';

interface SupplierGeneralFieldsProps {
  data: Supplier;
  processes: Array<{ id: string; name: string }>;
  onChange: <K extends keyof Supplier>(field: K, value: Supplier[K]) => void;
}

export function SupplierGeneralFields({ data, processes, onChange }: SupplierGeneralFieldsProps) {
  const labelStyles = "text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-2 block";
  const inputStyles = "h-12 rounded-xl border-slate-200 focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all";

  return (
    <div className="space-y-8">
      <FieldGroup columns={2}>
        <div className="space-y-1">
          <label className={labelStyles}>Nome da Fábrica</label>
          <Input 
            value={data.name} 
            onChange={e => onChange('name', e.target.value)}
            placeholder="Ex: MITSUBISHI MATERIALS" 
            className={inputStyles}
          />
        </div>
        <div className="space-y-1">
          <label className={labelStyles}>Slug (URL ID)</label>
          <Input 
            value={data.slug} 
            onChange={e => onChange('slug', e.target.value)}
            placeholder="ex-mitsubishi-materials" 
            className={inputStyles}
          />
          <p className="text-[9px] text-muted-foreground uppercase tracking-tight mt-1">
            recom.com/fornecedores/{data.slug || '[slug]'}
          </p>
        </div>
      </FieldGroup>

      <div className="space-y-1">
        <label className={labelStyles}>Chamada Curta (One-liner)</label>
        <Input 
          value={data.shortDescription} 
          onChange={e => onChange('shortDescription', e.target.value)}
          placeholder="Líder global em soluções de corte..." 
          className={inputStyles}
        />
      </div>

      <div className="space-y-1">
        <label className={labelStyles}>Descrição Técnica / Institucional</label>
        <Textarea 
          value={data.description} 
          onChange={e => onChange('description', e.target.value)}
          placeholder="Texto completo sobre a história e diferenciais técnicos..."
          className="min-h-[160px] rounded-xl border-slate-200 focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all"
        />
      </div>

      <FieldGroup columns={2}>
        <div className="space-y-1">
          <label className={labelStyles}>Segmento</label>
          <Input 
            value={data.segment || ''} 
            onChange={e => onChange('segment', e.target.value)}
            placeholder="Ex: Metalmecânico" 
            className={inputStyles}
          />
        </div>
        <div className="space-y-1">
          <label className={labelStyles}>Website Oficial</label>
          <Input 
            value={data.websiteUrl || ''} 
            onChange={e => onChange('websiteUrl', e.target.value)}
            placeholder="https://..." 
            className={inputStyles}
          />
        </div>
      </FieldGroup>

      <FieldGroup columns={2}>
        <div className="space-y-1">
          <label className={labelStyles}>Email de Contato</label>
          <Input 
            value={data.contactEmail || ''} 
            onChange={e => onChange('contactEmail', e.target.value)}
            placeholder="contato@empresa.com" 
            className={inputStyles}
          />
        </div>
        <div className="space-y-1">
          <label className={labelStyles}>Telefone</label>
          <Input 
            value={data.contactPhone || ''} 
            onChange={e => onChange('contactPhone', e.target.value)}
            placeholder="+55..." 
            className={inputStyles}
          />
        </div>
      </FieldGroup>

      <div className="space-y-1">
        <label className={labelStyles}>Status</label>
        <select
          value={data.status}
          onChange={e => onChange('status', e.target.value as any)}
          className="flex h-12 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 outline-none transition focus:ring-4 focus:ring-primary/5 focus:border-primary"
        >
          <option value="draft">Rascunho</option>
          <option value="active">Ativo (Público)</option>
          <option value="archived">Arquivado</option>
        </select>
      </div>
    </div>
  );
}
