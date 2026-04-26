import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import { RecomButton } from "@/design-system/components/recom-button";

export function Header() {
  return (
    <header className="w-full bg-background/95 backdrop-blur-md border-b border-border sticky top-0 z-50 transition-all duration-300">
      {/* Barra Superior Integrada */}
      <div className="hidden md:block border-b border-border/40 bg-muted/20">
        <div className="container mx-auto px-4 py-1.5 flex items-center justify-between text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/80">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3 w-3 text-primary/50" />
              Campinas, SP
            </span>
            <span className="flex items-center gap-1.5">
              <Phone className="h-3 w-3 text-primary/50" />
              {siteConfig.contact.phone}
            </span>
          </div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <Mail className="h-3 w-3 text-primary/50" />
              {siteConfig.contact.email}
            </span>
            <Link 
              href="/sobre#contato" 
              className="flex items-center gap-1.5 hover:text-primary transition-colors text-primary font-bold"
            >
              <MessageCircle className="h-3 w-3" />
              WhatsApp Online
            </Link>
          </div>
        </div>
      </div>

      {/* Área Principal */}
      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-8">
        <Link 
          href="/" 
          className="flex items-center gap-3 text-foreground no-underline group shrink-0" 
          data-hook="header-brand"
        >
          <div className="h-9 w-9 relative overflow-hidden rounded-md border border-border bg-white p-1.5 shrink-0 transition-all duration-300 group-hover:shadow-sm group-hover:border-primary/30">
            <img 
              src="/assets/images/logo-triangulo.png" 
              alt="RECOM Logo" 
              className="object-contain w-full h-full"
            />
          </div>
          <div className="flex flex-col">
            <strong className="text-base leading-none font-bold tracking-tight group-hover:text-primary transition-colors" data-hook="content-title">
              {siteConfig.company.name}
            </strong>
            <span className="text-[8px] uppercase tracking-wider font-medium text-muted-foreground mt-1" data-hook="content-subtitle">
              {siteConfig.company.subtitle}
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav data-hook="nav-menu" className="hidden lg:block ml-auto">
          <ul className="flex items-center gap-8 text-[10px] font-bold uppercase tracking-wider text-foreground/70">
            <li><Link href="/" className="hover:text-primary transition-colors py-1" data-hook="nav-link">Início</Link></li>
            <li><Link href="/fornecedores" className="hover:text-primary transition-colors py-1" data-hook="nav-link">Fornecedores</Link></li>
            <li><Link href="/processos" className="hover:text-primary transition-colors py-1" data-hook="nav-link">Processos</Link></li>
            <li><Link href="/sobre" className="hover:text-primary transition-colors py-1" data-hook="nav-link">Sobre</Link></li>
            <li><Link href="/promocoes" className="hover:text-primary transition-colors py-1" data-hook="nav-link">Promoções</Link></li>
          </ul>
        </nav>
        
        <div className="flex items-center gap-4">
          <RecomButton 
            asChild 
            intent="primary" 
            size="md"
            className="rounded-full px-6 shadow-sm hover:shadow-md transition-all duration-300 text-[10px]"
          >
            <Link href="/sobre#contato">Orçamento</Link>
          </RecomButton>
        </div>
      </div>
    </header>
  );
}

