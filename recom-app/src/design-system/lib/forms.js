import { SiteHooks } from '../hooks/site-hooks.js';
import { UIStrings } from '../content/ui-strings.js';

/**
 * Form Handling logic
 * Centralizado no Design System.
 */
export const initContactForm = () => {
    const form = document.querySelector(`[data-hook="${SiteHooks.contact.form}"]`);
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const btn = form.querySelector(`[data-hook="${SiteHooks.contact.submitButton}"]`);
        const successMsg = document.querySelector(`[data-hook="${SiteHooks.contact.successMessage}"]`);
        const originalText = btn.textContent;

        // Ativa estado de carregamento
        form.classList.add('is-loading');
        if (btn) {
            btn.disabled = true;
            btn.textContent = UIStrings.messages.loading;
        }

        try {
            // Simulação de envio
            const formData = new FormData(form);
            console.log('RECOM Form Submit:', Object.fromEntries(formData.entries()));

            await new Promise(resolve => setTimeout(resolve, 1500));

            // Sucesso
            form.classList.add('hide');
            if (successMsg) successMsg.classList.remove('hide');
            
        } catch (err) {
            console.error('Erro no envio:', err);
            alert(UIStrings.messages.formError);
        } finally {
            form.classList.remove('is-loading');
            if (btn) {
                btn.disabled = false;
                btn.textContent = originalText;
            }
        }
    });
};

// Auto-inicialização caso seja importado no navegador
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', initContactForm);
}

if (typeof window !== 'undefined') {
    window.RECOM_FORMS = { initContactForm };
}
