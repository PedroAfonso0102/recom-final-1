import React, { useState, useMemo } from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import styles from './Catalogo.module.css';

const MOCK_PRODUCTS = [
  { id: 1, title: 'Fresa Topo Reto 4 Cortes 10mm', brand: 'Mitsubishi Materials', category: 'Fresamento', diameter: 10, iso: ['P', 'K'], price: 185.50 },
  { id: 2, title: 'Broca Metal Duro c/ Refrigeração 6mm', brand: '7Leaders', category: 'Furação', diameter: 6, iso: ['P', 'M', 'K'], price: 210.00 },
  { id: 3, title: 'Inserto WNMG 080408', brand: 'Mitsubishi Materials', category: 'Torneamento', diameter: null, iso: ['P', 'M', 'S'], price: 45.90 },
  { id: 4, title: 'Fresa Esférica 2 Cortes 4mm', brand: '7Leaders', category: 'Fresamento', diameter: 4, iso: ['H', 'P'], price: 125.00 },
  { id: 5, title: 'Mandril Hidráulico BT40', brand: 'BT Fixo', category: 'Fixação', diameter: null, iso: [], price: 1450.00 },
  { id: 6, title: 'Inserto CNMG 120408', brand: 'Mitsubishi Materials', category: 'Torneamento', diameter: null, iso: ['K', 'H'], price: 52.30 },
  { id: 7, title: 'Fresa Topo TiAlN Alta Performance 12mm', brand: '7Leaders', category: 'Fresamento', diameter: 12, iso: ['P', 'M', 'K', 'S'], price: 290.00 },
  { id: 8, title: 'Broca Centro HSS 3.15mm', brand: 'BT Fixo', category: 'Furação', diameter: 3.15, iso: ['P', 'N'], price: 35.00 },
];

const ISO_MAP = {
  P: styles.isoP,
  M: styles.isoM,
  K: styles.isoK,
  N: styles.isoN,
  S: styles.isoS,
  H: styles.isoH
};

const Catalogo = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('relevance');
  
  // Handlers for checkboxes
  const [brands, setBrands] = useState({ 'Mitsubishi Materials': false, '7Leaders': false, 'BT Fixo': false });
  const [categories, setCategories] = useState({ 'Torneamento': false, 'Fresamento': false, 'Furação': false, 'Fixação': false });

  const handleBrandChange = (b) => {
    setBrands(prev => ({ ...prev, [b]: !prev[b] }));
  };

  const handleCategoryChange = (c) => {
    setCategories(prev => ({ ...prev, [c]: !prev[c] }));
  };

  const filteredProducts = useMemo(() => {
    let result = MOCK_PRODUCTS;

    // Search filter
    if (searchTerm.trim()) {
      const lowerQuery = searchTerm.toLowerCase();
      result = result.filter(p => p.title.toLowerCase().includes(lowerQuery) || p.brand.toLowerCase().includes(lowerQuery));
    }

    // Brands filter
    const activeBrands = Object.keys(brands).filter(b => brands[b]);
    if (activeBrands.length > 0) {
      result = result.filter(p => activeBrands.includes(p.brand));
    }

    // Categories filter
    const activeCategories = Object.keys(categories).filter(c => categories[c]);
    if (activeCategories.length > 0) {
      result = result.filter(p => activeCategories.includes(p.category));
    }

    // Sorting
    if (sortOrder === 'price_asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'price_desc') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [searchTerm, brands, categories, sortOrder]);

  return (
    <Layout>
      <div className={styles.location}>
        <div className={styles.whereCenter}>
          Você está em: <Link to="/">Home</Link> &gt; Catálogo
        </div>
      </div>

      <div className={styles.container}>
        {/* Prototype Header */}
        <div className={styles.catalogHeader}>
          <div className={styles.searchBar}>
            <svg className={styles.searchIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input 
              type="text" 
              placeholder="Buscar por código, aplicação ou marca..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button>Procurar</button>
          </div>
          <div className={styles.sortOptions}>
            <span className={styles.resultsCount}>Mostrando {filteredProducts.length} resultados</span>
            <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
              <option value="relevance">Ordenar por: Mais Relevantes</option>
              <option value="price_asc">Ordenar por: Menor Preço</option>
              <option value="price_desc">Ordenar por: Maior Preço</option>
            </select>
          </div>
        </div>

        {/* Catalog Main Layout */}
        <div className={styles.catalogBody}>
          {/* Sidebar */}
          <div className={styles.catalogSidebar}>
            
            <div className={styles.filterGroup}>
              <h4 className={styles.filterTitle}>Marca</h4>
              {Object.keys(brands).map(b => (
                 <label key={b} className={styles.filterLabel}>
                   <input type="checkbox" checked={brands[b]} onChange={() => handleBrandChange(b)} /> {b}
                 </label>
              ))}
            </div>

            <div className={styles.filterGroup}>
              <h4 className={styles.filterTitle}>Categoria</h4>
              {Object.keys(categories).map(c => (
                 <label key={c} className={styles.filterLabel}>
                   <input type="checkbox" checked={categories[c]} onChange={() => handleCategoryChange(c)} /> {c}
                 </label>
              ))}
            </div>

            <div className={styles.filterGroup}>
              <h4 className={styles.filterTitle}>Aplicação (ISO)</h4>
              <div className={styles.tagGrid}>
                {Object.keys(ISO_MAP).map(iso => (
                   <span key={iso} className={`${styles.isoTag} ${ISO_MAP[iso]}`}>{iso}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className={styles.catalogGrid}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div key={product.id} className={styles.productCard}>
                  <div className={styles.productImageWrapper}>
                     <div className={styles.productImagePlaceholder}>RECOM</div>
                     {product.iso.length > 0 && (
                       <div className={styles.productIsoGroup}>
                         {product.iso.map(iso => (
                           <span key={iso} className={`${styles.isoTagSmall} ${ISO_MAP[iso]}`}>{iso}</span>
                         ))}
                       </div>
                     )}
                  </div>
                  <div className={styles.productInfo}>
                    <span className={styles.productBrand}>{product.brand}</span>
                    <h3 className={styles.productTitle}>{product.title}</h3>
                    <div className={styles.productMeta}>
                      <span className={styles.productCategory}>{product.category}</span>
                      {product.diameter && <span className={styles.productDiameter}>Ø {product.diameter}mm</span>}
                    </div>
                    <div className={styles.productFooter}>
                      <span className={styles.productPrice}>R$ {product.price.toFixed(2).replace('.', ',')}</span>
                      <button className={styles.actionBtn}>Detalhes</button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
               <div className={styles.emptyState}>
                 <h3>Nenhum produto encontrado</h3>
                 <p>Tente ajustar os filtros ou termo de busca.</p>
                 <button className={styles.resetBtn} onClick={() => {
                   setSearchTerm('');
                   setBrands({'Mitsubishi Materials': false, '7Leaders': false, 'BT Fixo': false});
                   setCategories({'Torneamento': false, 'Fresamento': false, 'Furação': false, 'Fixação': false});
                 }}>Limpar Filtros</button>
               </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Catalogo;
