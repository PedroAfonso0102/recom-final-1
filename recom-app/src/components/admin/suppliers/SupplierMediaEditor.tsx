"use client";

import React, { useState } from 'react';
import { SupplierMediaItem } from '@/cms/schemas/supplier.schema';
import { Button } from '@/components/ui/button';
import { Plus, GripVertical, Image as ImageIcon, Video, FileText, Trash2, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { EntityDrawer, FieldGroup } from '../admin-kit';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface SupplierMediaEditorProps {
  value: SupplierMediaItem[];
  onChange: (value: SupplierMediaItem[]) => void;
}

export function SupplierMediaEditor({ value, onChange }: SupplierMediaEditorProps) {
  const [editingId, setEditingId] = useState<string | null>(null);

  const addMedia = () => {
    const newMedia: SupplierMediaItem = {
      id: crypto.randomUUID(),
      type: 'image',
      title: '',
      url: '',
      thumbnailUrl: '',
      alt: '',
      caption: '',
      sortOrder: value.length,
    };
    onChange([...value, newMedia]);
    setEditingId(newMedia.id);
  };

  const removeMedia = (id: string) => {
    onChange(value.filter(m => m.id !== id));
    if (editingId === id) setEditingId(null);
  };

  const updateMedia = (id: string, updates: Partial<SupplierMediaItem>) => {
    onChange(value.map(m => m.id === id ? { ...m, ...updates } : m));
  };

  const editingMedia = value.find(m => m.id === editingId);

  const getIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="h-4 w-4" />;
      case 'pdf': 
      case 'technical_file': return <FileText className="h-4 w-4" />;
      default: return <ImageIcon className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500">
          Galeria e Mídia ({value.length})
        </h3>
        <Button onClick={addMedia} size="sm" className="gap-2">
          <Plus className="h-4 w-4" /> Adicionar Mídia
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {value.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center p-12 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50 text-slate-400">
            <ImageIcon className="h-8 w-8 mb-2 opacity-20" />
            <p className="text-xs font-bold uppercase tracking-widest">Nenhuma mídia cadastrada</p>
          </div>
        )}
        {value.map((media, index) => (
          <div 
            key={media.id}
            className={cn(
              "group relative overflow-hidden bg-white border border-slate-200 rounded-xl transition-all hover:border-primary/30 hover:shadow-md aspect-[4/3]",
              editingId === media.id && "border-primary ring-2 ring-primary/10 shadow-lg"
            )}
          >
            {media.url ? (
              <img src={media.thumbnailUrl || media.url} alt={media.alt || ''} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-slate-50 text-slate-200">
                {getIcon(media.type)}
              </div>
            )}
            
            <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-4 text-center">
               <p className="text-xs font-bold text-white truncate w-full">{media.title || 'Sem título'}</p>
               <div className="flex gap-2">
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="h-8 px-3 text-[10px] font-bold uppercase tracking-widest"
                    onClick={() => setEditingId(media.id)}
                  >
                    Editar
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    className="h-8 w-8 p-0"
                    onClick={() => removeMedia(media.id)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
               </div>
            </div>
            
            <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-1 bg-white/90 rounded-md text-[9px] font-black uppercase tracking-widest text-slate-700 backdrop-blur-sm">
               {getIcon(media.type)}
               {media.type}
            </div>
          </div>
        ))}
      </div>

      <EntityDrawer
        title="Editar Mídia"
        subtitle={editingMedia?.title || 'Nova Mídia'}
        open={!!editingId}
        onClose={() => setEditingId(null)}
      >
        {editingMedia && (
          <div className="space-y-8">
            <div className="space-y-4">
               <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary border-b border-slate-100 pb-2">Configurações de Mídia</h4>
               <FieldGroup columns={2}>
                 <div className="space-y-1.5">
                    <Label className="text-[10px] font-bold uppercase text-slate-500">Título</Label>
                    <Input 
                      value={editingMedia.title || ''} 
                      onChange={e => updateMedia(editingMedia.id, { title: e.target.value })}
                      placeholder="Título da mídia"
                    />
                 </div>
                 <div className="space-y-1.5">
                    <Label className="text-[10px] font-bold uppercase text-slate-500">Tipo</Label>
                    <select
                      value={editingMedia.type}
                      onChange={e => updateMedia(editingMedia.id, { type: e.target.value as any })}
                      className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
                    >
                      <option value="image">Imagem</option>
                      <option value="video">Vídeo</option>
                      <option value="pdf">PDF</option>
                      <option value="technical_file">Arquivo Técnico</option>
                    </select>
                 </div>
               </FieldGroup>
               <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold uppercase text-slate-500">URL Principal</Label>
                  <Input 
                    value={editingMedia.url} 
                    onChange={e => updateMedia(editingMedia.id, { url: e.target.value })}
                    placeholder="https://..."
                  />
               </div>
               {editingMedia.type === 'video' && (
                  <div className="space-y-1.5">
                    <Label className="text-[10px] font-bold uppercase text-slate-500">URL da Thumbnail (Opcional)</Label>
                    <Input 
                      value={editingMedia.thumbnailUrl || ''} 
                      onChange={e => updateMedia(editingMedia.id, { thumbnailUrl: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>
               )}
            </div>

            <div className="space-y-4">
               <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary border-b border-slate-100 pb-2">Metadados</h4>
               <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold uppercase text-slate-500">Texto Alternativo (ALT)</Label>
                  <Input 
                    value={editingMedia.alt || ''} 
                    onChange={e => updateMedia(editingMedia.id, { alt: e.target.value })}
                    placeholder="Descrição para acessibilidade..."
                  />
               </div>
               <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold uppercase text-slate-500">Legenda (Caption)</Label>
                  <Input 
                    value={editingMedia.caption || ''} 
                    onChange={e => updateMedia(editingMedia.id, { caption: e.target.value })}
                    placeholder="Legenda que aparece abaixo da mídia..."
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
