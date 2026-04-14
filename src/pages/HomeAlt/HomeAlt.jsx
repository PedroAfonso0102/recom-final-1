import React from 'react';
import { Link } from 'react-router-dom';

import fresamento1 from '../../assets/images/fresamento1.jpg';
import furacao1 from '../../assets/images/furacao1.jpg';
import furacao2 from '../../assets/images/furacao2.jpg';
import linhaMitsu from '../../assets/images/linha_mitsu.jpg';
import logo7leaders from '../../assets/images/logo_7leaders.png';
import logoBtfixo from '../../assets/images/logo_btfixo.png';
import logoKifix from '../../assets/images/logo_kifix.png';
import logoMitsubishi from '../../assets/images/logo_mitsubishi.png';
import torneamento1 from '../../assets/images/torneamento1.jpg';
import torneamento2 from '../../assets/images/torneamento2.jpg';
import fresa1 from '../../assets/images/Upscaled/fresa-Bf0r_sxm.png';
import { SteamPromoCard } from '../../components/common/SteamPromoCard';
import { Footer } from '../../components/layout/Footer';
import { Header } from '../../components/layout/Header';
import styles from './HomeAlt.module.css';

const weeklyPromos = [
  {
    title: 'S-TAW Brocas Intercambiáveis',
    subtitle: 'Diâmetros pequenos N112–N116',
    originalPrice: '1.250,00',
    discountPrice: '980,00',
    discountPercent: 22,
    imageUrl: furacao2,
    features: [
      'Metal duro com cobertura PVD',
      'Refrigeração interna',
      'Diâmetros de 12 a 16mm',
      'Frete grátis acima de 5 un.',
    ],
  },
  {
    title: 'MWE/MWS Brocas Inteiriças',
    subtitle: 'Super longa — N019 a N032',
    originalPrice: '890,00',
    discountPrice: '690,00',
    discountPercent: 23,
    imageUrl: torneamento2,
    features: [
      'Geometria otimizada',
      'Alta remoção de cavaco',
      'Furação profunda até 30xD',
      'Estoque imediato',
    ],
  },
  {
    title: 'Fresas de Topo AJX',
    subtitle: 'Fresamento de alto avanço',
    originalPrice: '2.150,00',
    discountPrice: '1.720,00',
    discountPercent: 20,
    imageUrl: fresa1,
    features: [
      'Insertos dupla-face',
      'Alta taxa de remoção',
      'Corpo de aço especial',
      'Condição para lotes > 3 un.',
    ],
  },
];

const categories = [
  {
    name: 'Torneamento',
    icon: '⟲',
    link: '/torneamento',
    desc: 'Insertos, suportes e barras de mandrilar adequadas para operações de alta complexidade em metal duro.',
    image: torneamento1,
  },
  {
    name: 'Fresamento',
    icon: '⟡',
    link: '/fresamento',
    desc: 'Fresas de topo, facear e disco que asseguram acabamento espelhado e taxas de remoção superiores.',
    image: fresamento1,
  },
  {
    name: 'Furação',
    icon: '⊙',
    link: '/furacao',
    desc: 'Brocas inteiriças e intercambiáveis com geometria otimizada para mínima deflexão direcional.',
    image: furacao1,
  },
];

const suppliers = [
  {
    logo: logoMitsubishi,
    name: 'Mitsubishi Materials',
    link: '/catalogo',
    desc: 'Distribuidor técnico autorizado',
  },
  { logo: logo7leaders, name: '7Leaders', link: '/catalogo', desc: 'The Art of Cutting' },
  { logo: logoBtfixo, name: 'BT Fixo', link: '/catalogo', desc: 'Sistemas de fixação' },
  { logo: logoKifix, name: 'Kifix', link: '/catalogo', desc: 'Grampos de fixação' },
];

/**
 * Página HomeAlt
 * Versão alternativa da Home com estilo Swiss Modern.
 *
 * @returns {JSX.Element} O componente da página.
 */
