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
          <p>Distribuidor de ferramentas para usinagem | Campinas-SP</p>
          <h1>A RECOM</h1>
          <p>
            A RECOM atua como um elo estratégico entre a indústria e os principais fabricantes 
            globais de ferramentas para usinagem. Com sede em Campinas-SP, oferecemos 
            atendimento comercial especializado para orientar sua empresa na escolha das 
            melhores soluções técnicas.
          </p>
          <p>
            Nosso papel é simplificar o acesso a catálogos oficiais, marcas consolidadas e 
            processos de cotação, garantindo que sua demanda técnica receba o direcionamento 
            comercial adequado.
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
          <h2>Presença e Atendimento</h2>
          <p>
            Fundada em 1990, a RECOM consolidou sua presença no mercado industrial através de um 
            atendimento focado em resultados e na parceria com fornecedores de alta performance, 
            como a Mitsubishi Materials.
          </p>
          <p>
            Operamos com uma estrutura ágil para atender solicitações de orçamento, consulta de 
            disponibilidade e suporte técnico na especificação de ferramentas de corte.
          </p>
        </section>

        <section>
          <h2>Como atuamos</h2>
          <p>
            Diferente de um e-commerce tradicional, a RECOM prioriza a orientação consultiva. 
            Acreditamos que cada operação de usinagem possui particularidades que exigem a 
            ferramenta correta e o suporte de catálogos oficiais atualizados.
          </p>
          <ul>
            <li>Recebemos sua demanda por código, desenho ou especificação técnica.</li>
            <li>Identificamos os fornecedores e catálogos mais adequados para a aplicação.</li>
            <li>Oferecemos o caminho comercial direto para orçamento e fechamento.</li>
          </ul>
        </section>

        <section>
          <h2>Foco no Cliente Industrial</h2>
          <p>
            Nossa plataforma organiza o acesso a links oficiais de consulta. Quando uma marca 
            específica não possui catálogo cadastrado, nossa equipe está pronta para fornecer a 
            orientação necessária via canais diretos.
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
