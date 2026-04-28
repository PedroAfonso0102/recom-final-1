"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getRevisions, restoreRevision } from "@/server/actions/cms-pages";
import { History, RotateCcw, Loader2, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CmsRevisionRow } from "@/cms/types";
import { useCallback } from "react";

type RevisionHistoryProps = {
  pageId: string;
  onRestore?: () => void;
};

export function RevisionHistory({ pageId, onRestore }: RevisionHistoryProps) {
  const [revisions, setRevisions] = useState<CmsRevisionRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [restoring, setRestoring] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const fetchRevisions = useCallback(async () => {
    setLoading(true);
    const result = await getRevisions(pageId);
    if (result.success) {
      setRevisions(result.data || []);
    }
    setLoading(false);
  }, [pageId]);

  useEffect(() => {
    if (open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchRevisions();
    }
  }, [open, fetchRevisions]);

  async function handleRestore(id: string) {
    if (!confirm("Tem certeza que deseja restaurar esta versão? As alterações atuais serão salvas como uma nova revisão.")) return;
    
    setRestoring(id);
    const result = await restoreRevision(id);
    if (result.success) {
      onRestore?.();
      setOpen(false);
    }
    setRestoring(null);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 text-xs h-8">
          <History className="h-3.5 w-3.5" />
          Histórico
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Histórico de Edições</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-primary/50" />
              <p className="text-xs text-muted-foreground">Carregando histórico...</p>
            </div>
          ) : revisions.length === 0 ? (
            <div className="text-center py-12 bg-muted/20 rounded-lg border border-dashed border-border">
              <Clock className="h-8 w-8 mx-auto mb-3 text-muted-foreground/30" />
              <p className="text-sm text-muted-foreground">Nenhuma revisão encontrada.</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {revisions.map((rev) => (
                <div 
                  key={rev.id} 
                  className={cn(
                    "group flex items-center justify-between p-3 rounded-lg border border-border bg-white hover:border-primary/30 transition-all",
                    rev.is_autosave ? "border-dashed" : "shadow-sm"
                  )}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">
                        {rev.label || (rev.is_autosave ? "Auto-save" : "Snapshot Manual")}
                      </span>
                      {rev.is_autosave && (
                        <span className="text-[10px] px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded font-medium">Autosave</span>
                      )}
                    </div>
                    <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                      <Clock className="h-2.5 w-2.5" />
                      {new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(rev.created_at))}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleRestore(rev.id)}
                    disabled={restoring === rev.id}
                  >
                    {restoring === rev.id ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <RotateCcw className="h-3.5 w-3.5" />
                    )}
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
