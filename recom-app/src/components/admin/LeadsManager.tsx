"use client";

import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Calendar, 
  Mail, 
  Settings, 
  ChevronDown, 
  ChevronUp, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  User, 
  Building2, 
  Phone, 
  MessageSquare,
  ArrowRight,
  MoreVertical,
  Download,
  Send,
  AlertCircle,
  Clock3,
  History,
  LayoutDashboard,
  BellRing,
  Cpu,
  Zap,
  Target,
  Wrench,
  UserPlus,
  ShieldCheck,
  RefreshCw,
  Plus
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { RecomCard } from '@/design-system/components/recom-card';
import { RecomButton } from '@/design-system/components/recom-button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { 
  updateLeadStatus, 
  deleteLead, 
  updateAdminConfig, 
  processLeadBatch, 
  assignProcessToLead,
  addSalesRep,
  updateSalesRep,
  deleteSalesRep,
  updateRepAssignment
} from '@/server/actions/leads';
import { toast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Process {
  id: string;
  name: string;
  slug: string;
  short_description: string | null;
}

interface SalesRep {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  active: boolean;
  last_assigned_at: string | null;
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
}

interface LeadNotificationsConfig {
  enabled: boolean;
  emails: string[];
  frequency: 'instant' | 'daily' | 'weekly' | 'custom';
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
}

const statusOptions = [
  { value: 'new', label: 'Novo', icon: Clock, className: 'bg-primary/10 text-primary border-primary/20' },
  { value: 'contacted', label: 'Em Tratativa', icon: Send, className: 'bg-accent/10 text-accent border-accent/20' },
  { value: 'qualified', label: 'Qualificado', icon: CheckCircle2, className: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { value: 'lost', label: 'Encerrado', icon: Trash2, className: 'bg-slate-100 text-slate-500 border-slate-200' },
];

export function LeadsManager({ initialLeads, config: initialConfig, processes, initialSalesReps }: LeadsManagerProps) {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [salesReps, setSalesReps] = useState<SalesRep[]>(initialSalesReps);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [processFilter, setProcessFilter] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  
  // State para Novo Vendedor
  const [newRep, setNewRep] = useState({ name: '', email: '', phone: '' });
  const [isAddingRep, setIsAddingRep] = useState(false);

  const [config, setConfig] = useState<LeadNotificationsConfig>(initialConfig || {
    enabled: false,
    emails: [],
    frequency: 'daily',
    round_robin_enabled: true,
    auto_status_update: {
      enabled: true,
      target_status: 'contacted'
    },
    working_hours: {
      start: '08:00',
      end: '18:00',
      enabled: true
    },
    email_template: {
      subject_prefix: '[RECOM LEAD]',
      include_summary: true
    }
  });

  // Smart Match: Detectar Processo baseado na mensagem
  const detectProcess = (message: string | null) => {
    if (!message || !processes.length) return null;
    const msg = message.toLowerCase();
    
    const matches = processes.map(p => {
      let score = 0;
      const name = p.name.toLowerCase();
      const desc = (p.short_description || '').toLowerCase();
      
      if (msg.includes(name)) score += 10;
      if (name.includes('tornea') && msg.includes('torno')) score += 8;
      if (name.includes('fresa') && (msg.includes('fresa') || msg.includes('router'))) score += 8;
      if (name.includes('fura') && (msg.includes('furo') || msg.includes('broca'))) score += 8;
      
      const descWords = desc.split(' ');
      descWords.forEach(word => {
        if (word.length > 4 && msg.includes(word)) score += 2;
      });
      
      return { process: p, score };
    });
    
    const bestMatch = [...matches].sort((a, b) => b.score - a.score)[0];
    return bestMatch && bestMatch.score >= 5 ? bestMatch.process : null;
  };

  const filteredLeads = useMemo(() => {
    return leads.filter(lead => {
      const matchesSearch = 
        lead.name.toLowerCase().includes(search.toLowerCase()) || 
        lead.email.toLowerCase().includes(search.toLowerCase()) ||
        (lead.company?.toLowerCase() || '').includes(search.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
      const matchesProcess = processFilter === 'all' || lead.process_id === processFilter;
      
      return matchesSearch && matchesStatus && matchesProcess;
    });
  }, [leads, search, statusFilter, processFilter]);

  // Round Robin: Encontrar próximo vendedor ativo
  const nextRep = useMemo(() => {
    const activeReps = salesReps.filter(r => r.active);
    if (activeReps.length === 0) return null;
    
    return [...activeReps].sort((a, b) => {
      if (!a.last_assigned_at) return -1;
      if (!b.last_assigned_at) return 1;
      return new Date(a.last_assigned_at).getTime() - new Date(b.last_assigned_at).getTime();
    })[0];
  }, [salesReps]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const result = await updateLeadStatus(id, newStatus);
      if (result.success) {
        setLeads(prev => prev.map(l => l.id === id ? { ...l, status: newStatus } : l));
        toast({ title: "Status atualizado" });
      }
    } catch (e) {
      toast({ variant: "destructive", title: "Erro técnico" });
    }
  };

  const handleProcessAssign = async (leadId: string, processId: string | null) => {
    try {
      const result = await assignProcessToLead(leadId, processId);
      if (result.success) {
        setLeads(prev => prev.map(l => l.id === leadId ? { ...l, process_id: processId } : l));
        toast({ title: "Processo vinculado" });
      }
    } catch (e) {
      toast({ variant: "destructive", title: "Erro ao vincular processo" });
    }
  };

  const handleBatchSend = async () => {
    if (selectedIds.length === 0) return;
    if (config.round_robin_enabled && !nextRep) {
      toast({ variant: "destructive", title: "Nenhum vendedor ativo para o rodízio." });
      return;
    }
    
    const targetStatus = config.auto_status_update.enabled 
      ? config.auto_status_update.target_status 
      : 'contacted';

    try {
      const result = await processLeadBatch(selectedIds, targetStatus);
      if (result.success) {
        setLeads(prev => prev.map(l => 
          selectedIds.includes(l.id) 
            ? { ...l, status: targetStatus, notified_at: new Date().toISOString() } 
            : l
        ));
        
        if (config.round_robin_enabled && nextRep) {
          await updateRepAssignment(nextRep.id);
          setSalesReps(prev => prev.map(r => 
            r.id === nextRep.id ? { ...r, last_assigned_at: new Date().toISOString() } : r
          ));
        }

        setSelectedIds([]);
        toast({ 
          title: "Leads Enviados", 
          description: config.round_robin_enabled 
            ? `Encaminhados para ${nextRep?.name} (Rodízio Ativo)` 
            : "Encaminhados para lista geral." 
        });
      }
    } catch (e) {
      toast({ variant: "destructive", title: "Erro no processamento" });
    }
  };

  const handleAddRep = async () => {
    if (!newRep.name || !newRep.email) return;
    try {
      const result = await addSalesRep(newRep);
      if (result.success) {
        setSalesReps(prev => [...prev, { ...newRep, id: Math.random().toString(), active: true, last_assigned_at: null }]);
        setNewRep({ name: '', email: '', phone: '' });
        setIsAddingRep(false);
        toast({ title: "Vendedor adicionado" });
      }
    } catch (e) {
      toast({ variant: "destructive", title: "Erro ao cadastrar" });
    }
  };

  const handleToggleRep = async (id: string, active: boolean) => {
    try {
      const result = await updateSalesRep(id, { active });
      if (result.success) {
        setSalesReps(prev => prev.map(r => r.id === id ? { ...r, active } : r));
        toast({ title: active ? "Vendedor ativado" : "Vendedor desativado" });
      }
    } catch (e) {
      toast({ variant: "destructive", title: "Erro na atualização" });
    }
  };

  const handleDeleteRep = async (id: string) => {
    try {
      const result = await deleteSalesRep(id);
      if (result.success) {
        setSalesReps(prev => prev.filter(r => r.id !== id));
        toast({ title: "Vendedor removido" });
      }
    } catch (e) {
      toast({ variant: "destructive", title: "Erro ao remover" });
    }
  };

  const handleSaveConfig = async () => {
    try {
      const result = await updateAdminConfig('lead_notifications', config);
      if (result.success) {
        toast({ title: "Configurações atualizadas" });
      }
    } catch (e) {
      toast({ variant: "destructive", title: "Erro ao salvar" });
    }
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredLeads.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredLeads.map(l => l.id));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return (
    <Tabs defaultValue="pipeline" className="w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <TabsList className="bg-muted/50 p-1 rounded-xl h-auto self-start">
          <TabsTrigger value="pipeline" className="px-6 py-2.5 rounded-lg text-[10px] font-bold uppercase tracking-widest gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <LayoutDashboard className="h-3.5 w-3.5" /> Pipeline
          </TabsTrigger>
          <TabsTrigger value="reps" className="px-6 py-2.5 rounded-lg text-[10px] font-bold uppercase tracking-widest gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <User className="h-3.5 w-3.5" /> Time de Vendas
          </TabsTrigger>
          <TabsTrigger value="settings" className="px-6 py-2.5 rounded-lg text-[10px] font-bold uppercase tracking-widest gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <BellRing className="h-3.5 w-3.5" /> Notificações
          </TabsTrigger>
        </TabsList>

        <div className="flex items-center gap-2">
          {config.round_robin_enabled && nextRep && (
            <Badge variant="outline" className="h-10 px-4 bg-emerald-50 text-emerald-700 border-emerald-200 text-[9px] font-black uppercase tracking-widest gap-2">
              <RefreshCw className="h-3 w-3 animate-spin-slow" /> Próximo: {nextRep.name}
            </Badge>
          )}
          <RecomButton intent="outline" className="h-10 text-[10px] uppercase font-bold tracking-widest gap-2">
            <Download className="h-3 w-3" /> Exportar
          </RecomButton>
        </div>
      </div>

      {/* TABS CONTENT: PIPELINE */}
      <TabsContent value="pipeline" className="mt-0 space-y-6">
        {/* Batch Action Bar */}
        {selectedIds.length > 0 && (
          <div className="flex items-center justify-between bg-primary p-4 rounded-xl shadow-2xl animate-in slide-in-from-bottom-2">
            <div className="flex items-center gap-4 text-white">
              <Badge className="bg-white/10 text-white border-white/20">{selectedIds.length} Selecionados</Badge>
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">
                {config.round_robin_enabled ? `Encaminhar lote para ${nextRep?.name || '...'}` : 'Encaminhar lote selecionado'}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <RecomButton onClick={handleBatchSend} className="bg-white text-primary hover:bg-slate-50 h-10 px-6 text-[10px] font-black uppercase tracking-widest gap-2">
                <Send className="h-3.5 w-3.5" /> Confirmar Handoff
              </RecomButton>
              <RecomButton intent="ghost" className="text-white hover:bg-white/10 h-10 px-4 text-[10px] font-bold uppercase" onClick={() => setSelectedIds([])}>
                Cancelar
              </RecomButton>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Pesquisar por lead, empresa ou processo..." 
              className="pl-12 h-14 bg-white border-border shadow-sm rounded-xl focus:ring-2 focus:ring-primary/20"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-2 mr-4 border-r border-slate-200 pr-4">
              <Filter className="h-3.5 w-3.5 text-slate-400" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Processo:</span>
              <select className="bg-transparent text-[10px] font-black uppercase tracking-widest outline-none text-primary cursor-pointer" value={processFilter} onChange={(e) => setProcessFilter(e.target.value)}>
                <option value="all">Todos</option>
                {processes.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>
            {['all', ...statusOptions.map(o => o.value)].map((val) => {
              const opt = statusOptions.find(o => o.value === val);
              const label = opt ? opt.label : 'Todos';
              const count = val === 'all' ? leads.length : leads.filter(l => l.status === val).length;
              return (
                <button key={val} onClick={() => setStatusFilter(val)} className={cn("whitespace-nowrap px-4 py-2 rounded-lg text-[9px] font-bold uppercase tracking-widest border transition-all", statusFilter === val ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-500 border-border hover:border-slate-300")}>
                  {label} ({count})
                </button>
              );
            })}
          </div>
        </div>

        <RecomCard className="border-border overflow-hidden bg-white shadow-xl rounded-2xl">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow className="hover:bg-transparent border-none">
                <TableHead className="w-[50px] text-center">
                  <Checkbox checked={selectedIds.length === filteredLeads.length && filteredLeads.length > 0} onCheckedChange={toggleSelectAll} />
                </TableHead>
                <TableHead className="w-[40px]"></TableHead>
                <TableHead className="h-14 text-[10px] font-bold uppercase tracking-widest text-slate-400">Lead</TableHead>
                <TableHead className="h-14 text-[10px] font-bold uppercase tracking-widest text-slate-400">Processo Sugerido</TableHead>
                <TableHead className="h-14 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-center">Prioridade</TableHead>
                <TableHead className="h-14 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeads.map((lead) => {
                const isExpanded = expandedId === lead.id;
                const isSelected = selectedIds.includes(lead.id);
                const currentStatus = statusOptions.find(o => o.value === lead.status) || statusOptions[0];
                const linkedProcess = processes.find(p => p.id === lead.process_id);
                const suggestedProcess = !linkedProcess ? detectProcess(lead.message) : null;
                const priority = getPriority(lead.message);

                return (
                  <React.Fragment key={lead.id}>
                    <TableRow className={cn("border-border cursor-pointer transition-colors", isExpanded ? "bg-slate-50/80" : "hover:bg-slate-50/30", isSelected && "bg-primary/5")} onClick={() => setExpandedId(isExpanded ? null : lead.id)}>
                      <TableCell className="text-center" onClick={e => e.stopPropagation()}>
                        <Checkbox checked={isSelected} onCheckedChange={() => toggleSelect(lead.id)} />
                      </TableCell>
                      <TableCell>
                        {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </TableCell>
                      <TableCell className="py-5">
                        <div className="flex flex-col">
                          <span className="font-black text-xs uppercase tracking-tight">{lead.name}</span>
                          <span className="text-[9px] font-bold text-muted-foreground/60 uppercase">{lead.company || 'Pessoa Física'}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {linkedProcess ? (
                          <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 text-[9px] font-black uppercase py-1">
                            {linkedProcess.name}
                          </Badge>
                        ) : suggestedProcess ? (
                          <Badge variant="outline" className="bg-accent/5 text-accent border-accent/20 text-[9px] font-black uppercase py-1 animate-pulse">
                            Sugestão: {suggestedProcess.name}
                          </Badge>
                        ) : (
                          <span className="text-[9px] font-bold text-slate-300 uppercase">Não Identificado</span>
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className={cn("px-2 py-0.5 text-[8px] font-black uppercase border-none", priority.color)}>
                          {priority.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className={cn("inline-flex px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest", currentStatus.className)}>
                          {lead.notified_at && <CheckCircle2 className="h-3 w-3 mr-2" />}
                          {currentStatus.label}
                        </div>
                      </TableCell>
                    </TableRow>
                    {isExpanded && (
                      <TableRow className="bg-slate-50/80 border-none no-hover">
                        <TableCell colSpan={6} className="p-0">
                          <div className="px-16 py-8 flex flex-col gap-6 animate-in fade-in slide-in-from-top-2">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                              <div className="space-y-4">
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-primary">Mensagem do Lead</h4>
                                <div className="p-5 bg-white border border-slate-200 rounded-xl text-sm italic text-slate-600">
                                  &quot;{lead.message || 'Sem descrição técnica.'}&quot;
                                </div>
                                <div className="flex gap-3">
                                  <div className="flex-1 space-y-1">
                                    <label className="text-[9px] font-bold text-slate-400 uppercase">Vincular Processo Industrial:</label>
                                    <select className="w-full h-10 bg-white border border-slate-200 rounded-lg px-3 text-[10px] font-black uppercase outline-none focus:ring-1 focus:ring-primary" value={lead.process_id || ''} onChange={(e) => handleProcessAssign(lead.id, e.target.value || null)}>
                                      <option value="">Nenhum Processo</option>
                                      {processes.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                                    </select>
                                  </div>
                                  <div className="flex-1 space-y-1">
                                    <label className="text-[9px] font-bold text-slate-400 uppercase">Estágio do Pipeline:</label>
                                    <select className="w-full h-10 bg-white border border-slate-200 rounded-lg px-3 text-[10px] font-black uppercase outline-none focus:ring-1 focus:ring-primary" value={lead.status} onChange={(e) => handleStatusChange(lead.id, e.target.value)}>
                                      {statusOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                                    </select>
                                  </div>
                                </div>
                              </div>
                              <div className="space-y-4">
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-primary">Canais de Contato</h4>
                                <div className="grid grid-cols-2 gap-3">
                                  <RecomButton asChild intent="primary" className="h-14 gap-2">
                                    <a href={`mailto:${lead.email}`}><Mail className="h-4 w-4" /> Email</a>
                                  </RecomButton>
                                  {lead.phone && (
                                    <RecomButton asChild intent="outline" className="h-14 gap-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50">
                                      <a href={`https://wa.me/${lead.phone.replace(/\D/g, '')}`} target="_blank"><Phone className="h-4 w-4" /> WhatsApp</a>
                                    </RecomButton>
                                  )}
                                </div>
                                <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
                                  <div className="flex justify-between text-[9px] font-bold uppercase">
                                    <span className="text-slate-400">Recebido em:</span>
                                    <span>{new Date(lead.created_at).toLocaleString()}</span>
                                  </div>
                                  {lead.notified_at && (
                                    <div className="flex justify-between text-[9px] font-bold uppercase">
                                      <span className="text-slate-400">Handoff Sales:</span>
                                      <span className="text-emerald-600">{new Date(lead.notified_at).toLocaleString()}</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                );
              })}
            </TableBody>
          </Table>
        </RecomCard>
      </TabsContent>

      {/* TABS CONTENT: VENDEDORES (ROUND ROBIN) */}
      <TabsContent value="reps" className="mt-0 space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-2xl font-black uppercase tracking-tight text-primary">Time de Atendimento</h3>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Gerencie quem recebe os leads e o status do rodízio técnico.</p>
          </div>
          <RecomButton onClick={() => setIsAddingRep(true)} className="gap-2 text-[10px] uppercase font-black tracking-widest">
            <UserPlus className="h-4 w-4" /> Novo Vendedor
          </RecomButton>
        </div>

        {isAddingRep && (
          <RecomCard className="p-6 border-accent bg-accent/5 rounded-2xl animate-in slide-in-from-top-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase text-accent">Nome Completo</label>
                <Input value={newRep.name} onChange={e => setNewRep(prev => ({ ...prev, name: e.target.value }))} className="h-10 bg-white border-accent/20" placeholder="João Silva" />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase text-accent">E-mail Técnico</label>
                <Input value={newRep.email} onChange={e => setNewRep(prev => ({ ...prev, email: e.target.value }))} className="h-10 bg-white border-accent/20" placeholder="joao@recom.com.br" />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase text-accent">WhatsApp</label>
                <Input value={newRep.phone} onChange={e => setNewRep(prev => ({ ...prev, phone: e.target.value }))} className="h-10 bg-white border-accent/20" placeholder="11 99999-9999" />
              </div>
              <div className="flex gap-2">
                <RecomButton onClick={handleAddRep} className="flex-1 h-10 bg-accent hover:bg-accent/90 text-[10px] uppercase font-black">Salvar</RecomButton>
                <RecomButton onClick={() => setIsAddingRep(false)} intent="ghost" className="h-10 text-[10px] uppercase font-black">Cancelar</RecomButton>
              </div>
            </div>
          </RecomCard>
        )}

        <RecomCard className="border-border overflow-hidden bg-white shadow-xl rounded-2xl">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow className="hover:bg-transparent border-none">
                <TableHead className="h-14 text-[10px] font-bold uppercase tracking-widest text-slate-400">Vendedor</TableHead>
                <TableHead className="h-14 text-[10px] font-bold uppercase tracking-widest text-slate-400">Contato</TableHead>
                <TableHead className="h-14 text-[10px] font-bold uppercase tracking-widest text-slate-400">Último Recebido</TableHead>
                <TableHead className="h-14 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-center">Status</TableHead>
                <TableHead className="h-14 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {salesReps.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-64 text-center">
                    <p className="text-[10px] font-bold uppercase opacity-30">Nenhum vendedor cadastrado</p>
                  </TableCell>
                </TableRow>
              ) : (
                salesReps.map((rep) => (
                  <TableRow key={rep.id} className="border-border">
                    <TableCell className="py-5">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/5 rounded-lg text-primary">
                          <User className="h-4 w-4" />
                        </div>
                        <span className="font-black text-xs uppercase tracking-tight">{rep.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-mono text-slate-600">{rep.email}</span>
                        <span className="text-[9px] font-bold text-slate-400">{rep.phone || 'N/A'}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {rep.last_assigned_at ? (
                        <div className="flex flex-col">
                          <span className="text-[9px] font-bold uppercase">{new Date(rep.last_assigned_at).toLocaleDateString()}</span>
                          <span className="text-[9px] text-slate-400">{new Date(rep.last_assigned_at).toLocaleTimeString()}</span>
                        </div>
                      ) : (
                        <span className="text-[9px] font-bold text-slate-300 uppercase">Nenhum Lead</span>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      <button onClick={() => handleToggleRep(rep.id, !rep.active)}>
                        {rep.active ? (
                          <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[8px] font-black uppercase">Ativo no Rodízio</Badge>
                        ) : (
                          <Badge className="bg-slate-100 text-slate-400 border-slate-200 text-[8px] font-black uppercase">Indisponível</Badge>
                        )}
                      </button>
                    </TableCell>
                    <TableCell className="text-right">
                      <RecomButton intent="ghost" onClick={() => handleDeleteRep(rep.id)} className="text-destructive hover:bg-destructive/5 p-2 h-auto">
                        <Trash2 className="h-4 w-4" />
                      </RecomButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </RecomCard>
      </TabsContent>

      {/* TABS CONTENT: CONFIGURAÇÕES */}
      <TabsContent value="settings" className="mt-0 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <RecomCard className="p-8 border-border bg-white rounded-2xl space-y-8">
            <div className="space-y-2">
              <h3 className="text-xl font-black uppercase tracking-tight text-primary flex items-center gap-2">
                <ShieldCheck className="h-5 w-5" /> Regras de Distribuição
              </h3>
              <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest">Controle como os leads são distribuídos para o time.</p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between p-6 bg-slate-50 border border-slate-100 rounded-xl">
                <div className="space-y-1">
                  <h4 className="text-[10px] font-black uppercase tracking-widest">Round Robin Ativo</h4>
                  <p className="text-[8px] text-slate-400 font-bold uppercase">Garante distribuição equitativa entre vendedores ativos.</p>
                </div>
                <Checkbox checked={config.round_robin_enabled} onCheckedChange={checked => setConfig(prev => ({ ...prev, round_robin_enabled: !!checked }))} />
              </div>

              <div className="space-y-4 p-6 bg-primary/5 rounded-xl border border-primary/10">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-primary">Auto-Status Handoff</h4>
                    <p className="text-[8px] text-primary/60 font-bold uppercase">Mover status após o envio para o vendedor.</p>
                  </div>
                  <Checkbox checked={config.auto_status_update.enabled} onCheckedChange={checked => setConfig(prev => ({ ...prev, auto_status_update: { ...prev.auto_status_update, enabled: !!checked } }))} />
                </div>
                {config.auto_status_update.enabled && (
                  <select className="w-full h-10 bg-white border border-primary/20 rounded-lg px-3 text-[10px] font-black uppercase" value={config.auto_status_update.target_status} onChange={e => setConfig(prev => ({ ...prev, auto_status_update: { ...prev.auto_status_update, target_status: e.target.value } }))}>
                    {statusOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                  </select>
                )}
              </div>

              <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-700">Horário Comercial</h4>
                    <p className="text-[8px] text-slate-400 font-bold uppercase">Restringir notificações ao expediente técnico.</p>
                  </div>
                  <Checkbox checked={config.working_hours.enabled} onCheckedChange={checked => setConfig(prev => ({ ...prev, working_hours: { ...prev.working_hours, enabled: !!checked } }))} />
                </div>
                {config.working_hours.enabled && (
                  <div className="grid grid-cols-2 gap-3">
                    <Input type="time" className="h-9 text-[10px] font-bold" value={config.working_hours.start} onChange={e => setConfig(prev => ({ ...prev, working_hours: { ...prev.working_hours, start: e.target.value } }))} />
                    <Input type="time" className="h-9 text-[10px] font-bold" value={config.working_hours.end} onChange={e => setConfig(prev => ({ ...prev, working_hours: { ...prev.working_hours, end: e.target.value } }))} />
                  </div>
                )}
              </div>
            </div>
          </RecomCard>

          <RecomCard className="p-8 border-border bg-white rounded-2xl space-y-8">
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary border-b border-primary/10 pb-2 block">Célula Geral de Cópia</label>
              <div className="space-y-2">
                {config.emails.map((email, idx) => (
                  <div key={idx} className="flex gap-2">
                    <Input value={email} onChange={e => { const news = [...config.emails]; news[idx] = e.target.value; setConfig(prev => ({ ...prev, emails: news })); }} className="h-10 text-[10px] font-bold" />
                    <button onClick={() => setConfig(prev => ({ ...prev, emails: prev.emails.filter((_, i) => i !== idx) }))}><Trash2 className="h-3.5 w-3.5 text-slate-300" /></button>
                  </div>
                ))}
                <button onClick={() => setConfig(prev => ({ ...prev, emails: [...prev.emails, ''] }))} className="text-[9px] font-black uppercase text-primary pt-1 flex items-center gap-1.5"><Plus className="h-3 w-3" /> Adicionar Email de Cópia</button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary border-b border-primary/10 pb-2 block">Assunto das Notificações</label>
              <Input value={config.email_template.subject_prefix} onChange={e => setConfig(prev => ({ ...prev, email_template: { ...prev.email_template, subject_prefix: e.target.value } }))} className="h-10 font-mono text-[10px] font-bold" />
            </div>

            <div className="pt-6 flex justify-end">
              <RecomButton onClick={handleSaveConfig} className="h-12 px-8 gap-2 shadow-lg shadow-primary/20">
                <Settings className="h-4 w-4" /> Salvar Regras
              </RecomButton>
            </div>
          </RecomCard>
        </div>
      </TabsContent>
    </Tabs>
  );
}

const getPriority = (message: string | null) => {
  if (!message) return { label: 'Baixa', color: 'bg-slate-100 text-slate-500' };
  const msg = message.toLowerCase();
  
  if (msg.includes('parada') || msg.includes('urgente') || msg.includes('parado') || msg.includes('quebrou')) {
    return { label: 'Crítica', color: 'bg-red-50 text-red-700' };
  }
  
  if (msg.includes('cotação') || msg.includes('comprar') || msg.includes('preço') || msg.includes('orcamento')) {
    return { label: 'Alta', color: 'bg-amber-50 text-amber-700' };
  }
  
  return { label: 'Média', color: 'bg-slate-100 text-slate-500' };
};
