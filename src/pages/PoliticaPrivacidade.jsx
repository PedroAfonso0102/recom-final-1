import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import SEOHead from '../components/SEOHead';
import { contato } from '../data/contato';

const PoliticaPrivacidade = () => {
  return (
    <Layout>
      <SEOHead
        title="Política de privacidade"
        description="Entenda quais dados o site da RECOM pode coletar pelo formulário de contato e como esses dados são usados para retorno comercial."
        canonical="/politica-de-privacidade"
      />

      <main>
        <section>
          <h1>Política de privacidade</h1>
          <p>
            Esta página explica, em linguagem simples, como o site da {contato.empresa} pode coletar
            e usar dados enviados pelo formulário de contato e orçamento.
          </p>
          <p>
            TODO revisão jurídica: este texto é uma base editorial e deve ser validado por responsável
            jurídico antes de publicação final.
          </p>
        </section>

        <section>
          <h2>1. Dados informados pelo usuário</h2>
          <p>
            O formulário pode solicitar nome, empresa, e-mail, telefone ou WhatsApp, fornecedor de
            interesse, processo ou aplicação, códigos ou itens desejados e mensagem livre.
          </p>
        </section>

        <section>
          <h2>2. Finalidade de uso</h2>
          <p>
            Os dados enviados são usados para responder solicitações comerciais, orientar consultas de
            fornecedores e catálogos, preparar retorno de orçamento e manter registro operacional do
            atendimento.
          </p>
        </section>

        <section>
          <h2>3. Canais de contato</h2>
          <p>
            Além do formulário, o usuário pode falar com a RECOM por telefone, e-mail ou WhatsApp.
            Esses canais podem receber as mesmas informações necessárias para retorno comercial.
          </p>
          <ul>
            <li>Telefone: <a href={contato.telefone.href}>{contato.telefone.display}</a></li>
            <li>E-mail: <a href={contato.email.href}>{contato.email.display}</a></li>
            <li>WhatsApp: <a href={contato.whatsapp.hrefComMensagem} target="_blank" rel="noopener noreferrer">iniciar conversa</a></li>
          </ul>
        </section>

        <section>
          <h2>4. Compartilhamento e fornecedores externos</h2>
          <p>
            O site possui links para catálogos e páginas oficiais de fornecedores. Ao acessar esses
            links, o usuário sai do site da RECOM e passa a navegar em ambientes externos, sujeitos às
            políticas próprias de cada fornecedor.
          </p>
        </section>

        <section>
          <h2>5. Segurança e retenção</h2>
          <p>
            A RECOM deve manter apenas dados necessários ao atendimento comercial e à operação do
            contato. Prazos de retenção, sistemas internos e responsáveis precisam ser confirmados
            pela equipe antes da versão final desta política.
          </p>
        </section>

        <section>
          <h2>6. Solicitações sobre dados</h2>
          <p>
            Para solicitar correção, atualização ou exclusão de dados enviados pelo site, entre em
            contato pelo e-mail <a href={contato.email.href}>{contato.email.display}</a>.
          </p>
        </section>

        <section>
          <h2>Próximo passo</h2>
          <p>
            Se sua dúvida é comercial, use a página de contato. Se sua dúvida é sobre privacidade,
            envie uma mensagem identificando o assunto.
          </p>
          <div className="flex">
            <Link to="/contato">Falar com a RECOM</Link>
            <Link to="/">Voltar ao início</Link>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default PoliticaPrivacidade;
