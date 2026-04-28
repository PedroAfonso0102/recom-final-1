'use server';

import { requireAdmin } from "@/lib/auth/utils";
import { createAdminClient } from "@/lib/supabase/admin";
import { createAuditLog } from "@/lib/audit";
import { revalidatePath } from "next/cache";

export type MediaAsset = {
  id: string;
  file_name: string;
  file_path: string;
  public_url: string;
  alt_text: string | null;
  mime_type: string;
  size_bytes: number;
  width: number | null;
  height: number | null;
  bucket: string;
  uploaded_by: string | null;
  created_at: string;
};

const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/svg+xml',
  'image/gif',
  'application/pdf',
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const BUCKET_NAME = 'media';

/**
 * Uploads a file to Supabase Storage and registers it in media_assets.
 */
export async function uploadMedia(formData: FormData): Promise<{
  ok: boolean;
  data?: MediaAsset;
  error?: string;
}> {
  const auth = await requireAdmin();
  const file = formData.get('file') as File | null;

  if (!file) {
    return { ok: false, error: 'Nenhum arquivo selecionado.' };
  }

  // Validate mime type
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return {
      ok: false,
      error: `Tipo de arquivo não permitido: ${file.type}. Use: JPEG, PNG, WebP, SVG, GIF ou PDF.`,
    };
  }

  // Validate file size
  if (file.size > MAX_FILE_SIZE) {
    const sizeMB = (file.size / 1024 / 1024).toFixed(1);
    return {
      ok: false,
      error: `Arquivo muito grande (${sizeMB}MB). Tamanho máximo: 10MB.`,
    };
  }

  const supabase = createAdminClient();

  // Generate a unique file path: uploads/YYYY-MM/uuid-filename
  const now = new Date();
  const yearMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  const uniqueId = crypto.randomUUID().slice(0, 8);
  const sanitizedName = file.name
    .toLowerCase()
    .replace(/[^a-z0-9.\-_]/g, '-')
    .replace(/-+/g, '-');
  const filePath = `uploads/${yearMonth}/${uniqueId}-${sanitizedName}`;

  // Upload to Supabase Storage
  const arrayBuffer = await file.arrayBuffer();
  const { error: uploadError } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, arrayBuffer, {
      contentType: file.type,
      upsert: false,
    });

  if (uploadError) {
    console.error('[Media] Upload failed:', uploadError);
    return { ok: false, error: `Falha no upload: ${uploadError.message}` };
  }

  // Get public URL
  const { data: urlData } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(filePath);

  const publicUrl = urlData.publicUrl;

  // Register in media_assets table
  const altText = formData.get('alt_text') as string | null;

  const { data: asset, error: dbError } = await supabase
    .from('media_assets')
    .insert({
      file_name: file.name,
      file_path: filePath,
      public_url: publicUrl,
      alt_text: altText?.trim() || null,
      mime_type: file.type,
      size_bytes: file.size,
      bucket: BUCKET_NAME,
      uploaded_by: auth.id,
    })
    .select('*')
    .single();

  if (dbError || !asset) {
    console.error('[Media] DB insert failed:', dbError);
    // Try to clean up the uploaded file
    await supabase.storage.from(BUCKET_NAME).remove([filePath]);
    return { ok: false, error: 'Upload realizado, mas falha ao registrar no banco.' };
  }

  await createAuditLog({
    action: 'upload_media',
    entity_type: 'media_asset',
    entity_id: asset.id,
    details: { file_name: file.name, mime_type: file.type, size: file.size },
    user_id: auth.id,
  });

  revalidatePath('/admin/media');
  return { ok: true, data: asset as MediaAsset };
}

/**
 * Lists all media assets with optional filtering.
 */
export async function getMediaAssets(options?: {
  mimeFilter?: string;
  limit?: number;
  offset?: number;
}): Promise<MediaAsset[]> {
  await requireAdmin();
  const supabase = createAdminClient();

  let query = supabase
    .from('media_assets')
    .select('*')
    .order('created_at', { ascending: false });

  if (options?.mimeFilter) {
    query = query.like('mime_type', `${options.mimeFilter}%`);
  }

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  if (options?.offset) {
    query = query.range(options.offset, options.offset + (options.limit || 20) - 1);
  }

  const { data, error } = await query;

  if (error) {
    console.error('[Media] List failed:', error);
    return [];
  }

  return data as MediaAsset[];
}

/**
 * Updates the alt_text of a media asset.
 */
export async function updateMediaAltText(
  id: string,
  altText: string
): Promise<{ ok: boolean; error?: string }> {
  await requireAdmin();
  const supabase = createAdminClient();

  const { error } = await supabase
    .from('media_assets')
    .update({ alt_text: altText.trim() || null })
    .eq('id', id);

  if (error) {
    return { ok: false, error: error.message };
  }

  revalidatePath('/admin/media');
  return { ok: true };
}

/**
 * Deletes a media asset from both Storage and the database.
 */
export async function deleteMediaAsset(
  id: string
): Promise<{ ok: boolean; error?: string }> {
  const auth = await requireAdmin();
  const supabase = createAdminClient();

  // Get file path first
  const { data: asset, error: fetchError } = await supabase
    .from('media_assets')
    .select('file_path, file_name, bucket')
    .eq('id', id)
    .single();

  if (fetchError || !asset) {
    return { ok: false, error: 'Arquivo não encontrado.' };
  }

  // Delete from Storage
  const { error: storageError } = await supabase.storage
    .from(asset.bucket)
    .remove([asset.file_path]);

  if (storageError) {
    console.error('[Media] Storage delete failed:', storageError);
    // Continue to delete DB record anyway — orphaned storage is less harmful than orphaned DB rows
  }

  // Delete from database
  const { error: dbError } = await supabase
    .from('media_assets')
    .delete()
    .eq('id', id);

  if (dbError) {
    return { ok: false, error: dbError.message };
  }

  await createAuditLog({
    action: 'delete_media',
    entity_type: 'media_asset',
    entity_id: id,
    details: { file_name: asset.file_name },
    user_id: auth.id,
  });

  revalidatePath('/admin/media');
  return { ok: true };
}
