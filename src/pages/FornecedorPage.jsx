import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import Layout from '../components/Layout';
import SEOHead from '../components/SEOHead';
import Breadcrumb from '../components/Breadcrumb';
import { getFornecedorBySlug, fornecedores, getCatalogosDoFornecedor } from '../data/fornecedores';
import { processos } from '../data/processos';
import { ArrowRight, ExternalLink } from 'lucide-react';
import styles from './FornecedorPage.module.css';
import { trackLeadGen, trackOutboundLink } from '../utils/analytics';

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
  const catalogoPrincipal = catalogos[0];
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
      />
      <Breadcrumb
        items={[
          { label: 'Início', to: '/' },
          { label: 'Fornecedores & Catálogos', to: '/fornecedores-catalogos' },
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
              Linha técnica com acesso ao catálogo oficial e atuação comercial da RECOM para Campinas e interior de SP.
            </p>
          </div>

          <div className={styles.heroBrandCard}>
            <img src={fornecedor.logo} alt={fornecedor.altText} className={styles.fornecedorLogo} />
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
            </section>

            {catalogos.length > 0 && (
              <section className={styles.catalogoBlock}>
                <div className={styles.sectionHeading}>
                  <span className={styles.sectionEyebrow}>Catálogos oficiais</span>
                  <h2>Acesso rápido aos materiais da marca</h2>
                </div>
                <p className={styles.catalogoIntro}>
                  O primeiro link abaixo é o caminho mais direto para o catálogo principal. Os demais funcionam como apoio para navegação complementar.
                </p>

                <div className={styles.catalogoActions}>
                  <a
                    href={catalogoPrincipal.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.catalogoBtn}
                    aria-label={catalogoPrincipal.label}
                    onClick={() => trackOutboundLink(catalogoPrincipal.url, 'catalogo')}
                  >
                    <ExternalLink size={16} />
                    {catalogoPrincipal.label}
                  </a>

                  {catalogosSecundarios.length > 0 && (
                    <div className={styles.catalogoSecondaryList}>
                      {catalogosSecundarios.map((catalogo) => (
                        <a
                          key={catalogo.url}
                          href={catalogo.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.catalogoSecondaryBtn}
                          aria-label={catalogo.label}
                          onClick={() => trackOutboundLink(catalogo.url, 'catalogo')}
                        >
                          <ExternalLink size={14} />
                          <span>{catalogo.label}</span>
                        </a>
                      ))}
                    </div>
                  )}
                </div>

                <p className={styles.externalNote}>
                  Este link direciona ao site oficial do fabricante. A RECOM não controla o conteúdo externo.
                </p>
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
              <Link
                to="/contato"
                className={styles.ctaSidebarBtn}
                onClick={() => trackLeadGen('form_intent', 'Fornecedor Sidebar CTA')}
              >
                Falar com especialista <ArrowRight size={14} />
              </Link>
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
                        <img src={f.logo} alt={f.altText} className={styles.outroLogo} />
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
