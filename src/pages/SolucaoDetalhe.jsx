import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { SEOHead } from '../components/SEOHead';
import { BlocoContato } from '../components/BlocoContato';
import solucoesData from '../data/solucoes.json';
import fornecedoresData from '../data/fornecedores.json';
import { FornecedorCard } from '../components/FornecedorCard';
import styles from './Inicio.module.css';

const SolucaoDetalhe = () => {
  const { id } = useParams();
  const solucao = React.useMemo(() => solucoesData.find(s => s.id === id), [id]);
  const fornecedoresRelacionados = React.useMemo(() => {
    if (solucao && solucao.marcasRelacionadas) {
      return fornecedoresData.filter(f => solucao.marcasRelacionadas.includes(f.id));
    }
    return [];
  }, [solucao]);

  if (!solucao) return <Layout><div className={styles.container} style={{padding: '100px 0'}}>Carregando...</div></Layout>;

  return (
    <Layout>
      <SEOHead
        title={`Soluções em ${solucao.nome}`}
        description={`${solucao.descricaoCurta} Encontre as melhores ferramentas para sua operação de ${solucao.nome.toLowerCase()}.`}
        canonicalUrl={`https://pedroafonso0102.github.io/recom-final-1/solucoes/${solucao.id}`}
      />

      <div className={styles.sectionPadding}>
        <div className={styles.container}>
          <div style={{ marginBottom: 'var(--space-m)' }}>
            <Link to="/solucoes" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: 'var(--text-sm)' }}>
              &larr; Voltar para Processos
            </Link>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2xl)', alignItems: 'center' }}>
            <div style={{ flex: '1', minWidth: '300px' }}>
              <h1 className={styles.sectionTitle}>{solucao.nome}</h1>
              <p style={{ fontSize: 'var(--text-md)', color: 'var(--text-secondary)', marginBottom: 'var(--space-l)' }}>
                {solucao.descricaoLonga}
              </p>
            </div>
            <div style={{ flex: '1', minWidth: '300px', backgroundColor: 'var(--bg-harmonic)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
               {solucao.imagem && <img src={`/recom-final-1/assets/images/${solucao.imagem}`} alt={`Processo de ${solucao.nome}`} style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }} />}
            </div>
          </div>
        </div>
      </div>

      {fornecedoresRelacionados.length > 0 && (
        <div className={styles.sectionPadding} style={{ backgroundColor: 'var(--bg-harmonic)' }}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle} style={{ fontSize: 'var(--text-lg)' }}>Fornecedores Recomendados para {solucao.nome}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-m)', marginTop: 'var(--space-xl)' }}>
              {fornecedoresRelacionados.map(fornecedor => (
                <FornecedorCard key={fornecedor.id} fornecedor={fornecedor} />
              ))}
            </div>
          </div>
        </div>
      )}

      <BlocoContato />
    </Layout>
  );
};

export { SolucaoDetalhe };
