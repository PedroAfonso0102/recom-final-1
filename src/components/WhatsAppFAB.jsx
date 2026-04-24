import React from 'react';
import { MessageCircle } from 'lucide-react';
import styles from './WhatsAppFAB.module.css';
import { contato } from '../data/contato';

const WhatsAppFAB = () => {
  const whatsappUrl = contato.whatsapp.hrefComMensagem;

  return (
    <a
      href={whatsappUrl}
      className={styles.fabContainer}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com a RECOM pelo WhatsApp (abre em nova aba)"
      title="Falar com a RECOM pelo WhatsApp"
    >
      <div className={styles.pulseRing}></div>
      <div className={styles.fabIcon}>
        <MessageCircle size={30} aria-hidden="true" />
      </div>
      <span className={styles.tooltip}>WhatsApp</span>
    </a>
  );
};

export default WhatsAppFAB;
