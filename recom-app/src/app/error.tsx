"use client";

import { useEffect } from "react";
import { ErrorState } from "@/design-system/components/error-state";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container-recom flex min-h-[70vh] items-center py-16">
      <ErrorState
        title="Algo saiu do ar"
        description="Encontramos um erro inesperado ao carregar esta página. Você pode tentar novamente ou voltar para a home."
        primaryCta={{ label: "Ir para a home", href: "/" }}
        secondaryCta={{ label: "Falar com a RECOM", href: "/sobre#contato" }}
        retryLabel="Tentar novamente"
        onRetry={reset}
        className="w-full"
      />
    </div>
  );
}
