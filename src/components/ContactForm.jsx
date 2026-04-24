import React, { useEffect, useRef, useState } from 'react';
import styles from './ContactForm.module.css';
import { trackLeadGen } from '../utils/analytics';

const ContactForm = () => {
  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
  });
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (status.submitting) {
      return;
    }

    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
    }

    setStatus({ submitted: false, submitting: true });

    // Simulate API call for form submission
    timerRef.current = window.setTimeout(() => {
      timerRef.current = null;
      setStatus({ submitted: true, submitting: false });
      trackLeadGen('form', 'Contact Form');
    }, 500);
  };

  if (status.submitted) {
    return (
      <div className={styles.successMessage} role="status" aria-live="polite">
        Mensagem enviada com sucesso. Entraremos em contato em breve.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <div className={styles.gridRow}>
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="contact-name">Nome *</label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            className={styles.input}
            placeholder="Seu nome completo"
            autoComplete="name"
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="contact-company">Empresa *</label>
          <input
            id="contact-company"
            name="company"
            type="text"
            required
            className={styles.input}
            placeholder="Nome da empresa"
            autoComplete="organization"
          />
        </div>
      </div>

      <div className={styles.gridRow}>
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="contact-email">E-mail *</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            className={styles.input}
            placeholder="exemplo@email.com"
            autoComplete="email"
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="contact-phone">Telefone / WhatsApp</label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            className={styles.input}
            placeholder="(19) 0000-0000"
            autoComplete="tel"
          />
        </div>
      </div>

      <div className={styles.gridRow}>
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="contact-supplier">Fornecedor de interesse</label>
          <select
            id="contact-supplier"
            name="supplier"
            className={styles.select}
            defaultValue=""
          >
            <option value="">Ainda não sei</option>
            <option value="mitsubishi-materials">Mitsubishi Materials</option>
            <option value="7leaders">7Leaders</option>
            <option value="bt-fixo">BT Fixo</option>
            <option value="kifix">Kifix</option>
          </select>
          <p className={styles.helperText}>Se você já tiver uma marca em mente, indique aqui.</p>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="contact-process">Processo / aplicação</label>
          <select
            id="contact-process"
            name="process"
            className={styles.select}
            defaultValue=""
          >
            <option value="">Ainda não defini</option>
            <option value="torneamento">Torneamento</option>
            <option value="fresamento">Fresamento</option>
            <option value="furacao">Furação</option>
            <option value="outro">Outro processo</option>
          </select>
          <p className={styles.helperText}>Ajuda a direcionar a resposta comercial e técnica.</p>
        </div>
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label} htmlFor="contact-codes">Código(s) ou item(ns) desejado(s)</label>
        <input
          id="contact-codes"
          name="codes"
          type="text"
          className={styles.input}
          placeholder="Ex: MWS0500SB"
        />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label} htmlFor="contact-subject">Assunto *</label>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          required
          className={styles.input}
          placeholder="Ex: Solicitação de orçamento"
        />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label} htmlFor="contact-message">Mensagem / necessidade *</label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows="5"
          className={styles.textarea}
          placeholder="Conte com quais peças, materiais ou operações você quer trabalhar."
        ></textarea>
      </div>

      <label className={styles.checkboxGroup} htmlFor="contact-consent">
        <input
          id="contact-consent"
          name="consent"
          type="checkbox"
          required
          className={styles.checkboxInput}
        />
        <span className={styles.checkboxCopy}>
          Autorizo a RECOM a retornar meu contato por e-mail, telefone ou WhatsApp.
        </span>
      </label>

      <p className={styles.requiredNote}>* Campos obrigatórios</p>
      <button type="submit" className={styles.submitBtn} disabled={status.submitting}>
        {status.submitting ? 'Enviando...' : 'Enviar solicitação'}
      </button>
    </form>
  );
};

export default ContactForm;
