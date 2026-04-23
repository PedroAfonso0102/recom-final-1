import React from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { Home, ArrowRight } from 'lucide-react';
import styles from './NotFound.module.css';

/**
 * Página 404 customizada.
 * Etapa 5: "página 404 com links de recuperação"
 */
const NotFound = () => {
  return (
    <Layout>
      <SEOHead
        title="Página não encontrada"
        description="A página que você procura não foi encontrada. Navegue pelas soluções e fornecedores da RECOM Metal Duro."
        noindex
      />
      <div className={styles.container}>
        <div className={styles.content}>
          <span className={styles.errorCode}>404</span>
          <h1 className={styles.title}>Página não encontrada</h1>
          <p className={styles.description}>
            A página que você está procurando pode ter sido movida ou não está mais disponível.
          </p>
          <div className={styles.links}>
            <Link to="/" className={styles.primaryLink}>
              <Home size={16} />
              Voltar ao Início
            </Link>
            <Link to="/fornecedores-catalogos" className={styles.secondaryLink}>
              Fornecedores & Catálogos <ArrowRight size={14} />
            </Link>
            <Link to="/solucoes" className={styles.secondaryLink}>
              Soluções / Processos <ArrowRight size={14} />
            </Link>
            <Link to="/contato" className={styles.secondaryLink}>
              Fale Conosco <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
