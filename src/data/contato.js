/**
 * Dados centralizados de contato da RECOM.
 * Fonte única de verdade para todo o site.
 * Etapa 6: "informações sensíveis e recorrentes devem ter uma origem editorial clara"
 */
export const contato = {
  empresa: 'RECOM Metal Duro',
  razaoSocial: 'A A Montelione Comercio Ltda.',
  cnpj: '62.137.369/0001-06',
  fundacao: 1990,
  parceriaMitsubishiDesde: 1998,
  endereco: {
    rua: 'Rua Alferes João José, 350',
    cidade: 'Campinas',
    estado: 'SP',
    cep: '13070-063',
    completo: 'Rua Alferes João José, 350, Campinas/SP',
    googleMapsUrl: 'https://www.google.com/maps/place/R.+Alferes+Jo%C3%A3o+Jos%C3%A9,+350+-+Centro,+Campinas+-+SP,+13070-063',
  },
  telefone: {
    display: '(19) 3233-2224',
    href: 'tel:+551932332224',
    numero: '+551932332224',
  },
  email: {
    display: 'vendas.recom@montelione.com.br',
    href: 'mailto:vendas.recom@montelione.com.br',
  },
  whatsapp: {
    numero: '551932332224',
    href: 'https://wa.me/551932332224',
    mensagem: 'Olá, gostaria de mais informações sobre ferramentas de usinagem.',
    hrefComMensagem: 'https://wa.me/551932332224?text=Ol%C3%A1%2C%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20ferramentas%20de%20usinagem.',
  },
  instagram: {
    usuario: '@recomferramentas',
    url: 'https://www.instagram.com/recomferramentas/',
  },
  siteUrl: 'https://www.recommetalduro.com.br',
};

/**
 * Textos institucionais centralizados.
 * Alinhado à Etapa 3: tom profissional, claro e direto.
 */
export const institucional = {
  tagline: 'Ferramentas para usinagem desde 1990',
  propostaDeValor: 'Conectamos clientes industriais a fornecedores reconhecidos, com atendimento técnico-comercial próximo, leitura objetiva da aplicação e apoio direto à compra de usinagem.',
  descricaoCurta: 'A RECOM atua com ferramentas e soluções para usinagem, com presença consolidada desde 1990 em Campinas-SP, atendimento técnico-comercial e acesso a fornecedores reconhecidos.',
  descricaoFooter: 'Ferramentas para usinagem desde 1990. Atendimento técnico-comercial em Campinas-SP e todo o interior paulista.',
};
