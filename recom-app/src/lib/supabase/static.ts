import { createClient as createSupabaseClient } from '@supabase/supabase-js'

/**
 * Client Supabase para contextos sem HTTP request (ex: generateStaticParams, build).
 * NÃO usa cookies — somente para leituras públicas.
 */
export function createStaticClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false } }
  )
}
