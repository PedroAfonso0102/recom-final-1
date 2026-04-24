import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Pages — Aligned to Etapa 2 sitemap
import Home from './pages/Home';
import ARecom from './pages/ARecom';
import FornecedoresCatalogos from './pages/FornecedoresCatalogos';
import FornecedorPage from './pages/FornecedorPage';
import Solucoes from './pages/Solucoes';
import ProcessoPage from './pages/ProcessoPage';
import Promocoes from './pages/Promocoes';
import Contato from './pages/Contato';
import PoliticaPrivacidade from './pages/PoliticaPrivacidade';
import NotFound from './pages/NotFound';

// Global components
import WhatsAppFAB from './components/WhatsAppFAB';

/**
 * Routing structure per Etapa 2 sitemap (Batch 2 cleanup):

 *  / (Home/Início)
 *  /a-recom
 *  /fornecedores-catalogos
 *  /fornecedores-catalogos/:slug
 *  /solucoes (hub)
 *  /solucoes/:slug (torneamento, fresamento, furacao — dynamic)
 *  /promocoes
 *  /contato
 *  /politica-de-privacidade
 * 
 * ProcessoPage handles all /solucoes/:slug routes dynamically.
 */
const App = () => {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <WhatsAppFAB />
      <Routes>

        {/* Sitemap principal — Etapa 2 */}
        <Route path="/" element={<Home />} />
        <Route path="/a-recom" element={<ARecom />} />
        <Route path="/fornecedores-catalogos" element={<FornecedoresCatalogos />} />
        <Route path="/fornecedores-catalogos/:slug" element={<FornecedorPage />} />
        <Route path="/solucoes" element={<Solucoes />} />
        <Route path="/solucoes/:slug" element={<ProcessoPage />} />
        <Route path="/promocoes" element={<Promocoes />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/politica-de-privacidade" element={<PoliticaPrivacidade />} />

        {/* Redirects legados — rotas antigas → novas ou hubs apropriados */}
        <Route path="/empresa" element={<Navigate to="/a-recom" replace />} />
        <Route path="/catalogo" element={<Navigate to="/fornecedores-catalogos" replace />} />
        <Route path="/produtos" element={<Navigate to="/solucoes" replace />} />
        <Route path="/torneamento" element={<Navigate to="/solucoes/torneamento" replace />} />
        <Route path="/fresamento" element={<Navigate to="/solucoes/fresamento" replace />} />
        <Route path="/furacao" element={<Navigate to="/solucoes/furacao" replace />} />
        <Route path="/fixacao" element={<Navigate to="/solucoes/fixacao-porta-ferramentas" replace />} />
        <Route path="/Catalogo" element={<Navigate to="/fornecedores-catalogos" replace />} />
        <Route path="/Contato" element={<Navigate to="/contato" replace />} />
        
        {/* Redirecionamento de páginas removidas (Batch 5 cleanup) */}
        <Route path="/seguranca" element={<Navigate to="/fornecedores-catalogos/mitsubishi-materials" replace />} />
        <Route path="/sugestoes-de-utilizacao" element={<Navigate to="/solucoes" replace />} />
        <Route path="/videos" element={<Navigate to="/solucoes" replace />} />

        {/* 404 — Etapa 5 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
