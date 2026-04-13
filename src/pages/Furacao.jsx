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
        
        <h3 className={styles.productTitle}>FURAÇÃO</h3>
        <ul className={`${styles.just} ${styles.squareList}`}>
          <li>IDENTIFICAÇÃO / DESCRIÇÕES DOS SÍMBOLOS</li>
        </ul>

        <h3 className={styles.productTitle}>FURAÇÃO (METAL DURO INTEIRIÇO)</h3>
        <ul className={`${styles.just} ${styles.squareList}`}>
          <li>PEQUENOS DIÂMETROS MWS (BROCAS WSTAR)</li>
          <li>MWE / MWS (BROCAS WSTAR)</li>
          <li>MWS_DB (BROCAS WSTAR)</li>
          <li>MNS / MNS_DB (BROCAS WSTAR)</li>
          <li>MHS (BROCAS WSTAR)</li>
          <li>MZE / MZS</li>
          <li>MGS (BROCA CANHÃO INTEIRIÇA)</li>
          <li>MAE / MAS</li>
        </ul>

        <h3 className={styles.productTitle}>FURAÇÃO (TIPO SOLDADA)</h3>
        <ul className={`${styles.just} ${styles.squareList}`}>
          <li>BRS / BRM / BRK</li>
          <li>BRA / BRL</li>
        </ul>

        <h3 className={styles.productTitle}>FURAÇÃO (TIPO INTERCAMBIÁVEL)</h3>
        <ul className={`${styles.just} ${styles.squareList}`}>
          <li>S-TAW</li>
          <li>TAW</li>
          <li>TAFS / TAFM / TAFL</li>
          <li>BUCHA EXPANSIVA (JFS)</li>
        </ul>

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
