import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "http://127.0.0.1:54321"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0"

const supabase = createClient(supabaseUrl, supabaseKey)

async function test() {
  console.log('Checking pages...')
  const { data: pages } = await supabase.from('pages').select('id, slug, is_system, status')
  console.table(pages)
}

test()
