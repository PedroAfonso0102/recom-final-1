"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { publishPage } from "@/server/actions/cms-pages";
import { Globe, Loader2, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";

type PublishPageButtonProps = {
  pageId: string;
};

export function PublishPageButton({ pageId }: PublishPageButtonProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handlePublish() {
    setLoading(true);
    setSuccess(false);

    try {
      const result = await publishPage({ pageId });

      if (!result.ok) {
        toast({ 
          variant: "destructive", 
          title: "Falha na Publicação",
          description: result.formError ?? "Não foi possível colocar a página no ar."
        });
        setLoading(false);
        return;
      }

      setSuccess(true);
      toast({ 
        title: "Página Publicada!",
        description: "As alterações agora estão visíveis para todos os visitantes."
      });
      
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (e) {
      toast({ 
        variant: "destructive", 
        title: "Erro Crítico",
        description: "Houve um problema na comunicação com o servidor."
      });
      setLoading(false);
    }
  }

  return (
    <Button 
      type="button" 
      onClick={handlePublish} 
      disabled={loading || success}
      className={cn(
        "h-11 px-8 text-xs font-bold tracking-tight gap-2 shadow-sm transition-all rounded-xl",
        success ? "bg-emerald-500 hover:bg-emerald-600 text-white" : "bg-slate-900 hover:bg-slate-800 text-white"
      )}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : success ? (
        <CheckCircle2 className="h-4 w-4" />
      ) : (
        <Globe className="h-4 w-4" />
      )}
      {loading ? "Publicando..." : success ? "Publicado!" : "Publicar Agora"}
    </Button>
  );
}


