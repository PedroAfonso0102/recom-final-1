import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import SEOHead from '../components/SEOHead';
import { contato, institucional } from '../data/contato';
import { fornecedores } from '../data/fornecedores';
import { processos } from '../data/processos';
import heroTecnicoImg from '../assets/images/optimized/egd-tecnico-gerada.jpg';
import pecasImg from '../assets/images/optimized/pecas.jpg';

const Home = () => {
  const principaisFornecedores = fornecedores.slice(0, 4);
  const principaisProcessos = processos.slice(0, 4);

  return (
    <Layout>
      <SEOHead
        title="RECOM Metal Duro - Fornecedores e catálogos para usinagem"
        description={institucional.descricaoCurta}
        canonical="/"
        ogImage={heroTecnicoImg}
      />

      <main>
        <section>
          <p>Distribuidor B2B | Atendimento em Campinas-SP e região</p>
          <h1>Ferramentas e Soluções para Usinagem</h1>
          <p>
            A RECOM conecta sua empresa a fornecedores globais, catálogos oficiais e
            orientação técnica para processos de torneamento, fresamento e furação.
            Encontre o caminho certo para sua solicitação de orçamento.
          </p>
          <div className="flex">
            <Link to="/contato">Solicitar orçamento</Link>
            <Link to="/fornecedores-catalogos">Ver fornecedores e catálogos</Link>
          </div>
        </section>

        <section>
          <h2>Como a RECOM atende sua demanda</h2>
          <p>
            Escolha o caminho mais adequado para sua necessidade atual:
          </p>
          <ul>
            <li><strong>Por marca:</strong> Consulte o catálogo oficial do fornecedor de interesse.</li>
            <li><strong>Por aplicação:</strong> Navegue pelas soluções disponíveis para cada processo de usinagem.</li>
            <li><strong>Direto com a RECOM:</strong> Envie seu desenho, código ou especificação para orientação técnica.</li>
          </ul>
        </section>

        <section>
          <h2>Atendimento Técnico-Comercial</h2>
          <p>
            Com base em Campinas-SP, a RECOM atua na distribuição de ferramentas de corte,
            facilitando o acesso a informações técnicas e marcas consolidadas no mercado de usinagem.
          </p>
          <p>
            Nosso foco é agilizar o processo de consulta e orçamento, oferecendo suporte direto
            para a definição das melhores soluções para sua operação.
          </p>
          <Link to="/a-recom">Sobre a RECOM</Link>
        </section>

        <section>
          <h2>Fornecedores e Catálogos Oficiais</h2>
          <p>
            Acesse as linhas de produtos e catálogos digitais das marcas atendidas pela RECOM.
            Para dúvidas sobre aplicações específicas, entre em contato.
          </p>
          <div className="grid">
            {principaisFornecedores.map((fornecedor) => (
              <article key={fornecedor.id}>
                <img src={fornecedor.logo} alt={fornecedor.nome} width="150" />
                <h3>{fornecedor.nome}</h3>
                <p>{fornecedor.descricaoCurta}</p>
                <Link to={`/fornecedores-catalogos/${fornecedor.slug}`}>
                  Ver página do fornecedor
                </Link>
              </article>
            ))}
          </div>
          <Link to="/fornecedores-catalogos">Ver todos os fornecedores</Link>
        </section>

        <section>
          <h2>Soluções por Processo</h2>
          <p>
            Localize as ferramentas ideais partindo do tipo de operação. Encontre fornecedores
            relacionados a cada etapa da sua produção.
          </p>
          <div className="grid">
            {principaisProcessos.map((processo) => (
              <article key={processo.id}>
                <h3>{processo.nome}</h3>
                <p>{processo.descricaoCurta}</p>
                <Link to={`/solucoes/${processo.slug}`}>Ver detalhes do processo</Link>
              </article>
            ))}
          </div>
          <Link to="/solucoes">Ver todos os processos</Link>
        </section>

        <section>
          <h2>Fale com a RECOM</h2>
          <p>
            Estamos prontos para orientar sua cotação. Informe o código da ferramenta, desenho
            ou o material da peça para um atendimento mais ágil.
          </p>
          <address>
            {contato.empresa}<br />
            {contato.endereco.completo}<br />
            Telefone: <a href={contato.telefone.href}>{contato.telefone.display}</a><br />
            E-mail: <a href={contato.email.href}>{contato.email.display}</a><br />
            WhatsApp: <a href={contato.whatsapp.hrefComMensagem} target="_blank" rel="noopener noreferrer">iniciar conversa</a>
          </address>
          <div className="flex">
            <Link to="/contato">Enviar solicitação pelo formulário</Link>
            <a href={contato.endereco.googleMapsUrl} target="_blank" rel="noopener noreferrer">
              Ver rota no Google Maps
            </a>
          </div>
        </section>

        <section>
          <h2>Promoções e condições especiais</h2>
          <p>
            Nenhuma promoção ativa no momento. Fale com a RECOM para consultar condições comerciais,
            disponibilidade e oportunidades sob consulta.
          </p>
          <Link to="/promocoes">Consultar promoções e condições especiais</Link>
        </section>

        <section>
          <h2>Presença local e atendimento direto</h2>
          <p>
            Com base em Campinas-SP, a RECOM facilita a conexão entre indústrias e as melhores
            soluções em ferramentas de usinagem. Nosso papel é organizar o acesso a catálogos
            oficiais e oferecer orientação comercial humana para sua demanda.
          </p>
          <ul>
            <li>Canais diretos para solicitações rápidas de orçamento.</li>
            <li>Acesso centralizado a fornecedores e catálogos digitais.</li>
            <li>Orientação por processo: torneamento, fresamento e furação.</li>
            <li>Suporte comercial para identificar a melhor opção técnica.</li>
          </ul>
          <img src={pecasImg} alt="Peças industriais relacionadas a usinagem" width="400" />
        </section>
      </main>
    </Layout>
  );
};

export default Home;
