import type { CmsFieldDefinition } from "@/cms/types";
import type { ResourceConfig, ResourceField } from "@/lib/resources/types";
import { pagesResource } from "@/features/pages/pages.resource";
import { PAGE_EXPERIENCE_PRESETS } from "@/design-system/contracts/page-experience-presets";

const pageExperienceOptions = Object.values(PAGE_EXPERIENCE_PRESETS).map((preset) => ({
  label: preset.label,
  value: preset.key,
}));

function toCmsField(field: ResourceField): CmsFieldDefinition | null {
  if (field.type === "relationship" || field.type === "json") {
    return null;
  }

  const base = {
    name: field.name,
    label: field.label,
    required: field.required,
    description: field.admin?.description,
  };

  if (field.name === "templateKey") {
    return {
      ...base,
      type: "select",
      options: pageExperienceOptions,
    };
  }

  if (field.type === "upload") {
    return {
      ...base,
      type: "media",
    };
  }

  if (field.type === "textarea") {
    return {
      ...base,
      type: "textarea",
      rows: field.name === "description" ? 2 : 3,
    };
  }

  if (field.type === "select") {
    return {
      ...base,
      type: "select",
      options: field.options ?? [],
    };
  }

  if (field.type === "text") {
    return {
      ...base,
      type: "text",
      placeholder: field.name === "slug" ? "home" : undefined,
    };
  }

  return null;
}

export function getCmsFieldsForResource(resource: ResourceConfig): CmsFieldDefinition[] {
  return resource.fields.flatMap((field) => {
    const cmsField = toCmsField(field);
    return cmsField ? [cmsField] : [];
  });
}

export const pageFields = getCmsFieldsForResource(pagesResource);
