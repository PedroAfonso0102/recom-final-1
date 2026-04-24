import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import SEOHead from '../components/SEOHead';
import ContactForm from '../components/ContactForm';
import { contato } from '../data/contato';

const Contato = () => {
  return (
    <Layout>
      <SEOHead
        title="Contato / Orçamento"
        description={`Entre em contato com a ${contato.empresa}. Solicite orçamento de ferramentas para usinagem. Atendimento em ${contato.endereco.cidade}-${contato.endereco.estado}.`}
        canonical="/contato"
      />

      <main>
        <section>
          <h1>Contato e orçamento</h1>
          <p>
            Envie sua solicitação ou fale diretamente com a RECOM. Se possível, informe marca,
            processo, código ou aplicação desejada.
          </p>
          <div className="flex">
            <a href={contato.telefone.href}>Ligar para a RECOM</a>
            <a href={contato.whatsapp.hrefComMensagem} target="_blank" rel="noopener noreferrer">
              Falar pelo WhatsApp
            </a>
            <a href={contato.email.href}>Enviar e-mail</a>
          </div>
        </section>

        <div className="grid">
          <section>
            <h2>Solicitar orçamento</h2>
            <p>
              Preencha os dados abaixo com o máximo de detalhes possível (códigos, marcas ou 
              desenhos) para agilizar o retorno da nossa equipe comercial.
            </p>
            <ContactForm />
          </section>

          <aside>
            <section>
              <h2>Canais diretos</h2>
              <ul>
                <li>
                  <strong>Endereço:</strong> {contato.endereco.rua}, {contato.endereco.cidade} - {contato.endereco.estado}, {contato.endereco.cep}
                </li>
                <li>
                  <strong>Telefone:</strong> <a href={contato.telefone.href}>{contato.telefone.display}</a>
                </li>
                <li>
                  <strong>E-mail:</strong> <a href={contato.email.href}>{contato.email.display}</a>
                </li>
                <li>
                  <strong>Horário:</strong> segunda a sexta, 8h às 17h30.
                </li>
              </ul>
            </section>

            <section>
              <h2>WhatsApp</h2>
              <p>Fale diretamente com a RECOM via WhatsApp:</p>
              <a href={contato.whatsapp.hrefComMensagem} target="_blank" rel="noopener noreferrer">
                Iniciar conversa no WhatsApp
              </a>
            </section>

            <section>
              <h2>Onde Estamos</h2>
              <address>
                <strong>{contato.empresa}</strong><br />
                {contato.endereco.rua}<br />
                {contato.endereco.cidade} - {contato.endereco.estado}<br />
                CEP {contato.endereco.cep}
              </address>
              <p>Atendimento comercial de segunda a sexta, das 8h às 17h30.</p>
              <a href={contato.endereco.googleMapsUrl} target="_blank" rel="noopener noreferrer">
                Ver rota no Google Maps
              </a>
            </section>

            <section>
              <h2>Antes de enviar</h2>
              <ul>
                <li>Fornecedor ou marca de interesse, se houver.</li>
                <li>Processo ou aplicação: torneamento, fresamento, furação, fixação ou outro.</li>
                <li>Código, item, desenho, medida, material ou quantidade.</li>
                <li>Canal preferido para retorno.</li>
              </ul>
              <div className="flex">
                <Link to="/fornecedores-catalogos">Ver fornecedores e catálogos</Link>
                <Link to="/solucoes">Ver soluções por processo</Link>
              </div>
            </section>
          </aside>
        </div>
      </main>
    </Layout>
  );
};

export default Contato;

