import { canUseCmsPreview, resolveCmsPreviewRequest } from "./preview";

if (canUseCmsPreview(null)) {
  throw new Error("Anonymous users must not be allowed to preview CMS drafts.");
}

if (canUseCmsPreview({ role: "user" })) {
  throw new Error("Regular users must not be allowed to preview CMS drafts.");
}

if (!canUseCmsPreview({ role: "editor" }) || !canUseCmsPreview({ role: "admin" })) {
  throw new Error("Editors and admins must be allowed to preview CMS drafts.");
}

const anonymousPreview = resolveCmsPreviewRequest({ requestedPreview: true, auth: null });
if (anonymousPreview.usePreview || anonymousPreview.useAdminClient) {
  throw new Error("Anonymous preview requests must fall back to public published content.");
}

const editorPreview = resolveCmsPreviewRequest({ requestedPreview: true, auth: { role: "editor" } });
if (!editorPreview.usePreview || !editorPreview.useAdminClient) {
  throw new Error("Editor preview requests must use admin CMS reads.");
}
