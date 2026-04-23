import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import Layout from '../components/Layout';
import SEOHead from '../components/SEOHead';
import Breadcrumb from '../components/Breadcrumb';
import { ArrowRight, Phone, Box, Circle, Crosshair } from 'lucide-react';
import styles from './ProcessoPage.module.css';
import { getProcessoBySlug, processos } from '../data/processos';
import { fornecedores, getCatalogosDoFornecedor } from '../data/fornecedores';
import { contato } from '../data/contato';
import { trackLeadGen } from '../utils/analytics';

// Imagens por processo (mapeamento estatico)
import koudoeImg from '../assets/images/Upscaled/koudoe.png';
import fresaImg from '../assets/images/Upscaled/fresa-Bf0r_sxm.png';
import kougImg from '../assets/images/Upscaled/koug.png';

const processoImages = {
  torneamento: koudoeImg,
  fresamento: fresaImg,
  furacao: kougImg,
};

const processoIconMap = {
  torneamento: Crosshair,
  fresamento: Box,
  furacao: Circle,
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
      />

      <div className={styles.pageContainer}>
        <Breadcrumb items={breadcrumbItems} />

        <section className={styles.heroSection}>
          <div className={styles.heroCopy}>
            <div className={styles.heroMeta}>
              <span className={styles.heroEyebrow}>Soluções por processo</span>
              <span className={styles.heroBadge}>
                {fornecedoresRelacionados.length} fornecedor{fornecedoresRelacionados.length === 1 ? '' : 'es'} relacionado{fornecedoresRelacionados.length === 1 ? '' : 's'}
              </span>
              <span className={styles.heroBadgeMuted}>{processo.keywords.length} palavras-chave</span>
            </div>

            <h1 className={styles.processTitle}>{processo.nome}</h1>
            <p className={styles.processTagline}>{processo.descricaoCurta}</p>
            <p className={styles.heroSupport}>
              Use esta página como ponto de partida para abrir fornecedores relacionados, catálogos oficiais e o contato comercial da RECOM.
            </p>

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
              <Link
                to="/contato"
                className={styles.primaryBtn}
                onClick={() => trackLeadGen('form_intent', 'Processo Hero CTA')}
              >
                Solicitar Orçamento
              </Link>
              <Link to="/fornecedores-catalogos" className={styles.secondaryBtn}>
                Ver fornecedores
              </Link>
              <a
                href={contato.whatsapp.hrefComMensagem}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.whatsappLink}
                onClick={() => trackLeadGen('whatsapp', 'Processo Hero CTA')}
              >
                <Phone size={16} />
                {contato.telefone.display}
              </a>
            </div>
          </div>

          <div className={styles.heroVisual}>
            <div className={styles.heroVisualCard}>
                <div className={styles.heroVisualLabelRow}>
                <span className={styles.heroVisualLabel}>Referência visual</span>
                <span className={styles.heroVisualBadge}>{processo.nome}</span>
              </div>

              {imagem ? (
                <div className={styles.heroImageFrame}>
                  <img
                    src={imagem}
                    alt={`Ferramenta de ${processo.nome.toLowerCase()} - ${processo.descricaoCurta}`}
                    className={styles.heroImg}
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
                  <IconeProcesso size={16} />
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
                <span className={styles.sectionEyebrow}>Sobre o processo</span>
                <h2 className={styles.sectionTitle}>Contexto e aplicações</h2>
              </div>
              <p className={styles.sectionLead}>
                A RECOM organiza esta rota por necessidade prática para conectar rapidamente a operação aos fornecedores certos.
              </p>
              <p className={styles.sectionBody}>{processo.descricao}</p>
            </section>

            {fornecedoresRelacionados.length > 0 && (
              <section className={styles.sectionBox}>
              <div className={styles.sectionHeader}>
                  <span className={styles.sectionEyebrow}>Fornecedores relacionados</span>
                  <h2 className={styles.sectionTitle}>
                    Marcas mais aderentes a {processo.nome.toLowerCase()}
                  </h2>
                </div>
                <p className={styles.sectionLead}>
                  Estes parceiros oferecem linhas e catálogos que conversam diretamente com este processo.
                </p>
                <div className={styles.fornecedoresGrid}>
                  {fornecedoresRelacionados.map((fornecedor) => {
                    const catalogos = getCatalogosDoFornecedor(fornecedor);

                    return (
                      <Link
                        to={`/fornecedores-catalogos/${fornecedor.slug}`}
                        key={fornecedor.id}
                        className={styles.fornecedorCard}
                      >
                        <div className={styles.fornecedorCardTop}>
                          <div className={styles.fornecedorLogoCard}>
                            <img src={fornecedor.logo} alt={fornecedor.altText} />
                          </div>
                          {fornecedor.destaque && <span className={styles.fornecedorBadge}>Principal</span>}
                        </div>

                        <div className={styles.fornecedorInfo}>
                          <h3>{fornecedor.nome}</h3>
                          <p>{fornecedor.descricaoCurta}</p>
                        </div>

                        <div className={styles.fornecedorMeta}>
                          <span className={styles.fornecedorPill}>
                            {catalogos.length} catálogo{catalogos.length === 1 ? '' : 's'}
                          </span>
                          <span className={styles.fornecedorPillMuted}>Fornecedor parceiro</span>
                        </div>

                        <span className={styles.fornecedorLink}>
                          Ver fornecedor <ArrowRight size={14} />
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </section>
            )}

            <section className={styles.sectionBox}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionEyebrow}>Outros processos</span>
                <h2 className={styles.sectionTitle}>Explore outras rotas de usinagem</h2>
              </div>
              <p className={styles.sectionLead}>
                Se a sua necessidade estiver em outro tipo de operação, estas páginas ajudam a refinar a busca.
              </p>
              <div className={styles.outrosGrid}>
                {outrosProcessos.map((p) => {
                  const IconeOutro = processoIconMap[p.slug] || Crosshair;

                  return (
                    <Link to={`/solucoes/${p.slug}`} key={p.id} className={styles.outroCard}>
                      <div className={styles.outroTop}>
                        <div className={styles.outroIcon}>
                          <IconeOutro size={20} />
                        </div>
                        <span className={styles.outroBadge}>Processo</span>
                      </div>
                      <h3>{p.nome}</h3>
                      <p>{p.descricaoCurta}</p>
                      <span className={styles.outroLink}>
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
              <span className={styles.sidebarEyebrow}>Suporte comercial</span>
              <h3>Solicite um orçamento</h3>
              <p>
                Precisa de ferramentas para {processo.nome.toLowerCase()}? A RECOM pode ajudar a indicar a melhor solução.
              </p>
              <Link
                to="/contato"
                className={styles.ctaSidebarBtn}
                onClick={() => trackLeadGen('form_intent', 'Processo Sidebar CTA')}
              >
                Falar com especialista <ArrowRight size={14} />
              </Link>
            </div>

          <div className={styles.infoCard}>
              <span className={styles.sidebarEyebrow}>Palavras-chave</span>
              <h3>Aplicações comuns</h3>
              <p>
                Use estes termos para acelerar a navegação entre soluções, fornecedores e catálogos oficiais.
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
