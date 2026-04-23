import React from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import { Target, Droplets, Layers, Hexagon, Play, ArrowRight } from 'lucide-react';
import styles from './Home.module.css';

import logoMitsubishi from '../assets/images/logo_mitsubishi.png';
import logo7leaders from '../assets/images/logo_7leaders.png';
import logoBTFixo from '../assets/images/logo_btfixo.png';
import logoKifix from '../assets/images/logo_kifix.png';
import logoMit from '../assets/images/LOGO-MIT.png';

// - [x] Integrate high-fidelity 3D technical renders for featured products
// - [x] Fix layout overlaps in the "Sistemas de Usinagem em Destaque" section
// - [x] Implement CSS-based tooltips for ISO material categories
// - [x] Ensure consistent 8pt Swiss grid alignment across all interactive cards
// - [x] Standardize color-coded ISO badges (P, M, K, N, S, H)

// Import featured product technical renders
import featuredDrill from '../assets/images/featured_drill.png';
import featuredMilling from '../assets/images/Upscaled/fresa-Bf0r_sxm.png';
import featuredMws from '../assets/images/featured_mws.png';
import featuredWstar from '../assets/images/featured_wstar.png';

const isoLabels = {
  P: 'Aços',
  M: 'Aços Inoxidáveis',
  K: 'Ferros Fundidos',
  N: 'Metais Não Ferrosos',
  S: 'Superligas Termorresistentes',
  H: 'Materiais Endurecidos'
};

