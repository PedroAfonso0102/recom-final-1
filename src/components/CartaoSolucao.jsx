import React from 'react';
import styles from './CartaoSolucao.module.css';

export const CartaoSolucao = ({ solucao }) => {
  const { titulo, descricaoCurta, imagem, slug } = solucao;

  return (
    <div className={styles.solutionCard}>
      <div className={styles.imageWrapper}>
        {imagem ? (
          <img src={imagem} alt={titulo} className={styles.image} />
        ) : (
          <div className={styles.placeholder}>RECOM</div>
        )}
      </div>

      <div className={styles.info}>
        <h3 className={styles.title}>{titulo}</h3>
        <p className={styles.description}>{descricaoCurta}</p>

        <div className={styles.footer}>
          <a
            href={`#/solucoes/${slug}`}
            className={styles.actionBtn}
          >
            Ver Solução
          </a>
        </div>
      </div>
    </div>
  );
};
