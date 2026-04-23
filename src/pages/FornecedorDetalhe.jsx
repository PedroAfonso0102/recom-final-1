import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { SEOHead } from '../components/SEOHead';
import { BlocoContato } from '../components/BlocoContato';
import fornecedoresData from '../data/fornecedores.json';
import styles from './Inicio.module.css';

const FornecedorDetalhe = () => {
  const { id } = useParams();
  const fornecedor = React.useMemo(() => fornecedoresData.find(f => f.id === id), [id]);

  if (!fornecedor) return <Layout><div className={styles.container} style={{padding: '100px 0'}}>Carregando...</div></Layout>;

  return (
    <Layout>
      <SEOHead
        title={`Ferramentas ${fornecedor.nome}`}
        description={`Catálogo e soluções da ${fornecedor.nome}. ${fornecedor.descricaoCurta}`}
        canonicalUrl={`https://pedroafonso0102.github.io/recom-final-1/fornecedores-catalogos/${fornecedor.id}`}
      />

      <div className={styles.sectionPadding}>
        <div className={styles.container}>
          <div style={{ marginBottom: 'var(--space-m)' }}>
            <Link to="/fornecedores-catalogos" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: 'var(--text-sm)' }}>
              &larr; Voltar para Fornecedores
            </Link>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2xl)', alignItems: 'center' }}>
            <div style={{ flex: '1', minWidth: '300px' }}>
              <h1 className={styles.sectionTitle}>{fornecedor.nome}</h1>
              <p style={{ fontSize: 'var(--text-md)', color: 'var(--text-secondary)', marginBottom: 'var(--space-l)' }}>
                {fornecedor.descricaoLonga}
              </p>
              <a href={fornecedor.catalogoUrl} target="_blank" rel="noopener noreferrer"
                 style={{
                   display: 'inline-block',
                   backgroundColor: 'var(--accent-blue)',
                   color: 'var(--bg-white)',
                   padding: 'var(--space-m) var(--space-xl)',
                   borderRadius: 'var(--radius-sm)',
                   textDecoration: 'none',
                   fontWeight: 'bold'
                 }}>
                Acessar Catálogo Oficial
              </a>
            </div>
            <div style={{ flex: '1', minWidth: '300px', backgroundColor: 'var(--bg-harmonic)', padding: 'var(--space-xl)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
               <img src={`/recom-final-1/assets/images/${fornecedor.logo}`} alt={`Logo da ${fornecedor.nome}`} style={{ maxWidth: '100%', maxHeight: '150px', objectFit: 'contain' }} />
            </div>
          </div>
        </div>
      </div>

      <BlocoContato />
    </Layout>
  );
};

export { FornecedorDetalhe };
