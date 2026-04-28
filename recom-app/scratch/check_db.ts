
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "http://127.0.0.1:54321"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0"

const supabase = createClient(supabaseUrl, supabaseKey)

async function checkData() {
  console.log('--- PAGES ---')
  const { data: pages, error: pagesError } = await supabase.from('pages').select('*')
  if (pagesError) console.error('Error fetching pages:', pagesError)
  else console.table(pages.map(p => ({ id: p.id, slug: p.slug, title: p.title, status: p.status })))

  console.log('\n--- SECTIONS ---')
  const { data: sections, error: sectionsError } = await supabase.from('page_sections').select('*')
  if (sectionsError) console.error('Error fetching sections:', sectionsError)
  else {
    console.table(sections.map(s => ({ 
      id: s.id, 
      page_id: s.page_id, 
      type: s.type, 
      status: s.status, 
      sort_order: s.sort_order 
    })))
  }
}

checkData()
