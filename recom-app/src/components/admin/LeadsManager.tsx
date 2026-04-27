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
  Plus,
  DollarSign,
  TrendingUp,
  ExternalLink,
  FileText,
  XCircle,
  PieChart,
  Loader2
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
  updateLeadFeedback
} from '@/server/actions/leads';
import {
  getSalesReps,
  createSalesRep,
  updateSalesRep,
  deleteSalesRep,
  toggleSalesRepStatus,
  assignLeadToRep,
  getNextRepForAssignment
} from '@/server/actions/sales-reps';

import { toast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Process {
  id: string;
  name: string;
  slug: string;
  short_description: string | null;
}

interface Supplier {
  id: string;
  name: string;
  catalogs?: any[];
  related_processes?: string[];
}

interface SalesRep {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  status: 'active' | 'inactive';
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
  revenue_value?: number;
  loss_reason?: string | null;
  closed_at?: string | null;
  assigned_rep_id?: string | null;
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
  suppliers: Supplier[];
}

const statusOptions = [
  { value: 'new', label: 'Novo', icon: Clock, className: 'bg-primary/10 text-primary border-primary/20' },
  { value: 'contacted', label: 'Em Tratativa', icon: Send, className: 'bg-accent/10 text-accent border-accent/20' },
  { value: 'qualified', label: 'Qualificado / Venda', icon: CheckCircle2, className: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { value: 'lost', label: 'Perdido', icon: XCircle, className: 'bg-rose-50 text-rose-700 border-rose-200' },
];

export function LeadsManager({ initialLeads, config: initialConfig, processes, initialSalesReps, suppliers }: LeadsManagerProps) {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [salesReps, setSalesReps] = useState<SalesRep[]>(initialSalesReps);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [processFilter, setProcessFilter] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  
  // Feedback states
  const [feedbackData, setFeedbackData] = useState<{ revenue?: number, loss_reason?: string }>({});
  const [isSavingFeedback, setIsSavingFeedback] = useState(false);

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

  const stats = useMemo(() => {
    const totalRevenue = leads.reduce((acc, curr) => acc + (Number(curr.revenue_value) || 0), 0);
    const conversionRate = leads.length > 0 ? (leads.filter(l => l.status === 'qualified').length / leads.length) * 100 : 0;
    return { totalRevenue, conversionRate };
  }, [leads]);

  const nextRep = useMemo(() => {
    const activeReps = salesReps.filter(r => r.status === 'active');
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

  const handleSaveFeedback = async (id: string) => {
    setIsSavingFeedback(true);
    try {
      const result = await updateLeadFeedback(id, {
        revenue_value: feedbackData.revenue,
        loss_reason: feedbackData.loss_reason,
        closed_at: new Date().toISOString()
      });
      if (result.success) {
        setLeads(prev => prev.map(l => l.id === id ? { 
          ...l, 
          revenue_value: feedbackData.revenue, 
          loss_reason: feedbackData.loss_reason,
          closed_at: new Date().toISOString()
        } : l));
        setFeedbackData({});
        toast({ title: "Resultados salvos com sucesso" });
      }
    } catch (e) {
      toast({ variant: "destructive", title: "Erro ao salvar feedback" });
    } finally {
      setIsSavingFeedback(false);
    }
  };

  const handleAddRep = async () => {
    if (!newRep.name || !newRep.email) return;
    try {
      const result = await createSalesRep({ ...newRep, status: 'active' });
      if (result.ok) {
        // Optimistic update
        setSalesReps(prev => [...prev, { 
          ...newRep, 
          id: Math.random().toString(), 
          status: 'active', 
          last_assigned_at: null,
          assignment_count: 0
        } as SalesRep]);
        setNewRep({ name: '', email: '', phone: '' });
        setIsAddingRep(false);
        toast({ title: "Vendedor cadastrado com sucesso" });
      }
    } catch (e) {
      toast({ variant: "destructive", title: "Erro ao cadastrar vendedor" });
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
      toast({ variant: "destructive", title: "Erro ao vincular" });
    }
  };

  const handleBatchSend = async () => {
    if (selectedIds.length === 0) return;
    if (config.round_robin_enabled && !nextRep) {
      toast({ variant: "destructive", title: "Sem vendedores ativos para o rodízio." });
      return;
    }
    
    try {
      if (config.round_robin_enabled && nextRep) {
        // For batch assignment in round robin, we ideally assign one by one or all to the current next rep.
        // For simplicity and since it's a "batch", we'll assign the whole batch to the current next rep 
        // OR we could loop. Let's assign the batch to the next rep and update their stats once.
        
        for (const leadId of selectedIds) {
          await assignLeadToRep(leadId, nextRep.id);
        }
        
        setLeads(prev => prev.map(l => selectedIds.includes(l.id) ? { 
          ...l, 
          status: 'em_tratativa', 
          assigned_rep_id: nextRep.id,
          notified_at: new Date().toISOString() 
        } : l));
        
        setSalesReps(prev => prev.map(r => r.id === nextRep.id ? { 
          ...r, 
          last_assigned_at: new Date().toISOString(),
          assignment_count: r.assignment_count + selectedIds.length
        } : r));
        
        setSelectedIds([]);
        toast({ title: `Lote encaminhado para ${nextRep.name}` });
      } else {
        // Manual batch update without assignment
        const targetStatus = config.auto_status_update.enabled ? config.auto_status_update.target_status : 'contacted';
        const result = await processLeadBatch(selectedIds, targetStatus);
        if (result.success) {
          setLeads(prev => prev.map(l => selectedIds.includes(l.id) ? { ...l, status: targetStatus, notified_at: new Date().toISOString() } : l));
          setSelectedIds([]);
          toast({ title: "Handoff concluído com sucesso" });
        }
      }
    } catch (e) {
      toast({ variant: "destructive", title: "Erro no processamento" });
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

  const detectProcess = (message: string | null) => {
    if (!message) return null;
    const msg = message.toLowerCase();
    const matches = processes.map(p => {
      let score = 0;
      const name = p.name.toLowerCase();
      if (msg.includes(name)) score += 10;
      if (name.includes('tornea') && msg.includes('torno')) score += 8;
      if (name.includes('fresa') && (msg.includes('fresa') || msg.includes('router'))) score += 8;
      return { process: p, score };
    });
    const bestMatch = [...matches].sort((a, b) => b.score - a.score)[0];
    return bestMatch && bestMatch.score >= 5 ? bestMatch.process : null;
  };

  const getPriority = (message: string | null) => {
    if (!message) return { label: 'Baixa', color: 'bg-slate-100 text-slate-500' };
    const msg = message.toLowerCase();
    if (msg.includes('parada') || msg.includes('urgente')) return { label: 'Crítica', color: 'bg-rose-50 text-rose-700' };
    if (msg.includes('cotação') || msg.includes('preço')) return { label: 'Alta', color: 'bg-amber-50 text-amber-700' };
    return { label: 'Média', color: 'bg-slate-100 text-slate-500' };
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

        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-[9px] font-black uppercase text-muted-foreground tracking-widest">Receita Gerada</p>
            <p className="text-sm font-black text-emerald-600">R$ {stats.totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
          </div>
          <div className="h-10 w-px bg-slate-200 hidden sm:block"></div>
          <Badge variant="outline" className="h-10 px-4 bg-primary/5 text-primary border-primary/20 text-[9px] font-black uppercase tracking-widest gap-2">
            <PieChart className="h-3 w-3" /> Conversão: {stats.conversionRate.toFixed(1)}%
          </Badge>
        </div>
      </div>

      <TabsContent value="pipeline" className="mt-0 space-y-6">
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
            <Input placeholder="Pesquisar por lead, empresa ou processo..." className="pl-12 h-14 bg-white border-border shadow-sm rounded-xl focus:ring-2 focus:ring-primary/20" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-2 mr-4 border-r border-slate-200 pr-4">
              <Filter className="h-3.5 w-3.5 text-slate-400" />
              <select className="bg-transparent text-[10px] font-black uppercase tracking-widest outline-none text-primary cursor-pointer" value={processFilter} onChange={(e) => setProcessFilter(e.target.value)}>
                <option value="all">Todos os Processos</option>
                {processes.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>
            {['all', ...statusOptions.map(o => o.value)].map((val) => (
              <button key={val} onClick={() => setStatusFilter(val)} className={cn("px-4 py-2 rounded-lg text-[9px] font-bold uppercase tracking-widest border transition-all", statusFilter === val ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-500 border-border hover:border-slate-300")}>
                {val === 'all' ? 'Todos' : statusOptions.find(o => o.value === val)?.label}
              </button>
            ))}
          </div>
        </div>

        <RecomCard className="border-border overflow-hidden bg-white shadow-xl rounded-2xl">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow className="hover:bg-transparent border-none">
                <TableHead className="w-[50px] text-center"><Checkbox checked={selectedIds.length === filteredLeads.length && filteredLeads.length > 0} onCheckedChange={toggleSelectAll} /></TableHead>
                <TableHead className="w-[40px]"></TableHead>
                <TableHead className="h-14 text-[10px] font-bold uppercase tracking-widest text-slate-400">Lead / Empresa</TableHead>
                <TableHead className="h-14 text-[10px] font-bold uppercase tracking-widest text-slate-400">Identificação Industrial</TableHead>
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

                const relatedSuppliers = suppliers.filter(s => s.related_processes?.includes(lead.process_id || ''));
                
                // Consolidar catálogos alternativos + catálogo principal se houver
                const allCatalogs = relatedSuppliers.flatMap(s => {
                  const list = [...(s.catalogs || [])];
                  // @ts-ignore
                  if (s.catalog_url) {
                    // @ts-ignore
                    list.unshift({ label: 'Catálogo Principal', url: s.catalog_url });
                  }
                  return list;
                });

                return (
                  <React.Fragment key={lead.id}>
                    <TableRow className={cn("border-border cursor-pointer transition-colors", isExpanded ? "bg-slate-50/80" : "hover:bg-slate-50/30", isSelected && "bg-primary/5")} onClick={() => setExpandedId(isExpanded ? null : lead.id)}>
                      <TableCell className="text-center" onClick={e => e.stopPropagation()}><Checkbox checked={isSelected} onCheckedChange={() => toggleSelect(lead.id)} /></TableCell>
                      <TableCell>{isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}</TableCell>
                      <TableCell className="py-5">
                        <div className="flex flex-col">
                          <span className="font-black text-xs uppercase tracking-tight">{lead.name}</span>
                          <span className="text-[9px] font-bold text-muted-foreground/60 uppercase">{lead.company || 'Pessoa Física'}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          {linkedProcess ? (
                            <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 text-[8px] font-black uppercase py-0.5 w-fit">{linkedProcess.name}</Badge>
                          ) : suggestedProcess ? (
                            <Badge variant="outline" className="bg-accent/5 text-accent border-accent/20 text-[8px] font-black uppercase py-0.5 w-fit animate-pulse">Sugerido: {suggestedProcess.name}</Badge>
                          ) : <span className="text-[9px] font-bold text-slate-300 uppercase">A definir</span>}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className={cn("px-2 py-0.5 text-[8px] font-black uppercase border-none", priority.color)}>{priority.label}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className={cn("inline-flex px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest", currentStatus.className)}>
                          {lead.status === 'qualified' && <DollarSign className="h-3 w-3 mr-2" />}
                          {currentStatus.label}
                        </div>
                      </TableCell>
                    </TableRow>
                    {isExpanded && (
                      <TableRow className="bg-slate-50/80 border-none no-hover">
                        <TableCell colSpan={6} className="p-0">
                          <div className="px-16 py-10 flex flex-col gap-10 animate-in fade-in slide-in-from-top-2">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                              <div className="lg:col-span-2 space-y-6">
                                <div className="flex items-center justify-between">
                                  <h4 className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2"><Zap className="h-4 w-4" /> Dossiê Técnico de Handoff</h4>
                                  {lead.source_page && (
                                    <Badge variant="outline" className="text-[8px] font-bold uppercase bg-white gap-1.5 border-slate-200">
                                      <ExternalLink className="h-3 w-3" /> Origem: {lead.source_page.split('/').pop() || 'Home'}
                                    </Badge>
                                  )}
                                </div>
                                <div className="p-6 bg-white border border-slate-200 rounded-2xl space-y-6 shadow-sm">
                                  <div className="space-y-2">
                                    <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Mensagem do Cliente:</span>
                                    <p className="text-sm italic text-slate-600 leading-relaxed font-medium">&quot;{lead.message || 'Sem descrição técnica adicional.'}&quot;</p>
                                  </div>
                                  
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                     <div className="space-y-1">
                                      <label className="text-[9px] font-bold text-slate-400 uppercase">Processo Vinculado:</label>
                                      <select className="w-full h-10 bg-slate-50 border border-slate-200 rounded-lg px-3 text-[10px] font-black uppercase outline-none focus:ring-1 focus:ring-primary" value={lead.process_id || ''} onChange={(e) => handleProcessAssign(lead.id, e.target.value || null)}>
                                        <option value="">Nenhum Processo</option>
                                        {processes.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                                      </select>
                                    </div>
                                    <div className="space-y-1">
                                      <label className="text-[9px] font-bold text-slate-400 uppercase">Canais de Contato:</label>
                                      <div className="flex gap-2">
                                        <RecomButton asChild intent="outline" className="flex-1 h-10 text-[9px] uppercase font-black"><a href={`mailto:${lead.email}`}><Mail className="h-3.5 w-3.5 mr-2" /> Email</a></RecomButton>
                                        {lead.phone && <RecomButton asChild intent="outline" className="flex-1 h-10 text-[9px] uppercase font-black border-emerald-200 text-emerald-700 hover:bg-emerald-50"><a href={`https://wa.me/${lead.phone.replace(/\D/g, '')}`} target="_blank"><Phone className="h-3.5 w-3.5 mr-2" /> WhatsApp</a></RecomButton>}
                                      </div>
                                    </div>
                                  </div>

                                  {allCatalogs.length > 0 && (
                                    <div className="pt-6 border-t border-slate-100">
                                      <p className="text-[9px] font-black uppercase text-slate-400 mb-3 tracking-widest">Links de Apoio Técnico:</p>
                                      <div className="flex flex-wrap gap-2">
                                        {allCatalogs.slice(0, 4).map((cat, i) => (
                                          <a key={i} href={cat.url} target="_blank" className="flex items-center gap-2 px-3 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-[9px] font-bold uppercase transition-colors">
                                            <FileText className="h-3.5 w-3.5 text-primary" /> {cat.label || 'Catálogo'}
                                          </a>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                </div>
                              </div>
                              
                              <div className="space-y-6">
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2"><TrendingUp className="h-4 w-4" /> Ciclo de Fechamento</h4>
                                <div className="p-6 bg-primary/5 border border-primary/10 rounded-2xl space-y-4 shadow-sm">
                                  <div className="space-y-2">
                                    <label className="text-[9px] font-black uppercase text-primary">Alterar Estágio</label>
                                    <select className="w-full h-10 bg-white border border-primary/20 rounded-lg px-3 text-[10px] font-black uppercase outline-none focus:ring-1 focus:ring-primary" value={lead.status} onChange={(e) => handleStatusChange(lead.id, e.target.value)}>
                                      {statusOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                                    </select>
                                  </div>

                                  {(lead.status === 'qualified' || lead.status === 'contacted') && (
                                    <div className="space-y-2 animate-in fade-in zoom-in-95 duration-200">
                                      <label className="text-[9px] font-black uppercase text-emerald-600">Valor da Venda (BRL)</label>
                                      <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-400">R$</span>
                                        <Input type="number" value={feedbackData.revenue ?? (lead.revenue_value || '')} onChange={e => setFeedbackData(prev => ({ ...prev, revenue: Number(e.target.value) }))} className="h-10 pl-9 bg-white text-[10px] font-bold border-emerald-100" placeholder="0,00" />
                                      </div>
                                    </div>
                                  )}

                                  {lead.status === 'lost' && (
                                    <div className="space-y-2 animate-in fade-in zoom-in-95 duration-200">
                                      <label className="text-[9px] font-black uppercase text-rose-600">Motivo da Perda</label>
                                      <select className="w-full h-10 bg-white border border-rose-200 rounded-lg px-3 text-[10px] font-black uppercase outline-none focus:ring-1 focus:ring-rose-500" value={feedbackData.loss_reason ?? (lead.loss_reason || '')} onChange={e => setFeedbackData(prev => ({ ...prev, loss_reason: e.target.value }))}>
                                        <option value="">Selecione um motivo...</option>
                                        <option value="price">Preço Elevado</option>
                                        <option value="deadline">Prazo de Entrega</option>
                                        <option value="technical">Incompatibilidade Técnica</option>
                                        <option value="competitor">Perdido para Concorrência</option>
                                        <option value="no_response">Sem Retorno do Cliente</option>
                                      </select>
                                    </div>
                                  )}

                                  <RecomButton onClick={() => handleSaveFeedback(lead.id)} disabled={isSavingFeedback} className="w-full h-11 text-[10px] font-black uppercase tracking-widest gap-2 shadow-lg shadow-primary/10">
                                    {isSavingFeedback ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
                                    Salvar Resultados
                                  </RecomButton>
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

      <TabsContent value="reps" className="mt-0 space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-2xl font-black uppercase tracking-tight text-primary">Time de Atendimento</h3>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Gestão de vendedores ativos no rodízio técnico.</p>
          </div>
          <RecomButton onClick={() => setIsAddingRep(true)} className="gap-2 text-[10px] uppercase font-black tracking-widest shadow-lg shadow-primary/10">
            <UserPlus className="h-4 w-4" /> Novo Vendedor
          </RecomButton>
        </div>

        {isAddingRep && (
          <RecomCard className="p-8 border-accent bg-accent/5 rounded-2xl animate-in slide-in-from-top-4 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase text-accent tracking-widest">Nome Completo</label>
                <Input value={newRep.name} onChange={e => setNewRep(prev => ({ ...prev, name: e.target.value }))} className="h-10 bg-white border-accent/20 text-[10px] font-bold" placeholder="João Silva" />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase text-accent tracking-widest">E-mail Técnico</label>
                <Input value={newRep.email} onChange={e => setNewRep(prev => ({ ...prev, email: e.target.value }))} className="h-10 bg-white border-accent/20 text-[10px] font-bold" placeholder="joao@recom.com.br" />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase text-accent tracking-widest">WhatsApp</label>
                <Input value={newRep.phone} onChange={e => setNewRep(prev => ({ ...prev, phone: e.target.value }))} className="h-10 bg-white border-accent/20 text-[10px] font-bold" placeholder="11 99999-9999" />
              </div>
              <div className="flex gap-3">
                <RecomButton onClick={handleAddRep} className="flex-1 h-10 bg-accent hover:bg-accent/90 text-[10px] uppercase font-black tracking-widest">Cadastrar</RecomButton>
                <RecomButton onClick={() => setIsAddingRep(false)} intent="ghost" className="h-10 text-[10px] uppercase font-black tracking-widest">Cancelar</RecomButton>
              </div>
            </div>
          </RecomCard>
        )}

        <RecomCard className="border-border overflow-hidden bg-white shadow-xl rounded-2xl">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow className="hover:bg-transparent border-none">
                <TableHead className="h-14 text-[10px] font-bold uppercase tracking-widest text-slate-400">Vendedor</TableHead>
                <TableHead className="h-14 text-[10px] font-bold uppercase tracking-widest text-slate-400">Último Recebido</TableHead>
                <TableHead className="h-14 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-center">Status no Rodízio</TableHead>
                <TableHead className="h-14 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-right">Controle</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {salesReps.length === 0 ? (
                <TableRow><TableCell colSpan={4} className="h-64 text-center opacity-30 text-[10px] font-black uppercase tracking-[0.2em]">Nenhum vendedor registrado</TableCell></TableRow>
              ) : salesReps.map((rep) => (
                <TableRow key={rep.id} className="border-border">
                  <TableCell className="py-5">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 flex items-center justify-center bg-primary/5 rounded-xl text-primary"><User className="h-5 w-5" /></div>
                      <div className="flex flex-col">
                        <span className="font-black text-xs uppercase tracking-tight">{rep.name}</span>
                        <span className="text-[10px] font-mono text-slate-400">{rep.email}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black uppercase text-slate-600">{rep.assignment_count} Atendimentos</span>
                      <span className="text-[9px] font-bold text-slate-400 uppercase">
                        {rep.last_assigned_at ? `Último: ${new Date(rep.last_assigned_at).toLocaleDateString()}` : 'Aguardando primeiro lead'}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <button onClick={() => {
                      toggleSalesRepStatus(rep.id, rep.status);
                      setSalesReps(prev => prev.map(r => r.id === rep.id ? { ...r, status: r.status === 'active' ? 'inactive' : 'active' } : r));
                    }}>
                      <Badge className={cn("text-[8px] font-black uppercase tracking-widest px-3 py-1", rep.status === 'active' ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-slate-100 text-slate-400 border-slate-200")}>
                        {rep.status === 'active' ? 'Ativo' : 'Pausado'}
                      </Badge>
                    </button>
                  </TableCell>
                  <TableCell className="text-right">
                    <RecomButton intent="ghost" onClick={async () => {
                      const result = await deleteSalesRep(rep.id);
                      if (result.ok) {
                        setSalesReps(prev => prev.filter(r => r.id !== rep.id));
                        toast({ title: "Vendedor removido" });
                      } else {
                        toast({ variant: "destructive", title: result.error });
                      }
                    }} className="text-destructive hover:bg-rose-50 h-10 w-10 p-0"><Trash2 className="h-4 w-4" /></RecomButton>
                  </TableCell>
                </TableRow>
              ))}

            </TableBody>
          </Table>
        </RecomCard>
      </TabsContent>

      <TabsContent value="settings" className="mt-0">
        <RecomCard className="p-10 border-border bg-white rounded-2xl shadow-xl space-y-10">
          <div className="space-y-2">
            <h3 className="text-2xl font-black uppercase tracking-tight text-primary">Regras de Automação</h3>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Configure o motor de distribuição e notificações da RECOM.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div className="flex items-center justify-between p-6 bg-slate-50 border border-slate-100 rounded-2xl">
                <div className="space-y-1">
                  <h4 className="text-[11px] font-black uppercase tracking-widest">Habilitar Rodízio (Round Robin)</h4>
                  <p className="text-[9px] text-slate-400 font-bold uppercase">Distribui leads equitativamente entre os vendedores ativos.</p>
                </div>
                <Checkbox checked={config.round_robin_enabled} onCheckedChange={checked => setConfig(prev => ({ ...prev, round_robin_enabled: !!checked }))} />
              </div>

              <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-[11px] font-black uppercase tracking-widest text-primary">Auto-Status Handoff</h4>
                  <Checkbox checked={config.auto_status_update.enabled} onCheckedChange={checked => setConfig(prev => ({ ...prev, auto_status_update: { ...prev.auto_status_update, enabled: !!checked } }))} />
                </div>
                {config.auto_status_update.enabled && (
                  <select className="w-full h-12 bg-white border border-primary/20 rounded-xl px-4 text-[10px] font-black uppercase outline-none focus:ring-1 focus:ring-primary" value={config.auto_status_update.target_status} onChange={e => setConfig(prev => ({ ...prev, auto_status_update: { ...prev.auto_status_update, target_status: e.target.value } }))}>
                    {statusOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                  </select>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary border-b border-primary/10 pb-2 block">Emails de Cópia Geral</label>
                <div className="space-y-2">
                  {config.emails.map((email, idx) => (
                    <div key={idx} className="flex gap-2">
                      <Input value={email} onChange={e => { const news = [...config.emails]; news[idx] = e.target.value; setConfig(prev => ({ ...prev, emails: news })); }} className="h-10 text-[10px] font-bold border-slate-200" />
                      <button onClick={() => setConfig(prev => ({ ...prev, emails: prev.emails.filter((_, i) => i !== idx) }))} className="text-slate-300 hover:text-rose-500 transition-colors"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  ))}
                  <button onClick={() => setConfig(prev => ({ ...prev, emails: [...prev.emails, ''] }))} className="text-[9px] font-black uppercase text-primary pt-2 flex items-center gap-2 hover:opacity-70 transition-opacity"><Plus className="h-4 w-4" /> Adicionar e-mail</button>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 flex justify-end gap-3">
            <RecomButton intent="outline" onClick={() => setConfig(initialConfig || config)} className="h-12 px-8 text-[10px] font-black uppercase tracking-widest">Descartar</RecomButton>
            <RecomButton onClick={() => updateAdminConfig('lead_notifications', config)} className="h-12 px-10 gap-2 shadow-xl shadow-primary/20 text-[10px] font-black uppercase tracking-widest">
              <ShieldCheck className="h-4 w-4" /> Salvar Configurações
            </RecomButton>
          </div>
        </RecomCard>
      </TabsContent>
    </Tabs>
  );
}
