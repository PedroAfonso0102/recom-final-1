import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Inicio } from './pages/Inicio';
import { ARecom } from './pages/ARecom';
import { Fornecedores } from './pages/Fornecedores';
import { FornecedorDetalhe } from './pages/FornecedorDetalhe';
import { Solucoes } from './pages/Solucoes';
import { SolucaoDetalhe } from './pages/SolucaoDetalhe';
import { Promocoes } from './pages/Promocoes';
import { Contato } from './pages/Contato';
import { SugestoesUtilizacao } from './pages/SugestoesUtilizacao';
import { Seguranca } from './pages/Seguranca';
import { Torneamento } from './pages/Torneamento';
import { Fresamento } from './pages/Fresamento';
import { Furacao } from './pages/Furacao';
import { Videos } from './pages/Videos';
import { HomeAlt } from './pages/HomeAlt';
import { WhatsAppFAB } from './components/WhatsAppFAB';
import { LinearProgressBar } from './components/LinearProgressBar';

const App = () => {
  return (
    <Router>
      <LinearProgressBar />
      <WhatsAppFAB />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/a-recom" element={<ARecom />} />
        <Route path="/fornecedores-catalogos" element={<Fornecedores />} />
        <Route path="/fornecedores-catalogos/:id" element={<FornecedorDetalhe />} />
        <Route path="/solucoes" element={<Solucoes />} />
        <Route path="/solucoes/:id" element={<SolucaoDetalhe />} />
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

export { App };
