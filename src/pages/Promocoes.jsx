import React from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import Breadcrumb from '../components/Breadcrumb';
import ActionButton from '../components/ActionButton';
import { ArrowRight, MessageCircle, Tag, Calendar, Info } from 'lucide-react';
import styles from './Promocoes.module.css';
import { contato } from '../data/contato';
import { fornecedores } from '../data/fornecedores';
import { campanhasPromocionais } from '../data/promocoes';

/**
 * Promoções — Página de condições especiais e campanhas.
 * NÃO é e-commerce. NÃO exibe preços públicos.
 * 
 * Etapa 3: "tom editorial, não catálogo de venda"
 * Etapa 4: "promoções como aceleradoras de contato, não como checkout"
 */

const breadcrumbItems = [
  { label: 'Início', path: '/' },
  { label: 'Promoções' },
];

const Promocoes = () => {
  return (
    <Layout>
      <SEOHead
        title="Promoções e Condições Especiais"
        description="Condições diferenciadas em ferramentas de usinagem Mitsubishi Materials e 7Leaders. Campanhas exclusivas para clientes B2B. Solicite orçamento."
      />

      <div className={styles.container}>
        <Breadcrumb items={breadcrumbItems} />

        {/* Header */}
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Promoções e Condições Especiais</h1>
          <p className={styles.pageSubtitle}>
            A RECOM negocia periodicamente condições diferenciadas com nossos fornecedores.
            Confira as campanhas ativas e solicite um orçamento.
          </p>
        </div>

        {/* Aviso editorial */}
        <div className={styles.aviso}>
          <Info size={18} />
          <p>
            <strong>Preços sob consulta.</strong> As condições abaixo são negociadas diretamente
            com cada cliente. Entre em contato para receber uma proposta personalizada.
          </p>
        </div>

        {/* Campanhas */}
        <div className={styles.campanhasGrid}>
          {campanhasPromocionais.map(c => {
            const forn = fornecedores.find(f => f.id === c.fornecedor);
            return (
              <div key={c.id} className={styles.campanhaCard}>
                <div className={styles.campanhaHeader}>
                  <span className={styles.campanhaTipo}>
                    <Tag size={14} />
                    {c.tipo}
                  </span>
                  <span className={styles.campanhaVigencia}>
                    <Calendar size={14} />
                    {c.vigencia}
                  </span>
                </div>
                <h3 className={styles.campanhaTitulo}>{c.titulo}</h3>
                <p className={styles.campanhaSubtitulo}>{c.subtitulo}</p>
                <ul className={styles.campanhaDestaques}>
                  {c.destaques.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
                <div className={styles.campanhaFooter}>
                  {forn && (
                    <Link to={`/fornecedores-catalogos/${forn.slug}`} className={styles.fornLink}>
                      <img src={forn.logo} alt={forn.altText} className={styles.fornLogo} />
                      <span>{forn.nome}</span>
                    </Link>
                  )}
                  <ActionButton to="/contato" variant="secondary" compact stackOnMobile>
                    Solicitar orçamento <ArrowRight size={14} />
                  </ActionButton>
                </div>
                <p className={styles.campanhaNota}>{c.ressalva}</p>
              </div>
            );
          })}
        </div>

        {/* CTA final */}
        <div className={styles.ctaSection}>
          <h2 className={styles.ctaTitle}>Não encontrou o que precisa?</h2>
          <p className={styles.ctaDesc}>
            Trabalhamos com condições especiais sob demanda. Nossa equipe pode negociar
            diretamente com o fabricante para atender sua necessidade específica.
          </p>
          <div className={styles.ctaActions}>
            <ActionButton to="/contato" variant="contrast" stackOnMobile>
              Solicitar orientação comercial
            </ActionButton>
            <ActionButton href={contato.whatsapp.hrefComMensagem} target="_blank" variant="whatsapp" stackOnMobile>
              <MessageCircle size={16} />
              {contato.telefone.display}
            </ActionButton>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Promocoes;
