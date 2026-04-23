import React from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import styles from './Promocoes.module.css';
import SteamPromoCard from '../components/SteamPromoCard';

const PROMO_DATA = [
  {
    id: 1,
    title: 'Fresa Topo Reto 4 Cortes',
    subtitle: 'Mitsubishi Materials — Série MSTAR',
    originalPrice: '245,00',
    discountPrice: '185,50',
    discountPercent: 24,
    tag: 'OFERTA',
    features: [
      'Metal duro com cobertura TiAlN',
      'Alta resistência ao desgaste',
      'Ideal para aços até 50 HRC',
      'Diâmetros de 6mm a 20mm',
    ],
    ctaText: 'Solicitar Orçamento',
    ctaLink: '/contato',
  },
  {
    id: 2,
    title: 'Broca Inteiriça c/ Refrigeração',
    subtitle: '7Leaders — Série Performance',
    originalPrice: '280,00',
    discountPrice: '210,00',
    discountPercent: 25,
    tag: 'DESTAQUE',
    features: [
      'Refrigeração interna por 2 canais',
      'Geometria autocentrante',
      'Cobertura multicamadas AlCrN',
      'Tolerância h7 no diâmetro',
    ],
    ctaText: 'Solicitar Orçamento',
    ctaLink: '/contato',
  },
  {
    id: 3,
    title: 'Kit Insertos WNMG 080408',
    subtitle: 'Mitsubishi Materials — Caixa c/ 10 un.',
    originalPrice: '520,00',
    discountPrice: '399,90',
    discountPercent: 23,
    tag: 'PROMOÇÃO',
    features: [
      'Classe VP15TF — uso geral',
      'Quebra-cavacos universal MA',
      'Indicado para aços carbono e ligas',
      'Embalagem econômica c/ 10 insertos',
    ],
    ctaText: 'Solicitar Orçamento',
    ctaLink: '/contato',
  },
  {
    id: 4,
    title: 'Fresa Esférica TiAlN 2 Cortes',
    subtitle: '7Leaders — Acabamento fino',
    originalPrice: '165,00',
    discountPrice: '125,00',
    discountPercent: 24,
    tag: 'OFERTA',
    features: [
      'Raio perfeito para acabamento 3D',
      'Haste h6 retificada',
      'Ideal para moldes e matrizes',
      'Diâmetros de 2mm a 12mm',
    ],
    ctaText: 'Solicitar Orçamento',
    ctaLink: '/contato',
  },
  {
    id: 5,
    title: 'Inserto CNMG 120408 VP15TF',
    subtitle: 'Mitsubishi Materials — Torneamento geral',
    originalPrice: '68,00',
    discountPrice: '52,30',
    discountPercent: 23,
    tag: 'PROMOÇÃO',
    features: [
      'Geometria negativa dupla-face',
      'Cobertura CVD multicamada',
      'Excelente relação custo-benefício',
      'Ampla faixa de avanço',
    ],
    ctaText: 'Solicitar Orçamento',
    ctaLink: '/contato',
  },
  {
    id: 6,
    title: 'Fresa Topo Alta Performance 12mm',
    subtitle: '7Leaders — Série TiAlN Premium',
    originalPrice: '380,00',
    discountPrice: '290,00',
    discountPercent: 24,
    tag: 'DESTAQUE',
    features: [
      'Cobertura TiAlN nano-estruturada',
      '4 cortes com alívio periférico',
      'Suporta ap de até 2xD',
      'Classificação ISO P, M, K, S',
    ],
    ctaText: 'Solicitar Orçamento',
    ctaLink: '/contato',
  },
];

const Promocoes = () => {
  return (
    <Layout>
      <div className={styles.location}>
        <div className={styles.whereCenter}>
          Você está em: <Link to="/">Home</Link> &gt; Promoções
        </div>
      </div>

      <div className={styles.promoPage}>
        {/* Page Header */}
        <div className={styles.promoHeader}>
          <h1 className={styles.promoTitle}>Promoções e Ofertas Especiais</h1>
          <p className={styles.promoSubtitle}>
            Condições exclusivas em ferramentas Mitsubishi Materials e 7Leaders. 
            Preços válidos enquanto durarem os estoques.
          </p>
        </div>

        {/* Stats Bar */}
        <div className={styles.promoStats}>
          <div className={styles.statItem}>
            <span className={styles.statValue}>{PROMO_DATA.length}</span>
            <span className={styles.statLabel}>Ofertas Ativas</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>25%</span>
            <span className={styles.statLabel}>Desconto máx.</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>3</span>
            <span className={styles.statLabel}>Marcas</span>
          </div>
        </div>

        {/* Promo Grid */}
        <div className={styles.promoGrid}>
          {PROMO_DATA.map((promo) => (
            <SteamPromoCard
              key={promo.id}
              title={promo.title}
              subtitle={promo.subtitle}
              originalPrice={promo.originalPrice}
              discountPrice={promo.discountPrice}
              discountPercent={promo.discountPercent}
              tag={promo.tag}
              features={promo.features}
              ctaText={promo.ctaText}
              ctaLink={promo.ctaLink}
            />
          ))}
        </div>

        {/* CTA Section */}
        <div className={styles.promoCta}>
          <div className={styles.ctaContent}>
            <h3>Precisa de um orçamento personalizado?</h3>
            <p>
              Para volumes industriais ou especificações técnicas customizadas,
              nosso departamento de engenharia prepara cotações sob medida para sua necessidade.
            </p>
          </div>
          <div className={styles.ctaActions}>
            <Link to="/contato" className={styles.ctaButtonPrimary}>
              Solicitar Orçamento
            </Link>
            <Link to="/produtos" className={styles.ctaButtonSecondary}>
              Ver Soluções
            </Link>
          </div>
        </div>

        {/* Disclaimer */}
        <div className={styles.disclaimer}>
          <p>
            * Promoções válidas enquanto durarem os estoques. Preços sujeitos a 
            alteração sem aviso prévio. Imagens meramente ilustrativas. 
            Condições especiais para compras acima de 10 unidades.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Promocoes;