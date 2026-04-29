import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "http://127.0.0.1:54321"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0"

const supabase = createClient(supabaseUrl, supabaseKey)

async function test() {
  console.log('Fetching page sections for fornecedores-catalogos...')
  const { data: page } = await supabase.from('pages').select('id').eq('slug', 'fornecedores-catalogos').single()
  if (!page) {
    console.error('Page not found')
    return
  }
  
  const { data: sections, error } = await supabase.from('page_sections').select('component_type, props').eq('page_id', page.id)
  if (error) {
    console.error('Error:', error)
  } else {
    sections?.forEach(s => {
      if (s.component_type === 'GridSection') {
        console.log('GridSection items:', s.props.items.map((i: any) => i.title))
      }
    })
  }
}

test()
