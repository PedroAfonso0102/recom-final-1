import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Card.module.css';

const Card = ({
  as,
  children,
  className = '',
  elevated = false,
  href,
  interactive = false,
  rel,
  target,
  to,
  variant = 'default',
  ...props
}) => {
  const Component = to ? Link : href ? 'a' : as || 'article';
  const classes = [
    styles.card,
    styles[variant] || styles.default,
    elevated ? styles.elevated : '',
    interactive || to || href ? styles.interactive : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const linkProps = to
    ? { to }
    : href
      ? {
          href,
          target,
          rel: rel || (target === '_blank' ? 'noopener noreferrer' : undefined),
        }
      : {};

  return (
    <Component className={classes} {...linkProps} {...props}>
      {children}
    </Component>
  );
};

export default Card;
