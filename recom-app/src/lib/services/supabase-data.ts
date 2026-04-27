/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from "../supabase/server";
import { createStaticClient } from "../supabase/static";
import { createAdminClient } from "../supabase/admin";
import { unstable_noStore as noStore } from "next/cache";
import { Supplier, SupplierSchema } from "@/cms/schemas/supplier.schema";
import { Process, ProcessSchema } from "@/cms/schemas/process.schema";
import { Promotion, PromotionSchema } from "@/cms/schemas/promotion.schema";

type DataOptions = {
  allowFallback?: boolean;
};

async function getDataClient(allowFallback: boolean) {
  return allowFallback ? await createClient() : createAdminClient();
}

const FALLBACK_SUPPLIERS: Supplier[] = [
  {
    id: "00000000-0000-0000-0000-000000000001",
    name: "Mitsubishi Materials",
    slug: "mitsubishi", catalogs: [], settings: { showMenu: true, showPromotions: true, showProcesses: true, featured: false },
    logoUrl: "/assets/images/mitsubishi-logo.png",
    catalogUrl: "https://www.mmc-carbide.com/br/download/catalog-1",
    shortDescription: "Líder global em ferramentas de corte e soluções de metal duro para usinagem de alta precisão.",
    longDescription:
      "A Mitsubishi Materials é reconhecida mundialmente pela inovação em materiais e revestimentos. Sua linha completa abrange torneamento, fresamento e furação com tecnologia de ponta para máxima produtividade industrial.",
    status: "active",
    sortOrder: 1,
    relatedProcesses: ["00000000-0000-0000-0000-000000000010", "00000000-0000-0000-0000-000000000011", "00000000-0000-0000-0000-000000000012"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "00000000-0000-0000-0000-000000000002",
    name: "7Leaders",
    slug: "7leaders", catalogs: [], settings: { showMenu: true, showPromotions: true, showProcesses: true, featured: false },
    logoUrl: "/assets/images/logo-7leaders.svg",
    catalogUrl: "https://www.7leaders.com/e-catalog",
    shortDescription: "Especialista em fresas de metal duro de alto desempenho e ferramentas rotativas.",
    longDescription:
      "A 7Leaders foca em ferramentas rotativas premium, com destaque para fresas de topo e brocas de alto rendimento. Seus produtos são ideais para moldes, matrizes e componentes complexos que exigem acabamento superior.",
    status: "active",
    sortOrder: 2,
    relatedProcesses: ["00000000-0000-0000-0000-000000000011", "00000000-0000-0000-0000-000000000012"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "00000000-0000-0000-0000-000000000003",
    name: "BT Fixo",
    slug: "bt-fixo", catalogs: [], settings: { showMenu: true, showPromotions: true, showProcesses: true, featured: false },
    logoUrl: "/assets/images/logo_btfixo.png",
    catalogUrl: "https://www.btfixo.com.br/catalogos",
    shortDescription: "Soluções em acessórios de máquinas-ferramenta, mandris e sistemas de fixação de precisão.",
    longDescription:
      "A BT Fixo oferece uma linha completa de acessórios para máquinas CNC, incluindo cones, pinças, morsas e sistemas de fixação que garantem a estabilidade necessária para processos de usinagem exigentes.",
    status: "active",
    sortOrder: 3,
    relatedProcesses: ["00000000-0000-0000-0000-000000000010"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "00000000-0000-0000-0000-000000000004",
    name: "Kifix",
    slug: "kifix", catalogs: [], settings: { showMenu: true, showPromotions: true, showProcesses: true, featured: false },
    logoUrl: "/assets/images/logo-kifix.png",
    catalogUrl: "https://www.kifix.com.br/catalogo/1_pt_Catalogo_2025_baixa.pdf?v=2025-03-05&utm_source=chatgpt.com",
    shortDescription: "Especialista em grampos rápidos e dispositivos de fixação industrial para processos produtivos ágeis.",
    longDescription:
      "A Kifix é líder em dispositivos de fixação rápida (toggle clamps). Seus produtos são essenciais para montagens, soldagens e processos de usinagem leve onde a agilidade e segurança na fixação são cruciais.",
    status: "active",
    sortOrder: 4,
    relatedProcesses: ["00000000-0000-0000-0000-000000000010"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const FALLBACK_PROCESSES: Process[] = [
  {
    id: "00000000-0000-0000-0000-000000000010",
    name: "Torneamento",
    slug: "torneamento",
    imageUrl: "/assets/images/optimized/koudoe.jpg",
    shortDescription: "Remoção de material em peças rotativas com máxima precisão e controle de cavaco.",
    longDescription:
      "Soluções completas para operações de revolução. A RECOM oferece suporte técnico para a escolha da melhor combinação de classe e quebra-cavaco para torneamento externo, interno e rosqueamento.",
    status: "active",
    sortOrder: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "00000000-0000-0000-0000-000000000011",
    name: "Fresamento",
    slug: "fresamento",
    imageUrl: "/assets/images/optimized/fresamento-bg.jpg",
    shortDescription: "Usinagem de superfícies complexas com ferramentas rotativas de alta velocidade.",
    longDescription:
      "Soluções de fresamento para alta remoção de material e acabamento superior. A RECOM provê as ferramentas ideais para faceamento, esquadrejamento e fresamento de cópia.",
    status: "active",
    sortOrder: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "00000000-0000-0000-0000-000000000012",
    name: "Furação",
    slug: "furacao",
    imageUrl: "/assets/images/optimized/furacao-bg.jpg",
    shortDescription: "Criação de furos precisos com sistemas de alta estabilidade e refrigeração.",
    longDescription:
      "Sistemas de furação de alta performance para furos curtos e profundos. Foco em estabilidade, precisão dimensional e excelente acabamento superficial.",
    status: "active",
    sortOrder: 3,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const FALLBACK_PROMOTIONS: Promotion[] = [
  {
    id: "00000000-0000-0000-0000-000000000020",
    title: "Kit Fresamento Mitsubishi",
    slug: "kit-fresamento-mitsubishi",
    description: "Na compra de 10 insertos da linha MP, ganhe o corpo da fresa compatível.",
    startsAt: "2024-01-01T00:00:00Z",
    endsAt: "2026-12-31T23:59:59Z",
    status: "active",
    supplierId: "00000000-0000-0000-0000-000000000001",
    ctaLabel: "Solicitar kit",
    ctaUrl: "/sobre#contato",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "00000000-0000-0000-0000-000000000021",
    title: "Lote Especial Metal Duro",
    slug: "lote-especial-metal-duro",
    description: "Preços diferenciados para pedidos acima de 50 unidades de insertos para aço inox.",
    startsAt: "2024-05-01T00:00:00Z",
    endsAt: "2026-12-31T23:59:59Z",
    status: "active",
    supplierId: "00000000-0000-0000-0000-000000000001",
    ctaLabel: "Ver tabela",
    ctaUrl: "/sobre#contato",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "00000000-0000-0000-0000-000000000022",
    title: "Testes técnicos 7Leaders",
    slug: "testes-tecnicos-7leaders",
    description: "Solicite uma amostra para teste em sua produção e comprove o rendimento das novas fresas rotativas.",
    startsAt: "2024-05-01T00:00:00Z",
    endsAt: "2026-12-31T23:59:59Z",
    status: "active",
    supplierId: "00000000-0000-0000-0000-000000000002",
    ctaLabel: "Agendar teste",
    ctaUrl: "/sobre#contato",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export async function getSuppliers(options: DataOptions = {}): Promise<Supplier[]> {
  const allowFallback = options.allowFallback !== false;
  if (!allowFallback) {
    noStore();
  }

  const supabaseClient = await getDataClient(allowFallback);
  const query = supabaseClient.from("suppliers").select("*").order("sort_order", { ascending: true });

  const { data, error } = allowFallback ? await query.eq("status", "active") : await query;

  if (error || !data || data.length === 0) {
    return allowFallback ? FALLBACK_SUPPLIERS : [];
  }

  return data.map((item: Record<string, any>) => {
    // Garantir que settings tenha todos os campos mesmo se vier null do banco
    const dbSettings: Record<string, unknown> = (item.settings as Record<string, unknown>) || {};
    const settings = {
      showMenu: dbSettings.show_menu !== undefined ? Boolean(dbSettings.show_menu) : true,
      showPromotions: dbSettings.show_promotions !== undefined ? Boolean(dbSettings.show_promotions) : true,
      showProcesses: dbSettings.show_processes !== undefined ? Boolean(dbSettings.show_processes) : true,
      featured: dbSettings.featured !== undefined ? Boolean(dbSettings.featured) : false,
    };

    return SupplierSchema.parse({
      ...item,
      logoUrl: item.logo_url ?? undefined,
      catalogUrl: item.catalog_url ?? undefined,
      eCatalogUrl: item.e_catalog_url ?? undefined,
      catalogs: item.catalogs ?? [],
      settings,
      // Garantir que as descrições tenham o tamanho mínimo exigido pelo Zod
      shortDescription: (typeof item.short_description === "string" && item.short_description.length >= 10)
        ? item.short_description 
        : (item.short_description || "Descrição curta pendente de preenchimento."),
      longDescription: (typeof item.long_description === "string" && item.long_description.length >= 50)
        ? item.long_description 
        : (item.long_description || "Descrição longa pendente de preenchimento no sistema administrativo RECOM 2026."),
      relatedProcesses: item.related_processes ?? [],
      sortOrder: item.sort_order ?? 0,
      seoTitle: item.seo_title ?? undefined,
      seoDescription: item.seo_description ?? undefined,
      createdAt: item.created_at ?? undefined,
      updatedAt: item.updated_at ?? undefined,
    });
  });
}

export async function getSupplierBySlug(slug: string, options: DataOptions = {}): Promise<Supplier | null> {
  const allowFallback = options.allowFallback !== false;
  if (!allowFallback) {
    noStore();
  }

  const supabaseClient = await getDataClient(allowFallback);
  const query = supabaseClient.from("suppliers").select("*").eq("slug", slug);
  const { data, error } = allowFallback ? await query.eq("status", "active").single() : await query.maybeSingle();

  if (error || !data) {
    return allowFallback ? FALLBACK_SUPPLIERS.find((supplier) => supplier.slug === slug) || null : null;
  }

  const dbSettings: Record<string, unknown> = (data.settings as Record<string, unknown>) || {};
  const settings = {
    showMenu: dbSettings.show_menu !== undefined ? Boolean(dbSettings.show_menu) : true,
    showPromotions: dbSettings.show_promotions !== undefined ? Boolean(dbSettings.show_promotions) : true,
    showProcesses: dbSettings.show_processes !== undefined ? Boolean(dbSettings.show_processes) : true,
    featured: dbSettings.featured !== undefined ? Boolean(dbSettings.featured) : false,
  };

  return SupplierSchema.parse({
    ...data,
    logoUrl: data.logo_url ?? undefined,
    catalogUrl: data.catalog_url ?? undefined,
    eCatalogUrl: data.e_catalog_url ?? undefined,
    catalogs: data.catalogs ?? [],
    settings,
    // Garantir que as descrições tenham o tamanho mínimo exigido pelo Zod
    shortDescription: (data.short_description && data.short_description.length >= 10) 
      ? data.short_description 
      : (data.short_description || "Descrição curta pendente de preenchimento."),
    longDescription: (data.long_description && data.long_description.length >= 50) 
      ? data.long_description 
      : (data.long_description || "Descrição longa pendente de preenchimento no sistema administrativo RECOM 2026."),
    relatedProcesses: data.related_processes ?? [],
    sortOrder: data.sort_order ?? 0,
    seoTitle: data.seo_title ?? undefined,
    seoDescription: data.seo_description ?? undefined,
    createdAt: data.created_at ?? undefined,
    updatedAt: data.updated_at ?? undefined,
  });
}

export async function getProcesses(options: DataOptions = {}): Promise<Process[]> {
  const allowFallback = options.allowFallback !== false;
  if (!allowFallback) {
    noStore();
  }

  const supabaseClient = await getDataClient(allowFallback);
  const query = supabaseClient.from("processes").select("*").order("sort_order", { ascending: true });
  const { data, error } = allowFallback ? await query.eq("status", "active") : await query;

  if (error || !data || data.length === 0) {
    return allowFallback ? FALLBACK_PROCESSES : [];
  }

  return data.map((item: Record<string, any>) =>
    ProcessSchema.parse({
      ...item,
      imageUrl: item.image_url ?? undefined,
      shortDescription: item.short_description ?? "",
      longDescription: item.long_description ?? "",
      sortOrder: item.sort_order ?? 0,
      seoTitle: item.seo_title ?? undefined,
      seoDescription: item.seo_description ?? undefined,
      createdAt: item.created_at ?? undefined,
      updatedAt: item.updated_at ?? undefined,
    })
  );
}

export async function getProcessBySlug(slug: string, options: DataOptions = {}): Promise<Process | null> {
  const allowFallback = options.allowFallback !== false;
  if (!allowFallback) {
    noStore();
  }

  const supabaseClient = await getDataClient(allowFallback);
  const query = supabaseClient.from("processes").select("*").eq("slug", slug);
  const { data, error } = allowFallback ? await query.eq("status", "active").single() : await query.maybeSingle();

  if (error || !data) {
    return allowFallback ? FALLBACK_PROCESSES.find((process) => process.slug === slug) || null : null;
  }

  return ProcessSchema.parse({
    ...data,
    imageUrl: data.image_url ?? undefined,
    shortDescription: data.short_description ?? "",
    longDescription: data.long_description ?? "",
    sortOrder: data.sort_order ?? 0,
    seoTitle: data.seo_title ?? undefined,
    seoDescription: data.seo_description ?? undefined,
    createdAt: data.created_at ?? undefined,
    updatedAt: data.updated_at ?? undefined,
  });
}

export async function getPromotions(options: DataOptions = {}): Promise<Promotion[]> {
  const allowFallback = options.allowFallback !== false;
  if (!allowFallback) {
    noStore();
  }

  const supabaseClient = await getDataClient(allowFallback);
  const query = supabaseClient.from("promotions").select("*").order("starts_at", { ascending: false });
  const { data, error } = allowFallback ? await query.eq("status", "active") : await query;

  if (error || !data || data.length === 0) {
    return allowFallback ? FALLBACK_PROMOTIONS : [];
  }

  return data.map((item: Record<string, any>) =>
    PromotionSchema.parse({
      ...item,
      supplierId: item.supplier_id ?? undefined,
      imageUrl: item.image_url ?? undefined,
      description: item.description ?? "",
      startsAt: item.starts_at,
      endsAt: item.ends_at,
      ctaLabel: item.cta_label ?? undefined,
      ctaUrl: item.cta_url ?? undefined,
      createdAt: item.created_at ?? undefined,
      updatedAt: item.updated_at ?? undefined,
    })
  );
}

export async function getPromotionBySlug(slug: string, options: DataOptions = {}): Promise<Promotion | null> {
  const allowFallback = options.allowFallback !== false;
  if (!allowFallback) {
    noStore();
  }

  const supabaseClient = await getDataClient(allowFallback);
  const query = supabaseClient.from("promotions").select("*").eq("slug", slug);
  const { data, error } = allowFallback ? await query.eq("status", "active").single() : await query.maybeSingle();

  if (error || !data) {
    return allowFallback ? FALLBACK_PROMOTIONS.find((promotion) => promotion.slug === slug) || null : null;
  }

  return PromotionSchema.parse({
    ...data,
    supplierId: data.supplier_id ?? undefined,
    imageUrl: data.image_url ?? undefined,
    description: data.description ?? "",
    startsAt: data.starts_at,
    endsAt: data.ends_at,
    ctaLabel: data.cta_label ?? undefined,
    ctaUrl: data.cta_url ?? undefined,
    createdAt: data.created_at ?? undefined,
    updatedAt: data.updated_at ?? undefined,
  });
}

export async function getStaticSupplierSlugs(): Promise<{ slug: string }[]> {
  const supabase = createStaticClient();
  const { data, error } = await supabase.from("suppliers").select("slug").eq("status", "active");

  if (error || !data) {
    return FALLBACK_SUPPLIERS.map((supplier) => ({ slug: supplier.slug }));
  }

  return data.map((item: Record<string, any>) => ({ slug: String(item.slug) }));
}

export async function getStaticProcessSlugs(): Promise<{ slug: string }[]> {
  const supabase = createStaticClient();
  const { data, error } = await supabase.from("processes").select("slug").eq("status", "active");

  if (error || !data) {
    return FALLBACK_PROCESSES.map((process) => ({ slug: process.slug }));
  }

  return data.map((item: Record<string, any>) => ({ slug: String(item.slug) }));
}
