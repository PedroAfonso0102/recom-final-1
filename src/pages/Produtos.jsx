import React from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import styles from './Page.module.css';
import ProductSidebar from '../components/ProductSidebar';

import kougImg from '../assets/images/koug.png';
import makeeImg from '../assets/images/makee.png';
import koudoeImg from '../assets/images/koudoe.png';
import kirehaeImg from '../assets/images/kirehae.png';
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
          <p className={styles.just}>
            <img src={kougImg} align="right" className={styles.justTextLeft} alt="Koug" />
            Estamos rodeados por muitos produtos metálicos em nosso dia-a-dia. Você sabe como esses produtos são fabricados? Há muitas maneiras de usinar metais, mas o método mais utilizado é o corte. Aqui vamos aprender sobre ferramentas de corte e processos de corte. O que queremos dizer com "ferramentas de corte"?<br/><br/>

            Primeiro, vejamos alguns exemplos de ferramentas de corte presentes em nosso dia-a-dia... facas e raladores na cozinha, tesouras e apontadores nos escritórios e serrotes e plainas na garagem são ferramentas de corte.<br/><br/>

            Estas ferramentas de corte possuem uma característica comum que é a de mudar o formato de coisas pelo corte e/ou pela produção de cavacos.<br/><br/>

            Como você viu até agora, ferramentas de corte são ferramentas que cortam coisas para que adquiram um formato desejado. Ferramentas de corte em nosso dia-a-dia cortam frutas, vegetais e madeira, mas as ferramentas de corte produzidas pela Mitsubishi Materials cortam materiais mais duros, como aço.<br/><br/>

            Agora, vejamos as ferramentas de corte para usinar aço, o principal material industrial no mundo.
          </p>
          <div className={styles.clear}></div>

          <h2 className={styles.productTitle}>Processo de Fabricação de Ferramentas de Metal Duro</h2>
          <p className={styles.just}>
            <img src={makeeImg} align="right" className={styles.justTextLeft} alt="Make" />
            Vamos ver o processo de fabricação de metal duro. Primeiro, misture carboneto de tungstênio com cobalto para chegar ao pó que é classificado como matéria-prima.<br/><br/>

            A mistura granulada é colocada num molde côncavo e é prensada. Isso fornece uma consistência moderada como a do giz.<br/><br/>

            Depois, o compacto prensado é colocado num forno de sinterização e é aquecido a uma temperatura de aproximadamente 1400°C, resultando no metal duro. Depois de sinterizado, o volume diminui consideravelmente.<br/><br/>

            <img src={koudoeImg} align="left" className={styles.justTextRight} alt="Koudoe" />
            Além disso, a dureza do metal duro está entre a dureza do diamante e da safira e o seu peso é aproximadamente duas vezes o aço. Então, como cortamos esse material tão duro?
          </p>

          <div className={styles.clear}></div>

          <h2 className={styles.productTitle}>O que é Usinagem?</h2>
          <p className={styles.just}>
            <img src={kirehaeImg} align="right" className={styles.justTextLeft} alt="Kireha" />
            A figura à direita mostra a condição de uma aresta de corte durante a usinagem. A aresta de corte corta o material e produz cavacos. A temperatura na ponta da aresta de corte chega a 800°C devido ao impacto e à fricção. As classes de metal duro que suportam essas altas temperaturas são mais bem sucedidas. O metal duro moldado em diferentes formas mais conhecido é o inserto indexável. Insertos indexáveis são utilizados em formas variadas de suportes e são selecionados de acordo com o formato do material a ser usinado e o método de usinagem.
          </p>
          <div className={styles.clear}></div>

          <h2 className={styles.productTitle}>1. Torneamento</h2>
          <p className={styles.just}>
            <img src={tornoGif} align="right" className={styles.justTextLeft} alt="Torno" />
            Suporte externo e barra de mandrilar interna fabrica peças de formato arredondado. Os processos que utilizam suporte externo e barra de mandrilar são chamados de torneamento, e sua principal característica é que o material usinado gira. A máquina utilizada para torneamento é chamada de torno.
          </p>
          <div className={styles.clear}></div>

          <h2 className={styles.productTitle}>2. Fresamento</h2>
          <p className={styles.just}>
            <img src={fresaGif} align="right" className={styles.justTextLeft} alt="Fresa" />
            A ferramenta na foto à direita é uma fresa. As fresas podem ser divididas em dois tipos: uma é a fresa de facear que usina a superfície do material e a outra é a fresa de topo que realiza usinagem de perfis e canais a 90°. Os métodos de usinagem que utilizam fresas de facear e fresas de topo são chamados de operações de fresamento e a principal característica é que a ferramenta gira. A máquina utilizada para fresamento é chamada de fresadora.
          </p>
          <div className={styles.clear}></div>

          <h2 className={styles.productTitle}>3. Furação</h2>
          <p className={styles.just}>
            <img src={furacaoGif} align="right" className={styles.justTextLeft} alt="Furação" />
            A foto à direita é uma ferramenta que produz furos circulares em materiais e é chamada de broca. Brocas de insertos indexáveis e soldadas, produzem furos relativamente maiores e as brocas inteiriças produzem furos menores. A principal característica da furação é que pode ser utilizada tanto em máquinas para fresamento como para torneamento.
          </p>
          <div className={styles.clear}></div>

          <h2 className={styles.productTitle}>Sumário</h2>
          <p className={styles.just}>
            Como vimos, os métodos de usinagem são três principais: torneamento, fresamento e furação. Ao escolher uma determinada ferramenta conforme a aplicação, os metais duros podem ser usinados eficientemente. Atualmente, as ferramentas de metal duro se tornaram o principal motivo para o aumento da produtividade enquanto pesquisas desenvolvem constantemente novos produtos para usinagens mais rápidas e mais precisas, o que reduz os custos de fabricação.
          </p>

          <div style={{ marginTop: '30px', borderTop: '1px solid #eee', paddingTop: '10px' }}>
            <p className={styles.just} style={{ fontSize: '11px', color: '#666' }}>
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