import { Supplier } from "@/design-system/schemas/supplier.schema";
import { Process } from "@/design-system/schemas/process.schema";
import { Promotion } from "@/design-system/schemas/promotion.schema";

export const MOCK_SUPPLIERS: Supplier[] = [
  {
    id: "mitsubishi",
    name: "Mitsubishi Materials",
    slug: "mitsubishi-materials",
    logo: "/assets/images/Mitsubishi.png",
    description: "Excelência japonesa em metal duro para torneamento, fresamento e furação de alta performance.",
    catalogLink: "https://www.mmc-hardmetal.com/",
    content: {
      hero: "A RECOM atende clientes que buscam produtos da Mitsubishi Materials para aplicações em torneamento, fresamento e furação. Nesta página, você encontra o caminho para o catálogo oficial e pode falar com a equipe comercial para orientar sua solicitação.",
      resolves: {
        title: "O que a Mitsubishi Materials resolve na sua produção",
        items: [
          { label: "Alta Produtividade", description: "Classes de metal duro desenvolvidas para resistir ao calor e manter a vida útil em usinagens pesadas." },
          { label: "Precisão e Repetibilidade", description: "Geometrias de insertos que garantem o controle de cavacos e acabamento superior em diversos materiais." },
          { label: "Linhas Completas", description: "Desde ferramentas para micromecânica até pesadas operações de desbaste industrial." }
        ]
      },
      highlights: [
        { title: "Torneamento", description: "Insertos e suportes para torneamento geral, rosqueamento e canal. Tecnologia para aços, inox e superligas." },
        { title: "Fresamento", description: "Cabeçotes intercambiáveis e fresas de metal duro inteiriças. Foco em faceamento e usinagem de alta velocidade." },
        { title: "Furação", description: "Brocas de alta performance com pontas substituíveis ou inteiriças, ideais para furos profundos e precisos." }
      ],
      faq: [
        { q: "O que significa a tecnologia Miracle (VP15TF)?", a: "A cobertura Miracle é uma tecnologia proprietária da Mitsubishi que combina alta resistência ao desgaste com tenacidade, sendo a escolha 'coringa' para Inox e diversos tipos de Aço." },
        { q: "Como identificar um quebra-cavaco MA vs MP?", a: "O MA é focado em aplicações de desbaste médio a pesado, enquanto o MP é otimizado para acabamento e cortes leves com maior controle de cavaco." }
      ],
      quotationGuide: [
        "Código Completo: Ex: CNMG120408-MA VP15TF",
        "Tipo de Material: Informe se é Aço Carbono, Inox, Ferro Fundido, etc.",
        "Aplicação: Desbaste, acabamento ou operação específica.",
        "Quantidade: O tamanho do lote para cálculo de condições comerciais."
      ],
      catalogs: [
        { label: "Catálogo Geral (PDF)", link: "#" },
        { label: "Catálogo Torneamento (PDF)", link: "#" }
      ]
    }
  },
  {
    id: "7leaders",
    name: "7Leaders",
    slug: "7leaders",
    logo: "/assets/images/logo-7leaders.svg",
    description: "Especialista em fresas de metal duro de alto rendimento e ferramentas rotativas precisas.",
    catalogLink: "https://7leaders.com.br/",
    content: {
      hero: "A RECOM atende clientes que buscam produtos da 7Leaders para aplicações em fresamento, furação e ferramentas rotativas. Nesta página, você encontra o caminho para o catálogo oficial e pode falar com a equipe comercial para orientar sua solicitação.",
      resolves: {
        title: "O que a 7Leaders resolve na sua produção",
        items: [
          { label: "Desempenho em Alta Rotação", description: "Fresas e brocas com revestimentos especiais para suportar altas temperaturas e velocidades de corte." },
          { label: "Agilidade Nacional", description: "Fabricação local que permite prazos de entrega competitivos e suporte técnico ágil." },
          { label: "Ferramentas Especiais", description: "Desenvolvimento de geometrias customizadas para desafios específicos de usinagem." }
        ]
      },
      highlights: [
        { title: "Fresas de Topo", description: "Linhas para aços endurecidos, alumínio e materiais não ferrosos. Alto acabamento superficial." },
        { title: "Brocas de Metal Duro", description: "Sistemas de furação com e sem refrigeração interna, garantindo concentricidade e vida útil." },
        { title: "Alargadores", description: "Ferramentas de alta precisão para acabamento de furos com tolerâncias rigorosas." }
      ],
      quotationGuide: [
        "Diâmetro e Comprimento: Dimensões críticas da ferramenta.",
        "Número de Cortes (Z): Quantidade de facas/cortes desejada.",
        "Material a Usinar: Essencial para definir o revestimento correto.",
        "Aplicação: Ex: Acabamento de moldes, desbaste pesado, etc."
      ],
      catalogs: [
        { label: "Acessar Catálogo Técnico (PDF)", link: "#" }
      ]
    }
  },
  {
    id: "kifix",
    name: "Kifix",
    slug: "kifix",
    logo: "/assets/images/logo-kifix.png",
    description: "Líder em grampos rápidos e sistemas de fixação industrial para processos produtivos ágeis.",
    catalogLink: "https://www.kifix.com.br/",
    content: {
      hero: "A RECOM atende clientes que buscam soluções de fixação rápida da Kifix para dispositivos de montagem, solda e usinagem.",
      resolves: {
        title: "O que a Kifix resolve na sua produção",
        items: [
          { label: "Fixação Rápida", description: "Grampos manuais, pneumáticos e hidráulicos para redução de setup." },
          { label: "Segurança", description: "Mecanismos de trava que evitam aberturas acidentais durante o processo." },
          { label: "Durabilidade", description: "Componentes robustos feitos para suportar ambientes agressivos de fábrica." }
        ]
      }
    }
  },
  {
    id: "btfixo",
    name: "BT-Fixo",
    slug: "bt-fixo",
    logo: "/assets/images/logo_btfixo.png",
    description: "Soluções em acessórios de máquinas-ferramenta, mandris e sistemas de fixação de precisão.",
    catalogLink: "https://www.btfixo.com.br/",
    content: {
      hero: "A RECOM atende clientes que buscam soluções de fixação da BT Fixo para garantir a estabilidade e precisão em seus processos de usinagem.",
      resolves: {
        title: "O que a BT Fixo resolve na sua produção",
        items: [
          { label: "Estabilidade", description: "Mandris e suportes com alta força de aperto e baixo batimento (runout)." },
          { label: "Versatilidade", description: "Ampla linha de acessórios para tornos, fresadoras e centros de usinagem." }
        ]
      }
    }
  }
];

