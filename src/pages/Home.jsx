import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import SEOHead from '../components/SEOHead';
import ActionButton from '../components/ActionButton';
import { ArrowRight, BookOpen, CalendarDays, ChevronLeft, ChevronRight, Cog, Crosshair, Factory, Layers3, MapPin, Phone, Search, ShieldCheck, Users, Circle } from 'lucide-react';
import styles from './Home.module.css';
import { contato, institucional } from '../data/contato';
import { fornecedores } from '../data/fornecedores';
import { processos } from '../data/processos';
import { trackLeadGen } from '../utils/analytics';
import heroTecnicoImg from '../assets/images/editorial/egd-tecnico-gerada.png';
import heroSlide1 from '../assets/images/editorial/RECOM_EDITORIAL-1.png';
import heroSlide2 from '../assets/images/editorial/RECOM_EDITORIAL-2.png';
import heroSlide3 from '../assets/images/editorial/RECOM_EDITORIAL-5.png';
import pecasImg from '../assets/images/editorial/pecas.png';
import logoSchema from '../assets/images/Upscaled/logo-sem-fundo.png';

const heroProofs = [
  'Catálogos oficiais',
  'Distribuição autorizada',
  'Atendimento técnico-comercial',
  'Campinas-SP',
];

const serviceHighlights = [
  {
    icon: Search,
    title: 'Análise da aplicação',
    text: 'Recebemos código, desenho, peça ou processo e direcionamos o caminho de compra.',
    to: '/contato',
    cta: 'Enviar demanda',
    trackLabel: 'Home Quick Access - Codigo',
  },
  {
    icon: BookOpen,
    title: 'Catálogos oficiais',
    text: 'Organizamos o acesso às marcas e materiais técnicos usados na seleção das linhas.',
    to: '/fornecedores-catalogos',
    cta: 'Ver catálogos',
  },
  {
    icon: Cog,
    title: 'Soluções por processo',
    text: 'Separe a busca por torneamento, fresamento ou furação e avance para fornecedores relacionados.',
    to: '/solucoes',
    cta: 'Ver processos',
  },
];

const processIconMap = {
  torneamento: Crosshair,
  fresamento: Layers3,
  furacao: Circle,
};

const heroMetrics = [
  { value: 'Desde 1990', label: 'atuação em Campinas-SP' },
  { value: 'Distribuição autorizada', label: 'Mitsubishi Materials' },
  { value: 'Atendimento a empresas', label: 'suporte técnico-comercial' },
  { value: 'Catálogos oficiais', label: 'fornecedores reconhecidos' },
];

const heroSlides = [
  {
    image: heroSlide1,
    alt: 'Empresa especializada em ferramentas para usinagem com itens de corte em destaque',
    eyebrow: 'Atendimento a empresas',
    title: 'Ferramentas para usinagem',
    text: 'Corte, fixação e apoio para a rotina industrial',
    note: 'Atendimento em Campinas-SP | Compra objetiva e próxima.',
    objectPosition: '74% center',
  },
  {
    image: heroSlide2,
    alt: 'Fornecedores e catálogos de ferramentas para usinagem',
    eyebrow: 'Fornecedores e catálogos',
    title: 'Fornecedores e catálogos',
    text: 'Marcas selecionadas para consulta e cotação',
    note: 'Escolha a marca certa | Apoio comercial direto.',
  },
  {
    image: heroSlide3,
    alt: 'Promoções e condições especiais para ferramentas de usinagem',
    eyebrow: 'Condições especiais',
    title: 'Promoções',
    text: 'Condições especiais em linhas selecionadas',
    note: 'Disponibilidade sob consulta | Atendimento objetivo.',
  },
  {
    image: heroTecnicoImg,
    alt: 'Planejamento técnico de usinagem com ferramentas e desenho de peça',
    eyebrow: 'Análise técnica',
    title: 'Orientação técnica para definir o processo certo',
    text: 'A RECOM cruza aplicação, ferramenta e processo antes da compra',
    note: 'Base técnica para indicar o caminho mais adequado.',
  },
];

