"use client";

import React, { useState } from 'react';
import { SupplierProductLine } from '@/cms/schemas/supplier.schema';
import { Button } from '@/components/ui/button';
import { Plus, GripVertical, Box, ChevronRight, Trash2, ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { EntityDrawer, FieldGroup } from '../admin-kit';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface SupplierProductLinesEditorProps {
  value: SupplierProductLine[];
  onChange: (value: SupplierProductLine[]) => void;
}

export function SupplierProductLinesEditor({ value, onChange }: SupplierProductLinesEditorProps) {
  const [editingId, setEditingId] = useState<string | null>(null);

  const addLine = () => {
    const newLine: SupplierProductLine = {
      id: crypto.randomUUID(),
      name: 'Nova Linha de Produtos',
      description: '',
      imageUrl: '',
      sortOrder: value.length,
    };
    onChange([...value, newLine]);
    setEditingId(newLine.id);
  };

  const removeLine = (id: string) => {
    onChange(value.filter(l => l.id !== id));
    if (editingId === id) setEditingId(null);
  };

  const updateLine = (id: string, updates: Partial<SupplierProductLine>) => {
    onChange(value.map(l => l.id === id ? { ...l, ...updates } : l));
  };

  const editingLine = value.find(l => l.id === editingId);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500">
          Linhas de Produtos ({value.length})
        </h3>
        <Button onClick={addLine} size="sm" className="gap-2">
          <Plus className="h-4 w-4" /> Adicionar Linha
        </Button>
      </div>

      <div className="grid gap-3">
        {value.length === 0 && (
          <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50 text-slate-400">
            <Box className="h-8 w-8 mb-2 opacity-20" />
            <p className="text-xs font-bold uppercase tracking-widest">Nenhuma linha cadastrada</p>
          </div>
        )}
        {value.map((line, index) => (
          <div 
            key={line.id}
            className={cn(
              "group flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-xl transition-all hover:border-primary/30 hover:shadow-md",
              editingId === line.id && "border-primary ring-2 ring-primary/10 shadow-lg"
            )}
          >
            <div className="cursor-grab active:cursor-grabbing text-slate-300">
              <GripVertical className="h-4 w-4" />
            </div>
            
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-slate-100 bg-slate-50 overflow-hidden">
              {line.imageUrl ? (
                <img src={line.imageUrl} alt="" className="h-full w-full object-cover" />
              ) : (
                <Box className="h-5 w-5 text-slate-300" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-slate-900 truncate">{line.name || 'Sem nome'}</p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 truncate max-w-md">
                {line.description || 'Sem descrição'}
              </p>
            </div>

            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0 text-slate-400 hover:text-destructive"
                onClick={() => removeLine(line.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="h-8 px-3 text-[10px] font-bold uppercase tracking-widest gap-2"
                onClick={() => setEditingId(line.id)}
              >
                Editar <ChevronRight className="h-3 w-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <EntityDrawer
        title="Editar Linha de Produto"
        subtitle={editingLine?.name}
        open={!!editingId}
        onClose={() => setEditingId(null)}
      >
        {editingLine && (
          <div className="space-y-8">
            <div className="space-y-4">
               <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary border-b border-slate-100 pb-2">Informações Básicas</h4>
               <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold uppercase text-slate-500">Nome da Linha</Label>
                  <Input 
                    value={editingLine.name} 
                    onChange={e => updateLine(editingLine.id, { name: e.target.value })}
                    placeholder="Ex: Linha de Ferramentas de Metal Duro"
                  />
               </div>
               <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold uppercase text-slate-500">Descrição</Label>
                  <Textarea 
                    value={editingLine.description || ''} 
                    onChange={e => updateLine(editingLine.id, { description: e.target.value })}
                    placeholder="Destaques técnicos desta linha..."
                    className="min-h-[100px]"
                  />
               </div>
            </div>

            <div className="space-y-4">
               <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary border-b border-slate-100 pb-2">Visual</h4>
               <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold uppercase text-slate-500">Imagem de Destaque (URL)</Label>
                  <div className="flex gap-4 items-start">
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 overflow-hidden">
                      {editingLine.imageUrl ? (
                        <img src={editingLine.imageUrl} alt="" className="h-full w-full object-cover" />
                      ) : (
                        <ImageIcon className="h-6 w-6 text-slate-200" />
                      )}
                    </div>
                    <div className="flex-1">
                      <Input 
                        value={editingLine.imageUrl || ''} 
                        onChange={e => updateLine(editingLine.id, { imageUrl: e.target.value })}
                        placeholder="https://..."
                      />
                      <p className="text-[9px] text-muted-foreground mt-2 uppercase tracking-tight">URL da imagem que representa esta categoria/linha de produtos.</p>
                    </div>
                  </div>
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
