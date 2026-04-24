import React, { useRef, useState } from 'react';
import ActionButton from './ActionButton';
import styles from './ContactForm.module.css';
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

const fieldOrder = ['name', 'company', 'email', 'message', 'consent', 'phone', 'supplier', 'process', 'codes'];

const getFirstErrorField = (errorMap = {}) =>
  fieldOrder.find((field) => errorMap[field]);

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

  const focusFirstError = (errorMap) => {
    const firstField = getFirstErrorField(errorMap);
    if (!firstField) {
      return;
    }

    const target = document.getElementById(`contact-${firstField}`);
    if (target && typeof target.focus === 'function') {
      target.focus();
    }
  };

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

    if (submitLockRef.current) {
      return;
    }

    const validation = validateContactLead(values);

    if (validation.errors.bot_field) {
      return;
    }

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
      focusFirstError(validation.errors);
      return;
    }

    setErrors({});

    if (!endpointAvailable) {
      setSubmission({
        status: 'unavailable',
        message:
          'O canal online de contato está indisponível no momento. Use telefone, e-mail ou WhatsApp.',
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

    const requestContext = {
      pageLocation: typeof window !== 'undefined' ? window.location.href : '',
      referrer: typeof document !== 'undefined' ? document.referrer : '',
      submittedAt: new Date().toISOString(),
      timeoutMs: CONTACT_FORM_TIMEOUT_MS,
    };
    const result = await submitContactLead(validation.normalized, requestContext);

    submitLockRef.current = false;

    if (result.ok) {
      setSubmission({
        status: 'success',
        message: result.message || 'Mensagem enviada. A RECOM retornará pelo canal informado.',
        protocol: result.protocol,
        errorType: null,
      });
      setValues(initialValues);
      formRef.current?.reset?.();
      trackLeadGen('form', CONTACT_FORM_NAME, {
        process_interest: validation.normalized.process || 'none',
        supplier_interest: validation.normalized.supplier || 'none',
      });
      return;
    }

    setSubmission({
      status: result.status === 'unavailable' ? 'unavailable' : 'error',
      message:
        result.message ||
        'Não foi possível enviar agora. Tente novamente ou fale com a RECOM por telefone/e-mail.',
      protocol: null,
      errorType: result.errorType || 'network_error',
    });

    trackContactFormError({
      errorType: result.errorType || 'unknown',
      endpointAvailable,
      formName: CONTACT_FORM_NAME,
      processInterest: validation.normalized.process,
      supplierInterest: validation.normalized.supplier,
    });
  };

  const handleFallbackClick = (channel) => {
    trackContactFallbackClick(channel, {
      formName: CONTACT_FORM_NAME,
      reason: submission.status === 'success' ? 'post_success' : submission.status,
      processInterest: values.process,
      supplierInterest: values.supplier,
    });
  };

  const renderFallbackActions = (reason) => (
    <div className={styles.supportActions}>
      <ActionButton
        href={fallbackLinks.phoneHref}
        variant="secondary"
        compact
        stackOnMobile
        onClick={() => handleFallbackClick('phone')}
      >
        Ligar agora
      </ActionButton>
      <ActionButton
        href={fallbackLinks.emailHref}
        variant="secondary"
        compact
        stackOnMobile
        onClick={() => handleFallbackClick('email')}
      >
        Enviar e-mail
      </ActionButton>
      <ActionButton
        href={fallbackLinks.whatsappHref}
        target="_blank"
        variant="secondary"
        compact
        stackOnMobile
        onClick={() => handleFallbackClick('whatsapp')}
      >
        WhatsApp
      </ActionButton>
      <ActionButton
        to={fallbackLinks.catalogHref}
        variant="secondary"
        compact
        stackOnMobile
        onClick={() => handleFallbackClick('catalogs')}
      >
        Voltar aos catálogos
      </ActionButton>
      <span className={styles.supportReason}>Caminho alternativo: {reason}</span>
    </div>
  );

  if (submission.status === 'success') {
    return (
      <div className={styles.statusPanelSuccess} role="status" aria-live="polite">
        <p className={styles.statusTitle}>{submission.message}</p>
        {submission.protocol ? (
          <p className={styles.statusProtocol}>Protocolo interno: {submission.protocol}</p>
        ) : null}
        <p className={styles.statusText}>
          A RECOM retornará pelo canal informado. Enquanto isso, você pode seguir por um destes caminhos.
        </p>
        <div className={styles.successActions}>
          <ActionButton
            href={fallbackLinks.phoneHref}
            variant="secondary"
            compact
            stackOnMobile
            onClick={() => handleFallbackClick('phone')}
          >
            Ligar agora
          </ActionButton>
          <ActionButton
            href={fallbackLinks.emailHref}
            variant="secondary"
            compact
            stackOnMobile
            onClick={() => handleFallbackClick('email')}
          >
            Enviar e-mail
          </ActionButton>
          <ActionButton
            href={fallbackLinks.whatsappHref}
            target="_blank"
            variant="secondary"
            compact
            stackOnMobile
            onClick={() => handleFallbackClick('whatsapp')}
          >
            WhatsApp
          </ActionButton>
          <ActionButton to={fallbackLinks.catalogHref} variant="secondary" compact stackOnMobile>
            Ver fornecedores e catálogos
          </ActionButton>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.formShell}>
      {!endpointAvailable ? (
        <div className={styles.endpointNotice} role="note">
          <strong>Envio online indisponível.</strong>
          <span>Use os canais diretos abaixo enquanto o endpoint de contato não estiver configurado.</span>
        </div>
      ) : null}

      {submission.status === 'invalid' ? (
        <div className={styles.statusPanelError} role="alert" aria-live="assertive">
          <p className={styles.statusTitle}>{submission.message}</p>
          {renderFallbackActions('Campos obrigatórios pendentes ou inválidos.')}
        </div>
      ) : null}

      {submission.status === 'error' || submission.status === 'unavailable' ? (
        <div className={styles.statusPanelError} role="alert" aria-live="assertive">
          <p className={styles.statusTitle}>{submission.message}</p>
          {renderFallbackActions(
            submission.status === 'unavailable'
              ? 'Canal online indisponível.'
              : 'Falha técnica no envio.'
          )}
        </div>
      ) : null}

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className={styles.formContainer}
        noValidate
        aria-busy={submission.status === 'submitting'}
      >
        <div className={styles.honeypot} aria-hidden="true">
          <label htmlFor="bot_field">Nao preencha este campo</label>
          <input
            id="bot_field"
            name="bot_field"
            type="text"
            tabIndex="-1"
            autoComplete="off"
            value={values.bot_field}
            onChange={updateValue}
          />
        </div>

        <div className={styles.gridRow}>
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="contact-name">
              Nome *
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
              placeholder="Seu nome completo"
              autoComplete="name"
              maxLength={120}
              value={values.name}
              onChange={updateValue}
              disabled={submission.status === 'submitting'}
              aria-invalid={errors.name ? 'true' : 'false'}
              aria-describedby={errors.name ? 'contact-name-error' : undefined}
            />
            {errors.name ? (
              <span id="contact-name-error" className={styles.errorMessage} role="alert">
                {errors.name}
              </span>
            ) : null}
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="contact-company">
              Empresa *
            </label>
            <input
              id="contact-company"
              name="company"
              type="text"
              className={`${styles.input} ${errors.company ? styles.inputError : ''}`}
              placeholder="Nome da empresa"
              autoComplete="organization"
              maxLength={120}
              value={values.company}
              onChange={updateValue}
              disabled={submission.status === 'submitting'}
              aria-invalid={errors.company ? 'true' : 'false'}
              aria-describedby={errors.company ? 'contact-company-error' : undefined}
            />
            {errors.company ? (
              <span id="contact-company-error" className={styles.errorMessage} role="alert">
                {errors.company}
              </span>
            ) : null}
          </div>
        </div>

        <div className={styles.gridRow}>
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="contact-email">
              E-mail *
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
              placeholder="exemplo@email.com"
              autoComplete="email"
              inputMode="email"
              maxLength={254}
              value={values.email}
              onChange={updateValue}
              disabled={submission.status === 'submitting'}
              aria-invalid={errors.email ? 'true' : 'false'}
              aria-describedby={errors.email ? 'contact-email-error' : undefined}
            />
            {errors.email ? (
              <span id="contact-email-error" className={styles.errorMessage} role="alert">
                {errors.email}
              </span>
            ) : null}
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="contact-phone">
              Telefone / WhatsApp
            </label>
            <input
              id="contact-phone"
              name="phone"
              type="tel"
              className={styles.input}
              placeholder="(19) 0000-0000"
              autoComplete="tel"
              inputMode="tel"
              maxLength={32}
              value={values.phone}
              onChange={updateValue}
              disabled={submission.status === 'submitting'}
              aria-describedby="contact-phone-hint"
            />
            <p id="contact-phone-hint" className={styles.helperText}>
              Opcional, mas útil se o retorno precisar ser rápido.
            </p>
          </div>
        </div>

        <div className={styles.gridRow}>
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="contact-supplier">
              Fornecedor ou marca de interesse
            </label>
            <select
              id="contact-supplier"
              name="supplier"
              className={styles.select}
              value={values.supplier}
              onChange={updateValue}
              disabled={submission.status === 'submitting'}
              aria-describedby="contact-supplier-hint"
            >
              <option value="">Ainda nao sei</option>
              <option value="mitsubishi-materials">Mitsubishi Materials</option>
              <option value="7leaders">7Leaders</option>
              <option value="bt-fixo">BT Fixo</option>
              <option value="kifix">Kifix</option>
            </select>
            <p id="contact-supplier-hint" className={styles.helperText}>
              Se já tiver uma marca em mente, selecione aqui.
            </p>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="contact-process">
              Processo / aplicação
            </label>
            <select
              id="contact-process"
              name="process"
              className={styles.select}
              value={values.process}
              onChange={updateValue}
              disabled={submission.status === 'submitting'}
              aria-describedby="contact-process-hint"
            >
              <option value="">Ainda nao defini</option>
              <option value="torneamento">Torneamento</option>
              <option value="fresamento">Fresamento</option>
              <option value="furacao">Furação</option>
              <option value="outro">Outro processo</option>
            </select>
            <p id="contact-process-hint" className={styles.helperText}>
              Isso ajuda a direcionar a resposta comercial e técnica.
            </p>
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="contact-codes">
            Código(s) ou item(ns) desejado(s)
          </label>
          <input
            id="contact-codes"
            name="codes"
            type="text"
            className={styles.input}
            placeholder="Ex: MWS0500SB"
            maxLength={160}
            value={values.codes}
            onChange={updateValue}
            disabled={submission.status === 'submitting'}
            aria-describedby="contact-codes-hint"
          />
          <p id="contact-codes-hint" className={styles.helperText}>
            Se souber o código, informe. Se não, descreva a necessidade na mensagem.
          </p>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="contact-message">
            Mensagem / necessidade *
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows="6"
            className={`${styles.textarea} ${errors.message ? styles.textareaError : ''}`}
            placeholder="Conte com quais peças, materiais, operações ou quantidades você quer trabalhar."
            maxLength={2000}
            value={values.message}
            onChange={updateValue}
            disabled={submission.status === 'submitting'}
            aria-invalid={errors.message ? 'true' : 'false'}
            aria-describedby={errors.message ? 'contact-message-error contact-message-hint' : 'contact-message-hint'}
          />
          {errors.message ? (
            <span id="contact-message-error" className={styles.errorMessage} role="alert">
              {errors.message}
            </span>
          ) : null}
          <p id="contact-message-hint" className={styles.helperText}>
            Explique o contexto da demanda para acelerar a resposta comercial.
          </p>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.checkboxGroup} htmlFor="contact-consent">
            <input
              id="contact-consent"
              name="consent"
              type="checkbox"
              className={styles.checkboxInput}
              checked={values.consent}
              onChange={updateValue}
              disabled={submission.status === 'submitting'}
              aria-invalid={errors.consent ? 'true' : 'false'}
              aria-describedby={errors.consent ? 'contact-consent-error' : undefined}
            />
            <span className={styles.checkboxCopy}>
              Autorizo a RECOM a retornar meu contato por e-mail, telefone ou WhatsApp.
            </span>
          </label>
          {errors.consent ? (
            <span id="contact-consent-error" className={styles.errorMessage} role="alert">
              {errors.consent}
            </span>
          ) : null}
        </div>

        <p className={styles.requiredNote}>* Campos obrigatórios</p>

        {submission.status === 'submitting' ? (
          <p className={styles.sendingState} role="status" aria-live="polite">
            Enviando...
          </p>
        ) : null}

        <ActionButton
          type="submit"
          variant="primary"
          className={styles.submitButton}
          stackOnMobile
          disabled={submission.status === 'submitting'}
          aria-busy={submission.status === 'submitting'}
          aria-label="Solicitar orçamento"
        >
          {submission.status === 'submitting' ? 'Enviando...' : 'Solicitar orçamento'}
        </ActionButton>
      </form>
    </div>
  );
};

export default ContactForm;
