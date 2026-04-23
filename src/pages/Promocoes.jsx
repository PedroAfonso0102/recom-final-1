import React from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import Breadcrumb from '../components/Breadcrumb';
import { ArrowRight, Phone, Tag, Calendar, Info } from 'lucide-react';
import styles from './Promocoes.module.css';
import { contato } from '../data/contato';
import { fornecedores } from '../data/fornecedores';

/**
 * Promoções — Página de condições especiais e campanhas.
 * NÃO é e-commerce. NÃO exibe preços públicos.
 * 
 * Etapa 3: "tom editorial, não catálogo de venda"
 * Etapa 4: "promoções como aceleradoras de contato, não como checkout"
 */

const campanhas = [
  {
    id: 1,
    titulo: 'Condições Especiais em Insertos Mitsubishi',
    subtitulo: 'Insertos das séries WNMG e CNMG com condições diferenciadas para pedidos em volume',
    tipo: 'Campanha do Fabricante',
    vigencia: 'Válido enquanto durarem os estoques',
    destaques: [
      'Classes VP15TF e UC6110 para torneamento geral',
      'Condições progressivas por quantidade',
      'Pronta entrega para os diâmetros mais comuns',
      'Suporte de engenharia de aplicação incluso',
    ],
    fornecedor: 'mitsubishi-materials',
  },
  {
    id: 2,
    titulo: 'Fresas de Topo 7Leaders — Lote Especial',
    subtitulo: 'Fresas inteiriças com revestimento TiAlN para operações de desbaste e acabamento',
    tipo: 'Estoque Promocional',
    vigencia: 'Válido enquanto durarem os estoques',
    destaques: [
      'Diâmetros de 6mm a 20mm disponíveis',
      'Revestimento multicamada de alta performance',
      'Geometria otimizada para redução de vibrações',
      'Preço especial para compras acima de 5 unidades',
    ],
    fornecedor: '7leaders',
  },
  {
    id: 3,
    titulo: 'Brocas WSTAR — Condição de Lançamento',
    subtitulo: 'Brocas inteiriças com refrigeração interna para furação de alta produtividade',
    tipo: 'Lançamento',
    vigencia: 'Condições por tempo limitado',
    destaques: [
      'Refrigeração interna por 2 canais otimizados',
      'Cobertura de última geração para vida útil estendida',
      'Geometria autocentrante — elimina pré-furação',
      'Consultoria técnica gratuita para seleção do modelo',
    ],
    fornecedor: 'mitsubishi-materials',
  },
];

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
          {campanhas.map(c => {
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
                  <Link to="/contato" className={styles.campanhaBtn}>
                    Solicitar Orçamento <ArrowRight size={14} />
                  </Link>
                </div>
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
            <Link to="/contato" className={styles.ctaPrimary}>
              Falar com o Comercial
            </Link>
            <a href={contato.whatsapp.hrefComMensagem} target="_blank" rel="noopener noreferrer" className={styles.ctaWhatsapp}>
              <Phone size={16} />
              {contato.telefone.display}
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Promocoes;