export const HomeAlt = () => {
  return (
    <div className={styles.page}>
      <Header />

      {/* HERO SECTION */}
      <section className={styles.hero}>
        <div className={styles.heroContentArea}>
          <span className={styles.heroBadge}>Desde 1990</span>
          <h1 className={styles.heroTitle}>
            Precisão
            <br />
            Absoluta
          </h1>
          <p className={styles.heroSubtitle}>
            Soluções industriais em ferramentas de corte de alta performance. Distribuidor técnico
            autorizado das líderes globais.
          </p>
          <div className={styles.heroCtas}>
            <Link to="/catalogo" className={styles.heroCtaPrimary}>
              Ver Catálogo Técnico
            </Link>
            <a
              href="https://wa.me/551932332224?text=Olá, busco uma solução de usinagem."
              target="_blank"
              rel="noopener noreferrer"
              className={styles.heroCtaSecondary}
            >
              Solicitar Engenharia
            </a>
          </div>
        </div>

        <div className={styles.heroImageArea}>
          <img
            src={linhaMitsu}
            alt="Usinagem de Alta Performance"
            className={`${styles.heroImg} res-img-standard`}
          />
        </div>
      </section>

      {/* WEEKLY PROMOS */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div>
              <span className={styles.sectionTag}>Ofertas Especiais</span>
              <h2 className={styles.sectionTitle}>Promoção da Semana</h2>
            </div>
            <Link to="/promocoes" className={styles.sectionLink}>
              Ver todas as promoções →
            </Link>
          </div>

          <div className={styles.promoGrid}>
            {weeklyPromos.map((promo, i) => (
              <SteamPromoCard key={i} {...promo} />
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCT CATEGORIES */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div>
              <span className={styles.sectionTag}>Conteúdo Técnico</span>
              <h2 className={styles.sectionTitle}>Nossas Especialidades</h2>
            </div>
            <Link to="/produtos" className={styles.sectionLink}>
              Tabelas Técnicas →
            </Link>
          </div>

          <div className={styles.processTimeline}>
            {categories.map((cat, i) => (
              <div
                key={i}
                className={`${styles.processRow} ${i % 2 !== 0 ? styles.processRowReversed : ''}`}
              >
                <div className={styles.processImage}>
                  <img src={cat.image} alt={cat.name} className="res-img-card" />
                </div>
                <div className={styles.processContent}>
                  <span className={styles.processNumber}>0{i + 1}</span>
                  <div className={styles.categoryIcon}>{cat.icon}</div>
                  <h3 className={styles.categoryName}>{cat.name}</h3>
                  <p className={styles.categoryDesc}>{cat.desc}</p>
                  <Link to={cat.link} className={styles.categoryArrow}>
                    Especificações Iniciais
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SUPPLIERS */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div>
              <span className={styles.sectionTag}>Parcerias</span>
              <h2 className={styles.sectionTitle}>Nossos Fornecedores</h2>
            </div>
          </div>

          <div className={styles.supplierGrid}>
            {suppliers.map((s, i) => (
              <Link to={s.link} key={i} className={styles.supplierCard}>
                <img src={s.logo} alt={s.name} className={`${styles.supplierLogo} res-img-logo`} />
                <div>
                  <h4 className={styles.supplierName}>{s.name}</h4>
                  <p className={styles.supplierDesc}>{s.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <h2 className={styles.ctaTitle}>Precisa de uma cotação personalizada?</h2>
          <p className={styles.ctaText}>
            Nossa equipe técnica está pronta para atender sua demanda com as melhores condições do
            mercado.
          </p>
          <div className={styles.ctaButtons}>
            <a href="mailto:recom@recommetalduro.com.br" className={styles.ctaPrimary}>
              Enviar E-mail
            </a>
            <a
              href="https://wa.me/551932332224"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaPhone}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{ marginRight: '8px' }}
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              Chat no WhatsApp
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
