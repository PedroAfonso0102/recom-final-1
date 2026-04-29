import Link from "next/link";

import { ErrorState } from "@/design-system/components/error-state";

export default function NotFound() {
  return (
    <div className="container-recom flex min-h-[70vh] items-center py-16">
      <ErrorState
        title="Página não encontrada"
        description="O endereço solicitado não existe ou não está mais disponível. Use os atalhos abaixo para continuar a navegação."
        primaryCta={{ label: "Ir para o início", href: "/" }}
        secondaryCta={{ label: "Explorar fornecedores e catálogos", href: "/fornecedores-catalogos" }}
        className="w-full"
      >
        <nav aria-label="Caminhos de recuperação" className="mt-6 flex flex-wrap justify-center gap-3 text-sm font-semibold">
          <Link className="text-primary underline-offset-4 hover:underline" href="/">
            Início
          </Link>
          <Link className="text-primary underline-offset-4 hover:underline" href="/fornecedores-catalogos">
            Fornecedores & Catálogos
          </Link>
          <Link className="text-primary underline-offset-4 hover:underline" href="/solucoes">
            Soluções / Processos
          </Link>
          <Link className="text-primary underline-offset-4 hover:underline" href="/contato">
            Contato / Orçamento
          </Link>
        </nav>
      </ErrorState>
    </div>
  );
}
