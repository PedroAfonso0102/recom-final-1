import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import Layout from '../components/Layout';
import SEOHead from '../components/SEOHead';
import { mensagensGlobais } from '../data/contato';
import { getFornecedorBySlug, fornecedores, getCatalogosDoFornecedor, getFornecedorCatalogoPrincipal, hasCatalogoValido } from '../data/fornecedores';
import { processos } from '../data/processos';
import { recomStyleHooks } from '../styles/recom/styleRegistry';

const FornecedorPage = () => {
  const { slug } = useParams();
  const fornecedor = getFornecedorBySlug(slug);

  if (!fornecedor) {
    return <Navigate to="/fornecedores-catalogos" replace />;
  }

  const catalogos = getCatalogosDoFornecedor(fornecedor);
  const catalogoPrincipal = getFornecedorCatalogoPrincipal(fornecedor);
  const catalogoDisponivel = hasCatalogoValido(fornecedor);
  const processosRelacionados = processos.filter((processo) =>
    fornecedor.processosRelacionados.includes(processo.id)
  );
  const outrosFornecedores = fornecedores.filter((item) => item.id !== fornecedor.id);

  return (
    <Layout>
      <SEOHead
        title={`${fornecedor.nome} - Fornecedor e catálogos oficiais`}
        description={`${fornecedor.descricaoCurta} Consulte catálogos oficiais e fale com a RECOM para orientação comercial.`}
        canonical={`/fornecedores-catalogos/${fornecedor.slug}`}
      />

      <main
        id="main-content"
        tabIndex={-1}
        data-recom-page={recomStyleHooks.pages.supplierDetail}
      >
        <section
          data-recom-component={recomStyleHooks.components.section}
          data-recom-section={recomStyleHooks.sections.hero}
          data-recom-state={
            catalogoDisponivel
              ? recomStyleHooks.states.catalogAvailable
              : recomStyleHooks.states.catalogUnavailable
          }
        >
          <p data-recom-element={recomStyleHooks.elements.subtitle}>
            Fornecedor | Catálogos oficiais | Orientação comercial
          </p>
          <h1 data-recom-slot="title">{fornecedor.nome}</h1>
          <p data-recom-element={recomStyleHooks.elements.body}>{fornecedor.descricaoCurta}</p>
          <p data-recom-element={recomStyleHooks.elements.body}>
            Esta página organiza a marca no contexto comercial da RECOM. Para especificação final,
            disponibilidade, preço ou condição, fale com a equipe.
          </p>
          <img
            src={fornecedor.logo}
            alt={fornecedor.altText || fornecedor.nome}
            width="200"
            data-recom-component={recomStyleHooks.components.image}
            data-recom-element={recomStyleHooks.elements.cardImage}
          />
          <div className="flex" data-recom-component={recomStyleHooks.components.ctaSection}>
            {catalogoDisponivel ? (
              <a
                href={catalogoPrincipal.url}
                target="_blank"
                rel="noopener noreferrer"
                data-recom-component={recomStyleHooks.components.externalLink}
                data-recom-role={recomStyleHooks.roles.catalogLink}
                data-recom-track={recomStyleHooks.track.supplierCatalogClick}
              >
                Acessar catálogo oficial da {fornecedor.nome}
              </a>
            ) : (
              <Link
                to="/contato"
                data-recom-component={recomStyleHooks.components.button}
                data-recom-variant={recomStyleHooks.variants.primary}
                data-recom-role={recomStyleHooks.roles.primaryCta}
              >
                Solicitar catálogo ou orientação sobre {fornecedor.nome}
              </Link>
            )}
            <Link
              to="/contato"
              data-recom-component={recomStyleHooks.components.button}
              data-recom-variant={recomStyleHooks.variants.secondary}
              data-recom-role={recomStyleHooks.roles.secondaryCta}
            >
              Solicitar orientação comercial
            </Link>
          </div>
        </section>

        <div className="grid" data-recom-component={recomStyleHooks.components.section}>
          <div>
            <section
              data-recom-component={recomStyleHooks.components.section}
              data-recom-section={recomStyleHooks.sections.supplierOverview}
            >
              <h2 data-recom-slot="title">Resumo da marca no contexto da RECOM</h2>
              <p data-recom-element={recomStyleHooks.elements.body}>{fornecedor.descricao}</p>
              {fornecedor.linkInstitucional ? (
                <p>
                  Site institucional oficial:{' '}
                  <a
                    href={fornecedor.linkInstitucional}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-recom-component={recomStyleHooks.components.externalLink}
                    data-recom-role={recomStyleHooks.roles.catalogLink}
                  >
                    {fornecedor.linkInstitucional}
                  </a>
                </p>
              ) : (
                <p data-recom-component={recomStyleHooks.components.emptyState} data-recom-state={recomStyleHooks.states.empty}>
                  {mensagensGlobais.linkExternoIndisponivel}
                </p>
              )}
            </section>

            <section
              data-recom-component={recomStyleHooks.components.section}
              data-recom-section={recomStyleHooks.sections.catalogList}
            >
              <h2 data-recom-slot="title">Catálogos oficiais</h2>
              {catalogos.length > 0 ? (
                <>
                  <p>Links externos abrem materiais do fabricante ou da marca em nova aba.</p>
                  <ul>
                    {catalogos.map((catalogo) => (
                      <li key={catalogo.url}>
                        <a
                          href={catalogo.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-recom-component={recomStyleHooks.components.externalLink}
                          data-recom-role={recomStyleHooks.roles.catalogLink}
                          data-recom-track={recomStyleHooks.track.supplierCatalogClick}
                        >
                          {catalogo.label || `Catálogo oficial da ${fornecedor.nome}`}
                        </a>
                      </li>
                    ))}
                  </ul>
                  <p>
                    <small>
                      A RECOM organiza o acesso, mas o conteúdo externo, disponibilidade e versões
                      dos catálogos dependem do fornecedor.
                    </small>
                  </p>
                </>
              ) : (
                <p data-recom-component={recomStyleHooks.components.emptyState} data-recom-state={recomStyleHooks.states.empty}>
                  {mensagensGlobais.fornecedorSemCatalogo}
                </p>
              )}
            </section>

            <section
              data-recom-component={recomStyleHooks.components.section}
              data-recom-section={recomStyleHooks.sections.relatedItems}
            >
              <h2 data-recom-slot="title">Processos ou linhas relacionadas</h2>
              {processosRelacionados.length > 0 ? (
                <ul>
                  {processosRelacionados.map((processo) => (
                    <li key={processo.id}>
                      <Link
                        to={`/solucoes/${processo.slug}`}
                        data-recom-component={recomStyleHooks.components.textLink}
                        data-recom-role={recomStyleHooks.roles.processCardClick}
                        data-recom-track={recomStyleHooks.track.processCardClick}
                      >
                        {processo.nome}: {processo.descricaoCurta}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p data-recom-component={recomStyleHooks.components.emptyState} data-recom-state={recomStyleHooks.states.empty}>
                  {mensagensGlobais.processoSemFornecedor}
                </p>
              )}
            </section>
          </div>

          <aside>
            <section
              data-recom-component={recomStyleHooks.components.section}
              data-recom-section={recomStyleHooks.sections.contactStrip}
            >
              <h2 data-recom-slot="title">Quando falar com a RECOM</h2>
              <ul>
                <li>Quando você tem código ou referência da marca.</li>
                <li>Quando precisa consultar disponibilidade comercial.</li>
                <li>Quando não encontrou a linha correta no catálogo oficial.</li>
              </ul>
              <Link
                to="/contato"
                data-recom-component={recomStyleHooks.components.button}
                data-recom-variant={recomStyleHooks.variants.primary}
                data-recom-role={recomStyleHooks.roles.primaryCta}
              >
                Falar com a RECOM sobre {fornecedor.nome}
              </Link>
            </section>

            <section
              data-recom-component={recomStyleHooks.components.section}
              data-recom-section={recomStyleHooks.sections.fallbackLinks}
            >
              <h2 data-recom-slot="title">Retorno e navegação</h2>
              <ul>
                <li>
                  <Link
                    to="/fornecedores-catalogos"
                    data-recom-component={recomStyleHooks.components.textLink}
                    data-recom-variant={recomStyleHooks.variants.inline}
                  >
                    Voltar para fornecedores e catálogos
                  </Link>
                </li>
                <li>
                  <Link
                    to="/solucoes"
                    data-recom-component={recomStyleHooks.components.textLink}
                    data-recom-variant={recomStyleHooks.variants.inline}
                  >
                    Ver soluções por processo
                  </Link>
                </li>
                {outrosFornecedores.map((item) => (
                  <li key={item.id}>
                    <Link
                      to={`/fornecedores-catalogos/${item.slug}`}
                      data-recom-component={recomStyleHooks.components.textLink}
                      data-recom-variant={recomStyleHooks.variants.inline}
                    >
                      Ver {item.nome}
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

export default FornecedorPage;
