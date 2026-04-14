import React from 'react';

/**
 * Componente BrandLogo SVG
 */
export const BrandLogo = ({ variant = 'default', className = '', ...props }) => {
  const colors = {
    primary: '#000000',
    white: '#FFFFFF',
    blue: '#004A99',
  };
  const isDark = variant === 'white' || variant === 'footer';
  const mainColor = isDark ? colors.white : colors.primary;
  return (
    <svg viewBox="0 0 320 80" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <path d="M10 20 H30 V60 H10 Z m5 5 h10 v30 h-10 Z" fill={colors.blue} />
      <text x="45" y="58" fontFamily="var(--font-ui), Arial, sans-serif" fontWeight="800" fontSize="48" fill={mainColor} style={{ letterSpacing: '-0.02em' }}>RECOM</text>
      <text x="46" y="72" fontFamily="var(--font-ui), sans-serif" fontWeight="400" fontSize="12" fill={isDark ? 'rgba(255,255,255,0.7)' : colors.blue} style={{ letterSpacing: '0.1em', textTransform: 'uppercase' }}>Metal Duro</text>
    </svg>
  );
};
