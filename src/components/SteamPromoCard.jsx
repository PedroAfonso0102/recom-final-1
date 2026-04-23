import React, { useState, useRef, useEffect } from 'react';
import styles from './SteamPromoCard.module.css';

export const SteamPromoCard = ({
  title, 
  subtitle, 
  originalPrice, 
  discountPrice, 
  discountPercent,
  imageUrl,
  tag = 'PROMOÇÃO',
  features = [],
  ctaText = 'Solicitar Orçamento',
  ctaLink = '/contato'
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef(null);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsExpanded(true);
    }, 200);
  };

  const handleMouseLeave = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsExpanded(false);
    }, 300);
  };

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  return (
    <div 
      className={styles.cardWrapper}
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Compact Card */}
      <div className={styles.card}>
        <div className={styles.cardImageWrapper}>
          {imageUrl ? (
            <img src={imageUrl} alt={title} className={styles.cardImage} />
          ) : (
            <div className={styles.cardImagePlaceholder}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                <polyline points="3.3 7 12 12 20.7 7"/>
                <line x1="12" y1="22" x2="12" y2="12"/>
              </svg>
            </div>
          )}
          <span className={styles.tagBadge}>{tag}</span>
          {discountPercent && (
            <span className={styles.discountBadge}>-{discountPercent}%</span>
          )}
        </div>
        
        <div className={styles.cardBody}>
          <h3 className={styles.cardTitle}>{title}</h3>
          {subtitle && <p className={styles.cardSubtitle}>{subtitle}</p>}
          
          <div className={styles.priceRow}>
            {originalPrice && (
              <span className={styles.originalPrice}>R$ {originalPrice}</span>
            )}
            {discountPrice && (
              <span className={styles.discountPrice}>R$ {discountPrice}</span>
            )}
          </div>
        </div>
      </div>

      {/* Expanded Popup */}
      <div className={`${styles.popup} ${isExpanded ? styles.popupVisible : ''}`}>
        <div className={styles.popupHeader}>
          <h3 className={styles.popupTitle}>{title}</h3>
          {subtitle && <p className={styles.popupSubtitle}>{subtitle}</p>}
        </div>
        
        <div className={styles.popupBody}>
          {features.length > 0 && (
            <ul className={styles.featureList}>
              {features.map((feature, i) => (
                <li key={i} className={styles.featureItem}>
                  <svg className={styles.checkIcon} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          )}

          <div className={styles.popupPriceBlock}>
            <div className={styles.popupPriceRow}>
              {originalPrice && (
                <span className={styles.popupOriginal}>De R$ {originalPrice}</span>
              )}
              {discountPrice && (
                <span className={styles.popupDiscount}>R$ {discountPrice}</span>
              )}
            </div>
            {discountPercent && (
              <span className={styles.popupSavings}>Economize {discountPercent}%</span>
            )}
          </div>

          <a href={ctaLink} className={styles.popupCta}>
            {ctaText}
          </a>
        </div>
      </div>
    </div>
  );
};

