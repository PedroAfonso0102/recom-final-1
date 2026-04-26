"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { reorderSections } from "@/server/actions/cms-pages";

type SectionReorderButtonsProps = {
  pageId: string;
  moveUpOrder?: string[];
  moveDownOrder?: string[];
};

export function SectionReorderButtons({ pageId, moveUpOrder, moveDownOrder }: SectionReorderButtonsProps) {
  const [loading, setLoading] = useState<"up" | "down" | null>(null);

  async function handleMove(orderedSectionIds: string[], direction: "up" | "down") {
    setLoading(direction);
    await reorderSections({ pageId, orderedSectionIds });
    setLoading(null);
    window.location.reload();
  }

  return (
    <div className="flex gap-2">
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={!moveUpOrder || loading !== null}
        onClick={() => moveUpOrder && handleMove(moveUpOrder, "up")}
      >
        Subir
      </Button>
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={!moveDownOrder || loading !== null}
        onClick={() => moveDownOrder && handleMove(moveDownOrder, "down")}
      >
        Descer
      </Button>
    </div>
  );
}

