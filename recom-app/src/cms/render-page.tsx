import type { CmsPageWithSections } from "./types";
import { RenderSection } from "./render-section";

type RenderPageProps = {
  pageData: CmsPageWithSections;
  preview?: boolean;
  context?: Record<string, unknown>;
};

export function RenderPage({ pageData, preview = false, context }: RenderPageProps) {
  const { sections } = pageData;

  if (preview && sections.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border bg-muted/30 p-8 text-sm text-muted-foreground">
        Esta página ainda não tem seções.
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {sections.map((section) => (
        <RenderSection key={section.id} section={section} preview={preview} context={context} />
      ))}
    </div>
  );
}

