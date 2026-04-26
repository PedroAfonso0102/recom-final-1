'use client';
import { useToast } from './use-toast';

export function Toaster() {
  const { toasts } = useToast();
  if (toasts.length === 0) return null;
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((t, i) => (
        <div key={i} className={`p-4 rounded shadow-lg text-white ${t.variant === 'destructive' ? 'bg-red-500' : 'bg-slate-800'}`}>
          {t.title && <div className="font-bold">{t.title}</div>}
          {t.description && <div className="text-sm">{t.description}</div>}
        </div>
      ))}
    </div>
  );
}
