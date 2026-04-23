import React from 'react';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import styles from './BlocoContato.module.css';

const BlocoContato = () => {
  return (
    <section className={styles.contactBlock}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Fale com um Especialista</h2>
          <p>Nossa equipe está pronta para ajudar você a encontrar a solução ideal para sua usinagem.</p>
        </div>

        <div className={styles.grid}>
          <div className={styles.card}>
            <Phone className={styles.icon} size={24} />
            <h3>Telefone</h3>
            <a href="tel:+551932296767" className={styles.link}>(19) 3229-6767</a>
          </div>

          <div className={styles.card}>
            <MessageCircle className={styles.icon} size={24} />
            <h3>WhatsApp</h3>
            <a href="https://wa.me/5519992070381" target="_blank" rel="noopener noreferrer" className={styles.link}>(19) 99207-0381</a>
          </div>

          <div className={styles.card}>
            <Mail className={styles.icon} size={24} />
            <h3>E-mail</h3>
            <a href="mailto:vendas@recommetalduro.com.br" className={styles.link}>vendas@recommetalduro.com.br</a>
          </div>

          <div className={styles.card}>
            <MapPin className={styles.icon} size={24} />
            <h3>Endereço</h3>
            <address className={styles.address}>
              Av. Prestes Maia, 521<br />
              Vila João Jorge, Campinas/SP<br />
              CEP: 13041-311
            </address>
          </div>
        </div>
      </div>
    </section>
  );
};

export { BlocoContato };
