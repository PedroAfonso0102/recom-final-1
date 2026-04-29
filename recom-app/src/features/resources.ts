import type { ResourceConfig } from "@/lib/resources/types";
import { leadsResource } from "./leads/leads.resource";
import { pagesResource } from "./pages/pages.resource";
import { promotionsResource } from "./promotions/promotions.resource";
import { suppliersResource } from "./suppliers/suppliers.resource";

export const resources = [
  pagesResource,
  leadsResource,
  suppliersResource,
  promotionsResource,
] as const satisfies readonly ResourceConfig[];

export type ResourceSlug = (typeof resources)[number]["slug"];

export function getResource(slug: ResourceSlug) {
  return resources.find((resource) => resource.slug === slug) ?? null;
}
