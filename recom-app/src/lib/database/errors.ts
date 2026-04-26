/**
 * Utility to handle PostgREST/Postgres errors and provide human-readable fix suggestions.
 */

export function formatDatabaseError(error: any): string {
  if (!error) return "Erro desconhecido no banco de dados.";

  const message = error.message || "";
  const code = error.code || "";

  // Postgres Error Code 42703: undefined_column
  if (code === '42703' || message.includes("column") && message.includes("not find")) {
    return `Erro de Schema: Coluna não encontrada no banco de dados. Tente rodar 'npx supabase migration up' no terminal para sincronizar o banco. Detalhe: ${message}`;
  }

  // Postgres Error Code 23505: unique_violation
  if (code === '23505') {
    return `Erro de Duplicação: Já existe um registro com este valor único (Slug/ID). Detalhe: ${message}`;
  }

  // Generic case
  return `Erro no banco de dados: ${message} (Código: ${code})`;
}
