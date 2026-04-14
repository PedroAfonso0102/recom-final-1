import React from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import styles from './Page.module.css';
import ProductSidebar from '../components/ProductSidebar';
import kougImg from '../assets/images/Upscaled/koug.png';

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
          
          <section className={styles.modularSection}>
            <div className={styles.modularText}>
              <h3 className={styles.productTitle}>Soluções de Furação WSTAR</h3>
              <p className={styles.just}>
                A furação é uma das operações mais comuns e críticas na manufatura. Nossas soluções de furação inteiriça e intercambiável são projetadas para precisão dimensional, excelente acabamento superficial e evacuação eficiente de cavacos.
              </p>
              <ul className={`${styles.just} ${styles.squareList}`}>
                <li><strong>Metal Duro Inteiriço:</strong> Brocas WSTAR para diâmetros pequenos e alta produtividade.</li>
                <li><strong>Sistemas Intercambiáveis:</strong> Flexibilidade com sistemas TAF e TAW para grandes diâmetros.</li>
                <li><strong>Brocas Especiais:</strong> Geometrias específicas para materiais exóticos e furos profundos.</li>
              </ul>
            </div>
            <div className={styles.modularVisual}>
              <img src={kougImg} alt="Sistemas de Furação" className="res-img-standard" style={{ maxWidth: '100%', height: 'auto' }} />
            </div>
          </section>

          <div className={styles.highlightBlock}>
            <h4 className={styles.promoCalloutTitle}>Alta Performance em Furos Profundos</h4>
            <p className={styles.just}>
                As brocas WSTAR da série MNS combinam um revestimento ultra-resistente com canais de refrigeração otimizados, permitindo furações de até 30xD com estabilidade incomparável.
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

export default Furacao;
