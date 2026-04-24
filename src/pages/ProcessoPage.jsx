import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import Layout from '../components/Layout';
import SEOHead from '../components/SEOHead';
import Breadcrumb from '../components/Breadcrumb';
import ActionButton from '../components/ActionButton';
import { ArrowRight, MessageCircle, Crosshair, Drill, Layers3 } from 'lucide-react';
import styles from './ProcessoPage.module.css';
import editorialStyles from '../styles/Editorial.module.css';
import { getProcessoBySlug, processos } from '../data/processos';
import { fornecedores, getCatalogosDoFornecedor } from '../data/fornecedores';
import { contato } from '../data/contato';
import { trackLeadGen } from '../utils/analytics';

// Imagens por processo (mapeamento estatico)
import koudoeImg from '../assets/images/optimized/koudoe.jpg';
import fresaImg from '../assets/images/optimized/fresa-Bf0r_sxm.jpg';
import kougImg from '../assets/images/optimized/koug.jpg';

const processoImages = {
  torneamento: koudoeImg,
  fresamento: fresaImg,
  furacao: kougImg,
};

const processoIconMap = {
  torneamento: Crosshair,
  fresamento: Layers3,
  furacao: Drill,
};

/**
 * Template dinamico para paginas de processos de usinagem.
 * Substitui Torneamento.jsx, Fresamento.jsx e Furacao.jsx.
 */
