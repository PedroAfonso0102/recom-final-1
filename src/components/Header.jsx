import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/images/optimized/logo-sem-fundo.png';
import { contato } from '../data/contato';
import { trackLeadGen } from '../utils/analytics';

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
    <header>
      <div className="header-bar">
        <Link to="/" aria-label="RECOM Metal Duro - Início">
          <img
            src={logo}
            alt="RECOM Metal Duro"
            width="200"
            decoding="async"
          />
        </Link>
        <p>
          <a href={contato.telefone.href} onClick={() => trackLeadGen('phone', 'Header')}>
            {contato.telefone.display}
          </a>
          {' | '}
          <a href={contato.email.href} onClick={() => trackLeadGen('email', 'Header')}>
            {contato.email.display}
          </a>
        </p>
        <button
          type="button"
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          onClick={() => setMenuOpen((current) => !current)}
        >
          {menuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
        </button>
      </div>

      <nav
        id="main-navigation"
        className={menuOpen ? 'site-nav site-nav-open' : 'site-nav'}
        aria-label="Navegação principal"
      >
        <ul className="flex">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.end}
                onClick={() => setMenuOpen(false)}
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

