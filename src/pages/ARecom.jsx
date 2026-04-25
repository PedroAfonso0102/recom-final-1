import React from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import Breadcrumb from '../components/Breadcrumb';
import styles from './Page.module.css';
import escritorioImg from '../assets/images/escritorio.jpg';
import { contato, institucional } from '../data/contato';
import { fornecedores } from '../data/fornecedores';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';

/**
 * A RECOM — Página institucional.
 * Etapa 3: "legitimidade, longevidade, vínculo comercial direto"
 * Etapa 4: "história, localização, parceria com fornecedores, proposta comercial"
 */
const ARecom = () => {
  return (
    <Layout>
      <SEOHead
        title="A RECOM — Quem Somos"
        description="A RECOM Metal Duro é um distribuidor B2B de ferramentas para usinagem, fundada em 1990 em Campinas-SP. Distribuidor autorizado Mitsubishi Materials desde 1998."
      />
      <Breadcrumb items={[
        { label: 'Início', to: '/' },
        { label: 'A RECOM' },
      ]} />

      <div className={styles.centerData}>
        <div className={styles.textBox}>
          <h1 className={styles.mainProductTitle}>A RECOM</h1>

          <div className={styles.floatingImage}>
            <img src={escritorioImg} alt="Escritório da RECOM Metal Duro em Campinas, SP" className={styles.standardImage} />
          </div>

          <p className={styles.just}>
            {institucional.descricaoCurta}
          </p>

          <h2 className={styles.sectionSubtitle}>Nossa História</h2>
          <p className={styles.just}>
            Fundada em <strong>1990</strong>, a RECOM Metal Duro nasceu em Campinas, interior do Estado de São Paulo, com foco em ferramentas de corte rotativas e estáticas para a indústria metalúrgica.
          </p>
          <p className={styles.just}>
            A partir de 1992, passamos a representar a <strong>Mitsubishi Carbide</strong> por meio de importador, sendo responsáveis pelo atendimento de Campinas, região e interior de São Paulo.
          </p>
          <p className={styles.just}>
            Desde <strong>1998</strong>, somos <strong>Representante e Distribuidor Autorizado</strong> direto da <strong>MMC Metal do Brasil</strong>, subsidiária da Mitsubishi Materials (Japão) — uma relação comercial contínua de mais de 25 anos.
          </p>

          <h2 className={styles.sectionSubtitle}>Equipe e Atendimento</h2>
          <p className={styles.just}>
            Contamos com uma equipe de técnicos treinados pelo Departamento Técnico da MMC Metal do Brasil, preparada para oferecer suporte comercial e orientação técnica na seleção de ferramentas e otimização de processos de usinagem.
          </p>

          <div className={styles.missionBlock}>
            <p className={styles.missionTitle}>Nossa Proposta</p>
            <p className={styles.just}>
              {institucional.propostaDeValor}
            </p>
          </div>

          {/* Bloco de prova local */}
          <h2 className={styles.sectionSubtitle}>Onde Estamos</h2>
          <div className={styles.contactBlock}>
            <p className={styles.just}>
              <MapPin size={16} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />
              <strong>{contato.endereco.completo}</strong>
            </p>
            <p className={styles.just}>
              <Phone size={16} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />
              <a href={contato.telefone.href}>{contato.telefone.display}</a>
            </p>
            <p className={styles.just}>
              <Mail size={16} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />
              <a href={contato.email.href}>{contato.email.display}</a>
            </p>
          </div>

          {/* Fornecedores parceiros */}
          <h2 className={styles.sectionSubtitle}>Nossos Fornecedores</h2>
          <p className={styles.just}>
            A RECOM conecta clientes industriais a marcas reconhecidas no mercado de ferramentas de corte:
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'center', margin: '1rem 0 2rem' }}>
            {fornecedores.map(f => (
              <Link to={`/fornecedores-catalogos/${f.slug}`} key={f.id} style={{ textDecoration: 'none' }}>
                <img src={f.logo} alt={f.altText} style={{ height: '48px', objectFit: 'contain', filter: 'grayscale(20%)', transition: 'filter 0.2s' }} />
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div style={{ textAlign: 'center', margin: '2rem 0' }}>
            <Link to="/contato" className={styles.ctaButton || ''} style={{
              display: 'inline-block',
              padding: '0.875rem 2rem',
              background: 'var(--accent-blue, #1a3a5c)',
              color: '#fff',
              textDecoration: 'none',
              borderRadius: '6px',
              fontWeight: 600,
              fontSize: '0.9375rem',
              transition: 'background 0.2s',
            }}>
              Fale com a RECOM <ArrowRight size={16} style={{ verticalAlign: 'middle', marginLeft: '0.5rem' }} />
            </Link>
          </div>
        </div>
        <div className={styles.clear}></div>
      </div>
    </Layout>
  );
};

export default ARecom;
