import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import { LinearProgressBar } from './components/common/LinearProgressBar';
import { WhatsAppFAB } from './components/common/WhatsAppFAB';
import { Catalogo } from './pages/Catalogo';
import { Contato } from './pages/Contato';
import { Empresa } from './pages/Empresa';
import { Fresamento } from './pages/Fresamento';
import { Furacao } from './pages/Furacao';
import { Home } from './pages/Home';
import { HomeAlt } from './pages/HomeAlt';
import { Produtos } from './pages/Produtos';
import { Promocoes } from './pages/Promocoes';
import { Seguranca } from './pages/Seguranca';
import { SugestoesUtilizacao } from './pages/SugestoesUtilizacao';
import { Torneamento } from './pages/Torneamento';
import { Videos } from './pages/Videos';

/**
 * Componente Principal App
 * Define a estrutura de roteamento do aplicativo usando React Router.
 *
 * @returns {JSX.Element} O componente raiz do aplicativo.
 */
const App = () => {
  return (
    <Router>
      <LinearProgressBar />
      <WhatsAppFAB />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/empresa" element={<Empresa />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/promocoes" element={<Promocoes />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/sugestoes-de-utilizacao" element={<SugestoesUtilizacao />} />
        <Route path="/seguranca" element={<Seguranca />} />
        <Route path="/torneamento" element={<Torneamento />} />
        <Route path="/fresamento" element={<Fresamento />} />
        <Route path="/furacao" element={<Furacao />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/home-alt" element={<HomeAlt />} />
      </Routes>
    </Router>
  );
};

export default App;
