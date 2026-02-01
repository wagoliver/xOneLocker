import cors from "cors";
import crypto from "crypto";
import express from "express";
import pg from "pg";
import cronParser from "cron-parser";

const app = express();
app.use(cors());
app.use(express.json({ limit: "1mb" }));

const {
  DB_HOST = "db",
  DB_PORT = "5432",
  DB_USER = "postgres",
  DB_PASSWORD = "postgres",
  DB_NAME = "locker",
  PORT = "3000",
  INTEGRATION_API_BASE_URL = "https://integration-api.featval05.xonecloud.app.br",
  CORE_REGISTRY_BASE_URL,
  AUTH_USER = "admin",
  AUTH_PASSWORD = "admin",
  AUTH_TOKEN_TTL_HOURS = "24",
  XONE_TOKEN_URL = "https://keycloak.xonecloud.com/realms/xone-cloud/protocol/openid-connect/token",
  XONE_API_BASE = "https://api.xonecloud.com/",
  XONE_CLIENT_ID,
  XONE_CLIENT_SECRET,
  XONE_SCOPE,
} = process.env;

const pool = new pg.Pool({
  host: DB_HOST,
  port: Number(DB_PORT),
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});

const SESSION_TTL_HOURS = Number(AUTH_TOKEN_TTL_HOURS) || 24;
const HASH_ITERATIONS = 100000;
const HASH_KEYLEN = 32;
const HASH_DIGEST = "sha256";

const PUBLIC_ROUTES = new Set(["/api/health", "/api/login", "/api/register"]);

app.use(async (req, res, next) => {
  if (!req.path.startsWith("/api")) {
    next();
    return;
  }

  if (PUBLIC_ROUTES.has(req.path)) {
    next();
    return;
  }

  const token = req.get("x-auth-token");
  const session = await getSession(token);
  if (!session) {
    res.status(401).json({ error: "Nao autenticado" });
    return;
  }

  req.auth = session;
  next();
});

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function waitForDb() {
  for (let attempt = 1; attempt <= 20; attempt += 1) {
    try {
      await pool.query("SELECT 1");
      return;
    } catch (err) {
      if (attempt === 20) throw err;
      await sleep(1000);
    }
  }
}

async function createSession(username) {
  return createSessionWithRole(username, "user");
}

async function createSessionWithRole(username, role) {
  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + SESSION_TTL_HOURS * 3600 * 1000);
  await pool.query(
    `
      INSERT INTO auth_sessions (token, username, role, expires_at)
      VALUES ($1, $2, $3, $4);
    `,
    [token, username, role, expiresAt]
  );
  return { token, expiresAt, role };
}

async function getSession(token) {
  if (!token) return null;
  const result = await pool.query(
    `
      SELECT token, username, role, expires_at
      FROM auth_sessions
      WHERE token = $1 AND expires_at > NOW();
    `,
    [token]
  );
  if (result.rowCount === 0) return null;
  return result.rows[0];
}

async function deleteSession(token) {
  if (!token) return;
  await pool.query("DELETE FROM auth_sessions WHERE token = $1", [token]);
}

function hashPassword(password, salt = crypto.randomBytes(16).toString("hex")) {
  const hash = crypto
    .pbkdf2Sync(password, salt, HASH_ITERATIONS, HASH_KEYLEN, HASH_DIGEST)
    .toString("hex");
  return { salt, hash };
}

async function getUserByUsername(username) {
  const result = await pool.query(
    `
      SELECT id, username, password_hash, password_salt, role, status, email, phone
      FROM users
      WHERE username = $1;
    `,
    [username]
  );
  if (result.rowCount === 0) return null;
  return result.rows[0];
}

async function ensureAdminUser() {
  const { salt, hash } = hashPassword(AUTH_PASSWORD);
  await pool.query(
    `
      INSERT INTO users (username, password_hash, password_salt, role, status, approved_at, approved_by)
      VALUES ($1, $2, $3, 'admin', 'active', NOW(), $1)
      ON CONFLICT (username)
      DO UPDATE SET password_hash = EXCLUDED.password_hash,
                    password_salt = EXCLUDED.password_salt,
                    role = 'admin',
                    status = 'active',
                    updated_at = NOW();
    `,
    [AUTH_USER, hash, salt]
  );
}
async function migrate() {
  const sql = `
    CREATE TABLE IF NOT EXISTS api_tokens (
      id INTEGER PRIMARY KEY,
      csrf_token TEXT,
      session_token TEXT,
      bearer_token TEXT,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS locker_schedules (
      id SERIAL PRIMARY KEY,
      message TEXT NOT NULL,
      action_type INTEGER NOT NULL,
      schedule_type INTEGER NOT NULL,
      start_date TIMESTAMPTZ NOT NULL,
      end_date TIMESTAMPTZ,
      recurrence_type INTEGER,
      days_of_week INTEGER[],
      start_time TEXT,
      end_time TEXT,
      target_type INTEGER NOT NULL,
      target_value TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      last_api_called_at TIMESTAMPTZ,
      last_api_status INTEGER,
      last_api_response TEXT,
      last_api_error TEXT,
      remote_schedule_id UUID,
      remote_code UUID,
      remote_enabled BOOLEAN,
      remote_is_active BOOLEAN,
      remote_synchronized_at TIMESTAMPTZ,
      remote_created_at TIMESTAMPTZ,
      remote_updated_at TIMESTAMPTZ
    );

    CREATE TABLE IF NOT EXISTS locker_user_unlocks (
      id SERIAL PRIMARY KEY,
      remote_id UUID UNIQUE NOT NULL,
      username TEXT,
      unlocked_at TIMESTAMPTZ,
      expires_at TIMESTAMPTZ,
      unlock_expiration_minutes INTEGER,
      remote_created_at TIMESTAMPTZ,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS locker_hostname_unlocks (
      id SERIAL PRIMARY KEY,
      remote_id UUID UNIQUE NOT NULL,
      hostname TEXT,
      unlocked_at TIMESTAMPTZ,
      expires_at TIMESTAMPTZ,
      unlock_expiration_minutes INTEGER,
      remote_created_at TIMESTAMPTZ,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS auth_sessions (
      id SERIAL PRIMARY KEY,
      token TEXT UNIQUE NOT NULL,
      username TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'user',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      expires_at TIMESTAMPTZ NOT NULL
    );

    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      password_salt TEXT NOT NULL,
      email TEXT,
      phone TEXT,
      role TEXT NOT NULL DEFAULT 'user',
      status TEXT NOT NULL DEFAULT 'pending',
      approved_at TIMESTAMPTZ,
      approved_by TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS audit_logs (
      id SERIAL PRIMARY KEY,
      action TEXT NOT NULL,
      entity_type TEXT NOT NULL,
      entity_id INTEGER,
      remote_id UUID,
      request_payload JSONB,
      response_status INTEGER,
      response_body TEXT,
      error TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS locker_workflows (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      definition JSONB NOT NULL,
      created_by TEXT,
      updated_by TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS locker_workflow_schedules (
      id SERIAL PRIMARY KEY,
      workflow_id INTEGER NOT NULL REFERENCES locker_workflows(id) ON DELETE CASCADE,
      cron TEXT NOT NULL,
      timezone TEXT NOT NULL DEFAULT 'UTC',
      enabled BOOLEAN NOT NULL DEFAULT TRUE,
      is_running BOOLEAN NOT NULL DEFAULT FALSE,
      next_run_at TIMESTAMPTZ,
      last_run_at TIMESTAMPTZ,
      last_status TEXT,
      last_error TEXT,
      created_by TEXT,
      updated_by TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS locker_workflow_runs (
      id SERIAL PRIMARY KEY,
      workflow_id INTEGER NOT NULL REFERENCES locker_workflows(id) ON DELETE CASCADE,
      schedule_id INTEGER REFERENCES locker_workflow_schedules(id) ON DELETE SET NULL,
      status TEXT NOT NULL,
      started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      finished_at TIMESTAMPTZ,
      result JSONB,
      error TEXT
    );

    CREATE TABLE IF NOT EXISTS xone_checkpoints (
      id SERIAL PRIMARY KEY,
      endpoint TEXT UNIQUE NOT NULL,
      field TEXT NOT NULL,
      operator TEXT NOT NULL,
      last_value TEXT NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    ALTER TABLE api_tokens
      ADD COLUMN IF NOT EXISTS bearer_token TEXT;

    ALTER TABLE auth_sessions
      ADD COLUMN IF NOT EXISTS role TEXT NOT NULL DEFAULT 'user';

    ALTER TABLE users
      ADD COLUMN IF NOT EXISTS email TEXT;

    ALTER TABLE users
      ADD COLUMN IF NOT EXISTS phone TEXT;

    CREATE UNIQUE INDEX IF NOT EXISTS locker_schedules_remote_id_idx
      ON locker_schedules (remote_schedule_id);

    CREATE UNIQUE INDEX IF NOT EXISTS locker_workflows_name_idx
      ON locker_workflows (name);

    CREATE UNIQUE INDEX IF NOT EXISTS locker_workflow_schedules_workflow_idx
      ON locker_workflow_schedules (workflow_id);

    CREATE INDEX IF NOT EXISTS locker_workflow_schedules_next_run_idx
      ON locker_workflow_schedules (next_run_at);
  `;

  await pool.query(sql);
}

