type PreviewRole = "admin" | "editor" | "user" | string;

type PreviewAuth = {
  role: PreviewRole;
} | null;

export function canUseCmsPreview(auth: PreviewAuth): boolean {
  return auth?.role === "admin" || auth?.role === "editor";
}

export function resolveCmsPreviewRequest({
  requestedPreview,
  auth,
}: {
  requestedPreview: boolean;
  auth: PreviewAuth;
}) {
  const usePreview = requestedPreview && canUseCmsPreview(auth);

  return {
    requestedPreview,
    usePreview,
    useAdminClient: usePreview,
    denied: requestedPreview && !usePreview,
  };
}
