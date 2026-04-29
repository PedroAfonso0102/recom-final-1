"use client";

import { useMemo, useState, useTransition } from "react";
import { Mail, MessageSquare, Phone, Send, UserCheck } from "lucide-react";

import { DataTable, EmptyState, EntityDrawer, FilterBar, StatusBadge, Toolbar } from "@/components/admin/admin-kit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableCell, TableRow } from "@/components/ui/table";
import { updateLeadStatus, assignProcessToLead, updateLeadNotes } from "@/server/actions/leads";
import { assignLeadToRep } from "@/server/actions/sales-reps";

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
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
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

  const filtered = useMemo(() => {
    return leads.filter((lead) => {
      const haystack = `${lead.name} ${lead.email} ${lead.company ?? ""} ${lead.message ?? ""}`.toLowerCase();
      const priorityKey = getPriority(lead).key;
      const supplierMatch = detectedSupplier(lead, suppliers);
      return (
        haystack.includes(search.toLowerCase()) &&
        (status === "all" || lead.status === status) &&
        (priority === "all" || priorityKey === priority) &&
        (supplier === "all" || supplierMatch?.id === supplier) &&
        (process === "all" || lead.process_id === process) &&
        (period === "all" || getPeriodKey(lead.created_at) === period)
      );
    });
  }, [leads, period, priority, process, search, status, supplier, suppliers]);

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

  // Update note local state when active lead changes
  useMemo(() => {
    if (activeLead) {
      setNote(activeLead.notes || "");
    }
  }, [activeLead?.id, activeLead?.notes]);

  return (
    <div className="space-y-4">
      <Toolbar>
        <div>
          <p className="text-sm font-semibold text-slate-950">{waitingCount} leads aguardando resposta</p>
          <p className="text-xs text-slate-600">Um lead pode ser respondido abrindo o detalhe e usando Email ou WhatsApp.</p>
        </div>
        <FilterBar search={search} onSearch={setSearch} placeholder="Buscar por nome, email, empresa ou mensagem">
          <select className="h-9 rounded-md border border-slate-300 bg-white px-2 text-sm" value={status} onChange={(event) => setStatus(event.target.value)}>
            {statusOptions.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
          </select>
          <select className="h-9 rounded-md border border-slate-300 bg-white px-2 text-sm" value={priority} onChange={(event) => setPriority(event.target.value)}>
            {priorityOptions.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
          </select>
          <select className="h-9 rounded-md border border-slate-300 bg-white px-2 text-sm" value={supplier} onChange={(event) => setSupplier(event.target.value)}>
            <option value="all">Todos fornecedores</option>
            {suppliers.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
          </select>
          <select className="h-9 rounded-md border border-slate-300 bg-white px-2 text-sm" value={process} onChange={(event) => setProcess(event.target.value)}>
            <option value="all">Todos processos</option>
            {processes.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
          </select>
          <select className="h-9 rounded-md border border-slate-300 bg-white px-2 text-sm" value={period} onChange={(event) => setPeriod(event.target.value)}>
            <option value="all">Qualquer periodo</option>
            <option value="24h">Ultimas 24h</option>
            <option value="7d">Ultimos 7 dias</option>
            <option value="old">Mais antigos</option>
          </select>
        </FilterBar>
      </Toolbar>

      {filtered.length === 0 ? (
        <EmptyState title="Nenhum lead encontrado" description="Ajuste os filtros ou limpe a busca. Proximo passo: verificar se os formularios publicos estao enviando dados." />
      ) : (
        <DataTable columns={["Lead", "Prioridade", "Status", "Fornecedor", "Processo", "Entrada", "Acoes"]}>
          {filtered.map((lead) => {
            const priorityInfo = getPriority(lead);
            const supplierInfo = detectedSupplier(lead, suppliers);
            const processInfo = processes.find((item) => item.id === lead.process_id);
            return (
              <TableRow key={lead.id} className="border-slate-100 hover:bg-slate-50">
                <TableCell>
                  <button className="text-left" onClick={() => setActiveLeadId(lead.id)}>
                    <span className="block font-semibold text-slate-950">{lead.name}</span>
                    <span className="block text-xs text-slate-600">{lead.company || lead.email}</span>
                  </button>
                </TableCell>
                <TableCell><StatusBadge status={priorityInfo.key === "critical" ? "error" : priorityInfo.key === "high" ? "warning" : "archived"} label={priorityInfo.label} /></TableCell>
                <TableCell><StatusBadge status={lead.status || "new"} /></TableCell>
                <TableCell className="text-sm text-slate-700">{supplierInfo?.name ?? "Nao identificado"}</TableCell>
                <TableCell className="text-sm text-slate-700">{processInfo?.name ?? "Sem processo"}</TableCell>
                <TableCell className="text-sm text-slate-600">{new Date(lead.created_at).toLocaleString("pt-BR")}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" variant="outline" onClick={() => setActiveLeadId(lead.id)}>Abrir detalhe</Button>
                    <Button size="sm" onClick={() => setLeadStatus(lead.id, "contacted")} disabled={isPending}>Marcar respondido</Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </DataTable>
      )}

      <EntityDrawer open={!!activeLead} onClose={() => setActiveLeadId(null)} title={activeLead?.name ?? "Lead"} subtitle={activeLead?.company || activeLead?.email}>
        {activeLead ? (
          <div className="space-y-6">
            <section className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <Button asChild size="sm">
                  <a href={`mailto:${activeLead.email}?subject=Contato RECOM&body=Ola ${activeLead.name}, recebemos sua solicitacao e vamos ajudar.`}>
                    <Mail className="h-4 w-4" /> Responder por email
                  </a>
                </Button>
                {activeLead.phone ? (
                  <Button asChild size="sm" variant="outline">
                    <a href={`https://wa.me/${activeLead.phone.replace(/\D/g, "")}`} target="_blank" rel="noreferrer">
                      <Phone className="h-4 w-4" /> Abrir WhatsApp
                    </a>
                  </Button>
                ) : null}
                <Button size="sm" variant="outline" onClick={() => setLeadStatus(activeLead.id, "contacted")} disabled={isPending}>
                  <Send className="h-4 w-4" /> Registrar resposta
                </Button>
              </div>
            </section>

            <section className="border border-slate-200 p-4">
              <h3 className="text-sm font-semibold text-slate-950">Resumo</h3>
              <dl className="mt-3 grid gap-3 text-sm">
                <div><dt className="text-xs font-semibold uppercase text-slate-500">Email</dt><dd>{activeLead.email}</dd></div>
                <div><dt className="text-xs font-semibold uppercase text-slate-500">Telefone</dt><dd>{activeLead.phone || "Nao informado"}</dd></div>
                <div><dt className="text-xs font-semibold uppercase text-slate-500">Origem</dt><dd>{activeLead.source_page || "Formulario do site"}</dd></div>
                <div><dt className="text-xs font-semibold uppercase text-slate-500">Mensagem</dt><dd className="leading-6 text-slate-700">{activeLead.message || "Sem mensagem"}</dd></div>
              </dl>
            </section>

            <section className="grid gap-3 md:grid-cols-2">
              <label className="space-y-1 text-sm font-medium">
                Status
                <select className="h-10 w-full rounded-md border border-slate-300 bg-white px-2 text-sm" value={activeLead.status} onChange={(event) => setLeadStatus(activeLead.id, event.target.value)}>
                  {statusOptions.filter((item) => item.value !== "all").map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
                </select>
              </label>
              <label className="space-y-1 text-sm font-medium">
                Processo
                <select className="h-10 w-full rounded-md border border-slate-300 bg-white px-2 text-sm" value={activeLead.process_id ?? "none"} onChange={(event) => assignProcess(activeLead, event.target.value)}>
                  <option value="none">Sem processo</option>
                  {processes.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
                </select>
              </label>
              <label className="space-y-1 text-sm font-medium md:col-span-2">
                Responsavel comercial
                <select className="h-10 w-full rounded-md border border-slate-300 bg-white px-2 text-sm" value={activeLead.assigned_rep_id ?? "none"} onChange={(event) => event.target.value !== "none" && assignToRep(activeLead, event.target.value)}>
                  <option value="none">Selecionar responsavel</option>
                  {reps.map((rep) => <option key={rep.id} value={rep.id}>{rep.name}</option>)}
                </select>
              </label>
            </section>

            <section className="border border-slate-200 p-4 rounded-xl">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-950"><MessageSquare className="h-4 w-4" /> Notas internas</h3>
              <textarea 
                value={note} 
                onChange={(event) => setNote(event.target.value)} 
                className="mt-3 min-h-24 w-full rounded-md border border-slate-300 p-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" 
                placeholder="Registrar contexto da conversa sem perder os dados do lead..." 
              />
              <div className="mt-3 flex justify-end">
                <Button size="sm" onClick={saveNote} disabled={isSavingNote || isPending || note === (activeLead.notes || "")}>
                  {isSavingNote ? "Salvando..." : "Salvar nota"}
                </Button>
              </div>
              <p className="mt-2 text-[10px] text-slate-400 font-medium">As notas são salvas no banco de dados para consulta futura de qualquer administrador.</p>
            </section>

            <section className="border border-slate-200 p-4">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-950"><UserCheck className="h-4 w-4" /> Historico</h3>
              <ol className="mt-3 space-y-2 text-sm text-slate-700">
                <li>Lead criado em {new Date(activeLead.created_at).toLocaleString("pt-BR")}.</li>
                {activeLead.notified_at ? <li>Resposta ou encaminhamento registrado em {new Date(activeLead.notified_at).toLocaleString("pt-BR")}.</li> : <li>Aguardando primeira resposta.</li>}
              </ol>
            </section>
          </div>
        ) : null}
      </EntityDrawer>
    </div>
  );
}
