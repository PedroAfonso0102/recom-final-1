import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import styles from './Layout.module.css';

const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.centerContent}>
        <Header />
        {children}
        <div className={styles.clearfix}></div>
      </div>
      <Footer />
    </div>
  );
};

export { Layout };