async function getTokens() {
  const result = await pool.query(
    "SELECT bearer_token FROM api_tokens WHERE id = 1"
  );
  if (result.rowCount === 0) return null;
  return result.rows[0];
}

async function saveTokens(bearerToken) {
  await pool.query(
    `
      INSERT INTO api_tokens (id, bearer_token, updated_at)
      VALUES (1, $1, NOW())
      ON CONFLICT (id)
      DO UPDATE SET bearer_token = EXCLUDED.bearer_token,
                    updated_at = NOW();
    `,
    [bearerToken]
  );
}

function normalizeOptional(value) {
  if (value === undefined || value === null || value === "") return null;
  return value;
}

function normalizeNumber(value) {
  if (value === undefined || value === null || value === "") return null;
  const parsed = Number(value);
  if (Number.isNaN(parsed)) return null;
  return parsed;
}

function normalizeArray(value) {
  if (value === undefined || value === null || value === "") return null;
  if (Array.isArray(value)) {
    const parsed = value
      .map((item) => normalizeNumber(item))
      .filter((item) => item !== null);
    return parsed.length > 0 ? parsed : null;
  }
  if (typeof value === "string") {
    const parsed = value
      .split(",")
      .map((item) => normalizeNumber(item.trim()))
      .filter((item) => item !== null);
    return parsed.length > 0 ? parsed : null;
  }
  return null;
}

function normalizeText(value) {
  if (value === undefined || value === null) return null;
  const trimmed = String(value).trim();
  return trimmed.length ? trimmed : null;
}

function normalizeTimeForApi(value) {
  const text = normalizeText(value);
  if (!text) return null;
  if (/^\d{2}:\d{2}:\d{2}$/.test(text)) return text.slice(0, 5);
  if (/^\d{2}:\d{2}$/.test(text)) return text;
  return text;
}

function parseKeyValueLines(input) {
  const result = {};
  if (!input) return result;
  String(input)
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .forEach((line) => {
      const match = line.match(/^([^:=]+)\s*[:=]\s*(.*)$/);
      if (!match) return;
      const key = match[1].trim();
      const value = match[2].trim();
      if (!key) return;
      result[key] = value;
    });
  return result;
}

function getValueByPath(value, path) {
  if (!path) return value;
  const segments = String(path)
    .split(".")
    .map((seg) => seg.trim())
    .filter(Boolean);
  let current = value;
  for (const segment of segments) {
    if (current === undefined || current === null) return null;
    const parts = segment.split(/[\[\]]/).filter(Boolean);
    for (const part of parts) {
      if (current === undefined || current === null) return null;
      if (/^\d+$/.test(part)) {
        current = current[Number(part)];
      } else {
        current = current[part];
      }
    }
  }
  return current;
}

function isPrimitive(value) {
  return (
    value === null ||
    value === undefined ||
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  );
}

function coerceValue(value) {
  if (value === null || value === undefined) return value;
  if (typeof value !== "string") return value;
  const trimmed = value.trim();
  if (trimmed === "") return "";
  if (trimmed.toLowerCase() === "true") return true;
  if (trimmed.toLowerCase() === "false") return false;
  if (trimmed.toLowerCase() === "null") return null;
  const num = Number(trimmed);
  if (!Number.isNaN(num) && String(num) === trimmed) return num;
  return trimmed;
}

function compareValues(left, operator, right) {
  const leftValue = coerceValue(left);
  const rightValue = coerceValue(right);

  if (operator === "contains" || operator === "not contains") {
    let result = false;
    if (Array.isArray(leftValue)) {
      result = leftValue.includes(rightValue);
    } else if (typeof leftValue === "string") {
      result = leftValue.includes(String(rightValue ?? ""));
    }
    return operator === "contains" ? result : !result;
  }

  if (operator === ">=" || operator === "<=") {
    if (typeof leftValue !== "number" || typeof rightValue !== "number") {
      return false;
    }
    return operator === ">=" ? leftValue >= rightValue : leftValue <= rightValue;
  }

  if (operator === "==" || operator === "!=") {
    const areEqual =
      typeof leftValue === "number" && typeof rightValue === "number"
        ? leftValue === rightValue
        : String(leftValue ?? "") === String(rightValue ?? "");
    return operator === "==" ? areEqual : !areEqual;
  }

  return false;
}

function evaluateFilterConditions(item, conditions, logic) {
  if (!conditions.length) return true;
  const checks = conditions.map((cond) => {
    if (!cond.field) return false;
    const currentValue = getValueByPath(item, cond.field);
    return compareValues(currentValue, cond.operator, cond.value);
  });
  return logic === "OR" ? checks.some(Boolean) : checks.every(Boolean);
}

function applyFilterToItem(item, conditions, logic) {
  if (Array.isArray(item)) {
    return item.filter((entry) => evaluateFilterConditions(entry, conditions, logic));
  }
  if (item && typeof item === "object") {
    return evaluateFilterConditions(item, conditions, logic) ? item : null;
  }
  return evaluateFilterConditions({ value: item }, conditions, logic) ? item : null;
}

function isFilterableItem(item) {
  if (Array.isArray(item)) return true;
  if (item && typeof item === "object") return true;
  return false;
}

function normalizeTargetValue(value) {
  if (value === undefined || value === null) return null;
  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed.length ? trimmed : null;
  }
  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }
  return null;
}

function getBlockSourceItem(item, config) {
  const path = String(config?.sourcePath || "").trim();
  if (!path) return item;
  return getValueByPath(item, path);
}

function getTargetValueFromEntry(entry, config) {
  if (isPrimitive(entry)) {
    return entry;
  }
  if (!entry || typeof entry !== "object") return null;
  const valuePath = String(config?.valuePath || "").trim();
  if (valuePath) {
    return getValueByPath(entry, valuePath);
  }
  const targetType = Number(config?.targetType ?? 0);
  if (targetType === 1) {
    return entry.hostname ?? entry.host ?? entry.machine ?? entry.computer ?? null;
  }
  return entry.username ?? entry.user ?? entry.login ?? entry.email ?? null;
}

function getTimeValueFromEntry(entry, path) {
  const resolvedPath = String(path || "").trim();
  if (!resolvedPath) return null;
  return getValueByPath(entry, resolvedPath);
}

function buildBlockTargets(source, config) {
  const list = Array.isArray(source) ? source : [source];
  const targets = [];
  list.forEach((entry) => {
    const value = getTargetValueFromEntry(entry, config);
    const normalized = normalizeTargetValue(value);
    if (normalized) targets.push({ target: normalized, entry });
  });
  if (String(config?.dedupe || "yes") === "no") {
    return targets;
  }
  const seen = new Set();
  return targets.filter((item) => {
    if (seen.has(item.target)) return false;
    seen.add(item.target);
    return true;
  });
}

