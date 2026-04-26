import type { ComponentType } from "react";
import { cn } from "@/lib/utils";
import { getComponentDefinition } from "./component-registry";
import type { CmsSectionRow } from "./types";

type RenderSectionProps = {
  section: CmsSectionRow;
  preview?: boolean;
};

function InvalidSection({ message }: { message: string }) {
  return (
    <div className="rounded-lg border border-dashed border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
      {message}
    </div>
  );
}

export function RenderSection({ section, preview = false }: RenderSectionProps) {
  if (section.status === "archived") {
    return null;
  }

  const definition = getComponentDefinition(section.component_type);

  if (!definition) {
    console.error(`[CMS] Bloco não registrado: ${section.component_type} (${section.id})`);
    return preview ? <InvalidSection message={`Bloco não registrado: ${section.component_type}`} /> : null;
  }

  const parsed = definition.schema.safeParse(section.props ?? {});

  if (!parsed.success) {
    console.error(`[CMS] Props inválidas em ${section.component_type} (${section.id})`, parsed.error.flatten());
    return preview ? <InvalidSection message={`Bloco inválido: ${definition.label}`} /> : null;
  }

  const Component = definition.component as ComponentType<any>;

  if (preview && section.visibility === "hidden") {
    return (
      <div className={cn("rounded-xl border border-dashed border-border bg-muted/20 p-2")}>
        <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
          Seção oculta
        </div>
        <Component {...parsed.data} />
      </div>
    );
  }

  return <Component {...parsed.data} />;
}
