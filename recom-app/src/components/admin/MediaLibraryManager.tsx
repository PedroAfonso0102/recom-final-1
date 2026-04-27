"use client";

import { useState, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import {
  Upload,
  Image as ImageIcon,
  FileText,
  Trash2,
  Copy,
  Check,
  Loader2,
  Search,
  X,
  FileImage,
  FilePlus,
  HardDrive,
} from "lucide-react";
import type { MediaAsset } from "@/server/actions/media";
import {
  uploadMedia,
  deleteMediaAsset,
  updateMediaAltText,
  getMediaAssets,
} from "@/server/actions/media";

type FilterType = "all" | "image" | "application/pdf";

const FILTERS: { label: string; value: FilterType; icon: React.ReactNode }[] = [
  { label: "Todos", value: "all", icon: <HardDrive className="h-3.5 w-3.5" /> },
  { label: "Imagens", value: "image", icon: <FileImage className="h-3.5 w-3.5" /> },
  { label: "PDFs", value: "application/pdf", icon: <FileText className="h-3.5 w-3.5" /> },
];

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function isImageMime(mime: string) {
  return mime.startsWith("image/");
}

export function MediaLibraryManager({
  initialAssets,
}: {
  initialAssets: MediaAsset[];
}) {
  const [assets, setAssets] = useState<MediaAsset[]>(initialAssets);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [filter, setFilter] = useState<FilterType>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAsset, setSelectedAsset] = useState<MediaAsset | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [editingAlt, setEditingAlt] = useState<string | null>(null);
  const [altValue, setAltValue] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const refreshAssets = useCallback(async () => {
    const mimeFilter = filter === "all" ? undefined : filter;
    const data = await getMediaAssets({ limit: 50, mimeFilter });
    setAssets(data);
  }, [filter]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setUploadProgress(0);
    const total = files.length;
    let completed = 0;
    let hasError = false;

    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append("file", file);

      const result = await uploadMedia(formData);

      if (!result.ok) {
        toast({
          variant: "destructive",
          title: `Falha: ${file.name}`,
          description: result.error,
        });
        hasError = true;
      }

      completed++;
      setUploadProgress(Math.round((completed / total) * 100));
    }

    if (!hasError) {
      toast({
        title: `${total} arquivo${total > 1 ? "s" : ""} enviado${total > 1 ? "s" : ""}`,
        description: "Upload concluído com sucesso.",
      });
    }

    setUploading(false);
    setUploadProgress(0);

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    await refreshAssets();
  };

  const handleCopyUrl = (asset: MediaAsset) => {
    navigator.clipboard.writeText(asset.public_url);
    setCopiedId(asset.id);
    toast({ title: "URL copiada!" });
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async (id: string) => {
    setDeleting(id);
    const result = await deleteMediaAsset(id);

    if (!result.ok) {
      toast({ variant: "destructive", title: "Falha", description: result.error });
    } else {
      toast({ title: "Arquivo removido." });
      setSelectedAsset(null);
    }

    setDeleting(null);
    await refreshAssets();
  };

  const handleAltSave = async (id: string) => {
    const result = await updateMediaAltText(id, altValue);
    if (result.ok) {
      toast({ title: "Texto alternativo atualizado." });
      setEditingAlt(null);
      await refreshAssets();
    } else {
      toast({ variant: "destructive", title: "Erro", description: result.error });
    }
  };

  // Apply filters
  const filteredAssets = assets.filter((a) => {
    if (filter === "image" && !isImageMime(a.mime_type)) return false;
    if (filter === "application/pdf" && a.mime_type !== "application/pdf") return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        a.file_name.toLowerCase().includes(q) ||
        a.alt_text?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const totalSize = assets.reduce((sum, a) => sum + a.size_bytes, 0);

  return (
    <div className="space-y-10">
      {/* HEADER */}
      <div className="flex flex-col gap-6 border-b border-border pb-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-4xl font-black tracking-tight text-slate-900">
              Biblioteca de Mídia
            </h1>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
              {assets.length} arquivo{assets.length !== 1 ? "s" : ""} •{" "}
              {formatFileSize(totalSize)} total
            </p>
          </div>

          <div>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,.pdf"
              className="hidden"
              onChange={handleUpload}
              id="media-upload-input"
            />
            <Button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="h-11 px-8 text-[10px] font-black uppercase tracking-widest gap-2 shadow-lg bg-primary shadow-primary/20"
            >
              {uploading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <FilePlus className="h-4 w-4" />
              )}
              {uploading ? `Enviando ${uploadProgress}%` : "Upload"}
            </Button>
          </div>
        </div>

        {/* Upload progress bar */}
        {uploading && (
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-300 ease-out"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        )}

        {/* Filters + Search */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1 bg-muted/50 p-1 rounded-xl">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={async () => {
                  setFilter(f.value);
                  // We'll let filteredAssets handle this client-side
                }}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all",
                  filter === f.value
                    ? "bg-white shadow-sm text-slate-900"
                    : "text-muted-foreground hover:text-slate-600"
                )}
              >
                {f.icon}
                {f.label}
              </button>
            ))}
          </div>

          <div className="relative flex-1 min-w-[200px] max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-10 text-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <X className="h-3.5 w-3.5 text-muted-foreground" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex gap-8">
        {/* Grid */}
        <div className="flex-1">
          {filteredAssets.length === 0 ? (
            <div className="py-20 text-center border-2 border-dashed border-slate-200 rounded-3xl space-y-4">
              <Upload className="h-12 w-12 text-slate-200 mx-auto" />
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                {searchQuery
                  ? "Nenhum arquivo encontrado."
                  : "Nenhum arquivo na biblioteca. Faça o primeiro upload."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredAssets.map((asset) => (
                <Card
                  key={asset.id}
                  onClick={() => setSelectedAsset(asset)}
                  className={cn(
                    "group cursor-pointer overflow-hidden rounded-xl border transition-all hover:shadow-lg hover:border-primary/30",
                    selectedAsset?.id === asset.id &&
                      "ring-2 ring-primary border-primary shadow-lg"
                  )}
                >
                  <div className="aspect-square bg-slate-50 relative flex items-center justify-center overflow-hidden">
                    {isImageMime(asset.mime_type) ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={asset.public_url}
                        alt={asset.alt_text || asset.file_name}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                    ) : (
                      <FileText className="h-10 w-10 text-slate-300" />
                    )}
                    <Badge
                      variant="outline"
                      className="absolute top-2 right-2 text-[8px] font-black uppercase bg-white/90 backdrop-blur-sm border-white/50"
                    >
                      {asset.mime_type.split("/")[1]}
                    </Badge>
                  </div>
                  <CardContent className="p-3 space-y-1">
                    <p className="text-[11px] font-bold text-slate-700 truncate">
                      {asset.file_name}
                    </p>
                    <p className="text-[9px] text-slate-400 font-medium">
                      {formatFileSize(asset.size_bytes)}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Detail panel */}
        {selectedAsset && (
          <div className="w-80 shrink-0 space-y-6">
            <Card className="border-border rounded-2xl overflow-hidden sticky top-6">
              {/* Preview */}
              <div className="aspect-video bg-slate-50 flex items-center justify-center overflow-hidden">
                {isImageMime(selectedAsset.mime_type) ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={selectedAsset.public_url}
                    alt={selectedAsset.alt_text || selectedAsset.file_name}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <FileText className="h-16 w-16 text-slate-200" />
                )}
              </div>

              <CardContent className="p-6 space-y-5">
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                    Nome do Arquivo
                  </p>
                  <p className="text-sm font-bold text-slate-900 break-all">
                    {selectedAsset.file_name}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">
                      Tipo
                    </p>
                    <Badge variant="outline" className="text-[9px] font-bold">
                      {selectedAsset.mime_type}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">
                      Tamanho
                    </p>
                    <p className="text-xs font-bold text-slate-700">
                      {formatFileSize(selectedAsset.size_bytes)}
                    </p>
                  </div>
                </div>

                {/* Alt text */}
                <div className="space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                    Texto Alternativo (SEO)
                  </p>
                  {editingAlt === selectedAsset.id ? (
                    <div className="flex gap-2">
                      <Input
                        value={altValue}
                        onChange={(e) => setAltValue(e.target.value)}
                        placeholder="Descreva a imagem..."
                        className="h-8 text-xs"
                        autoFocus
                      />
                      <Button
                        size="sm"
                        className="h-8 px-3"
                        onClick={() => handleAltSave(selectedAsset.id)}
                      >
                        <Check className="h-3 w-3" />
                      </Button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setEditingAlt(selectedAsset.id);
                        setAltValue(selectedAsset.alt_text || "");
                      }}
                      className="text-xs text-left text-slate-600 hover:text-primary transition-colors w-full p-2 -m-2 rounded-lg hover:bg-slate-50"
                    >
                      {selectedAsset.alt_text || (
                        <span className="text-amber-500 italic">
                          Sem texto alternativo — clique para adicionar
                        </span>
                      )}
                    </button>
                  )}
                </div>

                {/* URL */}
                <div className="space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                    URL Pública
                  </p>
                  <div className="flex gap-2">
                    <Input
                      value={selectedAsset.public_url}
                      readOnly
                      className="h-8 text-[10px] font-mono bg-slate-50"
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 px-3 shrink-0"
                      onClick={() => handleCopyUrl(selectedAsset)}
                    >
                      {copiedId === selectedAsset.id ? (
                        <Check className="h-3 w-3 text-emerald-500" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Date */}
                <div className="space-y-1">
                  <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">
                    Enviado em
                  </p>
                  <p className="text-xs text-slate-600">
                    {new Date(selectedAsset.created_at).toLocaleDateString(
                      "pt-BR",
                      {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </p>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-border">
                  <Button
                    variant="destructive"
                    size="sm"
                    className="w-full text-[10px] font-black uppercase tracking-widest gap-2"
                    disabled={deleting === selectedAsset.id}
                    onClick={() => {
                      if (
                        confirm(
                          `Excluir "${selectedAsset.file_name}" permanentemente?`
                        )
                      ) {
                        handleDelete(selectedAsset.id);
                      }
                    }}
                  >
                    {deleting === selectedAsset.id ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Trash2 className="h-3.5 w-3.5" />
                    )}
                    Excluir Arquivo
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
