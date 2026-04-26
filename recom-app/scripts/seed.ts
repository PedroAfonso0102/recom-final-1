// Seed via pg (node-postgres) — conexão direta ao PostgreSQL local
// Bypassa o RLS completamente pois conecta como superusuário postgres
import { Client } from 'pg';

const client = new Client({
  host: '127.0.0.1',
  port: 54322,
  database: 'postgres',
  user: 'postgres',
  password: 'postgres',
});

const suppliers = [
  {
    name: 'Mitsubishi Materials',
    slug: 'mitsubishi-materials',
    logo_url: '/assets/images/Mitsubishi.png',
    catalog_url: 'https://www.mmc-hardmetal.com/',
    short_description: 'Excelência japonesa em metal duro para torneamento, fresamento e furação de alta performance.',
    long_description: `A Mitsubishi Materials Corporation é uma das maiores fabricantes mundiais de ferramentas de corte em metal duro. Com mais de 100 anos de experiência, a empresa desenvolve tecnologias avançadas de cobertura (como o revestimento Miracle) e geometrias de quebra-cavaco para maximizar a vida útil e a performance em usinagem de aços, inox, ferro fundido e superligas.

A RECOM atende clientes que buscam produtos da Mitsubishi Materials para aplicações em torneamento, fresamento e furação. Nossa equipe comercial orienta na escolha do inserto, classe e quebra-cavaco ideais para cada material e condição de corte.`,
    sort_order: 1,
    seo_title: 'Mitsubishi Materials | Ferramentas de Corte em Metal Duro - RECOM',
    seo_description: 'Distribuidor oficial Mitsubishi Materials em Campinas. Insertos, fresas e brocas com suporte técnico especializado.',
  },
  {
    name: '7Leaders',
    slug: '7leaders',
    logo_url: '/assets/images/logo-7leaders.svg',
    catalog_url: 'https://7leaders.com.br/',
    short_description: 'Especialista em fresas de metal duro de alto rendimento e ferramentas rotativas precisas.',
    long_description: `A 7Leaders é uma empresa brasileira focada no desenvolvimento e fabricação de ferramentas rotativas de metal duro de alta performance. Suas fresas inteiriças se destacam pelo custo-benefício competitivo e pela qualidade dos revestimentos aplicados.

A RECOM distribui a linha completa 7Leaders, com foco em fresas de topo, fresas de canto reto, fresas de alto avanço e ferramentas especiais. Suporte técnico local para seleção de parâmetros de corte e geometrias.`,
    sort_order: 2,
    seo_title: '7Leaders | Fresas de Metal Duro - RECOM Campinas',
    seo_description: 'Distribuidor 7Leaders em Campinas. Fresas inteiriças de metal duro com suporte técnico e pronta entrega.',
  },
  {
    name: 'BT-Fixo',
    slug: 'bt-fixo',
    logo_url: '/assets/images/logo_btfixo.png',
    catalog_url: 'https://www.btfixo.com.br/',
    short_description: 'Soluções em acessórios de máquinas-ferramenta, mandris e sistemas de fixação de precisão.',
    long_description: `A BT-Fixo é referência nacional em acessórios para máquinas-ferramenta CNC. Sua linha inclui mandris hidráulicos, portaferramentas térmicos, buchas de precisão, divisores e sistemas de fixação para tornos e centros de usinagem.

Com a BT-Fixo, a RECOM oferece soluções completas de setup e fixação, reduzindo o tempo de troca de ferramentas e aumentando a rigidez do sistema porta-ferramenta.`,
    sort_order: 3,
    seo_title: 'BT-Fixo | Fixação e Acessórios para CNC - RECOM',
    seo_description: 'Distribuidor BT-Fixo em Campinas. Mandris, portaferramentas e sistemas de fixação para tornos e centros de usinagem.',
  },
  {
    name: 'Kifix',
    slug: 'kifix',
    logo_url: null,
    catalog_url: null,
    short_description: 'Ferramentas de fixação e sistemas de aperto de alta confiabilidade para usinagem industrial.',
    long_description: `A Kifix desenvolve sistemas de fixação especializados para uso em ambientes industriais de alta exigência. Seus produtos incluem prendedores, braçadeiras e sistemas de aperto rápido que garantem a repetibilidade e a segurança no processo produtivo.

A RECOM oferece a linha Kifix como complemento às soluções de fixação BT-Fixo, cobrindo necessidades específicas de gabaritos, fixtures e dispositivos de fixação customizados.`,
    sort_order: 4,
    seo_title: 'Kifix | Sistemas de Fixação Industrial - RECOM',
    seo_description: 'Distribuidor Kifix em Campinas. Sistemas de fixação e aperto rápido para usinagem industrial.',
  },
];

