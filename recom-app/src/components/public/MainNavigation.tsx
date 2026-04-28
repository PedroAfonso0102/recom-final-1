"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Mail, Menu, MessageCircle, Phone, X } from "lucide-react";

import { RecomButton } from "@/design-system/components/recom-button";
import type { SiteSettings } from "@/cms/schemas/site-settings.schema";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

type NavItem = {
  label: string;
  href: string;
  activePrefixes?: string[];
};

const NAV_ITEMS: NavItem[] = [
  { label: "Inicio", href: "/" },
  { label: "A RECOM", href: "/a-recom", activePrefixes: ["/a-recom", "/sobre"] },
  { label: "Fornecedores & Catalogos", href: "/fornecedores-catalogos", activePrefixes: ["/fornecedores-catalogos", "/fornecedores"] },
  { label: "Solucoes / Processos", href: "/solucoes", activePrefixes: ["/solucoes", "/processos"] },
  { label: "Promocoes", href: "/promocoes", activePrefixes: ["/promocoes"] },
  { label: "Contato / Orcamento", href: "/contato", activePrefixes: ["/contato"] },
];

function isActive(pathname: string, item: NavItem) {
  if (item.href === "/") return pathname === "/";
  return (item.activePrefixes ?? [item.href]).some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

export function MainNavigation({ settings }: { settings?: SiteSettings }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const config = settings || siteConfig;

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-recom-graphite text-white shadow-[0_16px_40px_-30px_rgba(15,23,42,0.7)]">
      <div className="container-recom">
        <div className="flex h-14 items-center justify-between gap-4 lg:h-16">
          <ul className="hidden items-center gap-7 lg:flex">
            {NAV_ITEMS.map((item) => {
              const active = isActive(pathname, item);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative py-5 text-[11px] font-bold uppercase tracking-[0.14em] transition-colors hover:text-white",
                      active ? "text-white" : "text-white/65"
                    )}
                  >
                    {item.label}
                    {active ? <span className="absolute bottom-[-2px] left-0 h-[3px] w-full bg-recom-red" /> : null}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="hidden lg:block">
            <RecomButton asChild size="sm" intent="accent" className="h-9 px-5 text-[10px]">
              <Link href="/contato">Solicitar orcamento</Link>
            </RecomButton>
          </div>

          <div className="flex w-full items-center justify-between lg:hidden">
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/75">Menu principal</span>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((current) => !current)}
              className="rounded-md border border-white/15 p-2 text-white/85 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-expanded={isMobileMenuOpen}
              aria-controls="recom-mobile-navigation"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen ? (
        <div id="recom-mobile-navigation" className="border-t border-white/10 bg-recom-graphite py-4 lg:hidden">
          <div className="container-recom space-y-5">
            <ul className="grid gap-1">
              {NAV_ITEMS.map((item) => {
                const active = isActive(pathname, item);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "block rounded-md px-4 py-3 text-[12px] font-bold uppercase tracking-[0.14em] transition-colors",
                        active ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/10 hover:text-white"
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="grid gap-3 border-t border-white/10 pt-5 sm:grid-cols-3">
              <a href={`tel:${config.contact.phone.replace(/\D/g, "")}`} className="flex min-h-11 items-center gap-3 rounded-md border border-white/10 bg-white/5 px-4 py-3 text-[12px] font-bold uppercase tracking-[0.12em] text-white/80 transition-colors hover:bg-white/10">
                <Phone className="h-4 w-4 text-recom-red" />
                Ligar
              </a>
              <a href={`mailto:${config.contact.email}`} className="flex min-h-11 items-center gap-3 rounded-md border border-white/10 bg-white/5 px-4 py-3 text-[12px] font-bold uppercase tracking-[0.12em] text-white/80 transition-colors hover:bg-white/10">
                <Mail className="h-4 w-4 text-recom-red" />
                E-mail
              </a>
              <a href={`https://wa.me/${config.contact.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center gap-3 rounded-md border border-white/10 bg-white/5 px-4 py-3 text-[12px] font-bold uppercase tracking-[0.12em] text-white/80 transition-colors hover:bg-white/10">
                <MessageCircle className="h-4 w-4 text-recom-red" />
                WhatsApp
              </a>
            </div>

            <RecomButton asChild size="md" intent="accent" className="h-11 w-full">
              <Link href="/contato">Solicitar orcamento</Link>
            </RecomButton>
          </div>
        </div>
      ) : null}
    </nav>
  );
}
