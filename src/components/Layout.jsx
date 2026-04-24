import React from 'react';
import Header from './Header';
import Footer from './Footer';
import styles from './Layout.module.css';

const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <a href="#main-content" className="sr-only-focusable">Pular para o conteúdo principal</a>
      <div className={styles.centerContent}>
        <Header />
        <main id="main-content">
          {children}
        </main>
        <div className={styles.clearfix}></div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
