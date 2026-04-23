import React from 'react';
import styles from './CartaoFornecedor.module.css';

const _rotulosIso = {
  P: 'Aços',
  M: 'Aços Inoxidáveis',
  K: 'Ferros Fundidos',
  N: 'Metais Não Ferrosos',
  S: 'Superligas Termorresistentes',
  H: 'Materiais Endurecidos'
};

const _MAPA_ISO = {
  P: styles.isoP,
  M: styles.isoM,
  K: styles.isoK,
  N: styles.isoN,
  S: styles.isoS,
  H: styles.isoH
};

export const CartaoFornecedor = ({ fornecedor }) => {
  const { nome, descricaoCurta, logo, slug } = fornecedor;

  return (
    <div className={styles.productCard}>
      <div className={styles.productImageWrapper}>
        {logo ? (
          <img src={logo} alt={nome} className={styles.productImage} />
        ) : (
          <div className={styles.productImagePlaceholder}>RECOM</div>
        )}
      </div>

      <div className={styles.productInfo}>
        <h3 className={styles.productTitle}>{nome}</h3>
        <p className={styles.productDescription}>{descricaoCurta}</p>

        <div className={styles.productFooter}>
          <a
            href={`#/fornecedores-catalogos/${slug}`}
            className={styles.actionBtn}
          >
            Ver Detalhes
          </a>
        </div>
      </div>
    </div>
  );
};
