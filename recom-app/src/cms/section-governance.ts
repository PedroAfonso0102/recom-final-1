import type { CmsComponentType } from "./component-registry";
import { getPageExperienceFromPage } from "@/design-system/contracts/page-experience-presets";

type GovernancePage = {
  template_key?: string | null;
  slug?: string | null;
};

export function getAllowedComponentsForPage(page: GovernancePage): CmsComponentType[] {
  return getPageExperienceFromPage(page).allowedComponents;
}

export function assertSectionAllowedForPage({
  page,
  componentType,
}: {
  page: GovernancePage;
  componentType: string;
}): { success: true } | { success: false; message: string } {
  const experience = getPageExperienceFromPage(page);

  if (experience.allowedComponents.includes(componentType as CmsComponentType)) {
    return { success: true };
  }

  return {
    success: false,
    message: `O bloco ${componentType} nao faz parte da experiencia "${experience.label}". Use um dos blocos permitidos para este tipo de pagina.`,
  };
}
