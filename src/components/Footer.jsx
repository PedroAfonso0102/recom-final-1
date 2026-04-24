import React from 'react';
import { Link } from 'react-router-dom';
import { contato, institucional } from '../data/contato';
import { fornecedores } from '../data/fornecedores';

const Footer = () => {
  return (
    <footer>
      <div className="grid">
        <div>
          <h3>RECOM Metal Duro</h3>
          <p>{institucional.descricaoFooter}</p>
        </div>

        <div>
          <h4>Fornecedores</h4>
          <ul>
            <li><Link to="/fornecedores-catalogos">Todos os fornecedores</Link></li>
            {fornecedores.map((fornecedor) => (
              <li key={fornecedor.id}>
                <Link to={`/fornecedores-catalogos/${fornecedor.slug}`}>{fornecedor.nome}</Link>
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
          </ul>
        </div>

        <div>
          <h4>Contato</h4>
          <address>
            {contato.endereco.completo}<br />
            Telefone: {contato.telefone.display}<br />
            Email: {contato.email.display}
          </address>
          <p>
            <a href={contato.whatsapp.hrefComMensagem} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
          </p>
        </div>
      </div>

      <hr />

      <div>
        <p>© {new Date().getFullYear()} {contato.empresa}</p>
        <p><Link to="/politica-de-privacidade">Política de Privacidade</Link></p>
      </div>
    </footer>
  );
};

export default Footer;

