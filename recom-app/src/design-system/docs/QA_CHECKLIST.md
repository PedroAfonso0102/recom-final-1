# QA Checklist

## Build

- [ ] `npm run build`
- [ ] `npm run lint`
- [ ] `npm run typecheck` quando existir script
- [ ] testes disponiveis do projeto

## Vitrine

- [ ] Home renderiza.
- [ ] `/fornecedores-catalogos` renderiza dados publicados.
- [ ] Fornecedor individual renderiza.
- [ ] `/solucoes` renderiza processos publicados.
- [ ] Processo individual renderiza.
- [ ] Promocoes vencidas nao aparecem como ativas.
- [ ] Contato cria lead.
- [ ] 404 recupera usuario.

## Links

- [ ] Menus globais funcionam.
- [ ] Breadcrumbs funcionam.
- [ ] CTAs usam `Link` ou `<a href>`.
- [ ] Links externos tem rotulo claro.
- [ ] Nenhuma pagina importante termina sem proximo passo.

## Admin

- [ ] Criar/editar/publicar fornecedor.
- [ ] Criar/editar/publicar processo.
- [ ] Criar/editar/publicar promocao.
- [ ] Editar site settings.
- [ ] Visualizar lead.
- [ ] Registrar evento/nota.
- [ ] Ver audit log.

## Supabase

- [ ] RLS habilitada nas tabelas expostas.
- [ ] Publico so le publicado/ativo.
- [ ] Publico cria lead sem listar leads.
- [ ] Editor nao acessa leads se nao autorizado.
- [ ] Comercial nao edita conteudo se nao autorizado.
- [ ] Service role nao esta no client.

## SEO

- [ ] Titles unicos.
- [ ] H1 unico por pagina.
- [ ] Meta description com fallback.
- [ ] Canonical.
- [ ] Sitemap.
- [ ] Robots.
- [ ] Structured data quando aplicavel.

## Acessibilidade

- [ ] Navegacao por teclado.
- [ ] Foco visivel.
- [ ] Labels permanentes.
- [ ] Erros junto ao campo.
- [ ] Alvos clicaveis adequados.
- [ ] Menu mobile acessivel.
