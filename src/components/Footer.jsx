import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import logo from '../assets/images/Upscaled/logo-branco.png';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerGrid}>
        <div className={styles.footerCol}>
          <div className={styles.footerLogo}>
            <img src={logo} alt="RECOM Metal Duro" className="res-img-logo" />
          </div>
          <p className={styles.footerText}>
            Distribuidor técnico autorizado Mitsubishi Materials desde 1990.
            Soluções em ferramentas de corte para a indústria metalúrgica.
          </p>
        </div>
        <div className={styles.footerCol}>
          <h4 className={styles.footerTitle}>Navegação</h4>
          <ul className={styles.footerLinks}>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/empresa">A Empresa</Link></li>
            <li><Link to="/produtos">Produtos</Link></li>
            <li><Link to="/catalogo">Catálogo</Link></li>
            <li><Link to="/promocoes">Promoções</Link></li>
          </ul>
        </div>
        <div className={styles.footerCol}>
          <h4 className={styles.footerTitle}>Contato</h4>
          <ul className={styles.footerContact}>
            <li>Rua Alferes João José, 350</li>
            <li>Jardim Chapadão — Campinas/SP</li>
            <li>CEP 13070-188</li>
            <li className={styles.footerPhone}>
              <a href="tel:+551932332224">(19) 3233-2224</a>
            </li>
            <li className={styles.footerEmail}>
              <a href="mailto:vendas.recom@montelione.com.br">vendas.recom@montelione.com.br</a>
            </li>
          </ul>
          <div className={styles.footerActions}>
             <a href="https://wa.me/551932332224" target="_blank" rel="noopener noreferrer" className={styles.whatsappBtn}>
                Falar pelo WhatsApp
             </a>
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        © {new Date().getFullYear()} RECOM Metal Duro — Todos os direitos reservados.
      </div>
    </footer>
  );
};

export default Footer;
