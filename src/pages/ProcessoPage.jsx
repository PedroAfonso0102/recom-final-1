import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import Layout from '../components/Layout';
import SEOHead from '../components/SEOHead';
import Breadcrumb from '../components/Breadcrumb';
import { ArrowRight, Phone } from 'lucide-react';
import styles from './ProcessoPage.module.css';
import { getProcessoBySlug, processos } from '../data/processos';
import { fornecedores } from '../data/fornecedores';
import { contato } from '../data/contato';

// Imagens por processo (mapeamento estático)
import koudoeImg from '../assets/images/Upscaled/koudoe.png';
import fresaImg from '../assets/images/Upscaled/fresa-Bf0r_sxm.png';
import kougImg from '../assets/images/Upscaled/koug.png';

const processoImages = {
  torneamento: koudoeImg,
  fresamento: fresaImg,
  furacao: kougImg,
};

/**
 * Template dinâmico para páginas de processos de usinagem.
 * Substituí Torneamento.jsx, Fresamento.jsx e Furacao.jsx.
 * 
 * Etapa 2: "Soluções / Processos como hub de descoberta por necessidade prática"
 * Etapa 4: "cada processo liga a fornecedores relacionados com CTA de conversão"
 * Etapa 5: "CTA persistente, redução de fricção"
 */
const ProcessoPage = () => {
  const { slug } = useParams();
  const processo = getProcessoBySlug(slug);

  // Se slug não existe, redireciona para o hub
  if (!processo) {
    return <Navigate to="/solucoes" replace />;
  }

  const imagem = processoImages[processo.slug];

  // Fornecedores relacionados a este processo
  const fornecedoresRelacionados = fornecedores.filter(f =>
    processo.fornecedoresRelacionados.includes(f.id)
  );

  // Outros processos para navegação lateral
  const outrosProcessos = processos.filter(p => p.id !== processo.id);

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

      <div className={styles.container}>
        <Breadcrumb items={breadcrumbItems} />

        {/* Hero do processo */}
        <div className={styles.processoHero}>
          <div className={styles.heroText}>
            <h1 className={styles.processoTitle}>{processo.nome}</h1>
            <p className={styles.processoDesc}>{processo.descricao}</p>
            <div className={styles.heroActions}>
              <Link to="/contato" className={styles.primaryBtn}>
                Solicitar Orçamento
              </Link>
              <a href={contato.whatsapp.hrefComMensagem} target="_blank" rel="noopener noreferrer" className={styles.whatsappLink}>
                <Phone size={16} />
                {contato.telefone.display}
              </a>
            </div>
          </div>
          {imagem && (
            <div className={styles.heroVisual}>
              <img
                src={imagem}
                alt={`Ferramenta de ${processo.nome.toLowerCase()} — ${processo.descricaoCurta}`}
                className={styles.heroImg}
              />
            </div>
          )}
        </div>

        {/* Fornecedores que atendem este processo */}
        {fornecedoresRelacionados.length > 0 && (
          <section className={styles.sectionBox}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Fornecedores para {processo.nome}</h2>
              <p className={styles.sectionSubtitle}>
                Marcas reconhecidas que oferecem soluções para este processo, distribuídas pela RECOM.
              </p>
            </div>
            <div className={styles.fornecedoresGrid}>
              {fornecedoresRelacionados.map(f => (
                <Link to={`/fornecedores-catalogos/${f.slug}`} key={f.id} className={styles.fornecedorCard}>
                  <div className={styles.fornecedorLogo}>
                    <img src={f.logo} alt={f.altText} />
                  </div>
                  <div className={styles.fornecedorInfo}>
                    <strong>{f.nome}</strong>
                    <span>{f.descricaoCurta}</span>
                  </div>
                  <ArrowRight size={16} className={styles.fornecedorArrow} />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Outros processos */}
        <section className={styles.sectionBox}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Outros Processos</h2>
            <p className={styles.sectionSubtitle}>
              Conheça também as soluções da RECOM para outros processos de usinagem.
            </p>
          </div>
          <div className={styles.outrosGrid}>
            {outrosProcessos.map(p => (
              <Link to={`/solucoes/${p.slug}`} key={p.id} className={styles.outroCard}>
                <strong>{p.nome}</strong>
                <span>{p.descricaoCurta}</span>
                <span className={styles.outroArrow}><ArrowRight size={14} /></span>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA de conversão */}
        <div className={styles.ctaSection}>
          <h2 className={styles.ctaTitle}>Precisa de ferramentas para {processo.nome.toLowerCase()}?</h2>
          <p className={styles.ctaDesc}>
            Nossa equipe está pronta para ajudar na seleção de fornecedores e ferramentas ideais para sua operação.
          </p>
          <div className={styles.ctaActions}>
            <Link to="/contato" className={styles.ctaPrimaryBtn}>
              Solicitar Orçamento
            </Link>
            <Link to="/fornecedores-catalogos" className={styles.ctaSecondaryBtn}>
              Ver Fornecedores
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProcessoPage;
