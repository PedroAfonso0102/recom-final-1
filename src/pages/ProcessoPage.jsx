import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import Layout from '../components/Layout';
import SEOHead from '../components/SEOHead';
import { getProcessoBySlug, processos } from '../data/processos';
import { fornecedores, getCatalogosDoFornecedor } from '../data/fornecedores';
import { mensagensGlobais } from '../data/contato';
import { recomStyleHooks } from '../styles/recom/styleRegistry';

const ProcessoPage = () => {
  const { slug } = useParams();
  const processo = getProcessoBySlug(slug);

  if (!processo) {
    return <Navigate to="/solucoes" replace />;
  }

  const fornecedoresRelacionados = fornecedores.filter((fornecedor) =>
    processo.fornecedoresRelacionados.includes(fornecedor.id)
  );
  const outrosProcessos = processos.filter((item) => item.id !== processo.id);
  const catalogosUteis = fornecedoresRelacionados.flatMap((fornecedor) =>
    getCatalogosDoFornecedor(fornecedor).map((catalogo) => ({
      ...catalogo,
      fornecedor: fornecedor.nome,
    }))
  );

  return (
    <Layout>
      <SEOHead
        title={processo.metaTitle.split(' | ')[0]}
        description={processo.metaDescription}
        canonical={`/solucoes/${processo.slug}`}
      />

      <main
        id="main-content"
        tabIndex={-1}
        data-recom-page={recomStyleHooks.pages.processDetail}
      >
        <section
          data-recom-component={recomStyleHooks.components.section}
          data-recom-section={recomStyleHooks.sections.hero}
        >
          <p data-recom-element={recomStyleHooks.elements.subtitle}>
            Soluções por processo | {fornecedoresRelacionados.length} fornecedores relacionados
          </p>
          <h1 data-recom-slot="title">{processo.nome}</h1>
          <p data-recom-element={recomStyleHooks.elements.body}>{processo.descricaoCurta}</p>
          <p data-recom-element={recomStyleHooks.elements.body}>{processo.descricao}</p>
          <div className="flex" data-recom-component={recomStyleHooks.components.ctaSection}>
            <Link
              to="/contato"
              data-recom-component={recomStyleHooks.components.button}
              data-recom-variant={recomStyleHooks.variants.primary}
              data-recom-role={recomStyleHooks.roles.primaryCta}
            >
              Solicitar orientação comercial
            </Link>
            <Link
              to="/solucoes"
              data-recom-component={recomStyleHooks.components.button}
              data-recom-variant={recomStyleHooks.variants.secondary}
              data-recom-role={recomStyleHooks.roles.secondaryCta}
            >
              Voltar para soluções por processo
            </Link>
          </div>
        </section>

        <div className="grid" data-recom-component={recomStyleHooks.components.section}>
          <div>
            <section
              data-recom-component={recomStyleHooks.components.section}
              data-recom-section={recomStyleHooks.sections.pageGuidance}
            >
              <h2 data-recom-slot="title">Quando este processo aparece na demanda</h2>
              <ul>
                {processo.atalhos.map((atalho) => (
                  <li key={atalho.titulo}>
                    <strong>{atalho.titulo}:</strong> {atalho.descricao}{' '}
                    <Link
                      to={atalho.to === 'catalogo-principal' ? '/fornecedores-catalogos' : atalho.to}
                      data-recom-component={recomStyleHooks.components.textLink}
                      data-recom-variant={recomStyleHooks.variants.inline}
                    >
                      {atalho.ctaLabel}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            <section
              data-recom-component={recomStyleHooks.components.section}
              data-recom-section={recomStyleHooks.sections.relatedItems}
            >
              <h2 data-recom-slot="title">Fornecedores relacionados</h2>
              {fornecedoresRelacionados.length > 0 ? (
                <div className="grid">
                  {fornecedoresRelacionados.map((fornecedor) => (
                    <article
                      key={fornecedor.id}
                      style={{ border: '1px solid #ccc', padding: '1rem' }}
                      data-recom-component={recomStyleHooks.components.supplierCard}
                    >
                      <img
                        src={fornecedor.logo}
                        alt={fornecedor.altText || fornecedor.nome}
                        width="100"
                        data-recom-component={recomStyleHooks.components.image}
                        data-recom-element={recomStyleHooks.elements.cardImage}
                      />
                      <h3 data-recom-element={recomStyleHooks.elements.cardTitle}>{fornecedor.nome}</h3>
                      <p data-recom-element={recomStyleHooks.elements.cardDescription}>{fornecedor.descricaoCurta}</p>
                      <Link
                        to={`/fornecedores-catalogos/${fornecedor.slug}`}
                        data-recom-component={recomStyleHooks.components.textLink}
                        data-recom-role={recomStyleHooks.roles.supplierCardClick}
                        data-recom-track={recomStyleHooks.track.supplierCardClick}
                      >
                        Ver fornecedor
                      </Link>
                    </article>
                  ))}
                </div>
              ) : (
                <p data-recom-component={recomStyleHooks.components.emptyState} data-recom-state={recomStyleHooks.states.empty}>
                  {mensagensGlobais.processoSemFornecedor}
                </p>
              )}
            </section>

            <section
              data-recom-component={recomStyleHooks.components.section}
              data-recom-section={recomStyleHooks.sections.catalogList}
            >
              <h2 data-recom-slot="title">Catálogos úteis</h2>
              {catalogosUteis.length > 0 ? (
                <ul>
                  {catalogosUteis.map((catalogo) => (
                    <li key={`${catalogo.fornecedor}-${catalogo.url}`}>
                      <a
                        href={catalogo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-recom-component={recomStyleHooks.components.externalLink}
                        data-recom-role={recomStyleHooks.roles.catalogLink}
                        data-recom-track={recomStyleHooks.track.supplierCatalogClick}
                      >
                        {catalogo.label || 'Catálogo oficial'} - {catalogo.fornecedor}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p data-recom-component={recomStyleHooks.components.emptyState} data-recom-state={recomStyleHooks.states.empty}>
                  {mensagensGlobais.fornecedorSemCatalogo}
                </p>
              )}
            </section>

            <section
              data-recom-component={recomStyleHooks.components.section}
              data-recom-section={recomStyleHooks.sections.pageBody}
            >
              <h2 data-recom-slot="title">Perguntas frequentes de orientação</h2>
              <dl>
                <dt>Tenho apenas um código. O que envio?</dt>
                <dd>Envie o código, marca desejada e qualquer contexto de uso ou peça.</dd>
                <dt>Não sei qual fornecedor consultar.</dt>
                <dd>Use o formulário de contato e descreva processo, material, desenho ou aplicação.</dd>
                <dt>O catálogo oficial resolve tudo?</dt>
                <dd>Ele ajuda na consulta técnica, mas disponibilidade e condição comercial dependem de contato com a RECOM.</dd>
              </dl>
            </section>
          </div>

          <aside>
            <section
              data-recom-component={recomStyleHooks.components.section}
              data-recom-section={recomStyleHooks.sections.contactStrip}
            >
              <h2 data-recom-slot="title">Próximo passo recomendado</h2>
              <p data-recom-element={recomStyleHooks.elements.body}>
                Se a aplicação está clara, envie as informações para a RECOM avaliar o caminho
                comercial. Se ainda não está clara, compare outros processos antes.
              </p>
              <Link
                to="/contato"
                data-recom-component={recomStyleHooks.components.button}
                data-recom-variant={recomStyleHooks.variants.primary}
                data-recom-role={recomStyleHooks.roles.primaryCta}
              >
                Solicitar orientação comercial
              </Link>
            </section>

            <section
              data-recom-component={recomStyleHooks.components.section}
              data-recom-section={recomStyleHooks.sections.fallbackLinks}
            >
              <h2 data-recom-slot="title">Outros processos</h2>
              <ul>
                {outrosProcessos.map((item) => (
                  <li key={item.id}>
                    <Link
                      to={`/solucoes/${item.slug}`}
                      data-recom-component={recomStyleHooks.components.textLink}
                      data-recom-variant={recomStyleHooks.variants.inline}
                    >
                      {item.nome}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </aside>
        </div>
      </main>
    </Layout>
  );
};

export default ProcessoPage;
