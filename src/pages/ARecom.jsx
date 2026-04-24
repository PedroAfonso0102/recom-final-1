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
      value: 'Desde 1990',
      text: 'trajetória comercial construída em Campinas-SP',
    },
    {
      icon: MapPin,
      label: 'Base operacional',
      value: 'Campinas-SP',
      text: 'atendimento técnico-comercial para o interior paulista',
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
        description={`A RECOM Metal Duro atua com ferramentas para usinagem desde 1990, em Campinas-SP, com distribuição autorizada Mitsubishi Materials desde ${contato.parceriaMitsubishiDesde}.`}
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
              <span className={styles.heroBadge}>Desde 1990</span>
              <span className={styles.heroBadgeMuted}>Campinas-SP</span>
            </div>

            <h1 className={styles.pageTitle}>A RECOM</h1>
            <p className={styles.pageSubtitle}>
              A RECOM é distribuidora de ferramentas para usinagem, com base em Campinas-SP e atendimento técnico-comercial em todo o interior paulista.
            </p>
            <p className={styles.heroSupport}>
              Atuamos junto a indústrias, ferramentarias, áreas de compras e produção, ajudando o cliente a chegar ao fornecedor, catálogo ou linha mais adequada para cada aplicação.
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
            <h2>Trajetória construída no setor industrial</h2>
          </div>

          <div className={styles.timelineGrid}>
            <article className={styles.timelineCard}>
              <span className={styles.timelineYear}>1990</span>
              <h3>Início da RECOM em Campinas</h3>
              <p>
                A empresa nasce em Campinas-SP com atuação voltada ao fornecimento de ferramentas para a indústria metalmecânica.
              </p>
            </article>

            <article className={styles.timelineCard}>
              <span className={styles.timelineYear}>{contato.parceriaMitsubishiDesde}</span>
              <h3>Distribuição autorizada</h3>
              <p>
                A RECOM fortalece sua atuação como distribuidora autorizada, aproximando clientes industriais das linhas e catálogos oficiais da marca.
              </p>
            </article>

            <article className={styles.timelineCard}>
              <span className={styles.timelineYear}>Hoje</span>
              <h3>Atendimento em todo o interior paulista</h3>
              <p>
                A empresa atende clientes industriais com foco em ferramentas para usinagem, fornecedores reconhecidos e suporte técnico-comercial próximo.
              </p>
            </article>
          </div>
        </section>

        <section className={styles.sectionSplit}>
          <div className={styles.sectionBlock}>
            <div className={styles.sectionHeading}>
              <span className={styles.sectionEyebrow}>Como atuamos</span>
              <h2>Atendimento direto entre cliente, fornecedor e aplicação</h2>
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
                Atendimento a partir de Campinas-SP, com cobertura comercial para clientes industriais em todo o interior paulista.
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
            <h2>Marcas que sustentam nosso atendimento</h2>
          </div>
          <p className={styles.sectionLead}>
            A RECOM trabalha com fornecedores reconhecidos em ferramentas de corte, fixação e acessórios para usinagem.
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
            <h2>Precisa selecionar ferramentas ou validar um fornecedor?</h2>
            <p>
              Fale com a RECOM. A equipe ajuda a organizar as informações da aplicação e indicar o caminho mais direto para catálogo, orçamento ou atendimento.
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
