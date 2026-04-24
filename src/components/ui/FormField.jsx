import React from 'react';
import styles from './FormField.module.css';

const FormField = ({
  children,
  className = '',
  error,
  helper,
  id,
  label,
  required = false,
}) => {
  const errorId = error ? `${id}-error` : undefined;
  const helperId = helper ? `${id}-hint` : undefined;
  const describedBy = [errorId, helperId].filter(Boolean).join(' ') || undefined;

  const control = React.isValidElement(children)
    ? React.cloneElement(children, {
        'aria-describedby': describedBy,
        'aria-invalid': error ? 'true' : children.props['aria-invalid'],
        'aria-required': required ? 'true' : children.props['aria-required'],
        required: required || children.props.required,
      })
    : children;

  return (
    <div className={[styles.field, className].filter(Boolean).join(' ')}>
      {label ? (
        <label className={styles.label} htmlFor={id}>
          {label}
          {required ? <span aria-hidden="true"> *</span> : null}
        </label>
      ) : null}
      {control}
      {error ? (
        <span id={errorId} className={styles.error} role="alert">
          {error}
        </span>
      ) : null}
      {helper ? (
        <p id={helperId} className={styles.helper}>
          {helper}
        </p>
      ) : null}
    </div>
  );
};

export default FormField;
