import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import Layout from '../components/Layout';
import SEOHead from '../components/SEOHead';
import { mensagensGlobais } from '../data/contato';
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
  const processosRelacionados = processos.filter((processo) =>
    fornecedor.processosRelacionados.includes(processo.id)
  );
  const outrosFornecedores = fornecedores.filter((item) => item.id !== fornecedor.id);

  return (
    <Layout>
      <SEOHead
        title={`${fornecedor.nome} - Fornecedor e catálogos oficiais`}
        description={`${fornecedor.descricaoCurta} Consulte catálogos oficiais e fale com a RECOM para orientação comercial.`}
        canonical={`/fornecedores-catalogos/${fornecedor.slug}`}
      />

      <main>
        <section>
          <p>Fornecedor | Catálogos oficiais | Orientação comercial</p>
          <h1>{fornecedor.nome}</h1>
          <p>{fornecedor.descricaoCurta}</p>
          <p>
            Esta página organiza a marca no contexto comercial da RECOM. Para especificação final,
            disponibilidade, preço ou condição, fale com a equipe.
          </p>
          <img src={fornecedor.logo} alt={fornecedor.altText || fornecedor.nome} width="200" />
          <div className="flex">
            {catalogoDisponivel ? (
              <a href={catalogoPrincipal.url} target="_blank" rel="noopener noreferrer">
                Acessar catálogo oficial da {fornecedor.nome}
              </a>
            ) : (
              <Link to="/contato">Solicitar catálogo ou orientação sobre {fornecedor.nome}</Link>
            )}
            <Link to="/contato">Solicitar orientação comercial</Link>
          </div>
        </section>

        <div className="grid">
          <div>
            <section>
              <h2>Resumo da marca no contexto da RECOM</h2>
              <p>{fornecedor.descricao}</p>
              {fornecedor.linkInstitucional ? (
                <p>
                  Site institucional oficial:{' '}
                  <a href={fornecedor.linkInstitucional} target="_blank" rel="noopener noreferrer">
                    {fornecedor.linkInstitucional}
                  </a>
                </p>
              ) : (
                <p>{mensagensGlobais.linkExternoIndisponivel}</p>
              )}
            </section>

            <section>
              <h2>Catálogos oficiais</h2>
              {catalogos.length > 0 ? (
                <>
                  <p>Links externos abrem materiais do fabricante ou da marca em nova aba.</p>
                  <ul>
                    {catalogos.map((catalogo) => (
                      <li key={catalogo.url}>
                        <a href={catalogo.url} target="_blank" rel="noopener noreferrer">
                          {catalogo.label || `Catálogo oficial da ${fornecedor.nome}`}
                        </a>
                      </li>
                    ))}
                  </ul>
                  <p>
                    <small>
                      A RECOM organiza o acesso, mas o conteúdo externo, disponibilidade e versões
                      dos catálogos dependem do fornecedor.
                    </small>
                  </p>
                </>
              ) : (
                <p>{mensagensGlobais.fornecedorSemCatalogo}</p>
              )}
            </section>

            <section>
              <h2>Processos ou linhas relacionadas</h2>
              {processosRelacionados.length > 0 ? (
                <ul>
                  {processosRelacionados.map((processo) => (
                    <li key={processo.id}>
                      <Link to={`/solucoes/${processo.slug}`}>
                        {processo.nome}: {processo.descricaoCurta}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>{mensagensGlobais.processoSemFornecedor}</p>
              )}
            </section>
          </div>

          <aside>
            <section>
              <h2>Quando falar com a RECOM</h2>
              <ul>
                <li>Quando você tem código ou referência da marca.</li>
                <li>Quando precisa consultar disponibilidade comercial.</li>
                <li>Quando não encontrou a linha correta no catálogo oficial.</li>
              </ul>
              <Link to="/contato">Falar com a RECOM sobre {fornecedor.nome}</Link>
            </section>

            <section>
              <h2>Retorno e navegação</h2>
              <ul>
                <li><Link to="/fornecedores-catalogos">Voltar para fornecedores e catálogos</Link></li>
                <li><Link to="/solucoes">Ver soluções por processo</Link></li>
                {outrosFornecedores.map((item) => (
                  <li key={item.id}>
                    <Link to={`/fornecedores-catalogos/${item.slug}`}>Ver {item.nome}</Link>
                  </li>
                ))}
              </ul>
            </section>
          </aside>
        </div>
      </main>
    </Layout>
  );
};

export default FornecedorPage;
