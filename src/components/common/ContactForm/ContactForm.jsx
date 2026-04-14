import React, { useState } from 'react';
import styles from './ContactForm.module.css';

const ContactForm = () => {
  const [status, setStatus] = useState({ submitted: false, error: false });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call for form submission
    setTimeout(() => {
      setStatus({ submitted: true, error: false });
    }, 500);
  };

  if (status.submitted) {
    return (
      <div className={styles.successMessage}>
        Mensagem enviada com sucesso! Entraremos em contato em breve.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Nome *</label>
        <input type="text" required className={styles.input} placeholder="Seu nome completo" />
      </div>
      <div className={styles.flexRow}>
        <div className={styles.inputGroup} style={{ flex: 1 }}>
          <label className={styles.label}>E-mail *</label>
          <input type="email" required className={styles.input} placeholder="exemplo@email.com" />
        </div>
        <div className={styles.inputGroup} style={{ flex: 1 }}>
          <label className={styles.label}>Telefone</label>
          <input type="tel" className={styles.input} placeholder="(19) 0000-0000" />
        </div>
      </div>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Código(s) do(s) produto(s) desejado(s)</label>
        <input type="text" className={styles.input} placeholder="Ex: MWS0500SB" />
      </div>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Assunto *</label>
        <input type="text" required className={styles.input} />
      </div>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Comentários *</label>
        <textarea required rows="5" className={styles.textarea}></textarea>
      </div>
      <p className={styles.requiredNote}>* Campos obrigatórios</p>
      <button type="submit" className={styles.submitBtn}>
        Enviar Mensagem
      </button>
    </form>
  );
};

export default ContactForm;
