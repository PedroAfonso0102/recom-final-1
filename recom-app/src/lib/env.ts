import { z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url("NEXT_PUBLIC_SUPABASE_URL deve ser uma URL válida."),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1, "NEXT_PUBLIC_SUPABASE_ANON_KEY é obrigatória."),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),
  SUPABASE_JWT_SECRET: z.string().optional(),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

const _env = envSchema.safeParse({
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  SUPABASE_JWT_SECRET: process.env.SUPABASE_JWT_SECRET,
  NODE_ENV: process.env.NODE_ENV,
});

if (!_env.success) {
  console.error('❌ Erro de configuração: Variáveis de ambiente inválidas:');
  console.error(JSON.stringify(_env.error.format(), null, 2));
  
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Variáveis de ambiente inválidas detectadas em produção.');
  } else {
    console.warn('⚠️ Continuando em desenvolvimento, mas o app pode falhar.');
  }
}

export const env = _env.success ? _env.data : {} as z.infer<typeof envSchema>;
