/**
 * Exemplo de Integração do Time Parser no Backend
 * 
 * Este arquivo mostra como integrar o parseRelativeTime nas rotas
 * existentes do xOneLocker.
 */

// ===== PASSO 1: Importar no início do index.js =====

// No topo do arquivo, adicionar:
// import { parseRelativeTime, resolveDateInput, validateRelativeTime } from './timeParser.js';

// ===== PASSO 2: Função auxiliar de normalização de datas =====

/**
 * Normaliza e resolve uma data que pode ser relativa ou absoluta
 * @param {string} dateInput - Data em formato "now+7d" ou "2026-02-11T10:00:00Z"
 * @returns {Date|null} Data resolvida ou null
 * @throws {Error} Se a data for inválida
 */
function normalizeDateWithRelative(dateInput) {
  if (!dateInput) return null;

  try {
    // Tentar parsear como relativa
    const relative = parseRelativeTime(dateInput);
    if (relative) {
      return relative;
    }
  } catch (err) {
    // Se falhar ao parsear como relativa, lançar erro detalhado
    throw new Error(`Erro ao parsear data relativa '${dateInput}': ${err.message}`);
  }

  // Tentar como data absoluta
  try {
    const absolute = new Date(dateInput);
    if (isNaN(absolute.getTime())) {
      throw new Error(`Data inválida: '${dateInput}'`);
    }
    return absolute;
  } catch (err) {
    throw new Error(`Erro ao parsear data: ${err.message}`);
  }
}

// ===== PASSO 3: Modificar rota POST /api/schedules =====

/**
 * VERSÃO MODIFICADA - Adicionar após linha ~3305
 */
app.post("/api/schedules", async (req, res) => {
  const message = normalizeOptional(req.body.message);
  const actionType = normalizeNumber(req.body.actionType);
  const scheduleType = normalizeNumber(req.body.scheduleType);
  let startDate = normalizeOptional(req.body.startDate);
  const targetType = normalizeNumber(req.body.targetType);
  const targetValue = normalizeOptional(req.body.targetValue);

  if (
    !message ||
    actionType === null ||
    scheduleType === null ||
    !startDate ||
    targetType === null ||
    !targetValue
  ) {
    res.status(400).json({
      error:
        "Campos obrigatorios: message, actionType, scheduleType, startDate, targetType, targetValue.",
    });
    return;
  }

  // ===== NOVA LÓGICA: Resolver datas relativas =====
  try {
    startDate = normalizeDateWithRelative(startDate);
  } catch (err) {
    res.status(400).json({ error: err.message });
    return;
  }

  let endDate = normalizeOptional(req.body.endDate);
  if (endDate) {
    try {
      endDate = normalizeDateWithRelative(endDate);
    } catch (err) {
      res.status(400).json({ error: err.message });
      return;
    }
  }
  // ===== FIM DA NOVA LÓGICA =====

  const recurrenceType = normalizeNumber(req.body.recurrenceType);
  const daysOfWeek = normalizeArray(req.body.daysOfWeek);
  const startTime = normalizeOptional(req.body.startTime);
  const endTime = normalizeOptional(req.body.endTime);
  const sourceLabel =
    req.body.sourceLabel === undefined ? null : normalizeText(req.body.sourceLabel);

  const insert = await pool.query(
    `
      INSERT INTO locker_schedules (
        message,
        action_type,
        schedule_type,
        start_date,
        end_date,
        recurrence_type,
        days_of_week,
        start_time,
        end_time,
        target_type,
        target_value,
        source_label
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING *;
    `,
    [
      message,
      actionType,
      scheduleType,
      startDate,
      endDate,
      recurrenceType,
      daysOfWeek,
      startTime,
      endTime,
      targetType,
      targetValue,
      sourceLabel,
    ]
  );

  const schedule = insert.rows[0];

  const apiResult = await callCoreRegistry(schedule);
  await logAudit({
    action: "CREATE_SCHEDULE",
    entityType: "SCHEDULE",
    entityId: schedule.id,
    remoteId: null,
    requestPayload: apiResult.payload,
    responseStatus: apiResult.status,
    responseBody: apiResult.responseText,
    error: apiResult.error,
  });

  const updatedSchedule = await applyApiResult(schedule.id, apiResult);

  res.status(201).json({
    schedule: updatedSchedule,
    api: {
      ok: apiResult.ok,
      status: apiResult.status,
      error: apiResult.error,
      responseText: apiResult.responseText,
    },
  });
});

// ===== PASSO 4: Modificar rota PUT /api/schedules/:id =====

/**
 * VERSÃO MODIFICADA - Adicionar após linha ~3398
 */
