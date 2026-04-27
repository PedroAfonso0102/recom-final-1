"use client";

import { useEffect, useMemo, useState } from "react";
import { Image as ImageIcon, FileText, Loader2, Search } from "lucide-react";
import type { MediaAsset } from "@/server/actions/media";
import { getMediaAssets } from "@/server/actions/media";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

function isImageMime(mime: string) {
  return mime.startsWith("image/");
}

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

type MediaPickerDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (asset: MediaAsset) => void;
};

export function MediaPickerDialog({ open, onOpenChange, onSelect }: MediaPickerDialogProps) {
  const [assets, setAssets] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadAssets() {
      if (!open) return;

      setLoading(true);
      const data = await getMediaAssets({ limit: 100, mimeFilter: "image" });

      if (!cancelled) {
        setAssets(data);
      }

      setLoading(false);
    }

    loadAssets();

    return () => {
      cancelled = true;
    };
  }, [open]);

  const filteredAssets = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    if (!q) {
      return assets;
    }

    return assets.filter((asset) => {
      return (
        asset.file_name.toLowerCase().includes(q) ||
        asset.alt_text?.toLowerCase().includes(q) ||
        asset.mime_type.toLowerCase().includes(q)
      );
    });
  }, [assets, searchQuery]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle>Selecionar imagem da biblioteca</DialogTitle>
          <DialogDescription>Escolha uma imagem ja enviada para usar neste campo.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Buscar por nome ou texto alternativo..."
              className="pl-10"
            />
          </div>

          {loading ? (
            <div className="flex items-center justify-center rounded-2xl border border-dashed border-border py-20 text-sm text-muted-foreground">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Carregando biblioteca...
            </div>
          ) : filteredAssets.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border py-20 text-center text-sm text-muted-foreground">
              Nenhuma imagem encontrada.
            </div>
          ) : (
            <div className="grid max-h-[60vh] gap-4 overflow-auto pr-1 sm:grid-cols-2 lg:grid-cols-3">
              {filteredAssets.map((asset) => (
                <Card
                  key={asset.id}
                  className="overflow-hidden border-border transition hover:border-primary/40 hover:shadow-md"
                >
                  <div className="aspect-video bg-muted/40">
                    {isImageMime(asset.mime_type) ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={asset.public_url}
                        alt={asset.alt_text || asset.file_name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-muted-foreground">
                        <FileText className="h-10 w-10" />
                      </div>
                    )}
                  </div>

                  <CardContent className="space-y-4 p-4">
                    <div className="space-y-1">
                      <p className="truncate text-sm font-semibold">{asset.file_name}</p>
                      <p className="line-clamp-2 text-xs text-muted-foreground">
                        {asset.alt_text || "Sem texto alternativo."}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="outline" className="text-[10px] uppercase tracking-widest">
                        {asset.mime_type.split("/")[1] || "arquivo"}
                      </Badge>
                      <span className="text-[10px] text-muted-foreground">{formatFileSize(asset.size_bytes)}</span>
                    </div>

                    <Button
                      type="button"
                      className="w-full gap-2"
                      onClick={() => {
                        onSelect(asset);
                        onOpenChange(false);
                      }}
                    >
                      <ImageIcon className="h-4 w-4" />
                      Usar esta imagem
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
