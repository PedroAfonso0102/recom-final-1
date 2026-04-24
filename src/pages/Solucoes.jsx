import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import SEOHead from '../components/SEOHead';
import Breadcrumb from '../components/Breadcrumb';
import ActionButton from '../components/ActionButton';
import { Card } from '../components/ui';
import { ArrowRight, ChevronDown, Crosshair, Drill, Layers3 } from 'lucide-react';
import styles from './Solucoes.module.css';
import { processos } from '../data/processos';
import { fornecedores } from '../data/fornecedores';
import { trackLeadGen } from '../utils/analytics';
import editorialImg from '../assets/images/optimized/recom-editorial-3.jpg';

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
        title="Soluções por processo"
        description="Encontre fornecedores, catálogos e caminhos de atendimento a partir da operação de usinagem."
      />
      <Breadcrumb
        items={[
          { label: 'Início', to: '/' },
          { label: 'Soluções por processo' },
        ]}
      />

      <div className={styles.pageContainer}>
        <section className={styles.heroSection}>
          <div className={styles.heroCopy}>
            <div className={styles.heroMeta}>
              <span className={styles.heroEyebrow}>Por operação</span>
              <span className={styles.heroBadge}>Torneamento, fresamento e furação</span>
              <span className={styles.heroBadgeMuted}>Entrada por processo</span>
            </div>

            <h1 className={styles.pageTitle}>Soluções por processo</h1>
            <p className={styles.pageSubtitle}>
              Encontre fornecedores, catálogos e caminhos de atendimento a partir da operação de usinagem.
            </p>
            <p className={styles.pageSubtitle}>
              A RECOM ajuda a cruzar ferramenta, aplicação e fornecedor para que o cliente avance com mais segurança na cotação ou na definição do processo.
            </p>

            <div className={styles.heroActions}>
              <ActionButton
                to="/contato"
                variant="primary"
                stackOnMobile
                onClick={() => trackLeadGen('form_intent', 'Solucoes Hub CTA')}
              >
                Entrar em contato <ArrowRight size={16} />
              </ActionButton>
              <ActionButton to="/fornecedores-catalogos" variant="secondary" stackOnMobile>
                Ver fornecedores
              </ActionButton>
            </div>
          </div>

          <div className={styles.heroBrandCard}>
            <img
              src={editorialImg}
              alt="Soluções e processos de usinagem da RECOM Metal Duro"
              className={styles.heroBrandImage}
              style={{ objectPosition: '72% center' }}
              fetchPriority="high"
              width="1400"
              height="781"
              loading="eager"
              decoding="async"
            />
            <div className={styles.heroBrandCopy}>
              <span className={styles.heroBrandKicker}>Como a RECOM atua</span>
              <h2 className={styles.heroBrandTitle}>Da operação à ferramenta correta</h2>
              <p className={styles.heroBrandDesc}>
                A RECOM vende ferramentas para usinagem e apoia o cliente na leitura da aplicação, indicando fornecedores, catálogos e caminhos de atendimento conforme a necessidade da peça.
              </p>
              <ol className={styles.heroSteps}>
                <li className={styles.heroStep}>
                  <span className={styles.heroStepIndex}>1</span>
                  <span>Informe a operação, material, código ou dados da peça.</span>
                </li>
                <li className={styles.heroStep}>
                  <span className={styles.heroStepIndex}>2</span>
                  <span>A RECOM cruza a aplicação com fornecedores e catálogos oficiais.</span>
                </li>
                <li className={styles.heroStep}>
                  <span className={styles.heroStepIndex}>3</span>
                  <span>Você segue para cotação ou validação com menos dúvida e retrabalho.</span>
                </li>
              </ol>
            </div>
          </div>
        </section>

        <section className={styles.quickAccessSection} aria-label="Acesso rápido aos processos">
          <div className={styles.quickAccessCopy}>
            <span className={styles.quickAccessEyebrow}>Comece pela operação</span>
            <h2>Escolha o processo de usinagem e siga pela rota certa</h2>
            <p>
              Se já tiver código, desenho, material ou fornecedor de referência, envie para a RECOM e receba um direcionamento mais preciso.
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

              <ActionButton
                type="button"
                variant="secondary"
                compact
                stackOnMobile
                onClick={scrollToProcesses}
              >
                Ver opções
              </ActionButton>
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
              <Card to={`/solucoes/${processo.slug}`} key={processo.id} className={styles.processoCard}>
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
              </Card>
            );
          })}
        </div>

        <section className={styles.ctaSection}>
          <span className={styles.ctaEyebrow}>Apoio técnico</span>
          <h2 className={styles.ctaTitle}>Ainda não sabe qual processo seguir?</h2>
          <p className={styles.ctaDesc}>
            Envie os dados da peça, material, operação ou código de referência. A RECOM ajuda a organizar a demanda e indicar o caminho mais direto para fornecedor, catálogo ou orçamento.
          </p>
          <div className={styles.ctaActions}>
            <ActionButton
              to="/contato"
              variant="primary"
              stackOnMobile
              onClick={() => trackLeadGen('form_intent', 'Solucoes Footer CTA')}
            >
              Solicitar orientação
            </ActionButton>
            <ActionButton to="/fornecedores-catalogos" variant="secondary" stackOnMobile>
              Ver fornecedores
            </ActionButton>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Solucoes;
