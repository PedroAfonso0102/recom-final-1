"use client";

import { useMemo, useState, useTransition, ReactNode } from "react";
import { Mail, MessageSquare, Phone, Send, UserCheck, History } from "lucide-react";

import { DataTable, EntityDrawer, StatusBadge } from "@/components/admin/admin-kit";
import { AdminEntityListPage } from "./editor/AdminEntityListPage";
import { Button } from "@/components/ui/button";
import { updateLeadStatus, assignProcessToLead, updateLeadNotes } from "@/server/actions/leads";
import { assignLeadToRep } from "@/server/actions/sales-reps";
import { cn } from "@/lib/utils";

interface Process {
  id: string;
  name: string;
  slug: string;
  short_description: string | null;
}

interface Supplier {
  id: string;
  name: string;
  catalogs?: unknown[];
  related_processes?: string[];
  catalog_url?: string | null;
}

interface SalesRep {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  status: "active" | "inactive";
  last_assigned_at: string | null;
  assignment_count: number;
}

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  message: string | null;
  status: string;
  created_at: string;
  notified_at: string | null;
  process_id: string | null;
  source_page?: string | null;
  assigned_rep_id?: string | null;
  notes?: string | null;
}

export interface LeadNotificationsConfig {
  enabled: boolean;
  emails: string[];
  frequency: "instant" | "daily" | "weekly" | "custom";
  round_robin_enabled: boolean;
  auto_status_update: {
    enabled: boolean;
    target_status: string;
  };
  working_hours: {
    start: string;
    end: string;
    enabled: boolean;
  };
  email_template: {
    subject_prefix: string;
    include_summary: boolean;
  };
}

interface LeadsManagerProps {
  initialLeads: Lead[];
  config: LeadNotificationsConfig | null;
  processes: Process[];
  initialSalesReps: SalesRep[];
  suppliers: Supplier[];
}

const statusOptions = [
  { value: "all", label: "Todos status" },
  { value: "new", label: "Novo" },
  { value: "contacted", label: "Em atendimento" },
  { value: "qualified", label: "Qualificado" },
  { value: "lost", label: "Perdido" },
];

const priorityOptions = [
  { value: "all", label: "Todas prioridades" },
  { value: "critical", label: "Critica" },
  { value: "high", label: "Alta" },
  { value: "normal", label: "Normal" },
];

function getPriority(lead: Lead) {
  const text = `${lead.message ?? ""} ${lead.source_page ?? ""}`.toLowerCase();
  if (text.includes("urgente") || text.includes("parada") || text.includes("emergencia")) return { key: "critical", label: "Critica" };
  if (text.includes("cotacao") || text.includes("orcamento") || text.includes("preco")) return { key: "high", label: "Alta" };
  return { key: "normal", label: "Normal" };
}

function getPeriodKey(date: string) {
  const created = new Date(date).getTime();
  const ageDays = (Date.now() - created) / (1000 * 60 * 60 * 24);
  if (ageDays <= 1) return "24h";
  if (ageDays <= 7) return "7d";
  return "old";
}

function detectedSupplier(lead: Lead, suppliers: Supplier[]) {
  const text = `${lead.message ?? ""} ${lead.source_page ?? ""}`.toLowerCase();
  return suppliers.find((supplier) => text.includes(supplier.name.toLowerCase())) ?? null;
}

