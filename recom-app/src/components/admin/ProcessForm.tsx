"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { ProcessSchema, Process } from '@/design-system/schemas/process.schema';
import { createProcess, updateProcess } from '@/server/actions/processes';
import { RecomButton } from '@/design-system/components/recom-button';
import { RecomCard } from '@/design-system/components/recom-card';
import { cn } from '@/lib/utils';

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

interface ProcessFormProps {
  initialData?: Partial<Process> & { id?: string };
}

export function ProcessForm({ initialData }: ProcessFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const isEditing = !!initialData?.id;

  const form = useForm<Process>({
    resolver: zodResolver(ProcessSchema),
    defaultValues: {
      name: initialData?.name || '',
      slug: initialData?.slug || '',
      shortDescription: initialData?.shortDescription || '',
      longDescription: initialData?.longDescription || '',
      status: initialData?.status || 'draft',
      sortOrder: initialData?.sortOrder || 0,
      imageUrl: initialData?.imageUrl || '',
      seoTitle: initialData?.seoTitle || '',
      seoDescription: initialData?.seoDescription || '',
    },
  });

  async function onSubmit(data: Process) {
    setError(null);
    setLoading(true);
    try {
      const result = isEditing
        ? await updateProcess(initialData!.id!, data)
        : await createProcess(data);

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

  const labelStyles = "text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2 block";
  const inputStyles = "bg-white border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all h-11 text-sm font-medium px-4";

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
                Definição do Processo
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={labelStyles}>Título do Processo</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: FRESAMENTO" className={inputStyles} {...field} />
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
                      <FormLabel className={labelStyles}>Slug Técnico (ID)</FormLabel>
                      <FormControl>
                        <Input placeholder="fresamento-industrial" className={inputStyles} {...field} />
                      </FormControl>
                      <FormDescription className="text-[10px] font-medium text-muted-foreground/60 uppercase">
                        Identificador único na URL.
                      </FormDescription>
                      <FormMessage className="text-[10px] uppercase font-bold tracking-tight" />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-primary mb-6 border-b border-border pb-2">
                Documentação Técnica
              </h3>
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="shortDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={labelStyles}>Resumo Executivo</FormLabel>
                      <FormControl>
                        <Input placeholder="Soluções de alta performance para fresamento..." className={inputStyles} {...field} />
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
                      <FormLabel className={labelStyles}>Especificações Detalhadas</FormLabel>
                      <FormControl>
                        <textarea
                          className={cn(
                            inputStyles,
                            "flex min-h-[160px] w-full py-3 ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                          )}
                          placeholder="Descrição técnica completa do processo de usinagem..."
                          {...field}
                        />
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
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={labelStyles}>Asset Visual (URL)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://..." className={inputStyles} {...field} value={field.value ?? ''} />
                    </FormControl>
                    <FormMessage className="text-[10px] uppercase font-bold tracking-tight" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={labelStyles}>Status do Processo</FormLabel>
                    <FormControl>
                      <select
                        className={cn(inputStyles, "w-full appearance-none px-3 cursor-pointer")}
                        {...field}
                      >
                        <option value="draft">RASCUNHO</option>
                        <option value="active">ATIVO (PÚBLICO)</option>
                        <option value="archived">ARQUIVADO</option>
                      </select>
                    </FormControl>
                    <FormMessage className="text-[10px] uppercase font-bold tracking-tight" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="sortOrder"
              render={({ field }) => (
                <FormItem className="max-w-[200px]">
                  <FormLabel className={labelStyles}>Prioridade</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="0"
                      className={inputStyles}
                      {...field}
                      onChange={e => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage className="text-[10px] uppercase font-bold tracking-tight" />
                </FormItem>
              )}
            />
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
            Cancelar Operação
          </RecomButton>
          <RecomButton 
            type="submit" 
            disabled={loading}
            className="uppercase font-bold text-xs tracking-widest h-12 px-10"
          >
            {loading ? 'Processando...' : isEditing ? 'Atualizar Processo' : 'Publicar Processo'}
          </RecomButton>
        </div>
      </form>
    </Form>
  );
}

