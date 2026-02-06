/**
 * Time Parser - Converte expressões de tempo relativo para timestamps absolutos
 * 
 * Suporta:
 *   now                    → momento exato
 *   now+7h                 → 7 horas a partir de agora
 *   now+2d                 → 2 dias a partir de agora
 *   now-3h                 → 3 horas atrás
 *   now+1d+12h             → 1 dia e 12 horas
 *   now+7d-2h+30m          → 7 dias - 2 horas + 30 minutos
 */

/**
 * Converte uma expressão de tempo relativo em um objeto Date absoluto
 * @param {string} expression - Expressão como "now+7d", "now-3h", etc
 * @param {Date} baseDate - Data base para cálculo (default: agora)
 * @returns {Date|null} Date calculada ou null se não for expressão relativa
 * @throws {Error} Se a expressão for inválida
 */
function parseRelativeTime(expression, baseDate = new Date()) {
  if (!expression || typeof expression !== 'string') {
    return null;
  }

  const trimmed = expression.trim().toLowerCase();
  
  // Se não começar com 'now', não é uma expressão relativa
  if (!trimmed.startsWith('now')) {
    return null;
  }

  // Se for exatamente 'now', retornar a data base
  if (trimmed === 'now') {
    return new Date(baseDate);
  }

  let ms = 0;

  // Extrair todos os modificadores: +7h, -2d, etc
  // Regex: capture (sign) (number) (unit)
  const regex = /([+-])(\d+(?:\.\d+)?)(s|sec|m|min|h|hour|d|day|w|week|mo|month|y|year)/gi;
  let match;
  let hasMatches = false;

  while ((match = regex.exec(trimmed)) !== null) {
    hasMatches = true;
    const [, sign, value, unit] = match;
    const num = parseFloat(value);
    const multiplier = getTimeMultiplier(unit);
    
    if (multiplier === null) {
      throw new Error(`Unidade de tempo inválida: '${unit}'. Use: s, m, h, d, w, mo, y`);
    }

    if (num < 0) {
      throw new Error(`Valores negativos não são permitidos. Use o sinal +/- antes do número`);
    }

    const delta = num * multiplier;
    ms += (sign === '+' ? 1 : -1) * delta;
  }

  if (!hasMatches) {
    throw new Error(`Expressão relativa inválida: '${expression}'. Use formato: now+7d, now-3h, etc`);
  }

  const result = new Date(baseDate.getTime() + ms);
  return result;
}

/**
 * Retorna o multiplicador em milissegundos para uma unidade de tempo
 * @param {string} unit - Unidade (s, m, h, d, w, mo, y)
 * @returns {number|null} Multiplicador em ms ou null se inválido
 */
function getTimeMultiplier(unit) {
  const multipliers = {
    's': 1000,
    'sec': 1000,
    'm': 60 * 1000,
    'min': 60 * 1000,
    'h': 60 * 60 * 1000,
    'hour': 60 * 60 * 1000,
    'd': 24 * 60 * 60 * 1000,
    'day': 24 * 60 * 60 * 1000,
    'w': 7 * 24 * 60 * 60 * 1000,
    'week': 7 * 24 * 60 * 60 * 1000,
    'mo': 30 * 24 * 60 * 60 * 1000,  // aproximado (30 dias)
    'month': 30 * 24 * 60 * 60 * 1000,
    'y': 365 * 24 * 60 * 60 * 1000,  // aproximado (365 dias)
    'year': 365 * 24 * 60 * 60 * 1000,
  };
  
  return multipliers[unit.toLowerCase()] || null;
}

/**
 * Resolve uma data que pode ser relativa ou absoluta
 * @param {string|Date} input - Data (pode ser "now+7d" ou "2026-02-11T10:30:00Z")
 * @returns {Date|null} Data resolvida ou null
 */
function resolveDateInput(input) {
  if (!input) {
    return null;
  }

  // Se for Data já parseada
  if (input instanceof Date) {
    return input;
  }

  // Tentar parsear como relativa
  try {
    const relative = parseRelativeTime(input);
    if (relative) {
      return relative;
    }
  } catch (err) {
    // Não é relativa ou está malformada
  }

  // Tentar como data absoluta
  try {
    const absolute = new Date(input);
    if (!isNaN(absolute.getTime())) {
      return absolute;
    }
  } catch (err) {
    // Ignorar
  }

  return null;
}

/**
 * Valida se uma string é uma expressão de tempo relativo válida
 * @param {string} expression - Expressão a validar
 * @returns {object} { valid: boolean, error?: string }
 */