function parseManualTargets(value) {
  if (!value) return [];
  const raw = String(value).trim();
  if (!raw) return [];
  if (raw.startsWith("[")) {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed.map((item) => String(item).trim()).filter(Boolean);
      }
    } catch {
      // fallback to line parsing
    }
  }
  return raw
    .split(/[\n,]+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseDaysOfWeek(value) {
  if (!value) return [];
  const raw = String(value)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  const days = raw
    .map((item) => Number(item))
    .filter((item) => Number.isFinite(item) && item >= 0 && item <= 6);
  return Array.from(new Set(days));
}

function computeNextRun(cron, timezone, fromDate = new Date()) {
  const options = timezone ? { currentDate: fromDate, tz: timezone } : { currentDate: fromDate };
  const interval = cronParser.parseExpression(cron, options);
  return interval.next().toDate();
}

function ensureCron(cron, timezone) {
  if (!cron || typeof cron !== "string") {
    return { ok: false, error: "Cron obrigatorio." };
  }
  try {
    computeNextRun(cron, timezone, new Date());
    return { ok: true };
  } catch (err) {
    return { ok: false, error: "Cron invalido." };
  }
}

async function getWorkflowSchedule(workflowId) {
  const result = await pool.query(
    "SELECT * FROM locker_workflow_schedules WHERE workflow_id = $1",
    [workflowId]
  );
  if (result.rowCount === 0) return null;
  return result.rows[0];
}

async function upsertWorkflowSchedule(workflowId, data, author) {
  const existing = await getWorkflowSchedule(workflowId);
  const enabled =
    typeof data?.enabled === "boolean"
      ? data.enabled
      : data?.enabled === "false"
        ? false
        : true;
  const cron = normalizeText(data?.cron) || normalizeText(existing?.cron);
  const timezone =
    normalizeText(data?.timezone) || normalizeText(existing?.timezone) || "UTC";

  if (!cron) {
    return { ok: false, error: "Cron obrigatorio." };
  }

  if (enabled) {
    const validation = ensureCron(cron, timezone);
    if (!validation.ok) {
      return validation;
    }
  }

  const nextRun = enabled && cron ? computeNextRun(cron, timezone, new Date()) : null;

  const result = await pool.query(
    `
      INSERT INTO locker_workflow_schedules (
        workflow_id,
        cron,
        timezone,
        enabled,
        next_run_at,
        created_by,
        updated_by
      )
      VALUES ($1, $2, $3, $4, $5, $6, $6)
      ON CONFLICT (workflow_id)
      DO UPDATE SET cron = EXCLUDED.cron,
                    timezone = EXCLUDED.timezone,
                    enabled = EXCLUDED.enabled,
                    next_run_at = EXCLUDED.next_run_at,
                    updated_by = EXCLUDED.updated_by,
                    is_running = CASE
                                   WHEN EXCLUDED.enabled THEN locker_workflow_schedules.is_running
                                   ELSE FALSE
                                 END,
                    updated_at = NOW()
      RETURNING *;
    `,
    [workflowId, cron, timezone, enabled, nextRun, author]
  );

  return { ok: true, schedule: result.rows[0] };
}

async function fetchWithTimeout(url, options = {}, timeoutMs = 60000) {
  const controller =
    typeof AbortController !== "undefined" ? new AbortController() : null;
  let timeoutId = null;
  const fetchPromise = fetch(url, {
    ...options,
    signal: controller ? controller.signal : undefined,
  });
  const timeoutPromise = new Promise((_, reject) => {
    timeoutId = setTimeout(() => {
      if (controller) controller.abort();
      const error = new Error("Timeout");
      error.name = "TimeoutError";
      reject(error);
    }, timeoutMs);
  });
  try {
    const response = await Promise.race([fetchPromise, timeoutPromise]);
    return response;
  } finally {
    if (timeoutId) clearTimeout(timeoutId);
  }
}

function buildApiPayload(schedule) {
  const payload = {
    actionType: schedule.action_type,
    message: schedule.message,
    scheduleType: schedule.schedule_type,
    startDate: schedule.start_date,
    endDate: schedule.end_date,
    recurrenceType: schedule.recurrence_type,
    daysOfWeek: schedule.days_of_week,
    startTime: schedule.start_time,
    endTime: schedule.end_time,
    targetType: schedule.target_type,
    targetValue: schedule.target_value,
  };

  Object.keys(payload).forEach((key) => {
    if (payload[key] === null || payload[key] === undefined) {
      delete payload[key];
    }
  });

  return payload;
}

async function callCoreRegistry(schedule) {
  const tokens = await getTokens();
  if (!tokens || !tokens.bearer_token) {
    return {
      ok: false,
      status: null,
      responseText: null,
      error: "Bearer token nao configurado",
    };
  }

  const payload = buildApiPayload(schedule);

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${tokens.bearer_token}`,
  };

  const baseUrl = INTEGRATION_API_BASE_URL || CORE_REGISTRY_BASE_URL;
  const url = `${baseUrl.replace(/\/$/, "")}/api/LockerSchedules`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });

    const responseText = await response.text();

    return {
      ok: response.ok,
      status: response.status,
      responseText,
      payload,
      error: response.ok ? null : responseText,
    };
  } catch (err) {
    return {
      ok: false,
      status: null,
      responseText: null,
      payload,
      error: err.message || "Erro ao chamar Integration API",
    };
  }
}

async function callIntegrationDelete(remoteId) {
  const tokens = await getTokens();
  if (!tokens || !tokens.bearer_token) {
    return {
      ok: false,
      status: null,
      responseText: null,
      error: "Bearer token nao configurado",
    };
  }

  const headers = {
    Authorization: `Bearer ${tokens.bearer_token}`,
  };

  const baseUrl = INTEGRATION_API_BASE_URL || CORE_REGISTRY_BASE_URL;
  const url = `${baseUrl.replace(/\/$/, "")}/api/LockerSchedules/${remoteId}`;

  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers,
    });

    const responseText = await response.text();
    const ok = response.ok || response.status === 404;

    return {
      ok,
      status: response.status,
      responseText,
      payload: null,
      error: ok ? null : responseText,
    };
  } catch (err) {
    return {
      ok: false,
      status: null,
      responseText: null,
      payload: null,
      error: err.message || "Erro ao chamar Integration API",
    };
  }
}

function getDefaultDataItem(payload) {
  if (!payload || typeof payload !== "object") return payload;
  if (payload.payload !== undefined) return payload.payload;
  if (payload.data?.items !== undefined) return payload.data.items;
  if (payload.data?.item !== undefined) return payload.data.item;
  return payload;
}

function getWebhookPayload(result) {
  if (!result) return null;
  let payload = result.bodyJson;
  if (!payload && result.bodyText) {
    try {
      payload = JSON.parse(result.bodyText);
    } catch {
      payload = result.bodyText;
    }
  }
  return payload;
}

function getNodeDefaultItem(node, result) {
  const payload = getWebhookPayload(result);
  const responsePath = node?.config?.responsePath;
  if (!responsePath || responsePath === "data.item") {
    return getDefaultDataItem(payload);
  }
  return getValueByPath(payload, responsePath);
}

function getExecutionOrder(startNodeId, nodes, edges) {
  const adjacency = edges.reduce((acc, edge) => {
    if (!acc[edge.from]) acc[edge.from] = [];
    acc[edge.from].push(edge.to);
    return acc;
  }, {});
  const order = [];
  const queue = [startNodeId];
  const visited = new Set([startNodeId]);

  while (queue.length) {
    const current = queue.shift();
    if (current !== startNodeId) {
      const node = nodes.find((item) => item.id === current);
      if (node) order.push(node);
    }
    const nexts = adjacency[current] || [];
    nexts.forEach((nextId) => {
      if (!visited.has(nextId)) {
        visited.add(nextId);
        queue.push(nextId);
      }
    });
  }

  return order;
}

function getUpstreamNodeId(nodeId, edges) {
  const incoming = edges.find((edge) => edge.to === nodeId);
  return incoming ? incoming.from : null;
}

function buildWebhookRequest(config) {
  const method = (config.method || "GET").toUpperCase();
  const url = config.url ? String(config.url).trim() : "";
  if (!url) {
    throw new Error("URL obrigatoria.");
  }
  const headers = new Headers();
  const authType = config.authType || "none";
  if (authType === "bearer") {
    if (!config.authToken) {
      throw new Error("Bearer token obrigatorio.");
    }
    headers.set("Authorization", `Bearer ${config.authToken}`);
  } else if (authType === "apiKey") {
    const headerName = config.apiKeyHeader || "x-api-key";
    if (!config.apiKeyValue) {
      throw new Error("API Key obrigatoria.");
    }
    headers.set(headerName, config.apiKeyValue);
  }

  const extraHeaders = parseKeyValueLines(config.headers);
  Object.entries(extraHeaders).forEach(([key, value]) => {
    headers.set(key, value);
  });

  const queryParams = parseKeyValueLines(config.queryParams);
  const requestUrl = new URL(url);
  Object.entries(queryParams).forEach(([key, value]) => {
    requestUrl.searchParams.set(key, value);
  });

  let body = null;
  let warning = null;
  const bodyType = config.bodyType || "none";
  if (bodyType !== "none" && method === "GET") {
    warning = "Body ignorado para metodo GET.";
  } else if (bodyType === "json") {
    if (!config.body) {
      body = null;
    } else {
      let parsed;
      try {
        parsed = JSON.parse(config.body);
      } catch {
        throw new Error("JSON invalido no payload.");
      }
      body = JSON.stringify(parsed);
      if (!headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
      }
    }
  } else if (bodyType === "form") {
    const params = parseKeyValueLines(config.body);
    const formBody = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      formBody.append(key, value);
    });
    body = formBody.toString();
    if (!headers.has("Content-Type")) {
      headers.set("Content-Type", "application/x-www-form-urlencoded");
    }
  } else if (bodyType === "text") {
    body = config.body || "";
    if (!headers.has("Content-Type")) {
      headers.set("Content-Type", "text/plain");
    }
  }

  const options = {
    method,
    headers,
  };
  if (body && method !== "GET") {
    options.body = body;
  }

  return { url: requestUrl.toString(), options, warning };
}

function buildBlockSchedulePayload(config, targetValue, options = {}) {
  const actionType = normalizeNumber(config?.actionType) ?? 0;
  const scheduleType = normalizeNumber(config?.scheduleType) ?? 0;
  const startDate = normalizeOptional(config?.startDate);
  const endDate = normalizeOptional(config?.endDate);
  const recurrenceType = normalizeNumber(config?.recurrenceType);
  const daysOfWeek = parseDaysOfWeek(config?.daysOfWeek);
  const resolvedStartTime =
    options.startTime !== undefined ? options.startTime : config?.startTime;
  const resolvedEndTime =
    options.endTime !== undefined ? options.endTime : config?.endTime;
  const startTime = normalizeTimeForApi(resolvedStartTime);
  const endTime = normalizeTimeForApi(resolvedEndTime);
  const targetType = normalizeNumber(config?.targetType) ?? 0;
  const message =
    normalizeText(config?.message) ||
    (actionType === 1 ? "Agendamento de desbloqueio" : "Agendamento de bloqueio");
  const normalizedTarget = normalizeText(targetValue);

  if (
    !message ||
    actionType === null ||
    scheduleType === null ||
    !startDate ||
    targetType === null ||
    !normalizedTarget
  ) {
    return {
      error:
        "Campos obrigatorios: mensagem, acao, tipo, inicio e alvo.",
    };
  }

  if (scheduleType === 1 && recurrenceType === null) {
    return { error: "Recorrencia e obrigatoria." };
  }

  if (scheduleType === 1 && recurrenceType === 1 && daysOfWeek.length === 0) {
    return { error: "Selecione pelo menos um dia da semana." };
  }

  if (scheduleType === 1 && (!startTime || !endTime)) {
    return { error: "Hora inicial e final sao obrigatorias." };
  }

  return {
    payload: {
      message,
      actionType,
      scheduleType,
      startDate,
      endDate,
      recurrenceType: scheduleType === 1 ? recurrenceType : null,
      daysOfWeek: scheduleType === 1 && daysOfWeek.length ? daysOfWeek : null,
      startTime: scheduleType === 1 ? startTime : null,
      endTime: scheduleType === 1 ? endTime : null,
      targetType,
      targetValue: normalizedTarget,
    },
  };
}

function buildBlockConfiguredItem(config, targetValue, options = {}) {
  const actionType = normalizeNumber(config?.actionType) ?? 0;
  const scheduleType = normalizeNumber(config?.scheduleType) ?? 0;
  const startDate = normalizeOptional(config?.startDate);
  const endDate = normalizeOptional(config?.endDate);
  const recurrenceType = normalizeNumber(config?.recurrenceType);
  const daysOfWeek = parseDaysOfWeek(config?.daysOfWeek);
  const resolvedStartTime =
    options.startTime !== undefined ? options.startTime : config?.startTime;
  const resolvedEndTime =
    options.endTime !== undefined ? options.endTime : config?.endTime;
  const startTime = normalizeTimeForApi(resolvedStartTime);
  const endTime = normalizeTimeForApi(resolvedEndTime);
  const targetType = normalizeNumber(config?.targetType) ?? 0;
  const message =
    normalizeText(config?.message) ||
    (actionType === 1 ? "Agendamento de desbloqueio" : "Agendamento de bloqueio");

  return {
    message,
    actionType,
    scheduleType,
    startDate,
    endDate,
    recurrenceType: scheduleType === 1 ? recurrenceType : null,
    daysOfWeek: scheduleType === 1 && daysOfWeek.length ? daysOfWeek : null,
    startTime: scheduleType === 1 ? startTime : null,
    endTime: scheduleType === 1 ? endTime : null,
    targetType,
    targetValue: normalizeText(targetValue),
    sourceMode: config?.sourceMode || "data",
    sourcePath: normalizeText(config?.sourcePath) || null,
    valuePath: normalizeText(config?.valuePath) || null,
    timeSource: config?.timeSource || "manual",
    startTimePath: normalizeText(config?.startTimePath) || null,
    endTimePath: normalizeText(config?.endTimePath) || null,
  };
}

async function createScheduleFromPayload(payload) {
  const message = normalizeText(payload?.message);
  const actionType = normalizeNumber(payload?.actionType);
  const scheduleType = normalizeNumber(payload?.scheduleType);
  const startDate = normalizeOptional(payload?.startDate);
  const targetType = normalizeNumber(payload?.targetType);
  const targetValue = normalizeText(payload?.targetValue);

  if (
    !message ||
    actionType === null ||
    scheduleType === null ||
    !startDate ||
    targetType === null ||
    !targetValue
  ) {
    return { ok: false, error: "Payload invalido." };
  }

  const endDate = normalizeOptional(payload?.endDate);
  const recurrenceType = normalizeNumber(payload?.recurrenceType);
  const daysOfWeek = normalizeArray(payload?.daysOfWeek);
  const startTime = normalizeOptional(payload?.startTime);
  const endTime = normalizeOptional(payload?.endTime);

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
        target_value
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
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
    ]
  );

  const schedule = insert.rows[0];
  const apiResult = await callCoreRegistry(schedule);
  await logAudit({
    action: "CREATE_SCHEDULE_WORKFLOW",
    entityType: "SCHEDULE",
    entityId: schedule.id,
    remoteId: null,
    requestPayload: apiResult.payload,
    responseStatus: apiResult.status,
    responseBody: apiResult.responseText,
    error: apiResult.error,
  });

  const updatedSchedule = await applyApiResult(schedule.id, apiResult);
  return {
    ok: apiResult.ok,
    schedule: updatedSchedule,
    api: apiResult,
  };
}

async function executeWorkflowDefinition(definition) {
  const nodes = Array.isArray(definition?.nodes) ? definition.nodes : [];
  const edges = Array.isArray(definition?.edges) ? definition.edges : [];
  const startNode = nodes.find((node) => node.type === "start");
  if (!startNode) {
    return { ok: false, error: "Fluxo sem bloco Inicio." };
  }

  const order = getExecutionOrder(startNode.id, nodes, edges);
  if (!order.length) {
    return { ok: false, error: "Nenhum bloco conectado ao Inicio." };
  }

  const outputs = new Map();
  const results = [];
  let hasWarning = false;

  for (const node of order) {
    if (node.type === "webhook") {
      const result = {
        ok: false,
        status: null,
        statusText: "",
        url: "",
        headers: null,
        bodyText: "",
        bodyJson: null,
        warning: null,
        error: null,
      };
      try {
        const { url, options, warning } = buildWebhookRequest(node.config || {});
        result.warning = warning;
        const response = await fetchWithTimeout(url, options, 60000);
        const text = await response.text();
        let json = null;
        try {
          json = text ? JSON.parse(text) : null;
        } catch {
          json = null;
        }
        result.ok = response.ok;
        result.status = response.status;
        result.statusText = response.statusText;
        result.url = response.url;
        result.headers = Object.fromEntries(response.headers.entries());
        result.bodyText = text;
        result.bodyJson = json;
      } catch (err) {
        result.error = err?.message || "Falha ao executar webhook.";
      }
      const item = getNodeDefaultItem(node, result);
      outputs.set(node.id, item);
      results.push({ nodeId: node.id, type: node.type, ok: result.ok, result });
      if (!result.ok) {
        return { ok: false, error: result.error || "Webhook falhou.", results };
      }
    } else if (node.type === "filter") {
      const sourceId = getUpstreamNodeId(node.id, edges);
      if (!sourceId) {
        return { ok: false, error: "Filtro sem bloco anterior.", results };
      }
      const item = outputs.get(sourceId);
      if (item === undefined) {
        return { ok: false, error: "Filtro sem data.item.", results };
      }
      if (!isFilterableItem(item)) {
        return { ok: false, error: "Filtro com data.item invalido.", results };
      }
      const conditions = (node.config?.conditions || []).map((cond) => ({
        field: cond?.field ?? "",
        operator: cond?.operator ?? "==",
        value: cond?.value ?? "",
      }));
      const hasValid = conditions.some((cond) => cond.field && cond.operator);
      if (!hasValid) {
        return { ok: false, error: "Filtro sem condicoes.", results };
      }
      let filtered = null;
      try {
        filtered = applyFilterToItem(item, conditions, node.config?.logic || "AND");
      } catch {
        return { ok: false, error: "Erro ao processar filtro.", results };
      }
      outputs.set(node.id, filtered);
      results.push({ nodeId: node.id, type: node.type, ok: true });
    } else if (node.type === "block") {
      const sourceId = getUpstreamNodeId(node.id, edges);
      const sourceMode = node.config?.sourceMode || "data";
      const timeSource = node.config?.timeSource || "manual";
      let targets = [];

      if (sourceMode === "manual") {
        targets = parseManualTargets(node.config?.manualTargets).map((target) => ({
          target,
          entry: null,
        }));
        if (!targets.length) {
          return { ok: false, error: "Sem alvo manual.", results };
        }
      } else {
        if (!sourceId) {
          return { ok: false, error: "Bloqueio sem bloco anterior.", results };
        }
        const item = outputs.get(sourceId);
        if (item === undefined) {
          return { ok: false, error: "Bloqueio sem data.item.", results };
        }
        const sourceItem = getBlockSourceItem(item, node.config || {});
        if (sourceItem === undefined || sourceItem === null) {
          return { ok: false, error: "Bloqueio sem data.items.", results };
        }
        targets = buildBlockTargets(sourceItem, node.config || {});
        if (!targets.length) {
          return { ok: false, error: "Bloqueio sem alvos.", results };
        }
      }

      const targetList = targets.map((item) => item.target ?? item);
      const configuredItems = targets.map((targetInfo) => {
        const target = targetInfo.target ?? targetInfo;
        const entry = targetInfo.entry;
        const timeOverrides =
          timeSource === "dynamic"
            ? {
                startTime: getTimeValueFromEntry(entry, node.config?.startTimePath),
                endTime: getTimeValueFromEntry(entry, node.config?.endTimePath),
              }
            : {};
        return buildBlockConfiguredItem(node.config || {}, target, timeOverrides);
      });

      let failedCount = 0;
      for (const targetInfo of targets) {
        const target = targetInfo.target ?? targetInfo;
        const entry = targetInfo.entry;
        const timeOverrides =
          timeSource === "dynamic"
            ? {
                startTime: getTimeValueFromEntry(entry, node.config?.startTimePath),
                endTime: getTimeValueFromEntry(entry, node.config?.endTimePath),
              }
            : {};
        const { payload, error } = buildBlockSchedulePayload(
          node.config || {},
          target,
          timeOverrides
        );
        if (error || !payload) {
          failedCount += 1;
          continue;
        }
        const apiResult = await createScheduleFromPayload(payload);
        if (!apiResult.ok) {
          failedCount += 1;
        }
      }

      outputs.set(node.id, configuredItems);
      results.push({
        nodeId: node.id,
        type: node.type,
        ok: failedCount === 0,
        total: targetList.length,
        failedCount,
        successCount: targetList.length - failedCount,
      });
      if (failedCount > 0 && targetList.length - failedCount > 0) {
        hasWarning = true;
      }
      if (failedCount > 0 && targetList.length - failedCount === 0) {
        return { ok: false, error: "Falha ao executar bloqueio.", results };
      }
    } else if (node.type === "table") {
      const sourceId = getUpstreamNodeId(node.id, edges);
      if (sourceId) {
        outputs.set(node.id, outputs.get(sourceId));
      }
      results.push({ nodeId: node.id, type: node.type, ok: true });
    }
  }

  return { ok: true, level: hasWarning ? "warning" : "success", results };
}

async function executeWorkflowById(workflowId, scheduleId = null) {
  const workflowResult = await pool.query(
    "SELECT id, definition FROM locker_workflows WHERE id = $1",
    [workflowId]
  );
  if (workflowResult.rowCount === 0) {
    return { ok: false, error: "Fluxo nao encontrado." };
  }

  const workflow = workflowResult.rows[0];
  const runInsert = await pool.query(
    `
      INSERT INTO locker_workflow_runs (workflow_id, schedule_id, status)
      VALUES ($1, $2, 'running')
      RETURNING id;
    `,
    [workflow.id, scheduleId]
  );
  const runId = runInsert.rows[0].id;

  let status = "success";
  let result = null;
  let error = null;
  try {
    const exec = await executeWorkflowDefinition(workflow.definition);
    result = exec;
    if (!exec.ok) {
      status = "error";
      error = exec.error || "Falha na execucao do fluxo.";
    } else if (exec.level === "warning") {
      status = "partial";
    }
  } catch (err) {
    status = "error";
    error = err?.message || "Falha na execucao do fluxo.";
  }

  await pool.query(
    `
      UPDATE locker_workflow_runs
      SET status = $1,
          finished_at = NOW(),
          result = $2,
          error = $3
      WHERE id = $4;
    `,
    [status, result, error, runId]
  );

  return { ok: status !== "error", status, result, error };
}

let workflowSchedulerTimer = null;
let workflowSchedulerBusy = false;

async function processWorkflowSchedules() {
  if (workflowSchedulerBusy) return;
  workflowSchedulerBusy = true;
  try {
    const due = await pool.query(
      `
        SELECT *
        FROM locker_workflow_schedules
        WHERE enabled = TRUE
          AND next_run_at IS NOT NULL
          AND next_run_at <= NOW()
        ORDER BY next_run_at ASC
        LIMIT 10;
      `
    );

    for (const schedule of due.rows) {
      const nextRun = computeNextRun(schedule.cron, schedule.timezone, new Date());
      const claim = await pool.query(
        `
          UPDATE locker_workflow_schedules
          SET is_running = TRUE,
              last_run_at = NOW(),
              next_run_at = $2,
              updated_at = NOW()
          WHERE id = $1 AND is_running = FALSE
          RETURNING *;
        `,
        [schedule.id, nextRun]
      );
      if (claim.rowCount === 0) {
        continue;
      }

      let status = "success";
      let error = null;
      try {
        const runResult = await executeWorkflowById(schedule.workflow_id, schedule.id);
        status = runResult.status || (runResult.ok ? "success" : "error");
        if (!runResult.ok) {
          error = runResult.error || "Falha na execucao.";
        }
      } catch (err) {
        status = "error";
        error = err?.message || "Falha na execucao.";
      }

      await pool.query(
        `
          UPDATE locker_workflow_schedules
          SET is_running = FALSE,
              last_status = $2,
              last_error = $3,
              updated_at = NOW()
          WHERE id = $1;
        `,
        [schedule.id, status, error]
      );
    }
  } finally {
    workflowSchedulerBusy = false;
  }
}

function startWorkflowScheduler() {
  if (workflowSchedulerTimer) return;
  workflowSchedulerTimer = setInterval(processWorkflowSchedules, 30000);
  processWorkflowSchedules();
}

async function fetchIntegrationList(path, params = {}) {
  const tokens = await getTokens();
  if (!tokens || !tokens.bearer_token) {
    return {
      ok: false,
      status: null,
      responseText: null,
      error: "Bearer token nao configurado",
      data: [],
    };
  }

  const baseUrl = INTEGRATION_API_BASE_URL || CORE_REGISTRY_BASE_URL;
  if (!baseUrl) {
    return {
      ok: false,
      status: null,
      responseText: null,
      error: "Base URL da Integration API nao configurada",
      data: [],
    };
  }

  const headers = {
    Authorization: `Bearer ${tokens.bearer_token}`,
  };
  const pageSize = 100;
  let pageNumber = 1;
  let hasNext = true;
  let totalPages = null;
  const data = [];

  try {
    while (hasNext && pageNumber <= 50) {
      const url = new URL(`${baseUrl.replace(/\/$/, "")}${path}`);
      url.searchParams.set("PageNumber", String(pageNumber));
      url.searchParams.set("PageSize", String(pageSize));
      Object.entries(params).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== "") {
          url.searchParams.set(key, String(value));
        }
      });

      const response = await fetch(url.toString(), {
        method: "GET",
        headers,
      });

      const responseText = await response.text();
      if (!response.ok) {
        return {
          ok: false,
          status: response.status,
          responseText,
          error: responseText,
          data: [],
        };
      }

      let parsed = null;
      try {
        parsed = JSON.parse(responseText);
      } catch {
        parsed = null;
      }

      const value = parsed?.value || parsed;
      const pageData = Array.isArray(value?.data) ? value.data : [];
      data.push(...pageData);

      if (typeof value?.totalPages === "number") {
        totalPages = value.totalPages;
        hasNext = pageNumber < totalPages;
      } else if (typeof value?.hasNextPage === "boolean") {
        hasNext = value.hasNextPage;
      } else {
        hasNext = pageData.length === pageSize;
      }

      pageNumber += 1;
    }
  } catch (err) {
    return {
      ok: false,
      status: null,
      responseText: null,
      error: err?.message || "Erro ao chamar Integration API",
      data: [],
    };
  }

  return {
    ok: true,
    status: 200,
    responseText: null,
    error: null,
    data,
  };
}

async function syncSchedulesFromApi() {
  const apiResult = await fetchIntegrationList("/api/LockerSchedules");
  if (!apiResult.ok) return { ok: false, error: apiResult.error };

  const data = apiResult.data || [];
  const remoteIds = data.map((item) => item.id);
  let inserted = 0;
  let updated = 0;

  for (const item of data) {
    const exists = await pool.query(
      "SELECT id FROM locker_schedules WHERE remote_schedule_id = $1",
      [item.id]
    );

    if (exists.rowCount > 0) {
      await pool.query(
        `
          UPDATE locker_schedules
          SET action_type = $1,
              schedule_type = $2,
              start_date = $3,
              end_date = $4,
              recurrence_type = $5,
              days_of_week = $6,
              start_time = $7,
              end_time = $8,
              target_type = $9,
              target_value = $10,
              remote_created_at = $11,
              updated_at = NOW()
          WHERE remote_schedule_id = $12;
        `,
        [
          item.actionType,
          item.scheduleType,
          item.startDate,
          item.endDate,
          item.recurrenceType,
          item.daysOfWeek,
          item.startTime,
          item.endTime,
          item.targetType,
          item.targetValue,
          item.createdAt,
          item.id,
        ]
      );
      updated += 1;
    } else {
      await pool.query(
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
            remote_schedule_id,
            remote_created_at
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13);
        `,
        [
          "Importado da API",
          item.actionType,
          item.scheduleType,
          item.startDate,
          item.endDate,
          item.recurrenceType,
          item.daysOfWeek,
          item.startTime,
          item.endTime,
          item.targetType,
          item.targetValue,
          item.id,
          item.createdAt,
        ]
      );
      inserted += 1;
    }
  }

  let deleted = 0;
  if (remoteIds.length === 0) {
    const result = await pool.query("DELETE FROM locker_schedules");
    deleted = result.rowCount || 0;
  } else {
    const result = await pool.query(
      `
        DELETE FROM locker_schedules
        WHERE remote_schedule_id IS NULL
           OR remote_schedule_id <> ALL($1::uuid[]);
      `,
      [remoteIds]
    );
    deleted = result.rowCount || 0;
  }

  return {
    ok: true,
    inserted,
    updated,
    deleted,
    total: data.length,
  };
}

