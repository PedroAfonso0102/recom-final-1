import React from 'react';
import Card from './Card';
import styles from './EmptyState.module.css';

const EmptyState = ({ actions, children, className = '', eyebrow, title }) => (
  <Card as="section" className={[styles.emptyState, className].filter(Boolean).join(' ')}>
    {eyebrow ? <span className={styles.eyebrow}>{eyebrow}</span> : null}
    {title ? <h2 className={styles.title}>{title}</h2> : null}
    {children ? <div className={styles.content}>{children}</div> : null}
    {actions ? <div className={styles.actions}>{actions}</div> : null}
  </Card>
);

export default EmptyState;
