/**
 * RECOM Component Loader & Data Binder
 * Carrega fragmentos HTML modulares e aplica placeholders globais.
 */

// Safety Initializer para o Design System
const getSiteHooks = () => window.SiteHooks || {};
const getAnalyticsEvents = () => window.AnalyticsEvents || {};
const getUIStrings = () => window.UIStrings || {
    buttons: { viewDetails: "Ver detalhes", viewCatalog: "Catálogo", requestQuote: "Solicitar orçamento", exploreSolutions: "Explorar" },
    messages: { loading: "Carregando..." }
};

/**
 * Aplica as configurações globais (Hooks) e caminhos relativos ao HTML
 */
function applyConfig(html, rootPath) {
    let result = html;
    
    if (window.RECOM_CONFIG) {
        result = result.replace(/{{PHONE}}/g, window.RECOM_CONFIG.contact.phone);
        result = result.replace(/{{EMAIL}}/g, window.RECOM_CONFIG.contact.email);
        result = result.replace(/{{ADDRESS}}/g, window.RECOM_CONFIG.contact.address);
        result = result.replace(/{{WHATSAPP}}/g, window.RECOM_CONFIG.contact.whatsapp);
        result = result.replace(/{{CEP}}/g, window.RECOM_CONFIG.contact.cep);
        result = result.replace(/{{CNPJ}}/g, window.RECOM_CONFIG.company.cnpj);
    }
    
    if (rootPath !== undefined) {
        result = result.replace(/{{ROOT}}/g, rootPath);
    }
    
    return result;
}

/**
 * Carrega todos os componentes marcados com [data-component]
 */
async function loadComponents() {
    const components = document.querySelectorAll('[data-component]');
    
    const isSubdir = window.location.pathname.includes('/processos/') || window.location.pathname.includes('/fornecedores/');
    const rootPath = isSubdir ? '../' : '';

    const SiteHooks = getSiteHooks();

    for (const el of components) {
        const componentName = el.getAttribute('data-component');
        const componentPath = `${rootPath}components/${componentName}.html`;

        // Atribui hook automático se houver no registry
        if (!el.getAttribute('data-hook') && SiteHooks.layout && SiteHooks.layout[componentName]) {
            el.setAttribute('data-hook', SiteHooks.layout[componentName]);
        }

        try {
            const response = await fetch(componentPath);
            if (!response.ok) throw new Error(`Erro ao carregar: ${componentName}`);
            
            let html = await response.text();
            html = applyConfig(html, rootPath);
            el.innerHTML = html;

            // Pós-processamento: Breadcrumbs
            if (componentName === 'breadcrumbs') {
                const parentText = el.getAttribute('data-breadcrumb-parent');
                const parentHref = el.getAttribute('data-breadcrumb-parent-href');
                const currentText = el.getAttribute('data-breadcrumb-current') || document.title.split(' - ')[0];

                if (parentText && parentHref) {
                    const parentItem = el.querySelector('[data-breadcrumb-parent-item]');
                    const parentLink = el.querySelector('[data-breadcrumb-parent-link]');
                    if (parentItem) parentItem.style.display = 'block';
                    if (parentLink) {
                        parentLink.textContent = parentText;
                        parentLink.href = rootPath + parentHref;
                    }
                }
                const currentItem = el.querySelector('[data-breadcrumb-current-item]');
                if (currentItem) currentItem.textContent = currentText;
            }

            // Pós-processamento: Active Nav
            if (componentName === 'header') {
                const navLinks = el.querySelectorAll('.nav-link');
                const currentPath = window.location.pathname;
                navLinks.forEach(link => {
                    const linkHrefRaw = link.getAttribute('href').replace('{{ROOT}}', '');
                    const baseName = linkHrefRaw.replace('.html', '');
                    if (baseName === 'index' || baseName === '') {
                        if (currentPath.endsWith('/') || currentPath.endsWith('index.html')) {
                            link.classList.add('is-active');
                        }
                    } else if (currentPath.includes(baseName)) {
                        link.classList.add('is-active');
                    }
                });
            }
        } catch (error) {
            console.error(error);
            el.innerHTML = `<p style="color:red;">Erro: ${componentName}</p>`;
        }
    }
}

/**
 * Renderiza o grid de fornecedores
 */
