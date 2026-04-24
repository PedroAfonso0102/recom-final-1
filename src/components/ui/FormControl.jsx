import React from 'react';
import styles from './FormControl.module.css';

const joinClasses = (...classes) => classes.filter(Boolean).join(' ');

export const Input = React.forwardRef(function Input(
  { className = '', invalid = false, ...props },
  ref
) {
  return (
    <input
      ref={ref}
      className={joinClasses(styles.control, invalid ? styles.invalid : '', className)}
      aria-invalid={invalid ? 'true' : props['aria-invalid']}
      {...props}
    />
  );
});

export const Textarea = React.forwardRef(function Textarea(
  { className = '', invalid = false, ...props },
  ref
) {
  return (
    <textarea
      ref={ref}
      className={joinClasses(styles.control, styles.textarea, invalid ? styles.invalid : '', className)}
      aria-invalid={invalid ? 'true' : props['aria-invalid']}
      {...props}
    />
  );
});

export const Select = React.forwardRef(function Select(
  { children, className = '', invalid = false, ...props },
  ref
) {
  return (
    <select
      ref={ref}
      className={joinClasses(styles.control, styles.select, invalid ? styles.invalid : '', className)}
      aria-invalid={invalid ? 'true' : props['aria-invalid']}
      {...props}
    >
      {children}
    </select>
  );
});
