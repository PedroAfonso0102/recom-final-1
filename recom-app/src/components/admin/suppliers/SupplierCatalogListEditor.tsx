"use client";

import React, { useState } from 'react';
import { SupplierCatalog, SupplierProductLine } from '@/cms/schemas/supplier.schema';
import { Button } from '@/components/ui/button';
import { Plus, GripVertical, FileText, ChevronRight, Trash2, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { EntityDrawer, FieldGroup } from '../admin-kit';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface SupplierCatalogListEditorProps {
  value: SupplierCatalog[];
  productLines: SupplierProductLine[];
  onChange: (value: SupplierCatalog[]) => void;
}

export function SupplierCatalogListEditor({ value, productLines, onChange }: SupplierCatalogListEditorProps) {
  const [editingId, setEditingId] = useState<string | null>(null);

  const addCatalog = () => {
    const newCatalog: SupplierCatalog = {
      id: crypto.randomUUID(),
      title: 'Novo Catálogo',
      slug: '',
      category: '',
      description: '',
      coverImage: '',
      fileUrl: '',
      productLineIds: [],
      featured: false,
      sortOrder: value.length,
      status: 'draft',
    };
    onChange([...value, newCatalog]);
    setEditingId(newCatalog.id);
  };

  const removeCatalog = (id: string) => {
    onChange(value.filter(c => c.id !== id));
    if (editingId === id) setEditingId(null);
  };

  const updateCatalog = (id: string, updates: Partial<SupplierCatalog>) => {
    onChange(value.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const editingCatalog = value.find(c => c.id === editingId);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500">
          Catálogos ({value.length})
        </h3>
        <Button onClick={addCatalog} size="sm" className="gap-2">
          <Plus className="h-4 w-4" /> Adicionar Catálogo
        </Button>
      </div>

      <div className="grid gap-3">
        {value.length === 0 && (
          <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50 text-slate-400">
            <FileText className="h-8 w-8 mb-2 opacity-20" />
            <p className="text-xs font-bold uppercase tracking-widest">Nenhum catálogo cadastrado</p>
          </div>
        )}
        {value.map((catalog, _index) => (
          <div 
            key={catalog.id}
            className={cn(
              "group flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-xl transition-all hover:border-primary/30 hover:shadow-md",
              editingId === catalog.id && "border-primary ring-2 ring-primary/10 shadow-lg"
            )}
          >
            <div className="cursor-grab active:cursor-grabbing text-slate-300">
              <GripVertical className="h-4 w-4" />
            </div>
            
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-slate-100 bg-slate-50 overflow-hidden">
              {catalog.coverImage ? (
                <img src={catalog.coverImage} alt="" className="h-full w-full object-cover" />
              ) : (
                <FileText className="h-5 w-5 text-slate-300" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-bold text-slate-900 truncate">{catalog.title || 'Sem título'}</p>
                {catalog.featured && <Star className="h-3 w-3 fill-amber-400 text-amber-400" />}
              </div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {catalog.category || 'Sem categoria'} • {catalog.status === 'published' ? 'Publicado' : 'Rascunho'}
              </p>
            </div>

            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0 text-slate-400 hover:text-destructive"
                onClick={() => removeCatalog(catalog.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="h-8 px-3 text-[10px] font-bold uppercase tracking-widest gap-2"
                onClick={() => setEditingId(catalog.id)}
              >
                Editar <ChevronRight className="h-3 w-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <EntityDrawer
        title="Editar Catálogo"
        subtitle={editingCatalog?.title}
        open={!!editingId}
        onClose={() => setEditingId(null)}
      >
        {editingCatalog && (
          <div className="space-y-8">
            <div className="space-y-4">
               <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary border-b border-slate-100 pb-2">Identificação</h4>
               <FieldGroup columns={2}>
                 <div className="space-y-1.5">
                    <Label className="text-[10px] font-bold uppercase text-slate-500">Título</Label>
                    <Input 
                      value={editingCatalog.title} 
                      onChange={e => updateCatalog(editingCatalog.id, { title: e.target.value })}
                      placeholder="Ex: Catálogo Geral 2024"
                    />
                 </div>
                 <div className="space-y-1.5">
                    <Label className="text-[10px] font-bold uppercase text-slate-500">Slug (Opcional)</Label>
                    <Input 
                      value={editingCatalog.slug || ''} 
                      onChange={e => updateCatalog(editingCatalog.id, { slug: e.target.value })}
                      placeholder="catalogo-geral"
                    />
                 </div>
               </FieldGroup>
               <FieldGroup columns={2}>
                 <div className="space-y-1.5">
                    <Label className="text-[10px] font-bold uppercase text-slate-500">Categoria</Label>
                    <Input 
                      value={editingCatalog.category || ''} 
                      onChange={e => updateCatalog(editingCatalog.id, { category: e.target.value })}
                      placeholder="Fresamento, Torneamento..."
                    />
                 </div>
                 <div className="space-y-1.5">
                    <Label className="text-[10px] font-bold uppercase text-slate-500">Status</Label>
                    <select
                      value={editingCatalog.status}
                      onChange={e => updateCatalog(editingCatalog.id, { status: e.target.value as SupplierCatalog['status'] })}
                      className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
                    >
                      <option value="draft">Rascunho</option>
                      <option value="published">Publicado</option>
                      <option value="archived">Arquivado</option>
                    </select>
                 </div>
               </FieldGroup>
               <div className="flex items-center space-x-2 pt-2">
                  <Checkbox 
                    id="featured-catalog" 
                    checked={editingCatalog.featured}
                    onCheckedChange={checked => updateCatalog(editingCatalog.id, { featured: !!checked })}
                  />
                  <Label htmlFor="featured-catalog" className="text-[10px] font-bold uppercase text-slate-700 cursor-pointer">Destaque na página do fornecedor</Label>
               </div>
            </div>

            <div className="space-y-4">
               <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary border-b border-slate-100 pb-2">Conteúdo</h4>
               <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold uppercase text-slate-500">Descrição</Label>
                  <Textarea 
                    value={editingCatalog.description || ''} 
                    onChange={e => updateCatalog(editingCatalog.id, { description: e.target.value })}
                    placeholder="Breve descrição do que este catálogo contém..."
                  />
               </div>
            </div>

            <div className="space-y-4">
               <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary border-b border-slate-100 pb-2">Mídia e Arquivo</h4>
               <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold uppercase text-slate-500">Capa do Catálogo (URL)</Label>
                  <Input 
                    value={editingCatalog.coverImage || ''} 
                    onChange={e => updateCatalog(editingCatalog.id, { coverImage: e.target.value })}
                    placeholder="https://..."
                  />
               </div>
               <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold uppercase text-slate-500">Arquivo PDF (URL)</Label>
                  <Input 
                    value={editingCatalog.fileUrl || ''} 
                    onChange={e => updateCatalog(editingCatalog.id, { fileUrl: e.target.value })}
                    placeholder="https://..."
                  />
               </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-100">
               <Button onClick={() => setEditingId(null)} className="w-full uppercase font-bold tracking-widest text-xs h-12">
                 Confirmar Alterações
               </Button>
            </div>
          </div>
        )}
      </EntityDrawer>
    </div>
  );
}
