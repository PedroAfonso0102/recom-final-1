import { MediaLibraryManager } from "@/components/admin/MediaLibraryManager";
import { getMediaAssets } from "@/server/actions/media";

export default async function AdminMediaPage() {
  const assets = await getMediaAssets({ limit: 50 });

  return <MediaLibraryManager initialAssets={assets} />;
}
