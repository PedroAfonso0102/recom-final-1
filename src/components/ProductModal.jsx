import React from 'react';
import styles from './ProductModal.module.css';
import { X, ShoppingCart, MessageSquare, ShieldCheck } from 'lucide-react';

const ProductModal = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>
          <X size={24} />
        </button>

        <div className={styles.content}>
          <div className={styles.imageSection}>
            <div className={styles.technicalImage}>
              <span>{product.brand}</span>
              <div className={styles.productCode}>{product.title.split(' ').pop()}</div>
            </div>
          </div>

          <div className={styles.infoSection}>
            <span className={styles.brandTag}>{product.brand}</span>
            <h2 className={styles.title}>{product.title}</h2>
            
            <div className={styles.specs}>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Categoria</span>
                <span className={styles.specValue}>{product.category}</span>
              </div>
              {product.diameter && (
                <div className={styles.specItem}>
                  <span className={styles.specLabel}>Diâmetro</span>
                  <span className={styles.specValue}>Ø {product.diameter}mm</span>
                </div>
              )}
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Normas ISO</span>
                <div className={styles.isoList}>
                  {product.iso.map(iso => (
                    <span key={iso} className={styles.isoBadge}>{iso}</span>
                  ))}
                </div>
              </div>
            </div>

            <p className={styles.description}>
              Ferramenta de alta performance projetada para máxima eficiência em fluxos industriais. 
              Sinterizada com as mais avançadas técnicas de tratamento de superfície para garantir 
              durabilidade e acabamento superior na peça final.
            </p>

            <div className={styles.pricingSection}>
              <div className={styles.priceContainer}>
                <span className={styles.priceLabel}>Preço Sugerido</span>
                <span className={styles.price}>R$ {product.price.toFixed(2).replace('.', ',')}</span>
              </div>
              <div className={styles.stockStatus}>
                <ShieldCheck size={16} className={styles.shieldIcon} />
                Disponível para entrega imediata
              </div>
            </div>

            <div className={styles.actions}>
              <button className={styles.primaryAction} onClick={() => window.location.href='/contato'}>
                <MessageSquare size={18} />
                Solicitar Cotação
              </button>
              <button className={styles.secondaryAction}>
                <ShoppingCart size={18} />
                Adicionar ao Orçamento
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
