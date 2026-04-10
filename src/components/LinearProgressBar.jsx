import React, { useState, useEffect } from 'react';
import styles from './LinearProgressBar.module.css';

const LinearProgressBar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      
      setScrollProgress(scroll);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={styles.progressBarContainer}>
      <div 
        className={styles.progressBar} 
        style={{ transform: `scaleX(${scrollProgress})` }}
      />
    </div>
  );
};

export default LinearProgressBar;