const Home = () => {
  return (
    <Layout>
      {/* Hero Banner Industrial */}
      <div className={styles.heroBanner}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <span className={styles.heroBadge}>PRECISÃO ABSOLUTA</span>
          <h1 className={styles.heroTitle}>Performance Industrial em Ferramentas de Corte</h1>
          <p className={styles.heroDescription}>
            Distribuição técnica autorizada Mitsubishi Materials. Soluções de alta precisão para usinagem desde 1990.
          </p>
          <div className={styles.heroActions}>
            <Link to="/contato" className={styles.primaryBtn}>Solicitar Orçamento</Link>
            <Link to="/produtos" className={styles.secondaryBtn}>Ver Soluções</Link>
          </div>
        </div>
      </div>

      <div className={styles.centerData}>
        {/* Fornecedores */}
        <div className={styles.sectionBox}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Distribuição Autorizada</h3>
            <p className={styles.sectionSubtitle}>Parcerias estratégicas com líderes globais para garantir máxima tecnologia e autoridade técnica.</p>
          </div>
          <div className={styles.brandsRow}>
            <a href="/catalogo-mitsubishi"><img src={logoMitsubishi} alt="Mitsubishi" className="res-img-logo" /></a>
            <a href="/catalogo-7leaders"><img src={logo7leaders} alt="7Leaders" className="res-img-logo" /></a>
            <a href="/btfixo"><img src={logoBTFixo} alt="BT Fixo" className="res-img-logo" /></a>
            <a href="/catalogo-kifix"><img src={logoKifix} alt="Kifix" className="res-img-logo" /></a>
          </div>
        </div>

        {/* Produtos em Destaque - full width */}
        <div className={styles.sectionBox}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Sistemas de Usinagem em Destaque</h3>
            <p className={styles.sectionSubtitle}>Ferramentas de alta performance projetadas para máxima produtividade e economia de processos.</p>
          </div>
          <div className={styles.produtosGrid}>
            <Link to="/produtos" className={styles.produtoCard}>
              <div className={styles.cardVisual}>
                <img src={featuredDrill} alt="S-TAW System" className="res-img-card" />
              </div>
              <div className={styles.cardInfo}>
                <div className={styles.produtoHeader}>
                  <div className={styles.produtoIcon}>
                    <Target size={20} strokeWidth={2} />
                  </div>
                  <strong>S-TAW / TAW</strong>
                </div>
                <p>Brocas intercambiáveis de alta performance para furação de precisão industrial.</p>
                <div className={styles.cardFooter}>
                  <div className={styles.isoBadgeRow}>
                    <span className={`${styles.isoBadge} ${styles.isoP}`} data-label={isoLabels.P}>P</span>
                    <span className={`${styles.isoBadge} ${styles.isoK}`} data-label={isoLabels.K}>K</span>
                  </div>
                  <span className={styles.verDetalhes}>Ver Detalhes <ArrowRight size={14} /></span>
                </div>
              </div>
            </Link>

            <Link to="/produtos" className={styles.produtoCard}>
              <div className={styles.cardVisual}>
                <img src={featuredMws} alt="MWS Series" className="res-img-card" />
              </div>
              <div className={styles.cardInfo}>
                <div className={styles.produtoHeader}>
                  <div className={styles.produtoIcon}>
                    <Droplets size={20} strokeWidth={2} />
                  </div>
                  <strong>MWS Series</strong>
                </div>
                <p>Brocas inteiriças com refrigeração interna otimizada para alta vida útil.</p>
                <div className={styles.cardFooter}>
                  <div className={styles.isoBadgeRow}>
                    <span className={`${styles.isoBadge} ${styles.isoP}`} data-label={isoLabels.P}>P</span>
                    <span className={`${styles.isoBadge} ${styles.isoM}`} data-label={isoLabels.M}>M</span>
                  </div>
                  <span className={styles.verDetalhes}>Ver Detalhes <ArrowRight size={14} /></span>
                </div>
              </div>
            </Link>

            <Link to="/produtos" className={styles.produtoCard}>
              <div className={styles.cardVisual}>
                <img src={featuredWstar} alt="WSTAR Long" className="res-img-card" />
              </div>
              <div className={styles.cardInfo}>
                <div className={styles.produtoHeader}>
                  <div className={styles.produtoIcon}>
                    <Layers size={20} strokeWidth={2} />
                  </div>
                  <strong>WSTAR Long</strong>
                </div>
                <p>Sistemas especializados para furação profunda com extrema precisão geométrica.</p>
                <div className={styles.cardFooter}>
                  <div className={styles.isoBadgeRow}>
                    <span className={`${styles.isoBadge} ${styles.isoP}`} data-label={isoLabels.P}>P</span>
                    <span className={`${styles.isoBadge} ${styles.isoH}`} data-label={isoLabels.H}>H</span>
                  </div>
                  <span className={styles.verDetalhes}>Ver Detalhes <ArrowRight size={14} /></span>
                </div>
              </div>
            </Link>

            <Link to="/produtos" className={styles.produtoCard}>
              <div className={styles.cardVisual}>
                <img src={featuredMilling} alt="High Feed Milling" className="res-img-card" />
              </div>
              <div className={styles.cardInfo}>
                <div className={styles.produtoHeader}>
                  <div className={styles.produtoIcon}>
                    <Hexagon size={20} strokeWidth={2} />
                  </div>
                  <strong>Fresamento XP</strong>
                </div>
                <p>Insertos multiarestas projetados para desbaste em alto avanço e produtividade.</p>
                <div className={styles.cardFooter}>
                  <div className={styles.isoBadgeRow}>
                    <span className={`${styles.isoBadge} ${styles.isoP}`} data-label={isoLabels.P}>P</span>
                    <span className={`${styles.isoBadge} ${styles.isoS}`} data-label={isoLabels.S}>S</span>
                  </div>
                  <span className={styles.verDetalhes}>Ver Detalhes <ArrowRight size={14} /></span>
                </div>
              </div>
            </Link>
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
                <iframe
                  className={styles.videoEmbed}
                  src="https://www.youtube.com/embed/V7V6Gv_D3_E"
                  title="Demonstração Técnica Mitsubishi"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <div className={styles.videoOverlay}>
                   <div className={styles.playBtn}>
                      <Play size={32} fill="currentColor" />
                   </div>
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
                  <div className={styles.newsBadge}>Tecnologia 2026</div>
                  <h4>Nova Geração de Classes CVD - MC6100</h4>
                  <ul className={styles.newsBullets}>
                    <li>Resistência superior ao desgaste térmico</li>
                    <li>Otimizado para torneamento de aços ISO P</li>
                    <li>Aumento de produtividade em até 30%</li>
                  </ul>
                  <div className={styles.newsFooter}>
                    <span>Ver ficha técnica</span>
                    <ArrowRight size={14} />
                  </div>
                </li>
                <li>
                  <div className={styles.newsBadge}>Lançamento</div>
                  <h4>Catálogo Digital DIAEDGE</h4>
                  <p className={styles.newsDesc}>Acesse a versão atualizada com a nova linha completa de fresamento e torneamento.</p>
                  <div className={styles.newsFooter}>
                    <span>Acessar catálogo</span>
                    <ArrowRight size={14} />
                  </div>
                </li>
                <li>
                  <h4>Soluções de Furação MV</h4>
                  <p className={styles.newsDesc}>Geometrias inovadoras que superam os limites do aço inoxidável.</p>
                  <div className={styles.newsFooter}>
                    <span className={styles.newsDate}>Em Destaque</span>
                    <ArrowRight size={14} />
                  </div>
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
