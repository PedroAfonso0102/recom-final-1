/**
 * PublicNavigation
 * Mapa central da estrutura de navegação do site.
 */
export const PublicNavigation = [
    { label: "Início", href: "/", hook: "nav.home" },
    { label: "A RECOM", href: "/a-recom", hook: "nav.about" },
    { label: "Fornecedores & Catálogos", href: "/fornecedores-catalogos", hook: "nav.suppliers" },
    { label: "Soluções / Processos", href: "/solucoes", hook: "nav.processes" },
    { label: "Promoções", href: "/promocoes", hook: "nav.promotions" },
    { label: "Contato / Orçamento", href: "/contato", hook: "nav.contact" },
];

if (typeof window !== 'undefined') {
    window.PublicNavigation = PublicNavigation;
}
