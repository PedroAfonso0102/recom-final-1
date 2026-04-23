import React from 'react';
import styles from './CatalogCard.module.css';

const isoLabels = {
  P: 'Aços',
  M: 'Aços Inoxidáveis',
  K: 'Ferros Fundidos',
  N: 'Metais Não Ferrosos',
  S: 'Superligas Termorresistentes',
  H: 'Materiais Endurecidos'
};

const ISO_MAP = {
  P: styles.isoP,
  M: styles.isoM,
  K: styles.isoK,
  N: styles.isoN,
  S: styles.isoS,
  H: styles.isoH
};

const CatalogCard = ({ product, onOpenDetails }) => {
  const { title, brand, category, diameter, iso, price, imageUrl } = product;

  return (
    <div className={styles.productCard}>
      <div className={styles.productImageWrapper}>
        {imageUrl ? (
          <img src={imageUrl} alt={title} className={styles.productImage} />
        ) : (
          <div className={styles.productImagePlaceholder}>RECOM</div>
        )}
        
        {iso && iso.length > 0 && (
          <div className={styles.productIsoGroup}>
            {iso.map(isoTag => (
              <span 
                key={isoTag} 
                className={`${styles.isoTagSmall} ${ISO_MAP[isoTag]}`}
                data-label={isoLabels[isoTag]}
              >
                {isoTag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className={styles.productInfo}>
        <span className={styles.productBrand}>{brand}</span>
        <h3 className={styles.productTitle}>{title}</h3>
        
        <div className={styles.productMeta}>
          <span className={styles.productCategory}>{category}</span>
          {diameter && <span className={styles.productDiameter}>Ø {diameter}mm</span>}
        </div>

        <div className={styles.productFooter}>
          <span className={styles.productPrice}>
            R$ {price.toFixed(2).replace('.', ',')}
          </span>
          <button 
            className={styles.actionBtn} 
            onClick={() => onOpenDetails(product)}
          >
            Ver Mais
          </button>
        </div>
      </div>
    </div>
  );
};

export { CatalogCard };
