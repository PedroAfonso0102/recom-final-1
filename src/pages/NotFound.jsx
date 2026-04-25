import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import SEOHead from '../components/SEOHead';
import { recomStyleHooks } from '../styles/recom/styleRegistry';

const NotFound = () => {
  return (
    <Layout>
      <SEOHead
        title="Página não encontrada"
        description="A página que você procura não foi encontrada. Navegue pelas soluções e fornecedores da RECOM Metal Duro."
        noindex
      />
      <main
        id="main-content"
        tabIndex={-1}
        data-recom-page={recomStyleHooks.pages.notFound}
      >
        <section
          data-recom-component={recomStyleHooks.components.emptyState}
          data-recom-state={recomStyleHooks.states.empty}
          data-recom-section={recomStyleHooks.sections.notFoundBody}
        >
          <strong>404</strong>
          <h1 data-recom-slot="title">Página não encontrada</h1>
          <p>
            Não encontramos esta página. Ela pode ter mudado de endereço, ou o link pode estar incompleto.
            Use um dos caminhos abaixo para continuar.
          </p>
          <nav data-recom-component={recomStyleHooks.components.navMenu}>
            <ul>
              <li>
                <Link
                  to="/"
                  data-recom-component={recomStyleHooks.components.textLink}
                  data-recom-variant={recomStyleHooks.variants.inline}
                >
                  Voltar ao início
                </Link>
              </li>
              <li>
                <Link
                  to="/fornecedores-catalogos"
                  data-recom-component={recomStyleHooks.components.textLink}
                  data-recom-variant={recomStyleHooks.variants.inline}
                >
                  Fornecedores e catálogos
                </Link>
              </li>
              <li>
                <Link
                  to="/solucoes"
                  data-recom-component={recomStyleHooks.components.textLink}
                  data-recom-variant={recomStyleHooks.variants.inline}
                >
                  Soluções por processo
                </Link>
              </li>
              <li>
                <Link
                  to="/contato"
                  data-recom-component={recomStyleHooks.components.textLink}
                  data-recom-variant={recomStyleHooks.variants.inline}
                >
                  Contato e orçamento
                </Link>
              </li>
            </ul>
          </nav>
        </section>
      </main>
    </Layout>
  );
};

export default NotFound;
