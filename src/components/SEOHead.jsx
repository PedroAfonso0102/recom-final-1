import React from 'react';
import { Helmet } from 'react-helmet-async';
import { contato } from '../data/contato';

/**
 * SEOHead — Componente de metadados por página.
 * Mantém title, description, canonical e OG configuráveis por rota.
 */
const SEOHead = ({
  title,
  description,
  canonical,
  ogTitle,
  ogDescription,
  ogImage,
  noindex = false,
  jsonLd,
}) => {
  const canonicalUrl = canonical ? new URL(canonical, contato.siteUrl).href : null;
  const currentUrl = typeof window !== 'undefined' ? window.location.href : contato.siteUrl;
  const fullTitle = title
    ? `${title} | RECOM Metal Duro`
    : 'RECOM Metal Duro | Distribuidor B2B de ferramentas para usinagem';

  const metaDescription = description || 'RECOM Metal Duro é distribuidor B2B de ferramentas para usinagem desde 1998, com atendimento técnico-comercial em Campinas-SP, fornecedores reconhecidos e catálogos oficiais.';

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="theme-color" content="#0057A8" />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      <meta property="og:title" content={ogTitle || fullTitle} />
      <meta property="og:description" content={ogDescription || metaDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl || currentUrl} />
      <meta property="og:site_name" content={contato.empresa} />
      {ogImage && <meta property="og:image" content={ogImage} />}

      <meta name="twitter:card" content={ogImage ? 'summary_large_image' : 'summary'} />
      <meta name="twitter:title" content={ogTitle || fullTitle} />
      <meta name="twitter:description" content={ogDescription || metaDescription} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}

      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;
