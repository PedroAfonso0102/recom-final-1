/**
 * UIStrings Contract
 * Centraliza todos os textos fixos de interface (CTAs, Labels, Placeholders).
 */
export const UIStrings = {
    buttons: {
        viewDetails: "Ver detalhes",
        viewCatalog: "Catálogo ↗",
        requestQuote: "Solicitar orçamento",
        speakToExpert: "Falar com Consultor",
        exploreSolutions: "Explorar Soluções",
        sendContact: "Enviar Mensagem",
        backToHome: "Voltar ao Início",
    },
    labels: {
        supplier: "Fornecedor",
        process: "Processo",
        promotion: "Promoção",
        catalogs: "Catálogos Técnicos",
        applications: "Aplicações Recomendadas",
        brands: "Marcas Relacionadas",
    },
    placeholders: {
        name: "Seu nome ou empresa",
        email: "seu@email.com.br",
        message: "Como podemos ajudar sua produção hoje?",
    },
    messages: {
        formSuccess: "Mensagem enviada! Retornaremos em breve.",
        formError: "Erro ao enviar. Tente novamente por telefone.",
        loading: "Carregando...",
    }
};

if (typeof window !== 'undefined') {
    window.UIStrings = UIStrings;
}
