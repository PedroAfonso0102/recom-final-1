import React from 'react';
import { Layout } from '../components/Layout';
import { Link } from 'react-router-dom';
import styles from './Page.module.css';
import escritorioImg from '../assets/images/escritorio.jpg';
import { SEO } from '../components/SEO';

export const ARecom = () => {
  return (
    <Layout>
      <SEO
        title="A RECOM"
        description="Conheça a história da RECOM Metal Duro, distribuidor autorizado Mitsubishi Materials em Campinas desde 1990."
      />
      <div className={styles.location}>
        <div className={styles.whereCenter}>
          Você está em: <Link to="/">Home</Link> &gt; A Empresa
        </div>
      </div>
      
      <div className={styles.centerData}>
        <div className={styles.textBox}>
          <h1 className={styles.mainProductTitle}>A Empresa</h1>
          
          <div className={styles.floatingImage}>
            <img src={escritorioImg} alt="Escritório Recom" className={styles.standardImage} />
          </div>

          <p className={styles.just}>
            Fundada no ano de 1990 a <strong>"RECOM Metal Duro"</strong>, localizada em Campinas, interior do Estado de São Paulo, especializou-se em Ferramentas de Corte Rotativas e Estáticas.
          </p>
          
          <p className={styles.just}>
            A partir do ano de 1992, passamos a representar a <strong>"MITSUBISHI CARBIDE"</strong> através de um importador localizado em Belo Horizonte - MG, sendo responsáveis pelo atendimento da cidade de Campinas e região, bem como do interior do Estado de São Paulo.
          </p>

          <p className={styles.just}>
            Desde 1998, somos <strong>Representante e Distribuidor Autorizado</strong> direto da <strong>"MMC METAL DO BRASIL"</strong>, subsidiária da "MITSUBISHI MATERIALS" (Japão).
          </p>

          <p className={styles.just}>
            Contamos hoje com uma equipe de técnicos altamente treinados pelo Departamento Técnico da "MMC METAL DO BRASIL", preparada para oferecer o melhor atendimento e suporte aos nossos parceiros e clientes.
          </p>

          <div className={styles.missionBlock}>
             <p className={styles.missionTitle}>Nossa Missão</p>
             <p className={styles.just}>
               Fornecer soluções de alta tecnologia em ferramentas de corte, garantindo o aumento da produtividade e a redução de custos nos processos de usinagem de nossos clientes.
             </p>
          </div>
        </div>
        <div className={styles.clear}></div>
      </div>
    </Layout>
  );
};
