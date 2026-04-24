import React from 'react';
import { ExternalLink as ExternalCatalogLink } from './ui';
import { getCatalogosPorCategoria } from '../data/fornecedores';
import { trackSupplierCatalogClick } from '../utils/analytics';
import styles from './CatalogGroups.module.css';

const CatalogGroups = ({
  fornecedor,
  placement = 'catalog_group',
  compact = false,
  className = '',
}) => {
  const grupos = getCatalogosPorCategoria(fornecedor);

  if (!grupos.length) {
    return null;
  }

  const classes = [
    styles.groups,
    compact ? styles.compact : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      {grupos.map((grupo) => (
        <section key={grupo.tipo} className={styles.group} aria-label={`${grupo.titulo} de ${fornecedor.nome}`}>
          <h3 className={styles.groupTitle}>{grupo.titulo}</h3>
          <div className={styles.links}>
            {grupo.items.map((catalogo) => (
              <ExternalCatalogLink
                key={catalogo.url}
                href={catalogo.url}
                className={styles.link}
                label={`Acessar ${catalogo.label} da ${fornecedor.nome}`}
                onClick={() =>
                  trackSupplierCatalogClick({
                    supplierName: fornecedor.nome,
                    placement,
                    url: catalogo.url,
                  })
                }
              >
                {catalogo.label}
              </ExternalCatalogLink>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default CatalogGroups;
