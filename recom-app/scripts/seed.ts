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
    short_description: 'Ferramentas Mitsubishi Materials: insertos, fresas e brocas originais com entrega ágil.',
    long_description: `A Mitsubishi Materials é referência mundial em metal duro. Sua linha abrange torneamento, fresamento e furação com tecnologia para produtividade industrial em aços, inox e ferro fundido.

A RECOM atende clientes que buscam produtos Mitsubishi originais. Nossa equipe comercial orienta na escolha do inserto e quebra-cavaco ideais para o seu material e máquina.`,
    sort_order: 1,
    seo_title: 'Mitsubishi Materials | Ferramentas de Corte em Campinas - RECOM',
    seo_description: 'Distribuidor Mitsubishi Materials em Campinas. Insertos, fresas e brocas com atendimento direto e pronta entrega.',
  },
  {
    name: '7Leaders',
    slug: '7leaders',
    logo_url: '/assets/images/logo-7leaders.svg',
    catalog_url: 'https://7leaders.com.br/',
    short_description: 'Fresas de metal duro 7Leaders: alto rendimento para moldes e matrizes.',
    long_description: `A 7Leaders foca no desenvolvimento de ferramentas rotativas de metal duro. Suas fresas inteiriças oferecem ótimo custo-benefício e qualidade para operações que exigem acabamento fino.

A RECOM distribui a linha completa 7Leaders, com foco em fresas de topo e ferramentas para usinagem de alta velocidade. Atendimento local para seleção de parâmetros de corte.`,
    sort_order: 2,
    seo_title: '7Leaders | Fresas de Metal Duro em Campinas - RECOM',
    seo_description: 'Distribuidor 7Leaders em Campinas. Fresas inteiriças de metal duro com atendimento comercial e pronta entrega.',
  },
  {
    name: 'BT-Fixo',
    slug: 'bt-fixo',
    logo_url: '/assets/images/logo_btfixo.png',
    catalog_url: 'https://www.btfixo.com.br/',
    short_description: 'Acessórios BT-Fixo: mandris, pinças e fixação para máquinas CNC.',
    long_description: `A BT-Fixo fornece acessórios essenciais para máquinas CNC. Sua linha inclui mandris, portaferramentas, pinças e sistemas de fixação que garantem estabilidade para o seu processo.

Com a BT-Fixo, a RECOM oferece itens de setup e fixação que reduzem o tempo de máquina parada e aumentam a segurança da operação.`,
    sort_order: 3,
    seo_title: 'BT-Fixo | Acessórios para CNC em Campinas - RECOM',
    seo_description: 'Distribuidor BT-Fixo em Campinas. Mandris, portaferramentas e sistemas de fixação originais.',
  },
  {
    name: 'Kifix',
    slug: 'kifix',
    logo_url: null,
    catalog_url: null,
    short_description: 'Fixação industrial Kifix: grampos e dispositivos de aperto rápido.',
    long_description: `A Kifix desenvolve sistemas de fixação para uso industrial. Seus produtos incluem grampos e dispositivos de aperto rápido que garantem segurança e agilidade na montagem e usinagem.

A RECOM oferece a linha Kifix para atender necessidades de gabaritos e dispositivos de fixação em células de produção.`,
    sort_order: 4,
    seo_title: 'Kifix | Fixação Industrial em Campinas - RECOM',
    seo_description: 'Distribuidor Kifix em Campinas. Sistemas de aperto rápido para montagem e usinagem.',
  },
  {
    name: 'PEDRO AFONSO TESTE',
    slug: 'pedro-afonso-teste',
    logo_url: null,
    catalog_url: null,
    short_description: 'Fornecedor de teste para validação do sistema.',
    long_description: 'Este é um fornecedor de teste criado para validar a listagem e o gerenciamento de fornecedores no CMS.',
    sort_order: 5,
    seo_title: 'Pedro Afonso Teste | Fornecedor de Teste - RECOM',
    seo_description: 'Fornecedor de teste para validação de sistemas.',
  },
];

const processes = [
  {
    name: 'Torneamento',
    slug: 'torneamento',
    image_url: '/assets/images/optimized/koudoe.jpg',
    short_description: 'Ferramentas para torneamento: insertos e suportes com controle de cavaco.',
    long_description: `O torneamento é a base da usinagem industrial. A RECOM fornece ferramentas para gerar geometrias de revolução com controle e previsibilidade.

Oferecemos apoio comercial para otimizar operações de torneamento externo, interno, rosqueamento e mandrilamento. Trabalhamos com insertos e suportes para cada tipo de material e máquina.`,
    sort_order: 1,
    seo_title: 'Torneamento | Ferramentas para Torno CNC em Campinas - RECOM',
    seo_description: 'Linha completa para torneamento: insertos e suportes Mitsubishi Materials. Atendimento direto RECOM em Campinas.',
  },
  {
    name: 'Fresamento',
    slug: 'fresamento',
    image_url: '/assets/images/optimized/fresamento-bg.jpg',
    short_description: 'Fresas e cabeçotes para remoção de material e acabamento.',
    long_description: `Ferramentas para gerar superfícies planas, contornos e detalhes em moldes. A RECOM atende demandas de fresamento de faceamento, esquadrejamento e cópia 3D.

Contamos com a linha Mitsubishi Materials e 7Leaders para desbaste pesado e acabamento fino em diversos materiais.`,
    sort_order: 2,
    seo_title: 'Fresamento | Fresas e Cabeçotes em Campinas - RECOM',
    seo_description: 'Ferramentas para fresamento CNC: cabeçotes, fresas inteiriças e insertos Mitsubishi e 7Leaders. RECOM Campinas.',
  },
  {
    name: 'Furação',
    slug: 'furacao',
    image_url: '/assets/images/optimized/furacao-bg.jpg',
    short_description: 'Brocas e sistemas de furação para furos precisos e estáveis.',
    long_description: `A furação exige ferramentas que garantam a retilineidade e o acabamento do furo. A RECOM oferece brocas de metal duro inteiriço, pontas intercambiáveis e brocas de insertos.

Trabalhamos com itens que possuem refrigeração interna para maior vida útil e evacuação eficiente de cavacos em furos profundos.`,
    sort_order: 3,
    seo_title: 'Furação | Brocas de Metal Duro em Campinas - RECOM',
    seo_description: 'Brocas inteiriças, pontas intercambiáveis e insertos Mitsubishi Materials. RECOM Campinas.',
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
