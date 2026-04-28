-- Seed editorial CMS pages from the RECOM legacy extraction package.
-- This intentionally uses governed generic components while the B2B block
-- components are being expanded.

begin;

create temp table cms_editorial_page_seed (
  slug text primary key,
  route_pattern text not null,
  title text not null,
  description text,
  template_key text not null,
  seo_title text,
  seo_description text
) on commit drop;

insert into cms_editorial_page_seed (slug, route_pattern, title, description, template_key, seo_title, seo_description)
values
  ('home', '/', 'Inicio', 'Entrada institucional e comercial da RECOM.', 'home', 'RECOM Metal Duro | Fornecedores e solucoes para usinagem', 'A RECOM organiza fornecedores, catalogos oficiais, processos de usinagem e contato comercial em Campinas.'),
  ('a-recom', '/a-recom', 'A RECOM', 'Historia, localizacao e posicionamento B2B da RECOM.', 'institutional', 'A RECOM | Distribuidor B2B em Campinas desde 1990', 'Conheca a RECOM Metal Duro, distribuidor B2B de ferramentas de corte em Campinas desde 1990.'),
  ('fornecedores-catalogos', '/fornecedores-catalogos', 'Fornecedores & Catalogos', 'Hub de fornecedores, marcas e catalogos oficiais.', 'commercial_hub', 'Fornecedores & Catalogos | RECOM', 'Acesse fornecedores atendidos pela RECOM e caminhos para catalogos oficiais de marcas como Mitsubishi Materials, 7Leaders, BT Fixo e Kifix.'),
  ('solucoes', '/solucoes', 'Solucoes / Processos', 'Navegacao por aplicacao e processo de usinagem.', 'commercial_hub', 'Solucoes / Processos de Usinagem | RECOM', 'Encontre caminhos por processo: torneamento, fresamento, furacao, fixacao e apoio comercial da RECOM.'),
  ('promocoes', '/promocoes', 'Promocoes', 'Condicoes comerciais estruturadas com validade e CTA.', 'promotion', 'Promocoes | RECOM', 'Consulte condicoes comerciais disponiveis e confirme validade e disponibilidade com a equipe RECOM.'),
  ('contato', '/contato', 'Contato / Orcamento', 'Formulario e canais diretos de atendimento comercial.', 'contact', 'Contato / Orcamento | RECOM', 'Fale com a RECOM para orcamentos, catalogos oficiais, fornecedores e orientacao para processos de usinagem.'),
  ('o-que-e-metal-duro', '/o-que-e-metal-duro', 'O que e Metal Duro?', 'Conteudo tecnico de apoio derivado do legado.', 'technical_content', 'O que e Metal Duro? | RECOM', 'Entenda de forma resumida o que e metal duro, ferramentas de corte e os principais processos de usinagem.'),
  ('seguranca', '/seguranca', 'Seguranca nas Ferramentas', 'Material tecnico de seguranca e manuseio.', 'technical_content', 'Seguranca nas Ferramentas | RECOM', 'Recomendacoes de seguranca, manuseio e uso de ferramentas de corte e metal duro.'),
  ('sugestoes-de-utilizacao', '/sugestoes-de-utilizacao', 'Sugestoes de Utilizacao', 'Boas praticas de uso, riscos e precaucoes.', 'technical_content', 'Sugestoes de Utilizacao | RECOM', 'Riscos, perigos e precaucoes para utilizacao de ferramentas de usinagem.'),
  ('videos', '/videos', 'Videos Tecnicos', 'Biblioteca tecnica derivada do acervo legado.', 'technical_content', 'Videos Tecnicos | RECOM', 'Acervo tecnico organizado por torneamento, fresamento, furacao e classes de ferramentas.');

-- Older system seeds used route paths as slugs. The app now normalizes slugs
-- without leading slashes, so remove only those generated system duplicates.
delete from public.pages
where is_system = true
  and slug in ('/', '/a-recom', '/fornecedores-catalogos', '/solucoes', '/promocoes', '/contato');

insert into public.pages (
  slug,
  route_pattern,
  title,
  description,
  page_type,
  template_key,
  is_system,
  is_dynamic_template,
  status,
  seo_title,
  seo_description,
  published_at
)
select
  slug,
  route_pattern,
  title,
  description,
  'static',
  template_key,
  true,
  false,
  'published',
  seo_title,
  seo_description,
  now()