const ProcessoPage = () => {
  const { slug } = useParams();
  const processo = getProcessoBySlug(slug);

  if (!processo) {
    return <Navigate to="/solucoes" replace />;
  }

  const imagem = processoImages[processo.slug];
  const IconeProcesso = processoIconMap[processo.slug] || Crosshair;
  const fornecedoresRelacionados = fornecedores.filter((fornecedor) =>
    processo.fornecedoresRelacionados.includes(fornecedor.id)
  );
  const fornecedorPrincipal = fornecedoresRelacionados[0];
  const hrefCatalogoPrincipal = fornecedorPrincipal
    ? `/fornecedores-catalogos/${fornecedorPrincipal.slug}`
    : '/fornecedores-catalogos';
  const outrosProcessos = processos.filter((p) => p.id !== processo.id);
  const palavrasChave = processo.keywords.slice(0, 4);

  const breadcrumbItems = [
    { label: 'Início', path: '/' },
    { label: 'Soluções / Processos', path: '/solucoes' },
    { label: processo.nome },
  ];

  return (
    <Layout>
      <SEOHead
        title={processo.metaTitle.split(' | ')[0]}
        description={processo.metaDescription}
        canonical={`/solucoes/${processo.slug}`}
      />

      <div className={editorialStyles.pageContainer}>
        <Breadcrumb items={breadcrumbItems} />

        <section className={editorialStyles.heroSection}>
          <div className={styles.heroCopy}>
            <div className={styles.heroMeta}>
              <span className={editorialStyles.kicker}>Soluções por processo</span>
              <span className={styles.heroBadge}>
                {fornecedoresRelacionados.length} fornecedor{fornecedoresRelacionados.length === 1 ? '' : 'es'} relacionado{fornecedoresRelacionados.length === 1 ? '' : 's'}
              </span>
              <span className={styles.heroBadgeMuted}>{processo.keywords.length} palavras-chave</span>
            </div>

            <h1 className={editorialStyles.pageTitle}>{processo.nome}</h1>
            <p className={editorialStyles.pageSubtitle}>{processo.descricaoCurta}</p>

            <div className={styles.heroProcessBlock}>
              <p className={editorialStyles.cardDesc}>{processo.descricao}</p>
              <p className={styles.heroSupport}>
                Se você já tem o código, o nome da peça ou a dúvida de aplicação, siga pelos atalhos abaixo para chegar ao catálogo, ao fornecedor ou ao contato certo.
              </p>
            </div>

            {palavrasChave.length > 0 && (
              <div className={styles.keywordRow}>
                {palavrasChave.map((keyword) => (
                  <span key={keyword} className={styles.keywordChip}>
                    {keyword}
                  </span>
                ))}
              </div>
            )}

            <div className={styles.heroActions}>
              <ActionButton
                to="/contato"
                variant="primary"
                stackOnMobile
                onClick={() => trackLeadGen('form_intent', 'Processo Hero CTA')}
              >
                Solicitar Orçamento
              </ActionButton>
              <ActionButton to="/fornecedores-catalogos" variant="secondary" stackOnMobile>
                Ver fornecedores
              </ActionButton>
              <ActionButton
                href={contato.whatsapp.hrefComMensagem}
                target="_blank"
                variant="whatsapp"
                stackOnMobile
                onClick={() => trackLeadGen('whatsapp', 'Processo Hero CTA')}
              >
                <MessageCircle size={16} />
                {contato.telefone.display}
              </ActionButton>
            </div>
          </div>

          <div className={styles.heroVisual}>
            <div className={styles.heroVisualCard}>
              <div className={styles.heroVisualLabelRow}>
                <span className={editorialStyles.kicker}>Referência visual</span>
                <span className={styles.heroVisualBadge}>{processo.nome}</span>
              </div>

              {imagem ? (
                <div className={styles.heroImageFrame}>
                  <img
                    src={imagem}
                    alt={`Ferramenta de ${processo.nome.toLowerCase()} - ${processo.descricaoCurta}`}
                    className={styles.heroImg}
                    fetchPriority="high"
                    width="1400"
                    height="1045"
                    loading="eager"
                    decoding="async"
                  />
                </div>
              ) : (
                <div className={styles.heroImageFallback}>
                  <IconeProcesso size={36} />
                  <span>{processo.nome}</span>
                </div>
              )}

              <div className={styles.heroVisualStats}>
                <div className={styles.heroStat}>
                  <IconeProcesso size={16} strokeWidth={1.9} />
                  <div>
                    <strong>{fornecedoresRelacionados.length}</strong>
                    <span>fornecedores relacionados</span>
                  </div>
                </div>
                <div className={styles.heroStat}>
                  <span className={styles.heroStatValue}>{processo.keywords.length}</span>
                  <div>
                    <strong>palavras-chave</strong>
                    <span>para acelerar a busca</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className={styles.contentGrid}>
          <div className={styles.mainContent}>
            <section className={styles.sectionBox}>
              <div className={styles.sectionHeader}>
                <span className={editorialStyles.kicker}>Acesso guiado</span>
                <h2 className={editorialStyles.sectionTitle}>Escolha o caminho certo para esta operação</h2>
              </div>
              <p className={editorialStyles.cardDesc}>
                Selecione a opção que combina com a informação que você já tem. Assim, você chega mais rápido ao catálogo, ao fornecedor ou ao contato da RECOM.
              </p>
              <div className={styles.atalhosGrid}>
                {processo.atalhos.map((atalho) => {
                  const destino = atalho.to === 'catalogo-principal' ? hrefCatalogoPrincipal : atalho.to;

                  return (
                    <Link to={destino} key={atalho.titulo} className={editorialStyles.cardBase}>
                      <span className={editorialStyles.kicker}>Atalho</span>
                      <h3 className={editorialStyles.cardTitle}>{atalho.titulo}</h3>
                      <p className={editorialStyles.cardDesc}>{atalho.descricao}</p>
                      <span className={editorialStyles.cardAction}>
                        {atalho.ctaLabel} <ArrowRight size={14} />
                      </span>
                    </Link>
                  );
                })}
              </div>
            </section>

            {fornecedoresRelacionados.length > 0 ? (
              <section className={styles.sectionBox}>
                <div className={styles.sectionHeader}>
                  <span className={editorialStyles.kicker}>Fornecedores relacionados</span>
                  <h2 className={editorialStyles.sectionTitle}>
                    Marcas mais aderentes a {processo.nome.toLowerCase()}
                  </h2>
                </div>
                <p className={editorialStyles.cardDesc}>
                  Estes parceiros oferecem linhas e catálogos que conversam diretamente com este processo.
                </p>
                <div className={styles.fornecedoresGrid}>
                  {fornecedoresRelacionados.map((fornecedor) => {
                    const catalogos = getCatalogosDoFornecedor(fornecedor);

                    return (
                      <Link
                        to={`/fornecedores-catalogos/${fornecedor.slug}`}
                        key={fornecedor.id}
                        className={editorialStyles.cardBase}
                      >
                        <div className={styles.fornecedorCardTop}>
                          <div className={styles.fornecedorLogoCard}>
                            <img
                              src={fornecedor.logo}
                              alt={fornecedor.altText}
                              loading="lazy"
                              width={fornecedor.logoWidth}
                              height={fornecedor.logoHeight}
                              decoding="async"
                            />
                          </div>
                          {fornecedor.destaque && <span className={styles.fornecedorBadge}>Principal</span>}
                        </div>

                        <div className={styles.fornecedorInfo}>
                          <h3 className={editorialStyles.cardTitle}>{fornecedor.nome}</h3>
                          <p className={editorialStyles.cardDesc}>{fornecedor.descricaoCurta}</p>
                        </div>

                        <div className={styles.fornecedorMeta}>
                          <span className={styles.fornecedorPill}>
                            {catalogos.length} catálogo{catalogos.length === 1 ? '' : 's'}
                          </span>
                          <span className={styles.fornecedorPillMuted}>Fornecedor parceiro</span>
                        </div>

                        <span className={editorialStyles.cardAction}>
                          Ver fornecedor <ArrowRight size={14} />
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </section>
            ) : (
              <section className={styles.sectionBox}>
                <div className={styles.sectionHeader}>
                  <span className={editorialStyles.kicker}>Fornecedores relacionados</span>
                  <h2 className={editorialStyles.sectionTitle}>
                    Ainda não há fornecedores mapeados para {processo.nome.toLowerCase()}
                  </h2>
                </div>
                <p className={editorialStyles.cardDesc}>
                  Quando a relação não está validada, a melhor rota é falar com a RECOM e informar a aplicação, o material ou a referência que você já possui.
                </p>
                <ActionButton to="/contato" variant="secondary" stackOnMobile>
                  Solicitar apoio da RECOM <ArrowRight size={14} />
                </ActionButton>
              </section>
            )}

            <section className={styles.sectionBox}>
              <div className={styles.sectionHeader}>
                <span className={editorialStyles.kicker}>Outros processos</span>
                <h2 className={editorialStyles.sectionTitle}>Explore outras rotas de usinagem</h2>
              </div>
              <p className={editorialStyles.cardDesc}>
                Se a sua necessidade estiver em outro tipo de operação, estas páginas ajudam a refinar a busca.
              </p>
              <div className={styles.outrosGrid}>
                {outrosProcessos.map((p) => {
                  const IconeOutro = processoIconMap[p.slug] || Crosshair;

                  return (
                    <Link to={`/solucoes/${p.slug}`} key={p.id} className={editorialStyles.cardBase}>
                      <div className={styles.outroTop}>
                        <div className={styles.outroIcon}>
                          <IconeOutro size={20} strokeWidth={1.85} />
                        </div>
                        <span className={styles.outroBadge}>Processo</span>
                      </div>
                      <h3 className={editorialStyles.cardTitle}>{p.nome}</h3>
                      <p className={editorialStyles.cardDesc}>{p.descricaoCurta}</p>
                      <span className={editorialStyles.cardAction}>
                        Ver página <ArrowRight size={14} />
                      </span>
                    </Link>
                  );
                })}
              </div>
            </section>
          </div>

          <aside className={styles.sidebar}>
            <div className={styles.ctaCard}>
              <span className={editorialStyles.kicker}>Suporte comercial</span>
              <h3 className={editorialStyles.cardTitle}>Solicite um orçamento</h3>
              <p className={editorialStyles.cardDesc}>
                Precisa de ferramentas para {processo.nome.toLowerCase()}? A RECOM indica a solução mais adequada a partir dos dados que você já tem.
              </p>
              <ActionButton
                to="/contato"
                variant="primary"
                stackOnMobile
                onClick={() => trackLeadGen('form_intent', 'Processo Sidebar CTA')}
              >
                Entrar em contato <ArrowRight size={14} />
              </ActionButton>
            </div>

            <div className={styles.infoCard}>
              <span className={editorialStyles.kicker}>Palavras-chave</span>
              <h3 className={editorialStyles.cardTitle}>Aplicações comuns</h3>
              <p className={editorialStyles.cardDesc}>
                Use estes termos para localizar catálogo, fornecedor e aplicação com menos etapas.
              </p>
              <div className={styles.keywordList}>
                {processo.keywords.map((keyword) => (
                  <span key={keyword} className={styles.keywordChip}>
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  );
};

export default ProcessoPage;
