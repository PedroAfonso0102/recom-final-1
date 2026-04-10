import React from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import styles from './Page.module.css';
import ProductSidebar from '../components/ProductSidebar';

const SugestoesUtilizacao = () => (
  <Layout>
    <div className={styles.location}>
      <div className={styles.whereCenter}>
        Você está em: <Link to="/">Home</Link> &gt; Produtos &gt; Sugestões de Utilização
      </div>
    </div>
    <div className={styles.centerData}>
      <ProductSidebar />

      <div className={styles.textBox}>
        <div className={styles.mainProductTitle}>Sugestões de Utilização</div>
        
        <div className={styles.tableContainer}>
          <table className={styles.productTable}>
            <thead>
              <tr>
                <th>Produtos</th>
                <th>Perigo</th>
                <th>Precaução</th>
              </tr>
            </thead>
            <tbody>
              {/* Todas as Ferramentas */}
              <tr className={styles.categoryRow}>
                <td>Todas as Ferramentas de Usinagem</td>
                <td>Ferramentas de usinagem têm arestas de corte afiadas. Manuseá-las com mãos nuas pode provocar ferimentos.</td>
                <td>*Tome precauções como utilizar luvas para manusear e instalar ferramentas.</td>
              </tr>
              <tr>
                <td></td>
                <td>O uso impróprio de ferramentas e a aplicação de dados de corte inadequadas podem causar quebras e estilhaços que podem ser expelidos da máquina, provocando riscos de acidentes e ferimentos.</td>
                <td>*Use equipamentos de proteção individuais adequados e óculos de proteção. *Referencie-se nas notas explicativas de uso. Use ferramentas de acordo com as recomendações do catálogo.</td>
              </tr>
              <tr>
                <td></td>
                <td>O aumento dos impactos e dos esforços de usinagem devido ao desgaste excessivo pode causar quebras e estilhaços que podem ser expelidos da máquina, provocando riscos de acidentes e ferimentos.</td>
                <td>*Use equipamentos de proteção individuais adequados e óculos de proteção. *Substitua a ferramenta antes do desgaste excessivo.</td>
              </tr>
              <tr>
                <td></td>
                <td>Ferramentas e peças podem tornar-se extremamente quentes durante a usinagem. Tocá-las com mãos nuas pode causar queimaduras.</td>
                <td>*Tome precauções como usar luvas.</td>
              </tr>
              <tr>
                <td></td>
                <td>Cavacos quentes são produzidos e expelidos durante a usinagem provocando risco de ferimentos e queimaduras.</td>
                <td>*Use equipamentos de proteção individuais adequados e óculos de proteção. *Durante a remoção de detritos e limpeza da máquina, tenha certeza de que a máquina está parada e use luvas de proteção.</td>
              </tr>
              <tr>
                <td></td>
                <td>Em usinagem, fagulhas, cavacos quentes e geração de calor causados por quebra da ferramenta provoca risco de ignição de fogo e incêndio.</td>
                <td>*Evite utilizar ferramentas onde há la possibilidade de ignição de fogo e incêndio. *Tenha certeza da localização dos extintores de incêndio quando não usar refrigeração à base de óleo solúvel.</td>
              </tr>
              <tr>
                <td></td>
                <td>O uso de máquinas, pinças e ferramentas sem balanceamento em altas rotações pode causar quebras e provocar riscos de ferimentos.</td>
                <td>*Use equipamento de proteção adequados e óculos de proteção. *Verifique a máquina sempre que existirem vibrações e sons anormais.</td>
              </tr>
              <tr>
                <td></td>
                <td>Manusear peças usinadas com rebarbas com as mãos nuas podem provocar ferimentos.</td>
                <td>*Use equipamento de proteção adequados tais como luvas e óculos de proteção.</td>
              </tr>

              {/* Insertos Intercambiáveis */}
              <tr className={styles.categoryRow}>
                <td>Insertos Intercambiáveis</td>
                <td>Se insertos e componentes não forem fixados de forma apropriada, eles podem se soltar e ser expelidos produzindo riscos de ferimentos.</td>
                <td>*Limpe os alojamentos dos insertos antes de fixá-los. *Use a ferramenta adequada para fixar os insertos e assegure-se que insertos e componentes estão bem fixos. Não utilize as ferramentas para outros fins que não sejam os prescritos.</td>
              </tr>
              <tr>
                <td></td>
                <td>Fixar insertos e componentes with força excessivas através do uso de extensões e canos podem quebrá-los e expeli-los.</td>
                <td>*Não utilize extensões extras, apenas as ferramentas e componentes fornecidos.</td>
              </tr>
              <tr>
                <td></td>
                <td>Quando utilizar ferramentas em usinagem de altas velocidades, componentes e insertos podem ser expelidos pela força centrífuga.</td>
                <td>*Referencie-se nas notas explicativas dos catálogos. Utilize ferramentas dentro das recomendações de usinagem.</td>
              </tr>

              {/* Suportes e Rotativas */}
              <tr className={styles.categoryRow}>
                <td>Suportes e Outras Ferramentas Rotativas</td>
                <td>Fresas têm arestas de corte afiadas. Manuseá-las com mãos nuas pode causar ferimentos.</td>
                <td>*Tome precauções como usar luvas.</td>
              </tr>
              <tr>
                <td></td>
                <td>Falta de balanceamento ou ferramentas fora de centro pode provocar vibrações e danos que podem causar sua quebra e expelir fragmentos da máquina.</td>
                <td>*Aplique velocidades de corte dentro das recomendações de usinagem. *Ajustes de precisão, balanceamento da árvore e substituição dos rolamentos da máquina periodicamente previne rotações excêntricas e vibrações causadas pelo desgaste destes componentes.</td>
              </tr>

              {/* Brocas */}
              <tr className={styles.categoryRow}>
                <td>Brocas</td>
                <td>Alguns casos de usinagem onde a peça gira podem produzir um disco afiado que pode causar a quebra da ferramenta.</td>
                <td>*Use equipamentos de proteção individual adequados e óculos de proteção.</td>
              </tr>
              <tr>
                <td></td>
                <td>Brocas com diâmetros extremamente pequenos têm uma ponta muito afiada que pode perfurar a pele se não manuseadas com cuidado. Se a broca quebrar durante a usinagem alguns estilhaços podem ser expelidos.</td>
                <td>*Manuseie com cuidado. Use equipamentos de proteção individuais adequados e óculos de proteção.</td>
              </tr>

              {/* Ferramentas Soldadas */}
              <tr className={styles.categoryRow}>
                <td>Ferramentas Soldadas</td>
                <td>Fragilidade da solda e quebra de insertos podem causar danos.</td>
                <td>*Antes do uso certifique-se de que estão bem soldados. *Não utilize em condições que produzem altas temperaturas.</td>
              </tr>

              {/* Outras */}
              <tr className={styles.categoryRow}>
                <td>Outras</td>
                <td>Máquinas e ferramentas podem sofrer danos se eles são utilizados para outros propósitos além dos quais foram projetados.</td>
                <td>*Utilize-os somente para o que são indicados.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: '30px', borderTop: '1px solid #eee', paddingTop: '10px' }}>
          <p className={styles.just} style={{ fontSize: '11px', color: '#666' }}>
            <strong>Fonte:</strong> MITSUBISHI MATERIALS<br />
            Este catálogo completa as precauções básicas para utilização de nossos produtos com segurança.
          </p>
        </div>
      </div>
    </div>
  </Layout>
);

export default SugestoesUtilizacao;
