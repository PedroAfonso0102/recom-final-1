import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import configuracoes from '../data/configuracoes.json';

export const SEO = ({ title, description, canonical }) => {
  const location = useLocation();
  const currentUrl = `https://www.recommetalduro.com.br${location.pathname}`;

  useEffect(() => {
    document.title = title
      ? `${title}${configuracoes.seo.titleSuffix}`
      : configuracoes.empresa.nome + configuracoes.seo.titleSuffix;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description || configuracoes.seo.defaultDescription);
    }

    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', canonical || currentUrl);
  }, [title, description, canonical, currentUrl]);

  return null;
};
