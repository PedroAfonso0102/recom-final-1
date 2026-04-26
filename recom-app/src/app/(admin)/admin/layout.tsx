import React from 'react';
import Link from 'next/link';
import { Package, Factory, Tag, Users, LayoutDashboard, Settings, LogOut } from 'lucide-react';

export const metadata = {
  title: 'Painel CMS - RECOM',
  description: 'Sistema Administrativo RECOM',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 flex-col hidden md:flex bg-slate-900 text-slate-100 border-r border-slate-800">
        <div className="flex h-14 items-center border-b border-slate-800 px-4">
          <Link href="/admin" className="flex items-center gap-2 font-semibold">
            <span className="text-xl tracking-tight">RECOM <span className="text-amber-500">Admin</span></span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-2 text-sm font-medium gap-1">
            <Link
              href="/admin"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-300 transition-all hover:text-white hover:bg-slate-800"
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/admin/fornecedores"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-300 transition-all hover:text-white hover:bg-slate-800"
            >
              <Package className="h-4 w-4" />
              Fornecedores
            </Link>
            <Link
              href="/admin/processos"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-300 transition-all hover:text-white hover:bg-slate-800"
            >
              <Factory className="h-4 w-4" />
              Processos
            </Link>
            <Link
              href="/admin/promocoes"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-300 transition-all hover:text-white hover:bg-slate-800"
            >
              <Tag className="h-4 w-4" />
              Promoções
            </Link>
            <Link
              href="/admin/leads"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-300 transition-all hover:text-white hover:bg-slate-800"
            >
              <Users className="h-4 w-4" />
              Leads
            </Link>
            <Link
              href="/admin/configuracoes"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-300 transition-all hover:text-white hover:bg-slate-800"
            >
              <Settings className="h-4 w-4" />
              Configurações
            </Link>
          </nav>
        </div>
        <div className="mt-auto p-4 border-t border-slate-800">
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition-all hover:text-white hover:bg-slate-800">
            <LogOut className="h-4 w-4" />
            Sair
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex flex-1 flex-col p-4 md:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}
