'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { RecomButton } from '@/design-system/components/recom-button'
import { RecomCard } from '@/design-system/components/recom-card'
import { Lock, ShieldCheck, ArrowRight } from 'lucide-react'
import { mockLogin } from '@/server/actions/auth'

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()


  async function handleLogin() {
    setLoading(true)
    setError(null)
    
    try {
      // Como o login anônimo está desativado no Supabase do usuário,
      // usamos o mock auth baseado em cookies para permitir o desenvolvimento
      await mockLogin()
      
      router.push('/admin')
      router.refresh()
    } catch (_err) {
      setError('Ocorreu um erro inesperado.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <div className="bg-primary/10 p-4 rounded-2xl">
            <ShieldCheck className="h-12 w-12 text-primary" />
          </div>
        </div>

        <RecomCard className="p-8 border-none shadow-2xl shadow-primary/5">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-black uppercase tracking-tighter text-slate-900 mb-2">
              Acesso Restrito
            </h1>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">
              Painel Administrativo RECOM
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-destructive/5 border border-destructive/20 text-[10px] font-bold uppercase tracking-widest text-destructive text-center">
              {error}
            </div>
          )}

          <div className="space-y-6">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <div className="flex items-start gap-3">
                <Lock className="h-4 w-4 text-primary mt-0.5" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-700">Acesso Simplificado</p>
                  <p className="text-[9px] text-muted-foreground uppercase leading-tight mt-1">
                    Ambiente de desenvolvimento. O acesso é permitido apenas para edição do MVP.
                  </p>
                </div>
              </div>
            </div>

            <RecomButton 
              onClick={handleLogin}
              disabled={loading}
              className="w-full h-14 text-xs font-black uppercase tracking-[0.2em] group"
            >
              {loading ? (
                'Autenticando...'
              ) : (
                <span className="flex items-center gap-2">
                  Acessar Painel <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </RecomButton>
          </div>
        </RecomCard>

        <p className="text-center mt-8 text-[9px] font-bold uppercase tracking-[0.3em] text-muted-foreground/40">
          RECOM &copy; 2026 • Tecnologia Industrial
        </p>
      </div>
    </div>
  )
}
