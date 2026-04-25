import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { recomStyleHooks } from '../styles/recom/styleRegistry';

const Layout = ({ children }) => {
  return (
    <div className="container" data-recom-component={recomStyleHooks.components.pageShell}>
      <a
        href="#main-content"
        className="sr-only"
        data-recom-component={recomStyleHooks.components.textLink}
        data-recom-role={recomStyleHooks.roles.skipLink}
        data-recom-element={recomStyleHooks.elements.skipLink}
      >
        Pular para o conteúdo principal
      </a>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;

