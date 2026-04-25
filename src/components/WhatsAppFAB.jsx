import React from 'react';
import { contato } from '../data/contato';
import { recomStyleHooks } from '../styles/recom/styleRegistry';

const WhatsAppFAB = () => {
  const whatsappUrl = contato.whatsapp.hrefComMensagem;

  return (
    <div
      style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000, background: '#eee', border: '1px solid #333', padding: '10px' }}
      data-recom-component={recomStyleHooks.components.whatsappFab}
      data-recom-track={recomStyleHooks.track.whatsappClick}
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar com a RECOM pelo WhatsApp"
        data-recom-component={recomStyleHooks.components.externalLink}
        data-recom-variant={recomStyleHooks.variants.external}
        data-recom-role={recomStyleHooks.roles.contactWhatsAppClick}
      >
        WhatsApp
      </a>
    </div>
  );
};

export default WhatsAppFAB;
