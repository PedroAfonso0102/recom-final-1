export const HOME_CMS_SLUG = "home";

export function normalizeCmsSlug(value: string) {
  const trimmed = value.trim().toLowerCase();

  if (trimmed === "" || trimmed === "/") {
    return HOME_CMS_SLUG;
  }

  return trimmed
    .replace(/^\/+/, "")
    .replace(/\/+$/, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9/\[\]_-]/g, "");
}

export function isBlank(value: string | null | undefined) {
  return typeof value !== "string" || value.trim().length === 0;
}
