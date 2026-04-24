import React from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import Breadcrumb from '../components/Breadcrumb';
import ActionButton from '../components/ActionButton';
import { fornecedores, getCatalogosDoFornecedor } from '../data/fornecedores';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { trackOutboundLink } from '../utils/analytics';
import styles from './FornecedoresCatalogos.module.css';

/**
 * Hub de Fornecedores & Catálogos.
 * Etapa 2: "catálogo como hub de fornecedores e catálogos oficiais — não catálogo de SKUs"
 * Etapa 4: "grid de cards com logo, descrição, CTA"
 */
const FornecedoresCatalogos = () => {
  return (
    <Layout>
      <SEOHead
        title="Fornecedores & Catálogos"
        description="Conheça os fornecedores parceiros da RECOM Metal Duro. Acesse catálogos oficiais de Mitsubishi Materials, 7Leaders, BT Fixo e Kifix."
      />
      <Breadcrumb items={[
        { label: 'Início', to: '/' },
        { label: 'Fornecedores & Catálogos' },
      ]} />

      <div className={styles.pageContainer}>
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Fornecedores & Catálogos</h1>
          <p className={styles.pageSubtitle}>
            A RECOM seleciona e distribui ferramentas de fornecedores reconhecidos pela qualidade,
            inovação e confiabilidade no mercado de usinagem.
          </p>
        </div>

        <div className={styles.fornecedorGrid}>
          {fornecedores.map((fornecedor) => {
            const catalogos = getCatalogosDoFornecedor(fornecedor);

            return (
              <div key={fornecedor.id} className={`${styles.fornecedorCard} ${fornecedor.destaque ? styles.destaque : ''}`}>
                {fornecedor.destaque && (
                  <span className={styles.destaqueBadge}>Principal</span>
                )}
                <div className={styles.cardLogo}>
                  <img src={fornecedor.logo} alt={fornecedor.altText} />
                </div>
                <div className={styles.cardContent}>
                  <h2 className={styles.fornecedorNome}>{fornecedor.nome}</h2>
                  <p className={styles.fornecedorDesc}>{fornecedor.descricaoCurta}</p>
                  <div className={styles.cardActions}>
                    <ActionButton
                      to={`/fornecedores-catalogos/${fornecedor.slug}`}
                      variant="secondary"
                      compact
                      stackOnMobile
                    >
                      Ver fornecedor <ArrowRight size={14} />
                    </ActionButton>
                  </div>
                  {catalogos.length > 0 && (
                    <details className={styles.catalogoDisclosure}>
                      <summary className={styles.catalogoSummary}>
                        <span>Catálogos oficiais</span>
                        <span className={styles.catalogoCount}>({catalogos.length})</span>
                      </summary>
                      <div className={styles.catalogosList}>
                        {catalogos.map((catalogo) => (
                          <a
                            key={catalogo.url}
                            href={catalogo.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.catalogoLink}
                            aria-label={catalogo.label}
                            onClick={() => trackOutboundLink(catalogo.url, 'catalogo')}
                          >
                            <ExternalLink size={14} />
                            {catalogo.label}
                          </a>
                        ))}
                      </div>
                    </details>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA de contato */}
        <div className={styles.ctaSection}>
          <p>Não encontrou o que procura? A RECOM pode ajudar a identificar a solução ideal.</p>
          <ActionButton to="/contato" variant="primary" stackOnMobile>
            Solicitar Orientação <ArrowRight size={16} />
          </ActionButton>
        </div>
      </div>
    </Layout>
  );
};

export default FornecedoresCatalogos;
