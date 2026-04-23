import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import { Inicio } from './pages/Inicio';
import { ARecom } from './pages/ARecom';
import { FornecedoresCatalogos } from './pages/FornecedoresCatalogos';
import { Solucoes } from './pages/Solucoes';
import { Promocoes } from './pages/PromocoesPage';
import { ContatoPage as Contato } from './pages/ContatoPage';
import { Torneamento as SolucaoTorneamento } from './pages/SolucaoTorneamento';
import { Fresamento as SolucaoFresamento } from './pages/SolucaoFresamento';
import { Furacao as SolucaoFuracao } from './pages/SolucaoFuracao';
import { Seguranca } from './pages/Seguranca';
import { SugestoesUtilizacao } from './pages/SugestoesUtilizacao';

import { WhatsAppFAB } from './components/WhatsAppFAB';
import { LinearProgressBar } from './components/LinearProgressBar';

export const App = () => {
  return (
    <Router>
      <LinearProgressBar />
      <WhatsAppFAB />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/a-recom" element={<ARecom />} />
        <Route path="/fornecedores-catalogos" element={<FornecedoresCatalogos />} />
        <Route path="/fornecedores-catalogos/:slug" element={<FornecedoresCatalogos />} />
        <Route path="/solucoes" element={<Solucoes />} />
        <Route path="/solucoes/torneamento" element={<SolucaoTorneamento />} />
        <Route path="/solucoes/fresamento" element={<SolucaoFresamento />} />
        <Route path="/solucoes/furacao" element={<SolucaoFuracao />} />
        <Route path="/solucoes/:slug" element={<Solucoes />} />
        <Route path="/promocoes" element={<Promocoes />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/politica-de-privacidade" element={<Seguranca />} />
        <Route path="/termos-de-uso" element={<SugestoesUtilizacao />} />
      </Routes>
    </Router>
  );
};
