import React from 'react';
import { Layout } from '../components/Layout';
import { Link } from 'react-router-dom';
import styles from './Page.module.css';
import { ProductSidebar } from '../components/ProductSidebar';
import koudoeImg from '../assets/images/Upscaled/koudoe.png';

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
          
          <section className={styles.modularSection}>
            <div className={styles.modularText}>
              <h3 className={styles.productTitle}>Torneamento de Alta Eficiência</h3>
              <p className={styles.just}>
                O torneamento é a base da usinagem industrial. Nossas soluções Mitsubishi Materials oferecem o equilíbrio perfeito entre resistência ao desgaste e tenacidade, garantindo performance superior em operações de desbaste pesado até o acabamento mais fino.
              </p>
              <ul className={`${styles.just} ${styles.squareList}`}>
                <li><strong>Insertos Indexáveis:</strong> Geometrias otimizadas para controle de cavaco superior.</li>
                <li><strong>Barras de Mandrilar:</strong> Sistemas antivibratórios para furos profundos.</li>
                <li><strong>Small Tools:</strong> Ferramentas específicas para tornos suíços e pequenos diâmetros.</li>
              </ul>
            </div>
            <div className={styles.modularVisual}>
              <img src={koudoeImg} alt="Torneamento de Precisão" className="res-img-standard" style={{ maxWidth: '100%', height: 'auto' }} />
            </div>
          </section>

          <div className={styles.highlightBlock}>
            <h4 className={styles.promoCalloutTitle}>Tecnologia de Cobertura Avançada</h4>
            <p className={styles.just}>
                Utilizamos as tecnologias de cobertura UC5115 e UC5105, que proporcionam uma vida útil estendida em ferros fundidos e aços, reduzindo o tempo de parada de máquina e o custo por peça.
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

export { Torneamento };
