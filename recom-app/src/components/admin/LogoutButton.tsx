'use client'

import React from 'react'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { mockLogout } from '@/server/actions/auth'

export function LogoutButton() {
  const router = useRouter()


  async function handleLogout() {
    await mockLogout()
    router.push('/login')
    router.refresh()
  }

  return (
    <button 
      onClick={handleLogout}
      className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-xs font-bold uppercase tracking-widest text-primary-foreground/70 transition-all hover:bg-white/10 hover:text-white"
    >
      <LogOut className="h-4 w-4" />
      Sair do Painel
    </button>
  )
}
