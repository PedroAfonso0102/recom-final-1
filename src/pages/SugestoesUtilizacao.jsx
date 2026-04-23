import React from 'react';
import { Layout } from '../components/Layout';
import { Link } from 'react-router-dom';
import styles from './Page.module.css';
import { ProductSidebar } from '../components/ProductSidebar';
import { AlertTriangle, ShieldCheck } from 'lucide-react';

const SAFETY_DATA = [
  {
    category: "Todas as Ferramentas de Usinagem",
    items: [
      {
        danger: "Ferramentas de usinagem têm arestas de corte afiadas. Manuseá-las com mãos nuas pode provocar ferimentos.",
        precaution: "Tome precauções como utilizar luvas para manusear e instalar ferramentas."
      },
      {
        danger: "O uso impróprio de ferramentas e a aplicação de dados de corte inadequadas podem causar quebras e estilhaços que podem ser expelidos da máquina, provocando riscos de acidentes e ferimentos.",
        precaution: "Use equipamentos de proteção individuais adequados e óculos de proteção. Referencie-se nas notas explicativas de uso. Use ferramentas de acordo com as recomendações do catálogo."
      },
      {
        danger: "O aumento dos impactos e dos esforços de usinagem devido ao desgaste excessivo pode causar quebras e estilhaços que podem ser expelidos da máquina, provocando riscos de acidentes.",
        precaution: "Use equipamentos de proteção individuais adequados e óculos de proteção. Substitua a ferramenta antes do desgaste excessivo."
      },
      {
        danger: "Ferramentas e peças podem tornar-se extremamente quentes durante a usinagem. Tocá-las com mãos nuas pode causar queimaduras.",
        precaution: "Tome precauções como usar luvas."
      },
      {
        danger: "Cavacos quentes são produzidos e expelidos durante a usinagem provocando risco de ferimentos e queimaduras.",
        precaution: "Use E.P.I. adequados. Durante a remoção de detritos e limpeza da máquina, tenha certeza de que a máquina está parada e use luvas de proteção."
      },
      {
        danger: "Em usinagem, fagulhas, cavacos quentes e geração de calor causados por quebra da ferramenta provoca risco de ignição de fogo e incêndio.",
        precaution: "Evite utilizar ferramentas onde há possibilidade de ignição de fogo. Tenha certeza da localização dos extintores quando não usar refrigeração à base de óleo solúvel."
      },
      {
        danger: "O uso de máquinas, pinças e ferramentas sem balanceamento em altas rotações pode causar quebras e provocar riscos de ferimentos.",
        precaution: "Use equipamento de proteção adequados. Verifique a máquina sempre que existirem vibrações e sons anormais."
      },
      {
        danger: "Manusear peças usinadas com rebarbas com as mãos nuas podem provocar ferimentos.",
        precaution: "Use equipamento de proteção adequados tais como luvas e óculos de proteção."
      }
    ]
  },
  {
    category: "Insertos Intercambiáveis",
    items: [
      {
        danger: "Se insertos e componentes não forem fixados de forma apropriada, eles podem se soltar e ser expelidos produzindo riscos de ferimentos.",
        precaution: "Limpe os alojamentos dos insertos antes de fixá-los. Use a ferramenta adequada para fixar os insertos e assegure-se que estão bem fixos."
      },
      {
        danger: "Fixar insertos com força excessiva através do uso de extensões e canos podem quebrá-los e expeli-los.",
        precaution: "Não utilize extensões extras, apenas as chaves e componentes fornecidos."
      },
      {
        danger: "Quando utilizar ferramentas em usinagem de altas velocidades, componentes e insertos podem ser expelidos pela força centrífuga.",
        precaution: "Referencie-se nas notas explicativas dos catálogos. Utilize ferramentas dentro das recomendações de usinagem."
      }
    ]
  },
  {
    category: "Suportes e Outras Ferramentas Rotativas",
    items: [
      {
        danger: "Fresas têm arestas de corte afiadas. Manuseá-las com mãos nuas pode causar ferimentos.",
        precaution: "Tome precauções como usar luvas."
      },
      {
        danger: "Falta de balanceamento ou ferramentas fora de centro pode provocar vibrações e danos que podem causar sua quebra.",
        precaution: "Aplique velocidades de corte nas recomendações. Ajustes de precisão, balanceamento da árvore e substituição de rolamentos periodicamente previne vibrações."
      }
    ]
  },
  {
    category: "Brocas",
    items: [
      {
        danger: "Alguns casos de usinagem onde a peça gira podem produzir um disco afiado que pode causar a quebra da ferramenta.",
        precaution: "Use equipamentos de proteção individual adequados e óculos de proteção."
      },
      {
        danger: "Brocas com diâmetros extremamente pequenos têm uma ponta muito afiada que pode perfurar a pele. Quebras podem expelir estilhaços.",
        precaution: "Manuseie com cuidado. Use equipamentos de proteção individuais adequados e óculos de proteção."
      }
    ]
  },
  {
    category: "Ferramentas Soldadas",
    items: [
      {
        danger: "Fragilidade da solda e quebra de insertos podem causar danos.",
        precaution: "Antes do uso certifique-se de que estão bem soldados. Não utilize em condições que produzem altas temperaturas."
      }
    ]
  }
];

export const SugestoesUtilizacao = () => (
  <Layout>
    <div className={styles.location}>
      <div className={styles.whereCenter}>
        Você está em: <Link to="/">Home</Link> &gt; Produtos &gt; Sugestões de Utilização
      </div>
    </div>
    <div className={styles.centerData}>
      <ProductSidebar />

      <div className={styles.textBox}>
        <div className={styles.mainProductTitle}>Sugestões de Utilização Segura</div>
        <p className={styles.just}>
          A RECOM prioriza a segurança na operação industrial. Consulte abaixo os 
          principais riscos durante a usinagem e as precauções oficiais exigidas 
          para o manuseio correto das ferramentas.
        </p>

        <div className={styles.safetyContainer}>
          {SAFETY_DATA.map((section, idx) => (
            <div key={idx} className={styles.safetySection}>
              <h3 className={styles.safetyCategory}>{section.category}</h3>
              <div className={styles.safetyGrid}>
                {section.items.map((item, i) => (
                  <div key={i} className={styles.safetyCard}>
                    <div className={styles.dangerZone}>
                      <AlertTriangle className={styles.safetyIconDanger} size={20} strokeWidth={2.5} />
                      <strong>Perigo/Risco:</strong>
                      <p>{item.danger}</p>
                    </div>
                    <div className={styles.precautionZone}>
                      <ShieldCheck className={styles.safetyIconSafe} size={20} strokeWidth={2.5} />
                      <strong>Precaução:</strong>
                      <p>{item.precaution}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.safetyFooter}>
           <p><strong>Fonte:</strong> Baseado nas diretrizes técnicas da Mitsubishi Materials.</p>
           <p>Este guia complementa as precauções básicas para operação segura de produtos RECOM em ambiente industrial.</p>
        </div>

      </div>
    </div>
  </Layout>
);

