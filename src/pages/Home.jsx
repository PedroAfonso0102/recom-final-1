import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import SEOHead from '../components/SEOHead';
import { contato, institucional } from '../data/contato';
import { fornecedores } from '../data/fornecedores';
import { processos } from '../data/processos';
import heroTecnicoImg from '../assets/images/optimized/egd-tecnico-gerada.jpg';
import pecasImg from '../assets/images/optimized/pecas.jpg';
import logoSchema from '../assets/images/optimized/logo-sem-fundo.png';

const heroSlides = [
  {
    image: heroTecnicoImg,
    title: 'Orientação técnica para definir o processo certo',
    text: 'A RECOM cruza aplicação, ferramenta e processo antes da compra',
  },
];

const Home = () => {
  return (
    <Layout>
      <SEOHead
        title="Ferramentas e soluções para usinagem"
        description={institucional.descricaoCurta}
        canonical="/"
        ogImage={heroTecnicoImg}
      />

      <main>
        <section>
          <p>Desde {contato.fundacao} em Campinas-SP</p>
          <h1>RECOM Metal Duro</h1>
          <p>
            A RECOM conecta clientes industriais a fornecedores reconhecidos e catálogos oficiais,
            com atendimento técnico-comercial para apoiar decisões de compra em torneamento,
            fresamento, furação e fixação.
          </p>

          <div className="flex">
            <Link to="/contato">Solicitar orçamento</Link>
            <Link to="/fornecedores-catalogos">Ver fornecedores e catálogos</Link>
          </div>

          <ul>
            <li>Catálogos oficiais</li>
            <li>Distribuição autorizada</li>
            <li>Atendimento técnico-comercial</li>
            <li>Campinas-SP</li>
          </ul>
        </section>

        <section>
          <h2>Imagens em Destaque</h2>
          <div className="grid">
            {heroSlides.map((slide, index) => (
              <div key={index}>
                <img src={slide.image} alt={slide.title} width="400" />
                <h3>{slide.title}</h3>
                <p>{slide.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2>Atendimento técnico-comercial</h2>
          <p>Da aplicação ao fornecedor certo. Entrada direta: catálogo, processo ou cotação.</p>
          <div className="grid">
            <div>
              <h3>Análise da aplicação</h3>
              <p>Recebemos código, desenho, peça ou processo e direcionamos o caminho de compra.</p>
              <Link to="/contato">Enviar demanda</Link>
            </div>
            <div>
              <h3>Catálogos oficiais</h3>
              <p>Organizamos o acesso às marcas e materiais técnicos usados na seleção das linhas.</p>
              <Link to="/fornecedores-catalogos">Ver catálogos</Link>
            </div>
            <div>
              <h3>Soluções por processo</h3>
              <p>Separe a busca por torneamento, fresamento ou furação e avance para fornecedores relacionados.</p>
              <Link to="/solucoes">Ver processos</Link>
            </div>
          </div>
        </section>

        <section>
          <h2>Fornecedores e catálogos oficiais</h2>
          <p>Marcas reconhecidas em um acesso padronizado.</p>
          <div className="grid">
            {fornecedores.map((fornecedor) => (
              <div key={fornecedor.id}>
                <img src={fornecedor.logo} alt={fornecedor.nome} width="150" />
                <h3>{fornecedor.nome}</h3>
                <p>{fornecedor.descricaoCurta}</p>
                <Link to={`/fornecedores-catalogos/${fornecedor.slug}`}>Ver fornecedor</Link>
              </div>
            ))}
          </div>
          <p>
            <Link to="/fornecedores-catalogos">Ver todos os fornecedores e catálogos</Link>
          </p>
        </section>

        <section>
          <h2>Encontre por processo de usinagem</h2>
          <p>Use esta rota quando a aplicação já está definida.</p>
          <div className="grid">
            {processos.map((processo) => (
              <div key={processo.id}>
                <h3>{processo.nome}</h3>
                <p>{processo.descricaoCurta}</p>
                <Link to={`/solucoes/${processo.slug}`}>Ver processo</Link>
              </div>
            ))}
          </div>
          <p>
            <Link to="/solucoes">Ver soluções por processo</Link>
          </p>
        </section>

        <section>
          <h2>Prova institucional</h2>
          <p>Uma empresa de Campinas com trajetória no atendimento industrial.</p>
          <ul>
            <li>Fundação: {contato.fundacao}</li>
            <li>Base comercial: Campinas-SP</li>
            <li>Distribuição: Fornecedores reconhecidos</li>
            <li>Atendimento: Suporte técnico-comercial</li>
          </ul>
          <img src={pecasImg} alt="Conjunto de peças industriais" width="400" />
          <address>
            {contato.empresa}<br />
            {contato.endereco.rua}<br />
            {contato.endereco.cidade} - {contato.endereco.estado}<br />
            CEP {contato.endereco.cep}<br />
            <a href={contato.endereco.googleMapsUrl} target="_blank" rel="noopener noreferrer">
              Ver rota no Google Maps
            </a>
          </address>
        </section>

        <section>
          <h2>Precisa de apoio para selecionar ferramentas ou fornecedores?</h2>
          <p>Envie sua referência, código, desenho ou aplicação.</p>
          <div className="flex">
            <Link to="/contato">Solicitar orçamento</Link>
            <a href={contato.telefone.href}>Ligar agora: {contato.telefone.display}</a>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default Home;

