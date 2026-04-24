import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import SEOHead from '../components/SEOHead';
import Breadcrumb from '../components/Breadcrumb';
import ActionButton from '../components/ActionButton';
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
        description="Selecione torneamento, fresamento ou furação para seguir para fornecedores, catálogos oficiais e contato direto com a RECOM Metal Duro."
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
              Selecione a operação e siga para fornecedores, catálogo oficial ou contato. A RECOM vende ferramentas e constrói com o cliente a solução mais adequada para cada aplicação.
            </p>

            <div className={styles.heroActions}>
              <ActionButton
                to="/contato"
                variant="primary"
                stackOnMobile
                onClick={() => trackLeadGen('form_intent', 'Solucoes Hub CTA')}
              >
                Falar com especialista <ArrowRight size={16} />
              </ActionButton>
              <ActionButton to="/fornecedores-catalogos" variant="secondary" stackOnMobile>
                Ver fornecedores
              </ActionButton>
            </div>
          </div>

          <div className={styles.heroBrandCard}>
            <span className={styles.heroBrandKicker}>Como a RECOM atua</span>
            <h2 className={styles.heroBrandTitle}>Venda de ferramentas e definição do processo lado a lado com o cliente</h2>
            <p className={styles.heroBrandDesc}>
              A RECOM orienta a escolha, cruza dados técnicos e encaminha o próximo passo quando a aplicação pede validação de peça, catálogo ou ajuste de processo.
            </p>
            <ol className={styles.heroSteps}>
              <li className={styles.heroStep}>
                <span className={styles.heroStepIndex}>1</span>
                <span>Selecione a operação ou traga o dado da peça que você já tem.</span>
              </li>
              <li className={styles.heroStep}>
                <span className={styles.heroStepIndex}>2</span>
                <span>Abra o fornecedor, o catálogo oficial ou o contato direto.</span>
              </li>
              <li className={styles.heroStep}>
                <span className={styles.heroStepIndex}>3</span>
                <span>Siga pela rota certa e reduza dúvida, retrabalho e etapas desnecessárias.</span>
              </li>
            </ol>
          </div>
        </section>

        <section className={styles.quickAccessSection} aria-label="Acesso rapido aos processos">
          <div className={styles.quickAccessCopy}>
            <span className={styles.quickAccessEyebrow}>Entrada guiada</span>
            <h2>Escolha a operação certa e siga pelo caminho mais curto</h2>
            <p>
              Se você já tem código, nome da peça ou fabricante, use o acesso rápido. Se ainda precisa definir a rota, siga para o contato ou para os catálogos oficiais.
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
            A equipe ajuda a enquadrar a operação, conferir os dados disponíveis e indicar a rota mais direta para catálogo, fornecedor ou contato.
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
