import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import logo from '../assets/images/Upscaled/logo-sem-fundo.png';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <div className={styles.topHeader}>
        <div className={styles.headerLogo}>
          <Link to="/">
            <img src={logo} alt="RECOM Metal Duro" className="res-img-logo" />
          </Link>
        </div>

        <div className={styles.utilityNav}>
          <span className={styles.utilityItem}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            (19) 3229-6767
          </span>
          <span className={styles.utilityItem}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            <a href="mailto:vendas@recommetalduro.com.br" className={styles.mailLink}>vendas@recommetalduro.com.br</a>
          </span>
        </div>

        <button
          className={styles.mobileMenuToggle}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}></span>
        </button>
      </div>

      <ul className={`${styles.headerMenu} ${menuOpen ? styles.menuOpen : ''}`}>
        <div className={styles.menuCenter}>
          <li className={styles.first}>
            <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link> <span className={styles.legend}>Inicio</span>
          </li>
          <li>
            <Link to="/a-recom" onClick={() => setMenuOpen(false)}>A RECOM</Link> <span className={styles.legend}>Sobre nós</span>
          </li>
          <li>
            <Link to="/fornecedores-catalogos" onClick={() => setMenuOpen(false)}>Fornecedores & Catálogos</Link> <span className={styles.legend}>Conteúdo técnico</span>
          </li>
          <li>
            <Link to="/solucoes" onClick={() => setMenuOpen(false)}>Soluções / Processos</Link> <span className={styles.legend}>Linha de produtos</span>
          </li>
          <li>
            <Link to="/promocoes" onClick={() => setMenuOpen(false)}>Promoções</Link> <span className={styles.legend}>Preços especiais</span>
          </li>
          <li className={styles.last}>
            <Link to="/contato" onClick={() => setMenuOpen(false)}>Contato</Link> <span className={styles.legend}>Fale conosco</span>
          </li>
        </div>
      </ul>
    </>
  );
};

export { Header };
