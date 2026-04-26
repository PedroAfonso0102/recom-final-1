"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { publishPage } from "@/server/actions/cms-pages";

type PublishPageButtonProps = {
  pageId: string;
};

export function PublishPageButton({ pageId }: PublishPageButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handlePublish() {
    setLoading(true);
    setError(null);

    const result = await publishPage({ pageId });

    if (!result.ok) {
      setError(result.formError ?? "Não foi possível publicar.");
      setLoading(false);
      return;
    }

    window.location.reload();
  }

  return (
    <div className="flex flex-col gap-2">
      <Button type="button" onClick={handlePublish} disabled={loading}>
        {loading ? "Publicando..." : "Publicar página"}
      </Button>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

