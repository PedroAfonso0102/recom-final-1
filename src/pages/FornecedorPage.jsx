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

  // Processos relacionados a este fornecedor
  const processosRelacionados = processos.filter(
    p => fornecedor.processosRelacionados.includes(p.id)
  );

  // Outros fornecedores (para "Veja também")
  const outrosFornecedores = fornecedores.filter(f => f.id !== fornecedor.id);

  return (
    <Layout>
      <SEOHead
        title={`${fornecedor.nome} — Fornecedor Parceiro`}
        description={`${fornecedor.descricaoCurta} Distribuído pela RECOM Metal Duro em Campinas-SP.`}
      />
      <Breadcrumb items={[
        { label: 'Início', to: '/' },
        { label: 'Fornecedores & Catálogos', to: '/fornecedores-catalogos' },
        { label: fornecedor.nome },
      ]} />

      <div className={styles.pageContainer}>
        <div className={styles.fornecedorHeader}>
          <img src={fornecedor.logo} alt={fornecedor.altText} className={styles.fornecedorLogo} />
          <div>
            <h1 className={styles.fornecedorTitle}>{fornecedor.nome}</h1>
            <p className={styles.fornecedorTagline}>{fornecedor.descricaoCurta}</p>
          </div>
        </div>

        <div className={styles.contentGrid}>
          <div className={styles.mainContent}>
            <h2>Sobre a {fornecedor.nome}</h2>
            <p>{fornecedor.descricao}</p>

            {catalogos.length > 0 && (
              <div className={styles.catalogoBlock}>
                <h3>Catálogos Oficiais</h3>
                <p>Acesse os materiais oficiais da {fornecedor.nome} diretamente no site do fabricante.</p>
                <div className={styles.catalogoActions}>
                  {catalogos.map((catalogo, index) => (
                    <a
                      key={catalogo.url}
                      href={catalogo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={index === 0 ? styles.catalogoBtn : styles.catalogoSecondaryBtn}
                      aria-label={catalogo.label}
                      onClick={() => trackOutboundLink(catalogo.url, 'catalogo')}
                    >
                      <ExternalLink size={16} />
                      {catalogo.label}
                    </a>
                  ))}
                </div>
                <p className={styles.externalNote}>
                  Este link direciona ao site oficial do fabricante. A RECOM não controla o conteúdo externo.
                </p>
              </div>
            )}

            {processosRelacionados.length > 0 && (
              <div className={styles.processosSection}>
                <h3>Processos Atendidos</h3>
                <div className={styles.processosGrid}>
                  {processosRelacionados.map(p => (
                    <Link to={`/solucoes/${p.slug}`} key={p.id} className={styles.processoCard}>
                      <strong>{p.nome}</strong>
                      <span>{p.descricaoCurta}</span>
                      <span className={styles.processoLink}>Ver processo <ArrowRight size={12} /></span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className={styles.sidebar}>
            <div className={styles.ctaCard}>
              <h3>Solicite um Orçamento</h3>
              <p>Precisa de ferramentas {fornecedor.nome}? A RECOM pode ajudar.</p>
              <Link to="/contato" className={styles.ctaSidebarBtn} onClick={() => trackLeadGen('form_intent', 'Fornecedor Sidebar CTA')}>
                Falar com Especialista <ArrowRight size={14} />
              </Link>
            </div>

            {outrosFornecedores.length > 0 && (
              <div className={styles.outrosCard}>
                <h3>Outros Fornecedores</h3>
                <ul>
                  {outrosFornecedores.map(f => (
                    <li key={f.id}>
                      <Link to={`/fornecedores-catalogos/${f.slug}`}>
                        <img src={f.logo} alt={f.altText} className={styles.outroLogo} />
                        <span>{f.nome}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </div>
    </Layout>
  );
};

export default FornecedorPage;
