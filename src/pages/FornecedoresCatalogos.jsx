import React from 'react';
import Layout from '../components/Layout';
import SEOHead from '../components/SEOHead';
import Breadcrumb from '../components/Breadcrumb';
import ActionButton from '../components/ActionButton';
import CatalogGroups from '../components/CatalogGroups';
import { Card, ExternalLink as ExternalCatalogLink } from '../components/ui';
import { fornecedores, getCatalogosDoFornecedor, getFornecedorCatalogoPrincipal, hasCatalogoValido } from '../data/fornecedores';
import { ArrowRight } from 'lucide-react';
import { trackSupplierCatalogClick } from '../utils/analytics';
import styles from './FornecedoresCatalogos.module.css';
import editorialStyles from '../styles/Editorial.module.css';

/**
 * Hub de Fornecedores & Catálogos.
 * Etapa 2: "catálogo como hub de fornecedores e catálogos oficiais — não catálogo de SKUs"
 * Etapa 4: "grid de cards com logo, descrição, CTA"
 */
const FornecedoresCatalogos = () => {
  return (
    <Layout>
      <SEOHead
        title="Fornecedores e Catálogos"
        description="Consulte os fornecedores com os quais a RECOM trabalha e acesse os catálogos oficiais para orientar sua cotação, aplicação ou seleção de ferramentas."
      />
      <Breadcrumb items={[
        { label: 'Início', to: '/' },
        { label: 'Fornecedores e Catálogos' },
      ]} />

      <div className={editorialStyles.pageContainer}>
        <div className={editorialStyles.pageHeader}>
          <span className={editorialStyles.kicker}>Hub técnico-comercial</span>
          <h1 className={editorialStyles.pageTitle}>Fornecedores e Catálogos</h1>
          <p className={editorialStyles.pageSubtitle}>
            Consulte os fornecedores com os quais a RECOM trabalha e acesse os catálogos oficiais
            para orientar sua cotação, aplicação ou seleção de ferramentas.
          </p>
        </div>

        <div className={styles.fornecedorGrid}>
          {fornecedores.map((fornecedor) => {
            const catalogos = getCatalogosDoFornecedor(fornecedor);
            const catalogoPrincipal = getFornecedorCatalogoPrincipal(fornecedor);
            const catalogoDisponivel = hasCatalogoValido(fornecedor);

            return (
              <Card key={fornecedor.id} interactive className={`${styles.fornecedorCard} ${fornecedor.destaque ? styles.destaque : ''}`}>
                {fornecedor.destaque && <span className={editorialStyles.badge}>Principal</span>}
                <div className={styles.cardLogo}>
                  <img
                    src={fornecedor.logo}
                    alt={fornecedor.altText}
                    loading="lazy"
                    width={fornecedor.logoWidth}
                    height={fornecedor.logoHeight}
                    decoding="async"
                  />
                </div>
                <div className={styles.cardContent}>
                  <h2 className={styles.fornecedorNome}>{fornecedor.nome}</h2>
                  <p className={styles.fornecedorDesc}>{fornecedor.descricaoCurta}</p>
                  <div className={styles.cardActions}>
                    {catalogoDisponivel ? (
                      <ExternalCatalogLink
                        href={catalogoPrincipal.url}
                        className={styles.catalogoLink}
                        label={`Acessar ${catalogoPrincipal.label} da ${fornecedor.nome}`}
                        onClick={() =>
                          trackSupplierCatalogClick({
                            supplierName: fornecedor.nome,
                            placement: 'hub_card',
                            url: catalogoPrincipal.url,
                          })
                        }
                      >
                        {catalogoPrincipal.label}
                      </ExternalCatalogLink>
                    ) : (
                      <ActionButton
                        to="/contato"
                        variant="secondary"
                        compact
                        stackOnMobile
                        ariaLabel={`Falar com a RECOM sobre ${fornecedor.nome}`}
                      >
                        Solicitar apoio da RECOM <ArrowRight size={14} />
                      </ActionButton>
                    )}
                    <ActionButton
                      to={`/fornecedores-catalogos/${fornecedor.slug}`}
                      variant="secondary"
                      compact
                      stackOnMobile
                    >
                      Ver detalhes <ArrowRight size={14} />
                    </ActionButton>
                  </div>
                  {catalogos.length > 0 && (
                    <details className={styles.catalogoDisclosure}>
                      <summary className={styles.catalogoSummary}>
                        <span>Catálogos por tipo</span>
                        <span className={styles.catalogoCount}>({catalogos.length})</span>
                      </summary>
                      <CatalogGroups fornecedor={fornecedor} placement="hub_disclosure" compact className={styles.catalogosList} />
                    </details>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        {/* CTA de contato */}
        <div className={editorialStyles.ctaBlock}>
          <span className={editorialStyles.kicker}>Curadoria RECOM</span>
          <h2 className={editorialStyles.sectionTitle}>Não encontrou o catálogo certo?</h2>
          <p className={editorialStyles.cardDesc}>Envie sua aplicação, código ou operação e a RECOM indica o caminho mais seguro para fornecedor, catálogo ou orçamento.</p>
          <ActionButton to="/contato" variant="primary" stackOnMobile>
            Solicitar orientação <ArrowRight size={16} />
          </ActionButton>
        </div>
      </div>
    </Layout>
  );
};

export default FornecedoresCatalogos;
