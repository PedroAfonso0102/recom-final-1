import React from 'react';
import { Helmet } from 'react-helmet-async';
import { contato } from '../data/contato';

/**
 * SEOHead — Componente de metadados por página.
 * Etapa 4: "title HTML, meta description, canonical e Open Graph configuráveis por página"
 * Etapa 6: "cada página deve ter title único, H1 coerente, meta description editorialmente útil"
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
    : 'RECOM Metal Duro — Distribuidor B2B de Ferramentas para Usinagem';

  const metaDescription = description || 'RECOM Metal Duro — Distribuidor B2B de ferramentas para usinagem desde 1990. Fornecedores líderes, catálogos oficiais e atendimento especializado em Campinas-SP.';

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph */}
      <meta property="og:title" content={ogTitle || fullTitle} />
      <meta property="og:description" content={ogDescription || metaDescription} />
      <meta property="og:url" content={canonicalUrl || currentUrl} />
      <meta property="og:site_name" content={contato.empresa} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      <meta name="twitter:card" content={ogImage ? 'summary_large_image' : 'summary'} />

      {/* Structured Data (JSON-LD) */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;