const Home = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 5500);

    return () => window.clearInterval(timer);
  }, []);

  const goToSlide = (index) => {
    setActiveSlide((index + heroSlides.length) % heroSlides.length);
  };

  const currentSlide = heroSlides[activeSlide];

  return (
    <Layout>
      <SEOHead
        title="RECOM Metal Duro | Ferramentas e soluções para usinagem"
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
              <span className={styles.heroBadge}>Desde {contato.fundacao} em Campinas-SP</span>
              <h1 id="home-hero-title" className={styles.heroTitle} style={{ color: '#2c56a3' }}>
                RECOM<span style={{ verticalAlign: 'super', fontSize: '0.5em', fontWeight: 'bold' }}>®</span>
                <br />
                <span style={{ color: '#000' }}>Metal Duro</span>
                <hr />
              </h1>
              <p className={styles.heroDescription}>
                A RECOM conecta clientes industriais a fornecedores reconhecidos e catálogos oficiais,
                com atendimento técnico-comercial para apoiar decisões de compra em torneamento,
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
              <div className={styles.heroCarousel}>
                <div className={styles.heroCarouselViewport}>
                  <div className={styles.heroCarouselFrame}>
                    <img
                      src={currentSlide.image}
                      alt={currentSlide.alt}
                      className={styles.heroCarouselImage}
                      style={{ objectPosition: currentSlide.objectPosition || 'center center' }}
                      loading="eager"
                      fetchPriority="high"
                    />
                  </div>
                </div>
                <div className={styles.heroCarouselFooter}>
                  <div className={styles.heroCarouselMeta}>
                    <span className={styles.heroCarouselEyebrow}>{currentSlide.eyebrow}</span>
                    <strong className={styles.heroCarouselTitle}>{currentSlide.title}</strong>
                    <p className={styles.heroCarouselText}>{currentSlide.text}</p>
                  </div>
                  <p className={styles.heroCarouselNote}>{currentSlide.note}</p>
                  <div className={styles.heroCarouselControls} aria-label="Controle do carrossel da Home">
                    <button
                      type="button"
                      className={styles.heroCarouselArrow}
                      onClick={() => goToSlide(activeSlide - 1)}
                      aria-label="Slide anterior"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <div className={styles.heroCarouselDots}>
                      {heroSlides.map((slide, index) => (
                        <button
                          key={slide.title}
                          type="button"
                          className={`${styles.heroCarouselDot} ${index === activeSlide ? styles.heroCarouselDotActive : ''}`}
                          onClick={() => goToSlide(index)}
                          aria-label={`Ir para o slide ${index + 1}`}
                        />
                      ))}
                    </div>
                    <button
                      type="button"
                      className={styles.heroCarouselArrow}
                      onClick={() => goToSlide(activeSlide + 1)}
                      aria-label="Próximo slide"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
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

          <section className={`${styles.sectionFrame} ${styles.serviceSection}`} aria-labelledby="home-quick-title">
            <div className={styles.sectionIntro}>
              <span className={styles.sectionKicker}>Atendimento técnico-comercial</span>
              <h2 id="home-quick-title" className={styles.sectionTitle}>
                Da aplicação ao fornecedor certo
              </h2>
              <p className={styles.sectionLead}>
                Entrada direta: catálogo, processo ou cotação.
              </p>
            </div>

            <div className={styles.intentGrid}>
              {serviceHighlights.map((card) => {
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
                A RECOM reúne marcas reconhecidas e materiais oficiais para apoiar compras técnicas
                de ferramentas e acessórios para usinagem.
              </p>
            </div>

            <div className={styles.supplierRail}>
              {fornecedores.map((fornecedor) => (
                <Link
                  to={`/fornecedores-catalogos/${fornecedor.slug}`}
                  key={fornecedor.id}
                  className={styles.supplierCard}
                >
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
                Use esta rota quando a aplicação já está definida e o próximo passo é localizar
                fornecedores, linhas e catálogos relacionados.
              </p>
            </div>

            <div className={styles.processGrid}>
              {processos.map((processo) => {
                const Icon = processIconMap[processo.slug] || Crosshair;

                return (
                  <Link to={`/solucoes/${processo.slug}`} key={processo.id} className={styles.processCard}>
                    <div className={styles.processCardTop}>
                      <div className={styles.processIcon}>
                        <Icon size={22} strokeWidth={1.9} />
                      </div>
                    </div>

                    <h3 className={styles.processTitle}>{processo.nome}</h3>
                    <p className={styles.processCopy}>{processo.descricaoCurta}</p>

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
                    <span>Fornecedores reconhecidos</span>
                  </div>
                  <div className={styles.proofCard}>
                    <Users size={18} strokeWidth={1.9} />
                    <strong>Atendimento</strong>
                    <span>Suporte técnico-comercial</span>
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
                      <strong>Presença comercial em Campinas-SP</strong>
                      <p>
                        Base local e atendimento direto para catálogo, fornecedor ou orçamento.
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
                    aria-label="Ver rota no Google Maps (abre em nova aba)"
                  >
                    Ver rota no Google Maps
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section className={styles.finalCta} aria-labelledby="home-final-cta-title">
            <div className={styles.finalCtaCopy}>
              <span className={styles.finalCtaKicker}>Próximo passo</span>
              <h2 id="home-final-cta-title" className={styles.finalCtaTitle}>
                Precisa de apoio para selecionar ferramentas ou fornecedores?
              </h2>
              <p className={styles.finalCtaText}>
                Envie sua referência, código, desenho ou aplicação. A equipe da RECOM encaminha
                sua demanda para catálogo, fornecedor ou orçamento.
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
