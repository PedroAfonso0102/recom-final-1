// eslint-disable-next-line @typescript-eslint/no-require-imports
const { execSync } = require('child_process');

try {
  console.log('🔍 Verificando containers do Supabase...');
  const output = execSync('docker ps --format "{{.Names}}"').toString();
  
  const requiredContainers = ['supabase_db_recom-app', 'supabase_kong_recom-app'];
  const missing = requiredContainers.filter(name => !output.includes(name));

  if (missing.length > 0) {
    console.error('\n❌ ERRO: Alguns containers do Supabase não estão rodando:');
    missing.forEach(name => console.error(`   - ${name}`));
    console.error('\n💡 Dica: Rode "npx supabase start" para iniciar o ambiente local.\n');
    process.exit(1);
  }

  console.log('✅ Supabase está rodando!\n');
} catch (_error) {
  console.error('\n❌ ERRO: Não foi possível verificar o Docker. O Docker Desktop está ligado?');
  console.error('💡 Se o Docker estiver desligado, o banco de dados local não funcionará.\n');
  process.exit(1);
}
