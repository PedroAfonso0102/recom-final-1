import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import SEOHead from '../components/SEOHead';
import empresaImg from '../assets/images/optimized/escritorio.jpg';
import { contato, institucional } from '../data/contato';
import { fornecedores } from '../data/fornecedores';

const ARecom = () => {
  const providerHighlights = fornecedores.slice(0, 4);

  return (
    <Layout>
      <SEOHead
        title="A RECOM - Quem Somos"
        description={`A RECOM Metal Duro atua com ferramentas para usinagem desde 1990, em Campinas-SP, com distribuição autorizada Mitsubishi Materials desde ${contato.parceriaMitsubishiDesde}.`}
        canonical="/a-recom"
      />

      <main>
        <section>
          <p>Sobre a empresa | Desde 1990 | Campinas-SP</p>
          <h1>A RECOM</h1>
          <p>
            A RECOM é distribuidora de ferramentas para usinagem, com base em Campinas-SP e atendimento técnico-comercial em todo o interior paulista.
          </p>
          <p>
            Atuamos junto a indústrias, ferramentarias, áreas de compras e produção, ajudando o cliente a chegar ao fornecedor, catálogo ou linha mais adequada para cada aplicação.
          </p>

          <div className="flex">
            <Link to="/contato">Falar com a RECOM</Link>
            <Link to="/fornecedores-catalogos">Ver fornecedores</Link>
          </div>

          <img src={empresaImg} alt="RECOM Metal Duro" width="400" />
          <p>Distribuidor autorizado Mitsubishi Materials, com atuação comercial contínua no interior paulista.</p>
        </section>

        <section>
          <h2>Estatísticas e Perfil</h2>
          <div className="grid">
            <article>
              <strong>Fundação</strong>
              <p>Desde 1990 - trajetória comercial construída em Campinas-SP</p>
            </article>
            <article>
              <strong>Base operacional</strong>
              <p>Campinas-SP - atendimento técnico-comercial para o interior paulista</p>
            </article>
            <article>
              <strong>Distribuição</strong>
              <p>Autorizada - parceria oficial com a Mitsubishi Materials</p>
            </article>
            <article>
              <strong>Perfil</strong>
              <p>Empresas - atendimento técnico-comercial para clientes industriais</p>
            </article>
          </div>
        </section>

        <section>
          <h2>Nossa história</h2>
          <div className="grid">
            <article>
              <strong>1990</strong>
              <h3>Início da RECOM em Campinas</h3>
              <p>A empresa nasce em Campinas-SP com atuação voltada ao fornecimento de ferramentas para a indústria metalmecânica.</p>
            </article>
            <article>
              <strong>{contato.parceriaMitsubishiDesde}</strong>
              <h3>Distribuição autorizada</h3>
              <p>A RECOM fortalece sua atuação como distribuidora autorizada, aproximando clientes industriais das linhas e catálogos oficiais da marca.</p>
            </article>
            <article>
              <strong>Hoje</strong>
              <h3>Atendimento em todo o interior paulista</h3>
              <p>A empresa atende clientes industriais com foco em ferramentas para usinagem, fornecedores reconhecidos e suporte técnico-comercial próximo.</p>
            </article>
          </div>
        </section>

        <section>
          <h2>Como atuamos</h2>
          <p>{institucional.propostaDeValor}</p>
          <div className="grid">
            <article>
              <h3>Seleção industrial</h3>
              <p>Indicamos ferramentas e marcas com foco em aplicação real, produtividade e confiabilidade comercial.</p>
            </article>
            <article>
              <h3>Parcerias reconhecidas</h3>
              <p>Trabalhamos com fornecedores oficiais e materiais de catálogo que dão base técnica à decisão de compra.</p>
            </article>
            <article>
              <h3>Atendimento próximo</h3>
              <p>Acompanhamos a seleção de soluções com suporte direto, técnico e objetivo.</p>
            </article>
          </div>
        </section>

        <section>
          <h2>Contato direto</h2>
          <address>
            Endereço: {contato.endereco.completo}<br />
            Telefone: {contato.telefone.display}<br />
            Email: {contato.email.display}
          </address>
          <p>
            <Link to="/contato">Solicitar contato</Link>
          </p>
        </section>

        <section>
          <h2>Nossos fornecedores</h2>
          <p>Marcas que sustentam nosso atendimento.</p>
          <div className="grid">
            {providerHighlights.map((fornecedor) => (
              <div key={fornecedor.id}>
                <img src={fornecedor.logo} alt={fornecedor.nome} width="150" />
                <strong>{fornecedor.nome}</strong>
                <p>{fornecedor.descricaoCurta}</p>
                <Link to={`/fornecedores-catalogos/${fornecedor.slug}`}>Ver fornecedor</Link>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2>Precisa selecionar ferramentas ou validar um fornecedor?</h2>
          <p>Fale com a RECOM. A equipe ajuda a organizar as informações da aplicação.</p>
          <Link to="/contato">Solicitar orientação</Link>
        </section>
      </main>
    </Layout>
  );
};

export default ARecom;
