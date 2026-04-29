import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { createAuditLog } from '@/lib/audit';

export type AuthContext = {
  id: string;
  email: string | null;
  role: "admin" | "editor" | "user";
  isMock: boolean;
};

export async function getCurrentAuthContext(): Promise<AuthContext | null> {
  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();

    if (data.user) {
      return {
        id: data.user.id,
        email: data.user.email ?? null,
        role: (data.user.app_metadata?.role as "admin" | "editor" | "user") ?? "user",
        isMock: false,
      };
    }
  } catch (error) {
    console.error("Falha ao ler sessão Supabase:", error);
  }

  const cookieStore = await cookies();
  const authCookie = cookieStore.get('recom_mock_auth');

  if (process.env.NODE_ENV !== "production" && authCookie?.value === "true") {
    return {
      id: "00000000-0000-0000-0000-000000000001",
      email: "dev@recom.local",
      role: "admin",
      isMock: true,
    };
  }

  return null;
}

export async function requireAuth() {
  const authContext = await getCurrentAuthContext();

  if (!authContext) {
    redirect('/login');
  }

  return authContext;
}

export async function requireAdmin() {
  const authContext = await requireAuth();

  if (authContext.role !== "admin") {
    await createAuditLog({
      action: "auth.denied",
      entity_type: "auth",
      entity_id: authContext.id,
      actor_id: authContext.id,
      metadata: { role: authContext.role },
    });
    redirect('/unauthorized'); // Ou lance um erro apropriado para Server Actions
  }

  return authContext;
}
