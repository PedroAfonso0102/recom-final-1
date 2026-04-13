import React from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import styles from './Page.module.css';
import ProductSidebar from '../components/ProductSidebar';

const Torneamento = () => (
  <Layout>
    <div className={styles.location}>
      <div className={styles.whereCenter}>
        Você está em: <Link to="/">Home</Link> &gt; Produtos &gt; Torneamento
      </div>
    </div>
    <div className={styles.centerData}>
      <ProductSidebar />

        <div className={styles.textBox}>
          <div className={styles.mainProductTitle}>Torneamento</div>
          
          <div className={styles.safetyGrid}>
            <section className={styles.safetyCard}>
              <div className={styles.precautionZone}>
                <strong>CONTEÚDO TÉCNICO</strong>
                <h3 className={styles.productTitle} style={{ margin: 'var(--space-s) 0' }}>Inserto de Torneamento</h3>
                <ul className={`${styles.just} ${styles.squareList}`} style={{ fontSize: 'var(--text-sm)' }}>
                  <li>IDENTIFICAÇÃO</li>
                  <li>TOOL NAVI</li>
                  <li>APLICAÇÃO DE CLASSES E QUEBRA-CAVACOS (PDF)</li>
                  <li>SISTEMA DE QUEBRA-CAVACO RETIFICADOS</li>
                  <li>INSERTO ALISADOR</li>
                </ul>
              </div>
            </section>

            <section className={styles.safetyCard}>
              <div className={styles.precautionZone}>
                <strong>FERRAMENTARIA</strong>
                <h3 className={styles.productTitle} style={{ margin: 'var(--space-s) 0' }}>Small Tools</h3>
                <ul className={`${styles.just} ${styles.squareList}`} style={{ fontSize: 'var(--text-sm)' }}>
                  <li>APRESENTAÇÃO DE SMALL TOOLS</li>
                  <li>CLASSIFICAÇÃO DAS FERRAMENTAS PARA TORNOS AUTOMÁTICOS</li>
                </ul>
              </div>
            </section>

            <section className={styles.safetyCard}>
              <div className={styles.precautionZone}>
                <strong>OPERAÇÕES GERAIS</strong>
                <h3 className={styles.productTitle} style={{ margin: 'var(--space-s) 0' }}>Rosqueamento</h3>
                <ul className={`${styles.just} ${styles.squareList}`} style={{ fontSize: 'var(--text-sm)' }}>
                  <li>ROSCA STANDARD E INSERTO</li>
                  <li>CARACTERÍSTICAS DA LINHA MMT</li>
                  <li>MÉTODO DE ROSQUEAMENTO</li>
                </ul>
              </div>
            </section>

            <section className={styles.safetyCard}>
              <div className={styles.precautionZone}>
                <strong>MANDRILHAMENTO</strong>
                <h3 className={styles.productTitle} style={{ margin: 'var(--space-s) 0' }}>Furação e Mandrilar</h3>
                <ul className={`${styles.just} ${styles.squareList}`} style={{ fontSize: 'var(--text-sm)' }}>
                  <li>IDENTIFICAÇÃO (PCD e CBN)</li>
                  <li>CARACTERÍSTICAS DA DIMPLE BAR</li>
                  <li>BARRAS DE MANDRILAR MICRO-MINI</li>
                </ul>
              </div>
            </section>
          </div>

        <div className={styles.promoCallout}>
          <h4 className={styles.promoCalloutTitle}>Identificou a ferramenta ideal?</h4>
          <p className={styles.just}>
            Consulte disponibilidade no catálogo ou solicite um orçamento direto com nossa engenharia de aplicações.
          </p>
          <div className={styles.ctaGrid}>
            <Link to="/Catalogo" className={`${styles.promoCta} ${styles.btnSecondary}`}>Acessar Catálogo</Link>
            <Link to="/Contato" className={styles.promoCta}>Falar com o Comercial</Link>
          </div>
        </div>

        <div className={styles.dataFooter}>
          <p className={styles.sourceText}>
            <strong>Fonte:</strong> MITSUBISHI MATERIALS
          </p>
        </div>
      </div>
      <div className={styles.clear}></div>
    </div>
  </Layout>
);

export default Torneamento;
