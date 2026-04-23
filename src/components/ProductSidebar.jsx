import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './ProductSidebar.module.css';

const PRODUCT_LINKS = [
  { path: '/produtos', label: 'O que é Metal Duro?' },
  { path: '/sugestoes-de-utilizacao', label: 'Sugestões de Utilização' },
  { path: '/seguranca', label: 'Segurança nas Ferramentas' },
  { path: '/torneamento', label: 'Torneamento' },
  { path: '/fresamento', label: 'Fresamento' },
  { path: '/furacao', label: 'Furação' },
  { path: '/videos', label: 'Vídeos' },
];

const ProductSidebar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? styles.active : '';
  };

  return (
    <ul className={styles.menuLateral}>
      {PRODUCT_LINKS.map((link) => (
        <li key={link.path} className={`${styles.produto} ${isActive(link.path)}`}>
          <Link to={link.path}>{link.label}</Link>
        </li>
      ))}
    </ul>
  );
};

export { ProductSidebar };
