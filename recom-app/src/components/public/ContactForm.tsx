'use client';

import { useState } from 'react';
import { RecomButton } from '@/design-system/components/recom-button';
import { submitContactForm } from '@/lib/actions/lead-actions';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('loading');
    
    const formData = new FormData(event.currentTarget);
    const result = await submitContactForm(formData);

    if (result.success) {
      setStatus('success');
      (event.target as HTMLFormElement).reset();
    } else {
      setStatus('error');
      setErrorMessage(result.error || 'Ocorreu um erro ao enviar sua mensagem.');
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-recom-gray-50 border border-recom-border rounded-lg p-12 text-center space-y-6 animate-in fade-in zoom-in duration-500">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-recom-graphite uppercase tracking-tight">Solicitação Enviada!</h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          Obrigado pelo contato. Nossa equipe comercial analisará sua solicitação e entrará em contato em breve.
        </p>
        <RecomButton 
          onClick={() => setStatus('idle')} 
          intent="outline" 
          className="mt-4"
        >
          Enviar Outra Mensagem
        </RecomButton>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
      <input type="hidden" name="sourcePage" value={typeof window !== 'undefined' ? window.location.pathname : ''} />
      
      <div className="space-y-3">
        <label htmlFor="name" className="text-[11px] font-bold uppercase tracking-[0.1em] text-slate-500">Nome do Contato *</label>
        <input 
          type="text" 
          id="name" 
          name="name"
          required 
          placeholder="Nome completo" 
          className="flex h-12 w-full rounded-md border border-recom-border bg-recom-gray-50/50 px-4 py-2 text-[15px] focus:bg-white focus:border-recom-blue outline-none transition-all disabled:opacity-50" 
          disabled={status === 'loading'}
        />
      </div>
      <div className="space-y-3">
        <label htmlFor="company" className="text-[11px] font-bold uppercase tracking-[0.1em] text-slate-500">Razão Social / Empresa *</label>
        <input 
          type="text" 
          id="company" 
          name="company"
          required 
          placeholder="Nome da sua indústria" 
          className="flex h-12 w-full rounded-md border border-recom-border bg-recom-gray-50/50 px-4 py-2 text-[15px] focus:bg-white focus:border-recom-blue outline-none transition-all disabled:opacity-50" 
          disabled={status === 'loading'}
        />
      </div>

      <div className="space-y-3">
        <label htmlFor="email" className="text-[11px] font-bold uppercase tracking-[0.1em] text-slate-500">E-mail Corporativo *</label>
        <input 
          type="email" 
          id="email" 
          name="email"
          required 
          placeholder="exemplo@empresa.com.br" 
          className="flex h-12 w-full rounded-md border border-recom-border bg-recom-gray-50/50 px-4 py-2 text-[15px] focus:bg-white focus:border-recom-blue outline-none transition-all disabled:opacity-50" 
          disabled={status === 'loading'}
        />
      </div>
      <div className="space-y-3">
        <label htmlFor="phone" className="text-[11px] font-bold uppercase tracking-[0.1em] text-slate-500">Telefone / WhatsApp *</label>
        <input 
          type="tel" 
          id="phone" 
          name="phone"
          required 
          placeholder="(19) 00000-0000" 
          className="flex h-12 w-full rounded-md border border-recom-border bg-recom-gray-50/50 px-4 py-2 text-[15px] focus:bg-white focus:border-recom-blue outline-none transition-all disabled:opacity-50" 
          disabled={status === 'loading'}
        />
      </div>

      <div className="col-span-full space-y-3">
        <label htmlFor="interest" className="text-[11px] font-bold uppercase tracking-[0.1em] text-slate-500">Assunto Principal</label>
        <select 
          id="interest" 
          name="interest"
          className="flex h-12 w-full rounded-md border border-recom-border bg-recom-gray-50/50 px-4 py-2 text-[15px] focus:bg-white focus:border-recom-blue outline-none transition-all appearance-none disabled:opacity-50"
          disabled={status === 'loading'}
        >
          <option value="orcamento">Solicitar Orçamento</option>
          <option value="visita">Agendar Visita Técnica</option>
          <option value="catalogo">Dúvida sobre Catálogo</option>
          <option value="outros">Outros Assuntos</option>
        </select>
      </div>

      <div className="col-span-full space-y-3">
        <label htmlFor="message" className="text-[11px] font-bold uppercase tracking-[0.1em] text-slate-500">Mensagem</label>
        <textarea 
          id="message" 
          name="message"
          rows={4} 
          placeholder="Informe código, medida, aplicação, marca desejada ou qualquer detalhe útil para o orçamento."
          className="flex min-h-[120px] w-full rounded-md border border-recom-border bg-recom-gray-50/50 px-4 py-3 text-[15px] focus:bg-white focus:border-recom-blue outline-none transition-all disabled:opacity-50"
          disabled={status === 'loading'}
        ></textarea>
      </div>

      {status === 'error' && (
        <div className="col-span-full flex items-center gap-3 p-4 bg-red-50 border border-red-100 text-red-600 rounded-md text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p>{errorMessage}</p>
        </div>
      )}

      <div className="col-span-full pt-4">
        <RecomButton 
          type="submit" 
          size="lg" 
          className="w-full h-12 text-[12px] uppercase tracking-[0.2em] font-bold"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Processando...
            </>
          ) : 'Enviar Solicitação Industrial'}
        </RecomButton>
        <p className="text-[10px] text-slate-400 text-center mt-6 uppercase tracking-widest font-bold">
          Atendimento Comercial: Segunda a Sexta, 08:00 às 18:00
        </p>
      </div>
    </form>
  );
}
