"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { PromotionSchema, Promotion } from '@/design-system/schemas/promotion.schema';
import { createPromotion, updatePromotion } from '@/server/actions/promotions';
import { RecomButton } from '@/design-system/components/recom-button';
import { RecomCard } from '@/design-system/components/recom-card';
import { cn } from '@/lib/utils';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface PromotionFormProps {
  initialData?: Partial<Promotion> & { id?: string };
}

// Helper to format ISO string to datetime-local format
function toDatetimeLocal(iso?: string) {
  if (!iso) return '';
  return iso.slice(0, 16); // "YYYY-MM-DDTHH:mm"
}

export function PromotionForm({ initialData }: PromotionFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const isEditing = !!initialData?.id;

  const form = useForm<Promotion>({
    resolver: zodResolver(PromotionSchema),
    defaultValues: {
      title: initialData?.title || '',
      slug: initialData?.slug || '',
      description: initialData?.description || '',
      status: initialData?.status || 'draft',
      imageUrl: initialData?.imageUrl || '',
      startsAt: toDatetimeLocal(initialData?.startsAt) || toDatetimeLocal(new Date().toISOString()),
      endsAt: toDatetimeLocal(initialData?.endsAt) || toDatetimeLocal(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()),
      ctaLabel: initialData?.ctaLabel || '',
      ctaUrl: initialData?.ctaUrl || '',
      supplierId: initialData?.supplierId || undefined,
    },
  });

  async function onSubmit(data: Promotion) {
    setError(null);
    setLoading(true);
    try {
      const result = isEditing
        ? await updatePromotion(initialData!.id!, data)
        : await createPromotion(data);

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

  const labelStyles = "text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-1.5 block";
  const inputStyles = "bg-muted/30 border-border rounded-none focus:border-primary transition-colors h-11 text-sm font-medium";

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
                Configuração da Campanha
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={labelStyles}>Título da Promoção</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: CONDIÇÕES ESPECIAIS KYOCERA" className={inputStyles} {...field} />
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
                      <FormLabel className={labelStyles}>Slug de Campanha (URL)</FormLabel>
                      <FormControl>
                        <Input placeholder="promo-kyocera-2024" className={inputStyles} {...field} />
                      </FormControl>
                      <FormMessage className="text-[10px] uppercase font-bold tracking-tight" />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={labelStyles}>Descrição da Oferta</FormLabel>
                  <FormControl>
                    <textarea
                      className={cn(
                        inputStyles,
                        "flex min-h-[120px] w-full px-3 py-3 ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                      )}
                      placeholder="Detalhes das condições comerciais e itens inclusos..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[10px] uppercase font-bold tracking-tight" />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="startsAt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={labelStyles}>Vigência (Início)</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" className={cn(inputStyles, "px-3")} {...field} />
                    </FormControl>
                    <FormMessage className="text-[10px] uppercase font-bold tracking-tight" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endsAt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={labelStyles}>Vigência (Término)</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" className={cn(inputStyles, "px-3")} {...field} />
                    </FormControl>
                    <FormMessage className="text-[10px] uppercase font-bold tracking-tight" />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={labelStyles}>Status da Promoção</FormLabel>
                    <FormControl>
                      <select
                        className={cn(inputStyles, "w-full appearance-none px-3 cursor-pointer")}
                        {...field}
                      >
                        <option value="draft">RASCUNHO</option>
                        <option value="active">ATIVO (VISÍVEL)</option>
                        <option value="archived">ENCERRADO</option>
                      </select>
                    </FormControl>
                    <FormMessage className="text-[10px] uppercase font-bold tracking-tight" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={labelStyles}>Imagem de Capa (URL)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://..." className={inputStyles} {...field} value={field.value ?? ''} />
                    </FormControl>
                    <FormMessage className="text-[10px] uppercase font-bold tracking-tight" />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="ctaLabel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={labelStyles}>Texto de Ação (CTA)</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: SOLICITAR ORÇAMENTO" className={inputStyles} {...field} value={field.value ?? ''} />
                    </FormControl>
                    <FormMessage className="text-[10px] uppercase font-bold tracking-tight" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ctaUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={labelStyles}>Link de Destino (CTA)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://..." className={inputStyles} {...field} value={field.value ?? ''} />
                    </FormControl>
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
            variant="outline" 
            onClick={() => router.back()} 
            disabled={loading}
            className="uppercase font-bold text-xs tracking-widest h-12 px-8"
          >
            Cancelar Promoção
          </RecomButton>
          <RecomButton 
            type="submit" 
            disabled={loading}
            className="uppercase font-bold text-xs tracking-widest h-12 px-10"
          >
            {loading ? 'Sincronizando...' : isEditing ? 'Atualizar Promoção' : 'Lançar Campanha'}
          </RecomButton>
        </div>
      </form>
    </Form>
  );
}

