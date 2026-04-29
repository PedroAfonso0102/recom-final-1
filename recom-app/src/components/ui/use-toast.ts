import { useState, useEffect } from 'react';

export interface ToastProps {
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive';
}

const toastListeners = new Set<(toast: ToastProps) => void>();

export function toast(props: ToastProps) {
  toastListeners.forEach((listener) => listener(props));
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  useEffect(() => {
    const handleToast = (newToast: ToastProps) => {
      setToasts((prev) => [...prev, newToast]);

      // Auto dismiss after 3 seconds
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t !== newToast));
      }, 3000);
    };

    toastListeners.add(handleToast);
    return () => {
      toastListeners.delete(handleToast);
    };
  }, []);

  return { toast, toasts };
}
