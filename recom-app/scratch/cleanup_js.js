const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = "http://127.0.0.1:54321"
const serviceKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.8mI_QG_XQvW2l_T6v_r1_R1_R1_R1_R1_R1_R1_R1_R1_R1_R1_R1"

const supabase = createClient(supabaseUrl, serviceKey)

async function test() {
  console.log('Cleaning up GridSection items...')
  
  const { data: pages } = await supabase.from('pages').select('id, slug')
  const catalogPage = pages.find(p => p.slug === 'fornecedores-catalogos')
  if (!catalogPage) {
    console.error('Page not found')
    return
  }
  
  const { data: sections } = await supabase.from('page_sections').select('id, props').eq('page_id', catalogPage.id).eq('component_type', 'GridSection')
  
  for (const s of (sections || [])) {
    const newItems = s.props.items.filter(i => i.title !== 'Kifix')
    if (newItems.length !== s.props.items.length) {
      console.log(`Removing Kifix from section ${s.id}`)
      await supabase.from('page_sections').update({ props: { ...s.props, items: newItems } }).eq('id', s.id)
    }
  }
  console.log('Cleanup done.')
}

test()
