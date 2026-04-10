import React, { useState } from 'react';

const ContactForm = () => {
  const [status, setStatus] = useState({ submitted: false, error: false });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call for form submission
    setTimeout(() => {
      setStatus({ submitted: true, error: false });
    }, 500);
  };

  if (status.submitted) {
    return (
      <div style={{ padding: '20px', backgroundColor: '#e6ffe6', border: '1px solid #b3ffb3', color: '#006600', borderRadius: '4px', marginBottom: '20px' }}>
        Mensagem enviada com sucesso! Entraremos em contato em breve.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      <div>
        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Nome *</label>
        <input type="text" required style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} />
      </div>
      <div style={{ display: 'flex', gap: '15px' }}>
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>E-mail *</label>
          <input type="email" required style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} />
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Telefone</label>
          <input type="tel" style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} />
        </div>
      </div>
      <div>
        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Código(s) do(s) produto(s) desejado(s)</label>
        <input type="text" style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} />
      </div>
      <div>
        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Assunto *</label>
        <input type="text" required style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} />
      </div>
      <div>
        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Comentários *</label>
        <textarea required rows="5" style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}></textarea>
      </div>
      <p style={{ fontSize: '11px', color: '#666' }}>* Campos obrigatórios</p>
      <button type="submit" style={{ padding: '12px 24px', backgroundColor: '#cc0000', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', alignSelf: 'flex-start' }}>
        Enviar Mensagem
      </button>
    </form>
  );
};

export default ContactForm;
