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
        <div className={styles.textBox} style={{ width: '100%' }}>
          <div className={styles.mainProductTitle}>Contato</div>
          
          <div className={styles.flexContainer} style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
            <div style={{ flex: '1', minWidth: '300px' }}>
              <h3 className={styles.productTitle}>Solicite um Orçamento</h3>
              <p className={styles.just} style={{ marginBottom: '20px' }}>
                Utilize o formulário abaixo para orçamentos técnicos ou dúvidas.
              </p>
              
              <ContactForm />
            </div>

            <div style={{ flex: '0.8', minWidth: '300px' }}>
              <div style={{ backgroundColor: '#f4f4f4', padding: '25px', borderRadius: '8px', marginBottom: '25px' }}>
                <h3 className={styles.productTitle} style={{ marginTop: 0 }}>Informações de Contato</h3>
                <p className={styles.just}>
                  <strong>Endereço:</strong><br />
                  Rua Alferes João José, 350<br />
                  Jardim Chapadão - Campinas, SP<br />
                  CEP 13070-188
                </p>
                <p className={styles.just} style={{ marginTop: '15px' }}>
                  <strong>Telefones:</strong><br />
                  (19) 3233-2224 (PABX)<br />
                  (19) 3232-6935
                </p>
                <p className={styles.just} style={{ marginTop: '15px' }}>
                  <strong>E-mail:</strong><br />
                  <a href="mailto:vendas.recom@montelione.com.br" style={{ color: '#cc0000', textDecoration: 'none' }}>vendas.recom@montelione.com.br</a>
                </p>
              </div>

              <h3 className={styles.productTitle}>Onde Estamos</h3>
              <div style={{ width: '100%', height: '250px', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <iframe 
                  src="https://www.google.com/maps?q=Rua+Alferes+João+José,+350,+Campinas,+SP&output=embed" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
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