function validateRelativeTime(expression) {
  if (!expression || typeof expression !== 'string') {
    return { valid: false, error: 'Expressão deve ser uma string' };
  }

  const trimmed = expression.trim().toLowerCase();

  if (!trimmed.startsWith('now')) {
    return { valid: false, error: 'Expressão deve começar com "now"' };
  }

  if (trimmed === 'now') {
    return { valid: true };
  }

  const regex = /([+-])(\d+(?:\.\d+)?)(s|sec|m|min|h|hour|d|day|w|week|mo|month|y|year)/gi;
  let match;
  let hasMatches = false;

  while ((match = regex.exec(trimmed)) !== null) {
    hasMatches = true;
    const [, , , unit] = match;
    if (getTimeMultiplier(unit) === null) {
      return { 
        valid: false, 
        error: `Unidade inválida: '${unit}'` 
      };
    }
  }

  if (!hasMatches) {
    return { 
      valid: false, 
      error: 'Formato inválido. Use: now+7d, now-3h, now+1d+12h' 
    };
  }

  return { valid: true };
}

/**
 * Retorna uma descrição legível da expressão
 * @param {string} expression - Expressão relativa
 * @returns {string} Descrição legível
 */
function describeRelativeTime(expression) {
  if (!expression || typeof expression !== 'string') {
    return '';
  }

  const trimmed = expression.trim().toLowerCase();

  if (trimmed === 'now') {
    return 'Agora';
  }

  if (!trimmed.startsWith('now')) {
    return '';
  }

  const parts = [];
  const regex = /([+-])(\d+(?:\.\d+)?)(s|sec|m|min|h|hour|d|day|w|week|mo|month|y|year)/gi;
  let match;

  while ((match = regex.exec(trimmed)) !== null) {
    const [, sign, value, unit] = match;
    const num = parseFloat(value);
    const unitLabel = getUnitLabel(unit, num);
    const prefix = sign === '+' ? '' : 'menos ';
    
    parts.push(`${prefix}${num} ${unitLabel}`);
  }

  if (parts.length === 0) {
    return 'Agora';
  }

  return `Agora ${parts.join(', ')}`;
}

/**
 * Retorna o rótulo legível para uma unidade de tempo
 * @param {string} unit - Unidade abreviada
 * @param {number} count - Quantidade (para pluralização)
 * @returns {string} Rótulo
 */
function getUnitLabel(unit, count = 1) {
  const labels = {
    's': count === 1 ? 'segundo' : 'segundos',
    'sec': count === 1 ? 'segundo' : 'segundos',
    'm': count === 1 ? 'minuto' : 'minutos',
    'min': count === 1 ? 'minuto' : 'minutos',
    'h': count === 1 ? 'hora' : 'horas',
    'hour': count === 1 ? 'hora' : 'horas',
    'd': count === 1 ? 'dia' : 'dias',
    'day': count === 1 ? 'dia' : 'dias',
    'w': count === 1 ? 'semana' : 'semanas',
    'week': count === 1 ? 'semana' : 'semanas',
    'mo': count === 1 ? 'mês' : 'meses',
    'month': count === 1 ? 'mês' : 'meses',
    'y': count === 1 ? 'ano' : 'anos',
    'year': count === 1 ? 'ano' : 'anos',
  };
  
  return labels[unit.toLowerCase()] || unit;
}

// ===== PRESETS COMUNS =====

const RELATIVE_TIME_PRESETS = {
  'imediato': 'now',
  'agora': 'now',
  'em_1_hora': 'now+1h',
  'em_6_horas': 'now+6h',
  'em_12_horas': 'now+12h',
  'amanha': 'now+1d',
  'em_2_dias': 'now+2d',
  'em_3_dias': 'now+3d',
  'em_1_semana': 'now+1w',
  'em_2_semanas': 'now+2w',
  'em_1_mes': 'now+30d',
  'em_3_meses': 'now+90d',
};

/**
 * Retorna um preset pré-definido
 * @param {string} presetKey - Chave do preset
 * @returns {string|null} Expressão ou null
 */
function getPreset(presetKey) {
  return RELATIVE_TIME_PRESETS[presetKey?.toLowerCase()] || null;
}

/**
 * Lista todos os presets disponíveis
 * @returns {object} Mapa de presets
 */
function listPresets() {
  return RELATIVE_TIME_PRESETS;
}

// ===== EXPORTAR PARA NODE.JS =====
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    parseRelativeTime,
    resolveDateInput,
    validateRelativeTime,
    describeRelativeTime,
    getTimeMultiplier,
    getUnitLabel,
    getPreset,
    listPresets,
  };
}