app.put("/api/schedules/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    res.status(400).json({ error: "ID invalido" });
    return;
  }

  const message = normalizeOptional(req.body.message);
  const actionType = normalizeNumber(req.body.actionType);
  const scheduleType = normalizeNumber(req.body.scheduleType);
  let startDate = normalizeOptional(req.body.startDate);
  const targetType = normalizeNumber(req.body.targetType);
  const targetValue = normalizeOptional(req.body.targetValue);

  if (
    !message ||
    actionType === null ||
    scheduleType === null ||
    !startDate ||
    targetType === null ||
    !targetValue
  ) {
    res.status(400).json({
      error:
        "Campos obrigatorios: message, actionType, scheduleType, startDate, targetType, targetValue.",
    });
    return;
  }

  // ===== NOVA LÓGICA: Resolver datas relativas =====
  try {
    startDate = normalizeDateWithRelative(startDate);
  } catch (err) {
    res.status(400).json({ error: err.message });
    return;
  }

  let endDate = normalizeOptional(req.body.endDate);
  if (endDate) {
    try {
      endDate = normalizeDateWithRelative(endDate);
    } catch (err) {
      res.status(400).json({ error: err.message });
      return;
    }
  }
  // ===== FIM DA NOVA LÓGICA =====

  const recurrenceType = normalizeNumber(req.body.recurrenceType);
  const daysOfWeek = normalizeArray(req.body.daysOfWeek);
  const startTime = normalizeOptional(req.body.startTime);
  const endTime = normalizeOptional(req.body.endTime);

  const updateLocal = await pool.query(
    `
      UPDATE locker_schedules
      SET message = $1,
          action_type = $2,
          schedule_type = $3,
          start_date = $4,
          end_date = $5,
          recurrence_type = $6,
          days_of_week = $7,
          start_time = $8,
          end_time = $9,
          target_type = $10,
          target_value = $11,
          source_label = COALESCE($12, source_label),
          updated_at = NOW()
      WHERE id = $13
      RETURNING *;
    `,
    [
      message,
      actionType,
      scheduleType,
      startDate,
      endDate,
      recurrenceType,
      daysOfWeek,
      startTime,
      endTime,
      targetType,
      targetValue,
      null,
      id,
    ]
  );

  if (updateLocal.rowCount === 0) {
    res.status(404).json({ error: "Schedule não encontrado" });
    return;
  }

  const schedule = updateLocal.rows[0];

  const apiResult = await callCoreRegistry(schedule);
  await logAudit({
    action: "UPDATE_SCHEDULE",
    entityType: "SCHEDULE",
    entityId: schedule.id,
    remoteId: schedule.remote_schedule_id || null,
    requestPayload: apiResult.payload,
    responseStatus: apiResult.status,
    responseBody: apiResult.responseText,
    error: apiResult.error,
  });

  const updatedSchedule = await applyApiResult(schedule.id, apiResult);

  res.status(200).json({
    schedule: updatedSchedule,
    api: {
      ok: apiResult.ok,
      status: apiResult.status,
      error: apiResult.error,
      responseText: apiResult.responseText,
    },
  });
});

// ===== PASSO 5: Adicionar endpoint de validação (opcional) =====

/**
 * Valida uma expressão de data relativa
 * GET /api/schedules/validate-date?date=now+7d
 */
app.get("/api/schedules/validate-date", async (req, res) => {
  const dateInput = req.query.date;

  if (!dateInput) {
    res.status(400).json({ error: "Parâmetro 'date' obrigatório" });
    return;
  }

  try {
    const resolved = normalizeDateWithRelative(dateInput);
    const validation = validateRelativeTime(dateInput);

    res.json({
      input: dateInput,
      isRelative: validation.valid,
      resolved: resolved.toISOString(),
      validation,
    });
  } catch (err) {
    res.status(400).json({
      input: dateInput,
      error: err.message,
      validation: { valid: false, error: err.message },
    });
  }
});

// ===== PASSO 6: Adicionar endpoint de presets (opcional) =====

/**
 * Retorna presets de datas relativas
 * GET /api/schedules/date-presets
 */
app.get("/api/schedules/date-presets", async (req, res) => {
  const presets = listPresets();
  
  const formatted = Object.entries(presets).map(([key, expr]) => {
    try {
      const resolved = parseRelativeTime(expr);
      return {
        id: key,
        label: formatPresetLabel(key),
        expression: expr,
        exampleDate: resolved.toISOString(),
      };
    } catch {
      return null;
    }
  }).filter(Boolean);

  res.json({ presets: formatted });
});

/**
 * Formata o rótulo de um preset para português
 */
function formatPresetLabel(key) {
  const labels = {
    'imediato': 'Imediato',
    'agora': 'Agora',
    'em_1_hora': 'Em 1 hora',
    'em_6_horas': 'Em 6 horas',
    'em_12_horas': 'Em 12 horas',
    'amanha': 'Amanhã',
    'em_2_dias': 'Em 2 dias',
    'em_3_dias': 'Em 3 dias',
    'em_1_semana': 'Em 1 semana',
    'em_2_semanas': 'Em 2 semanas',
    'em_1_mes': 'Em 1 mês',
    'em_3_meses': 'Em 3 meses',
  };
  return labels[key] || key;
}

// ===== TESTES MANUAIS =====

/*
EXEMPLOS DE USO:

1. Bloqueio imediato por 7 dias:
   POST /api/schedules
   {
     "message": "Wagner, procure seu gestor",
     "actionType": 0,      // Bloquear
     "scheduleType": 1,    // Uma vez
     "startDate": "now",
     "endDate": "now+7d",
     "targetType": 0,
     "targetValue": "wagner.santos@company.com"
   }

2. Bloqueio agendado para amanhã:
   {
     "startDate": "now+1d",
     "endDate": "now+1d+24h",
     ...
   }

3. Bloqueio com timeout em 5 minutos:
   {
     "startDate": "now",
     "endDate": "now+5m",
     ...
   }

4. Bloqueio por 3 horas (começando daqui 1 hora):
   {
     "startDate": "now+1h",
     "endDate": "now+1h+3h",
     ...
   }

VALIDAÇÃO:
GET /api/schedules/validate-date?date=now+7d

PRESETS:
GET /api/schedules/date-presets
*/
