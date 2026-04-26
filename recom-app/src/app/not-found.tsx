import { ErrorState } from "@/design-system/components/error-state";

export default function NotFound() {
  return (
    <div className="container-recom flex min-h-[70vh] items-center py-16">
      <ErrorState
        title="Página não encontrada"
        description="O endereço solicitado não existe ou não está mais disponível. Use os atalhos abaixo para continuar sua navegação."
        primaryCta={{ label: "Voltar para a home", href: "/" }}
        secondaryCta={{ label: "Explorar fornecedores", href: "/fornecedores" }}
        className="w-full"
      />
    </div>
  );
}
