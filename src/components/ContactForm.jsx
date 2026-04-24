import React, { useEffect, useRef, useState } from 'react';
import ActionButton from './ActionButton';
import styles from './ContactForm.module.css';
import { trackLeadGen } from '../utils/analytics';

const ContactForm = () => {
  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
  });
  const [errors, setErrors] = useState({});
  const timerRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  const validateForm = (formData) => {
    const newErrors = {};
    if (!formData.get('name')) newErrors.name = 'O nome é obrigatório.';
    if (!formData.get('company')) newErrors.company = 'A empresa é obrigatória.';

    const email = formData.get('email');
    if (!email) {
      newErrors.email = 'O e-mail é obrigatório.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Formato de e-mail inválido.';
    }

    if (!formData.get('subject')) newErrors.subject = 'O assunto é obrigatório.';
    if (!formData.get('message')) newErrors.message = 'A mensagem é obrigatória.';
    if (!formData.get('consent')) newErrors.consent = 'Você deve aceitar os termos.';

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (status.submitting) {
      return;
    }

    // Honeypot check
    const formData = new FormData(formRef.current);
    if (formData.get('bot_field')) {
      // Silently succeed for bots
      setStatus({ submitted: true, submitting: false });
      return;
    }

    const newErrors = validateForm(formData);

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Focus first error field if possible
      const firstErrorField = Object.keys(newErrors)[0];
      const el = document.getElementById(`contact-${firstErrorField}`);
      if (el) {
          el.focus();
      }
      return;
    }

    setErrors({});

    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
    }

    setStatus({ submitted: false, submitting: true });

    timerRef.current = window.setTimeout(() => {
      timerRef.current = null;
      setStatus({ submitted: true, submitting: false });
      trackLeadGen('form', 'Contact Form');
    }, 500);
  };

  if (status.submitted) {
    return (
      <div className={styles.successMessage} role="status" aria-live="polite">
        Solicitação recebida. Entraremos em contato em breve.
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className={styles.formContainer} noValidate>
      <div className="sr-only" aria-hidden="true" style={{ display: 'none' }}>
        <label htmlFor="bot_field">Don&#39;t fill this out if you&#39;re human:</label>
        <input type="text" id="bot_field" name="bot_field" tabIndex="-1" />
      </div>

      <div className={styles.gridRow}>
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="contact-name">Nome *</label>
          <input
            id="contact-name"
            name="name"
            type="text"
            className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
            placeholder="Seu nome completo"
            autoComplete="name"
            aria-invalid={errors.name ? 'true' : 'false'}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
          />
          {errors.name && <span id="contact-name-error" className={styles.errorMessage}>{errors.name}</span>}
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="contact-company">Empresa *</label>
          <input
            id="contact-company"
            name="company"
            type="text"
            className={`${styles.input} ${errors.company ? styles.inputError : ''}`}
            placeholder="Nome da empresa"
            autoComplete="organization"
            aria-invalid={errors.company ? 'true' : 'false'}
            aria-describedby={errors.company ? "contact-company-error" : undefined}
          />
          {errors.company && <span id="contact-company-error" className={styles.errorMessage}>{errors.company}</span>}
        </div>
      </div>

      <div className={styles.gridRow}>
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="contact-email">E-mail *</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
            placeholder="exemplo@email.com"
            autoComplete="email"
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
          />
          {errors.email && <span id="contact-email-error" className={styles.errorMessage}>{errors.email}</span>}
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
          className={`${styles.input} ${errors.subject ? styles.inputError : ''}`}
          placeholder="Ex: Solicitação de orçamento"
          aria-invalid={errors.subject ? 'true' : 'false'}
          aria-describedby={errors.subject ? "contact-subject-error" : undefined}
        />
        {errors.subject && <span id="contact-subject-error" className={styles.errorMessage}>{errors.subject}</span>}
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label} htmlFor="contact-message">Mensagem / necessidade *</label>
        <textarea
          id="contact-message"
          name="message"
          rows="5"
          className={`${styles.textarea} ${errors.message ? styles.textareaError : ''}`}
          placeholder="Conte com quais peças, materiais ou operações você quer trabalhar."
          aria-invalid={errors.message ? 'true' : 'false'}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
        ></textarea>
        {errors.message && <span id="contact-message-error" className={styles.errorMessage}>{errors.message}</span>}
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.checkboxGroup} htmlFor="contact-consent">
          <input
            id="contact-consent"
            name="consent"
            type="checkbox"
            className={styles.checkboxInput}
            aria-invalid={errors.consent ? 'true' : 'false'}
            aria-describedby={errors.consent ? "contact-consent-error" : undefined}
          />
          <span className={styles.checkboxCopy}>
            Autorizo a RECOM a retornar meu contato por e-mail, telefone ou WhatsApp.
          </span>
        </label>
        {errors.consent && <span id="contact-consent-error" className={styles.errorMessage}>{errors.consent}</span>}
      </div>

      <p className={styles.requiredNote}>* Campos obrigatórios</p>
      <ActionButton type="submit" variant="primary" stackOnMobile disabled={status.submitting}>
        {status.submitting ? 'Enviando...' : 'Solicitar orçamento'}
      </ActionButton>
    </form>
  );
};

export default ContactForm;
