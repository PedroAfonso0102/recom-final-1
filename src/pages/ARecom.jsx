import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import SEOHead from '../components/SEOHead';
import empresaImg from '../assets/images/optimized/escritorio.jpg';
import { contato, institucional } from '../data/contato';
import { fornecedores } from '../data/fornecedores';

const ARecom = () => {
  return (
    <Layout>
      <SEOHead
        title="A RECOM - Distribuidor B2B para usinagem"
        description="Conheça a RECOM Metal Duro: atendimento técnico-comercial em Campinas-SP para fornecedores, catálogos e orçamentos de ferramentas para usinagem."
        canonical="/a-recom"
      />

      <main>
        <section>
          <p>Institucional | Campinas-SP | Atendimento técnico-comercial</p>
          <h1>A RECOM</h1>
          <p>
            A RECOM é um distribuidor B2B de ferramentas e soluções para usinagem. Seu papel no
            site é orientar empresas a encontrar fornecedores, catálogos oficiais e caminhos de
            contato para orçamento.
          </p>
          <p>
            A empresa atende a partir de Campinas-SP e atua como ponte comercial entre demandas
            industriais, marcas do setor e materiais oficiais de consulta.
          </p>
          <div className="flex">
            <Link to="/contato">Falar com a RECOM</Link>
            <Link to="/fornecedores-catalogos">Ver fornecedores e catálogos</Link>
          </div>
          <img src={empresaImg} alt="Ambiente institucional da RECOM" width="400" />
        </section>

        <section>
          <h2>Resumo institucional</h2>
          <p>{institucional.descricaoCurta}</p>
          <ul>
            <li>Empresa: {contato.empresa}</li>
            <li>Razão social: {contato.razaoSocial}</li>
            <li>CNPJ: {contato.cnpj}</li>
            <li>Base: {contato.endereco.completo}</li>
          </ul>
        </section>

        <section>
          <h2>História curta</h2>
          <p>
            O dado editorial disponível indica atuação desde {contato.fundacao}. Esse histórico
            deve ser usado de forma objetiva: presença comercial, atendimento a clientes industriais
            e continuidade no segmento de ferramentas para usinagem.
          </p>
          <p>
            TODO validação humana: confirmar documentos, marcos históricos e vínculos comerciais
            específicos antes de transformar esses pontos em afirmações institucionais finais.
          </p>
        </section>

        <section>
          <h2>Atuação atual</h2>
          <p>
            A RECOM não se apresenta como fabricante nem como e-commerce. A lógica comercial é
            orientar o cliente, organizar o acesso a fornecedores e receber solicitações de orçamento
            com contexto suficiente para direcionamento.
          </p>
          <ol>
            <li>Recebe demanda por código, marca, processo, desenho, peça ou aplicação.</li>
            <li>Relaciona a demanda a fornecedores e catálogos oficiais disponíveis.</li>
            <li>Encaminha o cliente para contato comercial, orçamento ou orientação complementar.</li>
          </ol>
        </section>

        <section>
          <h2>Relação com fornecedores e catálogos</h2>
          <p>
            O site organiza fornecedores cadastrados e links para catálogos oficiais. Quando um
            catálogo não estiver cadastrado, o próximo passo correto é falar com a RECOM.
          </p>
          <div className="grid">
            {fornecedores.map((fornecedor) => (
              <article key={fornecedor.id}>
                <h3>{fornecedor.nome}</h3>
                <p>{fornecedor.descricaoCurta}</p>
                <Link to={`/fornecedores-catalogos/${fornecedor.slug}`}>
                  Ver fornecedor e catálogos
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section>
          <h2>Como a RECOM ajuda o cliente</h2>
          <ul>
            <li>Identifica se a entrada mais útil é fornecedor, processo ou contato direto.</li>
            <li>Ajuda a transformar uma demanda solta em solicitação comercial compreensível.</li>
            <li>Indica catálogos oficiais quando há link cadastrado.</li>
            <li>Recebe informações técnicas básicas para orientar o orçamento.</li>
          </ul>
        </section>

        <section>
          <h2>Quando falar com a RECOM</h2>
          <ul>
            <li>Quando você tem código, desenho, peça, material ou aplicação.</li>
            <li>Quando não sabe qual fornecedor consultar.</li>
            <li>Quando encontrou o catálogo, mas precisa consultar disponibilidade ou condição comercial.</li>
            <li>Quando o catálogo oficial não está cadastrado no site.</li>
          </ul>
          <div className="flex">
            <Link to="/contato">Solicitar orçamento</Link>
            <Link to="/solucoes">Ver soluções por processo</Link>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default ARecom;
