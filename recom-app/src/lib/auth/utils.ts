import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export type AuthContext = {
  id: string;
  email: string | null;
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
