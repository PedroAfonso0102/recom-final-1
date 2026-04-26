import { createClient } from '../supabase/server';
import { createStaticClient } from '../supabase/static';
import { Supplier, SupplierSchema } from '../../design-system/schemas/supplier.schema';
import { Process, ProcessSchema } from '../../design-system/schemas/process.schema';
import { Promotion, PromotionSchema } from '../../design-system/schemas/promotion.schema';

const FALLBACK_SUPPLIERS: Supplier[] = [
  {
    id: '1',
    name: 'Mitsubishi Materials',
    slug: 'mitsubishi',
    logoUrl: '/assets/images/mitsubishi-logo.png',
    catalogUrl: 'https://www.mmc-carbide.com/br/download/catalog-1',
    eCatalogUrl: 'https://www.mitsubishicarbide.net/mht/pt/',
    shortDescription: 'Líder global em ferramentas de corte e soluções de metal duro para usinagem de alta precisão.',
    longDescription: 'A Mitsubishi Materials é reconhecida mundialmente pela inovação em materiais e revestimentos. Sua linha completa abrange torneamento, fresamento e furação com tecnologia de ponta para máxima produtividade industrial.',
    status: 'active',
    sortOrder: 1,
    relatedProcesses: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: '7Leaders',
    slug: '7leaders',
    logoUrl: '/assets/images/logo-7leaders.svg',
    catalogUrl: 'https://www.7leaders.com/e-catalog',
    eCatalogUrl: 'https://www.7leaders.com/e-catalog',
    shortDescription: 'Especialista em fresas de metal duro de alto desempenho e ferramentas rotativas.',
    longDescription: 'A 7Leaders foca em ferramentas rotativas premium, com destaque para fresas de topo e brocas de alto rendimento. Seus produtos são ideais para moldes, matrizes e componentes complexos que exigem acabamento superior.',
    status: 'active',
    sortOrder: 2,
    relatedProcesses: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'BT Fixo',
    slug: 'bt-fixo',
    logoUrl: '/assets/images/logo_btfixo.png',
    catalogUrl: 'https://www.btfixo.com.br/catalogos',
    shortDescription: 'Referência nacional em sistemas de fixação, acessórios e periféricos para máquinas-ferramenta.',
    longDescription: 'A BT Fixo oferece uma linha completa de acessórios para máquinas CNC, incluindo cones, pinças, morsas e sistemas de fixação que garantem a estabilidade necessária para processos de usinagem exigentes.',
    status: 'active',
    sortOrder: 3,
    relatedProcesses: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Kifix',
    slug: 'kifix',
    logoUrl: '/assets/images/logo-kifix.png',
    catalogUrl: 'https://www.kifix.com.br/catalogo/1_pt_Catalogo_2025_baixa.pdf?v=2025-03-05&utm_source=chatgpt.com',
    shortDescription: 'Especialista em grampos rápidos e dispositivos de fixação manual e pneumática.',
    longDescription: 'A Kifix é líder em dispositivos de fixação rápida (toggle clamps). Seus produtos são essenciais para montagens, soldagens e processos de usinagem leve onde a agilidade e segurança na fixação são cruciais.',
    status: 'active',
    sortOrder: 4,
    relatedProcesses: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const FALLBACK_PROCESSES: Process[] = [
  {
    id: '1',
    name: 'Torneamento',
    slug: 'torneamento',
    imageUrl: '/assets/images/optimized/koudoe.jpg',
    shortDescription: 'Remoção de material em peças rotativas com máxima precisão e controle de cavaco.',
    longDescription: 'Soluções completas para operações de revolução. A RECOM oferece suporte técnico para a escolha da melhor combinação de classe e quebra-cavaco para torneamento externo, interno e rosqueamento.',
    status: 'active',
    sortOrder: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Fresamento',
    slug: 'fresamento',
    imageUrl: '/assets/images/optimized/fresamento-bg.jpg',
    shortDescription: 'Usinagem de superfícies complexas com ferramentas rotativas de alta velocidade.',
    longDescription: 'Soluções de fresamento para alta remoção de material e acabamento superior. A RECOM provê as ferramentas ideais para faceamento, esquadrejamento e fresamento de cópia.',
    status: 'active',
    sortOrder: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Furação',
    slug: 'furacao',
    imageUrl: '/assets/images/optimized/furacao-bg.jpg',
    shortDescription: 'Criação de furos precisos com sistemas de alta estabilidade e refrigeração.',
    longDescription: 'Sistemas de furação de alta performance para furos curtos e profundos. Foco em estabilidade, precisão dimensional e excelente acabamento superficial.',
    status: 'active',
    sortOrder: 3,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const FALLBACK_PROMOTIONS: Promotion[] = [
  {
    id: '1',
    title: 'Kit Fresamento Mitsubishi',
    slug: 'kit-fresamento-mitsubishi',
    description: 'Na compra de 10 insertos da linha MP, ganhe o corpo da fresa compatível.',
    startsAt: '2024-01-01T00:00:00Z',
    endsAt: '2026-12-31T23:59:59Z',
    status: 'active',
    ctaLabel: 'Solicitar Kit',
    ctaUrl: '/sobre#contato',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Lote Especial Metal Duro',
    slug: 'lote-especial-metal-duro',
    description: 'Preços diferenciados para pedidos acima de 50 unidades de insertos para aço inox.',
    startsAt: '2024-05-01T00:00:00Z',
    endsAt: '2026-12-31T23:59:59Z',
    status: 'active',
    ctaLabel: 'Ver Tabela',
    ctaUrl: '/sobre#contato',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export async function getSuppliers(): Promise<Supplier[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('suppliers')
    .select('*')
    .eq('status', 'active')
    .order('sort_order', { ascending: true });

  if (error || !data || data.length === 0) {
    return FALLBACK_SUPPLIERS;
  }

  return data.map(item => {
    const baseSupplier = SupplierSchema.parse({
      ...item,
      logoUrl: item.logo_url,
      catalogUrl: item.catalog_url,
      eCatalogUrl: item.e_catalog_url,
      shortDescription: item.short_description,
      longDescription: item.long_description,
      relatedProcesses: item.related_processes,
      sortOrder: item.sort_order,
      seoTitle: item.seo_title,
      seoDescription: item.seo_description,
      createdAt: item.created_at,
      updatedAt: item.updated_at
    });

    // Enforce official 2026 data for known brands to bypass old DB entries
    const official = FALLBACK_SUPPLIERS.find(s => s.slug === baseSupplier.slug);
    if (official) {
      return {
        ...baseSupplier,
        logoUrl: official.logoUrl,
        catalogUrl: official.catalogUrl,
        eCatalogUrl: official.eCatalogUrl,
        shortDescription: baseSupplier.shortDescription || official.shortDescription,
        longDescription: baseSupplier.longDescription || official.longDescription
      };
    }
    return baseSupplier;
  });
}

export async function getSupplierBySlug(slug: string): Promise<Supplier | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('suppliers')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) {
    return FALLBACK_SUPPLIERS.find(s => s.slug === slug) || null;
  }

  const baseSupplier = SupplierSchema.parse({
    ...data,
    logoUrl: data.logo_url,
    catalogUrl: data.catalog_url,
    eCatalogUrl: data.e_catalog_url,
    shortDescription: data.short_description,
    longDescription: data.long_description,
    relatedProcesses: data.related_processes,
    sortOrder: data.sort_order,
    seoTitle: data.seo_title,
    seoDescription: data.seo_description,
    createdAt: data.created_at,
    updatedAt: data.updated_at
  });

  const official = FALLBACK_SUPPLIERS.find(s => s.slug === baseSupplier.slug);
  if (official) {
    return {
      ...baseSupplier,
      logoUrl: official.logoUrl,
      catalogUrl: official.catalogUrl,
      eCatalogUrl: official.eCatalogUrl,
      shortDescription: baseSupplier.shortDescription || official.shortDescription,
      longDescription: baseSupplier.longDescription || official.longDescription
    };
  }
  return baseSupplier;
}

export async function getProcesses(): Promise<Process[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('processes')
    .select('*')
    .eq('status', 'active')
    .order('sort_order', { ascending: true });

  if (error || !data || data.length === 0) return FALLBACK_PROCESSES;

  return data.map(item => ProcessSchema.parse({
    ...item,
    imageUrl: item.image_url,
    shortDescription: item.short_description,
    longDescription: item.long_description,
    sortOrder: item.sort_order,
    seoTitle: item.seo_title,
    seoDescription: item.seo_description,
    createdAt: item.created_at,
    updatedAt: item.updated_at
  }));
}

export async function getProcessBySlug(slug: string): Promise<Process | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('processes')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) return FALLBACK_PROCESSES.find(p => p.slug === slug) || null;

  return ProcessSchema.parse({
    ...data,
    imageUrl: data.image_url,
    shortDescription: data.short_description,
    longDescription: data.long_description,
    sortOrder: data.sort_order,
    seoTitle: data.seo_title,
    seoDescription: data.seo_description,
    createdAt: data.created_at,
    updatedAt: data.updated_at
  });
}

export async function getPromotions(): Promise<Promotion[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('promotions')
    .select('*')
    .eq('status', 'active')
    .order('starts_at', { ascending: false });

  if (error || !data || data.length === 0) return FALLBACK_PROMOTIONS;

  return data.map(item => PromotionSchema.parse({
    ...item,
    supplierId: item.supplier_id,
    imageUrl: item.image_url,
    startsAt: item.starts_at,
    endsAt: item.ends_at,
    ctaLabel: item.cta_label,
    ctaUrl: item.cta_url,
    createdAt: item.created_at,
    updatedAt: item.updated_at
  }));
}

export async function getStaticSupplierSlugs(): Promise<{ slug: string }[]> {
  const supabase = createStaticClient();
  const { data, error } = await supabase
    .from('suppliers')
    .select('slug')
    .eq('status', 'active');

  if (error || !data) {
     return FALLBACK_SUPPLIERS.map(s => ({ slug: s.slug }));
  }
  return data.map(item => ({ slug: item.slug }));
}

export async function getStaticProcessSlugs(): Promise<{ slug: string }[]> {
  const supabase = createStaticClient();
  const { data, error } = await supabase
    .from('processes')
    .select('slug')
    .eq('status', 'active');

  if (error || !data) return [];
  return data.map(item => ({ slug: item.slug }));
}
