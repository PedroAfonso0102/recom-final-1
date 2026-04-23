import React from 'react';
import { Layout } from '../components/Layout';
import { Link, useParams } from 'react-router-dom';
import { CartaoFornecedor } from '../components/CartaoFornecedor';
import { SEO } from '../components/SEO';
import fornecedores from '../data/fornecedores.json';
import styles from './FornecedoresCatalogos.module.css';

export const FornecedoresCatalogos = () => {
  const { slug } = useParams();

  const fornecedorSelecionado = slug
    ? fornecedores.find(f => f.slug === slug)
    : null;

  if (fornecedorSelecionado) {
    return (
      <Layout>
        <SEO
          title={fornecedorSelecionado.nome}
          description={fornecedorSelecionado.descricaoCurta}
        />
        <div className={styles.location}>
          <div className={styles.whereCenter}>
            Você está em: <Link to="/">Home</Link> &gt; <Link to="/fornecedores-catalogos">Fornecedores</Link> &gt; {fornecedorSelecionado.nome}
          </div>
        </div>

        <div className={styles.container}>
          <div className={styles.fornecedorHeader}>
            <div className={styles.fornecedorLogo}>
              <img src={fornecedorSelecionado.logo} alt={fornecedorSelecionado.nome} className="res-img-logo" />
            </div>
            <div className={styles.fornecedorInfo}>
              <h1 className={styles.title}>{fornecedorSelecionado.nome}</h1>
              <p className={styles.description}>{fornecedorSelecionado.descricaoLonga}</p>
              <div className={styles.actions}>
                <a href={fornecedorSelecionado.linkCatalogo} target="_blank" rel="noopener noreferrer" className={styles.primaryBtn}>
                  Acessar Catálogo Oficial
                </a>
                <Link to="/contato" className={styles.secondaryBtn}>
                  Solicitar Orçamento
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEO
        title="Fornecedores & Catálogos"
        description="Confira a lista de fornecedores parceiros da RECOM e acesse catálogos oficiais da Mitsubishi Materials, 7Leaders e mais."
      />
      <div className={styles.location}>
        <div className={styles.whereCenter}>
          Você está em: <Link to="/">Home</Link> &gt; Fornecedores & Catálogos
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.headerSecao}>
          <h1 className={styles.title}>Fornecedores & Catálogos</h1>
          <p className={styles.subtitle}>Trabalhamos com as melhores marcas do mercado para oferecer soluções de alta performance.</p>
        </div>

        <div className={styles.gridFornecedores}>
          {fornecedores.map(fornecedor => (
            <CartaoFornecedor key={fornecedor.id} fornecedor={fornecedor} />
          ))}
        </div>
      </div>
    </Layout>
  );
};
