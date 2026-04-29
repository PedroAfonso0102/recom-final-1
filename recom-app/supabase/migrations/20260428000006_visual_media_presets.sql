-- Governed visual presets for the editorial CMS seed.

begin;

update public.page_sections ps
set props = props || jsonb_build_object(
  'backgroundPreset', 'image-dark-overlay',
  'backgroundImageUrl', '/assets/images/hero-industrial.png',
  'backgroundPosition', 'center',
  'overlayStrength', 60,
  'overlayTone', 'steel',
  'layoutPreset', 'split',
  'showCarousel', false,
  'imageUrl', '/assets/images/recom-editorial-1.jpg'
)
from public.pages p
where p.id = ps.page_id and p.slug = 'home' and ps.anchor_id = 'inicio';

update public.page_sections ps
set props = props || jsonb_build_object(
  'backgroundPreset', 'solid-light',
  'gridPreset', 'three-columns',
  'gridGap', 'normal',
  'mediaMode', 'thumbnail',
  'cardVariant', 'industrial',
  'cardDensity', 'normal',
  'items', jsonb_build_array(
    jsonb_build_object('title', 'Fornecedores & Catalogos', 'description', 'Acesse marcas atendidas pela RECOM e caminhos para materiais oficiais dos fabricantes.', 'icon', 'factory', 'linkLabel', 'Ver fornecedores', 'linkHref', '/fornecedores-catalogos', 'imageUrl', '/assets/images/tools-catalog.png', 'imageAlt', 'Catalogos e ferramentas de corte', 'imagePosition', 'center'),
    jsonb_build_object('title', 'Solucoes / Processos', 'description', 'Encontre caminhos por aplicacao: torneamento, fresamento, furacao e fixacao.', 'icon', 'wrench', 'linkLabel', 'Ver processos', 'linkHref', '/solucoes', 'imageUrl', '/assets/images/images_legacy/editorial/torno-fresa-furacao.png', 'imageAlt', 'Processos de torneamento, fresamento e furacao', 'imagePosition', 'center'),
    jsonb_build_object('title', 'Contato / Orcamento', 'description', 'Envie codigo, aplicacao ou necessidade para a equipe retornar com mais precisao.', 'icon', 'check', 'linkLabel', 'Falar com a RECOM', 'linkHref', '/contato', 'imageUrl', '/assets/images/escritorio.jpg', 'imageAlt', 'Atendimento comercial RECOM', 'imagePosition', 'center')
  )
)
from public.pages p
where p.id = ps.page_id and p.slug = 'home' and ps.anchor_id = 'caminhos';

update public.page_sections ps
set props = props || jsonb_build_object(
  'backgroundPreset', 'image-dark-overlay',
  'backgroundImageUrl', '/assets/images/recom-editorial-2.jpg',
  'backgroundPosition', 'center',
  'overlayStrength', 60,
  'overlayTone', 'black'
)
from public.pages p
where p.id = ps.page_id and p.slug = 'a-recom' and ps.anchor_id = 'sobre';

update public.page_sections ps
set props = props || jsonb_build_object(
  'backgroundPreset', 'solid-light',
  'gridPreset', 'four-columns',
  'gridGap', 'normal',
  'mediaMode', 'logo',
  'cardVariant', 'catalog',
  'cardDensity', 'compact',
  'mobileBehavior', 'carousel',
  'items', jsonb_build_array(
    jsonb_build_object('title', 'Mitsubishi Materials', 'description', 'Fornecedor prioritario no historico da RECOM, com catalogos e linhas para torneamento, fresamento e furacao.', 'icon', 'factory', 'linkLabel', 'Ver fornecedor', 'linkHref', '/fornecedores-catalogos/mitsubishi', 'imageUrl', '/assets/images/MITSUBISHI_MATERIALS_BRASIL_Colour_RGB.svg', 'imageAlt', 'Mitsubishi Materials'),
    jsonb_build_object('title', '7Leaders', 'description', 'Linha associada a fresas e ferramentas rotativas.', 'icon', 'factory', 'linkLabel', 'Falar sobre a marca', 'linkHref', '/contato?fornecedor=7leaders', 'imageUrl', '/assets/images/logo-7leaders.svg', 'imageAlt', '7Leaders'),
    jsonb_build_object('title', 'BT Fixo', 'description', 'Acessorios, cones, porta-ferramentas e sistemas de fixacao para maquinas-ferramenta.', 'icon', 'package', 'linkLabel', 'Falar sobre a marca', 'linkHref', '/contato?fornecedor=bt-fixo', 'imageUrl', '/assets/images/logo_btfixo.png', 'imageAlt', 'BT Fixo'),
    jsonb_build_object('title', 'Kifix', 'description', 'Grampos e dispositivos de fixacao industrial identificados no legado.', 'icon', 'package', 'linkLabel', 'Falar sobre a marca', 'linkHref', '/contato?fornecedor=kifix', 'imageUrl', '/assets/images/logo-kifix.png', 'imageAlt', 'Kifix')
  )
)
from public.pages p
where p.id = ps.page_id and p.slug = 'fornecedores-catalogos' and ps.anchor_id = 'marcas';

