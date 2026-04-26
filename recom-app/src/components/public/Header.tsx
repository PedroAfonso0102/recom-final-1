import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";

export function Header() {
  return (
    <header className="w-full bg-background border-b-2 border-foreground sticky top-0 z-50">
      {/* Barra Superior Integrada */}
      <div className="hidden md:block border-b-2 border-foreground/5 bg-muted/30">
        <div className="container mx-auto px-4 py-2.5 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
          <div className="flex items-center gap-8">
            <span className="flex items-center gap-2" data-hook="topbar-location">
              <MapPin className="h-3.5 w-3.5 text-primary" />
              Campinas, SP
            </span>
            <span className="flex items-center gap-2" data-hook="topbar-phone">
              <Phone className="h-3.5 w-3.5 text-primary" />
              {siteConfig.contact.phone}
            </span>
          </div>
          <div className="flex items-center gap-8">
            <span className="flex items-center gap-2" data-hook="topbar-email">
              <Mail className="h-3.5 w-3.5 text-primary" />
              {siteConfig.contact.email}
            </span>
            <Link 
              href="/sobre#contato" 
              className="flex items-center gap-2 hover:text-foreground transition-colors text-success" 
              data-hook="topbar-whatsapp"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              WhatsApp Online
            </Link>
          </div>
        </div>
      </div>

      {/* Área Principal */}
      <div className="container mx-auto px-4 py-5 flex items-center justify-between gap-8">
        <Link 
          href="/" 
          className="flex items-center gap-4 text-foreground no-underline group shrink-0" 
          data-hook="header-brand"
        >
          <div className="h-12 w-12 relative overflow-hidden rounded-md border-2 border-foreground bg-white p-1 shrink-0 transition-transform group-hover:scale-105">
            <img 
              src="/assets/images/logo-triangulo.png" 
              alt="RECOM Logo" 
              className="object-contain w-full h-full"
            />
          </div>
          <div className="flex flex-col">
            <strong className="text-2xl leading-none font-black tracking-tighter group-hover:text-primary transition-colors uppercase" data-hook="content-title">
              {siteConfig.company.name}
            </strong>
            <span className="text-[10px] uppercase tracking-[0.3em] font-black text-muted-foreground mt-1.5" data-hook="content-subtitle">
              {siteConfig.company.subtitle}
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav data-hook="nav-menu" className="hidden lg:block ml-auto">
          <ul className="flex items-center gap-8 text-xs font-black uppercase tracking-widest">
            <li><Link href="/" className="hover:text-primary transition-colors py-2" data-hook="nav-link">Início</Link></li>
            <li><Link href="/fornecedores" className="hover:text-primary transition-colors py-2" data-hook="nav-link">Fornecedores</Link></li>
            <li><Link href="/processos" className="hover:text-primary transition-colors py-2" data-hook="nav-link">Processos</Link></li>
            <li><Link href="/sobre" className="hover:text-primary transition-colors py-2" data-hook="nav-link">Sobre</Link></li>
            <li><Link href="/promocoes" className="hover:text-primary transition-colors py-2" data-hook="nav-link">Promoções</Link></li>
          </ul>
        </nav>
        
        <div className="flex items-center gap-4">
          <Link 
            href="/sobre#contato" 
            className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground h-10 px-6 text-xs font-black uppercase tracking-widest hover:bg-primary/90 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
            data-slot="primary-action"
          >
            Orçamento
          </Link>
        </div>
      </div>
    </header>
  );
}
