"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Supplier, normalizeSupplier } from '@/cms/schemas/supplier.schema';
import { createSupplier, updateSupplier } from '@/server/actions/suppliers';
import { RecomButton } from '@/design-system/components/recom-button';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  BookOpen, 
  Layout, 
  Search, 
  Image as ImageIcon, 
  Box,
  Save,
  ArrowLeft,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

// Sub-components
import { SupplierGeneralFields } from './suppliers/SupplierGeneralFields';
import { SupplierCatalogListEditor } from './suppliers/SupplierCatalogListEditor';
import { SupplierProductLinesEditor } from './suppliers/SupplierProductLinesEditor';
import { SupplierMediaEditor } from './suppliers/SupplierMediaEditor';
import { SupplierLayoutEditor } from './suppliers/SupplierLayoutEditor';
import { SupplierSeoEditor } from './suppliers/SupplierSeoEditor';

interface SupplierFormProps {
  initialData?: any; // Receives raw DB data or Partial<Supplier>
  processes?: Array<{ id: string; name: string }>;
}

export function SupplierForm({ initialData, processes = [] }: SupplierFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  // Normalize data on load
  const [formData, setFormData] = useState<Supplier>(() => normalizeSupplier(initialData || {}));
  
  const isEditing = !!initialData?.id;

  const updateField = <K extends keyof Supplier>(field: K, value: Supplier[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  async function handleSave() {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const result = isEditing
        ? await updateSupplier(initialData.id, formData)
        : await createSupplier(formData);

      if (result && !result.success) {
        setError(result.error || 'Erro ao salvar fornecedor.');
      } else {
        setSuccess(true);
        setTimeout(() => {
          router.push('/admin/fornecedores');
          router.refresh();
        }, 1500);
      }
    } catch (e: any) {
      setError(e.message || 'Ocorreu um erro inesperado.');
    } finally {
      setLoading(false);
    }
  }

  const tabTriggerStyles = "flex items-center gap-2 px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] data-[state=active]:bg-white data-[state=active]:text-primary border-r border-slate-100 last:border-0 transition-all";

  return (
    <div className="space-y-8 pb-20">
      {/* Header Fixo / Sticky */}
      <div className="sticky top-0 z-30 flex items-center justify-between bg-slate-50/80 backdrop-blur-md py-4 border-b border-slate-200 -mx-4 px-4 sm:-mx-8 sm:px-8">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-10 w-10 p-0 rounded-full hover:bg-white"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-5 w-5 text-slate-400" />
          </Button>
          <div>
            <h1 className="text-xl font-black tracking-tight text-slate-900">
              {isEditing ? `Editar Fornecedor` : `Novo Fornecedor`}
            </h1>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              {formData.name || 'Sem nome definido'} • {formData.status}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <RecomButton 
            type="button" 
            intent="outline" 
            onClick={() => router.back()}
            className="h-11 px-6 text-[10px] font-bold uppercase tracking-widest"
          >
            Cancelar
          </RecomButton>
          <RecomButton 
            onClick={handleSave}
            disabled={loading}
            className="h-11 px-8 text-[10px] font-bold uppercase tracking-widest gap-2"
          >
            {loading ? 'Salvando...' : (
              <>
                <Save className="h-4 w-4" />
                {isEditing ? 'Atualizar Fornecedor' : 'Publicar Registro'}
              </>
            )}
          </RecomButton>
        </div>
      </div>

      {/* Alertas */}
      {error && (
        <div className="p-4 bg-destructive/5 border border-destructive/20 rounded-xl flex items-center gap-3 text-destructive animate-in fade-in slide-in-from-top-2">
          <AlertCircle className="h-5 w-5" />
          <p className="text-xs font-bold uppercase tracking-widest">{error}</p>
        </div>
      )}
      {success && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3 text-emerald-700 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="h-5 w-5" />
          <p className="text-xs font-bold uppercase tracking-widest">Fornecedor salvo com sucesso! Redirecionando...</p>
        </div>
      )}

      {/* Editor Modular */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden min-h-[600px] flex flex-col md:flex-row">
        <Tabs defaultValue="geral" className="w-full flex flex-col md:flex-row">
          <TabsList className="flex flex-row md:flex-col h-auto bg-slate-50 border-b md:border-b-0 md:border-r border-slate-200 p-0 justify-start w-full md:w-64 shrink-0 overflow-x-auto md:overflow-x-visible">
            <TabsTrigger value="geral" className={tabTriggerStyles}>
              <User className="h-4 w-4" /> Geral
            </TabsTrigger>
            <TabsTrigger value="catalogos" className={tabTriggerStyles}>
              <BookOpen className="h-4 w-4" /> Catálogos
            </TabsTrigger>
            <TabsTrigger value="produtos" className={tabTriggerStyles}>
              <Box className="h-4 w-4" /> Produtos
            </TabsTrigger>
            <TabsTrigger value="midia" className={tabTriggerStyles}>
              <ImageIcon className="h-4 w-4" /> Mídia
            </TabsTrigger>
            <TabsTrigger value="layout" className={tabTriggerStyles}>
              <Layout className="h-4 w-4" /> Layout
            </TabsTrigger>
            <TabsTrigger value="seo" className={tabTriggerStyles}>
              <Search className="h-4 w-4" /> SEO
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 p-8 md:p-12 overflow-y-auto max-h-[calc(100vh-200px)]">
            <TabsContent value="geral" className="mt-0 outline-none">
              <SupplierGeneralFields 
                data={formData} 
                processes={processes}
                onChange={updateField}
              />
            </TabsContent>

            <TabsContent value="catalogos" className="mt-0 outline-none">
              <SupplierCatalogListEditor 
                value={formData.catalogs} 
                productLines={formData.productLines}
                onChange={(val) => updateField('catalogs', val)} 
              />
            </TabsContent>

            <TabsContent value="produtos" className="mt-0 outline-none">
              <SupplierProductLinesEditor 
                value={formData.productLines} 
                onChange={(val) => updateField('productLines', val)} 
              />
            </TabsContent>

            <TabsContent value="midia" className="mt-0 outline-none">
              <SupplierMediaEditor 
                value={formData.media} 
                onChange={(val) => updateField('media', val)} 
              />
            </TabsContent>

            <TabsContent value="layout" className="mt-0 outline-none">
              <SupplierLayoutEditor 
                value={formData.layout} 
                onChange={(val) => updateField('layout', val)} 
              />
            </TabsContent>

            <TabsContent value="seo" className="mt-0 outline-none">
              <SupplierSeoEditor 
                value={formData.seo || { title: '', description: '', keywords: '', ogImage: '' }} 
                onChange={(val) => updateField('seo', val)} 
              />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}

// Minimal Button for the header if ui/button is not flexible enough
function Button({ className, variant, size, ...props }: any) {
  return (
    <button 
      className={cn(
        "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
        variant === 'ghost' ? 'hover:bg-accent hover:text-accent-foreground' : '',
        className
      )}
      {...props}
    />
  );
}
