"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { RecomButton } from "@/design-system/components/recom-button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Sobre", href: "/sobre" },
  { label: "Fornecedores", href: "/fornecedores" },
  { label: "Processos", href: "/processos" },
  { label: "Promoções", href: "/promocoes" },
  { label: "Contato", href: "/sobre#contato" },
];

export function MainNavigation() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-recom-graphite text-white sticky top-0 z-50 shadow-md">
      <div className="container-recom">
        <div className="flex items-center justify-between h-14">
          {/* Desktop Menu */}
          <ul className="hidden lg:flex items-center gap-10">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link 
                    href={item.href}
                    className={cn(
                      "relative py-4 text-[11px] font-bold uppercase tracking-[0.15em] transition-all hover:text-white",
                      isActive ? "text-white" : "text-white/60"
                    )}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-[-2px] left-0 w-full h-[3px] bg-recom-red" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* CTA Right */}
          <div className="hidden lg:block ml-auto">
            <RecomButton asChild size="sm" intent="accent" className="h-9 px-6 text-[10px]">
              <Link href="/sobre#contato">Solicitar Orçamento</Link>
            </RecomButton>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="lg:hidden flex items-center justify-between w-full">
             <span className="text-[11px] font-bold uppercase tracking-wider text-white/80">Menu Principal</span>
             <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-white/80 hover:text-white"
             >
               {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
             </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-recom-graphite border-t border-white/10 py-4 animate-in slide-in-from-top duration-300">
          <ul className="flex flex-col gap-1 px-4">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link 
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "block py-3 px-4 rounded-md text-[12px] font-bold uppercase tracking-wider transition-all",
                      isActive ? "bg-white/10 text-white" : "text-white/60 hover:text-white hover:bg-white/5"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
            <li className="mt-4 pt-4 border-t border-white/10">
              <RecomButton asChild size="md" intent="accent" className="w-full">
                <Link href="/sobre#contato" onClick={() => setIsMobileMenuOpen(false)}>Solicitar Orçamento</Link>
              </RecomButton>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
