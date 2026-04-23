import React from 'react';
import { Layout } from '../components/Layout';
import { SEOHead } from '../components/SEOHead';
import { FornecedorCard } from '../components/FornecedorCard';
import fornecedoresData from '../data/fornecedores.json';
import styles from './Inicio.module.css';

const Fornecedores = () => {
  const fornecedores = fornecedoresData;

  return (
    <Layout>
      <SEOHead
        title="Fornecedores e Catálogos"
        description="Conheça nossos fornecedores parceiros e acesse os catálogos oficiais. Distribuímos Mitsubishi Materials, 7Leaders, BT-Fixo e Kifix."
        canonicalUrl="https://pedroafonso0102.github.io/recom-final-1/fornecedores-catalogos"
      />
      <div className={styles.sectionPadding}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h1 className={styles.sectionTitle}>Fornecedores & Catálogos</h1>
            <p className={styles.sectionDescription}>
              Trabalhamos com marcas globais que garantem a máxima precisão, estabilidade e vida útil para a sua operação.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-m)', marginTop: 'var(--space-xl)' }}>
            {fornecedores.map(fornecedor => (
              <FornecedorCard key={fornecedor.id} fornecedor={fornecedor} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export { Fornecedores };