export function LeadsManager({ initialLeads, processes, initialSalesReps, suppliers }: LeadsManagerProps) {
  const [leads, setLeads] = useState(initialLeads);
  const [priority, setPriority] = useState("all");
  const [supplier, setSupplier] = useState("all");
  const [process, setProcess] = useState("all");
  const [period, setPeriod] = useState("all");
  const [activeLeadId, setActiveLeadId] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const [isSavingNote, setIsSavingNote] = useState(false);
  const [isPending, startTransition] = useTransition();

  const reps = initialSalesReps.filter((rep) => rep.status === "active");
  const activeLead = leads.find((lead) => lead.id === activeLeadId) ?? null;

  function openLead(lead: Lead) {
    setActiveLeadId(lead.id);
    setNote(lead.notes || "");
  }

  const filtered = useMemo(() => {
    return leads.filter((lead) => {
      const priorityKey = getPriority(lead).key;
      const supplierMatch = detectedSupplier(lead, suppliers);
      
      return (
        (priority === "all" || priorityKey === priority) &&
        (supplier === "all" || supplierMatch?.id === supplier) &&
        (process === "all" || lead.process_id === process) &&
        (period === "all" || getPeriodKey(lead.created_at) === period)
      );
    });
  }, [leads, period, priority, process, supplier, suppliers]);

  const waitingCount = leads.filter((lead) => lead.status === "new" || !lead.notified_at).length;

  function setLeadStatus(id: string, nextStatus: string) {
    startTransition(async () => {
      const previous = leads;
      setLeads((current) => current.map((lead) => (lead.id === id ? { ...lead, status: nextStatus, notified_at: lead.notified_at ?? new Date().toISOString() } : lead)));
      const result = await updateLeadStatus(id, nextStatus);
      if (!result.success) setLeads(previous);
    });
  }

  function assignToRep(lead: Lead, repId: string) {
    startTransition(async () => {
      const previous = leads;
      setLeads((current) => current.map((item) => (item.id === lead.id ? { ...item, assigned_rep_id: repId, status: "contacted", notified_at: new Date().toISOString() } : item)));
      const result = await assignLeadToRep(lead.id, repId);
      if (!result.ok) setLeads(previous);
    });
  }

  function assignProcess(lead: Lead, processId: string) {
    startTransition(async () => {
      const previous = leads;
      setLeads((current) => current.map((item) => (item.id === lead.id ? { ...item, process_id: processId } : item)));
      const result = await assignProcessToLead(lead.id, processId === "none" ? null : processId);
      if (!result.success) setLeads(previous);
    });
  }

  function saveNote() {
    if (!activeLead) return;
    setIsSavingNote(true);
    startTransition(async () => {
      const result = await updateLeadNotes(activeLead.id, note);
      if (result.success) {
        setLeads((current) => current.map((item) => (item.id === activeLead.id ? { ...item, notes: note } : item)));
      }
      setIsSavingNote(false);
    });
  }

  const customFilters = (
    <>
      <select 
        className="h-10 px-4 rounded-xl border border-slate-200 bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" 
        value={priority} 
        onChange={(e) => setPriority(e.target.value)}
      >
        {priorityOptions.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
      </select>

      <select 
        className="h-10 px-4 rounded-xl border border-slate-200 bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" 
        value={supplier} 
        onChange={(e) => setSupplier(e.target.value)}
      >
        <option value="all">Todos fornecedores</option>
        {suppliers.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
      </select>

      <select 
        className="h-10 px-4 rounded-xl border border-slate-200 bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" 
        value={process} 
        onChange={(e) => setProcess(e.target.value)}
      >
        <option value="all">Todos processos</option>
        {processes.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
      </select>

      <select 
        className="h-10 px-4 rounded-xl border border-slate-200 bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" 
        value={period} 
        onChange={(e) => setPeriod(e.target.value)}
      >
        <option value="all">Qualquer periodo</option>
        <option value="24h">Ultimas 24h</option>
        <option value="7d">Ultimos 7 dias</option>
        <option value="old">Mais antigos</option>
      </select>
    </>
  );

  return (
    <>
      <AdminEntityListPage
        title="Gestão de Leads"
        description={`${waitingCount} leads aguardando resposta. Use E-mail ou WhatsApp para iniciar o atendimento.`}
        items={filtered}
        searchFields={['name', 'email', 'company', 'message']}
        statusField="status"
        statusOptions={statusOptions}
        customFilters={customFilters}
        columns={["Lead", "Prioridade", "Status", "Contexto", "Entrada", "Ações"]}
        renderItem={(lead) => {
          const priorityInfo = getPriority(lead);
          const supplierInfo = detectedSupplier(lead, suppliers);
          const processInfo = processes.find((item) => item.id === lead.process_id);

          return (
            <tr key={lead.id} className="group hover:bg-slate-50/80 transition-colors">
              <td className="px-6 py-5">
                <button 
                  onClick={() => openLead(lead)}
                  className="text-left group/btn"
                >
                  <span className="block text-sm font-bold text-slate-900 group-hover/btn:text-primary transition-colors">
                    {lead.name}
                  </span>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">
                    {lead.company || lead.email}
                  </span>
                </button>
              </td>
              <td className="px-6 py-5">
                <StatusBadge 
                  status={priorityInfo.key === "critical" ? "error" : priorityInfo.key === "high" ? "warning" : "archived"} 
                  label={priorityInfo.label} 
                />
              </td>
              <td className="px-6 py-5">
                <StatusBadge status={lead.status || "new"} />
              </td>
              <td className="px-6 py-5">
                <div className="space-y-1">
                  <span className="block text-xs font-bold text-slate-700">
                    {supplierInfo?.name ?? "Não identificado"}
                  </span>
                  <span className="block text-[10px] font-medium text-slate-400 italic">
                    {processInfo?.name ?? "Sem processo"}
                  </span>
                </div>
              </td>
              <td className="px-6 py-5">
                <span className="text-[11px] font-bold text-slate-500 tabular-nums">
                  {new Date(lead.created_at).toLocaleString("pt-BR", {
                    day: '2-digit',
                    month: '2-digit',
                    year: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </td>
              <td className="px-6 py-5">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openLead(lead)}
                    className="p-2.5 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-900 hover:text-white transition-all shadow-sm"
                    title="Abrir Detalhes"
                  >
                    <UserCheck className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setLeadStatus(lead.id, "contacted")}
                    disabled={isPending || lead.status === "contacted"}
                    className={cn(
                      "p-2.5 rounded-xl transition-all shadow-sm",
                      lead.status === "contacted"
                        ? "bg-emerald-50 text-emerald-600 cursor-default"
                        : "bg-primary/10 text-primary hover:bg-primary hover:text-white"
                    )}
                    title="Marcar como Respondido"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          );
        }}
      />

      <EntityDrawer 
        open={!!activeLead} 
        onClose={() => setActiveLeadId(null)} 
        title={activeLead?.name ?? "Lead"} 
        subtitle={activeLead?.company || activeLead?.email}
      >
        {activeLead ? (
          <div className="space-y-8 pb-10">
            <div className="flex flex-wrap gap-3 p-1">
              <Button asChild size="lg" className="rounded-2xl h-14 px-8 bg-primary shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                <a href={`mailto:${activeLead.email}?subject=Contato RECOM&body=Ola ${activeLead.name}, recebemos sua solicitacao.`}>
                  <Mail className="mr-2 h-4 w-4" /> Responder por E-mail
                </a>
              </Button>
              {activeLead.phone && (
                <Button asChild variant="outline" size="lg" className="rounded-2xl h-14 px-8 border-2 hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-700 transition-all">
                  <a href={`https://wa.me/${activeLead.phone.replace(/\D/g, "")}`} target="_blank" rel="noreferrer">
                    <Phone className="mr-2 h-4 w-4" /> WhatsApp
                  </a>
                </Button>
              )}
            </div>

            <div className="rounded-[2rem] border border-slate-100 bg-slate-50/50 p-8 space-y-6">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Dados do Lead</h3>
              <dl className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-1">
                  <dt className="text-[10px] font-black uppercase tracking-widest text-slate-400">Email</dt>
                  <dd className="text-sm font-bold text-slate-900">{activeLead.email}</dd>
                </div>
                <div className="space-y-1">
                  <dt className="text-[10px] font-black uppercase tracking-widest text-slate-400">Telefone</dt>
                  <dd className="text-sm font-bold text-slate-900">{activeLead.phone || "Não informado"}</dd>
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <dt className="text-[10px] font-black uppercase tracking-widest text-slate-400">Mensagem</dt>
                  <dd className="text-sm font-medium text-slate-600 leading-relaxed bg-white/50 p-4 rounded-2xl border border-white mt-2">
                    {activeLead.message || "Sem mensagem informada."}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
               <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Status do Pipeline</label>
                 <select 
                    className="w-full h-12 px-4 rounded-2xl border-2 border-slate-100 bg-white text-sm font-bold text-slate-900 focus:border-primary transition-all outline-none"
                    value={activeLead.status} 
                    onChange={(e) => setLeadStatus(activeLead.id, e.target.value)}
                 >
                   {statusOptions.filter(o => o.value !== 'all').map(o => (
                     <option key={o.value} value={o.value}>{o.label}</option>
                   ))}
                 </select>
               </div>
               <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Processo Relacionado</label>
                 <select 
                    className="w-full h-12 px-4 rounded-2xl border-2 border-slate-100 bg-white text-sm font-bold text-slate-900 focus:border-primary transition-all outline-none"
                    value={activeLead.process_id ?? "none"} 
                    onChange={(e) => assignProcess(activeLead, e.target.value)}
                 >
                   <option value="none">Sem processo</option>
                   {processes.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                 </select>
               </div>
            </div>

            <div className="space-y-4">
               <div className="flex items-center justify-between ml-1">
                 <h3 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-900">
                    <MessageSquare className="h-3.5 w-3.5 text-slate-400" /> Notas Internas
                 </h3>
                 {note !== (activeLead.notes || "") && (
                    <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">Alterações não salvas</span>
                 )}
               </div>
               <div className="relative group">
                 <textarea 
                    value={note} 
                    onChange={(e) => setNote(e.target.value)}
                    className="w-full min-h-[160px] p-6 rounded-[2rem] border-2 border-slate-100 bg-white text-sm font-medium text-slate-700 focus:border-primary transition-all outline-none resize-none"
                    placeholder="Registrar histórico do atendimento..."
                 />
                 <Button 
                    size="sm" 
                    onClick={saveNote} 
                    disabled={isSavingNote || isPending || note === (activeLead.notes || "")}
                    className="absolute bottom-4 right-4 rounded-xl px-6 font-bold uppercase tracking-widest text-[10px] shadow-lg"
                 >
                   {isSavingNote ? "Salvando..." : "Salvar Nota"}
                 </Button>
               </div>
            </div>

            <div className="rounded-[2rem] border border-slate-100 p-8 space-y-6">
               <h3 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-900">
                  <History className="h-3.5 w-3.5 text-slate-400" /> Histórico de Atividades
               </h3>
               <div className="relative space-y-8 before:absolute before:inset-y-0 before:left-[7px] before:w-0.5 before:bg-slate-100">
                  <div className="relative pl-8">
                    <div className="absolute left-0 top-1.5 h-4 w-4 rounded-full border-2 border-primary bg-white" />
                    <p className="text-xs font-bold text-slate-900">Lead Capturado</p>
                    <p className="text-[10px] font-medium text-slate-400 mt-0.5">
                      {new Date(activeLead.created_at).toLocaleString("pt-BR")} via {activeLead.source_page || 'Site'}
                    </p>
                  </div>
                  {activeLead.notified_at && (
                    <div className="relative pl-8">
                      <div className="absolute left-0 top-1.5 h-4 w-4 rounded-full border-2 border-emerald-500 bg-white" />
                      <p className="text-xs font-bold text-slate-900">Primeiro Atendimento</p>
                      <p className="text-[10px] font-medium text-slate-400 mt-0.5">
                        Registrado em {new Date(activeLead.notified_at).toLocaleString("pt-BR")}
                      </p>
                    </div>
                  )}
               </div>
            </div>
          </div>
        ) : null}
      </EntityDrawer>
    </>
  );
}

// ... (Helper functions getPriority, getPeriodKey, detectedSupplier remain same)
