import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Breadcrumb.module.css';

/**
 * Breadcrumb — Navegação hierárquica com JSON-LD structured data.
 * Etapa 2: "implementar breadcrumbs visuais e breadcrumb structured data em JSON-LD"
 * Etapa 5: "breadcrumbs obrigatórios em páginas internas profundas"
 *
 * @param {Array} items - [{ label: string, to: string }] (último item sem 'to' = página atual)
 */
const Breadcrumb = ({ items = [] }) => {
  if (!items || items.length === 0) return null;

  // Support both 'to' and 'path' properties for link items
  const getLink = (item) => item.to || item.path || null;

  // JSON-LD structured data para breadcrumb
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(getLink(item) ? { item: `https://www.recommetalduro.com.br${getLink(item)}` } : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav className={styles.breadcrumb} aria-label="Navegação hierárquica">
        <ol className={styles.breadcrumbList}>
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={index} className={styles.breadcrumbItem}>
                {!isLast && getLink(item) ? (
                  <>
                    <Link to={getLink(item)} className={styles.breadcrumbLink}>
                      {item.label}
                    </Link>
                    <span className={styles.separator} aria-hidden="true">›</span>
                  </>
                ) : (
                  <span className={styles.breadcrumbCurrent} aria-current="page">
                    {item.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumb;
