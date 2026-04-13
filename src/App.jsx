import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Empresa from './pages/Empresa';
import Produtos from './pages/Produtos';
import Catalogo from './pages/Catalogo';
import Promocoes from './pages/Promocoes';
import Contato from './pages/Contato';
import SugestoesUtilizacao from './pages/SugestoesUtilizacao';
import Seguranca from './pages/Seguranca';
import Torneamento from './pages/Torneamento';
import Fresamento from './pages/Fresamento';
import Furacao from './pages/Furacao';
import Videos from './pages/Videos';
import WhatsAppFAB from './components/WhatsAppFAB';
import LinearProgressBar from './components/LinearProgressBar';

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
      </Routes>
    </Router>
  );
};

export default App;