const processes = [
  {
    name: 'Torneamento',
    slug: 'torneamento',
    image_url: '/assets/images/optimized/koudoe.jpg',
    short_description: 'Remoção de material em peças rotativas com máxima precisão e controle de cavaco.',
    long_description: `O torneamento é um dos processos de usinagem mais fundamentais da indústria metalomecânica. Nele, a peça gira enquanto a ferramenta de corte avança, removendo material de forma controlada para gerar geometrias de revolução.

A RECOM oferece suporte técnico completo para otimizar operações de torneamento externo, interno, radial (facear), rosqueamento e mandrilamento. Trabalhamos com as melhores classes de insertos e quebra-cavacos para cada material e condição de corte.

Por que investir em ferramentas de qualidade para torneamento? Insertos de alta performance reduzem o tempo de ciclo, aumentam a vida útil da ferramenta e garantem melhor controle dimensional e de acabamento superficial.`,
    sort_order: 1,
    seo_title: 'Torneamento | Ferramentas de Corte para Tornos CNC - RECOM',
    seo_description: 'Soluções completas para torneamento: insertos, suportes e quebra-cavacos Mitsubishi Materials. Suporte técnico RECOM em Campinas.',
  },
  {
    name: 'Fresamento',
    slug: 'fresamento',
    image_url: '/assets/images/optimized/fresamento-bg.jpg',
    short_description: 'Usinagem de superfícies complexas com ferramentas rotativas de alta velocidade.',
    long_description: `O fresamento é o processo de usinagem mais versátil, utilizado para gerar superfícies planas, contornadas, perfis complexos e detalhes de moldes e matrizes. Diferente do torneamento, no fresamento a ferramenta rotaciona enquanto a peça avança.

A RECOM atende demandas de fresamento de faceamento, esquadrejamento, cópia 3D, fresagem de alto avanço (High Feed Milling) e fresagem inteiriça. Contamos com a linha completa Mitsubishi Materials e 7Leaders para cobrir desde operações de desbaste até acabamento fino.

Fresagem de Alto Avanço (HFM): utiliza pequenas profundidades de corte axial com altíssimos avanços por dente, resultando em forças direcionadas axialmente ao eixo, reduzindo vibrações e maximizando a taxa de remoção de material.`,
    sort_order: 2,
    seo_title: 'Fresamento | Fresas e Cabeçotes de Alta Performance - RECOM',
    seo_description: 'Ferramentas para fresamento CNC: cabeçotes intercambiáveis, fresas inteiriças e insertos Mitsubishi e 7Leaders. RECOM Campinas.',
  },
  {
    name: 'Furação',
    slug: 'furacao',
    image_url: '/assets/images/optimized/furacao-bg.jpg',
    short_description: 'Criação de furos precisos com sistemas de alta estabilidade e refrigeração.',
    long_description: `A furação é um processo crítico em qualquer célula de usinagem. A precisão dimensional, a retilineidade e o acabamento interno do furo dependem diretamente da qualidade da ferramenta e dos parâmetros de corte utilizados.

A RECOM oferece soluções para furação com metal duro inteiriço (para diâmetros menores com alta precisão), brocas de pontas intercambiáveis (para versatilidade em lotes maiores) e brocas de insertos (para grandes diâmetros e máxima remoção de material).

Refrigeração interna: para furos com profundidade acima de 3×D, a refrigeração interna é essencial. Ela garante a evacuação eficiente dos cavacos, controla a temperatura na aresta de corte e aumenta a vida útil da ferramenta.`,
    sort_order: 3,
    seo_title: 'Furação | Brocas de Metal Duro e Sistemas de Alta Performance - RECOM',
    seo_description: 'Soluções de furação: brocas inteiriças, pontas intercambiáveis e insertos Mitsubishi Materials. RECOM Campinas.',
  },
];

async function seed() {
  await client.connect();
  console.log('✅ Conectado ao PostgreSQL local\n');

  try {
    await client.query('BEGIN');

    // Limpa dados existentes
    console.log('🗑️  Limpando dados...');
    await client.query('DELETE FROM suppliers');
    await client.query('DELETE FROM processes');

    // Insere fornecedores
    console.log('📦 Inserindo fornecedores...');
    for (const s of suppliers) {
      await client.query(
        `INSERT INTO suppliers (name, slug, logo_url, catalog_url, short_description, long_description, status, sort_order, seo_title, seo_description)
         VALUES ($1,$2,$3,$4,$5,$6,'active',$7,$8,$9)`,
        [s.name, s.slug, s.logo_url, s.catalog_url, s.short_description, s.long_description, s.sort_order, s.seo_title, s.seo_description]
      );
      console.log(`  ✅ ${s.name}`);
    }

    // Insere processos
    console.log('\n⚙️  Inserindo processos...');
    for (const p of processes) {
      await client.query(
        `INSERT INTO processes (name, slug, image_url, short_description, long_description, status, sort_order, seo_title, seo_description)
         VALUES ($1,$2,$3,$4,$5,'active',$6,$7,$8)`,
        [p.name, p.slug, p.image_url, p.short_description, p.long_description, p.sort_order, p.seo_title, p.seo_description]
      );
      console.log(`  ✅ ${p.name}`);
    }

    await client.query('COMMIT');
    console.log('\n🎉 Seed concluído com sucesso!');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('❌ Erro — rollback efetuado:', err);
  } finally {
    await client.end();
  }
}

seed();
