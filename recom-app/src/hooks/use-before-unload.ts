"use client";

import { useEffect } from "react";

/**
 * Hook to warn user before leaving the page if there are unsaved changes.
 * @param isDirty - Boolean indicating if there are unsaved changes.
 * @param message - Optional message to show (browsers often show their own generic message).
 */
export function useBeforeUnload(isDirty: boolean, message = "Você tem alterações não salvas. Deseja realmente sair?") {
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isDirty) {
        event.preventDefault();
        event.returnValue = message; // Chrome requires this
        return message;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isDirty, message]);
}
