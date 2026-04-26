const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../recom-app/.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing env vars');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkKifix() {
  const { data, error } = await supabase
    .from('suppliers')
    .select('*')
    .eq('slug', 'kifix')
    .single();

  if (error) {
    console.error('Error fetching Kifix:', error);
  } else {
    console.log('Kifix record:', JSON.stringify(data, null, 2));
  }
}

checkKifix();
