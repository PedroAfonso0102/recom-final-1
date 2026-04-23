import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Placeholder para rastreamento de visualização de página
    console.log(`[Analytics] Page View: ${location.pathname}`);
  }, [location]);

  const dispararEvento = (nomeEvento, parametros = {}) => {
    console.log(`[Analytics] Event: ${nomeEvento}`, parametros);
  };

  return { dispararEvento };
};
