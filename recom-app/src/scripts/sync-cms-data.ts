import { createAdminClient } from "../lib/supabase/admin";

// Slugs must match the migration
const HOME_PAGE_SLUG = "home";

const SUPPLIERS = [
  {
    name: "Mitsubishi Materials",
    slug: "mitsubishi",
    logo_url: "/assets/images/MITSUBISHI_MATERIALS_BRASIL_Colour_RGB.svg",
    catalog_url: "https://www.mmc-carbide.com/br/download/catalog-1",
    short_description: "A Mitsubishi Materials é referência mundial em metal duro. Sua linha abrange torneamento, fresamento e furação com tecnologia para produtividade industrial.",
    long_description: "A Mitsubishi Materials é referência mundial em metal duro. Sua linha abrange torneamento, fresamento e furação com tecnologia para produtividade industrial em aços, inox e ferro fundido.\n\nA RECOM atende clientes que buscam produtos na linha original Mitsubishi. Nossa equipe técnica orienta na escolha da ferramenta mais adequada à sua aplicação.",
    status: "active",
    sort_order: 1,
    settings: { show_menu: true, show_promotions: true, show_processes: true, featured: true },
    related_processes: [] // We'll update after processes are inserted
  },
  {
    name: "7Leaders",
    slug: "7leaders",
    logo_url: "/assets/images/logo-7leaders.svg",
    catalog_url: "https://www.7leaders.com/e-catalog",
    short_description: "Fabricante de fresas de metal duro e ferramentas rotativas.",
    long_description: "A 7Leaders foca em ferramentas rotativas, com destaque para fresas de topo e brocas de alto rendimento. Seus produtos são ideais para moldes, matrizes e componentes complexos que exigem acabamento de qualidade.",
    status: "active",
    sort_order: 2,
    settings: { show_menu: true, show_promotions: true, show_processes: true, featured: true },
    related_processes: []
  },
  {
    name: "PEDRO AFONSO TESTE",
    slug: "pedro-afonso-teste",
    logo_url: null,
    catalog_url: null,
    short_description: "Fornecedor de teste para validação do sistema.",
    long_description: "Este é um fornecedor de teste criado para validar a listagem e o gerenciamento de fornecedores no CMS.",
    status: "active",
    sort_order: 3,
    settings: { show_menu: true, show_promotions: false, show_processes: false, featured: false },
    related_processes: []
  }
];

const PROCESSES = [
  {
    name: "Torneamento",
    slug: "torneamento",
    image_url: "/assets/images/optimized/koudoe.jpg",
    short_description: "Remoção de material em peças rotativas com controle de cavaco.",
    long_description: "Soluções para operações de revolução. A RECOM oferece apoio na escolha da melhor combinação de classe e quebra-cavaco para torneamento externo, interno e rosqueamento.",
    status: "active",
    sort_order: 1
  },
  {
    name: "Fresamento",
    slug: "fresamento",
    image_url: "/assets/images/optimized/fresamento-bg.jpg",
    short_description: "Usinagem de superfícies com ferramentas rotativas de alta velocidade.",
    long_description: "Soluções de fresamento para remoção de material e acabamento. A RECOM provê as ferramentas para faceamento, esquadrejamento e fresamento de cópia.",
    status: "active",
    sort_order: 2
  }
];

async function seed() {
  const supabase = createAdminClient();

  console.log("🚀 Iniciando seeding do CMS...");

  // 1. Suppliers
  console.log("📦 Sincronizando fornecedores...");
  for (const supplier of SUPPLIERS) {
    const { error } = await supabase.from("suppliers").upsert([supplier] as any, { onConflict: 'slug' });
    if (error) console.error(`❌ Erro em ${supplier.slug}:`, error.message);
  }

  // 2. Processes
  console.log("⚙️ Sincronizando processos...");
  for (const process of PROCESSES) {
    const { error } = await supabase.from("processes").upsert([process] as any, { onConflict: 'slug' });
    if (error) console.error(`❌ Erro em ${process.slug}:`, error.message);
  }

  // 3. Home Page Content
  console.log("🏠 Sincronizando conteúdo da Home...");
  
  // Get home page ID
  const { data: homePage } = await supabase.from("pages").select("id").eq("slug", HOME_PAGE_SLUG).single();
  
  if (homePage) {
    const HOME_SECTIONS = [
      {
        page_id: homePage.id,
        component_type: "HeroSection",
        sort_order: 0,
        status: "published",
        visibility: "visible",
        props: {
          eyebrow: "RECOM INDUSTRIAL 2026",
          title: "Distribuição de Ferramentas e Atendimento Comercial",
          subtitle: "Sua produção com as melhores marcas do mundo e suporte de quem entende de usinagem.",
          primaryCtaLabel: "Falar com Atendente",
          primaryCtaHref: "/sobre#contato",
          secondaryCtaLabel: "Ver Catálogos",
          secondaryCtaHref: "/fornecedores",
          showCarousel: true,
          carouselSpeed: 6000,
          variant: "split"
        }
      },
      {
        page_id: homePage.id,
        component_type: "TrustLogos",
        sort_order: 1,
        status: "published",
        visibility: "visible",
        props: {
          title: "Parceiros Oficiais",
          showAll: true,
          grayscale: true
        }
      },
      {
        page_id: homePage.id,
        component_type: "GridSection",
        sort_order: 2,
        status: "published",
        visibility: "visible",
        props: {
          eyebrow: "POR QUE A RECOM?",
          title: "Compromisso com sua Produtividade",
          description: "Mais que vender ferramentas, entregamos resultados tangíveis no chão de fábrica.",
          columns: "3",
          variant: "white",
          items: [
            {
              title: "Suporte Direto na Fábrica",
              description: "Engenheiros de aplicação prontos para otimizar seus processos de usinagem.",
              icon: "wrench"
            },
            {
              title: "Estoque Local e Ágil",
              description: "Pronta entrega para os itens da sua produção.",
              icon: "package"
            },
            {
              title: "Procedência Garantida",
              description: "Trabalhamos apenas com marcas originais de fábrica.",
              icon: "shield"
            }
          ]
        }
      }
    ];

    // Delete existing sections to avoid duplicates
    await supabase.from("page_sections").delete().eq("page_id", homePage.id);
    const { error: secError } = await supabase.from("page_sections").insert(HOME_SECTIONS as any);
    if (secError) console.error("❌ Erro nas seções:", secError.message);
    else console.log("✅ Seções da Home sincronizadas.");
  } else {
    console.warn("⚠️ Página Home não encontrada pelo slug 'home'. Verifique a tabela pages.");
  }

  console.log("✨ Seeding finalizado!");
}

seed().catch(err => {
  console.error("💥 Erro fatal no seed:", err);
  process.exit(1);
});
