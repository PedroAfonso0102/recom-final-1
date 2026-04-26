import Link from "next/link";
import { siteConfig } from "@/lib/config";

export function Footer() {
  return (
    <footer className="w-full border-t border-border mt-16 py-12 md:py-16 bg-muted/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Coluna 1: Institucional */}
          <div className="flex flex-col gap-4">
            <strong className="text-xl leading-none font-bold tracking-tight" data-hook="footer-title">
              {siteConfig.company.name}
            </strong>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Distribuidor B2B de ferramentas de corte e soluções de usinagem com presença regional e histórico técnico comprovado desde 1990.
            </p>
            <div className="mt-4">
              <Link 
                href="/contato" 
                className="inline-flex items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground px-4 py-2 text-sm font-medium transition-colors shadow-sm"
                data-slot="primary-action"
              >
                Solicitar cotação
              </Link>
            </div>
          </div>

          {/* Coluna 2: Navegação */}
          <div className="flex flex-col gap-4">
            <strong className="text-sm uppercase font-bold tracking-wider mb-2">Navegação</strong>
            <ul className="flex flex-col gap-3 text-sm">
              <li><Link href="/fornecedores" className="text-muted-foreground hover:text-foreground transition-colors">Nossos Fornecedores</Link></li>
              <li><Link href="/processos" className="text-muted-foreground hover:text-foreground transition-colors">Processos & Soluções</Link></li>
              <li><Link href="/sobre" className="text-muted-foreground hover:text-foreground transition-colors">Sobre a RECOM®</Link></li>
              <li><Link href="/promocoes" className="text-muted-foreground hover:text-foreground transition-colors">Promoções</Link></li>
            </ul>
          </div>

          {/* Coluna 3: Endereço */}
          <div className="flex flex-col gap-4">
            <strong className="text-sm uppercase font-bold tracking-wider mb-2">Base Regional</strong>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {siteConfig.contact.address}<br />
              CEP {siteConfig.contact.cep}
            </p>
          </div>

          {/* Coluna 4: Contato */}
          <div className="flex flex-col gap-4">
            <strong className="text-sm uppercase font-bold tracking-wider mb-2">Canais</strong>
            <p className="text-sm text-muted-foreground leading-relaxed">
              📞 {siteConfig.contact.phone}<br />
              ✉️ {siteConfig.contact.email}
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-16 pt-8 border-t border-border text-xs text-muted-foreground gap-4">
          <div className="flex flex-col gap-1.5">
            <span>&copy; {new Date().getFullYear()} {siteConfig.company.name}.</span>
            <span className="opacity-70">Razão Social: A A Montelione Comercio Ltda. CNPJ: {siteConfig.company.cnpj}.</span>
          </div>
          <nav className="flex items-center gap-6">
            <Link href="/privacidade" className="hover:text-foreground transition-colors">Privacidade</Link>
            <span className="opacity-50">Design System B2B v1.0</span>
          </nav>
        </div>
      </div>
    </footer>
  );
}
