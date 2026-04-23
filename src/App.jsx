import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

// Pages — Aligned to Etapa 2 sitemap
import Home from './pages/Home';
import ARecom from './pages/ARecom';
import FornecedoresCatalogos from './pages/FornecedoresCatalogos';
import FornecedorPage from './pages/FornecedorPage';
import Solucoes from './pages/Solucoes';
import Torneamento from './pages/Torneamento';
import Fresamento from './pages/Fresamento';
import Furacao from './pages/Furacao';
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
 * Routing structure per Etapa 2 sitemap:
 *  / (Home/Início)
 *  /a-recom
 *  /fornecedores-catalogos
 *  /fornecedores-catalogos/:slug (páginas individuais de fornecedor)
 *  /solucoes (hub de processos)
 *  /solucoes/torneamento
 *  /solucoes/fresamento
 *  /solucoes/furacao
 *  /promocoes
 *  /contato
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
        <Route path="/solucoes/torneamento" element={<Torneamento />} />
        <Route path="/solucoes/fresamento" element={<Fresamento />} />
        <Route path="/solucoes/furacao" element={<Furacao />} />
        <Route path="/promocoes" element={<Promocoes />} />
        <Route path="/contato" element={<Contato />} />

        {/* Páginas auxiliares */}
        <Route path="/seguranca" element={<Seguranca />} />
        <Route path="/sugestoes-de-utilizacao" element={<SugestoesUtilizacao />} />
        <Route path="/videos" element={<Videos />} />

        {/* Redirects legados */}
        <Route path="/empresa" element={<ARecom />} />
        <Route path="/catalogo" element={<FornecedoresCatalogos />} />
        <Route path="/produtos" element={<Solucoes />} />
        <Route path="/torneamento" element={<Torneamento />} />
        <Route path="/fresamento" element={<Fresamento />} />
        <Route path="/furacao" element={<Furacao />} />

        {/* 404 — Etapa 5 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
