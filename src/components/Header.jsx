import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Mail, Menu, MessageCircle, Phone, X } from 'lucide-react';
import ActionButton from './ActionButton';
import styles from './Header.module.css';
import logo from '../assets/images/Upscaled/logo-sem-fundo.png';
import { contato } from '../data/contato';
import { trackLeadGen } from '../utils/analytics';

const navItems = [
  { to: '/', label: 'Início', end: true },
  { to: '/a-recom', label: 'A RECOM' },
  { to: '/fornecedores-catalogos', label: 'Fornecedores e Catálogos' },
  { to: '/solucoes', label: 'Soluções' },
  { to: '/promocoes', label: 'Promoções' },
  { to: '/contato', label: 'Contato' },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((current) => !current);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        <Link to="/" className={styles.brand} onClick={closeMenu} aria-label="RECOM Metal Duro - Início">
          <img src={logo} alt="RECOM Metal Duro" className="res-img-logo" />
        </Link>

        <div className={styles.utilityNav}>
          <a
            href={contato.telefone.href}
            className={styles.utilityLink}
            onClick={() => trackLeadGen('phone', 'Header')}
          >
            <Phone size={14} />
            <span>{contato.telefone.display}</span>
          </a>
          <a
            href={contato.email.href}
            className={styles.utilityLink}
            onClick={() => trackLeadGen('email', 'Header')}
          >
            <Mail size={14} />
            <span>{contato.email.display}</span>
          </a>
          <ActionButton to="/contato" variant="primary" compact onClick={closeMenu}>
            Solicitar orçamento
          </ActionButton>
        </div>

        <div className={styles.mobileActions}>
          <ActionButton
            href={contato.whatsapp.hrefComMensagem}
            variant="whatsapp"
            compact
            target="_blank"
            onClick={() => trackLeadGen('whatsapp', 'Header Mobile')}
          >
            <MessageCircle size={16} />
            <span>WhatsApp</span>
          </ActionButton>
          <button
            type="button"
            className={styles.menuButton}
            onClick={toggleMenu}
            aria-label={menuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <nav
        id="primary-navigation"
        className={`${styles.navBar} ${menuOpen ? styles.navOpen : ''}`}
        aria-label="Navegação principal"
      >
        <ul className={styles.navList}>
          {navItems.map((item) => (
            <li key={item.to} className={styles.navItem}>
              <NavLink
                to={item.to}
                end={item.end}
                className={({ isActive }) => `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
                onClick={closeMenu}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