async function syncUserUnlocksFromApi() {
  const apiResult = await fetchIntegrationList("/api/LockerUserUnlocks");
  if (!apiResult.ok) return { ok: false, error: apiResult.error };

  const data = apiResult.data || [];
  const remoteIds = data.map((item) => item.id);
  let inserted = 0;
  let updated = 0;

  for (const item of data) {
    const exists = await pool.query(
      "SELECT id FROM locker_user_unlocks WHERE remote_id = $1",
      [item.id]
    );

    if (exists.rowCount > 0) {
      await pool.query(
        `
          UPDATE locker_user_unlocks
          SET username = $1,
              unlocked_at = $2,
              expires_at = $3,
              unlock_expiration_minutes = $4,
              remote_created_at = $5,
              updated_at = NOW()
          WHERE remote_id = $6;
        `,
        [
          item.username,
          item.unlockedAt,
          item.expiresAt,
          item.unlockExpirationMinutes,
          item.createdAt,
          item.id,
        ]
      );
      updated += 1;
    } else {
      await pool.query(
        `
          INSERT INTO locker_user_unlocks (
            remote_id,
            username,
            unlocked_at,
            expires_at,
            unlock_expiration_minutes,
            remote_created_at
          )
          VALUES ($1, $2, $3, $4, $5, $6);
        `,
        [
          item.id,
          item.username,
          item.unlockedAt,
          item.expiresAt,
          item.unlockExpirationMinutes,
          item.createdAt,
        ]
      );
      inserted += 1;
    }
  }

  let deleted = 0;
  if (remoteIds.length === 0) {
    const result = await pool.query("DELETE FROM locker_user_unlocks");
    deleted = result.rowCount || 0;
  } else {
    const result = await pool.query(
      `
        DELETE FROM locker_user_unlocks
        WHERE remote_id <> ALL($1::uuid[]);
      `,
      [remoteIds]
    );
    deleted = result.rowCount || 0;
  }

  return {
    ok: true,
    inserted,
    updated,
    deleted,
    total: data.length,
  };
}

