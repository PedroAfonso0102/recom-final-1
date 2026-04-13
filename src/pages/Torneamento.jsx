import React from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import styles from './Page.module.css';
import ProductSidebar from '../components/ProductSidebar';

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
        
        <h3 className={styles.productTitle}>Inserto de Torneamento</h3>
        <ul className={`${styles.just} ${styles.squareList}`}>
          <li>IDENTIFICAÇÃO</li>
          <li>TOOL NAVI</li>
          <li>APLICAÇÃO DE CLASSES E QUEBRA-CAVACOS PARA TORNEAMENTO (PDF: 561KB)</li>
          <li>SISTEMA DE QUEBRA-CAVACO RETIFICADOS</li>
          <li>INSERTO ALISADOR</li>
        </ul>

        <h3 className={styles.productTitle}>Small Tools</h3>
        <ul className={`${styles.just} ${styles.squareList}`}>
          <li>APRESENTAÇÃO DE SMALL TOOLS</li>
          <li>CLASSIFICAÇÃO DAS FERRAMENTAS DE TORNEAMENTO EXTERNO
            <ul className={styles.circleList}>
              <li>FERRAMENTAS PARA MAGAZINES</li>
              <li>TORRES OPOSTAS</li>
              <li>TIPO MAGAZINES</li>
              <li>TORNOS COM CAME</li>
            </ul>
          </li>
        </ul>

        <h3 className={styles.productTitle}>Rosqueamento</h3>
        <ul className={`${styles.just} ${styles.squareList}`}>
          <li>ROSCA STANDARD E INSERTO • SUPORTES CORRESPONDENTES</li>
          <li>CARACTERÍSTICAS DA LINHA MMT</li>
          <li>MÉTODO DE ROSQUEAMENTO
            <ul className={styles.circleList}>
              <li>MÉTODO DE ROSQUEAMEN</li>
              <li>TIPOS DE INSERTOS</li>
              <li>MÉTODOS DE AVANÇO</li>
              <li>PROFUNDIDADE DE ROSCA</li>
            </ul>
          </li>
          <li>SELECIONANDO CONDIÇÕES DE CORTE</li>
          <li>ESCOLHENDO O CALÇO DO INSERTO PARA A LINHA MMT</li>
          <li>PADRÃO DE PROFUNDIDADE DE CORTE</li>
        </ul>

        <h3 className={styles.productTitle}>Inserto de Torneamento ( PCD e CBN )</h3>
        <ul className={`${styles.just} ${styles.squareList}`}>
          <li>IDENTIFICAÇÃO</li>
        </ul>

        <h3 className={styles.productTitle}>Ferramentas para Torneamento Externo</h3>
        <ul className={`${styles.just} ${styles.squareList}`}>
          <li>IDENTIFICAÇÃO
            <ul className={styles.circleList}>
              <li>Tipo LL, Tipo Dupla Fixação, Tipo WP, Tipo SP, Suporte para Perfilar, Tipo AL</li>
              <li>Tipo ML, Tipo MC</li>
            </ul>
          </li>
        </ul>

        <h3 className={styles.productTitle}>Madrilhamento</h3>
        <ul className={`${styles.just} ${styles.squareList}`}>
          <li>IDENTIFICAÇÃO
            <ul className={styles.circleList}>
              <li>DIMPLE BAR</li>
              <li>Suportes para Torneamento Interno ISO [Para Alumínio, tipo-M, tipo-P e tipo-S]</li>
            </ul>
          </li>
          <li>CARACTERÍSTICAS DA DIMPLE BAR</li>
          <li>AFIAÇÃO DE ARESTA DE CORTE DE BARRAS DE MANDRILAR MICRO-MINI</li>
        </ul>

        <h3 className={styles.productTitle}>Canal Externo</h3>
        <ul className={`${styles.just} ${styles.squareList}`}>
          <li>CARACTERÍSTICAS DA SÉRIE GY</li>
          <li>REFERÊNCIA PARA PEDIDO DA SÉRIE GY
            <ul className={styles.circleList}>
              <li>INSERTO</li>
              <li>LOCALIZADOR</li>
              <li>SUPORTE MODULAR (EXTERNO)</li>
            </ul>
          </li>
        </ul>

        <h3 className={styles.productTitle}>Canal</h3>
        <ul className={`${styles.just} ${styles.squareList}`}>
          <li>IDENTIFICAÇÃO DE SUPORTE DG
            <ul className={styles.circleList}>
              <li>SUPORTE DG</li>
              <li>GRAMPO DE FIXAÇÃO</li>
              <li>CONJUNTO DE PORTA-FERRAMENTAS</li>
              <li>ESTRUTURA</li>
              <li>LOCALIZADOR (Para canal externo e rebaixo)</li>
              <li>LOCALIZADOR (Para canal de face)</li>
            </ul>
          </li>
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

export default Torneamento;
