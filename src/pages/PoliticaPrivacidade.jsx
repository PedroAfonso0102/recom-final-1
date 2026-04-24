import React from 'react';
import Layout from '../components/Layout';
import SEOHead from '../components/SEOHead';
import Breadcrumb from '../components/Breadcrumb';
import styles from './Page.module.css';
import { contato } from '../data/contato';

/**
 * Política de Privacidade — Página obrigatória para conformidade e SEO.
 */
const PoliticaPrivacidade = () => {
  return (
    <Layout>
      <SEOHead
        title="Política de Privacidade"
        description="Conheça a política de privacidade da RECOM Metal Duro e como tratamos os dados coletados em nosso site."
        canonical="/politica-de-privacidade"
      />
      <Breadcrumb
        items={[
          { label: 'Início', to: '/' },
          { label: 'Política de Privacidade' },
        ]}
      />

      <div className={styles.centerData}>
        <div className={styles.textBox}>
          <h1 className={styles.mainProductTitle}>Política de Privacidade</h1>
          
          <div className={styles.modularSection}>
            <p>
              A <strong>{contato.empresa}</strong> ({contato.razaoSocial}), inscrita no CNPJ sob o nº {contato.cnpj}, valoriza a privacidade de seus usuários e clientes. Esta política descreve como coletamos, usamos e protegemos as informações fornecidas através deste site.
            </p>
          </div>

          <section className={styles.modularSection}>
            <h2 className={styles.productTitle}>1. Coleta de Informações</h2>
            <p>
              Coletamos informações que você nos fornece voluntariamente ao preencher formulários de contato ou orçamento, tais como nome, e-mail, telefone e informações da empresa. Também podemos coletar dados técnicos de navegação (cookies e endereço IP) para fins estatísticos e de melhoria da experiência do usuário.
            </p>
          </section>

          <section className={styles.modularSection}>
            <h2 className={styles.productTitle}>2. Uso das Informações</h2>
            <p>
              As informações coletadas são utilizadas exclusivamente para:
            </p>
            <ul className={styles.squareList}>
              <li>Responder a solicitações de orçamento e dúvidas técnicas;</li>
              <li>Processar pedidos e solicitações comerciais;</li>
              <li>Melhorar o conteúdo e a navegabilidade do site;</li>
              <li>Cumprir obrigações legais.</li>
            </ul>
          </section>

          <section className={styles.modularSection}>
            <h2 className={styles.productTitle}>3. Proteção de Dados</h2>
            <p>
              Implementamos medidas de segurança técnicas e administrativas para proteger seus dados pessoais contra acesso não autorizado, perda ou alteração. Não vendemos ou compartilhamos suas informações com terceiros para fins de marketing sem seu consentimento explícito.
            </p>
          </section>

          <section className={styles.modularSection}>
            <h2 className={styles.productTitle}>4. Seus Direitos</h2>
            <p>
              Você tem o direito de solicitar o acesso, a correção ou a exclusão de seus dados pessoais a qualquer momento. Para isso, entre em contato através do e-mail <strong>{contato.email.display}</strong>.
            </p>
          </section>

          <section className={styles.modularSection}>
            <h2 className={styles.productTitle}>5. Cookies</h2>
            <p>
              Utilizamos cookies para melhorar sua experiência. Você pode configurar seu navegador para recusar cookies, mas isso pode afetar a funcionalidade de algumas partes do site.
            </p>
          </section>

          <section className={styles.modularSection}>
            <h2 className={styles.productTitle}>6. Alterações</h2>
            <p>
              Esta política pode ser atualizada periodicamente. Recomendamos a consulta regular desta página para estar ciente de qualquer modificação.
            </p>
          </section>

          <div className={styles.dataFooter}>
            <p>
              Última atualização: 24 de abril de 2026.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PoliticaPrivacidade;
