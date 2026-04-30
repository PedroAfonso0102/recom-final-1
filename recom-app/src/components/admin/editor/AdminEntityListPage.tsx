import React from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from "next/link";
import { AdminEntityListClient } from './AdminEntityListClient';
import { EmptyState } from '../admin-kit';

interface AdminEntityListItemBase {
  id?: string;
  name?: string;
  slug?: string;
  status?: string;
}

interface AdminEntityListPageProps<T> {
  title: string;
  description?: string;
  eyebrow?: string;
  primaryAction?: {
    label: string;
    href: string;
    icon?: React.ElementType;
  };
  items: T[];
  searchFields: (keyof T)[];
  statusField?: keyof T;
  statusOptions?: { value: string; label: string }[];
  customFilters?: React.ReactNode;
  renderItem: (item: T) => React.ReactNode;
  columns: string[];
  emptyState?: {
    title: string;
    description: string;
  };
}

export function AdminEntityListPage<T extends AdminEntityListItemBase>({
  title,
  description,
  eyebrow: _eyebrow,
  primaryAction,
  items,
  searchFields,
  statusField,
  statusOptions,
  renderItem,
  columns,
  emptyState
}: AdminEntityListPageProps<T>) {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50">
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="flex h-16 items-center px-6">
          <Link 
            href="/admin" 
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Voltar ao Início
          </Link>
        </div>
      </header>

      <main className="flex-1 p-6 md:p-10 space-y-8 max-w-7xl mx-auto w-full">
        <div className="space-y-2">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-1">
              <h1 className="text-3xl font-black tracking-tight text-slate-900 uppercase">
                {title}
              </h1>
              {description && (
                <p className="text-slate-500 text-sm max-w-2xl font-medium leading-relaxed">
                  {description}
                </p>
              )}
            </div>
            
            {primaryAction && (
              <Link 
                href={primaryAction.href}
                className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98]"
              >
                {primaryAction.icon && <primaryAction.icon className="h-4 w-4" />}
                {primaryAction.label}
              </Link>
            )}
          </div>
        </div>

        <AdminEntityListClient
          items={items}
          searchFields={searchFields as string[]}
          statusField={statusField as string}
          statusOptions={statusOptions}
        >
          {/* 
            List rendering logic inside the Server Component to keep 
            renderItem and icon components within the server boundary.
          */}
          <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden mt-8">
            {items.length === 0 ? (
              <div className="p-20 text-center flex flex-col items-center">
                <EmptyState 
                  title={emptyState?.title || "Nenhum resultado"} 
                  description={emptyState?.description || "Ainda não há registros nesta categoria."} 
                  iconName="fileText"
                />
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/50">
                      {columns.map((column, i) => (
                        <th key={i} className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                          {column}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {items.map((item, index) => (
                      <React.Fragment key={index}>
                        {renderItem(item)}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          
          <div className="flex items-center justify-between px-2 mt-4">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Exibindo {items.length} registros
            </p>
          </div>
        </AdminEntityListClient>
      </main>
    </div>
  );
}
