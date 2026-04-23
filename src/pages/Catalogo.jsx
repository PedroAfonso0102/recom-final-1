import React, { useState, useMemo } from 'react';
import Layout from '../components/Layout';
import Modal from '../components/Modal';
import CatalogCard from '../components/CatalogCard';
import { Link } from 'react-router-dom';
import styles from './Catalogo.module.css';

const MOCK_PRODUCTS = [
  { 
    id: 1, 
    title: 'Fresa Topo Reto 4 Cortes 10mm', 
    brand: 'Mitsubishi Materials', 
    category: 'Fresamento', 
    diameter: 10, 
    iso: ['P', 'K'], 
    price: 185.50,
    technicalSpecs: {
      geometria: 'Reto',
      cortes: 4,
      revestimento: 'AlTiN (Nitruro de Alumínio e Titânio)',
      aplicacao: 'Aços carbono, Aços Liga e Ferros Fundidos',
      detalhes: 'Elevada rigidez e resistência ao calor, ideal para desbaste e acabamento.'
    }
  },
  { 
    id: 2, 
    title: 'Broca Metal Duro c/ Refrigeração 6mm', 
    brand: '7Leaders', 
    category: 'Furação', 
    diameter: 6, 
    iso: ['P', 'M', 'K'], 
    price: 210.00,
    technicalSpecs: {
      geometria: 'Helicoidal',
      refrigeracao: 'Interna',
      revestimento: 'TiAlN Especial',
      aplicacao: 'Materiais de cavaco longo e Inox',
      detalhes: 'Furação de alta velocidade com remoção de cavacos otimizada.'
    }
  },
  { 
    id: 3, 
    title: 'Inserto WNMG 080408', 
    brand: 'Mitsubishi Materials', 
    category: 'Torneamento', 
    diameter: null, 
    iso: ['P', 'M', 'S'], 
    price: 45.90,
    technicalSpecs: {
      classe: 'MC6115',
      quebra_cavaco: 'MA',
      geometria: 'Trigonal (80°)',
      aplicacao: 'Torneamento geral de aços e inox',
      detalhes: 'Nova tecnologia de revestimento CVD para máxima vida útil.'
    }
  },
  { 
    id: 4, 
    title: 'Fresa Esférica 2 Cortes 4mm', 
    brand: '7Leaders', 
    category: 'Fresamento', 
    diameter: 4, 
    iso: ['H', 'P'], 
    price: 125.00,
    technicalSpecs: {
      geometria: 'Ball Nose',
      cortes: 2,
      revestimento: 'Miracle Coating',
      aplicacao: 'Aços endurecidos até 65 HRC',
      detalhes: 'Precisão dimensional extrema para moldes e matrizes.'
    }
  },
  { 
    id: 5, 
    title: 'Mandril Hidráulico BT40', 
    brand: 'BT Fixo', 
    category: 'Fixação', 
    diameter: null, 
    iso: [], 
    price: 1450.00,
    technicalSpecs: {
      norma: 'BT40',
      sistema: 'Hidráulico',
      precisao: '< 0.003mm',
      aplicacao: 'Usinagem de alta precisão e acabamento',
      detalhes: 'Amortecimento de vibrações superior para melhor acabamento superficial.'
    }
  },
  { 
    id: 6, 
    title: 'Inserto CNMG 120408', 
    brand: 'Mitsubishi Materials', 
    category: 'Torneamento', 
    diameter: null, 
    iso: ['K', 'H'], 
    price: 52.30,
    technicalSpecs: {
      classe: 'UC6110',
      quebra_cavaco: 'GH',
      geometria: 'Rômbico (80°)',
      aplicacao: 'Ferros fundidos e materiais duros',
      detalhes: 'Alta resistência ao impacto e desgaste por abrasão.'
    }
  },
  { 
    id: 7, 
    title: 'Fresa Topo TiAlN Alta Performance 12mm', 
    brand: '7Leaders', 
    category: 'Fresamento', 
    diameter: 12, 
    iso: ['P', 'M', 'K', 'S'], 
    price: 290.00,
    technicalSpecs: {
      geometria: 'Reto 45° Chanfro',
      cortes: 4,
      revestimento: 'Super TiAlN',
      aplicacao: 'Usinagem universal de alto rendimento',
      detalhes: 'Geometria de hélice variável para reduzir vibrações.'
    }
  },
  { 
    id: 8, 
    title: 'Broca Centro HSS 3.15mm', 
    brand: 'BT Fixo', 
    category: 'Furação', 
    diameter: 3.15, 
    iso: ['P', 'N'], 
    price: 35.00,
    technicalSpecs: {
      geometria: 'Forma A',
      material: 'HSS-Co 5%',
      angulo: '60° / 118°',
      aplicacao: 'Início de furação em aços gerais',
      detalhes: 'Alta tenacidade e precisão de posicionamento.'
    }
  },
];

