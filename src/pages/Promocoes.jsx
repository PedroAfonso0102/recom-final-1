import React from 'react';
import Layout from '../components/Layout';
import SEOHead from '../components/SEOHead';
import Breadcrumb from '../components/Breadcrumb';
import ActionButton from '../components/ActionButton';
import { ArrowRight, MessageCircle, Tag, Calendar, Info } from 'lucide-react';
import styles from './Promocoes.module.css';
import { contato } from '../data/contato';
import { campanhasPromocionais } from '../data/promocoes';
import editorialImg from '../assets/images/editorial/RECOM_EDITORIAL-4.png';

const breadcrumbItems = [
  { label: 'Início', path: '/' },
  { label: 'Promoções' },
];

const Promocoes = () => {
  return (
    <Layout>
      <SEOHead
        title="Promoções e Condições Especiais"
        description="Condições especiais da RECOM sob consulta. No momento não há promoções ativas publicadas."
      />

      <div className={styles.container}>
        <Breadcrumb items={breadcrumbItems} />

        <section className={styles.promoHero} aria-labelledby="promo-title">
          <div className={styles.pageHeader}>
            <h1 id="promo-title" className={styles.pageTitle}>Promoções e Condições Especiais</h1>
            <p className={styles.pageSubtitle}>
              No momento, não há promoção ativa publicada. Este espaço fica reservado para condições comerciais sob consulta
              e oportunidades negociadas pela equipe.
            </p>
          </div>

          <div className={styles.promoVisual}>
            <div className={styles.promoVisualCard}>
              <img
                src={editorialImg}
                alt="Imagem institucional da RECOM"
                className={styles.promoVisualImage}
              />
              <div className={styles.promoVisualNote}>
                <span className={styles.promoVisualKicker}>Condições sob consulta</span>
                <strong>Fale com a equipe comercial para conhecer novas oportunidades.</strong>
              </div>
            </div>
          </div>
        </section>

        <div className={styles.aviso}>
          <Info size={18} aria-hidden="true" />
          <p>
            <strong>Atenção:</strong> hoje não existe promoção ativa nesta página.
            Fale com a equipe comercial para conhecer oportunidades sob consulta.
          </p>
        </div>

        <div className={styles.campanhasGrid}>
          {campanhasPromocionais.map((campanha) => (
            <div
              key={campanha.id}
              className={`${styles.campanhaCard} ${campanha.vazio ? styles.campanhaCardEmpty : ''}`}
            >
              <div className={styles.campanhaHeader}>
                <span className={styles.campanhaTipo}>
                  <Tag size={14} aria-hidden="true" />
                  {campanha.tipo}
                </span>
                <span className={styles.campanhaVigencia}>
                  <Calendar size={14} aria-hidden="true" />
                  {campanha.vigencia}
                </span>
              </div>

              <h3 className={styles.campanhaTitulo}>{campanha.titulo}</h3>
              <p className={styles.campanhaSubtitulo}>{campanha.subtitulo}</p>

              <ul className={styles.campanhaDestaques}>
                {campanha.destaques.map((destaque, index) => (
                  <li key={index}>{destaque}</li>
                ))}
              </ul>

              <div className={styles.campanhaFooter}>
                <ActionButton to="/contato" variant="contrast" compact stackOnMobile>
                  Falar com a equipe
                  <ArrowRight size={14} />
                </ActionButton>
              </div>

              <p className={styles.campanhaNota}>{campanha.ressalva}</p>
            </div>
          ))}
        </div>

        <div className={styles.ctaSection}>
          <h2 className={styles.ctaTitle}>Sem promoção ativa, mas com atendimento comercial disponível</h2>
          <p className={styles.ctaDesc}>
            Se a sua necessidade for específica, a RECOM pode avaliar condições e oportunidades sob consulta.
            Entre em contato para entender o que faz mais sentido para o seu cenário.
          </p>
          <div className={styles.ctaActions}>
            <ActionButton to="/contato" variant="contrast" stackOnMobile>
              Solicitar orientação comercial
            </ActionButton>
            <ActionButton href={contato.whatsapp.hrefComMensagem} target="_blank" variant="whatsapp" stackOnMobile aria-label={`Falar no WhatsApp: ${contato.telefone.display} (abre em nova aba)`}>
              <MessageCircle size={16} aria-hidden="true" />
              {contato.telefone.display}
            </ActionButton>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Promocoes;
