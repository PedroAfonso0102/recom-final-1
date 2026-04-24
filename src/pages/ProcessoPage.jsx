import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import Layout from '../components/Layout';
import SEOHead from '../components/SEOHead';
import { getProcessoBySlug, processos } from '../data/processos';
import { fornecedores, getCatalogosDoFornecedor } from '../data/fornecedores';
import { mensagensGlobais } from '../data/contato';

const ProcessoPage = () => {
  const { slug } = useParams();
  const processo = getProcessoBySlug(slug);

  if (!processo) {
    return <Navigate to="/solucoes" replace />;
  }

  const fornecedoresRelacionados = fornecedores.filter((fornecedor) =>
    processo.fornecedoresRelacionados.includes(fornecedor.id)
  );
  const outrosProcessos = processos.filter((item) => item.id !== processo.id);
  const catalogosUteis = fornecedoresRelacionados.flatMap((fornecedor) =>
    getCatalogosDoFornecedor(fornecedor).map((catalogo) => ({
      ...catalogo,
      fornecedor: fornecedor.nome,
    }))
  );

  return (
    <Layout>
      <SEOHead
        title={processo.metaTitle.split(' | ')[0]}
        description={processo.metaDescription}
        canonical={`/solucoes/${processo.slug}`}
      />

      <main>
        <section>
          <p>Soluções por processo | {fornecedoresRelacionados.length} fornecedores relacionados</p>
          <h1>{processo.nome}</h1>
          <p>{processo.descricaoCurta}</p>
          <p>{processo.descricao}</p>
          <div className="flex">
            <Link to="/contato">Solicitar orientação comercial</Link>
            <Link to="/solucoes">Voltar para soluções por processo</Link>
          </div>
        </section>

        <div className="grid">
          <div>
            <section>
              <h2>Quando este processo aparece na demanda</h2>
              <ul>
                {processo.atalhos.map((atalho) => (
                  <li key={atalho.titulo}>
                    <strong>{atalho.titulo}:</strong> {atalho.descricao}{' '}
                    <Link to={atalho.to === 'catalogo-principal' ? '/fornecedores-catalogos' : atalho.to}>
                      {atalho.ctaLabel}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2>Fornecedores relacionados</h2>
              {fornecedoresRelacionados.length > 0 ? (
                <div className="grid">
                  {fornecedoresRelacionados.map((fornecedor) => (
                    <article key={fornecedor.id} style={{ border: '1px solid #ccc', padding: '1rem' }}>
                      <img src={fornecedor.logo} alt={fornecedor.altText || fornecedor.nome} width="100" />
                      <h3>{fornecedor.nome}</h3>
                      <p>{fornecedor.descricaoCurta}</p>
                      <Link to={`/fornecedores-catalogos/${fornecedor.slug}`}>
                        Ver fornecedor
                      </Link>
                    </article>
                  ))}
                </div>
              ) : (
                <p>{mensagensGlobais.processoSemFornecedor}</p>
              )}
            </section>

            <section>
              <h2>Catálogos úteis</h2>
              {catalogosUteis.length > 0 ? (
                <ul>
                  {catalogosUteis.map((catalogo) => (
                    <li key={`${catalogo.fornecedor}-${catalogo.url}`}>
                      <a href={catalogo.url} target="_blank" rel="noopener noreferrer">
                        {catalogo.label || 'Catálogo oficial'} - {catalogo.fornecedor}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>{mensagensGlobais.fornecedorSemCatalogo}</p>
              )}
            </section>

            <section>
              <h2>Perguntas frequentes de orientação</h2>
              <dl>
                <dt>Tenho apenas um código. O que envio?</dt>
                <dd>Envie o código, marca desejada e qualquer contexto de uso ou peça.</dd>
                <dt>Não sei qual fornecedor consultar.</dt>
                <dd>Use o formulário de contato e descreva processo, material, desenho ou aplicação.</dd>
                <dt>O catálogo oficial resolve tudo?</dt>
                <dd>Ele ajuda na consulta técnica, mas disponibilidade e condição comercial dependem de contato com a RECOM.</dd>
              </dl>
            </section>
          </div>

          <aside>
            <section>
              <h2>Próximo passo recomendado</h2>
              <p>
                Se a aplicação está clara, envie as informações para a RECOM avaliar o caminho
                comercial. Se ainda não está clara, compare outros processos antes.
              </p>
              <Link to="/contato">Solicitar orientação comercial</Link>
            </section>

            <section>
              <h2>Outros processos</h2>
              <ul>
                {outrosProcessos.map((item) => (
                  <li key={item.id}>
                    <Link to={`/solucoes/${item.slug}`}>{item.nome}</Link>
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

export default ProcessoPage;
