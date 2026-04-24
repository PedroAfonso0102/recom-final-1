import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Mail, Menu, MessageCircle, Phone, X } from 'lucide-react';
import ActionButton from './ActionButton';
import styles from './Header.module.css';
import logo from '../assets/images/optimized/logo-sem-fundo.png';
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
  const [isVisible, setIsVisible] = useState(true);
  const menuButtonRef = useRef(null);
  const lastScrollYRef = useRef(0);
  const isVisibleRef = useRef(true);
  const menuOpenRef = useRef(false);
  const scrollRafRef = useRef(0);

  const toggleMenu = () => {
    setMenuOpen((current) => !current);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    menuOpenRef.current = menuOpen;
    isVisibleRef.current = isVisible;
  }, [menuOpen, isVisible]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (menuOpenRef.current && e.key === 'Escape') {
        closeMenu();
        menuButtonRef.current?.focus();
      }
    };

    const handleScroll = () => {
      if (scrollRafRef.current) {
        return;
      }

      scrollRafRef.current = window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const previousScrollY = lastScrollYRef.current;
        const threshold = 50;

        if (currentScrollY < 50 || menuOpenRef.current) {
          if (!isVisibleRef.current) {
            isVisibleRef.current = true;
            setIsVisible(true);
          }
          lastScrollYRef.current = currentScrollY;
          scrollRafRef.current = 0;
          return;
        }

        const diff = currentScrollY - previousScrollY;
        let nextVisible = isVisibleRef.current;

        if (diff > 0 && currentScrollY > 100) {
          nextVisible = false;
        } else if (diff < -threshold) {
          nextVisible = true;
        }

        if (nextVisible !== isVisibleRef.current) {
          isVisibleRef.current = nextVisible;
          setIsVisible(nextVisible);
        }

        if (diff > 0 || diff < -threshold) {
          lastScrollYRef.current = currentScrollY;
        }

        scrollRafRef.current = 0;
      });
    };

    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('scroll', handleScroll);
      if (scrollRafRef.current) {
        window.cancelAnimationFrame(scrollRafRef.current);
      }
    };
  }, []);

  return (
    <header className={`${styles.header} ${!isVisible && !menuOpen ? styles.headerHidden : ''}`}>
      <div className={styles.topBar}>
        <Link to="/" className={styles.brand} onClick={closeMenu} aria-label="RECOM Metal Duro - Início">
          <img
            src={logo}
            alt="RECOM Metal Duro"
            className="res-img-logo"
            width="640"
            height="357"
            decoding="async"
          />
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
            ref={menuButtonRef}
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
        aria-hidden={!menuOpen}
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