function renderSuppliers(containerId) {
    const selector = containerId ? `#${containerId}` : '[data-render="suppliers"]';
    const grid = document.querySelector(selector);
    if (!grid || !window.RECOM_CONFIG) return;
    
    const isSubdir = window.location.pathname.includes('/processos/') || window.location.pathname.includes('/fornecedores/');
    const rootPath = isSubdir ? '../' : '';

    const SiteHooks = getSiteHooks();
    const AnalyticsEvents = getAnalyticsEvents();
    const UIStrings = getUIStrings();

    grid.innerHTML = window.RECOM_CONFIG.suppliers.map(s => `
        <div class="card" data-component="SupplierCard" data-hook="${SiteHooks.suppliers?.card || 'suppliers.card'}" data-supplier="${s.slug}">
            <div class="card-media h-120 p-lg bg-white border-bottom" data-slot="media">
                <img src="${rootPath}assets/images/${s.logo}" alt="${s.name}" class="object-contain brand-badge">
            </div>
            <div class="card-content p-lg stack gap-md">
                <h3 class="text-lg" data-slot="title">${s.name}</h3>
                <p class="text-small muted" data-slot="description">${s.description}</p>
                <div class="cluster justify-between mt-auto pt-md border-top">
                    <a href="${rootPath}fornecedores/${s.slug}.html" 
                       class="text-brand text-small text-bold no-underline" 
                       data-slot="primary-action"
                       data-event="${AnalyticsEvents.supplierCardClick || 'supplier_card_click'}">${UIStrings.buttons.viewDetails}</a>
                    <a href="${s.catalogLink}" 
                       target="_blank" rel="noopener noreferrer" 
                       class="text-muted text-small no-underline" 
                       data-slot="secondary-action"
                       data-event="${AnalyticsEvents.supplierCatalogClick || 'supplier_catalog_click'}">${UIStrings.buttons.viewCatalog}</a>
                </div>
            </div>
        </div>
    `).join('');
}

/**
 * Renderiza a página de detalhes do fornecedor
 */
