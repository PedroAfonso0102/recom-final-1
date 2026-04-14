import React from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import styles from './Page.module.css';
import ProductSidebar from '../components/ProductSidebar';

const Seguranca = () => (
  <Layout>
    <div className={styles.location}>
      <div className={styles.whereCenter}>
        Você está em: <Link to="/">Home</Link> &gt; Produtos &gt; Segurança nas Ferramentas
      </div>
    </div>
    <div className={styles.centerData}>
      <ProductSidebar />        <div className={styles.textBox}>
          <div className={styles.mainProductTitle}>Segurança nas Ferramentas</div>
          
          <div className={styles.modularSection} style={{ marginBottom: 'var(--space-xl)' }}>
            <div className={styles.modularText}>
              <h3 className={styles.productTitle}>Utilização de Ferramentas de Corte</h3>
              <p className={styles.just}>
                As embalagens dos produtos Mitsubishi trazem uma etiqueta com um aviso. Leia com atenção as indicações de segurança contidas nesta seção do catálogo antes de manusear ferramentas e outros materiais de metal duro.
              </p>
            </div>
          </div>

          <div className={styles.safetyGrid}>
            <section className={styles.safetyCard}>
              <div className={styles.precautionZone}>
                <strong>ESPECIFICAÇÕES</strong>
                <h3 className={styles.productTitle} style={{ margin: 'var(--space-s) 0' }}>Características Físicas</h3>
                <ul className={`${styles.just} ${styles.squareList}`} style={{ fontSize: 'var(--text-sm)' }}>
                  <li><strong>Dureza:</strong> HV500 - 12000kg/mm²</li>
                  <li><strong>Peso:</strong> Varia entre 3-16 g/cm³</li>
                  <li><strong>Composição:</strong> W, Ti, Al, Si, Ta, B + Co, Ni, Cr, Mo</li>
                </ul>
              </div>
            </section>

            <section className={styles.safetyCard}>
              <div className={styles.precautionZone}>
                <strong>MANUSEIO</strong>
                <h3 className={styles.productTitle} style={{ margin: 'var(--space-s) 0' }}>Sugestões de Uso</h3>
                <ul className={`${styles.just} ${styles.squareList}`} style={{ fontSize: 'var(--text-sm)' }}>
                  <li>Evite choques mecânicos e apertos excessivos.</li>
                  <li>Atenção ao peso elevado em grandes lotes.</li>
                  <li>Sensível à corrosão por óleos refrigerantes.</li>
                </ul>
              </div>
            </section>

            <section className={styles.safetyCard}>
              <div className={styles.precautionZone}>
                <strong>PROTEÇÃO</strong>
                <h3 className={styles.productTitle} style={{ margin: 'var(--space-s) 0' }}>Saúde Ocupacional</h3>
                <ul className={`${styles.just} ${styles.squareList}`} style={{ fontSize: 'var(--text-sm)' }}>
                  <li>Utilize ventilação local e máscaras (Poeira).</li>
                  <li>Evite inalação de partículas de metal pesado.</li>
                  <li>Proteção ocular obrigatória em reafiação.</li>
                </ul>
              </div>
            </section>

            <section className={styles.safetyCard}>
              <div className={styles.precautionZone}>
                <strong>DOCUMENTAÇÃO</strong>
                <h3 className={styles.productTitle} style={{ margin: 'var(--space-s) 0' }}>Links Técnicos</h3>
                <p style={{ fontSize: 'var(--text-sm)' }}>
                  Acesse o Catálogo de Dados de Segurança (MSDS) oficial:<br/>
                  <a href="http://www.mitsubishicarbide.com/msds/" target="_blank" rel="noopener noreferrer" className={styles.contactLink}>Acessar MSDS Global</a>
                </p>
              </div>
            </section>
          </div>

        <div className={styles.promoCallout} style={{ marginTop: 'var(--space-xl)' }}>
          <h4 className={styles.promoCalloutTitle}>Compromisso com a Segurança</h4>
          <p className={styles.just}>
            A RECOM prioriza a integridade técnica de seus processos. Em caso de dúvidas sobre o manuseio seguro de ferramentas, entre em contato com nosso suporte técnico especializado.
          </p>
          <div className={styles.ctaGrid}>
            <Link to="/Contato" className={styles.promoCta}>Consultar Engenharia</Link>
          </div>
        </div>

        <div className={styles.dataFooter}>
          <p className={styles.sourceText}>
            <strong>Fonte:</strong> MITSUBISHI MATERIALS<br />
            Para maiores informações, consulte o Catálogo de Dados de Segurança (MSDS).
          </p>
        </div>
      </div>
      <div className={styles.clear}></div>
    </div>
  </Layout>
);

export default Seguranca;
