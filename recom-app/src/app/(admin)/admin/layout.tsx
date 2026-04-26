import React from 'react';
import Link from 'next/link';
import { FileText, Factory, LayoutDashboard, Package, Settings, Tag, Users } from 'lucide-react';
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
    <div className="flex min-h-screen w-full bg-muted/30">
      {/* Sidebar */}
      <aside className="w-64 flex-col hidden md:flex bg-primary text-primary-foreground border-r border-primary/20">
        <div className="flex h-16 items-center border-b border-primary/20 px-6">
          <Link href="/admin" className="flex items-center gap-2 font-bold uppercase tracking-tight">
            <span className="text-xl">RECOM <span className="text-primary-foreground/60 font-medium">CMS</span></span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-6">
          <nav className="grid items-start px-4 text-xs font-bold uppercase tracking-widest gap-2">
            {[
              { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
              { href: "/admin/pages", icon: FileText, label: "Páginas" },
              { href: "/admin/fornecedores", icon: Package, label: "Fornecedores" },
              { href: "/admin/processos", icon: Factory, label: "Processos" },
              { href: "/admin/promocoes", icon: Tag, label: "Promoções" },
              { href: "/admin/leads", icon: Users, label: "Leads" },
              { href: "/admin/configuracoes", icon: Settings, label: "Ajustes" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2.5 transition-all hover:bg-white/10 hover:text-white",
                  "text-primary-foreground/70"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-4 border-t border-primary/20">
          <LogoutButton />
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="h-16 border-b border-border bg-background px-8 flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Ambiente Administrativo</h2>
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 bg-muted rounded text-muted-foreground">v2.0 PRO</span>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-8">
          <div className="mx-auto max-w-[1200px]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