async function syncHostnameUnlocksFromApi() {
  const apiResult = await fetchIntegrationList("/api/LockerHostnameUnlocks");
  if (!apiResult.ok) return { ok: false, error: apiResult.error };

  const data = apiResult.data || [];
  const remoteIds = data.map((item) => item.id);
  let inserted = 0;
  let updated = 0;

  for (const item of data) {
    const exists = await pool.query(
      "SELECT id FROM locker_hostname_unlocks WHERE remote_id = $1",
      [item.id]
    );

    if (exists.rowCount > 0) {
      await pool.query(
        `
          UPDATE locker_hostname_unlocks
          SET hostname = $1,
              unlocked_at = $2,
              expires_at = $3,
              unlock_expiration_minutes = $4,
              remote_created_at = $5,
              updated_at = NOW()
          WHERE remote_id = $6;
        `,
        [
          item.hostname,
          item.unlockedAt,
          item.expiresAt,
          item.unlockExpirationMinutes,
          item.createdAt,
          item.id,
        ]
      );
      updated += 1;
    } else {
      await pool.query(
        `
          INSERT INTO locker_hostname_unlocks (
            remote_id,
            hostname,
            unlocked_at,
            expires_at,
            unlock_expiration_minutes,
            remote_created_at
          )
          VALUES ($1, $2, $3, $4, $5, $6);
        `,
        [
          item.id,
          item.hostname,
          item.unlockedAt,
          item.expiresAt,
          item.unlockExpirationMinutes,
          item.createdAt,
        ]
      );
      inserted += 1;
    }
  }

  let deleted = 0;
  if (remoteIds.length === 0) {
    const result = await pool.query("DELETE FROM locker_hostname_unlocks");
    deleted = result.rowCount || 0;
  } else {
    const result = await pool.query(
      `
        DELETE FROM locker_hostname_unlocks
        WHERE remote_id <> ALL($1::uuid[]);
      `,
      [remoteIds]
    );
    deleted = result.rowCount || 0;
  }

  return {
    ok: true,
    inserted,
    updated,
    deleted,
    total: data.length,
  };
}

