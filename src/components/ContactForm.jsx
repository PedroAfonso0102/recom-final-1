import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CONTACT_FORM_NAME,
  CONTACT_FORM_TIMEOUT_MS,
  getContactFallbackLinks,
  isContactEndpointConfigured,
  submitContactLead,
  validateContactLead,
} from '../utils/contactLead';
import {
  trackContactFallbackClick,
  trackContactFormError,
  trackContactFormInvalid,
  trackLeadGen,
} from '../utils/analytics';

const initialValues = {
  name: '',
  company: '',
  email: '',
  phone: '',
  supplier: '',
  process: '',
  codes: '',
  message: '',
  consent: false,
  bot_field: '',
};

const ContactForm = () => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submission, setSubmission] = useState({
    status: 'idle',
    message: '',
    protocol: null,
    errorType: null,
  });
  const submitLockRef = useRef(false);
  const formRef = useRef(null);

  const endpointAvailable = isContactEndpointConfigured();
  const fallbackLinks = getContactFallbackLinks();

  const updateValue = (event) => {
    const { name, type, checked, value } = event.target;
    const nextValue = type === 'checkbox' ? checked : value;

    setValues((current) => ({
      ...current,
      [name]: nextValue,
    }));

    if (errors[name]) {
      setErrors((current) => {
        const nextErrors = { ...current };
        delete nextErrors[name];
        return nextErrors;
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (submitLockRef.current) return;

    const validation = validateContactLead(values);
    if (validation.errors.bot_field) return;

    if (!validation.isValid) {
      setErrors(validation.errors);
      setSubmission({
        status: 'invalid',
        message: 'Por favor, preencha os campos destacados em vermelho para podermos retornar o contato.',
        protocol: null,
        errorType: 'validation',
      });

      trackContactFormInvalid({
        errorTypes: Object.keys(validation.errors),
        endpointAvailable,
        formName: CONTACT_FORM_NAME,
        processInterest: validation.normalized.process,
        supplierInterest: validation.normalized.supplier,
      });
      return;
    }

    setErrors({});

    if (!endpointAvailable) {
      setSubmission({
        status: 'unavailable',
        message: 'O canal online de contato está indisponível no momento. Use telefone, e-mail ou WhatsApp.',
        protocol: null,
        errorType: 'endpoint_unavailable',
      });

      trackContactFormError({
        errorType: 'endpoint_unavailable',
        endpointAvailable: false,
        formName: CONTACT_FORM_NAME,
        processInterest: validation.normalized.process,
        supplierInterest: validation.normalized.supplier,
      });
      return;
    }

    submitLockRef.current = true;
    setSubmission({
      status: 'submitting',
      message: 'Enviando...',
      protocol: null,
      errorType: null,
    });

    const result = await submitContactLead(validation.normalized, {
      pageLocation: window.location.href,
      referrer: document.referrer,
      submittedAt: new Date().toISOString(),
      timeoutMs: CONTACT_FORM_TIMEOUT_MS,
    });

    submitLockRef.current = false;

    if (result.ok) {
      setSubmission({
        status: 'success',
        message: result.message || 'Mensagem enviada. A RECOM retornará pelo canal informado.',
        protocol: result.protocol,
        errorType: null,
      });
      setValues(initialValues);
      trackLeadGen('form', CONTACT_FORM_NAME, {
        process_interest: validation.normalized.process || 'none',
        supplier_interest: validation.normalized.supplier || 'none',
      });
      return;
    }

    setSubmission({
      status: result.status === 'unavailable' ? 'unavailable' : 'error',
      message: result.message || 'Não foi possível enviar agora.',
      protocol: null,
      errorType: result.errorType || 'network_error',
    });
  };

  const handleFallbackClick = (channel) => {
    trackContactFallbackClick(channel, {
      formName: CONTACT_FORM_NAME,
      reason: submission.status === 'success' ? 'post_success' : submission.status,
    });
  };

  if (submission.status === 'success') {
    return (
      <div style={{ border: '1px solid green', padding: '1rem' }}>
        <h2>Sucesso!</h2>
        <p>{submission.message}</p>
        {submission.protocol && <p>Protocolo: {submission.protocol}</p>}
        <div style={{ display: 'flex', gap: '1rem' }}>
          <a href={fallbackLinks.phoneHref} onClick={() => handleFallbackClick('phone')}>Ligar agora</a>
          <a href={fallbackLinks.whatsappHref} target="_blank" rel="noopener noreferrer" onClick={() => handleFallbackClick('whatsapp')}>WhatsApp</a>
          <Link to={fallbackLinks.catalogHref}>Ver catálogos</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem' }}>
      {submission.message && (
        <div style={{ color: submission.status === 'invalid' || submission.status === 'error' ? 'red' : 'inherit' }}>
          {submission.message}
        </div>
      )}

      <form ref={formRef} onSubmit={handleSubmit}>
        <div style={{ display: 'none' }}>
          <label htmlFor="bot_field">Não preencha</label>
          <input id="bot_field" name="bot_field" type="text" value={values.bot_field} onChange={updateValue} />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="contact-name">Nome *</label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            style={{ display: 'block', width: '100%', borderColor: errors.name ? 'red' : '#ccc' }}
            value={values.name}
            onChange={updateValue}
          />
          {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="contact-company">Empresa *</label>
          <input
            id="contact-company"
            name="company"
            type="text"
            required
            style={{ display: 'block', width: '100%', borderColor: errors.company ? 'red' : '#ccc' }}
            value={values.company}
            onChange={updateValue}
          />
          {errors.company && <span style={{ color: 'red' }}>{errors.company}</span>}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="contact-email">E-mail *</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            style={{ display: 'block', width: '100%', borderColor: errors.email ? 'red' : '#ccc' }}
            value={values.email}
            onChange={updateValue}
          />
          {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="contact-message">Mensagem *</label>
          <textarea
            id="contact-message"
            name="message"
            required
            rows="5"
            style={{ display: 'block', width: '100%', borderColor: errors.message ? 'red' : '#ccc' }}
            value={values.message}
            onChange={updateValue}
          />
          {errors.message && <span style={{ color: 'red' }}>{errors.message}</span>}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>
            <input
              name="consent"
              type="checkbox"
              checked={values.consent}
              onChange={updateValue}
              required
            />
            Autorizo a RECOM a retornar meu contato.
          </label>
          {errors.consent && <div style={{ color: 'red' }}>{errors.consent}</div>}
        </div>

        <button type="submit" disabled={submission.status === 'submitting'}>
          {submission.status === 'submitting' ? 'Enviando...' : 'Solicitar orçamento'}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;

