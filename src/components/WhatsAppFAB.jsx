import React from 'react';
import { contato } from '../data/contato';

const WhatsAppFAB = () => {
  const whatsappUrl = contato.whatsapp.hrefComMensagem;

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000, background: '#eee', border: '1px solid #333', padding: '10px' }}>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar com a RECOM pelo WhatsApp"
      >
        WhatsApp
      </a>
    </div>
  );
};

export default WhatsAppFAB;