from cms_editorial_page_seed
on conflict (slug) do update set
  route_pattern = excluded.route_pattern,
  title = excluded.title,
  description = excluded.description,
  page_type = excluded.page_type,
  template_key = excluded.template_key,
  is_system = excluded.is_system,
  is_dynamic_template = excluded.is_dynamic_template,
  status = excluded.status,
  seo_title = excluded.seo_title,
  seo_description = excluded.seo_description,
  published_at = coalesce(public.pages.published_at, excluded.published_at),
  updated_at = now();

create temp table cms_editorial_section_seed (
  slug text not null,
  sort_order integer not null,
  component_type text not null,
  anchor_id text,
  props jsonb not null
) on commit drop;

insert into cms_editorial_section_seed (slug, sort_order, component_type, anchor_id, props)
values
  (
    'home',
    0,
    'HeroSection',
    'inicio',
    jsonb_build_object(
      'eyebrow', 'Distribuidor B2B em Campinas',
      'title', 'Ferramentas de corte e catalogos para usinagem com atendimento em Campinas',
      'subtitle', 'A RECOM organiza fornecedores, processos e caminhos de contato para ajudar sua empresa a chegar a solucao certa em torneamento, fresamento, furacao e fixacao.',
      'primaryCtaLabel', 'Solicitar orcamento',
      'primaryCtaHref', '/contato',
      'secondaryCtaLabel', 'Ver fornecedores e catalogos',
      'secondaryCtaHref', '/fornecedores-catalogos',
      'showCarousel', false,
      'variant', 'industrial'
    )
  ),
  (
    'home',
    10,
    'TrustLogos',
    'fornecedores-home',
    jsonb_build_object('title', 'Fornecedores atendidos pela RECOM', 'showAll', true, 'grayscale', true)
  ),
  (
    'home',
    20,
    'GridSection',
    'caminhos',
    jsonb_build_object(
      'eyebrow', 'Como navegar',
      'title', 'Caminhos simples para fornecedores, processos e contato',
      'description', 'O site atualiza o material legado: sai a navegacao por produto generico e entram hubs claros para compra B2B.',
      'columns', '3',
      'variant', 'process',
      'items', jsonb_build_array(
        jsonb_build_object('title', 'Fornecedores & Catalogos', 'description', 'Acesse marcas atendidas pela RECOM e caminhos para materiais oficiais dos fabricantes.', 'icon', 'factory', 'linkLabel', 'Ver fornecedores', 'linkHref', '/fornecedores-catalogos'),
        jsonb_build_object('title', 'Solucoes / Processos', 'description', 'Encontre caminhos por aplicacao: torneamento, fresamento, furacao e fixacao.', 'icon', 'wrench', 'linkLabel', 'Ver processos', 'linkHref', '/solucoes'),
        jsonb_build_object('title', 'Contato / Orcamento', 'description', 'Envie codigo, aplicacao ou necessidade para a equipe retornar com mais precisao.', 'icon', 'check', 'linkLabel', 'Falar com a RECOM', 'linkHref', '/contato')
      )
    )
  ),
  (
    'home',
    30,
    'CtaSection',
    'contato-home',
    jsonb_build_object(
      'eyebrow', 'Atendimento comercial',
      'title', 'Fale com a RECOM para orientar sua solicitacao',
      'description', 'Informe marca, processo, codigo do item ou aplicacao. Quanto mais contexto, mais preciso pode ser o retorno da equipe.',
      'primaryCtaLabel', 'Enviar solicitacao',
      'primaryCtaHref', '/contato',
      'secondaryCtaLabel', 'Ver fornecedores',
      'secondaryCtaHref', '/fornecedores-catalogos',
      'variant', 'contact'
    )
  ),
  (
    'a-recom',
    0,
    'HeroSection',
    'sobre',
    jsonb_build_object(
      'eyebrow', 'Nossa trajetoria',
      'title', 'Desde 1990, a RECOM atua em Campinas com foco em ferramentas de corte',
      'subtitle', 'A empresa construiu sua trajetoria atendendo clientes industriais e aproximando compradores de fornecedores reconhecidos, catalogos e contato comercial confiavel.',
      'primaryCtaLabel', 'Entrar em contato',
      'primaryCtaHref', '/contato',
      'secondaryCtaLabel', 'Conhecer fornecedores',
      'secondaryCtaHref', '/fornecedores-catalogos',
      'showCarousel', false,
      'variant', 'simple'
    )
  ),
  (
    'a-recom',
    10,
    'TextSection',
    'historia',
    jsonb_build_object(
      'title', 'Historia e papel atual',
      'body', 'Fundada em 1990, a RECOM Metal Duro atua em Campinas no fornecimento de ferramentas de corte para usinagem.\n\nA trajetoria da empresa inclui relacionamento com Mitsubishi Carbide, MMC Metal do Brasil e Mitsubishi Materials. Esse historico deve ser tratado como prova institucional, sem transformar a RECOM em fabricante global.\n\nHoje, o site organiza fornecedores, catalogos e processos para facilitar a solicitacao comercial e o contato humano.',
      'variant', 'editorial'
    )
  ),
  (
    'a-recom',
    20,
    'GridSection',
    'provas',
    jsonb_build_object(
      'title', 'Pontos de confianca',
      'description', 'Informacoes herdadas do site atual que continuam relevantes no novo posicionamento.',
      'columns', '3',
      'variant', 'supplier',
      'items', jsonb_build_array(
        jsonb_build_object('title', 'Campinas e regiao', 'description', 'Localizacao e atendimento regional aparecem como prova forte no legado.', 'icon', 'pin'),
        jsonb_build_object('title', 'Desde 1990', 'description', 'Historico real que sustenta confianca sem exagero comercial.', 'icon', 'shield'),
        jsonb_build_object('title', 'Fornecedores reconhecidos', 'description', 'Mitsubishi Materials, 7Leaders, BT Fixo e Kifix aparecem como ativos centrais.', 'icon', 'factory')
      )
    )
  ),
  (
    'a-recom',
    30,
    'CtaSection',
    'contato-institucional',
    jsonb_build_object(
      'eyebrow', 'Proximo passo',
      'title', 'Fale com a RECOM sobre fornecedores, catalogos ou processos',
      'description', 'Use o contato para registrar uma solicitacao de orcamento, confirmar uma marca ou pedir orientacao para uma aplicacao de usinagem.',
      'primaryCtaLabel', 'Ir para contato / orcamento',
      'primaryCtaHref', '/contato',
      'secondaryCtaLabel', 'Ver fornecedores',
      'secondaryCtaHref', '/fornecedores-catalogos',
      'variant', 'quiet'
    )
  ),
  (
    'fornecedores-catalogos',
    0,
    'HeroSection',
    'fornecedores',
    jsonb_build_object(
      'eyebrow', 'Fornecedores & Catalogos',
      'title', 'Acesse fornecedores e catalogos oficiais em um so lugar',
      'subtitle', 'Escolha uma marca para acessar informacoes, caminhos para catalogos oficiais e contato da RECOM quando precisar de apoio comercial.',
      'primaryCtaLabel', 'Falar com a RECOM',
      'primaryCtaHref', '/contato',
      'secondaryCtaLabel', 'Ver processos',
      'secondaryCtaHref', '/solucoes',
      'showCarousel', false,
      'variant', 'catalog'
    )
  ),
  (
    'fornecedores-catalogos',
    10,
    'GridSection',
    'marcas',
    jsonb_build_object(
      'title', 'Marcas identificadas no legado',
      'description', 'Fornecedores que aparecem no site atual e devem ser tratados como entidades centrais do CMS.',
      'columns', '4',
      'variant', 'supplier',
      'items', jsonb_build_array(
        jsonb_build_object('title', 'Mitsubishi Materials', 'description', 'Fornecedor prioritario no historico da RECOM, com catalogos e linhas para torneamento, fresamento e furacao.', 'icon', 'factory', 'linkLabel', 'Ver fornecedor', 'linkHref', '/fornecedores-catalogos/mitsubishi'),
        jsonb_build_object('title', '7Leaders', 'description', 'Linha associada a fresas e ferramentas rotativas.', 'icon', 'factory', 'linkLabel', 'Falar sobre a marca', 'linkHref', '/contato?fornecedor=7leaders'),
        jsonb_build_object('title', 'BT Fixo', 'description', 'Acessorios, cones, porta-ferramentas e sistemas de fixacao para maquinas-ferramenta.', 'icon', 'package', 'linkLabel', 'Falar sobre a marca', 'linkHref', '/contato?fornecedor=bt-fixo'),
        jsonb_build_object('title', 'Kifix', 'description', 'Grampos e dispositivos de fixacao industrial identificados no legado.', 'icon', 'package', 'linkLabel', 'Falar sobre a marca', 'linkHref', '/contato?fornecedor=kifix')
      )
    )
  ),
  (
    'fornecedores-catalogos',
    20,
    'CtaSection',
    'catalogo-cta',
    jsonb_build_object(
      'eyebrow', 'Catalogos oficiais',
      'title', 'Precisa confirmar a linha correta?',
      'description', 'Os catalogos direcionam para materiais oficiais dos fornecedores quando disponiveis. A RECOM pode orientar a solicitacao comercial.',
      'primaryCtaLabel', 'Solicitar orientacao',
      'primaryCtaHref', '/contato',
      'secondaryCtaLabel', 'Ver processos',
      'secondaryCtaHref', '/solucoes',
      'variant', 'catalog'
    )
  ),
  (
    'solucoes',
    0,
    'HeroSection',
    'processos',
    jsonb_build_object(
      'eyebrow', 'Solucoes / Processos',
      'title', 'Encontre caminhos por aplicacao de usinagem',
      'subtitle', 'O conteudo legado de produtos foi reorganizado em processos: torneamento, fresamento, furacao e fixacao, conectando familias, fornecedores e contato.',
      'primaryCtaLabel', 'Pedir orientacao',
      'primaryCtaHref', '/contato',
      'secondaryCtaLabel', 'Ver fornecedores',
      'secondaryCtaHref', '/fornecedores-catalogos',
      'showCarousel', false,
      'variant', 'technical'
    )
  ),
  (
    'solucoes',
    10,
    'GridSection',
    'processos-grid',
    jsonb_build_object(
      'title', 'Processos extraidos do legado',
      'description', 'As paginas antigas funcionavam como indices tecnicos. No novo site, elas viram portas de entrada para decisao comercial.',
      'columns', '3',
      'variant', 'process',
      'items', jsonb_build_array(
        jsonb_build_object('title', 'Torneamento', 'description', 'Inserto de torneamento, suportes externos, mandrilhamento, canal e rosqueamento.', 'icon', 'wrench', 'linkLabel', 'Ver processo', 'linkHref', '/solucoes/torneamento'),
        jsonb_build_object('title', 'Fresamento', 'description', 'Fresas de topo, insertos, HSK, fixacao e sistemas de fresamento.', 'icon', 'wrench', 'linkLabel', 'Ver processo', 'linkHref', '/solucoes/fresamento'),
        jsonb_build_object('title', 'Furacao', 'description', 'Brocas WSTAR, sistemas inteiricos, soldados e intercambiaveis.', 'icon', 'wrench', 'linkLabel', 'Ver processo', 'linkHref', '/solucoes/furacao')
      )
    )
  ),
  (
    'solucoes',
    20,
    'TextSection',
    'familias-tecnicas',
    jsonb_build_object(
      'title', 'Familias e termos para evolucao do CMS',
      'body', 'O inventario legado tambem identifica fixacao, porta-ferramentas, cones, rosqueamento, mandrilamento, canal externo, small tools, brocas WSTAR e ferramentas HSK.\n\nEsses termos devem alimentar relacoes entre processos, fornecedores e conteudos tecnicos, sem virar catalogo proprio de SKUs.',
      'variant', 'technical'
    )
  ),
  (
    'promocoes',
    0,
    'HeroSection',
    'promocoes',
    jsonb_build_object(
      'eyebrow', 'Condicoes comerciais',
      'title', 'Promocoes com validade, condicao e contato claro',
      'subtitle', 'O legado usava promocao em imagem. No CMS, cada oferta deve ter titulo, fornecedor, condicao, validade, termos e CTA acessivel.',
      'primaryCtaLabel', 'Consultar disponibilidade',
      'primaryCtaHref', '/contato?origem=promocoes',
      'secondaryCtaLabel', 'Solicitar orcamento',
      'secondaryCtaHref', '/contato',
      'showCarousel', false,
      'variant', 'catalog'
    )
  ),
  (
    'promocoes',
    10,
    'TextSection',
    'promocao-legado',
    jsonb_build_object(
      'title', 'Promocao legada identificada',
      'body', 'O site legado mostra uma promocao de suporte para canal externo em imagem, com medidas, codigos de exemplo e condicao associada a insertos GY2M Mitsubishi.\n\nAntes de publicar como promocao ativa, confirme validade, preco, fornecedor, codigos e termos. Texto promocional nao deve ficar apenas dentro de imagem.',
      'variant', 'note'
    )
  ),
  (
    'promocoes',
    20,
    'CtaSection',
    'promocoes-contato',
    jsonb_build_object(
      'eyebrow', 'Confirmacao comercial',
      'title', 'Consulte validade e disponibilidade com a RECOM',
      'description', 'Promocoes podem ter disponibilidade limitada. A equipe confirma condicao, prazo e aplicacao correta antes da cotacao.',
      'primaryCtaLabel', 'Consultar disponibilidade',
      'primaryCtaHref', '/contato?origem=promocoes',
      'secondaryCtaLabel', 'Ver fornecedores',
      'secondaryCtaHref', '/fornecedores-catalogos',
      'variant', 'contact'
    )
  ),
  (
    'contato',
    0,
    'HeroSection',
    'contato',
    jsonb_build_object(
      'eyebrow', 'Contato / Orcamento',
      'title', 'Envie sua necessidade para a equipe RECOM',
      'subtitle', 'Informe fornecedor, processo, codigo do item ou aplicacao. Quanto mais contexto, mais precisa pode ser a resposta comercial.',
      'primaryCtaLabel', 'Preencher formulario',
      'primaryCtaHref', '#formulario',
      'secondaryCtaLabel', 'Ver fornecedores',
      'secondaryCtaHref', '/fornecedores-catalogos',
      'showCarousel', false,
      'variant', 'contact'
    )
  ),
  (
    'contato',
    10,
    'TextSection',
    'formulario',
    jsonb_build_object(
      'title', 'Campos recomendados para o formulario',
      'body', 'Nome, empresa, e-mail, telefone/WhatsApp, fornecedor de interesse, processo de interesse, codigo do item, mensagem e anexo opcional.\n\nMicrocopy recomendada: envie sua necessidade, aplicacao ou codigo do item. Quanto mais contexto, mais precisa pode ser a resposta da equipe.',
      'variant', 'editorial'
    )
  ),
  (
    'contato',
    20,
    'GridSection',
    'canais',
    jsonb_build_object(
      'title', 'Canais e dados herdados do legado',
      'description', 'Centralizar estes dados em site_settings e evitar duplicacao manual nos blocos.',
      'columns', '3',
      'variant', 'technical',
      'items', jsonb_build_array(
        jsonb_build_object('title', 'Telefone', 'description', '(19) 3233-2224 e (19) 3232-6935 aparecem no legado.', 'icon', 'check'),
        jsonb_build_object('title', 'E-mail', 'description', 'vendas.recom@montelione.com.br aparece como e-mail comercial do legado.', 'icon', 'check'),
        jsonb_build_object('title', 'Endereco', 'description', 'Rua Alferes Joao Jose, 350 - Jardim Chapadao, Campinas - SP.', 'icon', 'pin')
      )
    )
  ),
  (
    'o-que-e-metal-duro',
    0,
    'HeroSection',
    'metal-duro',
    jsonb_build_object(
      'eyebrow', 'Conteudo tecnico de apoio',
      'title', 'O que e metal duro e como ele se conecta a usinagem',
      'subtitle', 'Resumo editorial do material legado: ferramentas de corte, producao de cavacos, insertos, suportes e os principais processos industriais.',
      'primaryCtaLabel', 'Falar com a RECOM',
      'primaryCtaHref', '/contato',
      'secondaryCtaLabel', 'Ver processos',
      'secondaryCtaHref', '/solucoes',
      'showCarousel', false,
      'variant', 'technical'
    )
  ),
  (
    'o-que-e-metal-duro',
    10,
    'TextSection',
    'conteudo',
    jsonb_build_object(
      'title', 'Resumo do conteudo legado',
      'body', 'O material explica que ferramentas de corte removem material por corte e producao de cavacos. No contexto industrial, ferramentas de metal duro usam carboneto de tungstenio e cobalto, passam por prensagem e sinterizacao e oferecem alta dureza.\n\nOs tres processos principais apresentados sao torneamento, fresamento e furacao. O conteudo deve ser mantido como apoio tecnico, condensado e com fonte clara: Mitsubishi Materials.',
      'variant', 'technical'
    )
  ),
  (
    'seguranca',
    0,
    'HeroSection',
    'seguranca',
    jsonb_build_object(
      'eyebrow', 'Seguranca e manuseio',
      'title', 'Boas praticas para ferramentas de corte e metal duro',
      'subtitle', 'Conteudo tecnico de apoio sobre riscos, manuseio, componentes e recomendacoes de uso. Deve ser revisado antes de publicacao operacional.',
      'primaryCtaLabel', 'Pedir orientacao',
      'primaryCtaHref', '/contato',
      'secondaryCtaLabel', 'Ver processos',
      'secondaryCtaHref', '/solucoes',
      'showCarousel', false,
      'variant', 'technical'
    )
  ),
  (
    'seguranca',
    10,
    'TextSection',
    'recomendacoes',
    jsonb_build_object(
      'title', 'Temas extraidos',
      'body', 'O legado cita ligas de metal duro, cermet, ceramica, CBN sinterizado e diamante sinterizado. Tambem aborda dureza elevada, peso especifico, componentes como W, Ti, Al, Si, Ta, B, Co, Ni, Cr e Mo, alem de cuidados com choque, aperto excessivo, armazenamento, corrosao, afiacao, poeira, trincas e descarte.\n\nEste material precisa de fonte, data de revisao e linguagem organizada.',
      'variant', 'technical'
    )
  ),
  (
    'sugestoes-de-utilizacao',
    0,
    'HeroSection',
    'sugestoes',
    jsonb_build_object(
      'eyebrow', 'Uso e precaucao',
      'title', 'Sugestoes de utilizacao para ferramentas de usinagem',
      'subtitle', 'Tabela editorial derivada do legado: produto, perigo e precaucao para diferentes classes de ferramentas.',
      'primaryCtaLabel', 'Falar com a RECOM',
      'primaryCtaHref', '/contato',
      'secondaryCtaLabel', 'Ver seguranca',
      'secondaryCtaHref', '/seguranca',
      'showCarousel', false,
      'variant', 'technical'
    )
  ),
  (
    'sugestoes-de-utilizacao',
    10,
    'GridSection',
    'riscos',
    jsonb_build_object(
      'title', 'Riscos e precaucoes recorrentes',
      'description', 'Conteudo denso do legado reorganizado para leitura escaneavel.',
      'columns', '3',
      'variant', 'technical',
      'items', jsonb_build_array(
        jsonb_build_object('title', 'Arestas e cavacos', 'description', 'Arestas afiadas, cavacos quentes e pecas quentes exigem EPI e atencao operacional.', 'icon', 'shield'),
        jsonb_build_object('title', 'Quebra e estilhacos', 'description', 'Dados de corte inadequados, desgaste excessivo ou fixacao incorreta podem gerar quebra.', 'icon', 'shield'),
        jsonb_build_object('title', 'Vibracao e fixacao', 'description', 'Falta de balanceamento, sons anormais e ferramentas fora de recomendacao exigem correcao antes do uso.', 'icon', 'shield')
      )
    )
  ),
  (
    'videos',
    0,
    'HeroSection',
    'videos',
    jsonb_build_object(
      'eyebrow', 'Acervo tecnico',
      'title', 'Videos tecnicos por processo e familia',
      'subtitle', 'O legado lista videos de torneamento, fresamento, furacao e classes. Mantenha apenas links ativos e com contexto editorial.',
      'primaryCtaLabel', 'Pedir material tecnico',
      'primaryCtaHref', '/contato',
      'secondaryCtaLabel', 'Ver processos',
      'secondaryCtaHref', '/solucoes',
      'showCarousel', false,
      'variant', 'technical'
    )
  ),
  (
    'videos',
    10,
    'GridSection',
    'biblioteca',
    jsonb_build_object(
      'title', 'Categorias identificadas',
      'description', 'O acervo deve ser validado antes de entrar como biblioteca publica ativa.',
      'columns', '4',
      'variant', 'technical',
      'items', jsonb_build_array(
        jsonb_build_object('title', 'Torneamento', 'description', 'Linha UE, quebra-cavacos, barras de mandrilar e small tools.', 'icon', 'wrench'),
        jsonb_build_object('title', 'Fresamento', 'description', 'AQX, ASX400, BXD, AJX, DLC, SRM2, APX e outras familias.', 'icon', 'wrench'),
        jsonb_build_object('title', 'Furacao', 'description', 'Sistema de furacao inteirica, WSTAR, TAF e TAW.', 'icon', 'wrench'),
        jsonb_build_object('title', 'Classes', 'description', 'CBN, MB710/MB730, UC5105/UC5115 e MB8025/MB810/MB835.', 'icon', 'package')
      )
    )
  );

delete from public.page_sections ps
using public.pages p
where ps.page_id = p.id
  and p.slug in (select slug from cms_editorial_page_seed);

insert into public.page_sections (
  page_id,
  component_type,
  props,
  sort_order,
  status,
  visibility,
  anchor_id
)
select
  p.id,
  s.component_type,
  s.props,
  s.sort_order,
  'published',
  'visible',
  s.anchor_id
from cms_editorial_section_seed s
join public.pages p on p.slug = s.slug
order by s.slug, s.sort_order;

commit;
