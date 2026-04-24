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
          <p>Distribuidor B2B | Ferramentas para usinagem | Campinas-SP</p>
          <h1>RECOM Metal Duro</h1>
          <p>
            A RECOM atende empresas que precisam consultar fornecedores, catálogos oficiais e
            caminhos comerciais para ferramentas e soluções de usinagem. O site não é um e-commerce
            nem um catálogo próprio de SKUs: ele organiza caminhos para orientação, consulta e orçamento.
          </p>
          <div className="flex">
            <Link to="/contato">Solicitar orçamento</Link>
            <Link to="/fornecedores-catalogos">Ver fornecedores e catálogos</Link>
          </div>
        </section>

        <section>
          <h2>O que o usuário deve fazer aqui</h2>
          <p>
            Escolha o caminho mais próximo da sua necessidade: procurar por fornecedor, procurar por
            processo de usinagem ou falar diretamente com a RECOM para orientar a cotação.
          </p>
          <ol>
            <li>Se você já sabe a marca, acesse fornecedores e catálogos oficiais.</li>
            <li>Se você sabe a operação, navegue por soluções por processo.</li>
            <li>Se você tem código, desenho, peça ou dúvida de aplicação, envie a solicitação.</li>
          </ol>
        </section>

        <section>
          <h2>Presença institucional</h2>
          <p>
            Desde {contato.fundacao}, a RECOM atua no atendimento comercial de ferramentas e
            soluções para usinagem, conectando clientes industriais a marcas, catálogos e canais de
            orientação técnico-comercial.
          </p>
          <p>
            Base de atendimento: {contato.endereco.cidade}-{contato.endereco.estado}. Dados
            históricos e vínculos comerciais específicos devem ser validados pela equipe antes de uso
            em peças institucionais finais.
          </p>
          <Link to="/a-recom">Conhecer a RECOM</Link>
        </section>

        <section>
          <h2>Caminho por fornecedores</h2>
          <p>
            Consulte marcas, linhas e catálogos oficiais. Caso não encontre a informação que procura,
            fale com a RECOM para receber orientação comercial.
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
          <Link to="/fornecedores-catalogos">Ver fornecedores e catálogos</Link>
        </section>

        <section>
          <h2>Caminho por processos</h2>
          <p>
            Use esta rota quando a aplicação já está clara, mas o fornecedor ou catálogo ainda precisa
            ser localizado.
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
          <Link to="/solucoes">Ver soluções por processo</Link>
        </section>

        <section>
          <h2>Contato rápido</h2>
          <p>
            Para agilizar o atendimento, informe marca, processo, código, desenho, material ou
            aplicação desejada sempre que possível.
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
          <h2>Prova de confiança</h2>
          <p>
            A confiança aqui deve vir de presença real, canais diretos, histórico declarado,
            fornecedores identificados e orientação comercial humana, não de promessas genéricas.
          </p>
          <ul>
            <li>Base em Campinas-SP.</li>
            <li>Canais diretos de telefone, e-mail, WhatsApp e formulário.</li>
            <li>Fornecedores e catálogos apresentados com links oficiais.</li>
            <li>Processos organizados para orientar o caminho da solicitação.</li>
          </ul>
          <img src={pecasImg} alt="Peças industriais relacionadas a usinagem" width="400" />
        </section>
      </main>
    </Layout>
  );
};

export default Home;
