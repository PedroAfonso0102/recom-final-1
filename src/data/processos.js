/**
 * Dados centralizados dos processos de usinagem.
 * Etapa 2: "Soluções / Processos como hub de descoberta por necessidade prática"
 */

import { Crosshair, Box, Circle } from 'lucide-react';

export const processos = [
  {
    id: 'torneamento',
    nome: 'Torneamento',
    slug: 'torneamento',
    icone: 'Crosshair',
    descricaoCurta: 'Operações de usinagem rotativa para peças cilíndricas, cônicas e perfiladas com alta precisão dimensional.',
    descricao: 'O torneamento é um dos processos mais fundamentais da usinagem, utilizado para produzir peças cilíndricas, cônicas e perfiladas com alta precisão. A RECOM oferece acesso a ferramentas de corte otimizadas para torneamento externo, interno, rosqueamento e canal, com insertos e suportes das principais marcas do mercado.',
    fornecedoresRelacionados: ['mitsubishi-materials', '7leaders'],
    keywords: ['torneamento', 'insertos', 'suportes', 'torno CNC', 'usinagem rotativa'],
    metaTitle: 'Torneamento — Ferramentas de Corte para Torno | RECOM Metal Duro',
    metaDescription: 'Ferramentas para torneamento externo, interno e rosqueamento. Insertos e suportes de fornecedores líderes. Distribuição B2B em Campinas-SP.',
  },
  {
    id: 'fresamento',
    nome: 'Fresamento',
    slug: 'fresamento',
    icone: 'Box',
    descricaoCurta: 'Ferramentas para usinagem de superfícies planas, canais, cavidades e contornos complexos.',
    descricao: 'O fresamento permite usinar superfícies planas, canais, cavidades e contornos complexos com versatilidade e precisão. A RECOM disponibiliza fresas, insertos e porta-ferramentas para fresamento de faceamento, de topo, de perfil e em altas taxas de avanço.',
    fornecedoresRelacionados: ['mitsubishi-materials', '7leaders'],
    keywords: ['fresamento', 'fresas', 'insertos', 'centro de usinagem', 'CNC'],
    metaTitle: 'Fresamento — Fresas e Insertos para Usinagem | RECOM Metal Duro',
    metaDescription: 'Fresas e insertos para fresamento de faceamento, topo e perfil. Fornecedores líderes globais. Distribuição B2B em Campinas-SP.',
  },
  {
    id: 'furacao',
    nome: 'Furação',
    slug: 'furacao',
    icone: 'Circle',
    descricaoCurta: 'Brocas e sistemas de furação para operações de alta produtividade e precisão.',
    descricao: 'A furação é essencial em praticamente todos os processos de fabricação mecânica. A RECOM oferece brocas inteiriças, brocas com insertos intercambiáveis e sistemas de furação profunda das principais marcas, projetados para alta produtividade e vida útil prolongada.',
    fornecedoresRelacionados: ['mitsubishi-materials'],
    keywords: ['furação', 'brocas', 'furação profunda', 'broca CNC', 'ferramentas de corte'],
    metaTitle: 'Furação — Brocas e Sistemas de Furação | RECOM Metal Duro',
    metaDescription: 'Brocas inteiriças e com insertos para furação de alta performance. Fornecedores líderes em Campinas-SP. Solicite orçamento.',
  },
];

export const getProcessoBySlug = (slug) => processos.find(p => p.slug === slug);
