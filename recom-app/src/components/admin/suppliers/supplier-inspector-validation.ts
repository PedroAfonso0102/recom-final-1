import { SupplierSchema } from "@/cms/schemas/supplier.schema";
import type { Supplier } from "@/cms/schemas/supplier.schema";
import type { SupplierInspectorIssue, SupplierInspectorTab } from "./types";

export function getSupplierInspectorIssues(
  supplier: Supplier
): SupplierInspectorIssue[] {
  const issues: SupplierInspectorIssue[] = [];

  const parsed = SupplierSchema.safeParse(supplier);

  if (!parsed.success) {
    for (const issue of parsed.error.issues) {
      const path = issue.path.join(".");

      issues.push({
        id: `zod:${path}:${issue.code}`,
        severity: "error",
        label: issue.message,
        tab: mapSupplierPathToTab(path),
        fieldPath: path,
      });
    }
  }

  // Business Rules / Best Practices
  if (!supplier.logoUrl) {
    issues.push({
      id: "missing-logo",
      severity: "warning",
      label: "Logo não cadastrada",
      description: "Fornecedores com logo transmitem mais credibilidade.",
      tab: "general",
      fieldPath: "logoUrl",
    });
  }

  if (!supplier.shortDescription && !supplier.description) {
    issues.push({
      id: "missing-description",
      severity: "warning",
      label: "Descrição ausente",
      description: "Adicione uma descrição curta ou completa do fornecedor.",
      tab: "general",
      fieldPath: "description",
    });
  }

  if (!supplier.catalogs?.length) {
    issues.push({
      id: "missing-catalogs",
      severity: "error",
      label: "Nenhum catálogo cadastrado",
      description: "Cadastre ao menos um catálogo técnico para publicação.",
      tab: "catalogs",
      fieldPath: "catalogs",
    });
  }

  if (!supplier.media?.length) {
    issues.push({
      id: "missing-media",
      severity: "warning",
      label: "Nenhuma mídia adicionada",
      description: "Adicione imagens, vídeos ou arquivos técnicos.",
      tab: "media",
      fieldPath: "media",
    });
  }

  if (!supplier.seo?.title) {
    issues.push({
      id: "missing-seo-title",
      severity: "warning",
      label: "Título SEO ausente",
      tab: "seo",
      fieldPath: "seo.title",
    });
  }

  if (!supplier.seo?.description) {
    issues.push({
      id: "missing-seo-description",
      severity: "warning",
      label: "Descrição SEO ausente",
      tab: "seo",
      fieldPath: "seo.description",
    });
  }

  return issues;
}

function mapSupplierPathToTab(path: string): SupplierInspectorTab {
  if (path.startsWith("catalogs")) return "catalogs";
  if (path.startsWith("media")) return "media";
  if (path.startsWith("productLines")) return "productLines";
  if (path.startsWith("layout")) return "layout";
  if (path.startsWith("seo")) return "seo";
  return "general";
}

export function getSupplierCompletionScore(
  supplier: Supplier,
  issues: SupplierInspectorIssue[]
): number {
  const checks = [
    Boolean(supplier.name),
    Boolean(supplier.slug),
    Boolean(supplier.logoUrl),
    Boolean(supplier.shortDescription || supplier.description),
    Boolean(supplier.catalogs?.length),
    Boolean(supplier.media?.length),
    Boolean(supplier.layout),
    Boolean(supplier.seo?.title),
    Boolean(supplier.seo?.description),
  ];

  const completed = checks.filter(Boolean).length;
  const baseScore = Math.round((completed / checks.length) * 100);

  const criticalPenalty = issues.filter((issue) => issue.severity === "error").length * 10;

  return Math.max(0, Math.min(100, baseScore - criticalPenalty));
}
