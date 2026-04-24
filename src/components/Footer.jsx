import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import styles from './Footer.module.css';
import logo from '../assets/images/Upscaled/logo-branco.png';
import { contato, institucional } from '../data/contato';
import { fornecedores } from '../data/fornecedores';

/**
 * Footer â€” Rodapé institucional.
 * Etapa 2: "institucional, fornecedores, processos, contato completo"
 * Etapa 5: "CTA persistente para contato, links de recuperação"
 */
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerGrid}>
        {/* Col 1: Institucional */}
        <div className={styles.footerCol}>
          <div className={styles.footerLogo}>
            <img src={logo} alt="RECOM Metal Duro" />
          </div>
          <p className={styles.footerText}>
            {institucional.descricaoFooter}
          </p>
          <div className={styles.footerCta}>
            <Link to="/contato" className={styles.footerBtn}>Solicitar Orçamento</Link>
          </div>
        </div>

        {/* Col 2: Fornecedores & Catálogos */}
        <div className={styles.footerCol}>
          <h4 className={styles.footerTitle}>Fornecedores</h4>
          <ul className={styles.footerLinks}>
            <li><Link to="/fornecedores-catalogos">Todos os Fornecedores</Link></li>
            {fornecedores.map(f => (
              <li key={f.id}>
                <Link to={`/fornecedores-catalogos/${f.slug}`}>{f.nome}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Soluções / Processos */}
        <div className={styles.footerCol}>
          <h4 className={styles.footerTitle}>Soluções</h4>
          <ul className={styles.footerLinks}>
            <li><Link to="/solucoes">Todos os Processos</Link></li>
            <li><Link to="/solucoes/torneamento">Torneamento</Link></li>
            <li><Link to="/solucoes/fresamento">Fresamento</Link></li>
            <li><Link to="/solucoes/furacao">Furação</Link></li>
          </ul>
          <h4 className={styles.footerTitle} style={{ marginTop: '1.25rem' }}>Empresa</h4>
          <ul className={styles.footerLinks}>
            <li><Link to="/a-recom">A RECOM</Link></li>
            <li><Link to="/promocoes">Promoções</Link></li>
          </ul>
        </div>

        {/* Col 4: Atendimento completo */}
        <div className={styles.footerCol}>
          <h4 className={styles.footerTitle}>Atendimento</h4>
          <ul className={styles.footerContact}>
            <li>
              <MapPin size={16} className={styles.contactIcon} />
              <span>{contato.endereco.completo}</span>
            </li>
            <li>
              <Phone size={16} className={styles.contactIcon} />
              <a href={contato.telefone.href} className={styles.phoneLink}>{contato.telefone.display}</a>
            </li>
            <li>
              <Mail size={16} className={styles.contactIcon} />
              <a href={contato.email.href} className={styles.emailLink}>{contato.email.display}</a>
            </li>
          </ul>
          <div className={styles.footerActions}>
             <a href={contato.whatsapp.href} target="_blank" rel="noopener noreferrer" className={styles.whatsappBtn}>
                <MessageCircle size={18} />
                Falar com Especialista
             </a>
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <div className={styles.footerBottomContent}>
          <p>© {new Date().getFullYear()} {contato.empresa} — Todos os direitos reservados.</p>
          <div className={styles.footerBottomLinks}>
            <Link to="/seguranca">Segurança nas Ferramentas</Link>
            <span>|</span>
            <Link to="/sugestoes-de-utilizacao">Sugestões de Utilização</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
