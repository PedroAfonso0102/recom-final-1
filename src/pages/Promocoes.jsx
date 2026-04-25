import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import SEOHead from '../components/SEOHead';
import { contato, mensagensGlobais } from '../data/contato';
import { campanhasPromocionais } from '../data/promocoes';
import { recomStyleHooks } from '../styles/recom/styleRegistry';

const Promocoes = () => {
  return (
    <Layout>
      <SEOHead
        title="Promoções e condições especiais"
        description="Consulte condições comerciais disponíveis. A disponibilidade pode variar conforme fornecedor, linha e prazo."
        canonical="/promocoes"
      />

      <main
        id="main-content"
        tabIndex={-1}
        data-recom-page={recomStyleHooks.pages.promotions}
      >
        <section
          data-recom-component={recomStyleHooks.components.section}
          data-recom-section={recomStyleHooks.sections.hero}
        >
          <h1 data-recom-slot="title">Promoções e condições especiais</h1>
          <p data-recom-element={recomStyleHooks.elements.body}>
            Consulte condições comerciais disponíveis. A disponibilidade pode variar conforme
            fornecedor, linha e prazo.
          </p>
          <div className="flex" data-recom-component={recomStyleHooks.components.ctaSection}>
            <Link
              to="/contato"
              data-recom-component={recomStyleHooks.components.button}
              data-recom-variant={recomStyleHooks.variants.primary}
              data-recom-role={recomStyleHooks.roles.primaryCta}
            >
              Consultar disponibilidade
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
        </section>

        <section
          data-recom-component={recomStyleHooks.components.section}
          data-recom-section={recomStyleHooks.sections.pageBody}
        >
          <h2 data-recom-slot="title">Condições ativas</h2>
          {campanhasPromocionais.length > 0 ? (
            <div className="grid">
              {campanhasPromocionais.map((campanha) => (
                <article
                  key={campanha.id}
                  style={{ border: '1px solid #ccc', padding: '1rem' }}
                  data-recom-component={recomStyleHooks.components.promotionCard}
                >
                  <p><small>{campanha.tipo} | {campanha.vigencia}</small></p>
                  <h3 data-recom-element={recomStyleHooks.elements.cardTitle}>{campanha.titulo}</h3>
                  <p data-recom-element={recomStyleHooks.elements.cardDescription}>{campanha.subtitulo}</p>
                  <ul>
                    {campanha.destaques.map((destaque) => (
                      <li key={destaque}>{destaque}</li>
                    ))}
                  </ul>
                  <Link
                    to="/contato"
                    data-recom-component={recomStyleHooks.components.textLink}
                    data-recom-variant={recomStyleHooks.variants.inline}
                  >
                    Consultar disponibilidade
                  </Link>
                  <p><small>{campanha.ressalva || mensagensGlobais.promocaoEncerrada}</small></p>
                </article>
              ))}
            </div>
          ) : (
            <div
              style={{ border: '1px solid #ccc', padding: '1rem' }}
              data-recom-component={recomStyleHooks.components.emptyState}
              data-recom-state={recomStyleHooks.states.empty}
            >
              <h3 data-recom-element={recomStyleHooks.elements.title}>Nenhuma promoção ativa no momento</h3>
              <p>
                Fale com a RECOM para consultar condições comerciais, disponibilidade e oportunidades
                sob consulta.
              </p>
              <div className="flex" data-recom-component={recomStyleHooks.components.ctaSection}>
                <Link
                  to="/contato"
                  data-recom-component={recomStyleHooks.components.button}
                  data-recom-variant={recomStyleHooks.variants.primary}
                  data-recom-role={recomStyleHooks.roles.primaryCta}
                >
                  Falar com a RECOM
                </Link>
                <a
                  href={contato.whatsapp.hrefComMensagem}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-recom-component={recomStyleHooks.components.externalLink}
                  data-recom-variant={recomStyleHooks.variants.external}
                  data-recom-role={recomStyleHooks.roles.contactWhatsAppClick}
                  data-recom-track={recomStyleHooks.track.whatsappClick}
                >
                  Consultar pelo WhatsApp
                </a>
              </div>
            </div>
          )}
        </section>

        <section
          data-recom-component={recomStyleHooks.components.section}
          data-recom-section={recomStyleHooks.sections.contactStrip}
        >
          <h2 data-recom-slot="title">Consultas Comerciais</h2>
          <p data-recom-element={recomStyleHooks.elements.body}>
            Ao solicitar uma cotação para condições especiais, informe o fornecedor, linha,
            código e quantidade desejada. Isso agiliza a verificação de disponibilidade e a
            aplicação técnica junto ao fabricante.
          </p>
          <Link
            to="/solucoes"
            data-recom-component={recomStyleHooks.components.textLink}
            data-recom-variant={recomStyleHooks.variants.inline}
          >
            Ver soluções por processo
          </Link>
        </section>
      </main>
    </Layout>
  );
};

export default Promocoes;
