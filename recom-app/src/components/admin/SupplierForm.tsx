"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { SupplierSchema, Supplier } from '@/design-system/schemas/supplier.schema';

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

interface SupplierFormProps {
  initialData?: Partial<Supplier>;
}

export function SupplierForm({ initialData }: SupplierFormProps) {
  const router = useRouter();

  const form = useForm<Supplier>({
    resolver: zodResolver(SupplierSchema),
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
    // Aqui chamaremos a Server Action (Supabase Insert/Update)
    console.log("Dados do formulário validados via Zod:", data);
    alert('Fornecedor salvo! (Mock: Veja console)');
    router.push('/admin/fornecedores');
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-white p-6 rounded-lg border border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do Fornecedor</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Kyocera" {...field} />
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
                  <Input placeholder="Ex: kyocera" {...field} />
                </FormControl>
                <FormDescription>Identificador único na URL (apenas minúsculas e hífen).</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="shortDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição Curta</FormLabel>
              <FormControl>
                <Input placeholder="Uma frase sobre o fornecedor" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Em um cenário real, usaremos um Textarea. Como criamos apenas o Input via CLI, improvisaremos o textarea com o Input estendido ou adicionaremos o Textarea shadcn depois */}
        <FormField
          control={form.control}
          name="longDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição Longa</FormLabel>
              <FormControl>
                <Input placeholder="Texto institucional completo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>Cancelar</Button>
          <Button type="submit" className="bg-amber-500 hover:bg-amber-600 text-slate-900">Salvar Fornecedor</Button>
        </div>
      </form>
    </Form>
  );
}
