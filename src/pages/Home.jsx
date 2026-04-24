import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import SEOHead from '../components/SEOHead';
import ActionButton from '../components/ActionButton';
import { ArrowRight, BookOpen, CalendarDays, Cog, Crosshair, Factory, Layers3, MapPin, MessageCircle, Phone, Search, ShieldCheck, Users, Circle } from 'lucide-react';
import styles from './Home.module.css';
import { contato, institucional } from '../data/contato';
import { fornecedores } from '../data/fornecedores';
import { processos } from '../data/processos';
import { campanhasPromocionais } from '../data/promocoes';
import { trackLeadGen } from '../utils/analytics';
import heroTecnicoImg from '../assets/images/editorial/egd-tecnico-gerada.png';
import pecasImg from '../assets/images/editorial/pecas.png';
import logoSchema from '../assets/images/Upscaled/logo-sem-fundo.png';

const yearsActive = new Date().getFullYear() - contato.fundacao;

const heroProofs = [
  'Catálogos oficiais',
  'Atendimento comercial direto',
  'Campinas-SP',
  'Curadoria B2B',
];

const quickAccessCards = [
  {
    icon: Search,
    title: 'Tenho código, desenho ou nome da peça',
    text: 'Envie a referência para validação comercial e indicação do caminho mais adequado.',
    to: '/contato',
    cta: 'Solicitar orçamento',
    trackLabel: 'Home Quick Access - Codigo',
  },
  {
    icon: BookOpen,
    title: 'Quero acessar um catálogo oficial',
    text: 'Consulte fornecedores parceiros e materiais oficiais das marcas.',
    to: '/fornecedores-catalogos',
    cta: 'Ver fornecedores',
  },
  {
    icon: Cog,
    title: 'Sei o processo de usinagem',
    text: 'Comece por torneamento, fresamento ou furação e veja marcas relacionadas.',
    to: '/solucoes',
    cta: 'Ver soluções',
  },
  {
    icon: MessageCircle,
    title: 'Preciso falar com alguém',
    text: 'Entre em contato por telefone, e-mail, WhatsApp ou formulário.',
    to: '/contato',
    cta: 'Falar com a RECOM',
    trackLabel: 'Home Quick Access - Contato',
  },
];

const processIconMap = {
  torneamento: Crosshair,
  fresamento: Layers3,
  furacao: Circle,
};

const heroMetrics = [
  { value: `Desde ${contato.fundacao}`, label: 'atuação em Campinas-SP' },
  { value: `${yearsActive}+ anos`, label: 'de presença comercial' },
  { value: `${fornecedores.length}`, label: 'fornecedores organizados' },
  { value: `${processos.length}`, label: 'processos principais' },
];

