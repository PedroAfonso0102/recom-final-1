import React from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import styles from './Page.module.css';
import ContactForm from '../components/ContactForm';

const Contato = () => {
  return (
    <Layout>
      <div className={styles.location}>
        <div className={styles.whereCenter}>
          Você está em: <Link to="/">Home</Link> &gt; Contato
        </div>
      </div>
      
      <div className={styles.centerData}>
        <div className={styles.textBox}>
          <div className={styles.mainProductTitle}>Contato</div>
          
          <div className={styles.flexContainer}>
            <div className={styles.contactColMain}>
              <h3 className={styles.productTitle}>Solicite um Orçamento</h3>
              <p className={styles.just}>
                Utilize o formulário abaixo para orçamentos técnicos ou dúvidas.
              </p>
              
              <ContactForm />
            </div>

            <div className={styles.contactColSide}>
              <div className={styles.infoCard}>
                <h3 className={`${styles.productTitle} ${styles.infoTitle}`}>Informações de Contato</h3>
                <p className={styles.just}>
                  <strong>Endereço:</strong><br />
                  Rua Alferes João José, 350<br />
                  Jardim Chapadão - Campinas, SP<br />
                  CEP 13070-188
                </p>
                <p className={`${styles.just} ${styles.infoText}`}>
                  <strong>Telefones:</strong><br />
                  (19) 3233-2224 (PABX)<br />
                  (19) 3232-6935
                </p>
                <p className={`${styles.just} ${styles.infoText}`}>
                  <strong>E-mail:</strong><br />
                  <a href="mailto:vendas.recom@montelione.com.br" className={styles.contactLink}>vendas.recom@montelione.com.br</a>
                </p>
              </div>

              <h3 className={styles.productTitle}>Onde Estamos</h3>
              <div className={styles.mapContainer}>
                <iframe 
                  src="https://www.google.com/maps?q=Rua+Alferes+João+José,+350,+Campinas,+SP&output=embed" 
                  width="100%" 
                  height="100%" 
                  className={styles.mapIframe}
                  allowFullScreen="" 
                  loading="lazy" 
                  title="RECOM Location"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.clear}></div>
      </div>
    </Layout>
  );
};

export default Contato;