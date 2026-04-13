import React from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import styles from './Page.module.css';
import ProductSidebar from '../components/ProductSidebar';

const Fresamento = () => (
  <Layout>
    <div className={styles.location}>
      <div className={styles.whereCenter}>
        Você está em: <Link to="/">Home</Link> &gt; Produtos &gt; Fresamento
      </div>
    </div>
    <div className={styles.centerData}>
      <ProductSidebar />

        <div className={styles.textBox}>
          <div className={styles.mainProductTitle}>Fresamento</div>
          
          <div className={styles.safetyGrid}>
            <section className={styles.safetyCard}>
              <div className={styles.precautionZone}>
                <strong>INTEIRIÇAS</strong>
                <h3 className={styles.productTitle} style={{ margin: 'var(--space-s) 0' }}>Fresas de Topo</h3>
                <ul className={`${styles.just} ${styles.squareList}`} style={{ fontSize: 'var(--text-sm)' }}>
                  <li>IDENTIFICAÇÃO</li>
                  <li>DESCRIÇÕES DOS SÍMBOLOS</li>
                </ul>
              </div>
            </section>

            <section className={styles.safetyCard}>
              <div className={styles.precautionZone}>
                <strong>INTERCAMBIÁVEIS</strong>
                <h3 className={styles.productTitle} style={{ margin: 'var(--space-s) 0' }}>Insertos</h3>
                <ul className={`${styles.just} ${styles.squareList}`} style={{ fontSize: 'var(--text-sm)' }}>
                  <li>IDENTIFICAÇÃO DE INSERTOS</li>
                  <li>CLASSES DE FRESAMENTO</li>
                  <li>INSERTOS DE FURAÇÃO</li>
                </ul>
              </div>
            </section>

            <section className={styles.safetyCard}>
              <div className={styles.precautionZone}>
                <strong>TECNOLOGIA HSK</strong>
                <h3 className={styles.productTitle} style={{ margin: 'var(--space-s) 0' }}>Sistemas de Fixação</h3>
                <ul className={`${styles.just} ${styles.squareList}`} style={{ fontSize: 'var(--text-sm)' }}>
                  <li>APRESENTAÇÃO FERRAMENTAS HSK</li>
                  <li>TROCA-RÁPIDA</li>
                  <li>SISTEMA HSK</li>
                </ul>
              </div>
            </section>

            <section className={styles.safetyCard}>
              <div className={styles.precautionZone}>
                <strong>OPERAÇÕES</strong>
                <h3 className={styles.productTitle} style={{ margin: 'var(--space-s) 0' }}>Fresas e Cabeçotes</h3>
                <ul className={`${styles.just} ${styles.squareList}`} style={{ fontSize: 'var(--text-sm)' }}>
                  <li>FRESAS DE FACEAR</li>
                  <li>FRESAS TANGENCIAIS</li>
                  <li>FERRAMENTAS DE MANDRILAR</li>
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

export default Fresamento;
