import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import SEOHead from '../components/SEOHead';
import { fornecedores, getCatalogosDoFornecedor, getFornecedorCatalogoPrincipal, hasCatalogoValido } from '../data/fornecedores';

const FornecedoresCatalogos = () => {
  return (
    <Layout>
      <SEOHead
        title="Fornecedores e Catálogos"
        description="Consulte os fornecedores com os quais a RECOM trabalha e acesse os catálogos oficiais para orientar sua cotação, aplicação ou seleção de ferramentas."
      />

      <main>
        <section>
          <h1>Fornecedores e Catálogos</h1>
          <p>
            Consulte os fornecedores com os quais a RECOM trabalha e acesse os catálogos oficiais
            para orientar sua cotação, aplicação ou seleção de ferramentas.
          </p>
        </section>

        <section className="grid">
          {fornecedores.map((fornecedor) => {
            const catalogos = getCatalogosDoFornecedor(fornecedor);
            const catalogoPrincipal = getFornecedorCatalogoPrincipal(fornecedor);
            const catalogoDisponivel = hasCatalogoValido(fornecedor);

            return (
              <div key={fornecedor.id} style={{ border: '1px solid #ccc', padding: '1rem' }}>
                {fornecedor.destaque && <strong>[Principal]</strong>}
                <img
                  src={fornecedor.logo}
                  alt={fornecedor.nome}
                  width="150"
                />
                <h2>{fornecedor.nome}</h2>
                <p>{fornecedor.descricaoCurta}</p>
                
                <div>
                  {catalogoDisponivel ? (
                    <a href={catalogoPrincipal.url} target="_blank" rel="noopener noreferrer">
                      Acessar catálogo oficial
                    </a>
                  ) : (
                    <Link to="/contato">Solicitar apoio da RECOM</Link>
                  )}
                  <br />
                  <Link to={`/fornecedores-catalogos/${fornecedor.slug}`}>
                    Ver detalhes do fornecedor
                  </Link>
                </div>

                {catalogos.length > 0 && (
                  <details>
                    <summary>Catálogos disponíveis ({catalogos.length})</summary>
                    <ul>
                      {catalogos.map((catalogo) => (
                        <li key={catalogo.url}>
                          <a href={catalogo.url} target="_blank" rel="noopener noreferrer">
                            {catalogo.nome || 'Catálogo Oficial'}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </details>
                )}
              </div>
            );
          })}
        </section>

        <section>
          <p>Não encontrou o fornecedor ou catálogo que precisa? Envie sua aplicação, código ou operação e a RECOM indica o caminho certo.</p>
          <Link to="/contato">Solicitar orientação</Link>
        </section>
      </main>
    </Layout>
  );
};

export default FornecedoresCatalogos;

