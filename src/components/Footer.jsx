import React from 'react';
import { Link } from 'react-router-dom';
import { contato, institucional } from '../data/contato';
import { fornecedores } from '../data/fornecedores';
import { recomStyleHooks } from '../styles/recom/styleRegistry';

const Footer = () => {
  return (
    <footer
      data-recom-component={recomStyleHooks.components.siteFooter}
      data-recom-section={recomStyleHooks.sections.globalFooter}
    >
      <div className="grid" data-recom-component={recomStyleHooks.components.section}>
        <div>
          <h3 data-recom-element={recomStyleHooks.elements.title}>RECOM Metal Duro</h3>
          <p>{institucional.descricaoFooter}</p>
        </div>

        <div>
          <h4>Fornecedores</h4>
          <ul>
            <li>
              <Link
                to="/fornecedores-catalogos"
                data-recom-component={recomStyleHooks.components.textLink}
                data-recom-variant={recomStyleHooks.variants.inline}
              >
                Todos os fornecedores
              </Link>
            </li>
            {fornecedores.map((fornecedor) => (
              <li key={fornecedor.id}>
                <Link
                  to={`/fornecedores-catalogos/${fornecedor.slug}`}
                  data-recom-component={recomStyleHooks.components.textLink}
                  data-recom-variant={recomStyleHooks.variants.inline}
                >
                  {fornecedor.nome}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4>Soluções</h4>
          <ul>
            <li><Link to="/solucoes">Todos os processos</Link></li>
            <li><Link to="/solucoes/torneamento">Torneamento</Link></li>
            <li><Link to="/solucoes/fresamento">Fresamento</Link></li>
            <li><Link to="/solucoes/furacao">Furação</Link></li>
            <li><Link to="/solucoes/fixacao-porta-ferramentas">Fixação e porta-ferramentas</Link></li>
          </ul>
        </div>

        <div>
          <h4>Contato</h4>
          <address>
            {contato.endereco.completo}<br />
            Telefone:{' '}
            <a
              href={contato.telefone.href}
              data-recom-component={recomStyleHooks.components.textLink}
              data-recom-role={recomStyleHooks.roles.contactPhoneClick}
              data-recom-track={recomStyleHooks.track.contactPhoneClick}
            >
              {contato.telefone.display}
            </a>
            <br />
            Email:{' '}
            <a
              href={contato.email.href}
              data-recom-component={recomStyleHooks.components.textLink}
              data-recom-role={recomStyleHooks.roles.contactEmailClick}
              data-recom-track={recomStyleHooks.track.contactEmailClick}
            >
              {contato.email.display}
            </a>
          </address>
          <p>
            <a
              href={contato.whatsapp.hrefComMensagem}
              target="_blank"
              rel="noopener noreferrer"
              data-recom-component={recomStyleHooks.components.externalLink}
              data-recom-variant={recomStyleHooks.variants.external}
              data-recom-role={recomStyleHooks.roles.contactWhatsAppClick}
              data-recom-track={recomStyleHooks.track.whatsappClick}
            >
              Falar com a RECOM pelo WhatsApp
            </a>
          </p>
        </div>
      </div>

      <hr />

      <div data-recom-component={recomStyleHooks.components.ctaSection}>
        <p>© {new Date().getFullYear()} {contato.empresa}</p>
        <p>
          <Link
            to="/politica-de-privacidade"
            data-recom-component={recomStyleHooks.components.textLink}
            data-recom-variant={recomStyleHooks.variants.inline}
          >
            Política de Privacidade
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;

