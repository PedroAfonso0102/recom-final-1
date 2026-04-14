import React from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import styles from './Page.module.css';
import ProductSidebar from '../components/ProductSidebar';
import fresaImg from '../assets/images/Upscaled/fresa-Bf0r_sxm.png';

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
          
          <section className={styles.modularSection}>
            <div className={styles.modularText}>
              <h3 className={styles.productTitle}>Fresamento e Sistemas de Fixação</h3>
              <p className={styles.just}>
                O fresamento é um processo de usinagem extremamente versátil, onde a ferramenta rotativa remove material para criar superfícies, cavidades e perfis complexos. A RECOM fornece soluções completas da Mitsubishi Materials, abrangendo desde fresas de topo inteiriças de metal duro até cabeçotes intercambiáveis de alta performance.
              </p>
              <ul className={`${styles.just} ${styles.squareList}`}>
                <li><strong>Fresas de Topo:</strong> Soluções para desbaste e acabamento em uma ampla gama de materiais.</li>
                <li><strong>Insertos Intercambiáveis:</strong> Classes e geometrias otimizadas para máxima vida útil da ferramenta.</li>
                <li><strong>Tecnologia HSK:</strong> Sistemas de fixação de alta precisão para trocas rápidas e rigidez superior.</li>
              </ul>
            </div>
            <div className={styles.modularVisual}>
              <img src={fresaImg} alt="Fresamento de Alta Performance" className="res-img-standard" style={{ maxWidth: '100%', height: 'auto' }} />
            </div>
          </section>

          <div className={styles.highlightBlock}>
            <h4 className={styles.promoCalloutTitle}>Inovação em Fresamento</h4>
            <p className={styles.just}>
                Nossa linha de fresamento inclui as famosas séries AQX, ASX e AJX, projetadas para reduzir vibrações e aumentar as taxas de remoção de metal em operações críticas de moldes, matrizes e componentes aeroespaciais.
            </p>
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
