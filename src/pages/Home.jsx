import React from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { ArrowRight, Phone, Crosshair, Box, Circle } from 'lucide-react';
import styles from './Home.module.css';
import { contato, institucional } from '../data/contato';
import { fornecedores } from '../data/fornecedores';
import { trackLeadGen } from '../utils/analytics';
import logoSchema from '../assets/images/Upscaled/logo-sem-fundo.png';

/**
 * Home — Página principal.
 * Etapa 3: "hierarquia: credibilidade → caminhos de descoberta → CTAs"
 * Etapa 4: "proposta de valor B2B, seção institucional curta, fornecedores como caminhos"
 * Etapa 5: "CTA persistente, redução de fricção"
 */

const processoIcons = {
  Crosshair: <Crosshair size={24} />,
  Box: <Box size={24} />,
  Circle: <Circle size={24} />,
};

const Home = () => {
  return (
    <Layout>
      <SEOHead
        title={null}
        description={institucional.descricaoCurta}
        canonical="/"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: contato.empresa,
          url: contato.siteUrl,
          logo: logoSchema,
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: contato.telefone.numero,
            contactType: 'sales',
            email: contato.email.display,
            areaServed: 'BR',
            availableLanguage: 'Portuguese'
          },
          address: {
            '@type': 'PostalAddress',
            streetAddress: contato.endereco.rua,
            addressLocality: contato.endereco.cidade,
            addressRegion: contato.endereco.estado,
            postalCode: contato.endereco.cep,
            addressCountry: 'BR'
          }
        }}
      />

      {/* ═══════════════════════════════════════════════
          HERO — Proposta de valor B2B
          ═══════════════════════════════════════════════ */}
      <div className={styles.heroBanner}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <span className={styles.heroBadge}>DESDE 1990 EM CAMPINAS-SP</span>
          <h1 className={styles.heroTitle}>
            Seu Distribuidor B2B de Ferramentas para Usinagem
          </h1>
          <p className={styles.heroDescription}>
            {institucional.propostaDeValor}
          </p>
          <p className={styles.heroTrust}>
            Desde 1990 em Campinas-SP - distribuidor autorizado Mitsubishi Materials desde 1998
          </p>
          <div className={styles.heroActions}>
            <Link to="/contato" className={styles.primaryBtn} onClick={() => trackLeadGen('form_intent', 'Home Hero CTA')}>Solicitar Orçamento</Link>
            <Link to="/fornecedores-catalogos" className={styles.secondaryBtn}>Ver Fornecedores</Link>
          </div>
        </div>
      </div>

      <div className={styles.centerData}>

        {/* ═══════════════════════════════════════════════
            SEÇÃO 1 — Quem é a RECOM (prova institucional curta)
            ═══════════════════════════════════════════════ */}
        <div className={styles.sectionBox}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Quem é a RECOM</h2>
            <p className={styles.sectionSubtitle}>
              {institucional.descricaoCurta}
            </p>
          </div>
          <div className={styles.trustBadges}>
            <div className={styles.trustItem}>
              <strong>+35 anos</strong>
              <span>de atuação no mercado</span>
            </div>
            <div className={styles.trustItem}>
              <strong>Desde 1998</strong>
              <span>distribuidor autorizado Mitsubishi</span>
            </div>
            <div className={styles.trustItem}>
              <strong>Campinas-SP</strong>
              <span>atendimento regional especializado</span>
            </div>
            <div className={styles.trustItem}>
              <strong>{fornecedores.length} fornecedores</strong>
              <span>curadoria de marcas líderes</span>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <Link to="/a-recom" className={styles.linkSutil}>
              Conheça a RECOM <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════
            SEÇÃO 2 — Fornecedores (caminhos de navegação)
            ═══════════════════════════════════════════════ */}
        <div className={styles.sectionBox}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Nossos Fornecedores</h2>
            <p className={styles.sectionSubtitle}>
              Marcas reconhecidas globalmente, distribuídas pela RECOM com atendimento local.
            </p>
          </div>
          <div className={styles.brandsRow}>
            {fornecedores.map(f => (
              <Link to={`/fornecedores-catalogos/${f.slug}`} key={f.id} className={styles.brandLink}>
                <img src={f.logo} alt={f.altText} className="res-img-logo" />
              </Link>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <Link to="/fornecedores-catalogos" className={styles.linkSutil}>
              Ver todos os fornecedores e catálogos <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════
            SEÇÃO 3 — Soluções / Processos (cards de descoberta)
            ═══════════════════════════════════════════════ */}
        <div className={styles.sectionBox}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Soluções por Processo</h2>
            <p className={styles.sectionSubtitle}>
              Encontre ferramentas e fornecedores organizados pelo processo produtivo da sua operação.
            </p>
          </div>
          <div className={styles.processosRow}>
            <Link to="/solucoes/torneamento" className={styles.processoCardHome}>
              <div className={styles.processoIconHome}>{processoIcons.Crosshair}</div>
              <strong>Torneamento</strong>
              <span>Insertos, suportes e ferramentas para torno CNC</span>
              <span className={styles.processoArrow}><ArrowRight size={14} /></span>
            </Link>
            <Link to="/solucoes/fresamento" className={styles.processoCardHome}>
              <div className={styles.processoIconHome}>{processoIcons.Box}</div>
              <strong>Fresamento</strong>
              <span>Fresas, insertos e porta-ferramentas para centros de usinagem</span>
              <span className={styles.processoArrow}><ArrowRight size={14} /></span>
            </Link>
            <Link to="/solucoes/furacao" className={styles.processoCardHome}>
              <div className={styles.processoIconHome}>{processoIcons.Circle}</div>
              <strong>Furação</strong>
              <span>Brocas inteiriças e com insertos para furação de alta performance</span>
              <span className={styles.processoArrow}><ArrowRight size={14} /></span>
            </Link>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════
            SEÇÃO 4 — CTA de Contato
            ═══════════════════════════════════════════════ */}
        <div className={styles.ctaSection}>
          <h2 className={styles.ctaTitle}>Precisa de ferramentas para usinagem?</h2>
          <p className={styles.ctaDesc}>
            A equipe da RECOM está pronta para ajudar na seleção de fornecedores e ferramentas ideais para sua operação.
          </p>
          <div className={styles.ctaActions}>
            <Link to="/contato" className={styles.primaryBtn} onClick={() => trackLeadGen('form_intent', 'Home Footer CTA')}>
              Solicitar Orçamento
            </Link>
            <a href={contato.whatsapp.href} target="_blank" rel="noopener noreferrer" className={styles.whatsappLink} onClick={() => trackLeadGen('whatsapp', 'Home Footer CTA')}>
              <Phone size={16} />
              {contato.telefone.display}
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