update public.page_sections ps
set props = props || jsonb_build_object(
  'backgroundPreset', 'technical-grid',
  'gridPreset', 'three-columns',
  'gridGap', 'normal',
  'mediaMode', 'cover',
  'cardVariant', 'technical',
  'cardDensity', 'normal',
  'items', jsonb_build_array(
    jsonb_build_object('title', 'Torneamento', 'description', 'Inserto de torneamento, suportes externos, mandrilhamento, canal e rosqueamento.', 'icon', 'wrench', 'linkLabel', 'Ver processo', 'linkHref', '/solucoes/torneamento', 'imageUrl', '/assets/images/images_legacy/torneamento1.jpg', 'imageAlt', 'Ferramentas para torneamento', 'imagePosition', 'center'),
    jsonb_build_object('title', 'Fresamento', 'description', 'Fresas de topo, insertos, HSK, fixacao e sistemas de fresamento.', 'icon', 'wrench', 'linkLabel', 'Ver processo', 'linkHref', '/solucoes/fresamento', 'imageUrl', '/assets/images/images_legacy/fresamento1.jpg', 'imageAlt', 'Ferramentas para fresamento', 'imagePosition', 'center'),
    jsonb_build_object('title', 'Furacao', 'description', 'Brocas WSTAR, sistemas inteiricos, soldados e intercambiaveis.', 'icon', 'wrench', 'linkLabel', 'Ver processo', 'linkHref', '/solucoes/furacao', 'imageUrl', '/assets/images/images_legacy/furacao1.jpg', 'imageAlt', 'Ferramentas para furacao', 'imagePosition', 'center')
  )
)
from public.pages p
where p.id = ps.page_id and p.slug = 'solucoes' and ps.anchor_id = 'processos-grid';

update public.page_sections ps
set props = props || jsonb_build_object(
  'backgroundPreset', 'image-red-overlay',
  'backgroundImageUrl', '/assets/images/images_legacy/promocao1410-2.jpg',
  'backgroundPosition', 'center',
  'overlayStrength', 80,
  'overlayTone', 'black'
)
from public.pages p
where p.id = ps.page_id and p.slug = 'promocoes' and ps.anchor_id = 'promocoes';

update public.page_sections ps
set props = props || jsonb_build_object(
  'backgroundPreset', 'solid-light',
  'gridPreset', 'three-columns',
  'gridGap', 'normal',
  'mediaMode', 'thumbnail',
  'cardVariant', 'promotion',
  'items', jsonb_build_array(
    jsonb_build_object('title', 'Promocao legada em imagem', 'description', 'Material antigo identificado. Confirmar validade, preco, codigos e termos antes de publicar como oferta ativa.', 'icon', 'package', 'linkLabel', 'Consultar disponibilidade', 'linkHref', '/contato?promocao=suporte-canal-externo', 'imageUrl', '/assets/images/images_legacy/promocao1410-2.jpg', 'imageAlt', 'Promocao legada de suporte para canal externo', 'imagePosition', 'top')
  )
)
from public.pages p
where p.id = ps.page_id and p.slug = 'promocoes' and ps.anchor_id = 'promocao-legado';

update public.page_sections ps
set props = props || jsonb_build_object(
  'backgroundPreset', 'solid-light',
  'gridPreset', 'three-columns',
  'mediaMode', 'none',
  'cardVariant', 'industrial'
)
from public.pages p
where p.id = ps.page_id and p.slug = 'contato' and ps.anchor_id = 'canais';

commit;