function renderSupplierDetail() {
    const container = document.querySelector('[data-render="supplier-detail"]');
    if (!container || !window.RECOM_CONFIG) return;

    const slug = window.location.pathname.split('/').pop().replace('.html', '');
    const supplier = window.RECOM_CONFIG.suppliers.find(s => s.slug === slug);

    if (!supplier || !supplier.content) return;

    const isSubdir = window.location.pathname.includes('/processos/') || window.location.pathname.includes('/fornecedores/');
    const rootPath = isSubdir ? '../' : '';

    const content = supplier.content;
    const SiteHooks = getSiteHooks();
    const AnalyticsEvents = getAnalyticsEvents();
    const UIStrings = getUIStrings();

    container.innerHTML = `
        <section class="container py-2xl" data-section="SupplierHero" data-hook="${SiteHooks.suppliers?.detailHero || 'suppliers.detail-hero'}">
            <div class="cluster gap-xl items-start stack-mobile">
                <div class="flex-none h-120" style="width: 240px;" data-slot="media">
                    <img src="${rootPath}assets/images/${supplier.logo}" alt="${supplier.name}" class="h-full w-full object-contain" style="object-position: left top;">
                </div>
                <div class="flex-1">
                    <h1 class="section-title mb-sm" data-slot="title">${supplier.name}</h1>
                    <p class="text-muted text-lg" data-slot="description">${content.hero}</p>
                </div>
            </div>
        </section>

        ${content.resolves ? `
        <section class="container my-2xl">
            <div class="stack gap-lg p-xl bg-muted border-left-brand rounded-sm">
                <h2 class="text-xl">${content.resolves.title}</h2>
                <div class="grid">
                    ${content.resolves.items.map(item => `
                        <div class="stack gap-xs">
                            <strong class="text-small">${item.label}</strong>
                            <p class="text-small text-muted">${item.description}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>
        ` : ''}

        ${content.highlights ? `
        <section class="container my-2xl">
            <h2 class="mb-lg">Linhas em Destaque</h2>
            <div class="grid">
                ${content.highlights.map(h => `
                    <div class="card p-md stack gap-xs">
                        <h3 class="text-lg">${h.title}</h3>
                        <p class="text-small text-muted">${h.description}</p>
                    </div>
                `).join('')}
            </div>
        </section>
        ` : ''}

        ${content.faq ? `
        <section class="container my-2xl">
            <h2 class="mb-lg">Guia de Seleção ${supplier.name}</h2>
            <div class="stack gap-md">
                ${content.faq.map(f => `
                    <details class="p-sm border-wire rounded-sm">
                        <summary class="text-bold cursor-pointer">${f.q}</summary>
                        <p class="text-small muted mt-xs">${f.a}</p>
                    </details>
                `).join('')}
            </div>
        </section>
        ` : ''}

        ${content.quotationGuide ? `
        <section class="container my-2xl p-xl border-wire bg-white rounded-sm">
            <h2 class="text-xl">Como cotar itens ${supplier.name}</h2>
            <p class="text-muted mt-sm">Para agilizar seu orçamento, informe preferencialmente:</p>
            <ul class="stack gap-xs mt-md pl-md text-muted text-small">
                ${content.quotationGuide.map(item => `<li>${item}</li>`).join('')}
            </ul>
            <div class="mt-lg">
                <a href="${rootPath}contato.html" class="button" data-slot="primary-action" data-event="${AnalyticsEvents.whatsappClick || 'whatsapp_click'}">${UIStrings.buttons.requestQuote}</a>
            </div>
        </section>
        ` : ''}

        ${content.catalogs ? `
        <section class="container my-2xl text-center py-lg border-top">
            <h3 class="mb-sm">Catálogos ${supplier.name}</h3>
            <p class="text-muted small">Acesse o material técnico oficial para selecionar sua ferramenta:</p>
            <div class="cluster justify-center mt-lg stack-mobile">
                ${content.catalogs.map(c => `
                    <a href="${c.link}" class="button ${c.label.includes('Geral') ? '' : 'secondary'}" target="_blank" rel="noopener noreferrer">${c.label}</a>
                `).join('')}
            </div>
        </section>
        ` : ''}
    `;
}

/**
 * Renderiza o grid de processos
 */
function renderProcesses(containerId) {
    const selector = containerId ? `#${containerId}` : '[data-render="processes"]';
    const grid = document.querySelector(selector);
    if (!grid || !window.RECOM_CONFIG) return;

    const isSubdir = window.location.pathname.includes('/processos/') || window.location.pathname.includes('/fornecedores/');
    const rootPath = isSubdir ? '../' : '';

    const SiteHooks = getSiteHooks();
    const AnalyticsEvents = getAnalyticsEvents();
    const UIStrings = getUIStrings();

    grid.innerHTML = window.RECOM_CONFIG.processes.map(p => `
        <div class="card" data-component="ProcessCard" data-hook="${SiteHooks.processes?.card || 'processes.card'}" data-process="${p.slug}">
            <div class="card-media aspect-video h-200" data-slot="media">
                <img src="${rootPath}assets/images/optimized/${p.image}" alt="${p.name}">
            </div>
            <div class="card-content p-lg stack gap-md">
                <h3 class="text-lg" data-slot="title">${p.name}</h3>
                <p class="text-small muted" data-slot="description">${p.description}</p>
                <div class="mt-auto pt-md border-top">
                    <a href="${rootPath}processos/${p.slug}.html" 
                       class="button secondary small w-full" 
                       data-slot="primary-action"
                       data-event="${AnalyticsEvents.processCardClick || 'process_card_click'}">${UIStrings.buttons.exploreSolutions}</a>
                </div>
            </div>
        </div>
    `).join('');
}

/**
 * Renderiza a página de detalhes do processo
 */
function renderProcessDetail() {
    const container = document.querySelector('[data-render="process-detail"]');
    if (!container || !window.RECOM_CONFIG) return;

    const slug = window.location.pathname.split('/').pop().replace('.html', '');
    const process = window.RECOM_CONFIG.processes.find(p => p.slug === slug);

    if (!process || !process.content) return;

    const isSubdir = window.location.pathname.includes('/processos/') || window.location.pathname.includes('/fornecedores/');
    const rootPath = isSubdir ? '../' : '';

    const content = process.content;
    const SiteHooks = getSiteHooks();
    const AnalyticsEvents = getAnalyticsEvents();
    const UIStrings = getUIStrings();

    container.innerHTML = `
        <section class="container py-2xl">
            <div class="section-header">
                <h1 class="section-title">${process.name}</h1>
                <p class="section-lead">${content.hero}</p>
            </div>
        </section>

        <section class="container my-2xl">
            <div class="cluster gap-xl items-start stack-mobile">
                <div class="flex-2 stack gap-md">
                    <h2 class="text-xl">${content.applications.title}</h2>
                    <p class="text-muted">${content.applications.text}</p>
                    <ul class="stack gap-xs mt-md pl-md text-muted">
                        ${content.applications.items.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
                <div class="flex-1">
                    <div class="card-media aspect-video h-200 shadow-sm rounded-sm overflow-hidden">
                        <img src="${rootPath}assets/images/optimized/${process.image}" alt="${process.name}" class="h-full object-cover">
                    </div>
                </div>
            </div>
        </section>

        ${content.brands ? `
        <section class="container my-2xl p-xl bg-muted rounded-sm">
            <h2 class="mb-lg">Principais Marcas para este Processo</h2>
            <div class="grid">
                ${content.brands.map(b => `
                    <div class="stack gap-xs">
                        <strong>${b.name}</strong>
                        <p class="text-small muted">${b.desc}</p>
                    </div>
                `).join('')}
            </div>
        </section>
        ` : ''}

        ${content.faq ? `
        <section class="container my-2xl">
            <h2 class="mb-lg">Guia Rápido de Seleção</h2>
            <div class="stack gap-md">
                ${content.faq.map(f => `
                    <details class="p-sm border-wire rounded-sm">
                        <summary class="text-bold cursor-pointer">${f.q}</summary>
                        <p class="text-small muted mt-xs">${f.a}</p>
                    </details>
                `).join('')}
            </div>
        </section>
        ` : ''}

        <section class="container my-2xl p-xl border-wire bg-white rounded-sm">
            <h2 class="text-xl">Como cotar itens de ${process.name}</h2>
            <p class="text-muted mt-sm">Para agilizar seu retorno, tente informar:</p>
            <ul class="stack gap-xs mt-md pl-md text-muted text-small">
                <li>Dados específicos da peça e material.</li>
                <li>Operação desejada e máquina disponível.</li>
            </ul>
            <div class="mt-lg">
                <a href="${rootPath}contato.html" class="button" data-slot="primary-action" data-event="${AnalyticsEvents.whatsappClick || 'whatsapp_click'}">${UIStrings.buttons.requestQuote}</a>
            </div>
        </section>
    `;
}

/**
 * Renderiza o grid de promoções
 */
function renderPromotions(containerId) {
    const selector = containerId ? `#${containerId}` : '[data-render="promotions"]';
    const grid = document.querySelector(selector);
    if (!grid || !window.RECOM_CONFIG || !window.RECOM_CONFIG.promotions) return;

    const SiteHooks = getSiteHooks();

    grid.innerHTML = window.RECOM_CONFIG.promotions.map(p => `
        <div class="card stack p-md" data-component="PromotionCard" data-hook="${SiteHooks.promotions?.card || 'promotions.card'}">
            <span class="text-small text-bold text-brand uppercase" data-slot="category">${p.category}</span>
            <h3 data-slot="title">${p.title}</h3>
            <p class="text-small muted" data-slot="description">${p.description}</p>
            <div class="mt-auto pt-md border-top">
                <span class="${p.isExpired ? 'is-expired' : 'muted'} text-small" data-slot="validity">${p.validUntil}</span>
                <a href="contato.html" class="button w-full mt-sm" data-slot="action">${p.cta}</a>
            </div>
        </div>
    `).join('');
}

// Exportação global
window.RECOM_COMPONENTS = {
    loadComponents,
    renderSuppliers,
    renderProcesses,
    renderPromotions,
    renderSupplierDetail,
    renderProcessDetail
};

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    // 1. Binder para conteúdo estático
    const staticContent = document.body.innerHTML;
    document.body.innerHTML = applyConfig(staticContent);
    
    // 2. Carrega componentes dinâmicos
    loadComponents().then(() => {
        // 3. Renderiza dados dinâmicos baseados nos atributos data-render (Auto-init)
        renderSuppliers();
        renderProcesses();
        renderPromotions();
        renderSupplierDetail();
        renderProcessDetail();
    });
});
