"use client";

import React from "react";
import { useAnalytics } from "@/hooks/use-analytics";

interface TrackClickProps {
  children: React.ReactNode;
  eventName: string;
  params?: Record<string, string | number | boolean | undefined | null>;
}

/**
 * Componente utilitário para rastrear cliques em elementos renderizados no servidor.
 */
export function TrackClick({ children, eventName, params }: TrackClickProps) {
  const { trackEvent } = useAnalytics();

  if (!React.isValidElement(children)) {
    return <>{children}</>;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const child = children as React.ReactElement<any>;

  return React.cloneElement(child, {
    onClick: (e: React.MouseEvent) => {
      // Executa o onClick original se existir
      if (child.props && typeof child.props.onClick === "function") {
        child.props.onClick(e);
      }
      
      trackEvent(eventName, params);
    },
  });
}
