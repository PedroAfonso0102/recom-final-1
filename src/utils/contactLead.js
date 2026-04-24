import { contato } from '../data/contato';

export const CONTACT_FORM_NAME = 'contact_orcamento';
export const CONTACT_FORM_TIMEOUT_MS = 12000;
export const CONTACT_FORM_MAX_LENGTHS = {
  name: 120,
  company: 120,
  email: 254,
  phone: 32,
  supplier: 80,
  process: 80,
  codes: 160,
  message: 2000,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const normalizeWhitespace = (value = '') => String(value).replace(/\s+/g, ' ').trim();

const normalizeMultilineText = (value = '') =>
  String(value)
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map((line) => line.trim())
    .join('\n')
    .trim();

const sliceText = (value = '', maxLength) => normalizeWhitespace(value).slice(0, maxLength);

const sliceMultilineText = (value = '', maxLength) => normalizeMultilineText(value).slice(0, maxLength);

const stripDigits = (value = '') => String(value).replace(/\D+/g, '');

export const getContactEndpoint = () => {
  if (typeof window !== 'undefined' && typeof window.__RECOM_CONTACT_ENDPOINT__ === 'string') {
    const override = window.__RECOM_CONTACT_ENDPOINT__.trim();
    if (override) {
      return override;
    }
  }

  const envEndpoint = import.meta.env.VITE_RECOM_CONTACT_ENDPOINT;
  return typeof envEndpoint === 'string' ? envEndpoint.trim() : '';
};

export const isContactEndpointConfigured = () => Boolean(getContactEndpoint());

export const normalizeContactLead = (values = {}) => {
  const normalized = {
    name: sliceText(values.name, CONTACT_FORM_MAX_LENGTHS.name),
    company: sliceText(values.company, CONTACT_FORM_MAX_LENGTHS.company),
    email: sliceText(values.email, CONTACT_FORM_MAX_LENGTHS.email).toLowerCase(),
    phone: sliceText(values.phone, CONTACT_FORM_MAX_LENGTHS.phone),
    supplier: sliceText(values.supplier, CONTACT_FORM_MAX_LENGTHS.supplier),
    process: sliceText(values.process, CONTACT_FORM_MAX_LENGTHS.process),
    codes: sliceText(values.codes, CONTACT_FORM_MAX_LENGTHS.codes),
    message: sliceMultilineText(values.message, CONTACT_FORM_MAX_LENGTHS.message),
    consent: Boolean(values.consent),
    bot_field: sliceText(values.bot_field, 120),
  };

  return {
    ...normalized,
    phone_digits: stripDigits(normalized.phone),
  };
};

export const validateContactLead = (values = {}) => {
  const errors = {};
  const normalized = normalizeContactLead(values);
  const rawName = normalizeWhitespace(values.name);
  const rawCompany = normalizeWhitespace(values.company);
  const rawEmail = normalizeWhitespace(values.email).toLowerCase();
  const rawMessage = normalizeMultilineText(values.message);

  if (!rawName) {
    errors.name = 'Informe seu nome.';
  } else if (rawName.length > CONTACT_FORM_MAX_LENGTHS.name) {
    errors.name = 'Seu nome está longo demais.';
  }

  if (!rawCompany) {
    errors.company = 'Informe sua empresa.';
  } else if (rawCompany.length > CONTACT_FORM_MAX_LENGTHS.company) {
    errors.company = 'O nome da empresa está longo demais.';
  }

  if (!rawEmail) {
    errors.email = 'Informe seu e-mail.';
  } else if (rawEmail.length > CONTACT_FORM_MAX_LENGTHS.email) {
    errors.email = 'O e-mail está longo demais.';
  } else if (!EMAIL_RE.test(rawEmail)) {
    errors.email = 'Informe um e-mail válido.';
  }

  if (!rawMessage) {
    errors.message = 'Descreva a sua necessidade.';
  } else if (rawMessage.length > CONTACT_FORM_MAX_LENGTHS.message) {
    errors.message = 'A mensagem ultrapassa o limite permitido.';
  }

  if (!normalized.consent) {
    errors.consent = 'Autorize o retorno comercial da RECOM.';
  }

  if (normalized.bot_field) {
    errors.bot_field = 'hidden_field';
  }

  return {
    errors,
    normalized,
    isValid: Object.keys(errors).length === 0,
  };
};

export const buildContactSubject = (values = {}) => {
  const company = normalizeWhitespace(values.company);
  const name = normalizeWhitespace(values.name);
  const leadName = company || name || 'Lead';

  return `Novo contato pelo site RECOM - ${leadName}`;
};

export const buildContactBody = (values = {}, context = {}) => {
  const normalized = normalizeContactLead(values);
  const submittedAt = context.submittedAt || new Date().toISOString();
  const pageLocation = context.pageLocation || (typeof window !== 'undefined' ? window.location.href : '');
  const consentLabel = normalized.consent ? 'Sim' : 'Nao';

  return [
    'Novo contato pelo site RECOM',
    '',
    `Nome: ${normalized.name || '-'}`,
    `Empresa: ${normalized.company || '-'}`,
    `E-mail: ${normalized.email || '-'}`,
    `Telefone/WhatsApp: ${normalized.phone || '-'}`,
    `Telefone apenas numeros: ${normalized.phone_digits || '-'}`,
    `Fornecedor de interesse: ${normalized.supplier || '-'}`,
    `Processo / aplicacao: ${normalized.process || '-'}`,
    `Codigo(s) ou item(ns): ${normalized.codes || '-'}`,
    '',
    'Mensagem:',
    normalized.message || '-',
    '',
    `Pagina de origem: ${pageLocation || '-'}`,
    `Data/hora: ${submittedAt}`,
    `Consentimento: ${consentLabel}`,
  ].join('\n');
};

export const buildContactRequestPayload = (values = {}, context = {}) => {
  const normalized = normalizeContactLead(values);
  const submittedAt = context.submittedAt || new Date().toISOString();
  const pageLocation = context.pageLocation || (typeof window !== 'undefined' ? window.location.href : '');
  const referrer = context.referrer || (typeof document !== 'undefined' ? document.referrer : '');
  const subject = buildContactSubject(normalized);
  const bodyText = buildContactBody(normalized, { ...context, submittedAt, pageLocation });

  return {
    form_name: CONTACT_FORM_NAME,
    subject,
    reply_to: normalized.email,
    page_location: pageLocation,
    referrer,
    submitted_at: submittedAt,
    consent: normalized.consent,
    lead: {
      name: normalized.name,
      company: normalized.company,
      email: normalized.email,
      phone: normalized.phone,
      phone_digits: normalized.phone_digits,
      supplier_interest: normalized.supplier,
      process_interest: normalized.process,
      codes: normalized.codes,
      message: normalized.message,
    },
    email: {
      subject,
      body: bodyText,
    },
  };
};

const safeMessageFromResponse = (status) => {
  if (status >= 500) {
    return 'A RECOM nao conseguiu processar agora. Tente novamente em instantes.';
  }

  if (status >= 400) {
    return 'Nao foi possivel validar seu envio agora. Revise os dados e tente novamente.';
  }

  return 'Nao foi possivel enviar agora. Tente novamente ou fale com a RECOM por telefone/e-mail.';
};

export const submitContactLead = async (values = {}, context = {}) => {
  const endpoint = getContactEndpoint();
  const validation = validateContactLead(values);
  const normalized = validation.normalized;

  if (!validation.isValid) {
    return {
      ok: false,
      status: 'invalid_payload',
      errorType: 'invalid_payload',
      message: 'Payload inválido. Revise os campos obrigatórios antes de enviar.',
      normalized,
    };
  }

  if (!endpoint) {
    return {
      ok: false,
      status: 'unavailable',
      errorType: 'endpoint_unavailable',
      message:
        'O canal online de contato está indisponível no momento. Use telefone, e-mail ou WhatsApp.',
      normalized,
    };
  }

  const payload = buildContactRequestPayload(normalized, context);
  const timeoutMs = Number(context.timeoutMs) > 0 ? Number(context.timeoutMs) : CONTACT_FORM_TIMEOUT_MS;
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    const contentType = response.headers.get('content-type') || '';
    let responseData = null;

    if (contentType.includes('application/json')) {
      try {
        responseData = await response.json();
      } catch {
        responseData = null;
      }
    } else {
      const text = await response.text();
      responseData = text ? { message: text } : null;
    }

    if (!response.ok) {
      return {
        ok: false,
        status: response.status,
        errorType: `http_${response.status}`,
        message: responseData?.message || safeMessageFromResponse(response.status),
        normalized,
      };
    }

    return {
      ok: true,
      status: response.status,
      protocol: responseData?.protocol || responseData?.id || null,
      message:
        responseData?.message ||
        'Mensagem enviada. A RECOM retornará pelo canal informado.',
      normalized,
      payload,
    };
  } catch (error) {
    const isAbort = error?.name === 'AbortError';

    return {
      ok: false,
      status: isAbort ? 'timeout' : 'network_error',
      errorType: isAbort ? 'timeout' : 'network_error',
      message: isAbort
        ? 'Nao foi possivel enviar agora. A conexão expirou. Tente novamente ou fale com a RECOM por telefone/e-mail.'
        : 'Nao foi possivel enviar agora. Verifique sua conexão ou fale com a RECOM por telefone/e-mail.',
      normalized,
    };
  } finally {
    window.clearTimeout(timeoutId);
  }
};

export const getContactFallbackLinks = () => ({
  phoneHref: contato.telefone.href,
  phoneLabel: contato.telefone.display,
  emailHref: contato.email.href,
  emailLabel: contato.email.display,
  whatsappHref: contato.whatsapp.hrefComMensagem,
  whatsappLabel: 'WhatsApp',
  catalogHref: '/fornecedores-catalogos',
});
