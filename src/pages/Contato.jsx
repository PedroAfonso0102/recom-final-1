import React from 'react';
import Layout from '../components/Layout';
import SEOHead from '../components/SEOHead';
import Breadcrumb from '../components/Breadcrumb';
import ContactForm from '../components/ContactForm';
import ActionButton from '../components/ActionButton';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import styles from './Contato.module.css';
import { contato } from '../data/contato';
import { trackLeadGen } from '../utils/analytics';
import logoSchema from '../assets/images/Upscaled/logo-marca-somente-triangulo.png';

/**
 * Contato / Orçamento — Página de conversão principal.
 * Etapa 5: "formulário como canal primário de conversão"
 * Etapa 6: "dados de contato centralizados, sem hardcode"
 */

const breadcrumbItems = [
  { label: 'Início', path: '/' },
  { label: 'Contato / Orçamento' },
];

const Contato = () => {
  return (
    <Layout>
      <SEOHead
        title="Contato / Orçamento"
        description={`Entre em contato com a ${contato.empresa}. Solicite orçamento de ferramentas para usinagem. Atendimento em ${contato.endereco.cidade}-${contato.endereco.estado}.`}
        canonical="/contato"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          name: contato.empresa,
          image: logoSchema,
          '@id': contato.siteUrl,
          url: contato.siteUrl,
          telephone: contato.telefone.numero,
          address: {
            '@type': 'PostalAddress',
            streetAddress: contato.endereco.rua,
            addressLocality: contato.endereco.cidade,
            addressRegion: contato.endereco.estado,
            postalCode: contato.endereco.cep,
            addressCountry: 'BR',
          },
          hasMap: contato.endereco.googleMapsUrl,
          geo: {
            '@type': 'GeoCoordinates',
            latitude: -22.893202, // approximated from Campinas Centro
            longitude: -47.065842,
          },
          openingHoursSpecification: [{
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: [
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
            ],
            opens: '08:00',
            closes: '17:30',
          }],
        }}
      />

      <div className={styles.container}>
        <Breadcrumb items={breadcrumbItems} />

        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Contato / Orçamento</h1>
          <p className={styles.pageSubtitle}>
            Solicite um orçamento, envie código ou desenho e fale com nossa equipe especializada em ferramentas para usinagem.
          </p>
        </div>

        <div className={styles.twoColumns}>
          {/* Coluna principal — Formulário */}
          <div className={styles.colMain}>
            <div className={styles.formBox}>
              <h2 className={styles.formTitle}>Solicitar Orçamento</h2>
              <p className={styles.formDesc}>
                Preencha os campos abaixo e nosso comercial retornará em até 24 horas úteis.
              </p>
              <ContactForm />
            </div>
          </div>

          {/* Coluna lateral — Informações */}
          <div className={styles.colSide}>
            {/* Card de informações */}
            <div className={styles.infoCard}>
              <h3 className={styles.infoTitle}>Informações de Contato</h3>
              <ul className={styles.infoList}>
                <li>
                  <MapPin size={18} className={styles.infoIcon} />
                  <div>
                    <strong>Endereço</strong>
                    <span>{contato.endereco.rua}</span>
                    <span>{contato.endereco.cidade} - {contato.endereco.estado}, {contato.endereco.cep}</span>
                  </div>
                </li>
                <li>
                  <Phone size={18} className={styles.infoIcon} />
                  <div>
                    <strong>Telefone</strong>
                    <a href={contato.telefone.href} onClick={() => trackLeadGen('phone')}>{contato.telefone.display}</a>
                  </div>
                </li>
                <li>
                  <Mail size={18} className={styles.infoIcon} />
                  <div>
                    <strong>E-mail</strong>
                    <a href={contato.email.href} onClick={() => trackLeadGen('email')}>{contato.email.display}</a>
                  </div>
                </li>
                <li>
                  <Clock size={18} className={styles.infoIcon} />
                  <div>
                    <strong>Horário</strong>
                    <span>Segunda a Sexta: 8h às 17h30</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* WhatsApp CTA */}
            <a
              href={contato.whatsapp.hrefComMensagem}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.whatsappCard}
              onClick={() => trackLeadGen('whatsapp', 'Contato Sidebar CTA')}
            >
              <MessageCircle size={24} />
              <div>
                <strong>Prefere WhatsApp?</strong>
                <span>Fale diretamente com um especialista</span>
              </div>
            </a>

            {/* Localização */}
            <div className={styles.mapBox}>
              <h3 className={styles.infoTitle}>Onde Estamos</h3>
              <div className={styles.mapCard}>
                <address className={styles.mapAddress}>
                  <strong>{contato.empresa}</strong>
                  <span>{contato.endereco.rua}</span>
                  <span>{contato.endereco.cidade} - {contato.endereco.estado}</span>
                  <span>CEP {contato.endereco.cep}</span>
                </address>
                <p className={styles.mapNote}>
                  Atendimento comercial de segunda a sexta, das 8h às 17h30.
                </p>
                <ActionButton
                  href={contato.endereco.googleMapsUrl}
                  target="_blank"
                  variant="secondary"
                  compact
                  stackOnMobile
                  onClick={() => trackLeadGen('map', 'Contato Route CTA')}
                >
                  Ver rota no Google Maps
                </ActionButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contato;