export const MOCK_PROCESSES: Process[] = [
  {
    id: "torneamento",
    name: "Torneamento",
    slug: "torneamento",
    image: "/assets/images/optimized/koudoe.jpg",
    description: "Remoção de material em peças rotativas com máxima precisão e controle de cavaco.",
    content: {
      hero: "Soluções completas para operações de revolução. A RECOM oferece suporte técnico para a escolha da melhor combinação de classe e quebra-cavaco para torneamento externo, interno e rosqueamento.",
      applications: {
        title: "Aplicações de Torneamento",
        text: "Do desbaste pesado ao acabamento de super precisão, orientamos sua produção com as melhores tecnologias:",
        items: [
          "Torneamento Geral: Ampla gama de insertos ISO para diversos materiais.",
          "Corte e Canal: Sistemas de lâminas e blocos para alta estabilidade.",
          "Rosqueamento: Perfil parcial ou completo para roscas precisas e seguras.",
          "Mandrilamento: Barras de mandrilar antivibratórias para furos profundos."
        ]
      },
      brands: [
        { name: "Mitsubishi Materials", desc: "Referência global em classes de metal duro e geometrias de quebra-cavaco." },
        { name: "BT Fixo", desc: "Soluções de fixação de ferramentas para tornos CNC e centros de torneamento." }
      ],
      faq: [
        { q: "Como escolher o quebra-cavaco?", a: "A escolha depende da profundidade de corte (ap) e do avanço (f). Quebra-cavacos de acabamento são para cortes leves." },
        { q: "O que são as classes CVD vs PVD?", a: "CVD oferece alta resistência ao desgaste térmico (torneamento contínuo). PVD oferece arestas mais afiadas e tenacidade (cortes interrompidos)." }
      ]
    }
  },
  {
    id: "fresamento",
    name: "Fresamento",
    slug: "fresamento",
    image: "/assets/images/optimized/fresamento-bg.jpg",
    description: "Usinagem de superfícies complexas com ferramentas rotativas de alta velocidade.",
    content: {
      hero: "Soluções de fresamento para alta remoção de material e acabamento superior. A RECOM provê as ferramentas ideais para faceamento, esquadrejamento e fresamento de cópia.",
      applications: {
        title: "Aplicações de Fresamento",
        text: "Otimizamos seu centro de usinagem com ferramentas de alto rendimento:",
        items: [
          "Faceamento: Cabeçotes de alto avanço para redução de tempo de ciclo.",
          "Esquadrejamento: Geometrias que garantem 90° perfeitos com excelente acabamento.",
          "Fresagem de Cópia: Soluções para moldes e matrizes com insertos redondos.",
          "Fresagem Inteiriça: Fresas de metal duro de topo para materiais endurecidos."
        ]
      },
      brands: [
        { name: "Mitsubishi Materials", desc: "Líder em fresas de alta velocidade e classes de metal duro avançadas." },
        { name: "7Leaders", desc: "Fresas inteiriças de alto rendimento com prazos de entrega competitivos." }
      ],
      faq: [
        { q: "O que é Fresamento de Alto Avanço (High Feed)?", a: "É uma técnica que utiliza pequenas profundidades de corte com altíssimos avanços por dente, focada na máxima produtividade." },
        { q: "Quando usar Fresagem Concordante vs Discordante?", a: "Na fresagem concordante (climb), a ferramenta entra no material com espessura máxima de cavaco, gerando melhor acabamento e vida útil na maioria dos casos CNC." }
      ]
    }
  },
  {
    id: "furacao",
    name: "Furação",
    slug: "furacao",
    image: "/assets/images/optimized/furacao-bg.jpg",
    description: "Criação de furos precisos com sistemas de alta estabilidade e refrigeração.",
    content: {
      hero: "Sistemas de furação de alta performance para furos curtos e profundos. Foco em estabilidade, precisão dimensional e excelente acabamento superficial.",
      applications: {
        title: "Aplicações de Furação",
        text: "Ferramentas projetadas para máxima segurança de processo:",
        items: [
          "Furação com Metal Duro Inteiriço: Alta precisão para diâmetros pequenos e médios.",
          "Brocas de Pontas Intercambiáveis: Versatilidade e economia em grandes lotes.",
          "Brocas de Insertos: Máxima remoção de material em furos de grandes diâmetros.",
          "Furação Profunda: Geometrias especiais para garantir retilineidade em longos comprimentos."
        ]
      },
      brands: [
        { name: "Mitsubishi Materials", desc: "Tecnologia de furação MWE/MWS referência mundial em estabilidade." },
        { name: "7Leaders", desc: "Brocas de metal duro com revestimentos de última geração para alta produtividade." }
      ],
      faq: [
        { q: "A refrigeração interna é obrigatória?", a: "Para furos profundos (acima de 3xD) e materiais tenazes, a refrigeração interna é crucial para a evacuação de cavacos e controle térmico." },
        { q: "Como evitar o desvio de furos profundos?", a: "O uso de uma broca piloto com diâmetro ligeiramente superior e a correta guia inicial são fundamentais para garantir a retilineidade." }
      ]
    }
  }
];

