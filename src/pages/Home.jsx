import React, { useState, useEffect, useCallback } from 'react';
import Layout from '../components/Layout';
import styles from './Home.module.css';

import logoMitsubishi from '../assets/images/logo_mitsubishi.png';
import logo7leaders from '../assets/images/logo_7leaders.png';
import logoBtfixo from '../assets/images/logo_btfixo.png';
import logoKifix from '../assets/images/logo_kifix.png';

// Slider images
import linhaMitsu from '../assets/images/linha_mitsu.jpg';
import torneamento1 from '../assets/images/torneamento1.jpg';
import torneamento2 from '../assets/images/torneamento2.jpg';
import fresamento1 from '../assets/images/fresamento1.jpg';
import fresa1 from '../assets/images/fresa1.jpg';
import fresa2 from '../assets/images/fresa2.jpg';
import furacao1 from '../assets/images/furacao1.jpg';
import furacao2 from '../assets/images/furacao2.jpg';
import linha7leaders from '../assets/images/linha_7leaders.jpg';
import prods7leaders from '../assets/images/prods_7leaders.jpg';
import linhaBtfixo from '../assets/images/linha_btfixo.jpg';
import prodsBtfixo from '../assets/images/prods_btfixo.jpg';
import cones from '../assets/images/cones.jpg';
import logoMit from '../assets/images/LOGO-MIT.png';

const slides = [
  { src: linhaMitsu, title: 'Linha Mitsubishi', link: null },
  { src: torneamento1, title: 'Torneamento', link: null },
  { src: torneamento2, title: 'Torneamento', link: null },
  { src: fresamento1, title: 'Fresas de topo', link: null },
  { src: fresa1, title: 'Fresas', link: null },
  { src: fresa2, title: 'Fresas', link: null },
  { src: furacao1, title: 'Furação', link: null },
  { src: furacao2, title: 'Furação', link: null },
  { src: linha7leaders, title: 'Linha 7Leaders', link: null },
  { src: prods7leaders, title: 'Linha 7Leaders', link: 'http://7leaders.com/video/video_en.html' },
  { src: linhaBtfixo, title: 'Linha BT Fixo', link: '/btfixo' },
  { src: prodsBtfixo, title: 'Linha BT Fixo', link: '/btfixo' },
  { src: cones, title: 'Cones', link: null },
];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  // Auto-play carousel
  useEffect(() => {
    const timer = setInterval(nextSlide, 4000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const renderSlideImage = (slide) => {
    const imgEl = (
      <img
        src={slide.src}
        alt={slide.title}
        className={styles.slideImg}
      />
    );
    if (slide.link) {
      const isExternal = slide.link.startsWith('http');
      return (
        <a
          href={slide.link}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
        >
          {imgEl}
        </a>
      );
    }
    return imgEl;
  };

  return (
    <Layout>
      {/* Fornecedores */}
      <div className={styles.centerData}>
        <div className={styles.fornecedoresBox}>
          <h3>Fornecedores</h3>
          <div className={styles.brandsRow}>
            <a href="/catalogo-mitsubishi"><img src={logoMitsubishi} alt="Mitsubishi" /></a>
            <a href="/catalogo-7leaders"><img src={logo7leaders} alt="7Leaders" /></a>
            <a href="/btfixo"><img src={logoBtfixo} alt="BT Fixo" /></a>
            <a href="/catalogo-kifix"><img src={logoKifix} alt="Kifix" /></a>
          </div>
        </div>
      </div>

      {/* Carousel / Slider */}
      <div className={styles.carouselContainer}>
        <div className={styles.carousel}>
          <button
            className={`${styles.carouselBtn} ${styles.carouselPrev}`}
            onClick={prevSlide}
            aria-label="Slide anterior"
          >
            ‹
          </button>

          <div className={styles.carouselTrack}>
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`${styles.carouselSlide} ${index === currentSlide ? styles.active : ''}`}
              >
                {renderSlideImage(slide)}
                <div className={styles.slideCaption}>{slide.title}</div>
              </div>
            ))}
          </div>

          <button
            className={`${styles.carouselBtn} ${styles.carouselNext}`}
            onClick={nextSlide}
            aria-label="Próximo slide"
          >
            ›
          </button>
        </div>

        {/* Dots */}
        <div className={styles.carouselDots}>
          {slides.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${index === currentSlide ? styles.activeDot : ''}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Ir para slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Produtos em Destaque + (Vídeo & Novidades) */}
      <div className={styles.centerData}>

        {/* Produtos em Destaque - full width */}
        <div className={styles.sectionBox}>
          <h3>Produtos em Destaque</h3>
          <div className={styles.produtosGrid}>
            <div className={styles.produtoCard}>
              <strong>S-TAW (N112 - N116)</strong>
              <p>Brocas intercambiáveis para diâmetros pequenos</p>
            </div>
            <div className={styles.produtoCard}>
              <strong>TAW (N117 - N135)</strong>
              <p>Brocas intercambiáveis</p>
            </div>
            <div className={styles.produtoCard}>
              <strong>Pequenos Diâmetros MWS</strong>
              <p>Brocas inteiriças de metal duro com refrigeração interna</p>
            </div>
            <div className={styles.produtoCard}>
              <strong>MWE/MWS (N019 - N032)</strong>
              <p>Brocas inteiriças de metal duro</p>
            </div>
            <div className={styles.produtoCard}>
              <strong>WSTAR Broca Super Longa</strong>
              <p>Brocas inteiriças de metal duro para furação profunda</p>
            </div>
          </div>
        </div>

        {/* Two-column: Vídeo + Novidades */}
        <div className={styles.twoColumnRow}>
          {/* Vídeo */}
          <div className={styles.columnLeft}>
            <div className={styles.sectionBox}>
              <h3>
                Vídeo
                <img src={logoMit} className={styles.videoLogo} alt="Mitsubishi" />
              </h3>
              <div className={styles.videoWrapper}>
                <video controls width="100%">
                  <source src="http://www.recommetalduro.com.br//webroot/img/VID-20200316-WA0040.mp4" type="video/mp4" />
                  Seu navegador não suporta o elemento de vídeo.
                </video>
              </div>
            </div>
          </div>

          {/* Novidades */}
          <div className={styles.columnRight}>
            <div className={styles.sectionBox}>
              <h3>Novidades</h3>
              <ul className={styles.newsList}>
                <li>
                  <h4>Mitsubishi traz novidades em todas as linhas</h4>
                  <a href="/novidade-linha-mitsubishi" className={styles.newsLink}>Clique aqui e confira os detalhes</a>
                  <p className={styles.newsDate}>Postado em: 30/09/2013 às 23:19</p>
                </li>
                <li>
                  <h4>Veja as fotos da FENASUCRO 2012</h4>
                  <a href="/feiras/fenasucro" className={styles.newsLink}>Fotos da FENASUCRO 2012</a>
                  <p className={styles.newsDate}>Postado em: 19/09/2012 às 20:49</p>
                </li>
                <li>
                  <h4>Confira os novos videos promocionais</h4>
                  <span className={styles.newsLink}>Smart Miracle</span><br/>
                  <span className={styles.newsLink}>MC6025</span>
                  <p className={styles.newsDate}>Postado em: 19/09/2012 às 20:25</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
