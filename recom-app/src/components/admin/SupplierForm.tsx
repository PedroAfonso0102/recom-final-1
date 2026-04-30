"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Supplier, normalizeSupplier } from '@/cms/schemas/supplier.schema';
import { createSupplier, updateSupplier } from '@/server/actions/suppliers';
import { useToast } from "@/components/ui/use-toast";
import { 
  User, 
  BookOpen, 
  Layout, 
  Search, 
  Image as ImageIcon, 
  Box
} from 'lucide-react';

// Admin Shell Components
import { AdminEditorShell, AdminEditorTab } from './editor';
import { SupplierInspector } from './suppliers/SupplierInspector';
import { SupplierInspectorTab } from './suppliers/types';

// Sub-components
import { SupplierGeneralFields } from './suppliers/SupplierGeneralFields';
import { SupplierCatalogListEditor } from './suppliers/SupplierCatalogListEditor';
import { SupplierProductLinesEditor } from './suppliers/SupplierProductLinesEditor';
import { SupplierMediaEditor } from './suppliers/SupplierMediaEditor';
import { SupplierLayoutEditor } from './suppliers/SupplierLayoutEditor';
import { SupplierSeoEditor } from './suppliers/SupplierSeoEditor';

interface SupplierFormProps {
  initialData?: any; 
  processes?: Array<{ id: string; name: string }>;
}

const supplierTabs: AdminEditorTab[] = [
  { id: "geral", label: "Geral", icon: User },
  { id: "catalogos", label: "Catálogos", icon: BookOpen },
  { id: "produtos", label: "Produtos", icon: Box },
  { id: "midia", label: "Mídia", icon: ImageIcon },
  { id: "layout", label: "Layout", icon: Layout },
  { id: "seo", label: "SEO", icon: Search },
];

export function SupplierForm({ initialData, processes = [] }: SupplierFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [activeTabId, setActiveTabId] = useState("geral");
  const [isDirty, setIsDirty] = useState(false);
  
  // Normalize data on load
  const [formData, setFormData] = useState<Supplier>(() => normalizeSupplier(initialData || {}));
  
  const isEditing = !!initialData?.id;

  const updateField = <K extends keyof Supplier>(field: K, value: Supplier[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setIsDirty(true);
  };

  async function handleSave() {
    setLoading(true);

    try {
      const result = isEditing
        ? await updateSupplier(initialData.id, formData)
        : await createSupplier(formData);

      if (result && !result.success) {
        toast({
          title: "Erro ao salvar",
          description: result.error || "Ocorreu um erro ao salvar o fornecedor.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Sucesso!",
          description: isEditing ? "Fornecedor atualizado." : "Fornecedor criado com sucesso.",
        });
        setIsDirty(false);
        if (!isEditing) {
          setTimeout(() => {
            router.push('/admin/fornecedores');
            router.refresh();
          }, 1000);
        }
      }
    } catch (e: any) {
      toast({
        title: "Erro inesperado",
        description: e.message || "Ocorreu um erro no servidor.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  const handlePreview = () => {
    if (!formData.slug) {
      toast({
        title: "Atenção",
        description: "Defina um slug antes de visualizar.",
        variant: "destructive"
      });
      return;
    }
    window.open(`/fornecedores/${formData.slug}?preview=true`, '_blank');
  };

  const handleInspectorNavigate = (tab: SupplierInspectorTab, fieldPath?: string) => {
    // Map internal inspector tabs to form tab IDs
    const tabMap: Record<SupplierInspectorTab, string> = {
      general: "geral",
      catalogs: "catalogos",
      productLines: "produtos",
      media: "midia",
      layout: "layout",
      seo: "seo"
    };
    
    setActiveTabId(tabMap[tab]);
    
    // Future: Scroll to fieldPath if needed
    if (fieldPath) {
      console.log(`Focusing on field: ${fieldPath}`);
    }
  };

  return (
    <AdminEditorShell
      title={formData.name || "Novo Fornecedor"}
      entityType="fornecedor"
      status={formData.status as any}
      tabs={supplierTabs}
      activeTabId={activeTabId}
      onTabChange={setActiveTabId}
      onSave={handleSave}
      onPreview={handlePreview}
      isDirty={isDirty}
      isSaving={loading}
      lastSaved={initialData?.updated_at ? new Date(initialData.updated_at) : undefined}
      backHref="/admin/fornecedores"
      inspector={<SupplierInspector supplier={formData} onNavigateToTab={handleInspectorNavigate} />}
    >
      <div className="bg-white rounded-3xl border border-slate-200 p-8 md:p-12 shadow-sm min-h-[600px]">
        {activeTabId === "geral" && (
          <SupplierGeneralFields 
            data={formData} 
            processes={processes}
            onChange={updateField}
          />
        )}

        {activeTabId === "catalogos" && (
          <SupplierCatalogListEditor 
            value={formData.catalogs} 
            productLines={formData.productLines}
            onChange={(val) => updateField('catalogs', val)} 
          />
        )}

        {activeTabId === "produtos" && (
          <SupplierProductLinesEditor 
            value={formData.productLines} 
            onChange={(val) => updateField('productLines', val)} 
          />
        )}

        {activeTabId === "midia" && (
          <SupplierMediaEditor 
            value={formData.media} 
            onChange={(val) => updateField('media', val)} 
          />
        )}

        {activeTabId === "layout" && (
          <SupplierLayoutEditor 
            value={formData.layout} 
            onChange={(val) => updateField('layout', val)} 
          />
        )}

        {activeTabId === "seo" && (
          <SupplierSeoEditor 
            value={formData.seo || { title: '', description: '', keywords: '', ogImage: '' }} 
            onChange={(val) => updateField('seo', val)} 
          />
        )}
      </div>
    </AdminEditorShell>
  );
}
