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
  tagline: 'Distribuidor de ferramentas para usinagem em Campinas-SP',
  propostaDeValor: 'A RECOM conecta indústrias a fornecedores, catálogos oficiais e orientação técnica para ferramentas de corte e soluções de usinagem.',
  descricaoCurta: 'Distribuidor B2B de ferramentas para usinagem com base em Campinas-SP. Oferecemos atendimento técnico-comercial para orientar a consulta a catálogos oficiais e a solicitação de orçamentos.',
  descricaoFooter: 'Distribuidor de ferramentas para usinagem. Atendimento técnico-comercial direto em Campinas-SP.',
};

export const mensagensGlobais = {
  listaVazia: 'Nenhum item localizado. Fale com a RECOM para receber orientação comercial.',
  fornecedorSemCatalogo: 'Catálogo oficial não disponível no momento. Fale com a RECOM para consultar esta marca.',
  processoSemFornecedor: 'Ainda não há fornecedores mapeados para este processo. Fale com a RECOM para orientar sua aplicação.',
  promocaoEncerrada: 'Condição comercial sujeita a confirmação de disponibilidade.',
  imagemIndisponivel: 'Imagem ilustrativa indisponível.',
  erroFormulario: 'Não foi possível processar o envio agora. Tente novamente ou use nossos canais diretos.',
  linkExternoIndisponivel: 'Material oficial não localizado. Fale com a RECOM para receber a documentação correta.',
};
