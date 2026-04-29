import { getSuppliers } from './src/lib/services/supabase-data'

async function test() {
  console.log('Running getSuppliers()...')
  const suppliers = await getSuppliers()
  console.log('Total suppliers:', suppliers.length)
  console.table(suppliers.map(s => ({ name: s.name, slug: s.slug, status: s.status })))
}

test()
