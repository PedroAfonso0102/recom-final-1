"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { SupplierSchema, Supplier } from '@/cms/schemas/supplier.schema';
import { createSupplier, updateSupplier } from '@/server/actions/suppliers';
import { RecomButton } from '@/design-system/components/recom-button';
import { RecomCard } from '@/design-system/components/recom-card';
import { cn } from '@/lib/utils';
import { safeZodResolver } from '@/lib/forms/safe-zod-resolver';
import { useFieldArray } from 'react-hook-form';
import { Plus, Trash2, Image as ImageIcon, X } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { MediaPickerDialog } from '@/components/admin/MediaPickerDialog';
import type { MediaAsset } from '@/server/actions/media';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface SupplierFormProps {
  initialData?: Partial<Supplier> & { id?: string };
}

export function SupplierForm({ initialData }: SupplierFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [logoUrl, setLogoUrl] = useState(initialData?.logoUrl || '');
  const [pickerOpen, setPickerOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<MediaAsset | null>(null);
  const isEditing = !!initialData?.id;

  const form = useForm<Supplier>({
    resolver: safeZodResolver(SupplierSchema),
    defaultValues: {
      name: initialData?.name || '',
      slug: initialData?.slug || '',
      shortDescription: initialData?.shortDescription || '',
      longDescription: initialData?.longDescription || '',
      status: initialData?.status || 'draft',
      sortOrder: initialData?.sortOrder || 0,
      logoUrl: initialData?.logoUrl || '',
      catalogUrl: initialData?.catalogUrl || '',
      eCatalogUrl: initialData?.eCatalogUrl || '',
      catalogs: initialData?.catalogs || [],
      settings: initialData?.settings || {
        showMenu: true,
        showPromotions: true,
        showProcesses: true,
        featured: false,
      },
      relatedProcesses: initialData?.relatedProcesses || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "catalogs",
  });

  const [success, setSuccess] = useState(false);

  async function onSubmit(data: Supplier) {
    setError(null);
    setSuccess(false);
    setLoading(true);
    
    try {
      console.log('Iniciando submissão do formulário...', isEditing ? 'Edição' : 'Criação');
      const result = isEditing
        ? await updateSupplier(initialData!.id!, data)
        : await createSupplier(data);

      if (result && !result.success) {
        setError(result.error || 'Erro desconhecido ao salvar.');
        setSuccess(false);
      } else {
        console.log('Operação realizada com sucesso!');
        setSuccess(true);
        // O servidor pode ter disparado um redirect, mas por garantia, 
        // se ainda estivermos na página após 1.5s, forçamos o redirecionamento.
        setTimeout(() => {
          router.push('/admin/fornecedores');
          router.refresh();
        }, 1500);
      }
    } catch (e: unknown) {
      // Tratar o erro de redirecionamento do Next.js
      const errorStr = String(e);
      if (errorStr.includes('NEXT_REDIRECT') || errorStr.includes('redirect')) {
        console.log('Redirecionamento detectado. Saindo...');
        return; 
      }
      
      console.error('Erro na submissão:', e);
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('Ocorreu um erro inesperado ao processar sua solicitação.');
      }
    } finally {
      setLoading(false);
    }
  }

  const labelStyles = "text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-2 block";
  const inputStyles = "bg-white border-border rounded-lg focus:ring-2 focus:ring-primary/20 transition-all h-12 text-sm font-medium shadow-sm";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
        <RecomCard className="p-8 border-border">
          {error && (
            <div className="mb-8 p-4 bg-destructive/5 border border-destructive/20 text-xs font-bold uppercase tracking-widest text-destructive">
              Erro no processamento: {error}
            </div>
          )}

          {success && (
            <div className="mb-8 p-4 bg-emerald-50 border border-emerald-200 text-xs font-bold uppercase tracking-widest text-emerald-700">
              Dados salvos com sucesso! Redirecionando...
            </div>
          )}

          <div className="flex flex-col gap-8">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-primary mb-6 border-b border-border pb-2">
                Identificação Básica
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={labelStyles}>Nome da Fábrica</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: MITSUBISHI MATERIALS" className={inputStyles} {...field} />
                      </FormControl>
                      <FormMessage className="text-[10px] uppercase font-bold tracking-tight" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={labelStyles}>Slug de Identificação (ID)</FormLabel>
                      <FormControl>
                        <Input placeholder="ex-mitsubishi-materials" className={inputStyles} {...field} />
                      </FormControl>
                      <FormDescription className="text-[10px] font-medium text-muted-foreground/60 uppercase">
                        Usado na URL: recom.com/fornecedores/[slug]
                      </FormDescription>
                      <FormMessage className="text-[10px] uppercase font-bold tracking-tight" />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-primary mb-6 border-b border-border pb-2">
                Conteúdo Editorial
              </h3>
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="shortDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={labelStyles}>Chamada Curta (One-liner)</FormLabel>
                      <FormControl>
                        <Input placeholder="Líder global em soluções de corte..." className={inputStyles} {...field} />
                      </FormControl>
                      <FormMessage className="text-[10px] uppercase font-bold tracking-tight" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="longDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={labelStyles}>Descrição Técnica / Institucional</FormLabel>
                      <FormControl>
                        <textarea
                          className={cn(
                            inputStyles,
                            "flex min-h-[160px] w-full px-3 py-3 ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                          )}
                          placeholder="Texto completo sobre a história e diferenciais técnicos..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-[10px] uppercase font-bold tracking-tight" />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-primary mb-6 border-b border-border pb-2">
                Recursos Digitais
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField
                  control={form.control}
                  name="logoUrl"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel className={labelStyles}>Logotipo</FormLabel>
                      <div className="grid gap-4 rounded-2xl border border-border bg-slate-50/60 p-4 md:grid-cols-[180px_minmax(0,1fr)]">
                        <div className="overflow-hidden rounded-xl border border-border bg-white">
                          <div className="aspect-[4/3] bg-slate-100">
                            {logoUrl ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={logoUrl} alt="Preview do logotipo" className="h-full w-full object-contain p-4" />
                            ) : (
                              <div className="flex h-full items-center justify-center text-muted-foreground">
                                <ImageIcon className="h-10 w-10" />
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="space-y-3">
                          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                            Identidade visual do fornecedor
                          </p>
                          <div className="flex flex-wrap gap-2">
                            <RecomButton type="button" intent="outline" className="h-10 px-4 text-[10px] font-bold uppercase tracking-wider gap-2" onClick={() => setPickerOpen(true)}>
                              <ImageIcon className="h-3.5 w-3.5" />
                              Selecionar mídia
                            </RecomButton>
                            <RecomButton
                              type="button"
                              intent="outline"
                              className="h-10 px-4 text-[10px] font-bold uppercase tracking-wider gap-2"
                              onClick={() => {
                                setLogoUrl('');
                                setSelectedMedia(null);
                                field.onChange('');
                                form.setValue('logoUrl', '', { shouldDirty: true, shouldValidate: true });
                              }}
                              disabled={!logoUrl}
                            >
                              <X className="h-3.5 w-3.5" />
                              Limpar
                            </RecomButton>
                          </div>
                          <Input
                            placeholder="https://..."
                            className={inputStyles}
                            value={logoUrl}
                            onChange={(event) => {
                              const nextValue = event.target.value;
                              setLogoUrl(nextValue);
                              setSelectedMedia(null);
                              field.onChange(nextValue);
                              form.setValue('logoUrl', nextValue, { shouldDirty: true, shouldValidate: true });
                            }}
                          />
                          <p className="text-[10px] uppercase font-medium tracking-widest text-muted-foreground">
                            {selectedMedia ? `Selecionada: ${selectedMedia.file_name}` : 'Use a biblioteca ou cole uma URL pública.'}
                          </p>
                        </div>
                      </div>
                      <FormMessage className="text-[10px] uppercase font-bold tracking-tight" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="catalogUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={labelStyles}>Link do Catálogo PDF (Principal)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://..." className={inputStyles} {...field} value={field.value ?? ''} />
                      </FormControl>
                      <FormMessage className="text-[10px] uppercase font-bold tracking-tight" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="eCatalogUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={labelStyles}>Link do E-Catalog (Interativo)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://..." className={inputStyles} {...field} value={field.value ?? ''} />
                      </FormControl>
                      <FormMessage className="text-[10px] uppercase font-bold tracking-tight" />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-6 border-b border-border pb-2">
                <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
                  Catálogos Adicionais
                </h3>
                <RecomButton
                  type="button"
                  intent="outline"
                  onClick={() => append({ label: '', url: '' })}
                  className="h-8 px-3 text-[10px] font-bold uppercase tracking-wider gap-2"
                >
                  <Plus className="h-3 w-3" /> Adicionar
                </RecomButton>
              </div>
              
              <div className="space-y-4">
                {fields.length === 0 && (
                  <p className="text-[10px] text-muted-foreground uppercase font-medium italic">Nenhum catálogo extra configurado.</p>
                )}
                {fields.map((field, index) => (
                  <div key={field.id} className="grid grid-cols-1 md:grid-cols-[1fr_2fr_auto] gap-4 items-end bg-slate-50/50 p-4 rounded-lg border border-slate-100">
                    <FormField
                      control={form.control}
                      name={`catalogs.${index}.label`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[9px] uppercase font-bold text-muted-foreground">Nome/Label</FormLabel>
                          <FormControl>
                            <Input placeholder="Ex: Linha MP" className="bg-white h-10 text-xs" {...field} />
                          </FormControl>
                          <FormMessage className="text-[10px]" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`catalogs.${index}.url`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[9px] uppercase font-bold text-muted-foreground">URL do PDF</FormLabel>
                          <FormControl>
                            <Input placeholder="https://..." className="bg-white h-10 text-xs" {...field} />
                          </FormControl>
                          <FormMessage className="text-[10px]" />
                        </FormItem>
                      )}
                    />
                    <RecomButton
                      type="button"
                      intent="outline"
                      onClick={() => remove(index)}
                      className="h-10 w-10 p-0 text-destructive border-destructive/20 hover:bg-destructive/5"
                    >
                      <Trash2 className="h-4 w-4" />
                    </RecomButton>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-primary mb-6 border-b border-border pb-2">
                Personalização e Menus
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                <FormField
                  control={form.control}
                  name="settings.showMenu"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-lg border border-slate-100 p-4 bg-slate-50/50">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-[10px] font-bold uppercase tracking-wider cursor-pointer">
                          Exibir Menu
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="settings.showPromotions"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-lg border border-slate-100 p-4 bg-slate-50/50">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-[10px] font-bold uppercase tracking-wider cursor-pointer">
                          Promoções
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="settings.showProcesses"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-lg border border-slate-100 p-4 bg-slate-50/50">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-[10px] font-bold uppercase tracking-wider cursor-pointer">
                          Processos
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="settings.featured"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-lg border border-slate-100 p-4 bg-slate-50/50 ring-2 ring-primary/10">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-[10px] font-bold uppercase tracking-wider cursor-pointer text-primary">
                          Destaque RECOM
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={labelStyles}>Status do Registro</FormLabel>
                    <FormControl>
                      <select
                        className={cn(inputStyles, "w-full appearance-none px-3 cursor-pointer")}
                        {...field}
                      >
                        <option value="draft">RASCUNHO (INTERNO)</option>
                        <option value="active">ATIVO (PÚBLICO)</option>
                        <option value="archived">ARQUIVADO (HISTÓRICO)</option>
                      </select>
                    </FormControl>
                    <FormMessage className="text-[10px] uppercase font-bold tracking-tight" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sortOrder"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={labelStyles}>Prioridade de Listagem</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0"
                        className={inputStyles}
                        {...field}
                        onChange={e => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormDescription className="text-[10px] font-medium text-muted-foreground/60 uppercase">
                      Valores menores aparecem primeiro (ex: 00, 01, 02).
                    </FormDescription>
                    <FormMessage className="text-[10px] uppercase font-bold tracking-tight" />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </RecomCard>

        <div className="flex justify-end gap-4 border-t border-border pt-10">
          <RecomButton 
            type="button" 
            intent="outline" 
            onClick={() => router.back()} 
            disabled={loading}
            className="uppercase font-bold text-xs tracking-widest h-12 px-8"
          >
            Descartar Alterações
          </RecomButton>
          <RecomButton 
            type="submit" 
            disabled={loading}
            className="uppercase font-bold text-xs tracking-widest h-12 px-10"
          >
            {loading ? 'Sincronizando...' : isEditing ? 'Confirmar Edição' : 'Publicar Registro'}
          </RecomButton>
        </div>
      </form>
      <MediaPickerDialog
        open={pickerOpen}
        onOpenChange={setPickerOpen}
        onSelect={(asset) => {
          setSelectedMedia(asset);
          setLogoUrl(asset.public_url);
          form.setValue('logoUrl', asset.public_url, { shouldDirty: true, shouldValidate: true });
        }}
      />
    </Form>
  );
}
