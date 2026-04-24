import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import SEOHead from '../components/SEOHead';

const NotFound = () => {
  return (
    <Layout>
      <SEOHead
        title="Página não encontrada"
        description="A página que você procura não foi encontrada. Navegue pelas soluções e fornecedores da RECOM Metal Duro."
        noindex
      />
      <main>
        <section>
          <strong>404</strong>
          <h1>Não encontramos esta página.</h1>
          <p>
            A página pode ter mudado de endereço, ou o link pode estar incompleto.
            Use um dos caminhos abaixo para continuar.
          </p>
          <nav>
            <ul>
              <li><Link to="/">Início</Link></li>
              <li><Link to="/fornecedores-catalogos">Fornecedores e catálogos</Link></li>
              <li><Link to="/solucoes">Soluções por processo</Link></li>
              <li><Link to="/contato">Contato e orçamento</Link></li>
            </ul>
          </nav>
        </section>
      </main>
    </Layout>
  );
};

export default NotFound;

