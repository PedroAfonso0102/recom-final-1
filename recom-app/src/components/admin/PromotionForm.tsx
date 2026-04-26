"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { PromotionSchema, Promotion } from '@/design-system/schemas/promotion.schema';

import { Button } from '@/components/ui/button';
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

interface PromotionFormProps {
  initialData?: Partial<Promotion>;
}

export function PromotionForm({ initialData }: PromotionFormProps) {
  const router = useRouter();

  const form = useForm<Promotion>({
    resolver: zodResolver(PromotionSchema),
    defaultValues: {
      title: initialData?.title || '',
      slug: initialData?.slug || '',
      description: initialData?.description || '',
      status: initialData?.status || 'draft',
      imageUrl: initialData?.imageUrl || '',
      startsAt: initialData?.startsAt || new Date().toISOString(),
      endsAt: initialData?.endsAt || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      ctaLabel: initialData?.ctaLabel || '',
      ctaUrl: initialData?.ctaUrl || '',
    },
  });

  async function onSubmit(data: Promotion) {
    console.log("Promoção salva via Zod:", data);
    alert('Promoção salva! (Mock: Veja console)');
    router.push('/admin/promocoes');
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-white p-6 rounded-lg border border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título da Promoção</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Queima de Estoque" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug (URL)</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: queima-de-estoque" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Input placeholder="Detalhes da oferta..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="startsAt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data de Início</FormLabel>
                <FormControl>
                  <Input type="datetime-local" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endsAt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data de Fim</FormLabel>
                <FormControl>
                  <Input type="datetime-local" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>Cancelar</Button>
          <Button type="submit" className="bg-amber-500 hover:bg-amber-600 text-slate-900">Salvar Promoção</Button>
        </div>
      </form>
    </Form>
  );
}
