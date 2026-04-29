
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "http://127.0.0.1:54321"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0"

const supabase = createClient(supabaseUrl, supabaseKey)

async function checkData() {
  console.log('--- PAGES ---')
  const { data: pages, error: pagesError } = await supabase.from('pages').select('*')
  if (pagesError) console.error('Error fetching pages:', pagesError)
  else {
    console.table(pages.map(p => ({ id: p.id, slug: p.slug, title: p.title, status: p.status, type: p.page_type })))
    const drafts = pages.filter(p => p.status !== 'published')
    console.log(`Found ${drafts.length} non-published pages accessible to anon.`)
  }

  console.log('\n--- SECTIONS ---')
  const { data: sections, error: sectionsError } = await supabase.from('page_sections').select('*')
  if (sectionsError) console.error('Error fetching sections:', sectionsError)
  else {
    const drafts = sections.filter(s => s.status !== 'published')
    console.log(`Found ${drafts.length} non-published sections accessible to anon.`)
    if (drafts.length > 0) {
      console.log('Sample non-published sections:')
      console.table(drafts.slice(0, 5).map(s => ({ id: s.id, status: s.status })))
    }
  }

  console.log('\n--- PROCESSES ---')
  const { data: processes, error: procError } = await supabase.from('processes').select('*')
  if (procError) console.error('Error fetching processes:', procError)
  else {
    const drafts = processes.filter(p => p.status !== 'published' && p.status !== 'active')
    console.log(`Found ${drafts.length} non-published processes accessible to anon.`)
  }

  console.log('\n--- SUPPLIERS ---')
  const { data: suppliers, error: suppError } = await supabase.from('suppliers').select('*')
  if (suppError) console.error('Error fetching suppliers:', suppError)
  else {
    const drafts = suppliers.filter(s => s.status !== 'published' && s.status !== 'active')
    console.log(`Found ${drafts.length} non-published suppliers accessible to anon.`)
  }

  console.log('\n--- PROMOTIONS ---')
  const { data: promos, error: promoError } = await supabase.from('promotions').select('*')
  if (promoError) console.error('Error fetching promotions:', promoError)
  else {
    const drafts = promos.filter(p => p.status !== 'published' && p.status !== 'active')
    console.log(`Found ${drafts.length} non-published promotions accessible to anon.`)
  }

  console.log('\n--- RESTRICTED TABLES ---')
  const restrictedTables = ['leads', 'audit_logs', 'cms_revisions', 'profiles', 'admin_profiles', 'admin_configs']
  for (const table of restrictedTables) {
    const { data, error } = await supabase.from(table).select('*')
    if (error) {
      console.log(`[OK] Access to ${table} blocked: ${error.message}`)
    } else {
      if (data.length > 0) {
        console.log(`[FAIL] Access to ${table} leaked! Found ${data.length} rows.`)
      } else {
        console.log(`[OK] Access to ${table} restricted (0 rows returned for anon).`)
      }
    }
  }
}

checkData()
