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

export function extractPropsFromFormData(formData: FormData, fields: { name: string; type: string; required?: boolean }[]) {
  return Object.fromEntries(
    fields.map((field) => {
      const value = formData.get(field.name);
      
      if (field.type === "list") {
        try {
          return [field.name, JSON.parse(String(value ?? "[]"))];
        } catch {
          return [field.name, []];
        }
      }
      
      if (field.type === "checkbox") {
        return [field.name, value === "on"];
      }
      
      if (field.type === "number") {
        return [field.name, value ? Number(value) : (field.required ? 0 : null)];
      }
      
      return [field.name, String(value ?? "")];
    })
  );
}
