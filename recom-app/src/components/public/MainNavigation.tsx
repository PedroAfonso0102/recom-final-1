"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, MessageCircle, Mail, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { RecomButton } from "@/design-system/components/recom-button";
import { siteConfig } from "@/lib/config";
import type { SiteSettings } from "@/cms/schemas/site-settings.schema";

type NavItem = {
  label: string;
  href: string;
  matchPath?: string;
};

const NAV_ITEMS: NavItem[] = [
  { label: "Início", href: "/" },
  { label: "A RECOM", href: "/sobre", matchPath: "/sobre" },
  { label: "Fornecedores & Catálogos", href: "/fornecedores", matchPath: "/fornecedores" },
  { label: "Soluções / Processos", href: "/processos", matchPath: "/processos" },
  { label: "Promoções", href: "/promocoes", matchPath: "/promocoes" },
  { label: "Contato / Orçamento", href: "/sobre#contato", matchPath: "/sobre" },
] as const;

export function MainNavigation({ settings }: { settings?: SiteSettings }) {
  const pathname = usePathname();

  return <MainNavigationShell key={pathname} pathname={pathname} settings={settings} />;
}

function MainNavigationShell({ pathname, settings }: { pathname: string; settings?: SiteSettings }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const config = settings || siteConfig;

  return (
    <nav className="sticky top-0 z-50 border-b border-white/8 bg-recom-graphite/98 text-white shadow-[0_16px_40px_-30px_rgba(15,23,42,0.7)] backdrop-blur-md">
      <div className="container-recom">
        <div className="flex h-14 items-center justify-between gap-4 lg:h-16">
          <ul className="hidden items-center gap-8 lg:flex">
            {NAV_ITEMS.map((item) => {
              const isActive =
                pathname === item.href || pathname === item.matchPath || (item.href.includes("#") && pathname === item.matchPath);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "relative py-5 text-[11px] font-bold uppercase tracking-[0.16em] transition-colors hover:text-white",
                      isActive ? "text-white" : "text-white/62"
                    )}
                  >
                    {item.label}
                    {isActive && <span className="absolute bottom-[-2px] left-0 h-[3px] w-full bg-recom-red" />}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="hidden lg:block">
            <RecomButton asChild size="sm" intent="accent" className="h-9 px-5 text-[10px]">
              <Link href="/sobre#contato">Solicitar orçamento</Link>
            </RecomButton>
          </div>

          <div className="flex w-full items-center justify-between lg:hidden">
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/72">Menu principal</span>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((current) => !current)}
              className="rounded-md border border-white/10 p-2 text-white/80 transition-colors hover:bg-white/8 hover:text-white"
              aria-expanded={isMobileMenuOpen}
              aria-controls="recom-mobile-navigation"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div id="recom-mobile-navigation" className="border-t border-white/10 bg-recom-graphite py-4 lg:hidden">
          <div className="container-recom space-y-5">
            <ul className="grid gap-1">
              {NAV_ITEMS.map((item) => {
                const isActive =
                  pathname === item.href || pathname === item.matchPath || (item.href.includes("#") && pathname === item.matchPath);

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "block rounded-md px-4 py-3 text-[12px] font-bold uppercase tracking-[0.14em] transition-colors",
                        isActive ? "bg-white/10 text-white" : "text-white/66 hover:bg-white/6 hover:text-white"
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="grid gap-3 border-t border-white/10 pt-5 sm:grid-cols-3">
              <a
                href={`tel:${config.contact.phone.replace(/\D/g, "")}`}
                className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-[12px] font-bold uppercase tracking-[0.12em] text-white/78 transition-colors hover:bg-white/10"
              >
                <Phone className="h-4 w-4 text-recom-red" />
                Ligar
              </a>
              <a
                href={`mailto:${config.contact.email}`}
                className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-[12px] font-bold uppercase tracking-[0.12em] text-white/78 transition-colors hover:bg-white/10"
              >
                <Mail className="h-4 w-4 text-recom-red" />
                E-mail
              </a>
              <a
                href={`https://wa.me/${config.contact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-[12px] font-bold uppercase tracking-[0.12em] text-white/78 transition-colors hover:bg-white/10"
              >
                <MessageCircle className="h-4 w-4 text-recom-red" />
                WhatsApp
              </a>
            </div>

            <RecomButton asChild size="md" intent="accent" className="h-11 w-full">
              <Link href="/sobre#contato">Solicitar orçamento</Link>
            </RecomButton>
          </div>
        </div>
      )}
    </nav>
  );
}
