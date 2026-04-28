"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, BookOpen, Boxes, BriefcaseBusiness, FileText, History, ImageIcon, LayoutDashboard, Settings, Tag, Users } from "lucide-react";

import { LogoutButton } from "@/components/admin/LogoutButton";
import { cn } from "@/lib/utils";

const groups = [
  {
    label: "Visao Geral",
    items: [{ href: "/admin", label: "Painel operacional", icon: LayoutDashboard }],
  },
  {
    label: "Comercial",
    items: [
      { href: "/admin/leads", label: "Leads", icon: Users },
      { href: "/admin/promocoes", label: "Promocoes", icon: Tag },
    ],
  },
  {
    label: "Conteudo",
    items: [
      { href: "/admin/pages", label: "Paginas", icon: FileText },
      { href: "/admin/media", label: "Midia", icon: ImageIcon },
    ],
  },
  {
    label: "Catalogo",
    items: [
      { href: "/admin/fornecedores", label: "Fornecedores", icon: Boxes },
      { href: "/admin/processos", label: "Processos", icon: BriefcaseBusiness },
    ],
  },
  {
    label: "Sistema",
    items: [
      { href: "/admin/audit", label: "Auditoria", icon: History },
      { href: "/admin/configuracoes", label: "Configuracoes", icon: Settings },
    ],
  },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-100 text-slate-950">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-slate-200 bg-white lg:flex lg:flex-col">
        <div className="border-b border-slate-200 px-5 py-4">
          <Link href="/admin" className="block">
            <span className="text-base font-semibold tracking-tight text-slate-950">RECOM</span>
            <span className="ml-2 text-sm font-medium text-slate-500">Admin</span>
          </Link>
          <p className="mt-1 text-xs text-slate-500">Operacao comercial e editorial</p>
        </div>

        <nav className="min-h-0 flex-1 overflow-auto px-3 py-4">
          <div className="space-y-5">
            {groups.map((group) => (
              <section key={group.label}>
                <p className="px-3 pb-1 text-[10px] font-semibold uppercase tracking-wide text-slate-400">{group.label}</p>
                <div className="space-y-1">
                  {group.items.map((item) => {
                    const active = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 border-l-2 px-3 py-2 text-sm font-medium transition-colors",
                          active
                            ? "border-slate-950 bg-slate-100 text-slate-950"
                            : "border-transparent text-slate-600 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950"
                        )}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        </nav>

        <div className="border-t border-slate-200 p-4">
          <LogoutButton />
        </div>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
          <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <BarChart3 className="h-4 w-4 text-slate-500" />
              <span className="text-sm font-medium text-slate-700">Painel B2B</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <span className="hidden sm:inline">Roles: owner, admin, editor, comercial, viewer</span>
              <span className="rounded-md border border-emerald-200 bg-emerald-50 px-2 py-1 font-semibold text-emerald-800">Online</span>
            </div>
          </div>
        </header>

        <main className="mx-auto min-h-[calc(100vh-3.5rem)] max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>

      <div className="fixed bottom-3 left-3 right-3 z-40 border border-slate-200 bg-white p-2 lg:hidden">
        <div className="flex gap-2 overflow-x-auto">
          {groups.flatMap((group) => group.items).map((item) => {
            const active = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
            return (
              <Link key={item.href} href={item.href} className={cn("flex shrink-0 items-center gap-2 px-3 py-2 text-xs font-semibold", active ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-700")}>
                <item.icon className="h-3.5 w-3.5" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
