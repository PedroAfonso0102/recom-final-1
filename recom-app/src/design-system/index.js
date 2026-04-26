/**
 * RECOM Design System Entry Point
 * Centraliza e exporta todos os contratos, tokens e hooks.
 */

// Importando tudo para garantir que fiquem no escopo global (estilo Vanilla)
import './tokens/colors.js';
import './tokens/spacing.js';
import './tokens/typography.js';
import './tokens/radius.js';

import './hooks/site-hooks.js';
import './hooks/admin-hooks.js';
import './hooks/analytics-events.js';

import './components/component-contracts.js';
import './components/component-variants.js';

import './content/navigation-contracts.js';
import './content/page-contracts.js';
import './content/seo-contracts.js';
import './content/ui-strings.js';

import './states/ui-states.js';
import './states/lead-states.js';
import './states/promotion-states.js';

import './schemas/supplier.schema.js';
import './schemas/process.schema.js';
import './schemas/promotion.schema.js';
import './schemas/lead.schema.js';
import './schemas/page.schema.js';
import './lib/forms.js';

console.log('RECOM Design System Centralizado (DSCL) carregado com sucesso.');
