import React from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import styles from './Page.module.css';
import ProductSidebar from '../components/ProductSidebar';

const Furacao = () => (
  <Layout>
    <div className={styles.location}>
      <div className={styles.whereCenter}>
        Você está em: <Link to="/">Home</Link> &gt; Produtos &gt; Furação
      </div>
    </div>
    <div className={styles.centerData}>
      <ProductSidebar />

        <div className={styles.textBox}>
          <div className={styles.mainProductTitle}>Furação</div>
          
          <div className={styles.safetyGrid}>
            <section className={styles.safetyCard}>
              <div className={styles.precautionZone}>
                <strong>INTEIRIÇO</strong>
                <h3 className={styles.productTitle} style={{ margin: 'var(--space-s) 0' }}>Metal Duro</h3>
                <ul className={`${styles.just} ${styles.squareList}`} style={{ fontSize: 'var(--text-sm)' }}>
                  <li>PEQUENOS DIÂMETROS MWS</li>
                  <li>MWE / MWS (BROCAS WSTAR)</li>
                  <li>MNS / MNS_DB (BROCAS WSTAR)</li>
                  <li>MGS (BROCA CANHÃO)</li>
                </ul>
              </div>
            </section>

            <section className={styles.safetyCard}>
              <div className={styles.precautionZone}>
                <strong>INTERCAMBIÁVEL</strong>
                <h3 className={styles.productTitle} style={{ margin: 'var(--space-s) 0' }}>Sistemas Autorais</h3>
                <ul className={`${styles.just} ${styles.squareList}`} style={{ fontSize: 'var(--text-sm)' }}>
                  <li>S-TAW / TAW SYSTEM</li>
                  <li>TAFS / TAFM / TAFL</li>
                  <li>BUCHA EXPANSIVA (JFS)</li>
                </ul>
              </div>
            </section>

            <section className={styles.safetyCard}>
              <div className={styles.precautionZone}>
                <strong>ESPECIAIS</strong>
                <h3 className={styles.productTitle} style={{ margin: 'var(--space-s) 0' }}>Tipo Soldada</h3>
                <ul className={`${styles.just} ${styles.squareList}`} style={{ fontSize: 'var(--text-sm)' }}>
                  <li>BRS / BRM / BRK</li>
                  <li>BRA / BRL</li>
                </ul>
              </div>
            </section>

            <section className={styles.safetyCard}>
              <div className={styles.precautionZone}>
                <strong>REFERÊNCIA</strong>
                <h3 className={styles.productTitle} style={{ margin: 'var(--space-s) 0' }}>Identificação</h3>
                <ul className={`${styles.just} ${styles.squareList}`} style={{ fontSize: 'var(--text-sm)' }}>
                  <li>SÍMBOLOS E DESCRIÇÕES</li>
                  <li>PARÂMETROS DE CORTE</li>
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

export default Furacao;
