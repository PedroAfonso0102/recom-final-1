import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from '../pages/Page.module.css';

const ProductSidebar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? styles.active : '';
  };

  return (
    <ul className={styles.menuLateral}>
      <li className={`${styles.produto} ${isActive('/produtos')}`}>
        <Link to="/produtos">O que é Metal Duro?</Link>
      </li>
      <li className={`${styles.produto} ${isActive('/sugestoes-de-utilizacao')}`}>
        <Link to="/sugestoes-de-utilizacao">Sugestões de Utilização</Link>
      </li>
      <li className={`${styles.produto} ${isActive('/seguranca')}`}>
        <Link to="/seguranca">Segurança nas Ferramentas</Link>
      </li>
      <li className={`${styles.produto} ${isActive('/torneamento')}`}>
        <Link to="/torneamento">Torneamento</Link>
      </li>
      <li className={`${styles.produto} ${isActive('/fresamento')}`}>
        <Link to="/fresamento">Fresamento</Link>
      </li>
      <li className={`${styles.produto} ${isActive('/furacao')}`}>
        <Link to="/furacao">Furação</Link>
      </li>
      <li className={`${styles.produto} ${isActive('/videos')}`}>
        <Link to="/videos">Vídeos</Link>
      </li>
    </ul>
  );
};

export default ProductSidebar;
