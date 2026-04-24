import React from 'react';
import styles from './Notice.module.css';

const defaultRoleByVariant = {
  error: 'alert',
  success: 'status',
  warning: 'note',
  info: 'note',
};

const Notice = ({
  actions,
  children,
  className = '',
  icon,
  role,
  title,
  variant = 'info',
  ...props
}) => {
  const classes = [styles.notice, styles[variant] || styles.info, className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} role={role || defaultRoleByVariant[variant] || 'note'} {...props}>
      {icon ? <span className={styles.icon}>{icon}</span> : null}
      <div className={styles.body}>
        {title ? <p className={styles.title}>{title}</p> : null}
        {children ? <div className={styles.content}>{children}</div> : null}
        {actions ? <div className={styles.actions}>{actions}</div> : null}
      </div>
    </div>
  );
};

export default Notice;
