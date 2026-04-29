import {
  PAGE_EXPERIENCE_PRESETS,
  getPageExperiencePreset,
  inferPageExperienceKey,
  type PageExperienceKey,
} from "./page-experience-presets";

const EXPECTED_PRESETS = [
  "home",
  "institutional",
  "commercial_hub",
  "entity_detail",
  "technical_content",
  "promotion",
  "contact",
  "not_found",
] as const satisfies readonly PageExperienceKey[];

for (const preset of EXPECTED_PRESETS) {
  const contract = PAGE_EXPERIENCE_PRESETS[preset];

  if (!contract.label || contract.allowedComponents.length === 0 || contract.sectionDensity.length === 0) {
    throw new Error(`${preset} must define a governed page experience contract.`);
  }
}

if (getPageExperiencePreset("contact").primaryIntent !== "conversion") {
  throw new Error("Contact pages must optimize for conversion.");
}

if (inferPageExperienceKey({ templateKey: "supplier_detail", slug: "fornecedores-catalogos/[slug]" }) !== "entity_detail") {
  throw new Error("Supplier detail templates must infer the entity detail experience.");
}

if (inferPageExperienceKey({ templateKey: "technical_article", slug: "seguranca" }) !== "technical_content") {
  throw new Error("Technical article templates must infer the technical content experience.");
}

if (inferPageExperienceKey({ templateKey: "commercial_hub", slug: "fornecedores-catalogos" }) !== "commercial_hub") {
  throw new Error("Explicit CMS experience keys must be honored.");
}
