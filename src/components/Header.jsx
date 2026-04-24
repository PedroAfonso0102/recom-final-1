import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/images/optimized/logo-sem-fundo.png';
import { contato } from '../data/contato';

const navItems = [
  { to: '/', label: 'Início', end: true },
  { to: '/a-recom', label: 'A RECOM' },
  { to: '/fornecedores-catalogos', label: 'Fornecedores e Catálogos' },
  { to: '/solucoes', label: 'Soluções' },
  { to: '/promocoes', label: 'Promoções' },
  { to: '/contato', label: 'Contato' },
];

const Header = () => {
  return (
    <header>
      <div>
        <Link to="/" aria-label="RECOM Metal Duro - Início">
          <img
            src={logo}
            alt="RECOM Metal Duro"
            width="200"
            decoding="async"
          />
        </Link>
        <p>
          {contato.telefone.display} | {contato.email.display}
        </p>
      </div>

      <nav aria-label="Navegação principal">
        <ul className="flex">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.end}
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

