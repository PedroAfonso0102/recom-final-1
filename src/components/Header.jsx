import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/images/optimized/logo-sem-fundo.png';
import { contato } from '../data/contato';
import { trackLeadGen } from '../utils/analytics';
import { recomStyleHooks } from '../styles/recom/styleRegistry';

const navItems = [
  { to: '/', label: 'Início', end: true },
  { to: '/a-recom', label: 'A RECOM' },
  { to: '/fornecedores-catalogos', label: 'Fornecedores e Catálogos' },
  { to: '/solucoes', label: 'Soluções por processo' },
  { to: '/promocoes', label: 'Promoções' },
  { to: '/contato', label: 'Contato' },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      data-recom-component={recomStyleHooks.components.siteHeader}
      data-recom-section={recomStyleHooks.sections.globalHeader}
    >
      <div className="header-bar" data-recom-component="header-bar">
        <Link
          to="/"
          aria-label="RECOM Metal Duro - Início"
          data-recom-element={recomStyleHooks.elements.brandLink}
          data-recom-track="home-logo-click"
        >
          <img
            src={logo}
            alt="RECOM Metal Duro"
            width="200"
            decoding="async"
            data-recom-component={recomStyleHooks.components.logo}
            data-recom-element={recomStyleHooks.elements.cardImage}
          />
        </Link>
        <p data-recom-element={recomStyleHooks.elements.body}>
          <a
            href={contato.telefone.href}
            onClick={() => trackLeadGen('phone', 'Header')}
            data-recom-component={recomStyleHooks.components.textLink}
            data-recom-role={recomStyleHooks.roles.contactPhoneClick}
            data-recom-track={recomStyleHooks.track.contactPhoneClick}
          >
            {contato.telefone.display}
          </a>
          {' | '}
          <a
            href={contato.email.href}
            onClick={() => trackLeadGen('email', 'Header')}
            data-recom-component={recomStyleHooks.components.textLink}
            data-recom-role={recomStyleHooks.roles.contactEmailClick}
            data-recom-track={recomStyleHooks.track.contactEmailClick}
          >
            {contato.email.display}
          </a>
        </p>
        <button
          type="button"
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          onClick={() => setMenuOpen((current) => !current)}
          data-recom-component={recomStyleHooks.components.button}
          data-recom-variant={recomStyleHooks.variants.tertiary}
          data-recom-role={recomStyleHooks.roles.menuToggle}
          data-recom-state={menuOpen ? recomStyleHooks.states.open : recomStyleHooks.states.closed}
        >
          {menuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
        </button>
      </div>

      <nav
        id="main-navigation"
        className={menuOpen ? 'site-nav site-nav-open' : 'site-nav'}
        aria-label="Navegação principal"
        data-recom-component={recomStyleHooks.components.navMenu}
        data-recom-state={menuOpen ? recomStyleHooks.states.open : recomStyleHooks.states.closed}
      >
        <ul className="flex" data-recom-element={recomStyleHooks.elements.navList}>
          {navItems.map((item) => (
            <li key={item.to} data-recom-element={recomStyleHooks.elements.navItem}>
              <NavLink
                to={item.to}
                end={item.end}
                onClick={() => setMenuOpen(false)}
                data-recom-component={recomStyleHooks.components.textLink}
                data-recom-variant={recomStyleHooks.variants.inline}
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

