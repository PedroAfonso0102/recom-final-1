import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import SEOHead from '../components/SEOHead';
import { processos } from '../data/processos';
import { fornecedores } from '../data/fornecedores';
import { mensagensGlobais } from '../data/contato';
import editorialImg from '../assets/images/optimized/recom-editorial-3.jpg';
import { recomStyleHooks } from '../styles/recom/styleRegistry';

const Solucoes = () => {
  const navigate = useNavigate();

  const handleProcessSelect = (event) => {
    const { value } = event.target;
    if (value) {
      navigate(`/solucoes/${value}`);
    }
  };

  return (
    <Layout>
      <SEOHead
        title="Soluções por processo"
        description="Encontre caminhos por tipo de operação e consulte fornecedores relacionados a cada processo de usinagem."
        canonical="/solucoes"
      />

      <main
        id="main-content"
        tabIndex={-1}
        data-recom-page={recomStyleHooks.pages.solutions}
      >
        <section
          data-recom-component={recomStyleHooks.components.section}
          data-recom-section={recomStyleHooks.sections.hero}
        >
          <p data-recom-element={recomStyleHooks.elements.subtitle}>
            Operações industriais | Aplicações de usinagem
          </p>
          <h1 data-recom-slot="title">Soluções por Processo</h1>
          <p data-recom-element={recomStyleHooks.elements.body}>
            Localize as ferramentas e acessórios ideais partindo do tipo de operação que sua
            empresa realiza. Navegue pelas categorias para encontrar fornecedores e catálogos
            oficiais relacionados a cada processo.
          </p>
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
              to="/fornecedores-catalogos"
              data-recom-component={recomStyleHooks.components.button}
              data-recom-variant={recomStyleHooks.variants.secondary}
              data-recom-role={recomStyleHooks.roles.secondaryCta}
            >
              Ver fornecedores e catálogos
            </Link>
          </div>
          <img
            src={editorialImg}
            alt="Ferramentas e aplicações de usinagem"
            width="400"
            data-recom-component={recomStyleHooks.components.image}
            data-recom-element={recomStyleHooks.elements.cardImage}
          />
        </section>

        <section
          data-recom-component={recomStyleHooks.components.section}
          data-recom-section={recomStyleHooks.sections.intro}
        >
          <h2 data-recom-slot="title">Como encontrar sua solução</h2>
          <ul>
            <li>Identifique a operação de usinagem necessária.</li>
            <li>Consulte as marcas e catálogos recomendados para o processo.</li>
            <li>Fale com a RECOM para validar códigos ou solicitar orçamentos.</li>
          </ul>
        </section>

        <section
          data-recom-component={recomStyleHooks.components.section}
          data-recom-section={recomStyleHooks.sections.pageGuidance}
        >
          <h2 data-recom-slot="title">Ir direto para um processo</h2>
          <div
            data-recom-component={recomStyleHooks.components.formField}
            data-recom-state={recomStyleHooks.states.idle}
          >
            <label htmlFor="processo-select" data-recom-element={recomStyleHooks.elements.formLabel}>
              Selecionar processo
            </label>
            <select
              id="processo-select"
              defaultValue=""
              onChange={handleProcessSelect}
              data-recom-element={recomStyleHooks.elements.formInput}
            >
              <option value="" disabled>
                Escolha um processo
              </option>
              {processos.map((processo) => (
                <option key={processo.id} value={processo.slug}>
                  {processo.nome}
                </option>
              ))}
            </select>
          </div>
        </section>

        <section
          data-recom-component={recomStyleHooks.components.section}
          data-recom-section={recomStyleHooks.sections.processGrid}
        >
          <h2 data-recom-slot="title">Navegue por Operação</h2>
          {processos.length === 0 ? (
            <p data-recom-component={recomStyleHooks.components.emptyState} data-recom-state={recomStyleHooks.states.empty}>
              {mensagensGlobais.listaVazia}
            </p>
          ) : (
            <div className="grid">
              {processos.map((processo) => {
                const relacionados = fornecedores.filter((fornecedor) =>
                  processo.fornecedoresRelacionados.includes(fornecedor.id)
                );

                return (
                  <article
                    key={processo.id}
                    style={{ border: '1px solid #ccc', padding: '1rem' }}
                    data-recom-component={recomStyleHooks.components.processCard}
                  >
                    <h3 data-recom-element={recomStyleHooks.elements.cardTitle}>{processo.nome}</h3>
                    <p data-recom-element={recomStyleHooks.elements.cardDescription}>{processo.descricaoCurta}</p>
                    <p>
                      <strong>Fornecedores relacionados:</strong>{' '}
                      {relacionados.length > 0
                        ? relacionados.map((fornecedor) => fornecedor.nome).join(', ')
                        : 'não mapeado no site'}
                    </p>
                    <div className="flex" data-recom-component={recomStyleHooks.components.ctaSection}>
                      <Link
                        to={`/solucoes/${processo.slug}`}
                        data-recom-component={recomStyleHooks.components.textLink}
                        data-recom-role={recomStyleHooks.roles.processCardClick}
                        data-recom-track={recomStyleHooks.track.processCardClick}
                      >
                        Ver processo
                      </Link>
                      <Link
                        to="/contato"
                        data-recom-component={recomStyleHooks.components.textLink}
                        data-recom-variant={recomStyleHooks.variants.inline}
                      >
                        Falar com a RECOM
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        <section
          data-recom-component={recomStyleHooks.components.section}
          data-recom-section={recomStyleHooks.sections.ctaFinal}
        >
          <h2 data-recom-slot="title">Ainda não sabe qual processo seguir?</h2>
          <p data-recom-element={recomStyleHooks.elements.body}>
            Envie os dados da peça, material, operação, código de referência ou marca desejada. A
            RECOM ajuda a escolher se o próximo passo é fornecedor, catálogo ou orçamento.
          </p>
          <div className="flex" data-recom-component={recomStyleHooks.components.ctaSection}>
            <Link
              to="/contato"
              data-recom-component={recomStyleHooks.components.button}
              data-recom-variant={recomStyleHooks.variants.primary}
              data-recom-role={recomStyleHooks.roles.primaryCta}
            >
              Enviar aplicação para orientação
            </Link>
            <Link
              to="/fornecedores-catalogos"
              data-recom-component={recomStyleHooks.components.button}
              data-recom-variant={recomStyleHooks.variants.secondary}
              data-recom-role={recomStyleHooks.roles.secondaryCta}
            >
              Consultar fornecedores primeiro
            </Link>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default Solucoes;
