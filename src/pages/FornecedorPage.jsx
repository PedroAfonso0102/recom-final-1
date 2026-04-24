import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import Layout from '../components/Layout';
import SEOHead from '../components/SEOHead';
import Breadcrumb from '../components/Breadcrumb';
import ActionButton from '../components/ActionButton';
import { getFornecedorBySlug, fornecedores, getCatalogosDoFornecedor, getFornecedorCatalogoPrincipal, hasCatalogoValido } from '../data/fornecedores';
import { processos } from '../data/processos';
import { ArrowRight, ExternalLink } from 'lucide-react';
import styles from './FornecedorPage.module.css';
import { trackLeadGen, trackSupplierCatalogClick } from '../utils/analytics';

/**
 * Página individual de fornecedor.
 * Etapa 4: "contexto editorial, link externo sinalizado, fornecedores relacionados, CTA"
 */
const FornecedorPage = () => {
  const { slug } = useParams();
  const fornecedor = getFornecedorBySlug(slug);

  if (!fornecedor) {
    return <Navigate to="/fornecedores-catalogos" replace />;
  }

  const catalogos = getCatalogosDoFornecedor(fornecedor);
  const catalogoPrincipal = getFornecedorCatalogoPrincipal(fornecedor);
  const catalogoDisponivel = hasCatalogoValido(fornecedor);
  const catalogosSecundarios = catalogos.slice(1);

  const processosRelacionados = processos.filter(
    p => fornecedor.processosRelacionados.includes(p.id)
  );

  const outrosFornecedores = fornecedores.filter(f => f.id !== fornecedor.id);

  return (
    <Layout>
      <SEOHead
        title={`${fornecedor.nome} — Fornecedor Parceiro`}
        description={`${fornecedor.descricaoCurta} Distribuído pela RECOM Metal Duro em Campinas-SP.`}
        canonical={`/fornecedores-catalogos/${fornecedor.slug}`}
      />
      <Breadcrumb
        items={[
          { label: 'Início', to: '/' },
          { label: 'Fornecedores e Catálogos', to: '/fornecedores-catalogos' },
          { label: fornecedor.nome },
        ]}
      />

      <div className={styles.pageContainer}>
        <section className={styles.heroSection}>
          <div className={styles.heroCopy}>
            <div className={styles.heroMeta}>
              <span className={styles.heroEyebrow}>Fornecedor parceiro</span>
              {fornecedor.destaque && <span className={styles.heroBadge}>Principal</span>}
              {catalogos.length > 0 && (
                <span className={styles.heroBadgeMuted}>
                  {catalogos.length} catálogo{catalogos.length > 1 ? 's' : ''}
                </span>
              )}
            </div>

            <h1 className={styles.fornecedorTitle}>{fornecedor.nome}</h1>
            <p className={styles.fornecedorTagline}>{fornecedor.descricaoCurta}</p>
            <p className={styles.heroSupport}>
              A RECOM atua como ponte comercial entre sua necessidade de usinagem e o catálogo oficial desta marca.
            </p>
          </div>

          <div className={styles.heroBrandCard}>
            <img
              src={fornecedor.logo}
              alt={fornecedor.altText}
              className={styles.fornecedorLogo}
              width={fornecedor.logoWidth}
              height={fornecedor.logoHeight}
              decoding="async"
            />
          </div>
        </section>

        <div className={styles.contentGrid}>
          <div className={styles.mainContent}>
            <section className={styles.sectionBlock}>
              <div className={styles.sectionHeading}>
                <span className={styles.sectionEyebrow}>Sobre a marca</span>
                <h2>Visão técnica e aplicação</h2>
              </div>
              <p>{fornecedor.descricao}</p>
              {fornecedor.linkInstitucional && (
                <p>
                  Site institucional oficial:{' '}
                  <a href={fornecedor.linkInstitucional} target="_blank" rel="noopener noreferrer">
                    {fornecedor.linkInstitucional}
                  </a>
                </p>
              )}
            </section>

            {catalogoDisponivel ? (
              <section className={styles.catalogoBlock}>
                <div className={styles.sectionHeading}>
                  <span className={styles.sectionEyebrow}>Catálogos oficiais</span>
                  <h2>Acesso rápido aos materiais da marca</h2>
                </div>
                <p className={styles.catalogoIntro}>
                  O primeiro link abaixo é o caminho mais direto para o catálogo oficial da marca. Os demais funcionam como apoio para navegação complementar.
                </p>

                <div className={styles.catalogoActions}>
                  <div className={styles.catalogoMainAction}>
                    <ActionButton
                      href={catalogoPrincipal.url}
                      target="_blank"
                      variant="primary"
                      compact
                      stackOnMobile
                      ariaLabel={`Acessar ${catalogoPrincipal.label} da ${fornecedor.nome}`}
                      onClick={() =>
                        trackSupplierCatalogClick({
                          supplierName: fornecedor.nome,
                          placement: 'supplier_hero',
                          url: catalogoPrincipal.url,
                        })
                      }
                    >
                      <ExternalLink size={16} aria-hidden="true" />
                      {catalogoPrincipal.label}
                    </ActionButton>
                  </div>

                  {catalogosSecundarios.length > 0 && (
                    <div className={styles.catalogoSecondaryList}>
                      {catalogosSecundarios.map((catalogo) => (
                        <ActionButton
                          key={catalogo.url}
                          href={catalogo.url}
                          target="_blank"
                          variant="secondary"
                          compact
                          stackOnMobile
                          ariaLabel={`Acessar ${catalogo.label} da ${fornecedor.nome}`}
                          onClick={() =>
                            trackSupplierCatalogClick({
                              supplierName: fornecedor.nome,
                              placement: 'supplier_secondary',
                              url: catalogo.url,
                            })
                          }
                        >
                          <ExternalLink size={14} aria-hidden="true" />
                          <span>{catalogo.label}</span>
                        </ActionButton>
                      ))}
                    </div>
                  )}
                </div>

                <p className={styles.externalNote}>
                  Este link abre o site oficial do fabricante em nova aba. A RECOM não controla o conteúdo externo.
                </p>
              </section>
            ) : (
              <section className={styles.catalogoBlock}>
                <div className={styles.sectionHeading}>
                  <span className={styles.sectionEyebrow}>Catálogo oficial</span>
                  <h2>Catálogo ainda não disponibilizado nesta página</h2>
                </div>
                <p className={styles.catalogoIntro}>
                  A RECOM pode orientar sua busca e confirmar a rota mais segura para este fornecedor. Se você já tem uma referência, fale com a equipe e evite navegar para uma página rasa ou vazia.
                </p>
                <div className={styles.catalogoActions}>
                  <ActionButton to="/contato" variant="primary" compact stackOnMobile>
                    Solicitar apoio da RECOM <ArrowRight size={16} />
                  </ActionButton>
                  <ActionButton to="/fornecedores-catalogos" variant="secondary" compact stackOnMobile>
                    Voltar ao hub de fornecedores <ArrowRight size={16} />
                  </ActionButton>
                </div>
              </section>
            )}

            {processosRelacionados.length > 0 && (
              <section className={styles.processosSection}>
                <div className={styles.sectionHeading}>
                  <span className={styles.sectionEyebrow}>Processos atendidos</span>
                  <h2>Onde esta marca se encaixa melhor</h2>
                </div>
                <div className={styles.processosGrid}>
                  {processosRelacionados.map((p, index) => (
                    <Link to={`/solucoes/${p.slug}`} key={p.id} className={styles.processoCard}>
                      <span className={styles.processoMark}>{String(index + 1).padStart(2, '0')}</span>
                      <strong>{p.nome}</strong>
                      <span>{p.descricaoCurta}</span>
                      <span className={styles.processoLink}>
                        Ver processo <ArrowRight size={12} />
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          <aside className={styles.sidebar}>
            <div className={styles.ctaCard}>
              <span className={styles.sidebarEyebrow}>Suporte comercial</span>
              <h3>Solicite um orçamento</h3>
              <p>Precisa de ferramentas {fornecedor.nome}? A RECOM pode ajudar a indicar a melhor solução.</p>
              <ActionButton
                to="/contato"
                variant="primary"
                stackOnMobile
                onClick={() => trackLeadGen('form_intent', 'Fornecedor Sidebar CTA')}
                >
                Entrar em contato <ArrowRight size={14} />
              </ActionButton>
            </div>

            <div className={styles.infoCard}>
              <span className={styles.sidebarEyebrow}>Contexto comercial</span>
              <h3>Relação com a RECOM</h3>
              <p>
                {fornecedor.observacoes || 'A RECOM usa esta marca como referência de linha e catálogo oficial dentro do hub.'}
              </p>
            </div>

            {outrosFornecedores.length > 0 && (
              <nav className={styles.outrosCard} aria-label="Outros fornecedores">
                <div className={styles.sectionHeading}>
                  <span className={styles.sectionEyebrow}>Navegação relacionada</span>
                  <h3>Explore outros fornecedores</h3>
                </div>
                <ul>
                  {outrosFornecedores.map(f => (
                    <li key={f.id}>
                      <Link to={`/fornecedores-catalogos/${f.slug}`} className={styles.outroLink}>
                        <img
                          src={f.logo}
                          alt={f.altText}
                          className={styles.outroLogo}
                          loading="lazy"
                          width={f.logoWidth}
                          height={f.logoHeight}
                          decoding="async"
                        />
                        <span className={styles.outroName}>{f.nome}</span>
                        <span className={styles.outroCta}>Ver fornecedor</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </aside>
        </div>
      </div>
    </Layout>
  );
};

export default FornecedorPage;
