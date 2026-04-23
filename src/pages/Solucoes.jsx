import React from 'react';
import { Layout } from '../components/Layout';
import { SEOHead } from '../components/SEOHead';
import { ProcessoCard } from '../components/ProcessoCard';
import solucoesData from '../data/solucoes.json';
import styles from './Inicio.module.css';

const Solucoes = () => {
  const solucoes = solucoesData;

  return (
    <Layout>
      <SEOHead
        title="Soluções e Processos de Usinagem"
        description="Encontre as ferramentas ideais baseadas no seu processo: Torneamento, Fresamento ou Furação."
        canonicalUrl="https://pedroafonso0102.github.io/recom-final-1/solucoes"
      />
      <div className={styles.sectionPadding}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h1 className={styles.sectionTitle}>Soluções por Processo</h1>
            <p className={styles.sectionDescription}>
              Selecione o processo de usinagem desejado para ver as soluções, fornecedores recomendados e catálogos disponíveis.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-m)', marginTop: 'var(--space-xl)' }}>
            {solucoes.map(processo => (
              <ProcessoCard key={processo.id} processo={processo} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export { Solucoes };
