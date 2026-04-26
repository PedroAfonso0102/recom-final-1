import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";

export function Header() {
  return (
    <header className="w-full bg-background border-b border-border">
      {/* Barra Superior Integrada */}
      <div className="hidden md:block border-b border-border bg-muted/20">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5" data-hook="topbar-location">
              <MapPin className="h-3.5 w-3.5" />
              Campinas, SP
            </span>
            <span className="flex items-center gap-1.5" data-hook="topbar-phone">
              <Phone className="h-3.5 w-3.5" />
              {siteConfig.contact.phone}
            </span>
          </div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5" data-hook="topbar-email">
              <Mail className="h-3.5 w-3.5" />
              {siteConfig.contact.email}
            </span>
            <Link 
              href="/contato#whatsapp" 
              className="flex items-center gap-1.5 hover:text-foreground transition-colors" 
              data-hook="topbar-whatsapp"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              WhatsApp
            </Link>
          </div>
        </div>
      </div>

      {/* Área Principal */}
      <div className="container mx-auto px-4 py-4 md:py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <Link 
          href="/" 
          className="flex items-center gap-4 text-foreground no-underline" 
          data-hook="header-brand"
        >
          <div className="h-10 w-10 bg-primary rounded-sm flex items-center justify-center text-primary-foreground font-bold shrink-0">
            {/* Placeholder until we have the image in public folder */}
            R
          </div>
          <div className="flex flex-col">
            <strong className="text-xl leading-none font-bold tracking-tight" data-hook="content-title">
              {siteConfig.company.name}
            </strong>
            <span className="text-sm text-muted-foreground" data-hook="content-subtitle">
              {siteConfig.company.subtitle}
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end">
          <nav data-hook="nav-menu" className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm font-semibold">
              <li><Link href="/" className="hover:text-primary transition-colors" data-hook="nav-link">Início</Link></li>
              <li><Link href="/fornecedores" className="hover:text-primary transition-colors" data-hook="nav-link">Fornecedores</Link></li>
              <li><Link href="/processos" className="hover:text-primary transition-colors" data-hook="nav-link">Processos</Link></li>
              <li><Link href="/sobre" className="hover:text-primary transition-colors" data-hook="nav-link">Sobre</Link></li>
              <li><Link href="/promocoes" className="hover:text-primary transition-colors" data-hook="nav-link">Promoções</Link></li>
            </ul>
          </nav>
          
          <Link 
            href="/contato" 
            className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary/90 transition-colors w-full md:w-auto text-center shadow-sm"
            data-slot="primary-action"
          >
            Orçamento
          </Link>
        </div>
      </div>
    </header>
  );
}
