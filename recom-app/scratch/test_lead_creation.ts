
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "http://127.0.0.1:54321"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0"

const supabase = createClient(supabaseUrl, supabaseKey)

async function testLeadCreation() {
  console.log('Attempting to create a lead as anon...')
  const leadData = {
    name: 'QA Test Lead',
    company: 'QA Corp',
    email: 'qa@test.com',
    phone: '11999999999',
    message: 'Testing lead creation via RLS hardening verification.',
    source_type: 'contact',
    status: 'new'
  }

  const { data, error } = await supabase.from('leads').insert(leadData)

  if (error) {
    console.error('[FAIL] Error creating lead:', error)
  } else {
    console.log('[OK] Lead created successfully (probably, no error returned).')
    
    // Check if we can find it via direct DB query to confirm
  }
}

testLeadCreation()
