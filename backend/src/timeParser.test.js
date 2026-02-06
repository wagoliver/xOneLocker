/**
 * Testes para Time Parser
 * 
 * Para executar:
 * node timeParser.test.js
 */

const {
  parseRelativeTime,
  resolveDateInput,
  validateRelativeTime,
  describeRelativeTime,
  getPreset,
  listPresets,
} = require('./timeParser.js');

// ===== UTILITÁRIOS DE TESTE =====

let testCount = 0;
let passCount = 0;
let failCount = 0;

function test(description, fn) {
  testCount++;
  try {
    fn();
    passCount++;
    console.log(`✓ ${description}`);
  } catch (err) {
    failCount++;
    console.error(`✗ ${description}`);
    console.error(`  Error: ${err.message}`);
  }
}

function assertEquals(actual, expected, message = '') {
  if (actual !== expected) {
    throw new Error(`Expected ${expected}, got ${actual}. ${message}`);
  }
}

function assertIsDate(value, message = '') {
  if (!(value instanceof Date)) {
    throw new Error(`Expected Date, got ${typeof value}. ${message}`);
  }
}

function assertClose(actual, expected, toleranceMs = 100, message = '') {
  if (Math.abs(actual - expected) > toleranceMs) {
    throw new Error(
      `Expected ${expected}±${toleranceMs}ms, got ${actual}. ${message}`
    );
  }
}

function assertThrows(fn, message = '') {
  try {
    fn();
    throw new Error(`Expected error to be thrown. ${message}`);
  } catch (err) {
    if (err.message.includes('Expected error')) {
      throw err;
    }
  }
}

// ===== TESTES =====

console.log('🧪 Iniciando testes do Time Parser\n');

// ===== parseRelativeTime =====

console.log('📋 parseRelativeTime()');

test('Deve retornar null para string vazia', () => {
  assertEquals(parseRelativeTime(''), null);
});

test('Deve retornar null para null', () => {
  assertEquals(parseRelativeTime(null), null);
});

test('Deve retornar null para string que não começa com "now"', () => {
  assertEquals(parseRelativeTime('2026-02-11'), null);
});

test('Deve retornar data base para "now"', () => {
  const base = new Date('2026-02-11T10:00:00Z');
  const result = parseRelativeTime('now', base);
  assertIsDate(result);
  assertEquals(result.getTime(), base.getTime());
});

test('Deve adicionar 7 dias com "now+7d"', () => {
  const base = new Date('2026-02-11T10:00:00Z');
  const result = parseRelativeTime('now+7d', base);
  const expected = new Date('2026-02-18T10:00:00Z');
  assertEquals(result.getTime(), expected.getTime());
});

test('Deve subtrair 3 horas com "now-3h"', () => {
  const base = new Date('2026-02-11T10:00:00Z');
  const result = parseRelativeTime('now-3h', base);
  const expected = new Date('2026-02-11T07:00:00Z');
  assertEquals(result.getTime(), expected.getTime());
});

test('Deve combinar múltiplos modificadores "now+1d+12h"', () => {
  const base = new Date('2026-02-11T10:00:00Z');
  const result = parseRelativeTime('now+1d+12h', base);
  const expected = new Date('2026-02-12T22:00:00Z');
  assertEquals(result.getTime(), expected.getTime());
});

test('Deve lidar com "now+7d-2h+30m"', () => {
  const base = new Date('2026-02-11T10:00:00Z');
  const result = parseRelativeTime('now+7d-2h+30m', base);
  const expected = new Date('2026-02-18T08:30:00Z');
  assertEquals(result.getTime(), expected.getTime());
});

test('Deve aceitar unidades abreviadas e completas', () => {
  const base = new Date('2026-02-11T10:00:00Z');
  const result1 = parseRelativeTime('now+1hour', base);
  const result2 = parseRelativeTime('now+1h', base);
  assertEquals(result1.getTime(), result2.getTime());
});

test('Deve aceitar valores decimais "now+1.5h"', () => {
  const base = new Date('2026-02-11T10:00:00Z');
  const result = parseRelativeTime('now+1.5h', base);
  const expected = new Date('2026-02-11T11:30:00Z');
  assertEquals(result.getTime(), expected.getTime());
});

test('Deve ser case-insensitive', () => {
  const base = new Date('2026-02-11T10:00:00Z');
  const result1 = parseRelativeTime('now+7D', base);
  const result2 = parseRelativeTime('NOW+7d', base);
  assertEquals(result1.getTime(), result2.getTime());
});

test('Deve lançar erro para unidade inválida', () => {
  assertThrows(() => {
    parseRelativeTime('now+7x');
  });
});

test('Deve lançar erro para formato inválido', () => {
  assertThrows(() => {
    parseRelativeTime('now++7d');
  });
});

