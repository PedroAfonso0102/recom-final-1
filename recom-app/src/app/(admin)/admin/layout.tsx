import React from 'react';
import Link from 'next/link';
import { FileText, Factory, ImageIcon, LayoutDashboard, Package, Settings, Tag, Users, History } from 'lucide-react';

import { cn } from '@/lib/utils';
import { LogoutButton } from '@/components/admin/LogoutButton';
import { requireAuth } from '@/lib/auth/utils';

export const metadata = {
  title: 'Painel CMS - RECOM',
  description: 'Sistema Administrativo RECOM',
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAuth();

  return (
    <div className="flex min-h-screen w-full bg-[#F8FAFC]">
      {/* Sidebar */}
      <aside className="w-64 flex-col hidden md:flex bg-white border-r border-slate-200">
        <div className="flex h-16 items-center border-b border-slate-100 px-6">
          <Link href="/admin" className="flex items-center gap-2 font-bold tracking-tight text-recom-blue">
            <span className="text-lg">RECOM <span className="text-slate-400 font-medium">Admin</span></span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-8">
          <nav className="grid items-start px-4 gap-1">
            {[
              { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
              { href: "/admin/pages", icon: FileText, label: "Páginas" },
              { href: "/admin/media", icon: ImageIcon, label: "Mídia" },
              { href: "/admin/fornecedores", icon: Package, label: "Fornecedores" },
              { href: "/admin/processos", icon: Factory, label: "Processos" },
              { href: "/admin/promocoes", icon: Tag, label: "Promoções" },
              { href: "/admin/leads", icon: Users, label: "Leads" },
              { href: "/admin/audit", icon: History, label: "Auditoria" },
              { href: "/admin/configuracoes", icon: Settings, label: "Configurações" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                  "text-slate-600 hover:bg-slate-50 hover:text-recom-blue"
                )}
              >
                <item.icon className="h-4 w-4 opacity-70" />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-6 border-t border-slate-100">
          <LogoutButton />
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="h-16 border-b border-slate-200 bg-white px-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Sistema Ativo</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-8 w-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center">
              <Users className="h-4 w-4 text-slate-500" />
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-auto bg-[#F8FAFC]">
          <div className="p-8 mx-auto max-w-6xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
