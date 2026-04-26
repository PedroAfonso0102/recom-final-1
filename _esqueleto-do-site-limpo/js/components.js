/**
 * RECOM Component Loader
 * Carrega fragmentos HTML modulares e gerencia caminhos relativos automaticamente.
 */

document.addEventListener('DOMContentLoaded', () => {
    const components = document.querySelectorAll('[data-component]');
    
    // Calcula a profundidade do arquivo atual para ajustar o ROOT
    // Ex: index.html -> "", fornecedores/kifix.html -> "../"
    const pathDepth = window.location.pathname.split('/').filter(p => p !== "" && !p.includes('.html')).length;
    // No Windows, o path pode ser diferente dependendo de como é aberto, 
    // mas em um servidor ou local estável, essa lógica funciona.
    // Vamos usar uma abordagem baseada no número de pastas após a raiz do projeto.
    
    // Simplificando para o cenário do projeto:
    // Se estiver em uma subpasta (processos/ ou fornecedores/), o root é "../"
    // Se estiver na raiz, o root é ""
    const isSubdir = window.location.pathname.includes('/processos/') || window.location.pathname.includes('/fornecedores/');
    const rootPath = isSubdir ? '../' : '';

    components.forEach(async (el) => {
        const componentName = el.getAttribute('data-component');
        const componentPath = `${rootPath}components/${componentName}.html`;

        // Verifica se está rodando via arquivo local (file://)
        if (window.location.protocol === 'file:') {
            console.error('CORS Error: Fetching local files is blocked by modern browsers.');
            el.innerHTML = `
                <div style="border: 2px dashed red; padding: 1rem; margin: 1rem; background: #fff1f1;">
                    <strong style="color:red;">Erro de Segurança (CORS)</strong><br>
                    Componentes modulares não carregam ao abrir o arquivo direto da pasta.<br>
                    <small>Por favor, use um servidor local (ex: Extensão Live Server do VS Code ou comando <code>npx serve</code>).</small>
                </div>`;
            return;
        }

        try {
            const response = await fetch(componentPath);
            if (!response.ok) throw new Error(`Erro ao carregar componente: ${componentName}`);
            
            let html = await response.text();
            
            // Substitui o placeholder {{ROOT}} pelo caminho calculado
            html = html.replace(/{{ROOT}}/g, rootPath);
            
            el.innerHTML = html;
        } catch (error) {
            console.error(error);
            el.innerHTML = `<p style="color:red;">Erro ao carregar ${componentName}</p>`;
        }
    });
});
