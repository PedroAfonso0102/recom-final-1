
const { createAdminClient } = require('./src/lib/supabase/admin');
async function check() {
  const supabase = createAdminClient();
  const { data, error } = await supabase.from('suppliers').select('id, name, slug, updated_at, short_description').eq('slug', 'kifix').maybeSingle();
  console.log('---DB_CHECK_RESULT---');
  console.log(JSON.stringify({ data, error }, null, 2));
  console.log('---END_DB_CHECK_RESULT---');
}
check().catch(err => {
  console.error(err);
  process.exit(1);
});
