import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import ActionButton from './ActionButton';
import styles from './Footer.module.css';
import logo from '../assets/images/Upscaled/logo-branco.png';
import { contato, institucional } from '../data/contato';
import { fornecedores } from '../data/fornecedores';
import { trackLeadGen } from '../utils/analytics';

/**
 * Footer institucional e comercial da RECOM.
 * Mantém os caminhos principais acessíveis até o fim da página.
 */
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerGrid}>
        <div className={styles.footerCol}>
          <div className={styles.footerLogo}>
            <img src={logo} alt="RECOM Metal Duro" />
          </div>
          <p className={styles.footerText}>{institucional.descricaoFooter}</p>
          <div className={styles.footerCta}>
            <ActionButton to="/contato" variant="contrast" stackOnMobile>
              Solicitar orçamento
            </ActionButton>
          </div>
        </div>

        <div className={styles.footerCol}>
          <h4 className={styles.footerTitle}>Fornecedores</h4>
          <ul className={styles.footerLinks}>
            <li><Link to="/fornecedores-catalogos">Todos os fornecedores</Link></li>
            {fornecedores.map((fornecedor) => (
              <li key={fornecedor.id}>
                <Link to={`/fornecedores-catalogos/${fornecedor.slug}`}>{fornecedor.nome}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.footerCol}>
          <h4 className={styles.footerTitle}>Soluções</h4>
          <ul className={styles.footerLinks}>
            <li><Link to="/solucoes">Todos os processos</Link></li>
            <li><Link to="/solucoes/torneamento">Torneamento</Link></li>
            <li><Link to="/solucoes/fresamento">Fresamento</Link></li>
            <li><Link to="/solucoes/furacao">Furação</Link></li>
          </ul>

          <h4 className={styles.footerTitle} style={{ marginTop: '1.25rem' }}>Empresa</h4>
          <ul className={styles.footerLinks}>
            <li><Link to="/a-recom">A RECOM</Link></li>
            <li><Link to="/promocoes">Promoções</Link></li>
          </ul>
        </div>

        <div className={styles.footerCol}>
          <h4 className={styles.footerTitle}>Atendimento</h4>
          <ul className={styles.footerContact}>
            <li>
              <MapPin size={16} className={styles.contactIcon} />
              <address className={styles.contactAddress}>
                <span>{contato.endereco.completo}</span>
                <a
                  href={contato.endereco.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.mapLink}
                >
                  Ver no Google Maps
                </a>
              </address>
            </li>
            <li>
              <Phone size={16} className={styles.contactIcon} />
              <a
                href={contato.telefone.href}
                className={styles.phoneLink}
                onClick={() => trackLeadGen('phone', 'Footer')}
              >
                {contato.telefone.display}
              </a>
            </li>
            <li>
              <Mail size={16} className={styles.contactIcon} />
              <a
                href={contato.email.href}
                className={styles.emailLink}
                onClick={() => trackLeadGen('email', 'Footer')}
              >
                {contato.email.display}
              </a>
            </li>
          </ul>
          <div className={styles.footerActions}>
            <ActionButton
              href={contato.whatsapp.hrefComMensagem}
              target="_blank"
              variant="whatsapp"
              stackOnMobile
              onClick={() => trackLeadGen('whatsapp', 'Footer')}
            >
              <MessageCircle size={18} />
              Falar com especialista
            </ActionButton>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <div className={styles.footerBottomContent}>
          <p>© {new Date().getFullYear()} {contato.empresa} — Todos os direitos reservados.</p>
          <div className={styles.footerBottomLinks}>
            <Link to="/seguranca">Segurança nas Ferramentas</Link>
            <span>|</span>
            <Link to="/sugestoes-de-utilizacao">Sugestões de Utilização</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
