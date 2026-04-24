import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import SEOHead from '../components/SEOHead';
import { processos } from '../data/processos';
import { fornecedores } from '../data/fornecedores';
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
        description="Encontre fornecedores, catálogos e caminhos de atendimento a partir da operação de usinagem."
      />

      <main>
        <section>
          <p>Por operação | Torneamento, fresamento e furação</p>
          <h1>Soluções por processo</h1>
          <p>
            Encontre fornecedores, catálogos e caminhos de atendimento a partir da operação de usinagem.
          </p>
          <p>
            A RECOM ajuda a cruzar ferramenta, aplicação e fornecedor para que o cliente avance com mais segurança na cotação ou na definição do processo.
          </p>

          <div className="flex">
            <Link to="/contato">Entrar em contato</Link>
            <Link to="/fornecedores-catalogos">Ver fornecedores</Link>
          </div>

          <img src={editorialImg} alt="Soluções RECOM" width="400" />
        </section>

        <section>
          <h2>Como a RECOM atua</h2>
          <p>A RECOM vende ferramentas para usinagem e apoia o cliente na leitura da aplicação.</p>
          <ol>
            <li>Informe a operação, material, código ou dados da peça.</li>
            <li>A RECOM cruza a aplicação com fornecedores e catálogos oficiais.</li>
            <li>Você segue para cotação ou validação com menos dúvida e retrabalho.</li>
          </ol>
        </section>

        <section>
          <h2>Escolha o processo de usinagem</h2>
          <label htmlFor="processo-select">Selecionar processo: </label>
          <select
            id="processo-select"
            defaultValue=""
            onChange={handleProcessSelect}
          >
            <option value="" disabled>Ir direto para...</option>
            {processos.map((processo) => (
              <option key={processo.id} value={processo.slug}>
                {processo.nome}
              </option>
            ))}
          </select>
        </section>

        <section className="grid">
          {processos.map((processo) => {
            const relatedCount = fornecedores.filter((fornecedor) =>
              processo.fornecedoresRelacionados.includes(fornecedor.id)
            ).length;

            return (
              <div key={processo.id} style={{ border: '1px solid #ccc', padding: '1rem' }}>
                <h2>{processo.nome}</h2>
                <p>{processo.descricaoCurta}</p>
                <p><small>{relatedCount} fornecedores relacionados</small></p>
                <Link to={`/solucoes/${processo.slug}`}>Ver processo</Link>
              </div>
            );
          })}
        </section>

        <section>
          <h2>Ainda não sabe qual processo seguir?</h2>
          <p>
            Envie os dados da peça, material, operação ou código de referência.
          </p>
          <div className="flex">
            <Link to="/contato">Solicitar orientação</Link>
            <Link to="/fornecedores-catalogos">Ver fornecedores</Link>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default Solucoes;
