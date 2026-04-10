import React from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import styles from './Catalogo.module.css';

const Catalogo = () => {
  return (
    <Layout>
      <div className={styles.location}>
        <div className={styles.whereCenter}>
          Você está em: <Link to="/">Home</Link> &gt; Catálogo
        </div>
      </div>

      <div className={styles.container}>
        {/* WIP Warning Banner */}
        <div className={styles.wipBanner}>
          <div className={styles.wipIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
            </svg>
          </div>
          <div className={styles.wipText}>
            <strong>Sistema de Catálogo em Construção</strong>
            <p>Abaixo apresentamos uma demonstração visual da futura interface de busca de ferramentas.</p>
          </div>
        </div>

        {/* Prototype Header */}
        <div className={styles.catalogHeader}>
          <div className={styles.searchBar}>
            <svg className={styles.searchIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input type="text" placeholder="Buscar por código, aplicação ou marca..." disabled />
            <button disabled>Procurar</button>
          </div>
          <div className={styles.sortOptions}>
            <span className={styles.resultsCount}>Mostrando 1-12 de 1.458 resultados</span>
            <select disabled>
              <option>Ordenar por: Mais Relevantes</option>
              <option>Ordenar por: Menor Preço</option>
              <option>Ordenar por: Maior Diâmetro</option>
            </select>
          </div>
        </div>

        {/* Catalog Main Layout */}
        <div className={styles.catalogBody}>
          {/* Sidebar */}
          <div className={styles.catalogSidebar}>
            
            <div className={styles.filterGroup}>
              <h4 className={styles.filterTitle}>Marca</h4>
              <label className={styles.filterLabel}><input type="checkbox" disabled checked /> Mitsubishi Materials</label>
              <label className={styles.filterLabel}><input type="checkbox" disabled /> 7Leaders</label>
              <label className={styles.filterLabel}><input type="checkbox" disabled /> BT Fixo</label>
            </div>

            <div className={styles.filterGroup}>
              <h4 className={styles.filterTitle}>Categoria</h4>
              <label className={styles.filterLabel}><input type="checkbox" disabled checked /> Torneamento (854)</label>
              <label className={styles.filterLabel}><input type="checkbox" disabled /> Fresamento (412)</label>
              <label className={styles.filterLabel}><input type="checkbox" disabled /> Furação (192)</label>
            </div>

            <div className={styles.filterGroup}>
              <h4 className={styles.filterTitle}>Diâmetro (Ø)</h4>
              <div className={styles.rangeInputs}>
                <input type="number" placeholder="Min" disabled />
                <span>-</span>
                <input type="number" placeholder="Max" disabled />
                <span>mm</span>
              </div>
            </div>

            <div className={styles.filterGroup}>
              <h4 className={styles.filterTitle}>Aplicação (ISO)</h4>
              <div className={styles.tagGrid}>
                <span className={`${styles.isoTag} ${styles.isoP}`}>P</span>
                <span className={`${styles.isoTag} ${styles.isoM}`}>M</span>
                <span className={`${styles.isoTag} ${styles.isoK}`}>K</span>
                <span className={`${styles.isoTag} ${styles.isoN}`}>N</span>
                <span className={`${styles.isoTag} ${styles.isoS}`}>S</span>
                <span className={`${styles.isoTag} ${styles.isoH}`}>H</span>
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className={styles.catalogGrid}>
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className={styles.productMockCard}>
                <div className={styles.mockImage}></div>
                <div className={styles.mockTextShort}></div>
                <div className={styles.mockTextLong}></div>
                <div className={styles.mockTags}>
                  <div className={styles.mockTag}></div>
                  <div className={styles.mockTag}></div>
                </div>
                <span className={styles.mockAction}>Ver Detalhes →</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Catalogo;
