import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import SEOHead from '../components/SEOHead';
import Breadcrumb from '../components/Breadcrumb';
import { ArrowRight, ChevronDown, Crosshair, Drill, Layers3 } from 'lucide-react';
import styles from './Solucoes.module.css';
import { processos } from '../data/processos';
import { fornecedores } from '../data/fornecedores';
import { trackLeadGen } from '../utils/analytics';

const processIconMap = {
  torneamento: Crosshair,
  fresamento: Layers3,
  furacao: Drill,
};

/**
 * Hub de Solucoes / Processos.
 * Etapa 2: "Solucoes / Processos como hub de descoberta por necessidade pratica"
 * Etapa 4: "grid editorial com foco em escaneabilidade e navegacao objetiva"
 */
const Solucoes = () => {
  const navigate = useNavigate();

  const handleProcessSelect = (event) => {
    const { value } = event.target;
    if (value) {
      navigate(`/solucoes/${value}`);
    }
  };

  const scrollToProcesses = () => {
    const target = document.getElementById('processos-grid');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <Layout>
      <SEOHead
        title="Soluções / Processos"
        description="Explore torneamento, fresamento e furação com uma navegação direta para processos, fornecedores e contato comercial da RECOM Metal Duro."
      />
      <Breadcrumb
        items={[
          { label: 'Início', to: '/' },
          { label: 'Soluções / Processos' },
        ]}
      />

      <div className={styles.pageContainer}>
        <section className={styles.heroSection}>
          <div className={styles.heroCopy}>
            <div className={styles.heroMeta}>
              <span className={styles.heroEyebrow}>Soluções por processo</span>
              <span className={styles.heroBadge}>Hub técnico</span>
              <span className={styles.heroBadgeMuted}>{processos.length} rotas principais</span>
            </div>

            <h1 className={styles.pageTitle}>Soluções / Processos</h1>
            <p className={styles.pageSubtitle}>
              Organize a busca pela operação e encontre rapidamente as marcas, ferramentas e caminhos comerciais mais aderentes para torneamento, fresamento e furação.
            </p>

            <div className={styles.heroActions}>
              <Link
                to="/contato"
                className={styles.primaryBtn}
                onClick={() => trackLeadGen('form_intent', 'Solucoes Hub CTA')}
              >
                Falar com especialista <ArrowRight size={16} />
              </Link>
              <Link to="/fornecedores-catalogos" className={styles.secondaryBtn}>
                Ver fornecedores
              </Link>
            </div>
          </div>

          <div className={styles.heroBrandCard}>
            <span className={styles.heroBrandKicker}>Fluxo de navegação</span>
            <h2 className={styles.heroBrandTitle}>Escolha a operação e siga para a solução certa</h2>
            <p className={styles.heroBrandDesc}>
              Uma entrada rápida para processos, {fornecedores.length} fornecedores parceiros e contato comercial com a RECOM.
            </p>
            <ol className={styles.heroSteps}>
              <li className={styles.heroStep}>
                <span className={styles.heroStepIndex}>1</span>
                <span>Selecione o processo que melhor representa a aplicação.</span>
              </li>
              <li className={styles.heroStep}>
                <span className={styles.heroStepIndex}>2</span>
                <span>Abra a página com fornecedores e soluções relacionadas.</span>
              </li>
              <li className={styles.heroStep}>
                <span className={styles.heroStepIndex}>3</span>
                <span>Avance para o contato ou para o fornecedor oficial.</span>
              </li>
            </ol>
          </div>
        </section>

        <section className={styles.quickAccessSection} aria-label="Acesso rapido aos processos">
          <div className={styles.quickAccessCopy}>
            <span className={styles.quickAccessEyebrow}>Acesso rápido</span>
            <h2>Entre no processo sem depender só dos cards</h2>
            <p>
              Escolha diretamente uma operação ou abra a lista completa de soluções em um clique.
            </p>
          </div>

          <div className={styles.quickAccessPanel}>
            <label className={styles.quickAccessLabel} htmlFor="processo-select">
              Selecionar processo
            </label>
            <div className={styles.quickAccessForm}>
              <div className={styles.selectWrap}>
                <select
                  id="processo-select"
                  className={styles.quickAccessSelect}
                  defaultValue=""
                  onChange={handleProcessSelect}
                >
                  <option value="" disabled>
                    Ir direto para...
                  </option>
                  {processos.map((processo) => (
                    <option key={processo.id} value={processo.slug}>
                      {processo.nome}
                    </option>
                  ))}
                </select>
                <ChevronDown size={16} className={styles.selectIcon} />
              </div>

              <button type="button" className={styles.quickAccessBtn} onClick={scrollToProcesses}>
                Ver processos
              </button>
            </div>
          </div>
        </section>

        <div className={styles.processosGrid} id="processos-grid">
          {processos.map((processo) => {
            const Icon = processIconMap[processo.slug] || Crosshair;
            const relatedCount = fornecedores.filter((fornecedor) =>
              processo.fornecedoresRelacionados.includes(fornecedor.id)
            ).length;
            const tags = processo.keywords.slice(0, 3);

            return (
              <Link to={`/solucoes/${processo.slug}`} key={processo.id} className={styles.processoCard}>
                <div className={styles.processoTop}>
                  <div className={styles.processoIcon}>
                    <Icon size={24} strokeWidth={1.85} />
                  </div>
                  <span className={styles.processoCountBadge}>
                    {relatedCount} fornecedor{relatedCount === 1 ? '' : 'es'} relacionado{relatedCount === 1 ? '' : 's'}
                  </span>
                </div>

                <h2 className={styles.processoNome}>{processo.nome}</h2>
                <p className={styles.processoDesc}>{processo.descricaoCurta}</p>

                {tags.length > 0 && (
                  <div className={styles.processoTags}>
                    {tags.map((tag) => (
                      <span key={tag} className={styles.processoTag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <span className={styles.processoLink}>
                  Ver processo <ArrowRight size={14} />
                </span>
              </Link>
            );
          })}
        </div>

        <section className={styles.ctaSection}>
          <span className={styles.ctaEyebrow}>Apoio técnico</span>
          <h2 className={styles.ctaTitle}>Não sabe por onde começar? Fale com a RECOM.</h2>
          <p className={styles.ctaDesc}>
            Nossa equipe ajuda a traduzir a operação, o material e a necessidade técnica em uma rota de fornecimento mais precisa.
          </p>
          <div className={styles.ctaActions}>
            <Link
              to="/contato"
              className={styles.ctaBtn}
              onClick={() => trackLeadGen('form_intent', 'Solucoes Footer CTA')}
            >
              Solicitar orientação
            </Link>
            <Link to="/fornecedores-catalogos" className={styles.ctaSecondaryBtn}>
              Ver fornecedores
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Solucoes;
