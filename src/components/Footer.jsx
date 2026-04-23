import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, MessageCircle, ExternalLink } from 'lucide-react';
import styles from './Footer.module.css';
import logo from '../assets/images/Upscaled/logo-branco.png';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerGrid}>
        <div className={styles.footerCol}>
          <div className={styles.footerLogo}>
            <img src={logo} alt="RECOM Metal Duro" />
          </div>
          <p className={styles.footerText}>
            Distribuidor técnico autorizado Mitsubishi Materials desde 1990.
            Especialistas em processos de usinagem e ferramentas de alta performance.
          </p>
          <div className={styles.footerCta}>
            <Link to="/contato" className={styles.footerBtn}>Solicitar Orçamento</Link>
          </div>
        </div>

        <div className={styles.footerCol}>
          <h4 className={styles.footerTitle}>Soluções</h4>
          <ul className={styles.footerLinks}>
            <li><Link to="/fornecedores-catalogos">Fornecedores</Link></li>
            <li><Link to="/torneamento">Torneamento</Link></li>
            <li><Link to="/fresamento">Fresamento</Link></li>
            <li><Link to="/furacao">Furação</Link></li>
            <li><Link to="/solucoes">Catálogos Técnicos</Link></li>
          </ul>
        </div>

        <div className={styles.footerCol}>
          <h4 className={styles.footerTitle}>Empresa</h4>
          <ul className={styles.footerLinks}>
            <li><Link to="/a-recom">A RECOM</Link></li>
            <li><Link to="/promocoes">Promoções</Link></li>
            <li><Link to="/videos">Vídeos Técnicos</Link></li>
            <li><Link to="/contato">Contato</Link></li>
          </ul>
        </div>

        <div className={styles.footerCol}>
          <h4 className={styles.footerTitle}>Atendimento</h4>
          <ul className={styles.footerContact}>
            <li>
              <MapPin size={16} className={styles.contactIcon} />
              <span>Rua Alferes João José, 350, Campinas/SP</span>
            </li>
            <li>
              <Phone size={16} className={styles.contactIcon} />
              <a href="tel:+551932332224" className={styles.phoneLink}>(19) 3229-6767</a>
            </li>
            <li>
              <Mail size={16} className={styles.contactIcon} />
              <a href="mailto:vendas@recommetalduro.com.br" className={styles.emailLink}>vendas@recommetalduro.com.br</a>
            </li>
          </ul>
          <div className={styles.footerActions}>
             <a href="https://wa.me/551932332224" target="_blank" rel="noopener noreferrer" className={styles.whatsappBtn}>
                <MessageCircle size={18} />
                Falar com Especialista
             </a>
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <div className={styles.footerBottomContent}>
          <p>© {new Date().getFullYear()} RECOM Metal Duro — Todos os direitos reservados.</p>
          <div className={styles.footerBottomLinks}>
            <Link to="/seguranca">Política de Privacidade</Link>
            <span>|</span>
            <Link to="/sugestoes-de-utilizacao">Termos de Uso</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