async function logAudit({
  action,
  entityType,
  entityId,
  remoteId,
  requestPayload,
  responseStatus,
  responseBody,
  error,
}) {
  await pool.query(
    `
      INSERT INTO audit_logs (
        action,
        entity_type,
        entity_id,
        remote_id,
        request_payload,
        response_status,
        response_body,
        error
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
    `,
    [
      action,
      entityType,
      entityId ?? null,
      remoteId ?? null,
      requestPayload ?? null,
      responseStatus ?? null,
      responseBody ?? null,
      error ?? null,
    ]
  );
}

async function applyApiResult(scheduleId, apiResult) {
  let remoteSchedule = null;
  if (apiResult.responseText) {
    try {
      const parsed = JSON.parse(apiResult.responseText);
      const value = parsed?.value ?? parsed;
      remoteSchedule =
        value?.id ? value : value?.data?.[0] ? value.data[0] : null;
    } catch {
      remoteSchedule = null;
    }
  }

  const update = await pool.query(
    `
      UPDATE locker_schedules
      SET updated_at = NOW(),
          last_api_called_at = NOW(),
          last_api_status = $1,
          last_api_response = $2,
          last_api_error = $3,
          remote_schedule_id = $4,
          remote_code = $5,
          remote_enabled = $6,
          remote_is_active = $7,
          remote_synchronized_at = $8,
          remote_created_at = $9,
          remote_updated_at = $10
      WHERE id = $11
      RETURNING *;
    `,
    [
      apiResult.status,
      apiResult.responseText,
      apiResult.error,
      remoteSchedule?.id || null,
      remoteSchedule?.code || null,
      remoteSchedule?.enabled ?? null,
      remoteSchedule?.isActive ?? null,
      remoteSchedule?.synchronizedAt || null,
      remoteSchedule?.createdAt || null,
      remoteSchedule?.updatedAt || null,
      scheduleId,
    ]
  );

  return update.rows[0];
}

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/api/login", async (req, res) => {
  const username = normalizeOptional(req.body?.username);
  const password = normalizeOptional(req.body?.password);

  if (!username || !password) {
    res.status(400).json({ error: "Usuario e senha sao obrigatorios" });
    return;
  }

  const user = await getUserByUsername(username);
  if (user) {
    if (user.status !== "active") {
      res.status(403).json({ error: "Usuario pendente de aprovacao" });
      return;
    }
    const { hash } = hashPassword(password, user.password_salt);
    if (hash !== user.password_hash) {
      res.status(401).json({ error: "Credenciais invalidas" });
      return;
    }
    const session = await createSessionWithRole(user.username, user.role);
    res.json({
      token: session.token,
      expiresAt: session.expiresAt,
      role: session.role,
    });
    await logAudit({
      action: "LOGIN",
      entityType: "USER",
      entityId: user.id,
      remoteId: null,
      requestPayload: null,
      responseStatus: 200,
      responseBody: "Login efetuado",
      error: null,
    });
    return;
  }

  if (username !== AUTH_USER || password !== AUTH_PASSWORD) {
    res.status(401).json({ error: "Credenciais invalidas" });
    return;
  }

  const session = await createSessionWithRole(username, "admin");
  res.json({
    token: session.token,
    expiresAt: session.expiresAt,
    role: session.role,
  });
});

app.post("/api/logout", async (req, res) => {
  const token = req.get("x-auth-token");
  await deleteSession(token);
  await logAudit({
    action: "LOGOUT",
    entityType: "SESSION",
    entityId: null,
    remoteId: null,
    requestPayload: null,
    responseStatus: 200,
    responseBody: "Logout efetuado",
    error: null,
  });
  res.json({ ok: true });
});

