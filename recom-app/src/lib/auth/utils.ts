import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function requireAuth() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get('recom_mock_auth');

  if (!authCookie || authCookie.value !== 'true') {
    redirect('/login');
  }
}
