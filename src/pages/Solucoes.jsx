import React from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import Breadcrumb from '../components/Breadcrumb';
import { processos } from '../data/processos';
import { ArrowRight, Crosshair, Box, Circle } from 'lucide-react';
import styles from './Solucoes.module.css';

const iconMap = {
  Crosshair: <Crosshair size={28} />,
  Box: <Box size={28} />,
  Circle: <Circle size={28} />,
};

/**
 * Hub de Soluções / Processos de usinagem.
 * Etapa 2: "hub de descoberta por necessidade prática, não catálogo de SKUs"
 */
const Solucoes = () => {
  return (
    <Layout>
      <SEOHead
        title="Soluções e Processos de Usinagem"
        description="Explore soluções para torneamento, fresamento e furação. A RECOM Metal Duro conecta sua operação aos fornecedores e ferramentas certos."
      />
      <Breadcrumb items={[
        { label: 'Início', to: '/' },
        { label: 'Soluções / Processos' },
      ]} />

      <div className={styles.pageContainer}>
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Soluções & Processos de Usinagem</h1>
          <p className={styles.pageSubtitle}>
            Encontre ferramentas e fornecedores organizados por processo produtivo.
            A RECOM simplifica a seleção de soluções para sua operação.
          </p>
        </div>

        <div className={styles.processosGrid}>
          {processos.map(processo => (
            <Link to={`/solucoes/${processo.slug}`} key={processo.id} className={styles.processoCard}>
              <div className={styles.processoIcon}>
                {iconMap[processo.icone] || <Box size={28} />}
              </div>
              <h2 className={styles.processoNome}>{processo.nome}</h2>
              <p className={styles.processoDesc}>{processo.descricaoCurta}</p>
              <span className={styles.processoLink}>
                Ver ferramentas <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>

        <div className={styles.ctaSection}>
          <h2>Não sabe por onde começar?</h2>
          <p>A equipe da RECOM pode ajudar a identificar o processo e as ferramentas ideais para sua aplicação.</p>
          <Link to="/contato" className={styles.ctaBtn}>
            Solicitar Orientação Técnica <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Solucoes;
