"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { SupplierSchema, Supplier } from '@/design-system/schemas/supplier.schema';
import { createSupplier, updateSupplier } from '@/server/actions/suppliers';
import { RecomButton } from '@/design-system/components/recom-button';
import { RecomCard } from '@/design-system/components/recom-card';
import { cn } from '@/lib/utils';
import { safeZodResolver } from '@/lib/forms/safe-zod-resolver';

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
      seoTitle: initialData?.seoTitle || '',
      seoDescription: initialData?.seoDescription || '',
      relatedProcesses: initialData?.relatedProcesses || [],
    },
  });

  async function onSubmit(data: Supplier) {
    setError(null);
    setLoading(true);
    try {
      const result = isEditing
        ? await updateSupplier(initialData!.id!, data)
        : await createSupplier(data);

      if (!result?.success && result?.error) {
        setError(result.error);
      }
    } catch (e: unknown) {
      if (e instanceof Error && !e.message.includes('NEXT_REDIRECT')) {
        setError(e.message);
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
                    <FormItem>
                      <FormLabel className={labelStyles}>URL do Logotipo (Asset)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://..." className={inputStyles} {...field} value={field.value ?? ''} />
                      </FormControl>
                      <FormMessage className="text-[10px] uppercase font-bold tracking-tight" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="catalogUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={labelStyles}>Link do Catálogo PDF</FormLabel>
                      <FormControl>
                        <Input placeholder="https://..." className={inputStyles} {...field} value={field.value ?? ''} />
                      </FormControl>
                      <FormMessage className="text-[10px] uppercase font-bold tracking-tight" />
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
    </Form>
  );
}
