import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import SEOHead from '../components/SEOHead';
import { contato, institucional } from '../data/contato';
import { fornecedores, hasCatalogoValido } from '../data/fornecedores';
import { processos } from '../data/processos';
import heroTecnicoImg from '../assets/images/optimized/egd-tecnico-gerada.jpg';
import pecasImg from '../assets/images/optimized/pecas.jpg';
import { recomStyleHooks } from '../styles/recom/styleRegistry';

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

      <main
        id="main-content"
        tabIndex={-1}
        data-recom-page={recomStyleHooks.pages.home}
      >
        <section
          data-recom-component={recomStyleHooks.components.section}
          data-recom-section={recomStyleHooks.sections.hero}
        >
          <p data-recom-element={recomStyleHooks.elements.subtitle}>
            Distribuidor B2B | Atendimento em Campinas-SP e região
          </p>
          <h1 data-recom-slot="title">Ferramentas e Soluções para Usinagem</h1>
          <p data-recom-element={recomStyleHooks.elements.body}>
            A RECOM conecta sua empresa a fornecedores globais, catálogos oficiais e
            orientação técnica para processos de torneamento, fresamento e furação.
            Encontre o caminho certo para sua solicitação de orçamento.
          </p>
          <div className="flex" data-recom-component={recomStyleHooks.components.ctaSection}>
            <Link
              to="/contato"
              data-recom-component={recomStyleHooks.components.button}
              data-recom-variant={recomStyleHooks.variants.primary}
              data-recom-role={recomStyleHooks.roles.primaryCta}
              data-recom-track={recomStyleHooks.track.primaryCtaClick}
            >
              Solicitar orçamento
            </Link>
            <Link
              to="/fornecedores-catalogos"
              data-recom-component={recomStyleHooks.components.button}
              data-recom-variant={recomStyleHooks.variants.secondary}
              data-recom-role={recomStyleHooks.roles.secondaryCta}
              data-recom-track={recomStyleHooks.track.secondaryCtaClick}
            >
              Ver fornecedores e catálogos
            </Link>
          </div>
        </section>

        <section
          data-recom-component={recomStyleHooks.components.section}
          data-recom-section={recomStyleHooks.sections.intro}
        >
          <h2 data-recom-slot="title">Como a RECOM atende sua demanda</h2>
          <p data-recom-element={recomStyleHooks.elements.body}>
            Escolha o caminho mais adequado para sua necessidade atual:
          </p>
          <ul>
            <li><strong>Por marca:</strong> Consulte o catálogo oficial do fornecedor de interesse.</li>
            <li><strong>Por aplicação:</strong> Navegue pelas soluções disponíveis para cada processo de usinagem.</li>
            <li><strong>Direto com a RECOM:</strong> Envie seu desenho, código ou especificação para orientação técnica.</li>
          </ul>
        </section>

        <section
          data-recom-component={recomStyleHooks.components.section}
          data-recom-section={recomStyleHooks.sections.trust}
        >
          <h2 data-recom-slot="title">Atendimento Técnico-Comercial</h2>
          <p data-recom-element={recomStyleHooks.elements.body}>
            Com base em Campinas-SP, a RECOM atua na distribuição de ferramentas de corte,
            facilitando o acesso a informações técnicas e marcas consolidadas no mercado de usinagem.
          </p>
          <p data-recom-element={recomStyleHooks.elements.body}>
            Nosso foco é agilizar o processo de consulta e orçamento, oferecendo suporte direto
            para a definição das melhores soluções para sua operação.
          </p>
          <Link
            to="/a-recom"
            data-recom-component={recomStyleHooks.components.textLink}
            data-recom-variant={recomStyleHooks.variants.inline}
          >
            Sobre a RECOM
          </Link>
        </section>

        <section
          data-recom-component={recomStyleHooks.components.section}
          data-recom-section={recomStyleHooks.sections.supplierHub}
        >
          <h2 data-recom-slot="title">Fornecedores e Catálogos Oficiais</h2>
          <p data-recom-element={recomStyleHooks.elements.body}>
            Acesse as linhas de produtos e catálogos digitais das marcas atendidas pela RECOM.
            Para dúvidas sobre aplicações específicas, entre em contato.
          </p>
          <div className="grid">
            {principaisFornecedores.map((fornecedor) => (
              <article
                key={fornecedor.id}
                data-recom-component={recomStyleHooks.components.supplierCard}
                data-recom-state={
                  hasCatalogoValido(fornecedor)
                    ? recomStyleHooks.states.catalogAvailable
                    : recomStyleHooks.states.catalogUnavailable
                }
              >
                <img
                  src={fornecedor.logo}
                  alt={fornecedor.nome}
                  width="150"
                  data-recom-component={recomStyleHooks.components.image}
                  data-recom-element={recomStyleHooks.elements.cardImage}
                />
                <h3 data-recom-element={recomStyleHooks.elements.cardTitle}>{fornecedor.nome}</h3>
                <p data-recom-element={recomStyleHooks.elements.cardDescription}>{fornecedor.descricaoCurta}</p>
                <Link
                  to={`/fornecedores-catalogos/${fornecedor.slug}`}
                  data-recom-component={recomStyleHooks.components.textLink}
                  data-recom-role={recomStyleHooks.roles.supplierCardClick}
                  data-recom-track={recomStyleHooks.track.supplierCardClick}
                >
                  Ver página do fornecedor
                </Link>
              </article>
            ))}
          </div>
          <Link
            to="/fornecedores-catalogos"
            data-recom-component={recomStyleHooks.components.textLink}
            data-recom-variant={recomStyleHooks.variants.inline}
          >
            Ver todos os fornecedores
          </Link>
        </section>

        <section
          data-recom-component={recomStyleHooks.components.section}
          data-recom-section={recomStyleHooks.sections.processHub}
        >
          <h2 data-recom-slot="title">Soluções por Processo</h2>
          <p data-recom-element={recomStyleHooks.elements.body}>
            Localize as ferramentas ideais partindo do tipo de operação. Encontre fornecedores
            relacionados a cada etapa da sua produção.
          </p>
          <div className="grid">
            {principaisProcessos.map((processo) => (
              <article
                key={processo.id}
                data-recom-component={recomStyleHooks.components.processCard}
              >
                <h3 data-recom-element={recomStyleHooks.elements.cardTitle}>{processo.nome}</h3>
                <p data-recom-element={recomStyleHooks.elements.cardDescription}>{processo.descricaoCurta}</p>
                <Link
                  to={`/solucoes/${processo.slug}`}
                  data-recom-component={recomStyleHooks.components.textLink}
                  data-recom-role={recomStyleHooks.roles.processCardClick}
                  data-recom-track={recomStyleHooks.track.processCardClick}
                >
                  Ver detalhes do processo
                </Link>
              </article>
            ))}
          </div>
          <Link
            to="/solucoes"
            aria-label="Ver soluções por processo"
            data-recom-component={recomStyleHooks.components.textLink}
            data-recom-variant={recomStyleHooks.variants.inline}
          >
            Ver todos os processos
          </Link>
        </section>

        <section
          data-recom-component={recomStyleHooks.components.section}
          data-recom-section={recomStyleHooks.sections.contactStrip}
        >
          <h2 data-recom-slot="title">Fale com a RECOM</h2>
          <p data-recom-element={recomStyleHooks.elements.body}>
            Estamos prontos para orientar sua cotação. Informe o código da ferramenta, desenho
            ou o material da peça para um atendimento mais ágil.
          </p>
          <address>
            {contato.empresa}<br />
            {contato.endereco.completo}<br />
            Telefone:{' '}
            <a
              href={contato.telefone.href}
              data-recom-component={recomStyleHooks.components.textLink}
              data-recom-role={recomStyleHooks.roles.contactPhoneClick}
              data-recom-track={recomStyleHooks.track.contactPhoneClick}
            >
              {contato.telefone.display}
            </a>
            <br />
            E-mail:{' '}
            <a
              href={contato.email.href}
              data-recom-component={recomStyleHooks.components.textLink}
              data-recom-role={recomStyleHooks.roles.contactEmailClick}
              data-recom-track={recomStyleHooks.track.contactEmailClick}
            >
              {contato.email.display}
            </a>
            <br />
            WhatsApp:{' '}
            <a
              href={contato.whatsapp.hrefComMensagem}
              target="_blank"
              rel="noopener noreferrer"
              data-recom-component={recomStyleHooks.components.externalLink}
              data-recom-variant={recomStyleHooks.variants.external}
              data-recom-role={recomStyleHooks.roles.contactWhatsAppClick}
              data-recom-track={recomStyleHooks.track.whatsappClick}
            >
              iniciar conversa
            </a>
          </address>
          <div className="flex" data-recom-component={recomStyleHooks.components.ctaSection}>
            <Link
              to="/contato"
              data-recom-component={recomStyleHooks.components.button}
              data-recom-variant={recomStyleHooks.variants.primary}
              data-recom-role={recomStyleHooks.roles.primaryCta}
            >
              Enviar solicitação pelo formulário
            </Link>
            <a
              href={contato.endereco.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-recom-component={recomStyleHooks.components.externalLink}
              data-recom-variant={recomStyleHooks.variants.external}
            >
              Ver rota no Google Maps
            </a>
          </div>
        </section>

        <section
          data-recom-component={recomStyleHooks.components.section}
          data-recom-section={recomStyleHooks.sections.ctaFinal}
          data-recom-state={recomStyleHooks.states.empty}
        >
          <h2 data-recom-slot="title">Promoções e condições especiais</h2>
          <p data-recom-element={recomStyleHooks.elements.body}>
            Nenhuma promoção ativa no momento. Fale com a RECOM para consultar condições comerciais,
            disponibilidade e oportunidades sob consulta.
          </p>
          <Link
            to="/promocoes"
            data-recom-component={recomStyleHooks.components.textLink}
            data-recom-variant={recomStyleHooks.variants.inline}
          >
            Consultar promoções e condições especiais
          </Link>
        </section>

        <section
          data-recom-component={recomStyleHooks.components.section}
          data-recom-section={recomStyleHooks.sections.trust}
        >
          <h2 data-recom-slot="title">Presença local e atendimento direto</h2>
          <p data-recom-element={recomStyleHooks.elements.body}>
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
          <img
            src={pecasImg}
            alt="Peças industriais relacionadas a usinagem"
            width="400"
            data-recom-component={recomStyleHooks.components.image}
            data-recom-element={recomStyleHooks.elements.cardImage}
          />
        </section>
      </main>
    </Layout>
  );
};

export default Home;
