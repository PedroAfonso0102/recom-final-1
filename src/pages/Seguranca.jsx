import React from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import styles from './Page.module.css';
import ProductSidebar from '../components/ProductSidebar';

const Seguranca = () => (
  <Layout>
    <div className={styles.location}>
      <div className={styles.whereCenter}>
        Você está em: <Link to="/">Home</Link> &gt; Produtos &gt; Segurança nas Ferramentas
      </div>
    </div>
    <div className={styles.centerData}>
      <ProductSidebar />

      <div className={styles.textBox}>
        <div className={styles.mainProductTitle}>Segurança nas Ferramentas</div>
        
        <h3 className={styles.productTitle}>1. Utilização de Ferramentas de Corte</h3>
        <p className={styles.just}>
          As embalagens dos produtos Mitsubishi trazem uma etiqueta com um aviso. No entanto, algumas ferramentas podem não trazer informações detalhadas de segurança. Leia com atenção as indicações de segurança contidas nesta seção do catálogo antes de manusear ferramentas e outros materiais de metal duro. Além disso, como parte do programa de treinamento em segurança na empresa, notifique todos os seus funcionários sobre o conteúdo desta seção.
        </p>

        <h3 className={styles.productTitle}>2. Características Básicas dos Metais das Ferramentas</h3>
        <p className={styles.just}>
          <strong>Termos de "Segurança das Ferramentas de Metal Duro"</strong><br/><br/>
          <strong>Ferramentas de Metais Duros:</strong><br/>
          Termo geral para ferramentas de metais como liga de metal duro, cermet, cerâmicas, CBN sinterizado, diamante sinterizado, etc.<br/><br/>
          <strong>Liga de metal duro:</strong><br/>
          Ferramentas com materiais que possuem WC (Carboneto de Tungstênio) como componente principal.
        </p>

        <h4 className={styles.productTitle}>Características Físicas</h4>
        <ul className={`${styles.just} ${styles.squareList}`}>
          <li><strong>Aparência:</strong> Varia conforme o tipo do material. Ex. cinza, preto, ouro, etc.</li>
          <li><strong>Cheiro:</strong> Nenhum</li>
          <li><strong>Dureza:</strong>
            <ul className={styles.circleList}>
              <li>Metal duro, Cermet HV500-3000kg/mm²</li>
              <li>Cerâmicas HV1000-4000kg/mm²</li>
              <li>CBN Sinterizado HV2000-5000kg/mm²</li>
              <li>Diamante Sinterizado HV8000-12000kg/mm²</li>
            </ul>
          </li>
          <li><strong>Peso específico:</strong>
            <ul className={styles.circleList}>
              <li>Metal duro 9-16, Cermet 5-9</li>
              <li>Cerâmicas 2-7, Sinterizado CBN e Diamante 3-5</li>
            </ul>
          </li>
        </ul>

        <p className={styles.just}>
          <strong>Componentes</strong><br/>
          Metal duro, nitreto, carbonitreto, óxidos como W, Ti, Al, Si, Ta, B e metais como Co, Ni, Cr, Mo.
        </p>

        <h3 className={styles.productTitle}>3. Sugestões de Manuseio de Ferramentas de Metal Duro</h3>
        <ul className={`${styles.just} ${styles.squareList}`}>
          <li>Os materiais das ferramentas são extremamente duros e quebradiços ao mesmo tempo. Portanto, podem quebrar-se por choques ou apertos excessivos.</li>
          <li>Ferramentas de metal duro possuem peso específico elevado. Por isso, exigem atenção especial como materiais pesados quando o tamanho ou a quantidade forem grandes.</li>
          <li>Materiais das ferramentas e os materiais ferrosos possuem coeficientes de dilatação térmica diferentes. Contração ou expansão para montagem desses produtos podem causar quebras quando aplicadas em temperaturas maiores que as apropriadas às ferramentas.</li>
          <li>Tenha atenção especial na armazenagem desses materiais. Sua tenacidade é diminuída quando são corroídos por óleos refrigerantes ou outros líquidos.</li>
          <li>Para maiores informações, consulte nosso Catálogo de Dados de Segurança dos Materiais. <a href="http://www.mitsubishicarbide.com/msds/" target="_blank" rel="noopener noreferrer" className={styles.contactLink}>http://www.mitsubishicarbide.com/msds/</a></li>
        </ul>

        <h3 className={styles.productTitle}>4. Sugestões de Utilização de Ferramentas de Corte</h3>
        <ul className={`${styles.just} ${styles.squareList}`}>
          <li>Condições superficiais afetam a tenacidade das ferramentas de corte. Portanto, utilize um rebolo diamantado para o acabamento.</li>
          <li>Afiação das ferramentas de corte produz poeira. Inalar grandes volumes desta poeira pode ser prejudicial. Portanto, utilize sistema de ventilação local, máscara de proteção e etc. Se a poeira entrar nos seus olhos ou na sua pele, lave a área em água corrente.</li>
          <li>Afiação de ferramentas de materiais duros ou produtos soldados produzem partículas de metal pesado na refrigeração. Atente-se ao descarte do líquido refrigerante.</li>
          <li>Após a reafiação de ferramentas, assegure-se de que não há trincas.</li>
          <li>Marcar ferramentas e produtos de metais duros com lâmina e/ou caneta elétrica pode causar rachaduras. Evite a utilização de marcas em áreas que recebam qualquer tipo de esforço.</li>
          <li>Usinagem de metais duros de ferramentas em eletroerosão pode causar rachaduras na superfície devido aos elétrons residuais resultando em redução da tenacidade. Elimine as rachaduras através de retífica, etc.</li>
          <li>Ao soldar ferramentas de metais duros, podem ocorrer quebras e danos se a temperatura for muito acima ou muito abaixo do ponto de derretimento do material de solda.</li>
        </ul>

        <div className={styles.dataFooter}>
          <p className={styles.sourceText}>
            <strong>Fonte:</strong> MITSUBISHI MATERIALS<br />
            Para maiores informações, consulte o Catálogo de Dados de Segurança (MSDS).
          </p>
        </div>
      </div>
      <div className={styles.clear}></div>
    </div>
  </Layout>
);

export default Seguranca;
