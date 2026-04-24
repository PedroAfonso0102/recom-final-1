import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import SEOHead from '../components/SEOHead';
import { contato, mensagensGlobais } from '../data/contato';
import { campanhasPromocionais } from '../data/promocoes';

const Promocoes = () => {
  return (
    <Layout>
      <SEOHead
        title="Promoções e condições especiais"
        description="Consulte condições comerciais disponíveis. A disponibilidade pode variar conforme fornecedor, linha e prazo."
        canonical="/promocoes"
      />

      <main>
        <section>
          <h1>Promoções e condições especiais</h1>
          <p>
            Consulte condições comerciais disponíveis. A disponibilidade pode variar conforme
            fornecedor, linha e prazo.
          </p>
          <div className="flex">
            <Link to="/contato">Consultar disponibilidade</Link>
            <Link to="/fornecedores-catalogos">Ver fornecedores e catálogos</Link>
          </div>
        </section>

        <section>
          <h2>Condições ativas</h2>
          {campanhasPromocionais.length > 0 ? (
            <div className="grid">
              {campanhasPromocionais.map((campanha) => (
                <article key={campanha.id} style={{ border: '1px solid #ccc', padding: '1rem' }}>
                  <p><small>{campanha.tipo} | {campanha.vigencia}</small></p>
                  <h3>{campanha.titulo}</h3>
                  <p>{campanha.subtitulo}</p>
                  <ul>
                    {campanha.destaques.map((destaque) => (
                      <li key={destaque}>{destaque}</li>
                    ))}
                  </ul>
                  <Link to="/contato">Consultar disponibilidade</Link>
                  <p><small>{campanha.ressalva || mensagensGlobais.promocaoEncerrada}</small></p>
                </article>
              ))}
            </div>
          ) : (
            <div style={{ border: '1px solid #ccc', padding: '1rem' }}>
              <h3>Nenhuma promoção ativa no momento</h3>
              <p>
                Fale com a RECOM para consultar condições comerciais, disponibilidade e oportunidades
                sob consulta.
              </p>
              <div className="flex">
                <Link to="/contato">Falar com a RECOM</Link>
                <a href={contato.whatsapp.hrefComMensagem} target="_blank" rel="noopener noreferrer">
                  Consultar pelo WhatsApp
                </a>
              </div>
            </div>
          )}
        </section>

        <section>
          <h2>Consultas Comerciais</h2>
          <p>
            Ao solicitar uma cotação para condições especiais, informe o fornecedor, linha, 
            código e quantidade desejada. Isso agiliza a verificação de disponibilidade e a 
            aplicação técnica junto ao fabricante.
          </p>
          <Link to="/solucoes">Ver soluções por processo</Link>
        </section>
      </main>
    </Layout>
  );
};

export default Promocoes;
