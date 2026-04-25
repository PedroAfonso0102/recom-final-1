import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.css';
import logo from '../assets/images/Upscaled/logo-sem-fundo.png';
import { contato } from '../data/contato';
import { trackLeadGen } from '../utils/analytics';

/**
 * Header — Navegação principal.
 * Etapa 2: Menu: Início, A RECOM, Fornecedores & Catálogos, Soluções / Processos, Promoções, Contato / Orçamento
 * Etapa 3: tom profissional, telefone e email visíveis
 */
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <div className={styles.topHeader}>
        <div className={styles.headerLogo}>
          <Link to="/" onClick={closeMenu}>
            <img src={logo} alt="RECOM Metal Duro — Distribuidor B2B de ferramentas para usinagem" className="res-img-logo" />
          </Link>
        </div>

        <div className={styles.utilityNav}>
          <span className={styles.utilityItem}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            <a href={contato.telefone.href} className={styles.phoneLink} onClick={() => trackLeadGen('phone')}>{contato.telefone.display}</a>
          </span>
          <span className={styles.utilityItem}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            <a href={contato.email.href} className={styles.mailLink} onClick={() => trackLeadGen('email')}>{contato.email.display}</a>
          </span>
        </div>

        <button
          className={styles.mobileMenuToggle}
          onClick={toggleMenu}
          aria-label="Abrir menu de navegação"
          aria-expanded={menuOpen}
        >
          <span className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}></span>
        </button>
      </div>

      <nav aria-label="Navegação principal">
        <ul className={`${styles.headerMenu} ${menuOpen ? styles.menuOpen : ''}`}>
          <div className={styles.menuCenter}>
            <li className={`${styles.first} ${isActive('/') && location.pathname === '/' ? styles.activeLink : ''}`}>
              <Link to="/" onClick={closeMenu}>Início</Link>
            </li>
            <li className={isActive('/a-recom') ? styles.activeLink : ''}>
              <Link to="/a-recom" onClick={closeMenu}>A RECOM</Link>
            </li>
            <li className={isActive('/fornecedores-catalogos') ? styles.activeLink : ''}>
              <Link to="/fornecedores-catalogos" onClick={closeMenu}>Fornecedores & Catálogos</Link>
            </li>
            <li className={isActive('/solucoes') ? styles.activeLink : ''}>
              <Link to="/solucoes" onClick={closeMenu}>Soluções / Processos</Link>
            </li>
            <li className={isActive('/promocoes') ? styles.activeLink : ''}>
              <Link to="/promocoes" onClick={closeMenu}>Promoções</Link>
            </li>
            <li className={`${styles.last} ${isActive('/contato') ? styles.activeLink : ''}`}>
              <Link to="/contato" onClick={closeMenu}>Contato / Orçamento</Link>
            </li>
          </div>
        </ul>
      </nav>
    </>
  );
};

export default Header;
