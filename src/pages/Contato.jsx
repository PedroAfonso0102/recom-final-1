import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import SEOHead from '../components/SEOHead';
import ContactForm from '../components/ContactForm';
import { contato } from '../data/contato';
import { recomStyleHooks } from '../styles/recom/styleRegistry';

const Contato = () => {
  return (
    <Layout>
      <SEOHead
        title="Contato / Orçamento"
        description={`Entre em contato com a ${contato.empresa}. Solicite orçamento de ferramentas para usinagem. Atendimento em ${contato.endereco.cidade}-${contato.endereco.estado}.`}
        canonical="/contato"
      />

      <main
        id="main-content"
        tabIndex={-1}
        data-recom-page={recomStyleHooks.pages.contact}
      >
        <section
          data-recom-component={recomStyleHooks.components.section}
          data-recom-section={recomStyleHooks.sections.hero}
        >
          <h1 data-recom-slot="title">Contato e orçamento</h1>
          <p data-recom-element={recomStyleHooks.elements.body}>
            Envie sua solicitação ou fale diretamente com a RECOM. Se possível, informe marca,
            processo, código ou aplicação desejada.
          </p>
          <div className="flex" data-recom-component={recomStyleHooks.components.ctaSection}>
            <a
              href={contato.telefone.href}
              data-recom-component={recomStyleHooks.components.externalLink}
              data-recom-variant={recomStyleHooks.variants.external}
              data-recom-role={recomStyleHooks.roles.contactPhoneClick}
              data-recom-track={recomStyleHooks.track.contactPhoneClick}
            >
              Ligar para a RECOM
            </a>
            <a
              href={contato.whatsapp.hrefComMensagem}
              target="_blank"
              rel="noopener noreferrer"
              data-recom-component={recomStyleHooks.components.externalLink}
              data-recom-variant={recomStyleHooks.variants.external}
              data-recom-role={recomStyleHooks.roles.contactWhatsAppClick}
              data-recom-track={recomStyleHooks.track.whatsappClick}
            >
              Falar pelo WhatsApp
            </a>
            <a
              href={contato.email.href}
              data-recom-component={recomStyleHooks.components.externalLink}
              data-recom-variant={recomStyleHooks.variants.external}
              data-recom-role={recomStyleHooks.roles.contactEmailClick}
              data-recom-track={recomStyleHooks.track.contactEmailClick}
            >
              Enviar e-mail
            </a>
          </div>
        </section>

        <div className="grid" data-recom-component={recomStyleHooks.components.section}>
          <section
            data-recom-component={recomStyleHooks.components.section}
            data-recom-section={recomStyleHooks.sections.formArea}
          >
            <h2 data-recom-slot="title">Solicitar orçamento</h2>
            <p data-recom-element={recomStyleHooks.elements.body}>
              Preencha os dados abaixo com o máximo de detalhes possível (códigos, marcas ou
              desenhos) para agilizar o retorno da nossa equipe comercial.
            </p>
            <ContactForm />
          </section>

          <aside>
            <section
              data-recom-component={recomStyleHooks.components.section}
              data-recom-section={recomStyleHooks.sections.pageBody}
            >
              <h2 data-recom-slot="title">Canais diretos</h2>
              <ul>
                <li>
                  <strong>Endereço:</strong> {contato.endereco.rua}, {contato.endereco.cidade} - {contato.endereco.estado}, {contato.endereco.cep}
                </li>
                <li>
                  <strong>Telefone:</strong>{' '}
                  <a
                    href={contato.telefone.href}
                    data-recom-component={recomStyleHooks.components.textLink}
                    data-recom-role={recomStyleHooks.roles.contactPhoneClick}
                    data-recom-track={recomStyleHooks.track.contactPhoneClick}
                  >
                    {contato.telefone.display}
                  </a>
                </li>
                <li>
                  <strong>E-mail:</strong>{' '}
                  <a
                    href={contato.email.href}
                    data-recom-component={recomStyleHooks.components.textLink}
                    data-recom-role={recomStyleHooks.roles.contactEmailClick}
                    data-recom-track={recomStyleHooks.track.contactEmailClick}
                  >
                    {contato.email.display}
                  </a>
                </li>
                <li>
                  <strong>Horário:</strong> segunda a sexta, 8h às 17h30.
                </li>
              </ul>
            </section>

            <section
              data-recom-component={recomStyleHooks.components.section}
              data-recom-section={recomStyleHooks.sections.contactStrip}
            >
              <h2 data-recom-slot="title">WhatsApp</h2>
              <p>Fale diretamente com a RECOM via WhatsApp:</p>
              <a
                href={contato.whatsapp.hrefComMensagem}
                target="_blank"
                rel="noopener noreferrer"
                data-recom-component={recomStyleHooks.components.externalLink}
                data-recom-variant={recomStyleHooks.variants.external}
                data-recom-role={recomStyleHooks.roles.contactWhatsAppClick}
                data-recom-track={recomStyleHooks.track.whatsappClick}
              >
                Iniciar conversa no WhatsApp
              </a>
            </section>

            <section
              data-recom-component={recomStyleHooks.components.section}
              data-recom-section={recomStyleHooks.sections.pageSummary}
            >
              <h2 data-recom-slot="title">Onde Estamos</h2>
              <address>
                <strong>{contato.empresa}</strong><br />
                {contato.endereco.rua}<br />
                {contato.endereco.cidade} - {contato.endereco.estado}<br />
                CEP {contato.endereco.cep}
              </address>
              <p>Atendimento comercial de segunda a sexta, das 8h às 17h30.</p>
              <a
                href={contato.endereco.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-recom-component={recomStyleHooks.components.externalLink}
                data-recom-variant={recomStyleHooks.variants.external}
              >
                Ver rota no Google Maps
              </a>
            </section>

            <section
              data-recom-component={recomStyleHooks.components.section}
              data-recom-section={recomStyleHooks.sections.pageGuidance}
            >
              <h2 data-recom-slot="title">Antes de enviar</h2>
              <ul>
                <li>Fornecedor ou marca de interesse, se houver.</li>
                <li>Processo ou aplicação: torneamento, fresamento, furação, fixação ou outro.</li>
                <li>Código, item, desenho, medida, material ou quantidade.</li>
                <li>Canal preferido para retorno.</li>
              </ul>
              <div className="flex" data-recom-component={recomStyleHooks.components.ctaSection}>
                <Link
                  to="/fornecedores-catalogos"
                  data-recom-component={recomStyleHooks.components.textLink}
                  data-recom-variant={recomStyleHooks.variants.inline}
                >
                  Ver fornecedores e catálogos
                </Link>
                <Link
                  to="/solucoes"
                  data-recom-component={recomStyleHooks.components.textLink}
                  data-recom-variant={recomStyleHooks.variants.inline}
                >
                  Ver soluções por processo
                </Link>
              </div>
            </section>
          </aside>
        </div>
      </main>
    </Layout>
  );
};

export default Contato;
