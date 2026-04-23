import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Hexagon, Droplets } from 'lucide-react';
import styles from './ProcessoCard.module.css';

const icons = {
  torneamento: Target,
  fresamento: Hexagon,
  furacao: Droplets,
};

const ProcessoCard = ({ processo }) => {
  const Icon = icons[processo.id] || Hexagon;
  return (
    <article className={styles.card}>
      <div className={styles.iconWrapper}>
        <Icon size={32} className={styles.icon} />
      </div>
      <h3 className={styles.title}>{processo.nome}</h3>
      <p className={styles.description}>{processo.descricaoCurta}</p>
      <Link to={`/solucoes/${processo.id}`} className={styles.link}>
        Ver Soluções
      </Link>
    </article>
  );
};

export { ProcessoCard };
