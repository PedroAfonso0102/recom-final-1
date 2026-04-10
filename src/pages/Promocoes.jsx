import React from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import styles from './Page.module.css';
import promoImg from '../assets/images/promocao1410-2.jpg';

const Promocoes = () => {
  return (
    <Layout>
      <div className={styles.location}>
        <div className={styles.whereCenter}>
          Você está em: <Link to="/">Home</Link> &gt; Promoções
        </div>
      </div>
      
      <div className={styles.centerData}>
        <div className={styles.textBox} style={{ width: '100%' }}>
          <div className={styles.mainProductTitle}>Promoções e Ofertas Especiais</div>
          
          <p className={styles.just}>
            A RECOM Metal Duro oferece regularmente condições especiais em linhas selecionadas de ferramentas Mitsubishi Materials. Aproveite nossos preços competitivos para otimizar sua produção com o melhor custo-benefício do mercado.
          </p>

          <div className={styles.promoImageWrapper}>
            <img 
              src={promoImg} 
              alt="Promoção RECOM" 
              className={styles.promoImage}
            />
          </div>

          <div className={styles.promoCallout}>
            <h3 className={styles.promoCalloutTitle}>Interessado em nossas ofertas?</h3>
            <p className={styles.just}>
              Nossas promoções são atualizadas frequentemente. Para receber a lista completa de itens em oferta ou solicitar uma cotação especial para grandes volumes, entre em contato com nosso departamento comercial.
            </p>
            <div className={styles.promoCtaWrapper}>
              <Link to="/contato" className={styles.promoCta}>
                Solicitar Orçamento Agora
              </Link>
            </div>
          </div>

          <div className={styles.promoDisclaimer}>
            <p className={styles.just}>
              * Promoções válidas enquanto durarem os estoques. Imagens meramente ilustrativas.
            </p>
          </div>
        </div>
        <div className={styles.clear}></div>
      </div>
    </Layout>
  );
};

export default Promocoes;