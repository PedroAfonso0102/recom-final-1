import React from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

import logoMitsubishi from '../assets/images/logo_mitsubishi.png';
import logo7leaders from '../assets/images/logo_7leaders.png';
import logoBtfixo from '../assets/images/logo_btfixo.png';
import logoKifix from '../assets/images/logo_kifix.png';
import logoMit from '../assets/images/LOGO-MIT.png';

const Home = () => {
  return (
    <Layout>
      {/* Hero Banner Industrial */}
      <div className={styles.heroBanner}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <span className={styles.heroBadge}>PRECISÃO ABSOLUTA</span>
          <h1 className={styles.heroTitle}>A EXCELÊNCIA EM METAL DURO</h1>
          <p className={styles.heroDescription}>
            Distribuidor técnico autorizado Mitsubishi Materials desde 1990. 
            Soluções avançadas em ferramentas de corte e usinagem de alta performance para a indústria metalúrgica.
          </p>
          <div className={styles.heroActions}>
            <Link to="/catalogo" className={styles.primaryBtn}>Acessar Catálogo</Link>
            <Link to="/contato" className={styles.secondaryBtn}>Fale com um Especialista</Link>
          </div>
        </div>
      </div>

      <div className={styles.centerData}>
        {/* Fornecedores */}
        <div className={styles.sectionBox}>
          <h3 className={styles.sectionTitle}>Fornecedores Oficiais</h3>
          <div className={styles.brandsRow}>
            <a href="/catalogo-mitsubishi"><img src={logoMitsubishi} alt="Mitsubishi" /></a>
            <a href="/catalogo-7leaders"><img src={logo7leaders} alt="7Leaders" /></a>
            <a href="/btfixo"><img src={logoBtfixo} alt="BT Fixo" /></a>
            <a href="/catalogo-kifix"><img src={logoKifix} alt="Kifix" /></a>
          </div>
        </div>

        {/* Produtos em Destaque - full width */}
        <div className={styles.sectionBox}>
          <h3 className={styles.sectionTitle}>Sistemas de Usinagem em Destaque</h3>
          <div className={styles.produtosGrid}>
            <div className={styles.produtoCard}>
              <div className={styles.produtoIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="2"></circle></svg>
              </div>
              <strong>S-TAW / TAW</strong>
              <p>Brocas intercambiáveis de alta performance para furação precisa</p>
            </div>
            <div className={styles.produtoCard}>
              <div className={styles.produtoIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
              </div>
              <strong>MWS Series</strong>
              <p>Brocas inteiriças com refrigeração interna para maior vida útil</p>
            </div>
            <div className={styles.produtoCard}>
              <div className={styles.produtoIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
              </div>
              <strong>WSTAR Long</strong>
              <p>Sistemas otimizados para furação profunda e extrema precisão</p>
            </div>
            <div className={styles.produtoCard}>
              <div className={styles.produtoIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
              </div>
              <strong>Fresamento XP</strong>
              <p>Insertos multiarestas para desbaste em alto avanço</p>
            </div>
          </div>
        </div>

        {/* Two-column: Vídeo + Atualizações Técnicas */}
        <div className={styles.twoColumnRow}>
          {/* Vídeo */}
          <div className={styles.columnLeft}>
            <div className={styles.sectionBox}>
              <h3 className={styles.sectionTitle}>
                Demonstração Técnica
                <img src={logoMit} className={styles.videoLogo} alt="Mitsubishi" />
              </h3>
              <div className={styles.videoWrapper}>
                <div className={styles.mockVideo}>
                   <svg width="48" height="48" viewBox="0 0 24 24" fill="var(--accent-blue)" stroke="none"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                   <p>Apresentação Sistema DIAEDGE</p>
                </div>
              </div>
            </div>
          </div>

          {/* Novidades */}
          <div className={styles.columnRight}>
            <div className={styles.sectionBox}>
              <h3 className={styles.sectionTitle}>Atualizações Técnicas</h3>
              <ul className={styles.newsList}>
                <li>
                  <h4>Nova Geração de Classes CVD - MC6100</h4>
                  <p className={styles.newsDesc}>Maior resistência ao desgaste em torneamento de aços ISO P.</p>
                  <p className={styles.newsDate}>Tecnologia 2026</p>
                </li>
                <li>
                  <h4>Catálogo Digital DIAEDGE</h4>
                  <p className={styles.newsDesc}>Acesse a versão atualizada com a nova linha completa de fresamento.</p>
                  <p className={styles.newsDate}>Lançamento Recente</p>
                </li>
                <li>
                  <h4>Soluções de Furação MV</h4>
                  <p className={styles.newsDesc}>Geometrias inovadoras que superam os limites do aço inoxidável.</p>
                  <p className={styles.newsDate}>Em Destaque</p>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default Home;
