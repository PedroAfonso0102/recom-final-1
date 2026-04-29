"use client";

import { useEffect, useRef } from "react";

/**
 * Hook to automatically trigger a save function after a delay when data changes.
 * @param callback - The save function to call.
 * @param delay - Milliseconds to wait before saving (default 3000ms).
 * @param isDirty - Boolean to control if autosave should be active.
 */
export function useAutosave(callback: () => void, delay = 3000, isDirty: boolean) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!isDirty) return;

    const timer = setTimeout(() => {
      savedCallback.current();
    }, delay);

    return () => clearTimeout(timer);
  }, [isDirty, delay]);
}
