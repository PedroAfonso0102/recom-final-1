import React from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import styles from './Page.module.css';
import ProductSidebar from '../components/ProductSidebar';

const Videos = () => (
  <Layout>
    <div className={styles.location}>
      <div className={styles.whereCenter}>
        Você está em: <Link to="/">Home</Link> &gt; Produtos &gt; Vídeos
      </div>
    </div>
    <div className={styles.centerData}>
      <ProductSidebar />

      <div className={styles.textBox}>
        <div className={styles.mainProductTitle}>Vídeos</div>
        
        <h3 className={styles.productTitle}>TORNEAMENTO</h3>
        <ul className={`${styles.just} ${styles.squareList}`}>
          <li>Linha UE</li>
          <li>Quebra-cavacos MV</li>
          <li>Quebra-cavacos MW/SW</li>
          <li>Quebra-cavacos FJ/MJ/GJ</li>
          <li>Barras de Mandrilar</li>
          <li>Small Tool (SWISS TOOL)</li>
        </ul>

        <h3 className={styles.productTitle}>FRESAMENTO</h3>
        <ul className={styles.just} style={{ listStyle: 'square', paddingLeft: '20px' }}>
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

        <h3 className={styles.productTitle}>FURAÇÃO</h3>
        <ul className={styles.just} style={{ listStyle: 'square', paddingLeft: '20px' }}>
          <li>Sistema de furação inteiriça</li>
          <li>Broca super longa Wstar</li>
          <li>TAF</li>
          <li>TAW</li>
        </ul>

        <h3 className={styles.productTitle}>CLASSE</h3>
        <ul className={styles.just} style={{ listStyle: 'square', paddingLeft: '20px' }}>
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
      </div>
      <div className={styles.clear}></div>
    </div>
  </Layout>
);

export default Videos;

