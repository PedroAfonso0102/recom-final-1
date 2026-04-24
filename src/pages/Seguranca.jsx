import React from 'react';
import Layout from '../components/Layout';
import SEOHead from '../components/SEOHead';
import Breadcrumb from '../components/Breadcrumb';
import ActionButton from '../components/ActionButton';
import { ShieldCheck, AlertTriangle, ExternalLink, ArrowRight } from 'lucide-react';
import styles from './Page.module.css';

/**
 * Segurança nas Ferramentas — Página técnica institucional.
 * Batch 3: Removido ProductSidebar, adicionado SEOHead + Breadcrumb.
 * Breadcrumb: Início › Suporte Técnico › Segurança nas Ferramentas
 */
const Seguranca = () => (
  <Layout>
    <SEOHead
      title="Segurança nas Ferramentas de Metal Duro"
      description="Informações de segurança para manuseio de ferramentas de metal duro. Características físicas, precauções de uso e saúde ocupacional — com base nas diretrizes Mitsubishi Materials."
    />
    <Breadcrumb items={[
      { label: 'Início', to: '/' },
      { label: 'Suporte Técnico' },
      { label: 'Segurança nas Ferramentas' },
    ]} />

    <div className={styles.centerData}>
      <div className={styles.textBox}>
        <h1 className={styles.mainProductTitle}>Segurança nas Ferramentas</h1>
        
        <div className={`${styles.modularSection} ${styles.sectionBottomSpace}`}>
          <div className={styles.modularText}>
            <p className={styles.just}>
              As embalagens dos produtos Mitsubishi trazem uma etiqueta com um aviso. Leia com atenção as indicações de segurança contidas nesta seção do catálogo antes de manusear ferramentas e outros materiais de metal duro.
            </p>
          </div>
        </div>

        <div className={styles.safetyGrid}>
          <section className={styles.safetyCard}>
            <div className={styles.precautionZone}>
              <strong>ESPECIFICAÇÕES</strong>
              <h3 className={`${styles.productTitle} ${styles.tightTitle}`}>Características Físicas</h3>
              <ul className={`${styles.just} ${styles.squareList} ${styles.listSmall}`}>
                <li><strong>Dureza:</strong> HV500 - 12000kg/mm²</li>
                <li><strong>Peso:</strong> Varia entre 3-16 g/cm³</li>
                <li><strong>Composição:</strong> W, Ti, Al, Si, Ta, B + Co, Ni, Cr, Mo</li>
              </ul>
            </div>
          </section>

          <section className={styles.safetyCard}>
            <div className={styles.precautionZone}>
              <strong>MANUSEIO</strong>
              <h3 className={`${styles.productTitle} ${styles.tightTitle}`}>Sugestões de Uso</h3>
              <ul className={`${styles.just} ${styles.squareList} ${styles.listSmall}`}>
                <li>Evite choques mecânicos e apertos excessivos.</li>
                <li>Atenção ao peso elevado em grandes lotes.</li>
                <li>Sensível à corrosão por óleos refrigerantes.</li>
              </ul>
            </div>
          </section>

          <section className={styles.safetyCard}>
            <div className={styles.precautionZone}>
              <strong>PROTEÇÃO</strong>
              <h3 className={`${styles.productTitle} ${styles.tightTitle}`}>Saúde Ocupacional</h3>
              <ul className={`${styles.just} ${styles.squareList} ${styles.listSmall}`}>
                <li>Utilize ventilação local e máscaras (Poeira).</li>
                <li>Evite inalação de partículas de metal pesado.</li>
                <li>Proteção ocular obrigatória em reafiação.</li>
              </ul>
            </div>
          </section>

          <section className={styles.safetyCard}>
            <div className={styles.precautionZone}>
              <strong>DOCUMENTAÇÃO</strong>
              <h3 className={`${styles.productTitle} ${styles.tightTitle}`}>Links Técnicos</h3>
              <p className={styles.listSmall}>
                Acesse o Catálogo de Dados de Segurança (MSDS) oficial:<br/>
                <a href="http://www.mitsubishicarbide.com/msds/" target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                  <ExternalLink size={14} style={{ verticalAlign: 'middle', marginRight: '0.25rem' }} />
                  Acessar MSDS Global
                </a>
              </p>
            </div>
          </section>
        </div>

        <div className={`${styles.promoCallout} ${styles.sectionTopSpace}`}>
          <h4 className={styles.promoCalloutTitle}>Compromisso com a Segurança</h4>
          <p className={styles.just}>
            A RECOM prioriza a integridade técnica de seus processos. Em caso de dúvidas sobre o manuseio seguro de ferramentas, entre em contato com nosso suporte técnico especializado.
          </p>
          <div className={styles.ctaGrid}>
            <ActionButton to="/contato" variant="primary" stackOnMobile>
              Consultar Engenharia <ArrowRight size={14} style={{ verticalAlign: 'middle', marginLeft: '0.25rem' }} />
            </ActionButton>
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
