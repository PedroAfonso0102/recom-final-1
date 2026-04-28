import type { CmsPageWithSections } from "./types";
import { RenderSection } from "./render-section";
import { getPageExperienceFromPage } from "@/design-system/contracts/page-experience-presets";
import { cn } from "@/lib/utils";

type RenderPageProps = {
  pageData: CmsPageWithSections;
  preview?: boolean;
  context?: Record<string, unknown>;
};

export function RenderPage({ pageData, preview = false, context }: RenderPageProps) {
  const { page, sections } = pageData;
  const experience = getPageExperienceFromPage(page);

  if (preview && sections.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border bg-muted/30 p-8 text-sm text-muted-foreground">
        Esta página ainda não tem seções.
      </div>
    );
  }

  return (
    <div
      className={cn("flex flex-col", experience.className)}
      data-page-experience={experience.key}
      data-page-intent={experience.primaryIntent}
    >
      {sections.map((section) => (
        <RenderSection key={section.id} section={section} preview={preview} context={context} />
      ))}
    </div>
  );
}
