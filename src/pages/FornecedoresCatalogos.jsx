import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import SEOHead from '../components/SEOHead';
import { mensagensGlobais } from '../data/contato';
import { fornecedores, getCatalogosDoFornecedor, getFornecedorCatalogoPrincipal, hasCatalogoValido } from '../data/fornecedores';
import { processos } from '../data/processos';
import { recomStyleHooks } from '../styles/recom/styleRegistry';

const FornecedoresCatalogos = () => {
  return (
    <Layout>
      <SEOHead
        title="Fornecedores e catálogos"
        description="Consulte fornecedores, linhas e catálogos oficiais. Caso não encontre a informação que procura, fale com a RECOM para receber orientação comercial."
        canonical="/fornecedores-catalogos"
      />

      <main
        id="main-content"
        tabIndex={-1}
        data-recom-page={recomStyleHooks.pages.suppliers}
      >
        <section
          data-recom-component={recomStyleHooks.components.section}
          data-recom-section={recomStyleHooks.sections.hero}
        >
          <h1 data-recom-slot="title">Fornecedores e catálogos</h1>
          <p data-recom-element={recomStyleHooks.elements.body}>
            Consulte fornecedores, linhas e catálogos oficiais. Caso não encontre a informação que
            procura, fale com a RECOM para receber orientação comercial.
          </p>
          <p data-recom-element={recomStyleHooks.elements.body}>
            Esta página não substitui os catálogos oficiais dos fabricantes e não funciona como
            catálogo próprio de SKUs da RECOM.
          </p>
          <div className="flex" data-recom-component={recomStyleHooks.components.ctaSection}>
            <Link
              to="/contato"
              data-recom-component={recomStyleHooks.components.button}
              data-recom-variant={recomStyleHooks.variants.primary}
              data-recom-role={recomStyleHooks.roles.primaryCta}
            >
              Não sabe qual fornecedor consultar? Fale com a RECOM
            </Link>
            <Link
              to="/solucoes"
              data-recom-component={recomStyleHooks.components.button}
              data-recom-variant={recomStyleHooks.variants.secondary}
              data-recom-role={recomStyleHooks.roles.secondaryCta}
            >
              Ver soluções por processo
            </Link>
          </div>
        </section>

        <section
          data-recom-component={recomStyleHooks.components.section}
          data-recom-section={recomStyleHooks.sections.supplierList}
        >
          <h2 data-recom-slot="title">Lista de fornecedores</h2>
          {fornecedores.length === 0 ? (
            <p data-recom-component={recomStyleHooks.components.emptyState} data-recom-state={recomStyleHooks.states.empty}>
              {mensagensGlobais.listaVazia}
            </p>
          ) : (
            <div className="grid">
              {fornecedores.map((fornecedor) => {
                const catalogos = getCatalogosDoFornecedor(fornecedor);
                const catalogoPrincipal = getFornecedorCatalogoPrincipal(fornecedor);
                const catalogoDisponivel = hasCatalogoValido(fornecedor);
                const processosRelacionados = processos.filter((processo) =>
                  fornecedor.processosRelacionados.includes(processo.id)
                );

                return (
                  <article
                    key={fornecedor.id}
                    style={{ border: '1px solid #ccc', padding: '1rem' }}
                    data-recom-component={recomStyleHooks.components.supplierCard}
                    data-recom-state={
                      catalogoDisponivel
                        ? recomStyleHooks.states.catalogAvailable
                        : recomStyleHooks.states.catalogUnavailable
                    }
                  >
                    <img
                      src={fornecedor.logo}
                      alt={fornecedor.altText || fornecedor.nome}
                      width="150"
                      data-recom-component={recomStyleHooks.components.image}
                      data-recom-element={recomStyleHooks.elements.cardImage}
                    />
                    <h3 data-recom-element={recomStyleHooks.elements.cardTitle}>{fornecedor.nome}</h3>
                    <p data-recom-element={recomStyleHooks.elements.cardDescription}>{fornecedor.descricaoCurta}</p>

                    <p>
                      <strong>Processos relacionados:</strong>{' '}
                      {processosRelacionados.length > 0
                        ? processosRelacionados.map((processo) => processo.nome).join(', ')
                        : 'não mapeado no site'}
                    </p>

                    <div className="flex" data-recom-component={recomStyleHooks.components.ctaSection}>
                      <Link
                        to={`/fornecedores-catalogos/${fornecedor.slug}`}
                        data-recom-component={recomStyleHooks.components.textLink}
                        data-recom-role={recomStyleHooks.roles.supplierCardClick}
                        data-recom-track={recomStyleHooks.track.supplierCardClick}
                      >
                        Ver fornecedor
                      </Link>
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
                          data-recom-component={recomStyleHooks.components.textLink}
                          data-recom-variant={recomStyleHooks.variants.inline}
                        >
                          {mensagensGlobais.linkExternoIndisponivel}
                        </Link>
                      )}
                    </div>

                    {catalogos.length > 0 ? (
                      <details>
                        <summary>Catálogos oficiais cadastrados ({catalogos.length})</summary>
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
                                {catalogo.label || 'Catálogo oficial'}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </details>
                    ) : (
                      <p data-recom-component={recomStyleHooks.components.emptyState} data-recom-state={recomStyleHooks.states.empty}>
                        {mensagensGlobais.fornecedorSemCatalogo}
                      </p>
                    )}
                  </article>
                );
              })}
            </div>
          )}
        </section>

        <section
          data-recom-component={recomStyleHooks.components.section}
          data-recom-section={recomStyleHooks.sections.pageGuidance}
        >
          <h2 data-recom-slot="title">Como usar esta página</h2>
          <ol>
            <li>Abra a página interna do fornecedor para entender o contexto comercial.</li>
            <li>Acesse o catálogo oficial quando houver link cadastrado.</li>
            <li>Envie código, processo ou aplicação para a RECOM quando precisar de orientação.</li>
          </ol>
          <Link
            to="/contato"
            data-recom-component={recomStyleHooks.components.textLink}
            data-recom-role={recomStyleHooks.roles.primaryCta}
          >
            Solicitar orientação comercial
          </Link>
        </section>
      </main>
    </Layout>
  );
};

export default FornecedoresCatalogos;
