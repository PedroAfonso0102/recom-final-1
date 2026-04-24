import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ActionButton.module.css';

const ActionButton = ({
  children,
  className = '',
  disabled = false,
  compact = false,
  href,
  onClick,
  rel,
  stackOnMobile = false,
  target,
  to,
  type = 'button',
  variant = 'primary',
  title,
  ariaLabel,
  ...rest
}) => {
  const classes = [
    styles.button,
    styles[variant] || styles.primary,
    compact ? styles.compact : '',
    stackOnMobile ? styles.stackOnMobile : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const sharedProps = {
    className: classes,
    onClick,
    title,
    'aria-label': ariaLabel,
    ...rest,
  };

  if (to) {
    return (
      <Link to={to} {...sharedProps}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel || (target === '_blank' ? 'noopener noreferrer' : undefined)}
        {...sharedProps}
      >
        {children}
      </a>
    );
  }

  return (
    <button type={type} disabled={disabled} {...sharedProps}>
      {children}
    </button>
  );
};

export default ActionButton;
