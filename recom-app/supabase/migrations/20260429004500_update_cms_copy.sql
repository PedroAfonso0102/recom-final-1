BEGIN;

UPDATE public.pages SET
title = 'A RECOM - Especialistas em Metal Duro',
seo_title = 'A RECOM | Especialistas em Metal Duro e Soluções',
seo_description = 'Nossa missão é entregar soluções de alta performance para a indústria de usinagem com segurança, confiabilidade e agilidade.',
description = 'Nossa missão é entregar soluções de alta performance para a indústria de usinagem com segurança, confiabilidade e agilidade.'
WHERE slug = 'a-recom';

UPDATE public.pages SET
title = 'Fornecedores e Catálogos Oficiais',
seo_title = 'Fornecedores Parceiros e Catálogos Oficiais',
seo_description = 'Trabalhamos apenas com marcas líderes de mercado mundial para assegurar máxima produtividade em sua usinagem.',
description = 'Trabalhamos apenas com marcas líderes de mercado mundial para assegurar máxima produtividade em sua usinagem.'
WHERE slug = 'fornecedores-catalogos';

UPDATE public.pages SET
title = 'Soluções por Aplicação',
seo_title = 'Soluções Especializadas por Aplicação | RECOM',
seo_description = 'Oferecemos as melhores ferramentas e estratégias de corte para torneamento, fresamento e furação com extrema precisão.',
description = 'Oferecemos as melhores ferramentas e estratégias de corte para torneamento, fresamento e furação com extrema precisão.'
WHERE slug = 'solucoes';

UPDATE public.pages SET
title = 'Fale Conosco',
seo_title = 'Contato e Orçamentos | RECOM',
seo_description = 'Nossa equipe técnica está pronta para analisar sua demanda e sugerir as melhores soluções.',
description = 'Nossa equipe técnica está pronta para analisar sua demanda e sugerir as melhores soluções.'
WHERE slug = 'contato';

COMMIT;
