import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

// Simulando um fetch temporário (como Leads ainda não tem um adapter mock)
async function getLeads() {
  return [
    {
      id: '1',
      name: 'João Silva',
      company: 'Indústria Metálica SA',
      status: 'new',
      email: 'joao@industriamet.com',
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'Maria Oliveira',
      company: 'Torno Expresso',
      status: 'contacted',
      email: 'maria@tornoexpresso.com.br',
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    }
  ];
}

export default async function AdminLeadsPage() {
  const leads = await getLeads();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Leads & Contatos</h1>
          <p className="text-slate-500">Acompanhe as oportunidades de negócio e contatos gerados pelo site.</p>
        </div>
      </div>

      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome / Empresa</TableHead>
              <TableHead>E-mail</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center text-slate-500">
                  Nenhum lead encontrado.
                </TableCell>
              </TableRow>
            ) : (
              leads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell>
                    <div className="font-medium">{lead.name}</div>
                    <div className="text-xs text-slate-500">{lead.company}</div>
                  </TableCell>
                  <TableCell className="text-slate-500">{lead.email}</TableCell>
                  <TableCell className="text-slate-500">{new Date(lead.createdAt).toLocaleDateString('pt-BR')}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      lead.status === 'new' ? 'bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-600/20' :
                      lead.status === 'qualified' ? 'bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20' :
                      lead.status === 'lost' ? 'bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/10' :
                      'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20'
                    }`}>
                      {lead.status === 'new' ? 'Novo' : 
                       lead.status === 'contacted' ? 'Contatado' : 
                       lead.status === 'qualified' ? 'Qualificado' : 'Perdido'}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