const isoLabels = {
  P: 'Aços',
  M: 'Aços Inoxidáveis',
  K: 'Ferros Fundidos',
  N: 'Metais Não Ferrosos',
  S: 'Superligas Termorresistentes',
  H: 'Materiais Endurecidos'
};

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
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // Handlers for checkboxes
  const [brands, setBrands] = useState({ 'Mitsubishi Materials': false, '7Leaders': false, 'BT Fixo': false });
  const [categories, setCategories] = useState({ 'Torneamento': false, 'Fresamento': false, 'Furação': false, 'Fixação': false });

  const handleBrandChange = (b) => {
    setBrands(prev => ({ ...prev, [b]: !prev[b] }));
  };

  const handleCategoryChange = (c) => {
    setCategories(prev => ({ ...prev, [c]: !prev[c] }));
  };

  const handleOpenDetails = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseDetails = () => {
    setSelectedProduct(null);
  };

  const filteredProducts = useMemo(() => {
    let result = [...MOCK_PRODUCTS];

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
                   <span 
                    key={iso} 
                    className={`${styles.isoTag} ${ISO_MAP[iso]}`}
                    data-label={isoLabels[iso]}
                   >
                    {iso}
                   </span>
                ))}
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className={styles.catalogGrid}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <CatalogCard 
                  key={product.id} 
                  product={product} 
                  onOpenDetails={handleOpenDetails} 
                />
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

      {/* Technical Details Modal */}
      <Modal 
        isOpen={!!selectedProduct} 
        onClose={handleCloseDetails}
        title={selectedProduct?.title}
      >
        {selectedProduct && (
          <div className={styles.modalContent}>
            <div className={styles.modalMain}>
              <div className={styles.modalImage}>
                <div className={styles.modalPlaceholder}>FOTO TÉCNICA</div>
              </div>
              <div className={styles.modalInfo}>
                <div className={styles.modalBrandLine}>
                  <span className={styles.modalBrand}>{selectedProduct.brand}</span>
                  <span className={styles.modalCategory}>{selectedProduct.category}</span>
                </div>
                <p className={styles.modalDescription}>{selectedProduct.technicalSpecs.detalhes}</p>
                
                <div className={styles.specsTable}>
                  <div className={`${styles.specRow} ${styles.priceRow}`}>
                    <span className={styles.specLabel}>Preço de Referência:</span>
                    <span className={`${styles.specValue} ${styles.priceValue}`}>R$ {selectedProduct.price.toFixed(2).replace('.', ',')}</span>
                  </div>
                  {Object.entries(selectedProduct.technicalSpecs).map(([key, value]) => (
                    key !== 'detalhes' && (
                      <div key={key} className={styles.specRow}>
                        <span className={styles.specLabel}>{key.replace('_', ' ')}</span>
                        <span className={styles.specValue}>{value}</span>
                      </div>
                    )
                  ))}
                </div>

                <div className={styles.modalIsoRow}>
                  <span className={styles.isoLabel}>Aplicações Recomendadas:</span>
                  <div className={styles.isoTagContainer}>
                    {selectedProduct.iso.map(tag => (
                      <span 
                        key={tag} 
                        className={`${styles.isoTag} ${ISO_MAP[tag]}`}
                        data-label={isoLabels[tag]}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className={styles.modalActions}>
                  <button className={styles.quoteBtn}>Solicitar Orçamento</button>
                  <button className={styles.pdfBtn}>Ver Detalhes Técnicos</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </Layout>
  );
};

export default Catalogo;

