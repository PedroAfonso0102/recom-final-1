/**
 * RECOM Form Handler (Vanilla JS)
 * Ported from React logic to maintain contact functionality in the wireframe.
 */

const CONTACT_FORM_NAME = 'contact_orcamento';
const CONTACT_FORM_TIMEOUT_MS = 12000;

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('[data-hook="form-container"]');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const values = Object.fromEntries(formData.entries());
        
        // Basic validation
        const errors = validateForm(values);
        if (Object.keys(errors).length > 0) {
            showErrors(errors);
            return;
        }

        // Clear previous messages
        clearMessages();
        
        // Disable form
        setLoading(true);

        try {
            const payload = buildPayload(values);
            const endpoint = getEndpoint();

            const response = await fetchWithTimeout(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            }, CONTACT_FORM_TIMEOUT_MS);

            const result = await response.json();

            if (response.ok) {
                showSuccess(result.message || 'Mensagem enviada com sucesso!');
                form.reset();
            } else {
                showGeneralError(result.message || 'Erro ao enviar. Tente novamente.');
            }
        } catch (error) {
            console.error('Submission error:', error);
            showGeneralError('Falha na conexão. Verifique sua internet.');
        } finally {
            setLoading(false);
        }
    });
});

function validateForm(values) {
    const errors = {};
    if (!values.name?.trim()) errors.name = 'Informe seu nome.';
    if (!values.company?.trim()) errors.company = 'Informe sua empresa.';
    if (!values.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
        errors.email = 'Informe um e-mail válido.';
    }
    if (!values.message?.trim()) errors.message = 'Descreva sua necessidade.';
    if (!values.consent) errors.consent = 'Autorize o retorno comercial.';
    
    return errors;
}

function showErrors(errors) {
    clearMessages();
    Object.entries(errors).forEach(([field, msg]) => {
        const input = document.querySelector(`[name="${field}"]`);
        if (input) {
            const errorSpan = document.createElement('span');
            errorSpan.className = 'error-message';
            errorSpan.textContent = msg;
            input.parentNode.appendChild(errorSpan);
        }
    });
}

function clearMessages() {
    document.querySelectorAll('.error-message, .success-message, .general-error').forEach(el => el.remove());
}

function showSuccess(msg) {
    const main = document.querySelector('main');
    const div = document.createElement('div');
    div.className = 'success-message';
    div.textContent = msg;
    main.prepend(div);
}

function showGeneralError(msg) {
    const form = document.querySelector('[data-hook="form-container"]');
    const div = document.createElement('div');
    div.className = 'error-message general-error';
    div.textContent = msg;
    form.prepend(div);
}

function setLoading(isLoading) {
    const btn = document.querySelector('[data-hook="form-submit"]');
    if (btn) {
        btn.disabled = isLoading;
        btn.textContent = isLoading ? 'Enviando...' : 'Solicitar orçamento';
    }
}

function getEndpoint() {
    // This would typically come from an environment variable or a global config
    return window.__RECOM_CONTACT_ENDPOINT__ || '';
}

function buildPayload(values) {
    return {
        form_name: CONTACT_FORM_NAME,
        submitted_at: new Date().toISOString(),
        consent: values.consent === 'on',
        lead: {
            name: values.name,
            company: values.company,
            email: values.email,
            phone: values.phone,
            supplier_interest: values.supplier,
            process_interest: values.process,
            codes: values.codes,
            message: values.message
        }
    };
}

async function fetchWithTimeout(resource, options = {}, timeout = 8000) {
    const { signal, ...rest } = options;
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    try {
        const response = await fetch(resource, {
            ...rest,
            signal: controller.signal
        });
        clearTimeout(id);
        return response;
    } catch (e) {
        clearTimeout(id);
        throw e;
    }
}