export async function getSuppliers(): Promise<Supplier[]> {
  // Simulating async fetch
  return MOCK_SUPPLIERS;
}

export async function getSupplierBySlug(slug: string): Promise<Supplier | undefined> {
  return MOCK_SUPPLIERS.find(s => s.slug === slug);
}

export async function getProcesses(): Promise<Process[]> {
  return MOCK_PROCESSES;
}

export async function getProcessBySlug(slug: string): Promise<Process | undefined> {
  return MOCK_PROCESSES.find(p => p.slug === slug);
}

export const MOCK_PROMOTIONS: Promotion[] = [
  {
    id: "promo-1",
    title: "Kit Fresamento Mitsubishi",
    slug: "kit-fresamento-mitsubishi",
    description: "Na compra de 10 insertos da linha MP, ganhe o corpo da fresa compatível.",
    startsAt: "2024-01-01T00:00:00Z",
    endsAt: "2024-05-30T23:59:59Z",
    status: "archived",
    ctaLabel: "Solicitar Kit",
    ctaUrl: "/contato"
  },
  {
    id: "promo-2",
    title: "Lote Especial Metal Duro",
    slug: "lote-especial-metal-duro",
    description: "Preços diferenciados para pedidos acima de 50 unidades de insertos para aço inox.",
    startsAt: "2024-05-01T00:00:00Z",
    endsAt: "2024-12-31T23:59:59Z",
    status: "active",
    ctaLabel: "Ver Tabela",
    ctaUrl: "/contato"
  },
  {
    id: "promo-3",
    title: "Testes Técnicos 7Leaders",
    slug: "testes-tecnicos-7leaders",
    description: "Solicite uma amostra para teste em sua produção e comprove o rendimento das novas fresas rotativas.",
    startsAt: "2024-05-01T00:00:00Z",
    endsAt: "2024-12-31T23:59:59Z",
    status: "active",
    ctaLabel: "Agendar Teste",
    ctaUrl: "/contato"
  }
];

export async function getPromotions(): Promise<Promotion[]> {
  return MOCK_PROMOTIONS;
}

export async function getPromotionBySlug(slug: string): Promise<Promotion | undefined> {
  return MOCK_PROMOTIONS.find(p => p.slug === slug);
}
