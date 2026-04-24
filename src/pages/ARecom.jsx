import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import SEOHead from '../components/SEOHead';
import Breadcrumb from '../components/Breadcrumb';
import ActionButton from '../components/ActionButton';
import styles from './ARecom.module.css';
import empresaImg from '../assets/images/escritorio.jpg';
import { contato, institucional } from '../data/contato';
import { fornecedores } from '../data/fornecedores';
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  Factory,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Users,
} from 'lucide-react';
import { trackLeadGen } from '../utils/analytics';

/**
 * A RECOM - página institucional.
 * Reestruturada no mesmo idioma visual das áreas novas do site:
 * editorial, limpa e com cards de prova mais fortes.
 */
const ARecom = () => {
  const providerHighlights = fornecedores.slice(0, 4);

  const stats = [
    {
      icon: CalendarDays,
      label: 'Fundação',
      value: String(contato.fundacao),
      text: 'trajetória comercial em Campinas-SP',
    },
    {
      icon: MapPin,
      label: 'Base comercial',
      value: 'Campinas-SP',
      text: 'atendimento regional e interior paulista',
    },
    {
      icon: ShieldCheck,
      label: 'Distribuição',
      value: 'Autorizada',
      text: 'parceria oficial com a Mitsubishi Materials',
    },
    {
      icon: Users,
      label: 'Perfil',
      value: 'Empresas',
      text: 'atendimento técnico-comercial para clientes industriais',
    },
  ];

  const capabilities = [
    {
      icon: Factory,
      title: 'Seleção industrial',
      text: 'Indicamos ferramentas e marcas com foco em aplicação real, produtividade e confiabilidade comercial.',
    },
    {
      icon: BadgeCheck,
      title: 'Parcerias reconhecidas',
      text: 'Trabalhamos com fornecedores oficiais e materiais de catálogo que dão base técnica à decisão de compra.',
    },
    {
      icon: ShieldCheck,
      title: 'Atendimento próximo',
      text: 'Acompanhamos a seleção de soluções com suporte direto, técnico e objetivo.',
    },
  ];

  return (
    <Layout>
      <SEOHead
        title="A RECOM - Quem Somos"
        description="A RECOM Metal Duro atua com ferramentas para usinagem desde 1998, em Campinas-SP, com distribuição autorizada Mitsubishi Materials."
        canonical="/a-recom"
      />
      <Breadcrumb
        items={[
          { label: 'Início', to: '/' },
          { label: 'A RECOM' },
        ]}
      />

      <div className={styles.pageContainer}>
        <section className={styles.heroSection}>
          <div className={styles.heroCopy}>
            <div className={styles.heroMeta}>
              <span className={styles.heroEyebrow}>Sobre a empresa</span>
              <span className={styles.heroBadge}>Desde {contato.fundacao}</span>
              <span className={styles.heroBadgeMuted}>Campinas-SP</span>
            </div>

            <h1 className={styles.pageTitle}>A RECOM</h1>
            <p className={styles.pageSubtitle}>{institucional.descricaoCurta}</p>
            <p className={styles.heroSupport}>
              Ferramentas para usinagem com seleção de marcas, apoio técnico e relacionamento comercial próximo.
            </p>

            <div className={styles.heroActions}>
              <ActionButton
                to="/contato"
                variant="primary"
                stackOnMobile
                onClick={() => trackLeadGen('form_intent', 'ARecom Hero CTA')}
              >
                Falar com a RECOM <ArrowRight size={16} />
              </ActionButton>
              <ActionButton to="/fornecedores-catalogos" variant="secondary" stackOnMobile>
                Ver fornecedores
              </ActionButton>
            </div>
          </div>

          <div className={styles.heroVisual}>
            <div className={styles.heroImageCard}>
              <div className={styles.heroImageLabelRow}>
                <span className={styles.heroImageLabel}>Base operacional</span>
                <span className={styles.heroImageBadge}>Campinas-SP</span>
              </div>
              <img
                src={empresaImg}
                alt="RECOM Metal Duro com ferramentas de usinagem em contexto industrial"
                className={styles.heroImage}
                style={{ objectPosition: 'center center' }}
              />
              <div className={styles.heroVisualNote}>
                <span className={styles.heroVisualNoteIcon}>
                  <Factory size={16} strokeWidth={1.9} />
                </span>
                <p>
                  Distribuidor autorizado Mitsubishi Materials, com atuação comercial contínua no interior paulista.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.statsSection}>
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <article key={stat.label} className={styles.statCard}>
                <div className={styles.statIcon}>
                  <Icon size={18} strokeWidth={1.9} />
                </div>
                <div className={styles.statCopy}>
                  <span>{stat.label}</span>
                  <strong>{stat.value}</strong>
                  <p>{stat.text}</p>
                </div>
              </article>
            );
          })}
        </section>

        <section className={styles.sectionBlock}>
          <div className={styles.sectionHeading}>
            <span className={styles.sectionEyebrow}>Nossa história</span>
            <h2>Trajetória construída com foco industrial</h2>
          </div>

          <div className={styles.timelineGrid}>
            <article className={styles.timelineCard}>
              <span className={styles.timelineYear}>1998</span>
              <h3>Atuação consolidada em Campinas</h3>
              <p>
                A RECOM estruturou sua atuação comercial em ferramentas de corte para a indústria metalúrgica.
              </p>
            </article>

            <article className={styles.timelineCard}>
              <span className={styles.timelineYear}>Mitsubishi Materials</span>
              <h3>Distribuição autorizada</h3>
              <p>
                A empresa mantém parceria autorizada para atendimento comercial e acesso a linhas reconhecidas de usinagem.
              </p>
            </article>

            <article className={styles.timelineCard}>
              <span className={styles.timelineYear}>Hoje</span>
              <h3>Atendimento industrial</h3>
              <p>
                A RECOM atende clientes industriais com fornecedores reconhecidos, catálogos oficiais e suporte técnico-comercial.
              </p>
            </article>
          </div>
        </section>

        <section className={styles.sectionSplit}>
          <div className={styles.sectionBlock}>
            <div className={styles.sectionHeading}>
              <span className={styles.sectionEyebrow}>Como atuamos</span>
              <h2>Atendimento objetivo entre cliente e fornecedor</h2>
            </div>
            <p className={styles.sectionLead}>{institucional.propostaDeValor}</p>

            <div className={styles.capabilitiesGrid}>
              {capabilities.map((item) => {
                const Icon = item.icon;

                return (
                  <article key={item.title} className={styles.capabilityCard}>
                    <div className={styles.capabilityIcon}>
                      <Icon size={20} strokeWidth={1.9} />
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </article>
                );
              })}
            </div>
          </div>

          <aside className={styles.sidePanel}>
            <div className={styles.contactCard}>
              <span className={styles.sectionEyebrow}>Contato direto</span>
              <h3>Onde estamos</h3>
              <p>
                Atendimento em Campinas-SP, com suporte técnico-comercial para clientes industriais da região e interior paulista.
              </p>

              <ul className={styles.contactList}>
                <li>
                  <MapPin size={18} strokeWidth={1.9} />
                  <div>
                    <strong>Endereço</strong>
                    <span>{contato.endereco.completo}</span>
                  </div>
                </li>
                <li>
                  <Phone size={18} strokeWidth={1.9} />
                  <div>
                    <strong>Telefone</strong>
                    <a href={contato.telefone.href}>{contato.telefone.display}</a>
                  </div>
                </li>
                <li>
                  <Mail size={18} strokeWidth={1.9} />
                  <div>
                    <strong>E-mail</strong>
                    <a href={contato.email.href}>{contato.email.display}</a>
                  </div>
                </li>
              </ul>
            </div>

            <div className={styles.contactCta}>
              <span className={styles.sectionEyebrow}>Precisando de apoio?</span>
              <h3>Fale com a RECOM</h3>
              <p>A equipe direciona sua demanda para o fornecedor, catálogo ou linha mais aderente à aplicação.</p>
              <ActionButton
                to="/contato"
                variant="primary"
                stackOnMobile
                onClick={() => trackLeadGen('form_intent', 'ARecom Sidebar CTA')}
              >
                Solicitar contato <ArrowRight size={14} />
              </ActionButton>
            </div>
          </aside>
        </section>

        <section className={styles.sectionBlock}>
          <div className={styles.sectionHeading}>
            <span className={styles.sectionEyebrow}>Nossos fornecedores</span>
            <h2>Marcas que sustentam nosso portfólio</h2>
          </div>
          <p className={styles.sectionLead}>
            A RECOM conecta clientes industriais a fornecedores reconhecidos no mercado de ferramentas de corte e fixação.
          </p>

          <div className={styles.supplierGrid}>
            {providerHighlights.map((fornecedor) => (
              <Link
                key={fornecedor.id}
                to={`/fornecedores-catalogos/${fornecedor.slug}`}
                className={styles.supplierCard}
              >
                <div className={styles.supplierLogoFrame}>
                  <img src={fornecedor.logo} alt={fornecedor.altText} className={styles.supplierLogo} />
                </div>
                <div className={styles.supplierMeta}>
                  <strong>{fornecedor.nome}</strong>
                  <span>{fornecedor.descricaoCurta}</span>
                </div>
                <span className={styles.supplierLink}>
                  Ver fornecedor <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className={styles.footerCta}>
          <div className={styles.footerCtaCopy}>
            <span className={styles.sectionEyebrow}>Próximo passo</span>
            <h2>Precisa de apoio para selecionar ferramentas e fornecedores?</h2>
            <p>
              Fale com a equipe da RECOM e receba atendimento técnico-comercial alinhado à sua operação.
            </p>
          </div>
          <ActionButton
            to="/contato"
            variant="primary"
            stackOnMobile
            onClick={() => trackLeadGen('form_intent', 'ARecom Footer CTA')}
          >
            Solicitar orientação <ArrowRight size={16} />
          </ActionButton>
        </section>
      </div>
    </Layout>
  );
};

export default ARecom;
