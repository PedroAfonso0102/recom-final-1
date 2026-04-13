import React from 'react';

/**
 * BrandLogo SVG Component
 * Implementation of RECOM identification using paths for absolute sharpness (aliasing prevention).
 * Supports light/dark variations and fluid scaling.
 */
const BrandLogo = ({ variant = 'default', className = '', ...props }) => {
  // Color configuration based on the Swiss Modern Industrial Palette
  const colors = {
    primary: '#000000', // Solid Black
    white: '#FFFFFF',
    blue: '#004A99',    // Technical Blueprint Blue
  };

  const isDark = variant === 'white' || variant === 'footer';
  const mainColor = isDark ? colors.white : colors.primary;

  return (
    <svg 
      viewBox="0 0 320 80"
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg" 
      className={className} 
      {...props}
    >
      {/* RECOM Symbol / Icon */}
      <path 
        d="M10 20 H30 V60 H10 Z m5 5 h10 v30 h-10 Z" 
        fill={colors.blue}
      />
      {/* Tipografia RECOM (Simplified paths for the purpose of the MVP) */}
      <text 
        x="45" 
        y="58" 
        fontFamily="var(--font-ui), Arial, sans-serif" 
        fontWeight="800" 
        fontSize="48" 
        fill={mainColor}
        style={{ letterSpacing: '-0.02em' }}
      >
        RECOM
      </text>
      {/* Subtitle / Tagline */}
      <text 
        x="46" 
        y="72" 
        fontFamily="var(--font-ui), sans-serif" 
        fontWeight="400" 
        fontSize="12" 
        fill={isDark ? 'rgba(255,255,255,0.7)' : colors.blue}
        style={{ letterSpacing: '0.1em', textTransform: 'uppercase' }}
      >
        Metal Duro
      </text>
    </svg>
  );
};

export default BrandLogo;
