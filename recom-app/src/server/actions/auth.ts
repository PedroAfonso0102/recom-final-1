'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function mockLogin() {
  const cookieStore = await cookies()
  
  // Define o cookie de autenticação mock por 30 dias
  cookieStore.set('recom_mock_auth', 'true', {
    path: '/',
    maxAge: 30 * 24 * 60 * 60,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  })
  
  return { success: true }
}

export async function mockLogout() {
  const cookieStore = await cookies()
  cookieStore.delete('recom_mock_auth')
  return { success: true }
}
