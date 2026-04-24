import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import Layout from '../components/Layout';
import SEOHead from '../components/SEOHead';
import { getFornecedorBySlug, fornecedores, getCatalogosDoFornecedor, getFornecedorCatalogoPrincipal, hasCatalogoValido } from '../data/fornecedores';
import { processos } from '../data/processos';

const FornecedorPage = () => {
  const { slug } = useParams();
  const fornecedor = getFornecedorBySlug(slug);

  if (!fornecedor) {
    return <Navigate to="/fornecedores-catalogos" replace />;
  }

  const catalogos = getCatalogosDoFornecedor(fornecedor);
  const catalogoPrincipal = getFornecedorCatalogoPrincipal(fornecedor);
  const catalogoDisponivel = hasCatalogoValido(fornecedor);
  const catalogosSecundarios = catalogos.slice(1);

  const processosRelacionados = processos.filter(
    p => fornecedor.processosRelacionados.includes(p.id)
  );

  const outrosFornecedores = fornecedores.filter(f => f.id !== fornecedor.id);

  return (
    <Layout>
      <SEOHead
        title={`${fornecedor.nome} — Fornecedor Parceiro`}
        description={`${fornecedor.descricaoCurta} Distribuído pela RECOM Metal Duro em Campinas-SP.`}
        canonical={`/fornecedores-catalogos/${fornecedor.slug}`}
      />

      <main>
        <section>
          <p>Fornecedor parceiro {fornecedor.destaque && '| Principal'}</p>
          <h1>{fornecedor.nome}</h1>
          <p><strong>{fornecedor.descricaoCurta}</strong></p>
          <p>
            A RECOM atua como ponte comercial entre sua necessidade de usinagem e o catálogo oficial desta marca.
          </p>
          <img
            src={fornecedor.logo}
            alt={fornecedor.nome}
            width="200"
          />
        </section>

        <div className="grid">
          <div>
            <section>
              <h2>Sobre a marca</h2>
              <p>{fornecedor.descricao}</p>
              {fornecedor.linkInstitucional && (
                <p>
                  Site institucional oficial: <a href={fornecedor.linkInstitucional} target="_blank" rel="noopener noreferrer">{fornecedor.linkInstitucional}</a>
                </p>
              )}
            </section>

            <section>
              <h2>Catálogos oficiais</h2>
              {catalogoDisponivel ? (
                <>
                  <p>Acesse os materiais da marca:</p>
                  <ul>
                    <li>
                      <a href={catalogoPrincipal.url} target="_blank" rel="noopener noreferrer">
                        Acessar catálogo oficial da {fornecedor.nome}
                      </a>
                    </li>
                    {catalogosSecundarios.map((catalogo) => (
                      <li key={catalogo.url}>
                        <a href={catalogo.url} target="_blank" rel="noopener noreferrer">
                          Acessar catálogo complementar da {fornecedor.nome}
                        </a>
                      </li>
                    ))}
                  </ul>
                  <p><small>Este link abre o site oficial do fabricante em nova aba. A RECOM não controla o conteúdo externo.</small></p>
                </>
              ) : (
                <p>Catálogo ainda não disponibilizado. Fale com a equipe para obter informações.</p>
              )}
            </section>

            {processosRelacionados.length > 0 && (
              <section>
                <h2>Processos atendidos</h2>
                <ul>
                  {processosRelacionados.map((p) => (
                    <li key={p.id}>
                      <Link to={`/solucoes/${p.slug}`}>
                        <strong>{p.nome}</strong>: {p.descricaoCurta}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          <aside>
            <section>
              <h2>Suporte comercial</h2>
              <p>Solicite um orçamento para ferramentas {fornecedor.nome}:</p>
              <Link to="/contato">Entrar em contato</Link>
            </section>

            <section>
              <h2>Contexto comercial</h2>
              <p>
                {fornecedor.observacoes || 'A RECOM usa esta marca como referência de linha e catálogo oficial dentro do hub.'}
              </p>
            </section>

            {outrosFornecedores.length > 0 && (
              <section>
                <h2>Explore outros fornecedores</h2>
                <ul>
                  {outrosFornecedores.map(f => (
                    <li key={f.id}>
                      <Link to={`/fornecedores-catalogos/${f.slug}`}>
                        {f.nome}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </aside>
        </div>
      </main>
    </Layout>
  );
};

export default FornecedorPage;
