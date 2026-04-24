import React from 'react';
import styles from './CTASection.module.css';

const CTASection = ({
  actions,
  children,
  className = '',
  eyebrow,
  tone = 'light',
  title,
}) => (
  <section className={[styles.cta, styles[tone] || styles.light, className].filter(Boolean).join(' ')}>
    {eyebrow ? <span className={styles.eyebrow}>{eyebrow}</span> : null}
    {title ? <h2 className={styles.title}>{title}</h2> : null}
    {children ? <div className={styles.content}>{children}</div> : null}
    {actions ? <div className={styles.actions}>{actions}</div> : null}
  </section>
);

export default CTASection;
