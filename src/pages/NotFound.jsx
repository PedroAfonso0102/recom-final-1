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
          <h1>Página não encontrada</h1>
          <p>
            A página que você está procurando pode ter sido movida ou não está mais disponível.
          </p>
          <nav>
            <ul>
              <li><Link to="/">Voltar ao Início</Link></li>
              <li><Link to="/fornecedores-catalogos">Fornecedores e Catálogos</Link></li>
              <li><Link to="/solucoes">Soluções por processo</Link></li>
              <li><Link to="/contato">Fale Conosco</Link></li>
            </ul>
          </nav>
        </section>
      </main>
    </Layout>
  );
};

export default NotFound;

