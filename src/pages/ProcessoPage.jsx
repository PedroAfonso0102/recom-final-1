import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import Layout from '../components/Layout';
import SEOHead from '../components/SEOHead';
import { getProcessoBySlug, processos } from '../data/processos';
import { fornecedores } from '../data/fornecedores';

const ProcessoPage = () => {
  const { slug } = useParams();
  const processo = getProcessoBySlug(slug);

  if (!processo) {
    return <Navigate to="/solucoes" replace />;
  }

  const fornecedoresRelacionados = fornecedores.filter((fornecedor) =>
    processo.fornecedoresRelacionados.includes(fornecedor.id)
  );

  const outrosProcessos = processos.filter((p) => p.id !== processo.id);

  return (
    <Layout>
      <SEOHead
        title={processo.metaTitle.split(' | ')[0]}
        description={processo.metaDescription}
        canonical={`/solucoes/${processo.slug}`}
      />

      <main>
        <section>
          <p>Soluções por processo | {fornecedoresRelacionados.length} fornecedores</p>
          <h1>{processo.nome}</h1>
          <p><strong>{processo.descricaoCurta}</strong></p>
          <p>{processo.descricao}</p>
          <p>
            Se você já tem o código, o nome da peça ou a dúvida de aplicação, siga pelos atalhos abaixo para chegar ao catálogo, ao fornecedor ou ao contato certo.
          </p>

          <div className="flex">
            <Link to="/contato">Solicitar Orçamento</Link>
            <Link to="/fornecedores-catalogos">Ver fornecedores</Link>
          </div>
        </section>

        <div className="grid">
          <div>
            <section>
              <h2>Escolha o caminho certo para esta operação</h2>
              <p>Selecione a opção que combina com a informação que você já tem.</p>
              <div className="grid">
                {processo.atalhos.map((atalho) => (
                  <div key={atalho.titulo} style={{ border: '1px solid #ccc', padding: '1rem' }}>
                    <h3>{atalho.titulo}</h3>
                    <p>{atalho.descricao}</p>
                    <Link to={atalho.to === 'catalogo-principal' ? '/fornecedores-catalogos' : atalho.to}>
                      {atalho.ctaLabel}
                    </Link>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2>Marcas mais aderentes a {processo.nome.toLowerCase()}</h2>
              {fornecedoresRelacionados.length > 0 ? (
                <div className="grid">
                  {fornecedoresRelacionados.map((f) => (
                    <div key={f.id} style={{ border: '1px solid #ccc', padding: '1rem' }}>
                      <img src={f.logo} alt={f.nome} width="100" />
                      <h3>{f.nome}</h3>
                      <p>{f.descricaoCurta}</p>
                      <Link to={`/fornecedores-catalogos/${f.slug}`}>Ver fornecedor</Link>
                    </div>
                  ))}
                </div>
              ) : (
                <p>Ainda não há fornecedores mapeados para este processo.</p>
              )}
            </section>

            <section>
              <h2>Explore outras rotas de usinagem</h2>
              <ul>
                {outrosProcessos.map((p) => (
                  <li key={p.id}>
                    <Link to={`/solucoes/${p.slug}`}>{p.nome}</Link>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside>
            <section>
              <h2>Suporte comercial</h2>
              <p>Precisa de ferramentas para {processo.nome.toLowerCase()}?</p>
              <Link to="/contato">Entrar em contato</Link>
            </section>

            <section>
              <h2>Palavras-chave</h2>
              <ul>
                {processo.keywords.map((k) => (
                  <li key={k}>{k}</li>
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