app.get("/api/session", async (req, res) => {
  res.json({
    username: req.auth?.username,
    role: req.auth?.role,
    expiresAt: req.auth?.expires_at,
  });
});

app.post("/api/workflows", async (req, res) => {
  const name = normalizeOptional(req.body?.name);
  const definition = req.body?.definition;

  if (!name) {
    res.status(400).json({ error: "Nome do fluxo obrigatorio" });
    return;
  }

  if (!definition || typeof definition !== "object") {
    res.status(400).json({ error: "Definicao do fluxo obrigatoria" });
    return;
  }

  const author = req.auth?.username || null;
  const result = await pool.query(
    `
      INSERT INTO locker_workflows (name, definition, created_by, updated_by)
      VALUES ($1, $2::jsonb, $3, $3)
      ON CONFLICT (name)
      DO UPDATE SET definition = EXCLUDED.definition,
                    updated_by = EXCLUDED.updated_by,
                    updated_at = NOW()
      RETURNING id, name, created_at, updated_at, created_by, updated_by;
    `,
    [name, definition, author]
  );

  await logAudit({
    action: "WORKFLOW_SAVE",
    entityType: "WORKFLOW",
    entityId: result.rows[0]?.id ?? null,
    remoteId: null,
    requestPayload: { name },
    responseStatus: 200,
    responseBody: "Workflow salvo",
    error: null,
  });

  res.json(result.rows[0]);
});

app.get("/api/workflows", async (req, res) => {
  const limit = normalizeNumber(req.query?.limit) || 100;
  const result = await pool.query(
    `
      SELECT id, name, created_by, updated_by, created_at, updated_at
      FROM locker_workflows
      ORDER BY updated_at DESC
      LIMIT $1;
    `,
    [limit]
  );
  res.json(result.rows);
});

app.get("/api/workflows/schedules", async (_req, res) => {
  const result = await pool.query(
    `
      SELECT w.id AS workflow_id,
             w.name AS workflow_name,
             s.id AS schedule_id,
             s.cron,
             s.timezone,
             s.enabled,
             s.is_running,
             s.next_run_at,
             s.last_run_at,
             s.last_status,
             s.last_error,
             COALESCE(s.created_at, w.created_at) AS created_at,
             COALESCE(s.updated_at, w.updated_at) AS updated_at,
             (s.id IS NOT NULL) AS has_schedule
      FROM locker_workflows w
      LEFT JOIN locker_workflow_schedules s ON s.workflow_id = w.id
      ORDER BY w.name ASC;
    `
  );
  res.json(result.rows);
});

app.get("/api/workflows/:id", async (req, res) => {
  const id = normalizeNumber(req.params?.id);
  if (!id) {
    res.status(400).json({ error: "Id invalido" });
    return;
  }
  const result = await pool.query(
    `
      SELECT id, name, definition, created_by, updated_by, created_at, updated_at
      FROM locker_workflows
      WHERE id = $1;
    `,
    [id]
  );
  if (result.rowCount === 0) {
    res.status(404).json({ error: "Fluxo nao encontrado" });
    return;
  }
  res.json(result.rows[0]);
});

app.delete("/api/workflows/:id", async (req, res) => {
  const id = normalizeNumber(req.params?.id);
  if (!id) {
    res.status(400).json({ error: "Id invalido" });
    return;
  }

  const result = await pool.query(
    "DELETE FROM locker_workflows WHERE id = $1 RETURNING *",
    [id]
  );
  if (result.rowCount === 0) {
    res.status(404).json({ error: "Fluxo nao encontrado" });
    return;
  }

  await logAudit({
    action: "WORKFLOW_DELETE",
    entityType: "WORKFLOW",
    entityId: id,
    remoteId: null,
    requestPayload: null,
    responseStatus: 200,
    responseBody: "Workflow removido",
    error: null,
  });

  res.json({ ok: true });
});

app.get("/api/workflows/:id/schedule", async (req, res) => {
  const id = normalizeNumber(req.params?.id);
  if (!id) {
    res.status(400).json({ error: "Id invalido" });
    return;
  }

  const workflow = await pool.query(
    "SELECT id FROM locker_workflows WHERE id = $1",
    [id]
  );
  if (workflow.rowCount === 0) {
    res.status(404).json({ error: "Fluxo nao encontrado" });
    return;
  }

  const schedule = await getWorkflowSchedule(id);
  if (!schedule) {
    res.status(404).json({ error: "Agendamento nao encontrado" });
    return;
  }

  res.json(schedule);
});

app.put("/api/workflows/:id/schedule", async (req, res) => {
  const id = normalizeNumber(req.params?.id);
  if (!id) {
    res.status(400).json({ error: "Id invalido" });
    return;
  }

  const workflow = await pool.query(
    "SELECT id FROM locker_workflows WHERE id = $1",
    [id]
  );
  if (workflow.rowCount === 0) {
    res.status(404).json({ error: "Fluxo nao encontrado" });
    return;
  }

  const author = req.auth?.username || null;
  const result = await upsertWorkflowSchedule(id, req.body || {}, author);
  if (!result.ok) {
    res.status(400).json({ error: result.error || "Falha ao salvar cron." });
    return;
  }

  await logAudit({
    action: "WORKFLOW_SCHEDULE_SAVE",
    entityType: "WORKFLOW",
    entityId: id,
    remoteId: null,
    requestPayload: {
      cron: result.schedule?.cron || null,
      timezone: result.schedule?.timezone || null,
      enabled: result.schedule?.enabled ?? null,
    },
    responseStatus: 200,
    responseBody: "Agendamento salvo",
    error: null,
  });

  res.json(result.schedule);
});

app.delete("/api/workflows/:id/schedule", async (req, res) => {
  const id = normalizeNumber(req.params?.id);
  if (!id) {
    res.status(400).json({ error: "Id invalido" });
    return;
  }

  const result = await pool.query(
    "DELETE FROM locker_workflow_schedules WHERE workflow_id = $1 RETURNING *",
    [id]
  );
  if (result.rowCount === 0) {
    res.status(404).json({ error: "Agendamento nao encontrado" });
    return;
  }

  await logAudit({
    action: "WORKFLOW_SCHEDULE_DELETE",
    entityType: "WORKFLOW",
    entityId: id,
    remoteId: null,
    requestPayload: null,
    responseStatus: 200,
    responseBody: "Agendamento removido",
    error: null,
  });

  res.json({ ok: true });
});

app.post("/api/register", async (req, res) => {
  const username = normalizeOptional(req.body?.username);
  const password = normalizeOptional(req.body?.password);
  const email = normalizeOptional(req.body?.email);
  const phone = normalizeOptional(req.body?.phone);

  if (!username || !password || !email || !phone) {
    res.status(400).json({ error: "Usuario, senha, email e telefone sao obrigatorios" });
    return;
  }

  if (password.length < 6) {
    res.status(400).json({ error: "Senha deve ter pelo menos 6 caracteres" });
    return;
  }

  if (!email.includes("@")) {
    res.status(400).json({ error: "Email invalido" });
    return;
  }

  if (phone.replace(/\D/g, "").length < 8) {
    res.status(400).json({ error: "Telefone invalido" });
    return;
  }

  const existing = await getUserByUsername(username);
  if (existing) {
    res.status(409).json({ error: "Usuario ja existe" });
    return;
  }

  const { salt, hash } = hashPassword(password);
  const result = await pool.query(
    `
      INSERT INTO users (username, password_hash, password_salt, email, phone, role, status)
      VALUES ($1, $2, $3, $4, $5, 'user', 'pending')
      RETURNING id, username, status;
    `,
    [username, hash, salt, email, phone]
  );

  await logAudit({
    action: "REGISTER",
    entityType: "USER",
    entityId: result.rows[0].id,
    remoteId: null,
    requestPayload: { username, email, phone },
    responseStatus: 201,
    responseBody: "Cadastro pendente",
    error: null,
  });

  res.status(201).json({ status: "pending" });
});

function requireAdmin(req, res) {
  if (req.auth?.role !== "admin") {
    res.status(403).json({ error: "Acesso negado" });
    return false;
  }
  return true;
}

app.get("/api/users", async (req, res) => {
  if (!requireAdmin(req, res)) return;
  const result = await pool.query(
    `
      SELECT id, username, email, phone, role, status, created_at, approved_at, approved_by
      FROM users
      ORDER BY created_at DESC;
    `
  );
  res.json(result.rows);
});

