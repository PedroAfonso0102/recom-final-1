import React from 'react';
import { ExternalLink as ExternalLinkIcon } from 'lucide-react';
import styles from './ExternalLink.module.css';

const ExternalLink = ({
  children,
  className = '',
  href,
  iconSize = 14,
  label,
  onClick,
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={[styles.externalLink, className].filter(Boolean).join(' ')}
    aria-label={label || `${children} (abre em nova aba)`}
    onClick={onClick}
  >
    <ExternalLinkIcon size={iconSize} aria-hidden="true" />
    {children}
  </a>
);

export default ExternalLink;
