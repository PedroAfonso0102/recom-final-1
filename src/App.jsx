import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Pages — Aligned to Etapa 2 sitemap
import Home from './pages/Home';
import ARecom from './pages/ARecom';
import FornecedoresCatalogos from './pages/FornecedoresCatalogos';
import FornecedorPage from './pages/FornecedorPage';
import Solucoes from './pages/Solucoes';
import ProcessoPage from './pages/ProcessoPage';
import Promocoes from './pages/Promocoes';
import Contato from './pages/Contato';
import NotFound from './pages/NotFound';

// Legacy pages kept for backwards compat
import Seguranca from './pages/Seguranca';
import SugestoesUtilizacao from './pages/SugestoesUtilizacao';
import Videos from './pages/Videos';

// Global components
import WhatsAppFAB from './components/WhatsAppFAB';
import LinearProgressBar from './components/LinearProgressBar';

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
 * 
 * ProcessoPage handles all /solucoes/:slug routes dynamically.
 * Old Torneamento.jsx, Fresamento.jsx, Furacao.jsx are now deprecated.
 */
const App = () => {
  return (
    <Router>
      <LinearProgressBar />
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

        {/* Páginas auxiliares */}
        <Route path="/seguranca" element={<Seguranca />} />
        <Route path="/sugestoes-de-utilizacao" element={<SugestoesUtilizacao />} />
        <Route path="/videos" element={<Videos />} />

        {/* Redirects legados — rotas antigas → novas */}
        <Route path="/empresa" element={<Navigate to="/a-recom" replace />} />
        <Route path="/catalogo" element={<Navigate to="/fornecedores-catalogos" replace />} />
        <Route path="/produtos" element={<Navigate to="/solucoes" replace />} />
        <Route path="/torneamento" element={<Navigate to="/solucoes/torneamento" replace />} />
        <Route path="/fresamento" element={<Navigate to="/solucoes/fresamento" replace />} />
        <Route path="/furacao" element={<Navigate to="/solucoes/furacao" replace />} />
        <Route path="/Catalogo" element={<Navigate to="/fornecedores-catalogos" replace />} />
        <Route path="/Contato" element={<Navigate to="/contato" replace />} />

        {/* 404 — Etapa 5 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