app.post("/api/users/:id/approve", async (req, res) => {
  if (!requireAdmin(req, res)) return;
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    res.status(400).json({ error: "ID invalido" });
    return;
  }
  const result = await pool.query(
    `
      UPDATE users
      SET status = 'active',
          approved_at = NOW(),
          approved_by = $1,
          updated_at = NOW()
      WHERE id = $2
      RETURNING id, username, status;
    `,
    [req.auth.username, id]
  );
  if (result.rowCount === 0) {
    res.status(404).json({ error: "Usuario nao encontrado" });
    return;
  }
  await logAudit({
    action: "APPROVE_USER",
    entityType: "USER",
    entityId: id,
    remoteId: null,
    requestPayload: null,
    responseStatus: 200,
    responseBody: "Usuario aprovado",
    error: null,
  });
  res.json({ ok: true });
});

app.post("/api/users/:id/reject", async (req, res) => {
  if (!requireAdmin(req, res)) return;
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    res.status(400).json({ error: "ID invalido" });
    return;
  }
  const result = await pool.query(
    `
      UPDATE users
      SET status = 'rejected',
          approved_at = NOW(),
          approved_by = $1,
          updated_at = NOW()
      WHERE id = $2
      RETURNING id, username, status;
    `,
    [req.auth.username, id]
  );
  if (result.rowCount === 0) {
    res.status(404).json({ error: "Usuario nao encontrado" });
    return;
  }
  await logAudit({
    action: "REJECT_USER",
    entityType: "USER",
    entityId: id,
    remoteId: null,
    requestPayload: null,
    responseStatus: 200,
    responseBody: "Usuario rejeitado",
    error: null,
  });
  res.json({ ok: true });
});

app.get("/api/token", async (_req, res) => {
  const tokens = await getTokens();
  res.json(tokens || { bearer_token: "" });
});

app.post("/api/token", async (req, res) => {
  const bearerToken = normalizeOptional(req.body.bearer_token);

  await saveTokens(bearerToken);
  await logAudit({
    action: "SAVE_TOKEN",
    entityType: "TOKEN",
    entityId: null,
    remoteId: null,
    requestPayload: null,
    responseStatus: 200,
    responseBody: "Token atualizado",
    error: null,
  });
  res.json({ ok: true });
});

app.get("/api/audit", async (req, res) => {
  const limit = Math.min(
    Math.max(Number(req.query.limit) || 100, 1),
    200
  );
  const offset = Math.max(Number(req.query.offset) || 0, 0);
  const result = await pool.query(
    `
      SELECT *
      FROM audit_logs
      ORDER BY created_at DESC
      LIMIT $1
      OFFSET $2;
    `,
    [limit, offset]
  );
  res.json(result.rows);
});

app.get("/api/external/schedules", async (_req, res) => {
  const result = await fetchIntegrationList("/api/LockerSchedules");
  if (!result.ok) {
    res.status(502).json({ error: "Falha ao consultar API", api: result });
    return;
  }
  res.json({ data: result.data });
});

app.get("/api/external/user-unlocks", async (_req, res) => {
  const result = await fetchIntegrationList("/api/LockerUserUnlocks");
  if (!result.ok) {
    res.status(502).json({ error: "Falha ao consultar API", api: result });
    return;
  }
  res.json({ data: result.data });
});

app.get("/api/external/hostname-unlocks", async (_req, res) => {
  const result = await fetchIntegrationList("/api/LockerHostnameUnlocks");
  if (!result.ok) {
    res.status(502).json({ error: "Falha ao consultar API", api: result });
    return;
  }
  res.json({ data: result.data });
});

app.post("/api/sync", async (_req, res) => {
  const schedules = await syncSchedulesFromApi();
  const userUnlocks = await syncUserUnlocksFromApi();
  const hostnameUnlocks = await syncHostnameUnlocksFromApi();

  if (!schedules.ok || !userUnlocks.ok || !hostnameUnlocks.ok) {
    res.status(502).json({
      error: "Falha ao sincronizar com a API",
      schedules,
      userUnlocks,
      hostnameUnlocks,
    });
    return;
  }

  await logAudit({
    action: "SYNC_SCHEDULES",
    entityType: "SCHEDULE",
    entityId: null,
    remoteId: null,
    requestPayload: null,
    responseStatus: 200,
    responseBody: JSON.stringify(schedules),
    error: null,
  });
  await logAudit({
    action: "SYNC_USER_UNLOCKS",
    entityType: "USER_UNLOCK",
    entityId: null,
    remoteId: null,
    requestPayload: null,
    responseStatus: 200,
    responseBody: JSON.stringify(userUnlocks),
    error: null,
  });
  await logAudit({
    action: "SYNC_HOSTNAME_UNLOCKS",
    entityType: "HOSTNAME_UNLOCK",
    entityId: null,
    remoteId: null,
    requestPayload: null,
    responseStatus: 200,
    responseBody: JSON.stringify(hostnameUnlocks),
    error: null,
  });

  res.json({
    schedules,
    userUnlocks,
    hostnameUnlocks,
  });
});

app.get("/api/schedules", async (_req, res) => {
  const result = await pool.query(
    "SELECT * FROM locker_schedules ORDER BY created_at DESC"
  );
  res.json(result.rows);
});

app.get("/api/schedules/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    res.status(400).json({ error: "ID invalido" });
    return;
  }
  const result = await pool.query(
    "SELECT * FROM locker_schedules WHERE id = $1",
    [id]
  );
  if (result.rowCount === 0) {
    res.status(404).json({ error: "Regra nao encontrada" });
    return;
  }
  res.json(result.rows[0]);
});

app.post("/api/schedules", async (req, res) => {
  const message = normalizeOptional(req.body.message);
  const actionType = normalizeNumber(req.body.actionType);
  const scheduleType = normalizeNumber(req.body.scheduleType);
  const startDate = normalizeOptional(req.body.startDate);
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

  const endDate = normalizeOptional(req.body.endDate);
  const recurrenceType = normalizeNumber(req.body.recurrenceType);
  const daysOfWeek = normalizeArray(req.body.daysOfWeek);
  const startTime = normalizeOptional(req.body.startTime);
  const endTime = normalizeOptional(req.body.endTime);

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
        target_value
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
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

app.put("/api/schedules/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    res.status(400).json({ error: "ID invalido" });
    return;
  }

  const message = normalizeOptional(req.body.message);
  const actionType = normalizeNumber(req.body.actionType);
  const scheduleType = normalizeNumber(req.body.scheduleType);
  const startDate = normalizeOptional(req.body.startDate);
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

  const endDate = normalizeOptional(req.body.endDate);
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
          updated_at = NOW()
      WHERE id = $12
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
      id,
    ]
  );

  if (updateLocal.rowCount === 0) {
    res.status(404).json({ error: "Regra nao encontrada" });
    return;
  }

  const schedule = updateLocal.rows[0];
  const apiResult = await callCoreRegistry(schedule);
  await logAudit({
    action: "UPDATE_SCHEDULE",
    entityType: "SCHEDULE",
    entityId: schedule.id,
    remoteId: schedule.remote_schedule_id,
    requestPayload: apiResult.payload,
    responseStatus: apiResult.status,
    responseBody: apiResult.responseText,
    error: apiResult.error,
  });
  const updatedSchedule = await applyApiResult(schedule.id, apiResult);

  res.json({
    schedule: updatedSchedule,
    api: {
      ok: apiResult.ok,
      status: apiResult.status,
      error: apiResult.error,
      responseText: apiResult.responseText,
    },
  });
});

app.delete("/api/schedules/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    res.status(400).json({ error: "ID invalido" });
    return;
  }
  const existing = await pool.query(
    "SELECT id, remote_schedule_id FROM locker_schedules WHERE id = $1",
    [id]
  );
  if (existing.rowCount === 0) {
    res.status(404).json({ error: "Regra nao encontrada" });
    return;
  }

  const remoteId = existing.rows[0].remote_schedule_id;
  let apiResult = null;

  if (remoteId) {
    apiResult = await callIntegrationDelete(remoteId);
    await logAudit({
      action: "DELETE_SCHEDULE",
      entityType: "SCHEDULE",
      entityId: id,
      remoteId,
      requestPayload: null,
      responseStatus: apiResult.status,
      responseBody: apiResult.responseText,
      error: apiResult.error,
    });
    if (!apiResult.ok) {
      res.status(502).json({
        error: "Falha ao excluir na API",
        api: apiResult,
      });
      return;
    }
  } else {
    await logAudit({
      action: "DELETE_SCHEDULE",
      entityType: "SCHEDULE",
      entityId: id,
      remoteId: null,
      requestPayload: null,
      responseStatus: null,
      responseBody: "Sem remote_schedule_id",
      error: null,
    });
  }

  const result = await pool.query(
    "DELETE FROM locker_schedules WHERE id = $1 RETURNING *",
    [id]
  );

  res.json({
    ok: true,
    api: apiResult,
  });
});

async function start() {
  await waitForDb();
  await migrate();
  await ensureAdminUser();
  startWorkflowScheduler();

  app.listen(Number(PORT), () => {
    console.log(`Backend rodando na porta ${PORT}`);
  });
}

start().catch((err) => {
  console.error("Falha ao iniciar o backend", err);
  process.exit(1);
});
