import cors from "cors";
import crypto from "crypto";
import express from "express";
import pg from "pg";

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

  const headers = {
    Authorization: `Bearer ${tokens.bearer_token}`,
  };

  const baseUrl = INTEGRATION_API_BASE_URL || CORE_REGISTRY_BASE_URL;
  const pageSize = 100;
  let pageNumber = 1;
  let hasNext = true;
  let totalPages = null;
  const data = [];

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

  app.listen(Number(PORT), () => {
    console.log(`Backend rodando na porta ${PORT}`);
  });
}

start().catch((err) => {
  console.error("Falha ao iniciar o backend", err);
  process.exit(1);
});
