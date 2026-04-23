import React from 'react';
import { Link } from 'react-router-dom';
import styles from './FornecedorCard.module.css';

const FornecedorCard = ({ fornecedor }) => {
  return (
    <article className={styles.card}>
      <div className={styles.logoWrapper}>
        <img src={`/recom-final-1/assets/images/${fornecedor.logo}`} alt={`Logo da ${fornecedor.nome}`} className="res-img-logo" loading="lazy" />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{fornecedor.nome}</h3>
        <p className={styles.description}>{fornecedor.descricaoCurta}</p>
        <div className={styles.actions}>
          <Link to={`/fornecedores-catalogos/${fornecedor.id}`} className={styles.btnSecondary}>Ver Detalhes</Link>
          <a href={fornecedor.catalogoUrl} target="_blank" rel="noopener noreferrer" className={styles.btnPrimary}>Catálogo Oficial</a>
        </div>
      </div>
    </article>
  );
};

export { FornecedorCard };
