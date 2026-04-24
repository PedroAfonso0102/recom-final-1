import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import SEOHead from '../components/SEOHead';
import { processos } from '../data/processos';
import { fornecedores } from '../data/fornecedores';
import { mensagensGlobais } from '../data/contato';
import editorialImg from '../assets/images/optimized/recom-editorial-3.jpg';

const Solucoes = () => {
  const navigate = useNavigate();

  const handleProcessSelect = (event) => {
    const { value } = event.target;
    if (value) {
      navigate(`/solucoes/${value}`);
    }
  };

  return (
    <Layout>
      <SEOHead
        title="Soluções por processo"
        description="Encontre caminhos por tipo de operação e consulte fornecedores relacionados a cada processo de usinagem."
        canonical="/solucoes"
      />

      <main>
        <section>
          <p>Por aplicação | Por operação | Por necessidade comercial</p>
          <h1>Soluções por processo</h1>
          <p>
            Encontre caminhos por tipo de operação e consulte fornecedores relacionados a cada
            processo. Esta seção atende quem sabe a aplicação, mas ainda não sabe qual marca ou
            catálogo consultar.
          </p>
          <div className="flex">
            <Link to="/contato">Solicitar orientação comercial</Link>
            <Link to="/fornecedores-catalogos">Ver fornecedores e catálogos</Link>
          </div>
          <img src={editorialImg} alt="Ferramentas e aplicações de usinagem" width="400" />
        </section>

        <section>
          <h2>Como navegar por processo</h2>
          <ol>
            <li>Escolha o processo mais próximo da operação.</li>
            <li>Veja fornecedores e catálogos úteis relacionados.</li>
            <li>Envie código, aplicação ou dúvida para a RECOM quando precisar de orientação.</li>
          </ol>
        </section>

        <section>
          <h2>Ir direto para um processo</h2>
          <label htmlFor="processo-select">Selecionar processo</label>
          <select id="processo-select" defaultValue="" onChange={handleProcessSelect}>
            <option value="" disabled>Escolha um processo</option>
            {processos.map((processo) => (
              <option key={processo.id} value={processo.slug}>
                {processo.nome}
              </option>
            ))}
          </select>
        </section>

        <section>
          <h2>Processos cadastrados</h2>
          {processos.length === 0 ? (
            <p>{mensagensGlobais.listaVazia}</p>
          ) : (
            <div className="grid">
              {processos.map((processo) => {
                const relacionados = fornecedores.filter((fornecedor) =>
                  processo.fornecedoresRelacionados.includes(fornecedor.id)
                );

                return (
                  <article key={processo.id} style={{ border: '1px solid #ccc', padding: '1rem' }}>
                    <h3>{processo.nome}</h3>
                    <p>{processo.descricaoCurta}</p>
                    <p>
                      <strong>Fornecedores relacionados:</strong>{' '}
                      {relacionados.length > 0
                        ? relacionados.map((fornecedor) => fornecedor.nome).join(', ')
                        : 'não mapeado no site'}
                    </p>
                    <div className="flex">
                      <Link to={`/solucoes/${processo.slug}`}>Ver processo</Link>
                      <Link to="/contato">Falar com a RECOM</Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        <section>
          <h2>Ainda não sabe qual processo seguir?</h2>
          <p>
            Envie os dados da peça, material, operação, código de referência ou marca desejada. A
            RECOM ajuda a escolher se o próximo passo é fornecedor, catálogo ou orçamento.
          </p>
          <div className="flex">
            <Link to="/contato">Enviar aplicação para orientação</Link>
            <Link to="/fornecedores-catalogos">Consultar fornecedores primeiro</Link>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default Solucoes;