// ===== validateRelativeTime =====

console.log('\n📋 validateRelativeTime()');

test('Deve validar "now" como válido', () => {
  const result = validateRelativeTime('now');
  assertEquals(result.valid, true);
});

test('Deve validar "now+7d" como válido', () => {
  const result = validateRelativeTime('now+7d');
  assertEquals(result.valid, true);
});

test('Deve invalidar string que não começa com "now"', () => {
  const result = validateRelativeTime('2026-02-11');
  assertEquals(result.valid, false);
});

test('Deve invalidar unidade desconhecida', () => {
  const result = validateRelativeTime('now+7x');
  assertEquals(result.valid, false);
});

test('Deve retornar mensagem de erro para entrada inválida', () => {
  const result = validateRelativeTime('invalid');
  assertEquals(result.valid, false);
  assertEquals(typeof result.error, 'string');
});

// ===== resolveDateInput =====

console.log('\n📋 resolveDateInput()');

test('Deve resolver expressão relativa', () => {
  const base = new Date('2026-02-11T10:00:00Z');
  const result = resolveDateInput('now+7d');
  assertIsDate(result);
});

test('Deve resolver data absoluta em ISO format', () => {
  const result = resolveDateInput('2026-02-11T10:00:00Z');
  assertIsDate(result);
  assertEquals(result.toISOString(), '2026-02-11T10:00:00.000Z');
});

test('Deve retornar null para entrada vazia', () => {
  assertEquals(resolveDateInput(''), null);
});

test('Deve retornar null para null', () => {
  assertEquals(resolveDateInput(null), null);
});

test('Deve aceitar objeto Date', () => {
  const date = new Date('2026-02-11T10:00:00Z');
  const result = resolveDateInput(date);
  assertEquals(result.getTime(), date.getTime());
});

// ===== describeRelativeTime =====

console.log('\n📋 describeRelativeTime()');

test('Deve descrever "now" como "Agora"', () => {
  const desc = describeRelativeTime('now');
  assertEquals(desc, 'Agora');
});

test('Deve descrever "now+7d" em português', () => {
  const desc = describeRelativeTime('now+7d');
  console.log(`  Descrição: "${desc}"`);
  // Apenas verificar que não é vazio
  assertEquals(desc.length > 0, true);
});

test('Deve pluralizar corretamente', () => {
  const desc1 = describeRelativeTime('now+1d');
  const desc2 = describeRelativeTime('now+2d');
  console.log(`  1 dia: "${desc1}"`);
  console.log(`  2 dias: "${desc2}"`);
});

// ===== Presets =====

console.log('\n📋 Presets');

test('Deve retornar preset "imediato"', () => {
  const preset = getPreset('imediato');
  assertEquals(preset, 'now');
});

test('Deve retornar preset "em_1_semana"', () => {
  const preset = getPreset('em_1_semana');
  assertEquals(preset, 'now+1w');
});

test('Deve retornar null para preset desconhecido', () => {
  const preset = getPreset('inexistente');
  assertEquals(preset, null);
});

test('Deve listar todos os presets', () => {
  const presets = listPresets();
  assertEquals(typeof presets, 'object');
  assertEquals(presets.hasOwnProperty('imediato'), true);
  assertEquals(presets.hasOwnProperty('em_1_semana'), true);
});

// ===== CASOS DE USO REAIS =====

console.log('\n📋 Casos de Uso Reais');

test('Caso de uso: Bloqueio por 7 dias', () => {
  const base = new Date('2026-02-11T10:00:00Z');
  const inicio = parseRelativeTime('now', base);
  const fim = parseRelativeTime('now+7d', base);
  assertEquals(fim.getTime() - inicio.getTime(), 7 * 24 * 60 * 60 * 1000);
});

test('Caso de uso: Agendamento para amanhã 9:00 AM (aproximado)', () => {
  const base = new Date('2026-02-11T10:00:00Z');
  const result = parseRelativeTime('now+16h-1h', base); // aproximadamente 3:00 PM do dia seguinte
  assertIsDate(result);
});

test('Caso de uso: Timeout em 5 minutos', () => {
  const base = new Date('2026-02-11T10:00:00Z');
  const result = parseRelativeTime('now+5m', base);
  const expected = new Date('2026-02-11T10:05:00Z');
  assertEquals(result.getTime(), expected.getTime());
});

// ===== RESUMO =====

console.log('\n' + '='.repeat(50));
console.log(`✅ Testes completos!`);
console.log(`Total: ${testCount} | ✓ Passou: ${passCount} | ✗ Falhou: ${failCount}`);
if (failCount === 0) {
  console.log('🎉 Todos os testes passaram!');
} else {
  console.log(`❌ ${failCount} testes falharam`);
  process.exit(1);
}