const Home = () => {
  const promotionHighlights = campanhasPromocionais.slice(0, 2);

  return (
    <Layout>
      <SEOHead
        title="Distribuidor B2B de ferramentas para usinagem"
        description={institucional.descricaoCurta}
        canonical="/"
        ogImage={heroTecnicoImg}
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

      <main className={styles.page}>
        <div className={styles.shell}>
          <section className={styles.heroSection} aria-labelledby="home-hero-title">
            <div className={styles.heroCopy}>
              <span className={styles.heroBadge}>Desde 1990 em Campinas-SP</span>
              <h1 id="home-hero-title" className={styles.heroTitle}>
                Distribuidor B2B de ferramentas para usinagem
              </h1>
              <p className={styles.heroDescription}>
                A RECOM conecta clientes industriais a fornecedores e catálogos oficiais,
                com atendimento comercial próximo para orientar a escolha certa em torneamento,
                fresamento, furação e fixação.
              </p>

              <div className={styles.heroActions}>
                <ActionButton
                  to="/contato"
                  variant="primary"
                  stackOnMobile
                  onClick={() => trackLeadGen('form_intent', 'Home Hero CTA')}
                >
                  Solicitar orçamento <ArrowRight size={16} />
                </ActionButton>
                <ActionButton to="/fornecedores-catalogos" variant="secondary" stackOnMobile>
                  Ver fornecedores e catálogos
                </ActionButton>
              </div>

              <ul className={styles.heroProofs} aria-label="Provas rápidas">
                {heroProofs.map((item) => (
                  <li key={item} className={styles.heroProof}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.heroVisual}>
              <div className={styles.heroImageFrame}>
                <img
                  src={heroTecnicoImg}
                  alt="Planejamento técnico de usinagem com ferramentas e desenho de peça"
                  className={styles.heroImage}
                  loading="eager"
                  fetchPriority="high"
                />
                <div className={styles.heroFloatingCard}>
                  <span className={styles.heroFloatingLabel}>Presença real</span>
                  <strong className={styles.heroFloatingTitle}>Campinas-SP</strong>
                  <p className={styles.heroFloatingCopy}>
                    Atendimento comercial, curadoria de fornecedores e orientação para catálogo oficial.
                  </p>
                </div>
              </div>

              <div className={styles.heroMetricGrid}>
                {heroMetrics.map((metric) => (
                  <div key={metric.label} className={styles.heroMetricCard}>
                    <strong className={styles.heroMetricValue}>{metric.value}</strong>
                    <span className={styles.heroMetricLabel}>{metric.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className={styles.sectionFrame} aria-labelledby="home-quick-title">
            <div className={styles.sectionIntro}>
              <span className={styles.sectionKicker}>Entrada guiada</span>
              <h2 id="home-quick-title" className={styles.sectionTitle}>
                O que você precisa encontrar?
              </h2>
              <p className={styles.sectionLead}>
                Escolha o caminho mais próximo da sua necessidade. A RECOM ajuda a chegar ao
                fornecedor, catálogo ou contato correto.
              </p>
            </div>

            <div className={styles.intentGrid}>
              {quickAccessCards.map((card) => {
                const Icon = card.icon;

                return (
                  <Link
                    to={card.to}
                    key={card.title}
                    className={styles.intentCard}
                    onClick={card.trackLabel ? () => trackLeadGen('form_intent', card.trackLabel) : undefined}
                  >
                    <div className={styles.intentIcon}>
                      <Icon size={22} strokeWidth={1.9} />
                    </div>
                    <h3 className={styles.intentTitle}>{card.title}</h3>
                    <p className={styles.intentCopy}>{card.text}</p>
                    <span className={styles.intentAction}>
                      {card.cta} <ArrowRight size={14} />
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>

          <section className={styles.sectionFrame} aria-labelledby="home-suppliers-title">
            <div className={styles.sectionIntro}>
              <span className={styles.sectionKicker}>Fornecedores e catálogos oficiais</span>
              <h2 id="home-suppliers-title" className={styles.sectionTitle}>
                Marcas reconhecidas em um acesso padronizado
              </h2>
              <p className={styles.sectionLead}>
                A RECOM organiza o acesso a marcas reconhecidas para apoiar a seleção de ferramentas
                e acessórios para usinagem.
              </p>
            </div>

            <div className={styles.supplierRail}>
              {fornecedores.map((fornecedor) => (
                <Link
                  to={`/fornecedores-catalogos/${fornecedor.slug}`}
                  key={fornecedor.id}
                  className={`${styles.supplierCard} ${fornecedor.destaque ? styles.supplierFeatured : ''}`}
                >
                  {fornecedor.destaque && (
                    <span className={styles.supplierBadge}>Principal</span>
                  )}
                  <div className={styles.supplierLogoFrame}>
                    <img src={fornecedor.logo} alt={fornecedor.altText} className="res-img-logo" />
                  </div>
                  <div className={styles.supplierMeta}>
                    <h3 className={styles.supplierName}>{fornecedor.nome}</h3>
                    <p className={styles.supplierCopy}>{fornecedor.descricaoCurta}</p>
                  </div>
                  <span className={styles.supplierAction}>
                    Ver fornecedor <ArrowRight size={14} />
                  </span>
                </Link>
              ))}
            </div>

            <div className={styles.sectionFooterLinkWrap}>
              <Link to="/fornecedores-catalogos" className={styles.sectionFooterLink}>
                Ver todos os fornecedores e catálogos <ArrowRight size={14} />
              </Link>
            </div>
          </section>

          <section className={styles.sectionFrame} aria-labelledby="home-processes-title">
            <div className={styles.sectionIntro}>
              <span className={styles.sectionKicker}>Soluções por processo</span>
              <h2 id="home-processes-title" className={styles.sectionTitle}>
                Encontre por processo de usinagem
              </h2>
              <p className={styles.sectionLead}>
                Use esta rota quando você sabe a aplicação, mas ainda precisa localizar o fornecedor
                ou catálogo mais aderente.
              </p>
            </div>

            <div className={styles.processGrid}>
              {processos.map((processo) => {
                const Icon = processIconMap[processo.slug] || Crosshair;
                const tags = processo.keywords.slice(0, 2);

                return (
                  <Link to={`/solucoes/${processo.slug}`} key={processo.id} className={styles.processCard}>
                    <div className={styles.processCardTop}>
                      <div className={styles.processIcon}>
                        <Icon size={22} strokeWidth={1.9} />
                      </div>
                      <span className={styles.processBadge}>{processo.nome}</span>
                    </div>

                    <h3 className={styles.processTitle}>{processo.nome}</h3>
                    <p className={styles.processCopy}>{processo.descricaoCurta}</p>

                    <div className={styles.processTagList}>
                      {tags.map((tag) => (
                        <span key={tag} className={styles.processTag}>
                          {tag}
                        </span>
                      ))}
                    </div>

                    <span className={styles.processAction}>
                      Ver processo <ArrowRight size={14} />
                    </span>
                  </Link>
                );
              })}
            </div>

            <div className={styles.sectionFooterLinkWrap}>
              <Link to="/solucoes" className={styles.sectionFooterLink}>
                Ver soluções por processo <ArrowRight size={14} />
              </Link>
            </div>
          </section>

          <section className={styles.sectionFrame} aria-labelledby="home-institutional-title">
            <div className={styles.institutionalGrid}>
              <div className={styles.institutionalCopy}>
                <span className={styles.sectionKicker}>Prova institucional</span>
                <h2 id="home-institutional-title" className={styles.sectionTitle}>
                  Uma empresa de Campinas com trajetória no atendimento industrial
                </h2>
                <p className={styles.sectionLead}>
                  Desde 1990, a RECOM atua no atendimento a clientes industriais, conectando demandas
                  de usinagem a fornecedores reconhecidos e canais oficiais de catálogo.
                </p>

                <div className={styles.proofGrid}>
                  <div className={styles.proofCard}>
                    <CalendarDays size={18} strokeWidth={1.9} />
                    <strong>Fundação</strong>
                    <span>{contato.fundacao}</span>
                  </div>
                  <div className={styles.proofCard}>
                    <MapPin size={18} strokeWidth={1.9} />
                    <strong>Base comercial</strong>
                    <span>Campinas-SP</span>
                  </div>
                  <div className={styles.proofCard}>
                    <ShieldCheck size={18} strokeWidth={1.9} />
                    <strong>Distribuição</strong>
                    <span>B2B e curadoria de fornecedores</span>
                  </div>
                  <div className={styles.proofCard}>
                    <Users size={18} strokeWidth={1.9} />
                    <strong>Atendimento</strong>
                    <span>Orientação comercial direta</span>
                  </div>
                </div>
              </div>

              <div className={styles.institutionalPanel}>
                <div className={styles.institutionalVisual}>
                  <img
                    src={pecasImg}
                    alt="Conjunto de peças e componentes industriais para análise técnica"
                    className={styles.institutionalImage}
                    loading="lazy"
                  />
                  <div className={styles.institutionalNote}>
                    <Factory size={18} strokeWidth={1.9} className={styles.institutionalNoteIcon} />
                    <div>
                      <strong>Presença real em Campinas-SP</strong>
                      <p>
                        Atendimento comercial próximo, base local e suporte para catálogo, fornecedor ou orçamento.
                      </p>
                    </div>
                  </div>
                </div>

                <div className={styles.mapCard}>
                  <div className={styles.mapCardHeader}>
                    <MapPin size={18} strokeWidth={1.9} />
                    <strong>Onde estamos</strong>
                  </div>
                  <address className={styles.mapAddress}>
                    <span>{contato.empresa}</span>
                    <span>{contato.endereco.rua}</span>
                    <span>{contato.endereco.cidade} - {contato.endereco.estado}</span>
                    <span>CEP {contato.endereco.cep}</span>
                  </address>
                  <a
                    href={contato.endereco.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.mapLink}
                  >
                    Ver rota no Google Maps
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section className={styles.sectionFrame} aria-labelledby="home-promotions-title">
            <div className={styles.sectionIntro}>
              <span className={styles.sectionKicker}>Condições especiais</span>
              <h2 id="home-promotions-title" className={styles.sectionTitle}>
                Condições especiais e campanhas ativas
              </h2>
              <p className={styles.sectionLead}>
                Mostramos poucas chamadas para manter a Home objetiva. Se a sua aplicação pede
                condição especial, fale com a RECOM.
              </p>
            </div>

            <div className={styles.promoGrid}>
              {promotionHighlights.map((campanha) => {
                const fornecedor = fornecedores.find((item) => item.id === campanha.fornecedor);

                return (
                  <article key={campanha.id} className={styles.promoCard}>
                    <div className={styles.promoCardHeader}>
                      <span className={styles.promoCardBadge}>{campanha.tipo}</span>
                      <span className={styles.promoCardValidity}>{campanha.vigencia}</span>
                    </div>

                    <h3 className={styles.promoCardTitle}>{campanha.titulo}</h3>
                    <p className={styles.promoCardCopy}>{campanha.subtitulo}</p>

                    <ul className={styles.promoList}>
                      {campanha.destaques.slice(0, 3).map((item) => (
                        <li key={item} className={styles.promoItem}>
                          {item}
                        </li>
                      ))}
                    </ul>

                    <div className={styles.promoFooter}>
                      {fornecedor && (
                        <Link to={`/fornecedores-catalogos/${fornecedor.slug}`} className={styles.promoSupplier}>
                          <span>{fornecedor.nome}</span>
                          <ArrowRight size={14} />
                        </Link>
                      )}

                      <Link to="/contato" className={styles.promoAction}>
                        Solicitar orçamento
                      </Link>
                    </div>

                    <p className={styles.promoNote}>{campanha.ressalva}</p>
                  </article>
                );
              })}
            </div>

            <div className={styles.sectionFooterLinkWrap}>
              <Link to="/promocoes" className={styles.sectionFooterLink}>
                Ver promoções <ArrowRight size={14} />
              </Link>
            </div>
          </section>

          <section className={styles.finalCta} aria-labelledby="home-final-cta-title">
            <div className={styles.finalCtaCopy}>
              <span className={styles.finalCtaKicker}>Próximo passo</span>
              <h2 id="home-final-cta-title" className={styles.finalCtaTitle}>
                Precisa de apoio para selecionar ferramentas ou fornecedores?
              </h2>
              <p className={styles.finalCtaText}>
                Envie sua referência, código, desenho ou aplicação. A equipe da RECOM orienta o
                caminho mais direto para catálogo, fornecedor ou orçamento.
              </p>
            </div>

            <div className={styles.finalCtaActions}>
              <ActionButton
                to="/contato"
                variant="contrast"
                stackOnMobile
                onClick={() => trackLeadGen('form_intent', 'Home Final CTA')}
              >
                Solicitar orçamento <ArrowRight size={16} />
              </ActionButton>
              <ActionButton
                href={contato.telefone.href}
                variant="contrastSecondary"
                stackOnMobile
                onClick={() => trackLeadGen('phone', 'Home Final CTA')}
              >
                <Phone size={16} />
                Ligar agora: {contato.telefone.display}
              </ActionButton>
            </div>
          </section>
        </div>
      </main>
    </Layout>
  );
};

export default Home;
