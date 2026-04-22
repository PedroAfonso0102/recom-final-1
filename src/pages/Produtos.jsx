import React from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import styles from './Page.module.css';
import ProductSidebar from '../components/ProductSidebar';

import kougImg from '../assets/images/Upscaled/koug.png';
import makeeImg from '../assets/images/Upscaled/makee.png';
import kirehaeImg from '../assets/images/Upscaled/kirehae.png';
import tornoGif from '../assets/images/torno.gif';
import fresaGif from '../assets/images/fresa.gif';
import furacaoGif from '../assets/images/furacao.gif';

const Produtos = () => {
  return (
    <Layout>
      <div className={styles.location}>
        <div className={styles.whereCenter}>
          Você está em: <Link to="/">Home</Link> &gt; O que é Metal Duro?
        </div>
      </div>
      
      <div className={styles.centerData}>
        <ProductSidebar />
        
        <div className={styles.textBox}>
          <div className={styles.mainProductTitle}>Introdução</div>
          
          <section className={styles.modularSection}>
            <div className={styles.modularText}>
              <p className={styles.just}>
                Estamos rodeados por muitos produtos metálicos em nosso dia-a-dia. Você sabe como esses produtos são fabricados? Há muitas maneiras de usinar metais, mas o método mais utilizado é o corte. Aqui vamos aprender sobre ferramentas de corte e processos de corte. O que queremos dizer com "ferramentas de corte"?<br/><br/>

                Primeiro, vejamos alguns exemplos de ferramentas de corte presentes em nosso dia-a-dia... facas e raladores na cozinha, tesouras e apontadores nos escritórios e serrotes e plainas na garagem são ferramentas de corte.<br/><br/>

                Estas ferramentas de corte possuem uma característica comum que é a de mudar o formato de coisas pelo corte e/ou pela produção de cavacos.<br/><br/>

                Como você viu até agora, ferramentas de corte são ferramentas que cortam coisas para que adquiram um formato desejado. Ferramentas de corte em nosso dia-a-dia cortam frutas, vegetais e madeira, mas as ferramentas de corte produzidas pela Mitsubishi Materials cortam materiais mais duros, como aço.<br/><br/>

                Agora, vejamos as ferramentas de corte para usinar aço, o principal material industrial no mundo.
              </p>
            </div>
            <div className={styles.modularVisual}>
              <img src={kougImg} alt="Ferramentas de Corte" className="res-img-standard" />
            </div>
          </section>

          <section className={`${styles.modularSection} ${styles.reverse}`}>
            <div className={styles.modularText}>
              <h2 className={styles.productTitle}>Processo de Fabricação</h2>
              <p className={styles.just}>
                Vamos ver o processo de fabricação de metal duro. Primeiro, misture carboneto de tungstênio com cobalto para chegar ao pó que é classificado como matéria-prima.<br/><br/>

                A mistura granulada é colocada num molde côncavo e é prensada. Isso fornece uma consistência moderada como a do giz.<br/><br/>

                Depois, o compacto prensado é colocado num forno de sinterização e é aquecido a uma temperatura de aproximadamente 1400°C, resultando no metal duro. Depois de sinterizado, o volume diminui consideravelmente.<br/><br/>

                Além disso, a dureza do metal duro está entre a dureza do diamante e da safira e o seu peso é aproximadamente duas vezes o aço. Então, como cortamos esse material tão duro?
              </p>
            </div>
            <div className={styles.modularVisual}>
              <img src={makeeImg} alt="Processo de Fabricação" className="res-img-standard" />
            </div>
          </section>

          <section className={styles.modularSection}>
            <div className={styles.modularText}>
              <h2 className={styles.productTitle}>O que é Usinagem?</h2>
              <p className={styles.just}>
                A figura à direita mostra a condição de uma aresta de corte durante a usinagem. A aresta de corte corta o material e produz cavacos. A temperatura na ponta da aresta de corte chega a 800°C devido ao impacto e à fricção. As classes de metal duro que suportam essas altas temperaturas são mais bem sucedidas. O metal duro moldado em diferentes formas mais conhecido é o inserto indexável. Insertos indexáveis são utilizados em formas variadas de suportes e são selecionados de acordo com o formato do material a ser usinado e o método de usinagem.
              </p>
            </div>
            <div className={styles.modularVisual}>
              <img src={kirehaeImg} alt="Aresta de Corte" className="res-img-standard" />
            </div>
          </section>

          <div className={`${styles.mainProductTitle} ${styles.sectionTopSpace}`}>Processos Principais</div>

          <div className={styles.safetyGrid}>
            <div className={styles.safetyCard}>
              <div className={styles.modularVisual}>
                <img src={tornoGif} alt="Torneamento" className="res-img-standard" />
              </div>
              <div className={styles.precautionZone}>
                <strong>01. Torneamento</strong>
                <p>O material usinado gira enquanto a ferramenta corta. A máquina utilizada é o torno.</p>
              </div>
            </div>

            <div className={styles.safetyCard}>
              <div className={styles.modularVisual}>
                <img src={fresaGif} alt="Fresamento" className="res-img-standard" />
              </div>
              <div className={styles.precautionZone}>
                <strong>02. Fresamento</strong>
                <p>A ferramenta gira para usinar superfícies e perfis. A máquina utilizada é a fresadora.</p>
              </div>
            </div>

            <div className={styles.safetyCard}>
              <div className={styles.modularVisual}>
                <img src={furacaoGif} alt="Furação" className="res-img-standard" />
              </div>
              <div className={styles.precautionZone}>
                <strong>03. Furação</strong>
                <p>Produz furos circulares. Pode ser utilizada tanto em tornos quanto em fresadoras.</p>
              </div>
            </div>
          </div>

          <div className={styles.highlightBlock}>
            <p className={styles.just}>
              <strong>Sumário:</strong> Como vimos, os métodos de usinagem são três principais: torneamento, fresamento e furação. Ao escolher uma determinada ferramenta conforme a aplicação, os metais duros podem ser usinados eficientemente. Atualmente, as ferramentas de metal duro se tornaram o principal motivo para o aumento da produtividade.
            </p>
          </div>

          <div className={styles.dataFooter}>
            <p className={styles.sourceText}>
              <strong>Fonte:</strong> MITSUBISHI MATERIALS
            </p>
          </div>
        </div>
        <div className={styles.clear}></div>
      </div>
    </Layout>
  );
};


export default Produtos;