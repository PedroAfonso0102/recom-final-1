import React from 'react';
import { Layout } from '../components/Layout';
import { Link, useParams } from 'react-router-dom';
import { CartaoSolucao } from '../components/CartaoSolucao';
import { CartaoFornecedor } from '../components/CartaoFornecedor';
import { SEO } from '../components/SEO';
import solucoes from '../data/solucoes.json';
import fornecedores from '../data/fornecedores.json';
import styles from './Page.module.css'; // Reusando estilos base

export const Solucoes = () => {
  const { slug } = useParams();

  const solucaoSelecionada = slug
    ? solucoes.find(s => s.slug === slug)
    : null;

  if (solucaoSelecionada) {
    const fornecedoresRelacionados = fornecedores.filter(f =>
      solucaoSelecionada.fornecedoresRelacionados.includes(f.id)
    );

    return (
      <Layout>
        <SEO
          title={solucaoSelecionada.titulo}
          description={solucaoSelecionada.descricaoCurta}
        />
        <div className={styles.location}>
          <div className={styles.whereCenter}>
            Você está em: <Link to="/">Home</Link> &gt; <Link to="/solucoes">Soluções</Link> &gt; {solucaoSelecionada.titulo}
          </div>
        </div>

        <div className={styles.container}>
          <div className={styles.headerSecao}>
            <h1 className={styles.title}>{solucaoSelecionada.titulo}</h1>
            <p className={styles.subtitle}>{solucaoSelecionada.descricaoLonga}</p>
          </div>

          <div className={styles.secaoRelacionados}>
            <h2 className={styles.subtituloSecao}>Fornecedores Especialistas em {solucaoSelecionada.titulo}</h2>
            <div className={styles.grid}>
              {fornecedoresRelacionados.map(fornecedor => (
                <CartaoFornecedor key={fornecedor.id} fornecedor={fornecedor} />
              ))}
            </div>
          </div>

          <div className={styles.ctaFinal}>
            <h3>Precisa de ajuda técnica para este processo?</h3>
            <p>Nossos especialistas estão prontos para indicar a melhor ferramenta para sua aplicação.</p>
            <Link to="/contato" className={styles.primaryBtn}>Falar com Especialista</Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEO
        title="Soluções & Processos"
        description="Conheça nossas soluções para torneamento, fresamento, furação e fixação industrial. Ferramentas de alta performance."
      />
      <div className={styles.location}>
        <div className={styles.whereCenter}>
          Você está em: <Link to="/">Home</Link> &gt; Soluções & Processos
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.headerSecao}>
          <h1 className={styles.title}>Soluções & Processos de Usinagem</h1>
          <p className={styles.subtitle}>Encontre a solução ideal para cada necessidade técnica do seu processo produtivo.</p>
        </div>

        <div className={styles.grid}>
          {solucoes.map(solucao => (
            <CartaoSolucao key={solucao.id} solucao={solucao} />
          ))}
        </div>
      </div>
    </Layout>
  );
};
