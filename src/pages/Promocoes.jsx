import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import SEOHead from '../components/SEOHead';
import { contato } from '../data/contato';
import { campanhasPromocionais } from '../data/promocoes';
import editorialImg from '../assets/images/optimized/recom-editorial-4.jpg';

const Promocoes = () => {
  return (
    <Layout>
      <SEOHead
        title="Promoções e Condições Especiais"
        description="Condições especiais da RECOM sob consulta. No momento não há promoções ativas publicadas."
      />

      <main>
        <section>
          <h1>Promoções e Condições Especiais</h1>
          <p>
            No momento, não há promoção ativa publicada. Este espaço fica reservado para condições comerciais sob consulta
            e oportunidades negociadas pela equipe.
          </p>
          <img src={editorialImg} alt="RECOM" width="400" />
        </section>

        <section style={{ background: '#eee', padding: '1rem' }}>
          <p><strong>Atenção:</strong> hoje não existe promoção ativa nesta página. Fale com a equipe comercial para conhecer oportunidades sob consulta.</p>
        </section>

        <section className="grid">
          {campanhasPromocionais.map((campanha) => (
            <div key={campanha.id} style={{ border: '1px solid #ccc', padding: '1rem' }}>
              <p><small>{campanha.tipo} | {campanha.vigencia}</small></p>
              <h3>{campanha.titulo}</h3>
              <p>{campanha.subtitulo}</p>
              <ul>
                {campanha.destaques.map((destaque, index) => (
                  <li key={index}>{destaque}</li>
                ))}
              </ul>
              <Link to="/contato">Falar com a equipe</Link>
              <p><small>{campanha.ressalva}</small></p>
            </div>
          ))}
        </section>

        <section>
          <h2>Sem promoção ativa, mas com atendimento comercial disponível</h2>
          <p>
            Se a sua necessidade for específica, a RECOM pode avaliar condições e oportunidades sob consulta.
          </p>
          <div className="flex">
            <Link to="/contato">Solicitar orientação comercial</Link>
            <a href={contato.whatsapp.hrefComMensagem} target="_blank" rel="noopener noreferrer">
              WhatsApp: {contato.telefone.display}
            </a>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default Promocoes;

