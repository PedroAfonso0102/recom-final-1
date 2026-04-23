import React from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import Breadcrumb from '../components/Breadcrumb';
import { ArrowRight, ExternalLink } from 'lucide-react';
import styles from './Page.module.css';

/**
 * Vídeos Técnicos — Referências de conteúdo por processo.
 * Batch 3: Removido ProductSidebar, adicionado SEOHead + Breadcrumb.
 * Breadcrumb: Início › Suporte Técnico › Vídeos
 */
const Videos = () => (
  <Layout>
    <SEOHead
      title="Vídeos Técnicos de Usinagem"
      description="Referências de vídeos técnicos para torneamento, fresamento, furação e classes de metal duro — conteúdo Mitsubishi Materials distribuído pela RECOM."
    />
    <Breadcrumb items={[
      { label: 'Início', to: '/' },
      { label: 'Suporte Técnico' },
      { label: 'Vídeos' },
    ]} />

    <div className={styles.centerData}>
      <div className={styles.textBox}>
        <h1 className={styles.mainProductTitle}>Vídeos Técnicos</h1>
        <p className={styles.just}>
          Confira os conteúdos audiovisuais técnicos organizados por processo de usinagem.
          Estes materiais são produzidos pelos fabricantes e distribuídos pela RECOM como referência técnica.
        </p>

        <h2 className={styles.productTitle}>TORNEAMENTO</h2>
        <ul className={`${styles.just} ${styles.squareList}`}>
          <li>Linha UE</li>
          <li>Quebra-cavacos MV</li>
          <li>Quebra-cavacos MW/SW</li>
          <li>Quebra-cavacos FJ/MJ/GJ</li>
          <li>Barras de Mandrilar</li>
          <li>Small Tool (SWISS TOOL)</li>
        </ul>

        <h2 className={styles.productTitle}>FRESAMENTO</h2>
        <ul className={`${styles.just} ${styles.squareList}`}>
          <li>AQX</li>
          <li>ASX400</li>
          <li>BXD</li>
          <li>AJX</li>
          <li>DLC</li>
          <li>SRM2</li>
          <li>APX</li>
          <li>M-Star</li>
          <li>VC-SFPR</li>
          <li>DLC-2MA</li>
          <li>Fresa tipo QMC</li>
        </ul>

        <h2 className={styles.productTitle}>FURAÇÃO</h2>
        <ul className={`${styles.just} ${styles.squareList}`}>
          <li>Sistema de furação inteiriça</li>
          <li>Broca super longa Wstar</li>
          <li>TAF</li>
          <li>TAW</li>
        </ul>

        <h2 className={styles.productTitle}>CLASSE</h2>
        <ul className={`${styles.just} ${styles.squareList}`}>
          <li>Cobertura CBN (MBC010)</li>
          <li>MB710/MB730</li>
          <li>UC5105/UC5115</li>
          <li>MB8025/MB810/MB835</li>
        </ul>

        <div className={styles.dataFooter}>
          <p className={styles.sourceText}>
            <strong>Fonte:</strong> MITSUBISHI MATERIALS
          </p>
        </div>

        <div style={{ textAlign: 'center', margin: '2rem 0' }}>
          <Link to="/solucoes" style={{
            display: 'inline-block',
            padding: '0.75rem 1.5rem',
            background: 'var(--accent-blue, #1a3a5c)',
            color: '#fff',
            textDecoration: 'none',
            borderRadius: '6px',
            fontWeight: 600,
            fontSize: '0.875rem',
          }}>
            Ver Soluções por Processo <ArrowRight size={14} style={{ verticalAlign: 'middle', marginLeft: '0.25rem' }} />
          </Link>
        </div>
      </div>
      <div className={styles.clear}></div>
    </div>
  </Layout>
);

export default Videos;
