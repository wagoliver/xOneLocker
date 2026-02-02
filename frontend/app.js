const views = {
  login: document.getElementById("view-login"),
  register: document.getElementById("view-register"),
  control: document.getElementById("view-control"),
  workflow: document.getElementById("view-workflow"),
  ruleForm: document.getElementById("view-rule-form"),
  audit: document.getElementById("view-audit"),
  records: document.getElementById("view-records"),
  token: document.getElementById("view-token"),
};

const navButtons = document.querySelectorAll(".nav-btn");
const adminButtons = document.querySelectorAll(".admin-only");
const newRuleButton = document.getElementById("new-rule-btn");
const syncRulesButton = document.getElementById("sync-rules-btn");
const backToListButton = document.getElementById("back-to-list");
const cancelRuleButton = document.getElementById("cancel-rule");
const logoutButton = document.getElementById("logout-btn");

const rulesList = document.getElementById("rules-list");
const rulesFeedback = document.getElementById("rules-feedback");
const ruleFeedback = document.getElementById("rule-feedback");
const tokenFeedback = document.getElementById("token-feedback");
const tokenToggleButton = document.querySelector(".token-toggle");
const tokenCopyButton = document.querySelector(".token-copy");
const auditList = document.getElementById("audit-list");
const auditFeedback = document.getElementById("audit-feedback");
const refreshAuditButton = document.getElementById("refresh-audit");
const recordsList = document.getElementById("records-list");
const recordsFeedback = document.getElementById("records-feedback");
const refreshRecordsButton = document.getElementById("refresh-records");
const recordTabs = document.querySelectorAll(".segment-btn");
const usersList = document.getElementById("users-list");
const usersFeedback = document.getElementById("users-feedback");
const refreshUsersButton = document.getElementById("refresh-users");
const controlSyncButton = document.getElementById("control-sync-btn");
const controlNewButton = document.getElementById("control-new-btn");
const controlSearchInput = document.getElementById("control-search");
const controlTargetFilter = document.getElementById("control-target-filter");
const controlStateFilter = document.getElementById("control-state-filter");
const controlActionFilter = document.getElementById("control-action-filter");
const controlOrderSelect = document.getElementById("control-order");
const controlVisual = document.getElementById("control-visual");
const controlTable = document.getElementById("control-table");
const controlFeedback = document.getElementById("control-feedback");
const controlTabs = document.querySelectorAll(".control-tab");
const controlMenu = document.getElementById("control-menu");

const ruleForm = document.getElementById("rule-form");
const tokenForm = document.getElementById("token-form");
const formTitle = document.getElementById("form-title");
const formSubmitButton = document.getElementById("form-submit");
const jsonModal = document.getElementById("json-modal");
const jsonContent = document.getElementById("json-content");
const closeModalButton = document.getElementById("close-modal");
const modalTitle = document.getElementById("modal-title");
const confirmModal = document.getElementById("confirm-modal");
const confirmTitle = document.getElementById("confirm-title");
const confirmMessage = document.getElementById("confirm-message");
const confirmOkButton = document.getElementById("confirm-ok");
const confirmCancelButton = document.getElementById("confirm-cancel");
const confirmCloseButton = document.getElementById("confirm-close");
const scheduleModal = document.getElementById("schedule-modal");
const scheduleTitle = document.getElementById("schedule-title");
const scheduleCloseButton = document.getElementById("schedule-close");
const scheduleCancelButton = document.getElementById("schedule-cancel");
const scheduleSaveButton = document.getElementById("schedule-save");
const scheduleFeedback = document.getElementById("schedule-feedback");
const scheduleModalTypeSelect = document.getElementById("schedule-type-select");
const scheduleStartInput = document.getElementById("schedule-start");
const scheduleEndInput = document.getElementById("schedule-end");
const scheduleRecurrenceSelect = document.getElementById("schedule-recurrence");
const scheduleStartTimeInput = document.getElementById("schedule-start-time");
const scheduleEndTimeInput = document.getElementById("schedule-end-time");
const scheduleDaysGroup = document.getElementById("schedule-days-group");
const scheduleDaysInputs = document.querySelectorAll(
  'input[name="scheduleDaysOfWeek"]'
);
const recurrenceSelect = document.querySelector('select[name="recurrenceType"]');
const scheduleTypeSelect = document.getElementById("schedule-type");
const dayInputs = document.querySelectorAll('input[name="daysOfWeek"]');
const daysOfWeekGroup = document.getElementById("days-of-week-group");
const recurrenceField = document.getElementById("recurrence-field");
const startTimeField = document.getElementById("start-time-field");
const endTimeField = document.getElementById("end-time-field");
const loginForm = document.getElementById("login-form");
const loginFeedback = document.getElementById("login-feedback");
const remoteIdInput = document.getElementById("remote-id");
const registerForm = document.getElementById("register-form");
const registerFeedback = document.getElementById("register-feedback");
const goRegisterButton = document.getElementById("go-register");
const goLoginButton = document.getElementById("go-login");
const workflowPalette = document.getElementById("workflow-bricks");
const workflowSchedulesList = document.getElementById("workflow-schedules");
const workflowPaletteTabs = document.querySelectorAll(".palette-tab");
const workflowBricksCount = document.getElementById("workflow-bricks-count");
const workflowSchedulesCount = document.getElementById(
  "workflow-schedules-count"
);
const workflowCanvas = document.getElementById("workflow-canvas");
const workflowNodesLayer = document.getElementById("workflow-nodes");
const workflowEdgesLayer = document.getElementById("workflow-edges");
const workflowInspectorBody = document.getElementById("workflow-inspector-body");
const workflowPalettePanel = document.querySelector(".workflow-palette");
const workflowPaletteToggle = document.getElementById("workflow-palette-toggle");
const workflowInspectorPanel = document.querySelector(".workflow-inspector");
const workflowMenu = document.getElementById("workflow-menu");
const workflowEdgeMenu = document.getElementById("workflow-edge-menu");
const workflowScheduleMenu = document.getElementById("workflow-schedule-menu");
const workflowVariablesMenu = document.getElementById("workflow-variables-menu");
const workflowModal = document.getElementById("workflow-modal");
const workflowModalBody = document.getElementById("workflow-modal-body");
const workflowModalClose = document.getElementById("workflow-modal-close");
const workflowModalTitle = document.getElementById("workflow-modal-title");
const workflowResponseModal = document.getElementById("workflow-response-modal");
const workflowResponseBody = document.getElementById("workflow-response-body");
const workflowResponseClose = document.getElementById("workflow-response-close");
const workflowResponseTitle = document.getElementById("workflow-response-title");
const workflowTableModal = document.getElementById("workflow-table-modal");
const workflowTableBody = document.getElementById("workflow-table-body");
const workflowTableClose = document.getElementById("workflow-table-close");
const workflowTableTitle = document.getElementById("workflow-table-title");
const workflowLoadButton = document.getElementById("workflow-load");
const workflowLoadModal = document.getElementById("workflow-load-modal");
const workflowLoadBody = document.getElementById("workflow-load-body");
const workflowLoadClose = document.getElementById("workflow-load-close");
const workflowLoadCancel = document.getElementById("workflow-load-cancel");
const workflowLoadRefresh = document.getElementById("workflow-load-refresh");
const workflowLoadFeedback = document.getElementById("workflow-load-feedback");
const workflowSaveModal = document.getElementById("workflow-save-modal");
const workflowSaveName = document.getElementById("workflow-save-name");
const workflowSaveClose = document.getElementById("workflow-save-close");
const workflowSaveCancel = document.getElementById("workflow-save-cancel");
const workflowSaveConfirm = document.getElementById("workflow-save-confirm");
const workflowSaveFeedback = document.getElementById("workflow-save-feedback");
const workflowSaveScheduleToggle = document.getElementById(
  "workflow-save-schedule-toggle"
);
const workflowSaveCron = document.getElementById("workflow-save-cron");
const workflowSaveTimezone = document.getElementById("workflow-save-timezone");
const workflowSaveSchedule = document.querySelector(".workflow-save-schedule");
const workflowStatus = document.getElementById("workflow-status");
const workflowTitle = document.getElementById("workflow-title");
const workflowClearButton = document.getElementById("workflow-clear");
const workflowSaveButton = document.getElementById("workflow-save");
const workflowRunButton = document.getElementById("workflow-run");
const workflowZoomOut = document.getElementById("workflow-zoom-out");
const workflowZoomReset = document.getElementById("workflow-zoom-reset");
const workflowZoomIn = document.getElementById("workflow-zoom-in");
const workflowEmpty = document.getElementById("workflow-empty");

let editingId = null;
const scheduleCache = new Map();
const auditCache = new Map();
const recordCache = {
  schedules: [],
  "user-unlocks": [],
  "hostname-unlocks": [],
};
let currentRecordView = "schedules";
let currentUserRole = null;
let currentControlTab = "visual";
let controlItems = [];
const controlGroupCache = new Map();
const controlFilters = {
  search: "",
  target: "all",
  state: "all",
  action: "all",
  order: "next",
};
let confirmResolver = null;
let scheduleContext = null;
const WORKFLOW_STORAGE_KEY = "locker-workflow-draft";
const WORKFLOW_NAME_KEY = "locker-workflow-name";
const WORKFLOW_ID_KEY = "locker-workflow-id";
const WORKFLOW_SCHEDULE_KEY = "locker-workflow-schedule";
const XONE_CONFIG_KEY = "locker-xone-config";
const workflowState = {
  nodes: [],
  edges: [],
  selectedNodeId: null,
  connectingFrom: null,
  connectingPosition: null,
  loaded: false,
  workflowId: null,
};
const workflowViewport = {
  scale: 1,
  x: 0,
  y: 0,
  minScale: 0.4,
  maxScale: 2,
};
let workflowIsPanning = false;
let workflowPanStart = null;
let workflowSpaceDown = false;
let workflowPanCandidate = null;
let workflowIgnoreClick = false;
let workflowEdgesRaf = null;
let workflowConnectingHoverPort = null;
let workflowMenuNodeId = null;
let workflowMenuEdge = null;
let workflowScheduleMenuWorkflowId = null;
let xoneConfigCache = null;
let inspectorRenderRaf = null;
let xoneConfigLoading = null;
const xoneCheckpointCache = new Map();
const xoneCheckpointLoading = new Map();
let workflowModalNodeId = null;
let workflowResponseNodeId = null;
let workflowVariablesContext = null;
const workflowInspectorDrafts = new Map();
let workflowTableNodeId = null;
let workflowItemsData = null;
let workflowPaletteTab = "bricks";
let workflowSchedulesCache = [];
const WORKFLOW_RESULT_LIMIT = 60000;
const WORKFLOW_DEFAULT_OUTPUT_PATH = "data.item";
const WEBHOOK_DEFAULT_TIMEOUT_SECONDS = 60;

function showView(viewName) {
  Object.values(views).forEach((view) => {
    if (view) view.classList.remove("is-active");
  });
  const current = views[viewName];
  if (current) current.classList.add("is-active");

  navButtons.forEach((btn) => {
    btn.classList.toggle("is-active", btn.dataset.view === viewName);
  });

  document.body.classList.toggle(
    "login-active",
    viewName === "login" || viewName === "register"
  );
  document.body.classList.toggle("workflow-active", viewName === "workflow");

  closeControlMenu();
  closeWorkflowMenu();
  closeWorkflowEdgeMenu();
  closeWorkflowModal();
  closeWorkflowResponseModal();
  closeWorkflowTableModal();
  closeWorkflowLoadModal();
  closeWorkflowSaveModal();
  closeConfirmModal(false);
}

function setRole(role) {
  currentUserRole = role;
  const isAdmin = role === "admin";
  adminButtons.forEach((btn) => {
    btn.style.display = isAdmin ? "inline-flex" : "none";
  });
}

const AUTH_TOKEN_KEY = "locker-auth-token";
const memoryStorage = new Map();

function safeStorageGet(key) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return memoryStorage.has(key) ? memoryStorage.get(key) : null;
  }
}

function safeStorageSet(key, value) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    memoryStorage.set(key, value);
  }
}

function safeStorageRemove(key) {
  try {
    window.localStorage.removeItem(key);
  } catch {
    memoryStorage.delete(key);
  }
}

function scheduleIdleTask(task) {
  if (typeof requestIdleCallback === "function") {
    return requestIdleCallback(() => task(), { timeout: 1200 });
  }
  return setTimeout(task, 0);
}

function getAuthToken() {
  return safeStorageGet(AUTH_TOKEN_KEY);
}

function setAuthToken(token) {
  if (token) {
    safeStorageSet(AUTH_TOKEN_KEY, token);
  } else {
    safeStorageRemove(AUTH_TOKEN_KEY);
  }
}

function handleUnauthorized() {
  setAuthToken("");
  setRole(null);
  showView("login");
}

const API_BASE =
  window.location.protocol.startsWith("http") ? "" : "http://localhost:3000";

function resolveApiUrl(url) {
  if (!url) return url;
  if (url.startsWith("http")) return url;
  if (!API_BASE) return url;
  return `${API_BASE}${url}`;
}

function getFallbackApiUrl(url, resolvedUrl) {
  if (!url || url.startsWith("http")) return null;
  const local = `http://localhost:3000${url}`;
  if (resolvedUrl === local) return null;
  return local;
}

async function apiFetch(url, options = {}) {
  const { retryOnNotFound, ...fetchOptions } = options;
  const headers = new Headers(options.headers || {});
  const token = getAuthToken();
  if (token) {
    headers.set("x-auth-token", token);
  }

  const resolved = resolveApiUrl(url);
  try {
    const response = await fetch(resolved, { ...fetchOptions, headers });
    if (response.status === 401) {
      handleUnauthorized();
    }
    if (retryOnNotFound && response.status === 404) {
      const fallback = getFallbackApiUrl(url, resolved);
      if (fallback) {
        const retry = await fetch(fallback, { ...fetchOptions, headers });
        if (retry.status === 401) {
          handleUnauthorized();
        }
        return retry;
      }
    }
    return response;
  } catch (err) {
    const fallback = getFallbackApiUrl(url, resolved);
    if (!fallback) throw err;
    const response = await fetch(fallback, { ...fetchOptions, headers });
    if (response.status === 401) {
      handleUnauthorized();
    }
    return response;
  }
}

function getDefaultTimezone() {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
  } catch {
    return "UTC";
  }
}

function loadWorkflowScheduleDraft() {
  const raw = safeStorageGet(WORKFLOW_SCHEDULE_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch {
    return null;
  }
}

function saveWorkflowScheduleDraft(data) {
  if (!data) {
    safeStorageRemove(WORKFLOW_SCHEDULE_KEY);
    return;
  }
  safeStorageSet(WORKFLOW_SCHEDULE_KEY, JSON.stringify(data));
}

function getXoneConfigCache() {
  if (xoneConfigCache) return xoneConfigCache;
  const raw = safeStorageGet(XONE_CONFIG_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object") {
      xoneConfigCache = parsed;
      return parsed;
    }
  } catch {
    return null;
  }
  return null;
}

function setXoneConfigCache(data) {
  xoneConfigCache = data || null;
  if (!data) {
    safeStorageRemove(XONE_CONFIG_KEY);
    return;
  }
  safeStorageSet(XONE_CONFIG_KEY, JSON.stringify(data));
}

async function fetchXoneConfig() {
  if (xoneConfigLoading) return xoneConfigLoading;
  xoneConfigLoading = (async () => {
    try {
      const response = await apiFetch("/api/xone-config");
      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Falha ao carregar configuracao xOne.");
      }
      const data = await response.json();
      setXoneConfigCache(data);
      return data;
    } finally {
      xoneConfigLoading = null;
    }
  })();
  return xoneConfigLoading;
}

async function saveXoneConfig(patch) {
  const response = await apiFetch("/api/xone-config", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patch),
  });
  const text = await response.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = null;
  }
  if (!response.ok) {
    throw new Error(data?.error || text || "Falha ao salvar configuracao xOne.");
  }
  setXoneConfigCache(data);
  return data;
}

function getTodayIsoDate() {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return now.toISOString();
}

async function fetchXoneCheckpoint(endpoint) {
  const key = String(endpoint || "").trim();
  if (!key) return null;
  if (xoneCheckpointCache.has(key)) return xoneCheckpointCache.get(key);
  if (xoneCheckpointLoading.has(key)) {
    return xoneCheckpointLoading.get(key);
  }
  const task = (async () => {
    try {
      const response = await apiFetch(
        `/api/xone-checkpoint?endpoint=${encodeURIComponent(key)}`
      );
      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Falha ao carregar checkpoint.");
      }
      const data = await response.json();
      xoneCheckpointCache.set(key, data);
      return data;
    } finally {
      xoneCheckpointLoading.delete(key);
    }
  })();
  xoneCheckpointLoading.set(key, task);
  return task;
}

function updateWorkflowScheduleVisibility() {
  if (!workflowSaveSchedule || !workflowSaveScheduleToggle) return;
  workflowSaveSchedule.classList.toggle(
    "is-active",
    workflowSaveScheduleToggle.checked
  );
  if (workflowSaveCron) {
    workflowSaveCron.toggleAttribute("required", workflowSaveScheduleToggle.checked);
  }
}

function setWorkflowScheduleFields(data = {}) {
  if (!workflowSaveScheduleToggle || !workflowSaveCron || !workflowSaveTimezone) return;
  const enabled = Boolean(data.enabled);
  workflowSaveScheduleToggle.checked = enabled;
  workflowSaveCron.value = data.cron || "";
  const tz = data.timezone || getDefaultTimezone();
  workflowSaveTimezone.value = tz;
  updateWorkflowScheduleVisibility();
}

async function fetchWorkflowSchedule(workflowId) {
  if (!workflowId) return null;
  try {
    const response = await apiFetch(`/api/workflows/${workflowId}/schedule`);
    if (response.status === 404) return null;
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
}

function getWorkflowSchedulePayload() {
  if (!workflowSaveScheduleToggle || !workflowSaveCron || !workflowSaveTimezone) {
    return null;
  }
  if (!workflowSaveScheduleToggle.checked) {
    return null;
  }
  const cron = workflowSaveCron.value.trim();
  const timezone = workflowSaveTimezone.value.trim() || getDefaultTimezone();
  if (!cron) {
    if (workflowSaveFeedback) {
      workflowSaveFeedback.textContent = "Informe a expressao cron.";
      workflowSaveFeedback.className = "feedback is-warning";
    }
    return { error: "cron" };
  }
  return { cron, timezone, enabled: true };
}

function captureWorkflowScheduleDraft() {
  if (!workflowSaveScheduleToggle || !workflowSaveCron || !workflowSaveTimezone) {
    return;
  }
  const draft = {
    enabled: workflowSaveScheduleToggle.checked,
    cron: workflowSaveCron.value.trim(),
    timezone: workflowSaveTimezone.value.trim(),
  };
  if (!draft.enabled && !draft.cron && !draft.timezone) {
    saveWorkflowScheduleDraft(null);
    return;
  }
  saveWorkflowScheduleDraft(draft);
}

const WORKFLOW_BRICKS = [
  {
    type: "start",
    title: "Inicio",
    subtitle: "Ponto de inicio do fluxo",
    group: "Fluxo",
    summary: () => "Inicio",
    fields: [
      {
        key: "name",
        label: "Nome",
        type: "text",
        placeholder: "Ex: Inicio",
      },
    ],
  },
  {
    type: "filter",
    title: "Filtro",
    subtitle: "Aplica regras na lista dinamica",
    group: "Transformacao",
    summary: (node) => {
      const count = Array.isArray(node.config?.conditions)
        ? node.config.conditions.length
        : 0;
      const logic = node.config?.logic || "AND";
      return count ? `Regras: ${count} (${logic})` : "Sem regras";
    },
    fields: [
      {
        key: "name",
        label: "Nome",
        type: "text",
        placeholder: "Ex: Filtrar ativos",
      },
      {
        key: "logic",
        label: "Logica",
        type: "select",
        options: [
          { value: "AND", label: "AND" },
          { value: "OR", label: "OR" },
        ],
        default: "AND",
      },
      {
        key: "conditions",
        label: "Condicoes",
        type: "conditions",
      },
    ],
  },
  {
    type: "block",
    title: "xOne Locker",
    subtitle: "Gera lista de bloqueio a partir da lista dinamica",
    group: "Acao",
    summary: (node) => {
      const actionLabel = Number(node.config?.actionType ?? 0) === 1
        ? "Desbloquear"
        : "Bloquear";
      const targetLabel = Number(node.config?.targetType ?? 0) === 1
        ? "Hostname"
        : "Usuario";
      const outputItem = node.output?.data?.item;
      const targets = Array.isArray(outputItem)
        ? outputItem
        : outputItem?.targets;
      const count = Array.isArray(targets) ? targets.length : 0;
      return count ? `${actionLabel} ${targetLabel}: ${count}` : `${actionLabel} ${targetLabel}`;
    },
    fields: [
      {
        key: "name",
        label: "Nome",
        type: "text",
        placeholder: "Ex: Bloquear usuarios",
      },
      {
        key: "actionType",
        label: "Acao",
        type: "select",
        options: [
          { value: "0", label: "Bloquear" },
          { value: "1", label: "Desbloquear" },
        ],
        default: "0",
      },
      {
        key: "targetType",
        label: "Alvo",
        type: "select",
        options: [
          { value: "0", label: "Usuario" },
          { value: "1", label: "Hostname" },
        ],
        default: "0",
      },
      {
        key: "sourceMode",
        label: "Origem dos alvos",
        type: "select",
        options: [
          { value: "data", label: "Lista dinamica" },
          { value: "manual", label: "Lista manual" },
        ],
        default: "data",
      },
      {
        key: "sourcePath",
        label: "Caminho na lista dinamica",
        type: "text",
        placeholder: "ex: data.items (opcional)",
        suggestions: "sourcePath",
        dependsOn: { key: "sourceMode", values: ["data"] },
      },
      {
        key: "valuePath",
        label: "Campo do item",
        type: "text",
        placeholder: "ex: username / hostname",
        suggestions: "valuePath",
        dependsOn: { key: "sourceMode", values: ["data"] },
      },
      {
        key: "manualTargets",
        label: "Lista manual (um por linha)",
        type: "textarea",
        placeholder: "usuario1\nusuario2\nusuario3",
        dependsOn: { key: "sourceMode", values: ["manual"] },
      },
      {
        key: "message",
        label: "Mensagem",
        type: "text",
        placeholder: "Ex: Agendamento de bloqueio",
      },
      {
        key: "scheduleType",
        label: "Tipo de agendamento",
        type: "select",
        options: [
          { value: "0", label: "Once" },
          { value: "1", label: "Recorrente" },
        ],
        default: "0",
      },
      {
        key: "startDate",
        label: "Inicio",
        type: "datetime",
      },
      {
        key: "endDate",
        label: "Fim",
        type: "datetime",
      },
      {
        key: "recurrenceType",
        label: "Recorrencia",
        type: "select",
        options: [
          { value: "", label: "Selecione" },
          { value: "0", label: "Daily" },
          { value: "1", label: "Weekly" },
          { value: "2", label: "Monthly" },
        ],
        default: "",
        dependsOn: { key: "scheduleType", values: ["1"] },
      },
      {
        key: "daysOfWeek",
        label: "Dias da semana (0=Dom)",
        type: "text",
        placeholder: "0,1,2",
        dependsOn: { key: "scheduleType", values: ["1"] },
      },
      {
        key: "timeSource",
        label: "Origem das horas",
        type: "select",
        options: [
          { value: "manual", label: "Manual" },
          { value: "dynamic", label: "Dinamica (campo do item)" },
        ],
        default: "manual",
        dependsOn: { key: "scheduleType", values: ["1"] },
      },
      {
        key: "startTime",
        label: "Hora inicial",
        type: "time",
        dependsOn: [
          { key: "scheduleType", values: ["1"] },
          { key: "timeSource", values: ["manual"] },
        ],
      },
      {
        key: "endTime",
        label: "Hora final",
        type: "time",
        dependsOn: [
          { key: "scheduleType", values: ["1"] },
          { key: "timeSource", values: ["manual"] },
        ],
      },
      {
        key: "startTimePath",
        label: "Caminho da hora inicial",
        type: "text",
        placeholder: "ex: createdStartTime",
        suggestions: "timePath",
        dependsOn: [
          { key: "scheduleType", values: ["1"] },
          { key: "timeSource", values: ["dynamic"] },
        ],
      },
      {
        key: "endTimePath",
        label: "Caminho da hora final",
        type: "text",
        placeholder: "ex: createdEndTime",
        suggestions: "timePath",
        dependsOn: [
          { key: "scheduleType", values: ["1"] },
          { key: "timeSource", values: ["dynamic"] },
        ],
      },
      {
        key: "dedupe",
        label: "Remover duplicados",
        type: "select",
        options: [
          { value: "yes", label: "Sim" },
          { value: "no", label: "Nao" },
        ],
        default: "yes",
      },
    ],
  },
  {
    type: "xone-collaborators",
    title: "Get xOne Collaborators",
    subtitle: "Busca colaboradores no xOne",
    group: "Integracao",
    summary: () => "GET register-api.xonecloud.com - Bearer",
    fixedConfig: {
      method: "GET",
      url: "https://register-api.xonecloud.com/collaborators/api/v1",
      authType: "bearer",
      headers: "accept: application/json",
      bodyType: "none",
      queryParams: "",
      responsePath: "",
    },
    fields: [
      {
        key: "authToken",
        label: "Bearer token",
        type: "text",
        placeholder: "Cole o token",
        excludeFromSummary: true,
      },
      {
        key: "timeoutSeconds",
        label: "Timeout (segundos)",
        type: "number",
        placeholder: "60",
        default: String(WEBHOOK_DEFAULT_TIMEOUT_SECONDS),
      },
    ],
  },
  {
    type: "xone-data",
    title: "xOne Data",
    subtitle: "Coleta dados da API xOne",
    group: "Integracao",
    summary: (node) => {
      const endpoint = node.config?.endpoint || "-";
      const checkpoint = node.config?.checkpointEnabled !== "no";
      return checkpoint
        ? `Endpoint: ${endpoint} (incremental)`
        : `Endpoint: ${endpoint}`;
    },
    fields: [
      {
        key: "tokenUrl",
        label: "Token URL",
        type: "text",
        placeholder: "https://keycloak.xonecloud.com/realms/xone-cloud/protocol/openid-connect/token",
        storage: "xone-config",
      },
      {
        key: "apiBase",
        label: "API base",
        type: "text",
        placeholder: "https://api.xonecloud.com/",
        storage: "xone-config",
      },
      {
        key: "clientId",
        label: "Client ID",
        type: "text",
        placeholder: "Client ID",
        storage: "xone-config",
      },
      {
        key: "clientSecret",
        label: "Client Secret",
        type: "text",
        inputType: "password",
        placeholder: "Client Secret",
        storage: "xone-config",
      },
      {
        key: "scope",
        label: "Scope",
        type: "text",
        placeholder: "Opcional",
        storage: "xone-config",
      },
      {
        key: "name",
        label: "Nome",
        type: "text",
        placeholder: "Ex: xOne Usuarios",
      },
      {
        key: "endpoint",
        label: "Endpoint",
        type: "text",
        placeholder: "analytics/usuarios",
      },
      {
        key: "checkpointEnabled",
        label: "Buscar apenas novos registros",
        type: "select",
        options: [
          { value: "yes", label: "Sim" },
          { value: "no", label: "Nao" },
        ],
        default: "yes",
      },
      {
        key: "checkpointField",
        label: "Campo de checkpoint",
        type: "text",
        placeholder: "created_date_local",
        default: "created_date_local",
        dependsOn: { key: "checkpointEnabled", values: ["yes"] },
      },
      {
        key: "checkpointOperator",
        label: "Operador do checkpoint",
        type: "select",
        options: [
          { value: "gt", label: "gt" },
          { value: "gte", label: "gte" },
        ],
        default: "gt",
        dependsOn: { key: "checkpointEnabled", values: ["yes"] },
      },
      {
        key: "checkpointValue",
        label: "Checkpoint inicial",
        type: "text",
        placeholder: "Ex: 2026-02-01T00:00:00Z",
        default: "",
        dependsOn: { key: "checkpointEnabled", values: ["yes"] },
      },
      {
        key: "filters",
        label: "Filtros (PostgREST)",
        type: "textarea",
        placeholder: "status=eq.active\ncreated_date_local=gte.2026-02-01T00:00:00Z",
        hint: "Dica: use {{campo}} (ex: username=eq.{{username}}).",
        excludeFromSummary: true,
        supportsVariables: true,
      },
      {
        key: "filtersHelp",
        label: "Docs",
        type: "link",
        href: "https://docs.postgrest.org/en/v14/references/api/tables_views.html#get-and-head",
      },
      {
        key: "limit",
        label: "Limite (opcional)",
        type: "number",
        placeholder: "100",
      },
      {
        key: "timeoutSeconds",
        label: "Timeout (segundos)",
        type: "number",
        placeholder: "60",
        default: String(WEBHOOK_DEFAULT_TIMEOUT_SECONDS),
      },
    ],
  },
  {
    type: "webhook",
    title: "Webhook HTTP",
    subtitle: "GET/POST/DELETE para integracoes",
    group: "Integracao",
    summary: (node) => {
      const method = node.config?.method || "GET";
      const url = node.config?.url || "";
      const authType = node.config?.authType || "none";
      const authLabel =
        authType === "bearer"
          ? "Bearer"
          : authType === "apiKey"
            ? "API Key"
            : "Sem auth";
      if (!url) return `${method} - ${authLabel}`;
      return `${method} ${url} - ${authLabel}`;
    },
    fields: [
      {
        key: "name",
        label: "Nome",
        type: "text",
        placeholder: "Ex: Buscar colaboradores",
      },
      {
        key: "method",
        label: "Metodo",
        type: "select",
        options: [
          { value: "GET", label: "GET" },
          { value: "POST", label: "POST" },
          { value: "PUT", label: "PUT" },
          { value: "PATCH", label: "PATCH" },
          { value: "DELETE", label: "DELETE" },
        ],
        default: "GET",
      },
      {
        key: "url",
        label: "URL",
        type: "text",
        placeholder: "https://api.exemplo.com/endpoint",
      },
      {
        key: "authType",
        label: "Autenticacao",
        type: "select",
        options: [
          { value: "none", label: "Nenhuma" },
          { value: "bearer", label: "Bearer Token" },
          { value: "apiKey", label: "API Key" },
        ],
        default: "none",
      },
      {
        key: "authToken",
        label: "Bearer token",
        type: "text",
        placeholder: "Cole o token",
        excludeFromSummary: true,
        dependsOn: { key: "authType", values: ["bearer"] },
      },
      {
        key: "apiKeyHeader",
        label: "Header da API Key",
        type: "text",
        placeholder: "x-api-key",
        excludeFromSummary: true,
        dependsOn: { key: "authType", values: ["apiKey"] },
      },
      {
        key: "apiKeyValue",
        label: "Valor da API Key",
        type: "text",
        placeholder: "Chave secreta",
        excludeFromSummary: true,
        dependsOn: { key: "authType", values: ["apiKey"] },
      },
      {
        key: "queryParams",
        label: "Query params",
        type: "textarea",
        placeholder: "chave=valor\nstatus=ativo",
        excludeFromSummary: true,
      },
      {
        key: "headers",
        label: "Headers",
        type: "textarea",
        placeholder: "x-tenant: demo\nx-trace-id: 123",
        excludeFromSummary: true,
      },
      {
        key: "bodyType",
        label: "Tipo de body",
        type: "select",
        options: [
          { value: "none", label: "Sem body" },
          { value: "json", label: "JSON" },
          { value: "text", label: "Texto" },
          { value: "form", label: "Form URL Encoded" },
        ],
        default: "none",
      },
      {
        key: "body",
        label: "Payload",
        type: "textarea",
        placeholder: "{\n  \"id\": 123\n}",
        excludeFromSummary: true,
        dependsOn: { key: "bodyType", values: ["json", "text", "form"] },
      },
      {
        key: "responsePath",
        label: "Caminho da resposta",
        type: "text",
        placeholder: "ex: data.items (opcional)",
      },
      {
        key: "timeoutSeconds",
        label: "Timeout (segundos)",
        type: "number",
        placeholder: "60",
        default: String(WEBHOOK_DEFAULT_TIMEOUT_SECONDS),
      },
    ],
  },
  {
    type: "table",
    title: "Tabela",
    subtitle: "Visualiza retorno em tabela",
    group: "Visualizacao",
    summary: (node) => {
      const rows = node.tableData?.rows?.length || 0;
      return rows ? `Linhas: ${rows}` : "Sem dados";
    },
    fields: [
      {
        key: "name",
        label: "Nome",
        type: "text",
        placeholder: "Ex: Tabela de colaboradores",
      },
      {
        key: "maxRows",
        label: "Limite de linhas",
        type: "number",
        placeholder: "25",
      },
    ],
  },
];

const WORKFLOW_BRICK_TYPES = new Set(WORKFLOW_BRICKS.map((brick) => brick.type));
let workflowStatusTimeout = null;

function getWorkflowBrick(type) {
  return WORKFLOW_BRICKS.find((brick) => brick.type === type);
}

function applyFixedConfig(node, defOverride) {
  if (!node) return;
  const def = defOverride || getWorkflowBrick(node.type);
  if (!def?.fixedConfig) return;
  if (!node.config) node.config = {};
  Object.entries(def.fixedConfig).forEach(([key, value]) => {
    node.config[key] = value;
  });
}

function setWorkflowStatus(message, tone, options = {}) {
  if (!workflowStatus) return;
  if (workflowStatusTimeout) {
    clearTimeout(workflowStatusTimeout);
    workflowStatusTimeout = null;
  }
  workflowStatus.textContent = message || "";
  workflowStatus.className = "feedback";
  if (tone === "error") workflowStatus.classList.add("is-error");
  if (tone === "success") workflowStatus.classList.add("is-success");
  if (tone === "warning") workflowStatus.classList.add("is-warning");
  const shouldAutoHide =
    options.autoHide !== undefined ? options.autoHide : Boolean(message);
  if (shouldAutoHide && message) {
    const duration =
      typeof options.duration === "number" ? options.duration : 4000;
    workflowStatusTimeout = window.setTimeout(() => {
      workflowStatus.textContent = "";
      workflowStatus.className = "feedback";
      workflowStatusTimeout = null;
    }, Math.max(1500, duration));
  }
}

function updateWorkflowTitle(nameOverride) {
  if (!workflowTitle) return;
  const stored = nameOverride ?? safeStorageGet(WORKFLOW_NAME_KEY);
  const title = stored && String(stored).trim() ? String(stored).trim() : "Fluxo sem nome";
  workflowTitle.textContent = title;
  workflowTitle.title = title;
}

function snapToGrid(value) {
  const grid = 24;
  return Math.round(value / grid) * grid;
}

function clampScale(value) {
  return Math.min(
    workflowViewport.maxScale,
    Math.max(workflowViewport.minScale, value)
  );
}

function getCanvasRect() {
  if (!workflowCanvas) return null;
  return workflowCanvas.getBoundingClientRect();
}

function screenToWorld(clientX, clientY) {
  const rect = getCanvasRect();
  if (!rect) return { x: 0, y: 0 };
  return {
    x: (clientX - rect.left - workflowViewport.x) / workflowViewport.scale,
    y: (clientY - rect.top - workflowViewport.y) / workflowViewport.scale,
  };
}

function applyWorkflowViewport() {
  if (!workflowNodesLayer || !workflowCanvas) return;
  workflowNodesLayer.style.transform = `translate(${workflowViewport.x}px, ${workflowViewport.y}px) scale(${workflowViewport.scale})`;
  workflowNodesLayer.style.transformOrigin = "0 0";
  const gridSize = 24 * workflowViewport.scale;
  workflowCanvas.style.backgroundSize = `${gridSize}px ${gridSize}px`;
  workflowCanvas.style.backgroundPosition = `${workflowViewport.x}px ${workflowViewport.y}px`;
  scheduleWorkflowEdgesRender();
  updateWorkflowZoomLabel();
}

function isTypingTarget(target) {
  if (!target) return false;
  const tag = target.tagName;
  return (
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    tag === "SELECT" ||
    target.isContentEditable
  );
}

function updateWorkflowZoomLabel() {
  if (!workflowZoomReset) return;
  const percent = Math.round(workflowViewport.scale * 100);
  workflowZoomReset.textContent = `${percent}%`;
}

function setWorkflowZoom(nextScale, clientX, clientY) {
  const rect = getCanvasRect();
  if (!rect) return;
  const scale = clampScale(nextScale);
  const focusX = clientX ?? rect.left + rect.width / 2;
  const focusY = clientY ?? rect.top + rect.height / 2;
  const world = screenToWorld(focusX, focusY);
  workflowViewport.scale = scale;
  workflowViewport.x = focusX - rect.left - world.x * scale;
  workflowViewport.y = focusY - rect.top - world.y * scale;
  applyWorkflowViewport();
}

function loadWorkflowState() {
  if (workflowState.loaded) return;
  workflowState.loaded = true;
  const storedId = Number(safeStorageGet(WORKFLOW_ID_KEY));
  workflowState.workflowId = Number.isFinite(storedId) ? storedId : null;
  const raw = safeStorageGet(WORKFLOW_STORAGE_KEY);
  if (!raw) return;
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed?.nodes)) {
      workflowState.nodes = parsed.nodes
        .filter((node) => WORKFLOW_BRICK_TYPES.has(node?.type))
        .map((node, index) => {
          const hasPosition =
            typeof node?.position?.x === "number" &&
            typeof node?.position?.y === "number";
          const nextNode = {
            ...node,
            config: node?.config || {},
            position: hasPosition
              ? node.position
              : { x: 40 + index * 24, y: 40 + index * 24 },
          };
          applyFixedConfig(nextNode);
          return nextNode;
        });
    }
    if (Array.isArray(parsed?.edges)) {
      const validIds = new Set(workflowState.nodes.map((node) => node.id));
      workflowState.edges = parsed.edges.filter(
        (edge) => edge?.from && edge?.to && validIds.has(edge.from) && validIds.has(edge.to)
      );
    }
    workflowState.selectedNodeId = parsed?.selectedNodeId || null;
  } catch {
    workflowState.nodes = [];
    workflowState.edges = [];
  }
}

function saveWorkflowState() {
  if (!workflowState.loaded) return;
  const payload = {
    nodes: workflowState.nodes.map((node) => {
      const {
        output,
        outputUpdatedAt,
        execStatus,
        execStatusAt,
        tableData,
        lastResult,
        lastRunAt,
        ...rest
      } = node;
      return rest;
    }),
    edges: workflowState.edges,
    selectedNodeId: workflowState.selectedNodeId,
  };
  try {
    safeStorageSet(WORKFLOW_STORAGE_KEY, JSON.stringify(payload));
  } catch (err) {
    try {
      safeStorageRemove(WORKFLOW_STORAGE_KEY);
    } catch {
      // ignore
    }
    setWorkflowStatus(
      "Nao foi possivel salvar o rascunho (dados grandes). Salve o fluxo.",
      "warning",
      { duration: 5000 }
    );
  }
}

function serializeWorkflowDefinition() {
  const nodes = workflowState.nodes.map((node) => {
    const {
      output,
      outputUpdatedAt,
      execStatus,
      execStatusAt,
      tableData,
      lastResult,
      lastRunAt,
      ...rest
    } = node;
    return rest;
  });
  return {
    version: 1,
    savedAt: new Date().toISOString(),
    nodes,
    edges: workflowState.edges,
  };
}

function downloadWorkflowJson() {
  const payload = serializeWorkflowDefinition();
  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  link.href = url;
  link.download = `workflow-${stamp}.json`;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

async function saveWorkflowToServer(name) {
  const trimmed = String(name || "").trim();
  if (!trimmed) {
    if (workflowSaveFeedback) {
      workflowSaveFeedback.textContent = "Informe um nome para o fluxo.";
      workflowSaveFeedback.className = "feedback is-warning";
    }
    return;
  }

  const payload = {
    name: trimmed,
    definition: serializeWorkflowDefinition(),
  };

  if (workflowSaveFeedback) {
    workflowSaveFeedback.textContent = "Salvando fluxo...";
    workflowSaveFeedback.className = "feedback";
  }

  try {
    const response = await apiFetch("/api/workflows", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      if (workflowSaveFeedback) {
        workflowSaveFeedback.textContent =
          errorText || "Falha ao salvar o fluxo.";
        workflowSaveFeedback.className = "feedback is-error";
      }
      return;
    }

    const data = await response.json();
    const workflowId = Number(data?.id);
    if (Number.isFinite(workflowId)) {
      workflowState.workflowId = workflowId;
      safeStorageSet(WORKFLOW_ID_KEY, String(workflowId));
    }

    const schedulePayload = getWorkflowSchedulePayload();
    if (schedulePayload?.error) {
      return;
    }

    if (schedulePayload && !Number.isFinite(workflowId)) {
      if (workflowSaveFeedback) {
        workflowSaveFeedback.textContent =
          "Fluxo salvo, mas nao foi possivel agendar (ID invalido).";
        workflowSaveFeedback.className = "feedback is-error";
      }
      return;
    }

    if (schedulePayload && Number.isFinite(workflowId)) {
      const scheduleResponse = await apiFetch(
        `/api/workflows/${workflowId}/schedule`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(schedulePayload),
        }
      );
      if (!scheduleResponse.ok) {
        const scheduleText = await scheduleResponse.text();
        if (workflowSaveFeedback) {
          workflowSaveFeedback.textContent =
            scheduleText || "Fluxo salvo, mas falha ao agendar.";
          workflowSaveFeedback.className = "feedback is-error";
        }
        setWorkflowStatus(
          "Fluxo salvo, mas falha ao salvar o agendamento.",
          "warning"
        );
        return;
      }
      saveWorkflowScheduleDraft({
        enabled: true,
        cron: schedulePayload.cron,
        timezone: schedulePayload.timezone,
      });
      if (workflowPaletteTab === "schedules") {
        fetchWorkflowSchedules();
      }
    } else if (!schedulePayload) {
      saveWorkflowScheduleDraft(null);
      if (workflowPaletteTab === "schedules") {
        fetchWorkflowSchedules();
      }
    }

    safeStorageSet(WORKFLOW_NAME_KEY, trimmed);
    updateWorkflowTitle(trimmed);
    if (workflowSaveFeedback) {
      workflowSaveFeedback.textContent = schedulePayload
        ? "Fluxo e agendamento salvos."
        : "Fluxo salvo.";
      workflowSaveFeedback.className = "feedback is-success";
    }
    setWorkflowStatus(
      schedulePayload ? "Fluxo e agendamento salvos." : "Fluxo salvo no banco.",
      "success"
    );
    closeWorkflowSaveModal();
  } catch (err) {
    if (workflowSaveFeedback) {
      workflowSaveFeedback.textContent =
        err?.message || "Falha ao salvar o fluxo.";
      workflowSaveFeedback.className = "feedback is-error";
    }
  }
}

function applyWorkflowDefinition(definition, name, workflowId) {
  const parsed = definition || {};
  if (!Array.isArray(parsed.nodes)) {
    if (workflowLoadFeedback) {
      workflowLoadFeedback.textContent = "Fluxo invalido.";
      workflowLoadFeedback.className = "feedback is-error";
    }
    return;
  }
  workflowInspectorDrafts.clear();

  workflowState.nodes = parsed.nodes
    .filter((node) => WORKFLOW_BRICK_TYPES.has(node?.type))
    .map((node, index) => {
      const hasPosition =
        typeof node?.position?.x === "number" &&
        typeof node?.position?.y === "number";
      const nextNode = {
        ...node,
        config: node?.config || {},
        position: hasPosition
          ? node.position
          : { x: 40 + index * 24, y: 40 + index * 24 },
      };
      applyFixedConfig(nextNode);
      return nextNode;
    });

  const validIds = new Set(workflowState.nodes.map((node) => node.id));
  workflowState.edges = Array.isArray(parsed.edges)
    ? parsed.edges.filter(
        (edge) => edge?.from && edge?.to && validIds.has(edge.from) && validIds.has(edge.to)
      )
    : [];

  workflowState.selectedNodeId = null;
  workflowState.connectingFrom = null;
  workflowState.connectingPosition = null;
  workflowState.workflowId =
    Number.isFinite(Number(workflowId)) ? Number(workflowId) : null;
  if (workflowState.workflowId) {
    safeStorageSet(WORKFLOW_ID_KEY, String(workflowState.workflowId));
  } else {
    safeStorageRemove(WORKFLOW_ID_KEY);
  }
  saveWorkflowState();
  renderWorkflow();
  renderWorkflowInspectorPanel();
  setWorkflowStatus(
    name ? `Fluxo "${name}" carregado.` : "Fluxo carregado.",
    "success"
  );
  updateWorkflowTitle(name);
  closeWorkflowLoadModal();
}

function formatWorkflowDate(value) {
  if (!value) return "";
  try {
    const date = new Date(value);
    return date.toLocaleString("pt-BR");
  } catch {
    return String(value);
  }
}

function getBrickIconSvg(type) {
  switch (type) {
    case "start":
      return `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7 5l12 7-12 7z" fill="currentColor"></path>
        </svg>
      `;
    case "filter":
      return `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3 5h18l-7 8v5l-4 2v-7z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"></path>
        </svg>
      `;
    case "block":
      return `
        <img src="icons/xone-icon-x-square.svg" alt="" />
      `;
    case "webhook":
      return `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7 7h4l2 3-2 3H7l-2 3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
          <path d="M17 7h-4l-2-3 2-3h4l2 3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
          <path d="M17 17h-4l-2 3 2 3h4l2-3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
      `;
    case "flow":
      return `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="5" cy="12" r="2" fill="currentColor"></circle>
          <circle cx="19" cy="6" r="2" fill="currentColor"></circle>
          <circle cx="19" cy="18" r="2" fill="currentColor"></circle>
          <path d="M7 12h6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path>
          <path d="M13 12l4-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path>
          <path d="M13 12l4 4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path>
        </svg>
      `;
    case "xone-data":
      return `
        <img src="icons/xone-icon-x-square.svg" alt="" />
      `;
    case "xone-collaborators":
      return `
        <img src="icons/xone-icon-x-square.svg" alt="" />
      `;
    case "table":
      return `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="4" y="5" width="16" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="2"></rect>
          <path d="M4 10h16M4 14h16M10 5v14" stroke="currentColor" stroke-width="2"></path>
        </svg>
      `;
    default:
      return `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
        </svg>
      `;
  }
}

function getScheduleStatusLabel(schedule) {
  if (!schedule) return { label: "Sem execucao", tone: "neutral" };
  if (schedule.has_schedule === false || !schedule.schedule_id) {
    return { label: "Nao agendado", tone: "neutral" };
  }
  if (schedule.last_status === "partial") {
    return { label: "Parcial", tone: "warning" };
  }
  if (schedule.is_running) return { label: "Executando", tone: "running" };
  if (schedule.last_status === "success") {
    return { label: "Sucesso", tone: "ok" };
  }
  if (schedule.last_status === "error") {
    return { label: "Erro", tone: "error" };
  }
  if (schedule.enabled === false) {
    return { label: "Desativado", tone: "neutral" };
  }
  return { label: "Sem execucao", tone: "neutral" };
}

function renderWorkflowSchedules() {
  if (!workflowSchedulesList) return;
  workflowSchedulesList.innerHTML = "";
  if (!workflowSchedulesCache.length) {
    workflowSchedulesList.textContent = "Nenhum agendamento encontrado.";
    return;
  }
  const withSchedule = workflowSchedulesCache.filter(
    (item) => item.has_schedule || item.schedule_id
  );
  const withoutSchedule = workflowSchedulesCache.filter(
    (item) => !item.has_schedule && !item.schedule_id
  );

  const appendSection = (label, items) => {
    if (!items.length) return;
    const section = document.createElement("div");
    section.className = "schedule-section";
    section.textContent = label;
    workflowSchedulesList.append(section);
    items.forEach((schedule) => {
      const card = document.createElement("div");
      card.className = "schedule-card";
      card.tabIndex = 0;
      if (schedule.workflow_id) {
        card.dataset.workflowId = schedule.workflow_id;
      }

      const grip = document.createElement("span");
      grip.className = "schedule-grip";

      const icon = document.createElement("span");
      icon.className = "schedule-icon";
      icon.innerHTML = getBrickIconSvg("flow");

      const info = document.createElement("div");
      info.className = "schedule-info";

      const title = document.createElement("h4");
      title.className = "schedule-title";
      title.textContent = schedule.workflow_name || "Agendamento";

      const subtitle = document.createElement("p");
      subtitle.className = "muted";
      subtitle.textContent = schedule.last_run_at
        ? `Ultima execucao: ${formatWorkflowDate(schedule.last_run_at)}`
        : "Ultima execucao: Nunca";

      info.append(subtitle);

      const statusInfo = getScheduleStatusLabel(schedule);
      const status = document.createElement("span");
      status.className = "schedule-status";
      if (statusInfo.tone === "ok") status.classList.add("is-ok");
      if (statusInfo.tone === "error") status.classList.add("is-error");
      if (statusInfo.tone === "running") status.classList.add("is-running");
      if (statusInfo.tone === "warning") status.classList.add("is-warning");
      status.textContent = statusInfo.label;

      const meta = document.createElement("div");
      meta.className = "schedule-meta";
      meta.append(status);

      card.append(title, grip, icon, info, meta);
      workflowSchedulesList.append(card);
    });
  };

  appendSection("Agendamentos automaticos", withSchedule);
  appendSection("Fluxos sem agendamento", withoutSchedule);
}

async function fetchWorkflowSchedules() {
  if (!workflowSchedulesList) return;
  workflowSchedulesList.textContent = "Carregando agendamentos...";
  try {
    const response = await apiFetch("/api/workflows/schedules");
    if (!response.ok) {
      const errorText = await response.text();
      workflowSchedulesList.textContent =
        errorText || "Falha ao carregar agendamentos.";
      return;
    }
    const data = await response.json();
    workflowSchedulesCache = Array.isArray(data) ? data : [];
    renderWorkflowSchedules();
    if (workflowSchedulesCount) {
      workflowSchedulesCount.textContent = `${workflowSchedulesCache.length}`;
    }
  } catch (err) {
    workflowSchedulesList.textContent =
      err?.message || "Falha ao carregar agendamentos.";
  }
}

async function deleteWorkflowSchedule(workflowId) {
  if (!workflowId) return;
  try {
    const response = await apiFetch(`/api/workflows/${workflowId}/schedule`, {
      method: "DELETE",
    });
    const text = await response.text();
    let data = null;
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = null;
    }
    if (!response.ok) {
      const message = data?.error || text || "Falha ao remover agendamento.";
      throw new Error(message);
    }
    if (workflowPaletteTab === "schedules") {
      await fetchWorkflowSchedules();
    }
    if (workflowState.workflowId === workflowId) {
      saveWorkflowScheduleDraft(null);
    }
    setWorkflowStatus("Agendamento removido.", "success");
  } catch (err) {
    setWorkflowStatus(err?.message || "Falha ao remover agendamento.", "error");
  }
}

function setWorkflowPaletteTab(tab) {
  workflowPaletteTab = tab;
  if (workflowPaletteTabs) {
    workflowPaletteTabs.forEach((btn) => {
      btn.classList.toggle("is-active", btn.dataset.tab === tab);
    });
  }
  if (workflowPalette) {
    workflowPalette.classList.toggle("is-hidden", tab !== "bricks");
  }
  if (workflowSchedulesList) {
    workflowSchedulesList.classList.toggle("is-active", tab === "schedules");
  }
  if (workflowSchedulesCount) {
    workflowSchedulesCount.textContent = `${workflowSchedulesCache.length || 0}`;
  }
  const headerTitle = document.querySelector(".palette-header h3");
  if (headerTitle) {
    headerTitle.textContent = tab === "schedules" ? "Agendamentos" : "Blocos";
  }
  const headerDesc = document.querySelector(".palette-header .muted");
  if (headerDesc) {
    headerDesc.textContent =
      tab === "schedules"
        ? "Resumo das execucoes por fluxo."
        : "Arraste ou clique para adicionar.";
  }
  if (tab === "schedules") {
    fetchWorkflowSchedules();
  }
}

function renderWorkflowList(items) {
  if (!workflowLoadBody) return;
  workflowLoadBody.innerHTML = "";
  if (!items.length) {
    workflowLoadBody.textContent = "Nenhum fluxo salvo.";
    return;
  }

  const table = document.createElement("table");
  table.className = "table";
  const thead = document.createElement("thead");
  thead.innerHTML = `
    <tr>
      <th>Nome</th>
      <th>Atualizado</th>
      <th>Criado por</th>
      <th>Acoes</th>
    </tr>
  `;
  const tbody = document.createElement("tbody");

  items.forEach((item) => {
    const row = document.createElement("tr");
    const createdBy = item.created_by || "-";
    row.dataset.workflowId = item.id;
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${formatWorkflowDate(item.updated_at)}</td>
      <td>${createdBy}</td>
      <td>
        <button class="ghost" data-action="load" data-id="${item.id}">Abrir</button>
        <button class="ghost is-danger" data-action="delete" data-id="${item.id}">Excluir</button>
      </td>
    `;
    tbody.appendChild(row);
  });

  table.append(thead, tbody);
  workflowLoadBody.append(table);
}

async function fetchWorkflowList() {
  if (!workflowLoadBody) return;
  workflowLoadBody.textContent = "Carregando...";
  if (workflowLoadFeedback) workflowLoadFeedback.textContent = "";
  try {
    const response = await apiFetch("/api/workflows");
    if (!response.ok) {
      workflowLoadBody.textContent = "";
      if (workflowLoadFeedback) {
        workflowLoadFeedback.textContent = "Falha ao listar fluxos.";
        workflowLoadFeedback.className = "feedback is-error";
      }
      return;
    }
    const data = await response.json();
    renderWorkflowList(Array.isArray(data) ? data : []);
  } catch (err) {
    workflowLoadBody.textContent = "";
    if (workflowLoadFeedback) {
      workflowLoadFeedback.textContent =
        err?.message || "Falha ao listar fluxos.";
      workflowLoadFeedback.className = "feedback is-error";
    }
  }
}

async function loadWorkflowFromServer(id) {
  const workflowId = Number(id);
  if (!workflowId) return;
  if (workflowLoadFeedback) {
      workflowLoadFeedback.textContent = "Abrindo fluxo...";
    workflowLoadFeedback.className = "feedback";
  }
  try {
    const response = await apiFetch(`/api/workflows/${workflowId}`);
    if (!response.ok) {
      const text = await response.text();
      if (workflowLoadFeedback) {
        workflowLoadFeedback.textContent = text || "Falha ao carregar fluxo.";
        workflowLoadFeedback.className = "feedback is-error";
      }
      return;
    }
    const data = await response.json();
    if (data?.name) {
      safeStorageSet(WORKFLOW_NAME_KEY, data.name);
    }
    applyWorkflowDefinition(data?.definition, data?.name, data?.id);
  } catch (err) {
    if (workflowLoadFeedback) {
      workflowLoadFeedback.textContent =
        err?.message || "Falha ao carregar fluxo.";
      workflowLoadFeedback.className = "feedback is-error";
    }
  }
}

function getDefaultNodePosition() {
  if (!workflowCanvas) return { x: 40, y: 40 };
  const rect = workflowCanvas.getBoundingClientRect();
  const center = screenToWorld(rect.left + rect.width / 2, rect.top + rect.height / 2);
  const baseX = center.x ? center.x - 120 : 40;
  const baseY = center.y ? center.y - 40 : 40;
  const offset = (workflowState.nodes.length % 6) * 18;
  return {
    x: snapToGrid(Math.max(16, baseX + offset)),
    y: snapToGrid(Math.max(16, baseY + offset)),
  };
}

function getDropPosition(event) {
  if (!workflowCanvas) return { x: 40, y: 40 };
  const world = screenToWorld(event.clientX, event.clientY);
  const rawX = world.x - 120;
  const rawY = world.y - 30;
  return {
    x: snapToGrid(Math.max(16, rawX)),
    y: snapToGrid(Math.max(16, rawY)),
  };
}

function createWorkflowNode(type, position) {
  const def = getWorkflowBrick(type);
  if (!def) return;
  if (type === "start") {
    const existing = workflowState.nodes.find((node) => node.type === "start");
    if (existing) {
      selectWorkflowNode(existing.id);
      setWorkflowStatus("So e permitido um bloco Inicio.", "warning");
      return;
    }
  }
  const node = {
    id: `node-${Date.now()}-${Math.random().toString(16).slice(2, 6)}`,
    type,
    title: def.title,
    position: position || getDefaultNodePosition(),
    config: {},
  };
  if (Array.isArray(def.fields)) {
    def.fields.forEach((field) => {
      if (field.default !== undefined) {
        node.config[field.key] = field.default;
      }
    });
  }
  applyFixedConfig(node, def);
  workflowState.nodes.push(node);
  workflowState.selectedNodeId = node.id;
  workflowState.connectingFrom = null;
  saveWorkflowState();
  renderWorkflow();
  renderWorkflowInspectorPanel();
}

function getFieldDisplayValue(field, value) {
  if (field.type === "select") {
    const option = field.options?.find(
      (item) => String(item.value) === String(value)
    );
    return option?.label || value;
  }
  return value;
}

function describeNodeConfig(node) {
  const def = getWorkflowBrick(node.type);
  if (!def?.fields?.length) return "Sem configuracao";
  if (typeof def.summary === "function") {
    return def.summary(node);
  }
  const entries = def.fields
    .map((field) => {
      if (field.excludeFromSummary) return null;
      const value = node.config?.[field.key];
      if (value === undefined || value === null || value === "") return null;
      if (field.type === "textarea") {
        return `${field.label}: definido`;
      }
      const display = getFieldDisplayValue(field, value);
      return `${field.label}: ${display}`;
    })
    .filter(Boolean);
  return entries.length ? entries.join(" - ") : "Sem configuracao";
}

function getNodeDisplayName(node, defOverride) {
  if (!node) return "";
  const def = defOverride || getWorkflowBrick(node.type);
  const customName = node.config?.name ? String(node.config.name).trim() : "";
  return customName || def?.title || node.title || node.type;
}

function normalizeConditionRow(row) {
  return {
    field: row?.field ?? "",
    operator: row?.operator ?? "==",
    value: row?.value ?? "",
  };
}

function ensureFilterConditions(target) {
  const config = target?.config ?? target;
  if (!config) return;
  if (!Array.isArray(config.conditions)) {
    config.conditions = [normalizeConditionRow({})];
  } else if (config.conditions.length === 0) {
    config.conditions = [normalizeConditionRow({})];
  }
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
    if (!cond.field) {
      return false;
    }
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
    return (
      entry.hostname ??
      entry.host ??
      entry.machine ??
      entry.computer ??
      null
    );
  }
  return (
    entry.username ??
    entry.user ??
    entry.login ??
    entry.email ??
    null
  );
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

function buildBlockSchedulePayload(config, targetValue, options = {}) {
  const actionType = normalizeNumber(config?.actionType) ?? 0;
  const scheduleType = normalizeNumber(config?.scheduleType) ?? 0;
  const startDate = normalizeDateTime(config?.startDate);
  const endDate = normalizeDateTime(config?.endDate);
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
  const skipTimeValidation = Boolean(options.skipTimeValidation);

  if (
    !message ||
    actionType === null ||
    scheduleType === null ||
    !startDate ||
    !endDate ||
    targetType === null ||
    !normalizedTarget
  ) {
    return {
      error:
        "Campos obrigatorios: mensagem, acao, tipo, inicio, fim e alvo.",
    };
  }

  if (scheduleType === 1 && recurrenceType === null) {
    return { error: "Recorrencia e obrigatoria." };
  }

  if (scheduleType === 1 && recurrenceType === 1 && daysOfWeek.length === 0) {
    return { error: "Selecione pelo menos um dia da semana." };
  }

  if (scheduleType === 1 && !skipTimeValidation && (!startTime || !endTime)) {
    return { error: "Hora inicial e final sao obrigatorias." };
  }

  if (scheduleType === 1 && !skipTimeValidation) {
    const startSeconds = timeToSeconds(startTime);
    const endSeconds = timeToSeconds(endTime);
    if (
      startSeconds !== null &&
      endSeconds !== null &&
      endSeconds <= startSeconds
    ) {
      return { error: "Hora final deve ser maior que hora inicial." };
    }
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
  const startDate = normalizeDateTime(config?.startDate);
  const endDate = normalizeDateTime(config?.endDate);
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

function getBlockDisplayTargets(node) {
  const outputItem = node?.output?.data?.item;
  if (Array.isArray(outputItem) && outputItem.length) {
    return outputItem
      .map((item) => {
        if (isPrimitive(item)) return String(item);
        if (item && typeof item === "object") {
          return (
            item.targetValue ??
            item.target ??
            item.value ??
            null
          );
        }
        return null;
      })
      .filter(Boolean);
  }
  const outputTargets = outputItem?.targets;
  if (Array.isArray(outputTargets) && outputTargets.length) return outputTargets;
  const resultTargets = node?.lastResult?.targets;
  if (Array.isArray(resultTargets) && resultTargets.length) return resultTargets;
  if (node?.config?.sourceMode === "manual") {
    const manualTargets = parseManualTargets(node?.config?.manualTargets);
    if (manualTargets.length) return manualTargets;
  }
  return [];
}

function applyWorkflowSelectionStyles(nodeId) {
  if (!workflowNodesLayer) return;
  workflowNodesLayer.querySelectorAll(".workflow-node").forEach((el) => {
    el.classList.toggle("is-selected", el.dataset.nodeId === nodeId);
  });
}

function scheduleWorkflowInspectorPanelRender() {
  if (inspectorRenderRaf) {
    cancelAnimationFrame(inspectorRenderRaf);
  }
  inspectorRenderRaf = requestAnimationFrame(() => {
    inspectorRenderRaf = null;
    renderWorkflowInspectorPanel();
  });
}

function selectWorkflowNode(nodeId, options = {}) {
  const { render = true } = options;
  const isSame = workflowState.selectedNodeId === nodeId;
  workflowState.selectedNodeId = nodeId;
  if (render) {
    if (!isSame) {
      renderWorkflow();
    }
  } else {
    applyWorkflowSelectionStyles(nodeId);
  }
  scheduleWorkflowInspectorPanelRender();
}

function clearWorkflowConnection() {
  workflowState.connectingFrom = null;
  workflowState.connectingPosition = null;
  if (workflowConnectingHoverPort) {
    workflowConnectingHoverPort.classList.remove("is-hover");
    workflowConnectingHoverPort = null;
  }
  saveWorkflowState();
  renderWorkflow();
  setWorkflowStatus("");
}

function updateWorkflowConnectingPosition(clientX, clientY) {
  if (!workflowState.connectingFrom || !workflowCanvas) return;
  const rect = workflowCanvas.getBoundingClientRect();
  if (!rect.width || !rect.height) return;
  const clampedX = Math.min(Math.max(clientX - rect.left, 0), rect.width);
  const clampedY = Math.min(Math.max(clientY - rect.top, 0), rect.height);
  workflowState.connectingPosition = { x: clampedX, y: clampedY };
  scheduleWorkflowEdgesRender();

  const hovered = document.elementFromPoint(clientX, clientY);
  const port = hovered?.closest?.(".node-port.in");
  if (port && port.dataset.nodeId === workflowState.connectingFrom) {
    if (workflowConnectingHoverPort) {
      workflowConnectingHoverPort.classList.remove("is-hover");
      workflowConnectingHoverPort = null;
    }
    return;
  }
  if (workflowConnectingHoverPort !== port) {
    if (workflowConnectingHoverPort) {
      workflowConnectingHoverPort.classList.remove("is-hover");
    }
    workflowConnectingHoverPort = port || null;
    if (workflowConnectingHoverPort) {
      workflowConnectingHoverPort.classList.add("is-hover");
    }
  }
}

function startWorkflowConnection(nodeId, event) {
  if (!nodeId) return;
  if (workflowState.connectingFrom === nodeId) {
    clearWorkflowConnection();
    return;
  }
  workflowState.connectingFrom = nodeId;
  updateWorkflowConnectingPosition(event.clientX, event.clientY);
  renderWorkflow();
  setWorkflowStatus("Arraste ate a entrada do proximo bloco.", "success");
}

function finishWorkflowConnection(event) {
  if (!workflowState.connectingFrom) return;
  const hovered = document.elementFromPoint(event.clientX, event.clientY);
  const port = hovered?.closest?.(".node-port.in");
  if (port?.dataset?.nodeId) {
    createWorkflowEdge(workflowState.connectingFrom, port.dataset.nodeId);
    setWorkflowStatus("Conexao criada.", "success");
  }
  clearWorkflowConnection();
}

function ensureEdgeSvgSize() {
  if (!workflowEdgesLayer || !workflowCanvas) return;
  const rect = workflowCanvas.getBoundingClientRect();
  workflowEdgesLayer.setAttribute("width", rect.width);
  workflowEdgesLayer.setAttribute("height", rect.height);
  workflowEdgesLayer.setAttribute("viewBox", `0 0 ${rect.width} ${rect.height}`);
}

function scheduleWorkflowEdgesRender() {
  if (workflowEdgesRaf) return;
  workflowEdgesRaf = window.requestAnimationFrame(() => {
    workflowEdgesRaf = null;
    renderWorkflowEdges();
  });
}

function renderWorkflowEdges() {
  if (!workflowEdgesLayer || !workflowCanvas) return;
  workflowEdgesLayer.innerHTML = "";
  ensureEdgeSvgSize();
  const rect = workflowCanvas.getBoundingClientRect();
  if (!rect.width || !rect.height) return;

  workflowState.edges.forEach((edge) => {
    const fromPort = workflowNodesLayer?.querySelector(
      `[data-node-id="${edge.from}"] .node-port.out`
    );
    const toPort = workflowNodesLayer?.querySelector(
      `[data-node-id="${edge.to}"] .node-port.in`
    );
    if (!fromPort || !toPort) return;

    const fromRect = fromPort.getBoundingClientRect();
    const toRect = toPort.getBoundingClientRect();

    const x1 = fromRect.left - rect.left + fromRect.width / 2;
    const y1 = fromRect.top - rect.top + fromRect.height / 2;
    const x2 = toRect.left - rect.left + toRect.width / 2;
    const y2 = toRect.top - rect.top + toRect.height / 2;

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    const tension = Math.max(60, Math.abs(x2 - x1) * 0.5);
    path.setAttribute(
      "d",
      `M ${x1} ${y1} C ${x1 + tension} ${y1}, ${x2 - tension} ${y2}, ${x2} ${y2}`
    );
    path.setAttribute("class", "workflow-edge");
    path.dataset.edgeId = edge.id;
    path.dataset.from = edge.from;
    path.dataset.to = edge.to;
    workflowEdgesLayer.append(path);
  });

  if (workflowState.connectingFrom) {
    const activePath = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    const fromPort = workflowNodesLayer?.querySelector(
      `[data-node-id="${workflowState.connectingFrom}"] .node-port.out`
    );
    if (fromPort) {
      const fromRect = fromPort.getBoundingClientRect();
      const x1 = fromRect.left - rect.left + fromRect.width / 2;
      const y1 = fromRect.top - rect.top + fromRect.height / 2;
      const fallback = { x: x1 + 80, y: y1 };
      const target = workflowState.connectingPosition || fallback;
      const x2 = target.x;
      const y2 = target.y;
      activePath.setAttribute(
        "d",
        `M ${x1} ${y1} C ${x1 + 60} ${y1}, ${x2} ${y2}, ${x2} ${y2}`
      );
      activePath.setAttribute("class", "workflow-edge is-active");
      workflowEdgesLayer.append(activePath);
    }
  }
}

function createWorkflowEdge(fromId, toId) {
  if (!fromId || !toId || fromId === toId) return;
  const exists = workflowState.edges.some(
    (edge) => edge.from === fromId && edge.to === toId
  );
  if (exists) return;
  workflowState.edges.push({
    id: `edge-${Date.now()}-${Math.random().toString(16).slice(2, 6)}`,
    from: fromId,
    to: toId,
  });
  const fromNode = workflowState.nodes.find((node) => node.id === fromId);
  if (fromNode?.output?.data) {
    propagateNodeOutput(fromNode);
  }
  saveWorkflowState();
  scheduleWorkflowEdgesRender();
}

function deleteWorkflowEdge(edgeId) {
  if (!edgeId) return;
  workflowState.edges = workflowState.edges.filter((edge) => edge.id !== edgeId);
  saveWorkflowState();
  scheduleWorkflowEdgesRender();
}

function removeWorkflowNodeEdges(nodeId) {
  if (!nodeId) return;
  const hasEdges = workflowState.edges.some(
    (edge) => edge.from === nodeId || edge.to === nodeId
  );
  if (!hasEdges) {
    setWorkflowStatus("Nenhuma ligacao para remover.", "warning");
    return;
  }
  workflowState.edges = workflowState.edges.filter(
    (edge) => edge.from !== nodeId && edge.to !== nodeId
  );
  if (workflowState.connectingFrom === nodeId) {
    workflowState.connectingFrom = null;
    workflowState.connectingPosition = null;
  }
  saveWorkflowState();
  renderWorkflow();
  renderWorkflowInspectorPanel();
  setWorkflowStatus("Ligacoes removidas.", "success");
}

function deleteWorkflowNode(nodeId) {
  if (!nodeId) return;
  workflowState.nodes = workflowState.nodes.filter((item) => item.id !== nodeId);
  workflowState.edges = workflowState.edges.filter(
    (edge) => edge.from !== nodeId && edge.to !== nodeId
  );
  workflowInspectorDrafts.delete(nodeId);
  if (workflowState.selectedNodeId === nodeId) {
    workflowState.selectedNodeId = null;
  }
  if (workflowState.connectingFrom === nodeId) {
    workflowState.connectingFrom = null;
    workflowState.connectingPosition = null;
  }
  if (workflowModalNodeId === nodeId) {
    closeWorkflowModal();
  }
  saveWorkflowState();
  renderWorkflow();
  renderWorkflowInspectorPanel();
  setWorkflowStatus("Bloco removido.", "success");
}

function openWorkflowMenu(x, y, nodeId) {
  if (!workflowMenu) return;
  closeWorkflowEdgeMenu();
  workflowMenuNodeId = nodeId;
  const node = workflowState.nodes.find((item) => item.id === nodeId);
  const responseItem = workflowMenu.querySelector(
    '.context-item[data-action="view-response"]'
  );
  const runItem = workflowMenu.querySelector(
    '.context-item[data-action="run"]'
  );
  const refreshItem = workflowMenu.querySelector(
    '.context-item[data-action="refresh-table"]'
  );
  const viewTableItem = workflowMenu.querySelector(
    '.context-item[data-action="view-table"]'
  );
  const viewItemsItem = workflowMenu.querySelector(
    '.context-item[data-action="view-items"]'
  );
  const removeLinksItem = workflowMenu.querySelector(
    '.context-item[data-action="remove-links"]'
  );
  const isStart = node?.type === "start";
  const isWebhook =
    node?.type === "webhook" ||
    node?.type === "xone-collaborators" ||
    node?.type === "xone-data";
  const isBlock = node?.type === "block";
  const isTable = node?.type === "table";
  const canViewResponse = isWebhook || isBlock;
  if (runItem) {
    runItem.style.display = isStart ? "" : "none";
    runItem.textContent = "Executar fluxo";
  }
  if (responseItem) {
    responseItem.style.display = canViewResponse ? "" : "none";
    const hasResult = Boolean(node?.lastResult) && canViewResponse;
    responseItem.classList.toggle("is-disabled", !hasResult);
  }
  if (refreshItem) {
    refreshItem.style.display = isTable ? "" : "none";
  }
  if (viewTableItem) {
    viewTableItem.style.display = isTable ? "" : "none";
    const hasData = node?.tableData?.rows?.length;
    viewTableItem.classList.toggle("is-disabled", !hasData);
  }
  if (viewItemsItem) {
    viewItemsItem.style.display = node ? "" : "none";
    const { items } = getUpstreamDataItems(node);
    const hasItems = items !== null && !isEmptyDataItem(items);
    viewItemsItem.classList.toggle("is-disabled", !hasItems);
  }
  if (removeLinksItem) {
    const hasEdges = workflowState.edges.some(
      (edge) => edge.from === nodeId || edge.to === nodeId
    );
    removeLinksItem.style.display = node ? "" : "none";
    removeLinksItem.classList.toggle("is-disabled", !hasEdges);
  }
  workflowMenu.classList.add("is-open");
  workflowMenu.style.left = `${x}px`;
  workflowMenu.style.top = `${y}px`;

  const padding = 8;
  const rect = workflowMenu.getBoundingClientRect();
  let left = x;
  let top = y;

  if (rect.right > window.innerWidth - padding) {
    left = window.innerWidth - rect.width - padding;
  }
  if (rect.bottom > window.innerHeight - padding) {
    top = window.innerHeight - rect.height - padding;
  }

  workflowMenu.style.left = `${Math.max(padding, left)}px`;
  workflowMenu.style.top = `${Math.max(padding, top)}px`;
}

function closeWorkflowMenu() {
  if (!workflowMenu) return;
  workflowMenu.classList.remove("is-open");
  workflowMenuNodeId = null;
}

function openWorkflowScheduleMenu(x, y, workflowId, hasSchedule) {
  if (!workflowScheduleMenu) return;
  workflowScheduleMenuWorkflowId = workflowId;
  workflowScheduleMenu.dataset.workflowId = workflowId;
  const deleteItem = workflowScheduleMenu.querySelector(
    '[data-action="delete-schedule"]'
  );
  if (deleteItem) {
    deleteItem.classList.toggle("is-disabled", !hasSchedule);
  }

  workflowScheduleMenu.classList.add("is-open");
  workflowScheduleMenu.style.left = `${x}px`;
  workflowScheduleMenu.style.top = `${y}px`;

  const padding = 8;
  const rect = workflowScheduleMenu.getBoundingClientRect();
  let left = x;
  let top = y;

  if (rect.right > window.innerWidth - padding) {
    left = window.innerWidth - rect.width - padding;
  }
  if (rect.bottom > window.innerHeight - padding) {
    top = window.innerHeight - rect.height - padding;
  }

  workflowScheduleMenu.style.left = `${Math.max(padding, left)}px`;
  workflowScheduleMenu.style.top = `${Math.max(padding, top)}px`;
}

function closeWorkflowScheduleMenu() {
  if (!workflowScheduleMenu) return;
  workflowScheduleMenu.classList.remove("is-open");
  workflowScheduleMenuWorkflowId = null;
  delete workflowScheduleMenu.dataset.workflowId;
}

function openWorkflowEdgeMenu(x, y, edge) {
  if (!workflowEdgeMenu || !edge) return;
  workflowMenuEdge = edge;
  workflowEdgeMenu.classList.add("is-open");
  workflowEdgeMenu.style.left = `${x}px`;
  workflowEdgeMenu.style.top = `${y}px`;

  const padding = 8;
  const rect = workflowEdgeMenu.getBoundingClientRect();
  let left = x;
  let top = y;

  if (rect.right > window.innerWidth - padding) {
    left = window.innerWidth - rect.width - padding;
  }
  if (rect.bottom > window.innerHeight - padding) {
    top = window.innerHeight - rect.height - padding;
  }

  workflowEdgeMenu.style.left = `${Math.max(padding, left)}px`;
  workflowEdgeMenu.style.top = `${Math.max(padding, top)}px`;
}

function closeWorkflowEdgeMenu() {
  if (!workflowEdgeMenu) return;
  workflowEdgeMenu.classList.remove("is-open");
  workflowMenuEdge = null;
}

function openWorkflowModal(nodeId) {
  if (!workflowModal) return;
  const node = workflowState.nodes.find((item) => item.id === nodeId);
  if (!node) return;
  workflowModalNodeId = nodeId;
  if (workflowModalTitle) {
    const def = getWorkflowBrick(node.type);
    workflowModalTitle.textContent = getNodeDisplayName(node, def) || "Propriedades";
  }
  workflowModal.classList.add("is-open");
  renderWorkflowModal();
}

function closeWorkflowModal() {
  if (!workflowModal) return;
  workflowModal.classList.remove("is-open");
  workflowModalNodeId = null;
  if (workflowModalBody) workflowModalBody.innerHTML = "";
}

function openWorkflowResponseModal(nodeId) {
  if (!workflowResponseModal || !workflowResponseBody) return;
  const node = workflowState.nodes.find((item) => item.id === nodeId);
  if (!node) return;
  workflowResponseNodeId = nodeId;
  if (workflowResponseTitle) {
    const displayName = getNodeDisplayName(node);
    workflowResponseTitle.textContent = displayName
      ? `Retorno: ${displayName}`
      : "Retorno do Webhook";
  }
  workflowResponseModal.classList.add("is-open");
  renderWorkflowResponseModal();
}

function closeWorkflowResponseModal() {
  if (!workflowResponseModal) return;
  workflowResponseModal.classList.remove("is-open");
  workflowResponseNodeId = null;
  if (workflowResponseBody) workflowResponseBody.innerHTML = "";
}

function openWorkflowTableModal(nodeId) {
  if (!workflowTableModal || !workflowTableBody) return;
  const node = workflowState.nodes.find((item) => item.id === nodeId);
  if (!node) return;
  workflowItemsData = null;
  workflowTableNodeId = nodeId;
  if (workflowTableTitle) {
    const displayName = getNodeDisplayName(node);
    workflowTableTitle.textContent = displayName
      ? `Tabela: ${displayName}`
      : "Tabela";
  }
  workflowTableModal.classList.add("is-open");
  renderWorkflowTableModal();
}

function closeWorkflowTableModal() {
  if (!workflowTableModal) return;
  workflowTableModal.classList.remove("is-open");
  workflowTableNodeId = null;
  workflowItemsData = null;
  if (workflowTableBody) workflowTableBody.innerHTML = "";
}

function openWorkflowItemsModal(nodeId) {
  if (!workflowTableModal || !workflowTableBody) return;
  const node = workflowState.nodes.find((item) => item.id === nodeId);
  if (!node) return;
  const { upstream, items } = getUpstreamDataItems(node);
  if (!upstream || items === null || isEmptyDataItem(items)) {
    setWorkflowStatus("Nenhum data.items disponivel no passo anterior.", "warning");
    return;
  }
  const normalized = normalizeTableData(items);
  workflowItemsData = {
    columns: normalized.columns,
    rows: normalized.rows,
    sourceNodeId: upstream.id,
    updatedAt: new Date().toISOString(),
  };
  workflowTableNodeId = null;
  if (workflowTableTitle) {
    const displayName = getNodeDisplayName(upstream);
    workflowTableTitle.textContent = displayName
      ? `Data.items: ${displayName}`
      : "Data.items";
  }
  workflowTableModal.classList.add("is-open");
  renderWorkflowTableModal();
}

function openWorkflowLoadModal() {
  if (!workflowLoadModal) return;
  if (workflowLoadFeedback) workflowLoadFeedback.textContent = "";
  workflowLoadModal.classList.add("is-open");
  fetchWorkflowList();
}

function closeWorkflowLoadModal() {
  if (!workflowLoadModal) return;
  workflowLoadModal.classList.remove("is-open");
  if (workflowLoadFeedback) workflowLoadFeedback.textContent = "";
}

async function openWorkflowSaveModal() {
  if (!workflowSaveModal || !workflowSaveName) return;
  const lastName = safeStorageGet(WORKFLOW_NAME_KEY) || "";
  workflowSaveName.value = lastName;
  if (workflowSaveFeedback) workflowSaveFeedback.textContent = "";
  const draft = loadWorkflowScheduleDraft();
  if (draft) {
    setWorkflowScheduleFields(draft);
  } else {
    setWorkflowScheduleFields({ enabled: false, timezone: getDefaultTimezone() });
  }
  workflowSaveModal.classList.add("is-open");
  const workflowId =
    workflowState.workflowId ||
    Number(safeStorageGet(WORKFLOW_ID_KEY));
  if (workflowId) {
    fetchWorkflowSchedule(workflowId).then((schedule) => {
      if (!schedule) return;
      setWorkflowScheduleFields({
        enabled: Boolean(schedule.enabled),
        cron: schedule.cron,
        timezone: schedule.timezone,
      });
    });
  }
  setTimeout(() => {
    workflowSaveName.focus();
    workflowSaveName.select();
  }, 0);
}

function closeWorkflowSaveModal() {
  if (!workflowSaveModal) return;
  workflowSaveModal.classList.remove("is-open");
  if (workflowSaveFeedback) workflowSaveFeedback.textContent = "";
}

function renderWorkflowResponseModal() {
  if (!workflowResponseModal || !workflowResponseBody) return;
  if (!workflowResponseModal.classList.contains("is-open")) return;
  const node = workflowState.nodes.find(
    (item) => item.id === workflowResponseNodeId
  );
  if (!node) {
    closeWorkflowResponseModal();
    return;
  }
  const result = node.lastResult;
  if (!result) {
    workflowResponseBody.textContent = "Nenhum retorno registrado.";
    return;
  }
  if (node.type === "block" || result.kind === "block") {
    workflowResponseBody.textContent = JSON.stringify(result, null, 2);
    return;
  }
  const lines = [
    `Status: ${result.status ?? "-"} ${result.statusText || ""}`.trim(),
    `OK: ${result.ok ? "Sim" : "Nao"}`,
    result.elapsedMs !== undefined ? `Tempo: ${result.elapsedMs} ms` : null,
    result.url ? `URL: ${result.url}` : null,
    result.warning ? `Aviso: ${result.warning}` : null,
    result.error ? `Erro: ${result.error}` : null,
  ].filter(Boolean);

  let body = result.bodyText || "";
  if (result.bodyJson && typeof result.bodyJson === "object") {
    try {
      body = JSON.stringify(result.bodyJson, null, 2);
    } catch {
      body = result.bodyText || "";
    }
  }

  const content = `${lines.join("\n")}\n\n${body}`;
  workflowResponseBody.textContent = content;
}

function renderWorkflowTableModal() {
  if (!workflowTableModal || !workflowTableBody) return;
  if (!workflowTableModal.classList.contains("is-open")) return;
  let data = null;
  if (workflowItemsData) {
    data = workflowItemsData;
  } else {
    const node = workflowState.nodes.find(
      (item) => item.id === workflowTableNodeId
    );
    if (!node) {
      closeWorkflowTableModal();
      return;
    }
    data = node.tableData;
  }
  workflowTableBody.innerHTML = "";
  if (!data || !data.columns || data.columns.length === 0) {
    workflowTableBody.textContent = "Sem dados para exibir.";
    return;
  }

  const table = document.createElement("table");
  table.className = "modal-table";
  const thead = document.createElement("thead");
  const headRow = document.createElement("tr");
  data.columns.forEach((col) => {
    const th = document.createElement("th");
    th.textContent = col;
    headRow.append(th);
  });
  thead.append(headRow);
  table.append(thead);

  const tbody = document.createElement("tbody");
  data.rows.forEach((row) => {
    const tr = document.createElement("tr");
    data.columns.forEach((col) => {
      const td = document.createElement("td");
      const value = row?.[col];
      if (value === null || value === undefined) {
        td.textContent = "-";
      } else if (typeof value === "object") {
        td.textContent = JSON.stringify(value);
      } else {
        td.textContent = String(value);
      }
      tr.append(td);
    });
    tbody.append(tr);
  });
  table.append(tbody);
  workflowTableBody.append(table);
}

function parseKeyValueLines(input) {
  const result = {};
  if (!input) return result;
  input
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

function flattenObject(value, options = {}, prefix = "", depth = 0) {
  const {
    maxDepth = 2,
    keepNull = true,
    allowPrimitiveArrays = true,
  } = options;

  if (isPrimitive(value)) {
    if (value === null && !keepNull) return {};
    return { [prefix]: value };
  }

  if (Array.isArray(value)) {
    if (!allowPrimitiveArrays) return {};
    const primitivesOnly = value.every((item) => isPrimitive(item));
    if (!primitivesOnly) return {};
    return { [prefix]: value.filter((item) => item !== null).join(", ") };
  }

  if (typeof value !== "object") return {};
  if (depth >= maxDepth) return {};

  return Object.entries(value).reduce((acc, [key, val]) => {
    const nextKey = prefix ? `${prefix}.${key}` : key;
    const flattened = flattenObject(val, options, nextKey, depth + 1);
    Object.assign(acc, flattened);
    return acc;
  }, {});
}

function normalizeTableData(payload) {
  if (payload === undefined || payload === null) return { columns: [], rows: [] };

  if (Array.isArray(payload)) {
    if (payload.length === 0) return { columns: [], rows: [] };
    const rows = [];
    const columns = [];
    payload.forEach((item, index) => {
      if (isPrimitive(item)) {
        const row = { value: item };
        rows.push(row);
        if (!columns.includes("value")) columns.push("value");
        return;
      }
      if (Array.isArray(item)) {
        const row = { value: item.join(", ") };
        rows.push(row);
        if (!columns.includes("value")) columns.push("value");
        return;
      }
      if (item && typeof item === "object") {
        const flat = flattenObject(item, { maxDepth: 3 });
        rows.push(flat);
        Object.keys(flat).forEach((key) => {
          if (!columns.includes(key)) columns.push(key);
        });
        return;
      }
      const row = { value: String(item) };
      rows.push(row);
      if (!columns.includes("value")) columns.push("value");
    });
    return { columns, rows };
  }

  if (typeof payload === "object") {
    const flat = flattenObject(payload, { maxDepth: 3 });
    const columns = Object.keys(flat);
    return { columns, rows: columns.length ? [flat] : [] };
  }

  return { columns: ["value"], rows: [{ value: payload }] };
}

function isEmptyDataItem(item) {
  if (item === null) return true;
  if (typeof item === "string") return item.trim().length === 0;
  if (Array.isArray(item)) return item.length === 0;
  if (item && typeof item === "object") return Object.keys(item).length === 0;
  return false;
}

function getDefaultDataItem(payload) {
  if (!payload || typeof payload !== "object") return payload;
  if (payload.payload !== undefined) return payload.payload;
  if (payload.data?.items !== undefined) return payload.data.items;
  if (payload.data?.item !== undefined) return payload.data.item;
  return payload;
}

function collectContainerPaths(value, options = {}, prefix = "", depth = 0, paths = new Set()) {
  const { maxDepth = 3 } = options;

  if (value === undefined || value === null) return paths;
  if (depth > maxDepth) return paths;

  if (Array.isArray(value)) {
    if (prefix) paths.add(prefix);
    return paths;
  }

  if (typeof value !== "object") return paths;
  if (prefix) paths.add(prefix);
  if (depth >= maxDepth) return paths;

  Object.entries(value).forEach(([key, val]) => {
    if (val === undefined || val === null) return;
    const nextKey = prefix ? `${prefix}.${key}` : key;
    if (typeof val === "object") {
      collectContainerPaths(val, options, nextKey, depth + 1, paths);
    }
  });

  return paths;
}

function getBlockUpstreamItem(node) {
  const source = getUpstreamNode(node);
  if (!source) return undefined;
  return getNodeOutputItem(source);
}

function getBlockSourcePathSuggestions(node) {
  const item = getBlockUpstreamItem(node);
  if (item === undefined) return [];
  const paths = collectContainerPaths(item, { maxDepth: 3 });
  return Array.from(paths).filter(Boolean).sort();
}

function getBlockValuePathSuggestions(node) {
  const item = getBlockUpstreamItem(node);
  if (item === undefined) return [];
  const sourceItem = getBlockSourceItem(item, node.config || {});
  const resolved = sourceItem !== undefined && sourceItem !== null ? sourceItem : item;
  let sample = resolved;
  if (Array.isArray(resolved)) {
    sample =
      resolved.find((entry) => entry && typeof entry === "object") ??
      resolved.find((entry) => entry !== undefined && entry !== null);
  }
  if (!sample || typeof sample !== "object" || Array.isArray(sample)) return [];
  const flat = flattenObject(sample, { maxDepth: 4, keepNull: true });
  return Object.keys(flat).filter(Boolean).sort();
}

function getWorkflowFieldSuggestions(node, field) {
  if (!node || node.type !== "block") return [];
  const sourceMode = node.config?.sourceMode || "data";
  if (sourceMode !== "data") return [];
  if (field.suggestions === "sourcePath") {
    return getBlockSourcePathSuggestions(node);
  }
  if (field.suggestions === "valuePath") {
    return getBlockValuePathSuggestions(node);
  }
  if (field.suggestions === "timePath") {
    return getBlockValuePathSuggestions(node);
  }
  return [];
}

function extractTableSource(payload) {
  return getDefaultDataItem(payload);
}

function applyTableDataToNode(tableNode, payload, sourceNodeId) {
  const limit = Number(tableNode.config?.maxRows) || 25;
  const updatedAt = new Date().toISOString();
  if (payload === undefined) {
    tableNode.tableData = {
      columns: [],
      rows: [],
      sourceNodeId,
      updatedAt,
    };
    setNodeExecutionStatus(tableNode, "error");
    renderWorkflowTableModal();
    return;
  }
  const source = extractTableSource(payload);
  const normalized = normalizeTableData(source);
  const rows =
    normalized.rows.length > limit
      ? normalized.rows.slice(0, limit)
      : normalized.rows;
  tableNode.tableData = {
    columns: normalized.columns,
    rows,
    sourceNodeId,
    updatedAt,
  };
  setNodeOutputItem(tableNode, payload);
  const isEmpty = isEmptyDataItem(source) || normalized.rows.length === 0;
  setNodeExecutionStatus(tableNode, isEmpty ? "warning" : "success");
  renderWorkflowTableModal();
}

function setNodeOutputItem(node, item) {
  node.output = {
    data: {
      item,
    },
  };
  node.outputUpdatedAt = new Date().toISOString();
}

function getNodeOutputItem(node) {
  return node?.output?.data?.item;
}

function extractDataItems(value) {
  if (value === undefined || value === null) return null;
  if (Array.isArray(value)) return value;
  if (typeof value !== "object") return value;
  if (Array.isArray(value.items)) return value.items;
  if (Array.isArray(value.data?.items)) return value.data.items;
  if (Array.isArray(value.data?.item)) return value.data.item;
  if (value.data?.item !== undefined) return value.data.item;
  return value;
}

function getUpstreamDataItems(node) {
  const upstream = getUpstreamNode(node);
  if (!upstream) return { upstream: null, items: null };
  const item = getNodeOutputItem(upstream);
  const resolved = extractDataItems(item);
  return { upstream, items: resolved };
}

function isPrimitiveValue(value) {
  return (
    value === null ||
    value === undefined ||
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  );
}

function getTemplateContextForNode(node) {
  const upstream = getUpstreamNode(node);
  if (!upstream) return null;
  const item = getNodeOutputItem(upstream);
  if (Array.isArray(item)) {
    const first = item[0];
    if (isPrimitiveValue(first)) {
      return { value: first };
    }
    return first && typeof first === "object" ? first : null;
  }
  if (isPrimitiveValue(item)) {
    return { value: item };
  }
  return item && typeof item === "object" ? item : null;
}

function interpolateTemplateString(template, context) {
  if (!template) return { text: "", missing: [] };
  const missing = new Set();
  const text = String(template).replace(
    /\{\{\s*([^}]+?)\s*\}\}/g,
    (_match, path) => {
      const clean = String(path || "").trim();
      if (!clean) {
        missing.add("{{}}");
        return "";
      }
      if (!context || typeof context !== "object") {
        missing.add(clean);
        return "";
      }
      const value = getValueByPath(context, clean);
      if (value === undefined || value === null) {
        missing.add(clean);
        return "";
      }
      if (!isPrimitiveValue(value)) {
        missing.add(clean);
        return "";
      }
      return String(value);
    }
  );
  return { text, missing: Array.from(missing) };
}

function setNodeExecutionStatus(node, status) {
  node.execStatus = status || null;
  node.execStatusAt = new Date().toISOString();
}

function setWorkflowRunning(isRunning) {
  if (!workflowCanvas) return;
  workflowCanvas.classList.toggle("is-running", Boolean(isRunning));
}

function getExecutionOrder(startNodeId) {
  const adjacency = workflowState.edges.reduce((acc, edge) => {
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
      const node = workflowState.nodes.find((item) => item.id === current);
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

async function executeWorkflowFromStart(startNode) {
  if (!startNode) return;
  setWorkflowRunning(true);
  try {
    const order = getExecutionOrder(startNode.id);
    setNodeExecutionStatus(startNode, null);
    order.forEach((node) => {
      node.execStatus = null;
    });
    saveWorkflowState();
    renderWorkflow();

    if (!order.length) {
      setWorkflowStatus("Nenhum bloco conectado ao inicio.", "warning");
      setNodeExecutionStatus(startNode, "warning");
      renderWorkflow();
      return;
    }

    setWorkflowStatus("Executando fluxo...", "success");
    let hasWarning = false;

    for (const node of order) {
      if (node.type === "webhook" || node.type === "xone-collaborators") {
        const result = await executeWebhookNode(node);
        if (node.execStatus === "warning") {
          hasWarning = true;
          setWorkflowStatus("Parametros faltando na integracao.", "warning");
          break;
        }
        if (!result.ok || result.timedOut) {
          const errorMessage = result.timedOut
            ? "Timeout no webhook."
            : "Falha ao executar integracao.";
          setWorkflowStatus(errorMessage, "error");
          setNodeExecutionStatus(startNode, "error");
          renderWorkflow();
          return;
        }
      } else if (node.type === "xone-data") {
        const result = await executeXoneDataNode(node);
        if (node.execStatus === "warning") {
          hasWarning = true;
          setWorkflowStatus("Parametros faltando no xOne Data.", "warning");
          break;
        }
        if (!result.ok || result.timedOut) {
          const errorMessage = result.timedOut
            ? "Timeout no xOne Data."
            : "Falha ao coletar dados xOne.";
          setWorkflowStatus(errorMessage, "error");
          setNodeExecutionStatus(startNode, "error");
          renderWorkflow();
          return;
        }
      } else if (node.type === "filter") {
        const result = executeFilterNode(node);
        if (!result.ok) {
          hasWarning = true;
          setWorkflowStatus("Filtro nao executado.", "warning");
          break;
        }
      } else if (node.type === "block") {
        const result = await executeBlockNode(node);
        if (!result.ok) {
          if (result.level === "warning") {
            hasWarning = true;
            setWorkflowStatus("Bloqueio nao executado.", "warning");
            break;
          }
          setWorkflowStatus("Falha ao processar bloqueio.", "error");
          setNodeExecutionStatus(startNode, "error");
          renderWorkflow();
          return;
        }
        if (result.level === "warning") {
          hasWarning = true;
        }
      } else if (node.type === "table") {
        refreshTableFromUpstream(node);
        if (node.execStatus === "warning") {
          hasWarning = true;
        }
      }
    }

    setNodeExecutionStatus(startNode, hasWarning ? "warning" : "success");
    setWorkflowStatus(
      hasWarning ? "Fluxo concluido com alertas." : "Fluxo executado.",
      hasWarning ? "warning" : "success"
    );
    saveWorkflowState();
    renderWorkflow();
  } finally {
    setWorkflowRunning(false);
  }
}

function buildWebhookRequest(node) {
  const config = node.config || {};
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

function getWebhookPayload(node, result) {
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
  const payload = getWebhookPayload(node, result);
  const responsePath = node.config?.responsePath;
  if (!responsePath || responsePath === WORKFLOW_DEFAULT_OUTPUT_PATH) {
    return getDefaultDataItem(payload);
  }
  return getValueByPath(payload, responsePath);
}

function cloneWorkflowConfig(config) {
  return JSON.parse(JSON.stringify(config || {}));
}

function buildWorkflowInspectorDraft(node) {
  const config = cloneWorkflowConfig(node?.config);
  const cached = getXoneConfigCache();
  return {
    nodeId: node?.id || null,
    config,
    dirty: false,
    xoneConfig: cached ? { ...cached } : null,
    xonePatch: {},
    xoneDirty: false,
  };
}

function getWorkflowInspectorDraft(node) {
  if (!node) return null;
  if (!workflowInspectorDrafts.has(node.id)) {
    workflowInspectorDrafts.set(node.id, buildWorkflowInspectorDraft(node));
  }
  return workflowInspectorDrafts.get(node.id);
}

function createMiniIcon(name) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("focusable", "false");
  svg.classList.add("icon");
  const paths = [];
  if (name === "plus") {
    paths.push({ d: "M12 5v14" });
    paths.push({ d: "M5 12h14" });
  } else if (name === "trash") {
    paths.push({ d: "M4 7h16" });
    paths.push({ d: "M9 7V5h6v2" });
    paths.push({ d: "M7 7v11a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V7" });
    paths.push({ d: "M10 11v6" });
    paths.push({ d: "M14 11v6" });
  } else if (name === "check") {
    paths.push({ d: "M5 13l4 4L19 7" });
  }
  paths.forEach((pathDef) => {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", pathDef.d);
    path.setAttribute("fill", "none");
    path.setAttribute("stroke", "currentColor");
    path.setAttribute("stroke-width", "1.5");
    path.setAttribute("stroke-linecap", "round");
    path.setAttribute("stroke-linejoin", "round");
    svg.append(path);
  });
  return svg;
}

function getVariableSuggestions(node) {
  const upstream = getUpstreamNode(node);
  if (!upstream) return [];
  const item = getNodeOutputItem(upstream);
  if (Array.isArray(item)) {
    const sample =
      item.find((entry) => entry && typeof entry === "object") ??
      item.find((entry) => entry !== undefined && entry !== null);
    if (!sample) return [];
    if (isPrimitiveValue(sample)) return ["value"];
    const flat = flattenObject(sample, { maxDepth: 4, keepNull: true });
    return Object.keys(flat).filter(Boolean).sort();
  }
  if (isPrimitiveValue(item)) return ["value"];
  if (item && typeof item === "object") {
    const flat = flattenObject(item, { maxDepth: 4, keepNull: true });
    return Object.keys(flat).filter(Boolean).sort();
  }
  return [];
}

function propagateNodeOutput(sourceNode) {
  const payload = getNodeOutputItem(sourceNode);
  const targets = workflowState.edges
    .filter((edge) => edge.from === sourceNode.id)
    .map((edge) => workflowState.nodes.find((node) => node.id === edge.to))
    .filter((node) => node && node.type === "table");

  targets.forEach((tableNode) => {
    applyTableDataToNode(tableNode, payload, sourceNode.id);
  });
}

function getUpstreamNode(tableNode) {
  if (!tableNode) return null;
  const incoming = workflowState.edges.find((edge) => edge.to === tableNode.id);
  if (!incoming) return null;
  const fromNode = workflowState.nodes.find((node) => node.id === incoming.from);
  return fromNode || null;
}

function refreshTableFromUpstream(tableNode) {
  const source = getUpstreamNode(tableNode);
  if (!source) {
    setWorkflowStatus("Tabela sem bloco anterior conectado.", "warning");
    setNodeExecutionStatus(tableNode, "warning");
    return;
  }
  const item = getNodeOutputItem(source);
  if (item === undefined) {
    setWorkflowStatus("Erro ao ler a lista dinamica do bloco anterior.", "error");
    setNodeExecutionStatus(tableNode, "error");
    return;
  }
  applyTableDataToNode(tableNode, item, source.id);
  saveWorkflowState();
  renderWorkflow();
  renderWorkflowInspectorPanel();
  setWorkflowStatus("Tabela atualizada.", "success");
}

function executeFilterNode(node) {
  ensureFilterConditions(node);
  const source = getUpstreamNode(node);
  if (!source) {
    setWorkflowStatus("Filtro sem bloco anterior conectado.", "warning");
    setNodeExecutionStatus(node, "warning");
    return { ok: false, reason: "missing-upstream" };
  }
  const item = getNodeOutputItem(source);
  if (item === undefined) {
    setWorkflowStatus("Bloco anterior ainda nao possui lista dinamica.", "warning");
    setNodeExecutionStatus(node, "warning");
    return { ok: false, reason: "missing-item" };
  }
  if (!isFilterableItem(item)) {
    setWorkflowStatus("Nao foi possivel interpretar a lista dinamica anterior.", "error");
    setNodeExecutionStatus(node, "error");
    return { ok: false, reason: "invalid-item" };
  }

  const conditions = (node.config?.conditions || []).map(normalizeConditionRow);
  const hasValid = conditions.some((cond) => cond.field && cond.operator);
  if (!hasValid) {
    setWorkflowStatus("Defina ao menos uma condicao no filtro.", "warning");
    setNodeExecutionStatus(node, "warning");
    return { ok: false, reason: "missing-conditions" };
  }

  const logic = node.config?.logic || "AND";
  let filtered = null;
  try {
    filtered = applyFilterToItem(item, conditions, logic);
  } catch (err) {
    setWorkflowStatus("Erro ao processar o filtro.", "error");
    setNodeExecutionStatus(node, "error");
    return { ok: false, reason: "filter-error", error: err };
  }
  setNodeOutputItem(node, filtered);
  setNodeExecutionStatus(node, "success");
  propagateNodeOutput(node);
  return { ok: true, value: filtered };
}

async function executeBlockNode(node) {
  const source = getUpstreamNode(node);
  const sourceMode = node.config?.sourceMode || "data";
  const timeSource = node.config?.timeSource || "manual";
  let targets = [];

  if (sourceMode === "manual") {
    targets = parseManualTargets(node.config?.manualTargets).map((target) => ({
      target,
      entry: null,
    }));
    if (!targets.length) {
      setWorkflowStatus("Informe pelo menos um alvo manual.", "warning");
      setNodeExecutionStatus(node, "warning");
      return { ok: false, level: "warning", reason: "empty-manual" };
    }
  } else {
    if (!source) {
      setWorkflowStatus("Bloqueio sem bloco anterior conectado.", "warning");
      setNodeExecutionStatus(node, "warning");
      return { ok: false, level: "warning", reason: "missing-upstream" };
    }

    const item = getNodeOutputItem(source);
    if (item === undefined) {
      setWorkflowStatus(
        "Nao foi possivel recuperar a lista dinamica do bloco anterior.",
        "warning"
      );
      setNodeExecutionStatus(node, "warning");
      return { ok: false, level: "warning", reason: "missing-item" };
    }

    const sourceItem = getBlockSourceItem(item, node.config || {});
    if (sourceItem === undefined || sourceItem === null) {
      setWorkflowStatus(
        "Nao foi possivel recuperar os itens da lista dinamica do bloco anterior.",
        "warning"
      );
      setNodeExecutionStatus(node, "warning");
      return { ok: false, level: "warning", reason: "missing-source" };
    }
    if (Array.isArray(sourceItem) && sourceItem.length === 0) {
      setWorkflowStatus("Nenhum item para bloqueio.", "warning");
      setNodeExecutionStatus(node, "warning");
      return { ok: false, level: "warning", reason: "empty-items" };
    }

    try {
      targets = buildBlockTargets(sourceItem, node.config || {});
    } catch (err) {
      setWorkflowStatus("Erro ao processar o bloco de bloqueio.", "error");
      setNodeExecutionStatus(node, "error");
      return { ok: false, level: "error", reason: "process-error", error: err };
    }

    if (!targets.length) {
      setWorkflowStatus(
        "Nao foi possivel interpretar os itens da lista dinamica anterior.",
        "error"
      );
      setNodeExecutionStatus(node, "error");
      return { ok: false, level: "error", reason: "no-targets" };
    }
  }

  const validationTarget = targets[0]?.target ?? targets[0];
  const validation = buildBlockSchedulePayload(
    node.config || {},
    validationTarget,
    { skipTimeValidation: timeSource === "dynamic" }
  );
  if (validation.error) {
    setWorkflowStatus(validation.error, "warning");
    setNodeExecutionStatus(node, "warning");
    return { ok: false, level: "warning", reason: "invalid-config" };
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
  const responses = [];
  let successCount = 0;
  let failedCount = 0;
  let lastStatus = null;
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
      responses.push({ target, ok: false, error: error || "Payload invalido." });
      continue;
    }
    try {
      const response = await apiFetch("/api/schedules", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      lastStatus = response.status;
      let data = null;
      try {
        data = await response.json();
      } catch {
        data = null;
      }
      if (!response.ok) {
        failedCount += 1;
        responses.push({
          target,
          ok: false,
          status: response.status,
          error: data?.error || "Falha ao criar agendamento.",
        });
        continue;
      }
      const apiFailure = getApiFailureDetails(data?.api);
      if (apiFailure) {
        failedCount += 1;
        responses.push({
          target,
          ok: false,
          status: response.status,
          error: apiFailure.message,
          detail: apiFailure.detail,
        });
        continue;
      }
      successCount += 1;
      responses.push({
        target,
        ok: true,
        status: response.status,
        scheduleId: data?.schedule?.id || null,
      });
    } catch (err) {
      failedCount += 1;
      responses.push({
        target,
        ok: false,
        error: err?.message || "Falha ao chamar API.",
      });
    }
  }

  node.lastResult = {
    kind: "block",
    ok: failedCount === 0 && successCount > 0,
    status: lastStatus,
    total: targetList.length,
    successCount,
    failedCount,
    targets: targetList,
    responses,
  };
  node.lastRunAt = new Date().toISOString();

  setNodeOutputItem(node, configuredItems);

  if (successCount === 0) {
    setNodeExecutionStatus(node, "error");
    return { ok: false, level: "error", reason: "all-failed" };
  }
  if (failedCount > 0) {
    setNodeExecutionStatus(node, "warning");
    propagateNodeOutput(node);
    return { ok: true, level: "warning", value: output };
  }

  setNodeExecutionStatus(node, "success");
  propagateNodeOutput(node);
  return { ok: true, level: "success", value: output };
}

async function executeWebhookNode(node) {
  applyFixedConfig(node);
  const start = performance.now();
  const timeoutSeconds = normalizeTimeoutSeconds(node.config?.timeoutSeconds);
  const result = {
    ok: false,
    status: null,
    statusText: "",
    url: "",
    elapsedMs: null,
    headers: null,
    bodyText: "",
    bodyJson: null,
    warning: null,
    error: null,
    timedOut: false,
  };

  try {
    const { url, options, warning } = buildWebhookRequest(node);
    result.warning = warning;
    const response = await fetchWithTimeout(url, options, timeoutSeconds);
    const elapsed = Math.round(performance.now() - start);
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
    result.elapsedMs = elapsed;
    result.headers = Object.fromEntries(response.headers.entries());
    result.bodyText =
      text.length > WORKFLOW_RESULT_LIMIT
        ? `${text.slice(0, WORKFLOW_RESULT_LIMIT)}\n...`
        : text;
    result.bodyJson = json;
    setNodeExecutionStatus(node, response.ok ? "success" : "error");
  } catch (err) {
    const isTimeout = err?.name === "AbortError" || err?.name === "TimeoutError";
    result.error = isTimeout
      ? `Timeout excedido (${timeoutSeconds}s).`
      : err?.message || "Falha ao executar webhook.";
    result.timedOut = isTimeout;
    const message = String(result.error).toLowerCase();
    if (message.includes("obrigator")) {
      setNodeExecutionStatus(node, "warning");
    } else {
      setNodeExecutionStatus(node, "error");
    }
  }

  node.lastResult = result;
  node.lastRunAt = new Date().toISOString();
  const item = getNodeDefaultItem(node, result);
  setNodeOutputItem(node, item);
  propagateNodeOutput(node);
  saveWorkflowState();
  renderWorkflow();
  renderWorkflowInspectorPanel();
  renderWorkflowResponseModal();

  return result;
}

async function executeXoneDataNode(node) {
  const start = performance.now();
  const timeoutSeconds = normalizeTimeoutSeconds(node.config?.timeoutSeconds);
  const result = {
    kind: "xone-data",
    ok: false,
    status: null,
    statusText: "",
    url: "/api/xone-data",
    elapsedMs: null,
    bodyText: "",
    bodyJson: null,
    error: null,
    timedOut: false,
  };

  const endpoint = String(node.config?.endpoint || "").trim();
  if (!endpoint) {
    result.error = "Endpoint obrigatorio.";
    setNodeExecutionStatus(node, "warning");
    node.lastResult = result;
    node.lastRunAt = new Date().toISOString();
    setNodeOutputItem(node, []);
    propagateNodeOutput(node);
    saveWorkflowState();
    renderWorkflow();
    renderWorkflowInspectorPanel();
    renderWorkflowResponseModal();
    return result;
  }

  const templateContext = getTemplateContextForNode(node);
  const filterTemplate = node.config?.filters || "";
  const filterResult = interpolateTemplateString(filterTemplate, templateContext);

  const payload = {
    endpoint,
    checkpointEnabled: node.config?.checkpointEnabled !== "no",
    checkpointField: String(node.config?.checkpointField || "").trim() || "created_date_local",
    checkpointOperator: String(node.config?.checkpointOperator || "").trim() || "gt",
    limit: normalizeNumber(node.config?.limit),
    timeoutSeconds,
    filters: filterResult.text || "",
  };
  if (payload.checkpointEnabled) {
    const checkpointValue = String(node.config?.checkpointValue || "").trim();
    if (checkpointValue) {
      payload.checkpointValue = checkpointValue;
    }
    if (node.config?.checkpointOverride === true) {
      payload.checkpointOverride = true;
    }
  }

  try {
    if (filterResult.missing.length) {
      const missingLabels = filterResult.missing.map((item) =>
        item.startsWith("{{") ? item : `{{${item}}}`
      );
      result.warning =
        "Variaveis nao encontradas no filtro: " +
        missingLabels.join(", ") +
        ".";
      setWorkflowStatus(
        "Algumas variaveis do filtro nao foram encontradas e foram enviadas vazias.",
        "warning",
        { duration: 4500 }
      );
    }
    const response = await apiFetch("/api/xone-data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const elapsed = Math.round(performance.now() - start);
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
    result.elapsedMs = elapsed;
    result.bodyText =
      text.length > WORKFLOW_RESULT_LIMIT
        ? `${text.slice(0, WORKFLOW_RESULT_LIMIT)}\n...`
        : text;
    result.bodyJson = json;
    if (!response.ok) {
      result.error = json?.error || text || "Falha ao coletar dados xOne.";
      setNodeExecutionStatus(node, "error");
    } else {
      setNodeExecutionStatus(node, "success");
      if (node.config?.checkpointOverride) {
        node.config.checkpointOverride = false;
      }
    }
  } catch (err) {
    const isTimeout = err?.name === "AbortError" || err?.name === "TimeoutError";
    result.error = isTimeout
      ? `Timeout excedido (${timeoutSeconds}s).`
      : err?.message || "Falha ao coletar dados xOne.";
    result.timedOut = isTimeout;
    if (String(result.error).toLowerCase().includes("obrigator")) {
      setNodeExecutionStatus(node, "warning");
    } else {
      setNodeExecutionStatus(node, "error");
    }
  }

  node.lastResult = result;
  node.lastRunAt = new Date().toISOString();
  const records = Array.isArray(result.bodyJson) ? result.bodyJson : [];
  setNodeOutputItem(node, records);
  propagateNodeOutput(node);
  saveWorkflowState();
  renderWorkflow();
  renderWorkflowInspectorPanel();
  renderWorkflowResponseModal();

  return result;
}

function bindWorkflowNodeDrag(nodeEl, node) {
  nodeEl.addEventListener("pointerdown", (event) => {
    if (event.target.closest(".node-delete")) {
      return;
    }
    if (event.target.closest(".node-port")) {
      return;
    }
    if (workflowSpaceDown) {
      return;
    }
    if (workflowState.connectingFrom) {
      clearWorkflowConnection();
    }
    if (event.button !== 0) return;
    event.preventDefault();
    selectWorkflowNode(node.id, { render: false });
    const start = screenToWorld(event.clientX, event.clientY);
    const offsetX = start.x - node.position.x;
    const offsetY = start.y - node.position.y;
    const pointerId = event.pointerId;
    if (nodeEl.setPointerCapture) {
      nodeEl.setPointerCapture(pointerId);
    }

    const handleMove = (moveEvent) => {
      const next = screenToWorld(moveEvent.clientX, moveEvent.clientY);
      const nextX = next.x - offsetX;
      const nextY = next.y - offsetY;
      node.position.x = Math.max(8, nextX);
      node.position.y = Math.max(8, nextY);
      nodeEl.style.left = `${node.position.x}px`;
      nodeEl.style.top = `${node.position.y}px`;
      scheduleWorkflowEdgesRender();
    };

    const handleUp = () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
      if (nodeEl.releasePointerCapture) {
        nodeEl.releasePointerCapture(pointerId);
      }
      saveWorkflowState();
      scheduleWorkflowEdgesRender();
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
  });
}

function renderWorkflowPalette() {
  if (!workflowPalette) return;
  workflowPalette.innerHTML = "";
  const groups = new Map();
  WORKFLOW_BRICKS.forEach((brick) => {
    const group = brick.group || "Bloco";
    if (!groups.has(group)) groups.set(group, []);
    groups.get(group).push(brick);
  });

  groups.forEach((items, group) => {
    const section = document.createElement("div");
    section.className = "brick-group";

    const header = document.createElement("div");
    header.className = "brick-group-title";
    header.textContent = group.toUpperCase();
    section.append(header);

    items.forEach((brick) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "brick-tile";
      button.setAttribute("draggable", "true");
      button.dataset.brick = brick.type;

      const grip = document.createElement("span");
      grip.className = "brick-grip";

      const icon = document.createElement("span");
      icon.className = `brick-icon is-${brick.type}`;
      icon.innerHTML = getBrickIconSvg(brick.type);

      const info = document.createElement("span");
      info.className = "brick-info";

      const title = document.createElement("span");
      title.className = "brick-title";
      title.textContent = brick.title;

      const subtitle = document.createElement("span");
      subtitle.className = "brick-subtitle";
      subtitle.textContent = brick.subtitle;

      info.append(title, subtitle);
      button.append(grip, icon, info);
      section.append(button);
    });

    workflowPalette.append(section);
  });

  if (workflowBricksCount) {
    workflowBricksCount.textContent = `${WORKFLOW_BRICKS.length}`;
  }
}

function renderWorkflow() {
  if (!workflowNodesLayer) return;
  workflowNodesLayer.innerHTML = "";
  const hasNodes = workflowState.nodes.length > 0;
  if (workflowEmpty) {
    workflowEmpty.style.display = hasNodes ? "none" : "grid";
  }
  workflowState.nodes.forEach((node) => {
    const def = getWorkflowBrick(node.type);
    const nodeEl = document.createElement("div");
    nodeEl.className = "workflow-node";
    if (node.id === workflowState.selectedNodeId) {
      nodeEl.classList.add("is-selected");
    }
    if (node.type === "filter") {
      nodeEl.classList.add("is-filter");
    }
  if (node.execStatus === "success") {
    nodeEl.classList.add("is-success");
  } else if (node.execStatus === "error") {
    nodeEl.classList.add("is-error");
  } else if (node.execStatus === "warning") {
    nodeEl.classList.add("is-warning");
  }
    nodeEl.style.left = `${node.position.x}px`;
    nodeEl.style.top = `${node.position.y}px`;
    nodeEl.dataset.nodeId = node.id;
    if (node.type === "start") {
      nodeEl.classList.add("is-start");
    }

    const displayTitle = getNodeDisplayName(node, def);

    if (node.type === "start") {
      const removeButton = document.createElement("button");
      removeButton.type = "button";
      removeButton.className = "node-delete start-delete";
      removeButton.setAttribute("aria-label", "Excluir bloco");
      removeButton.textContent = "x";
      removeButton.addEventListener("click", (event) => {
        event.stopPropagation();
        deleteWorkflowNode(node.id);
      });

      const shape = document.createElement("div");
      shape.className = "start-shape";
      const ring = document.createElement("div");
      ring.className = "start-ring";
      const core = document.createElement("div");
      core.className = "start-core";
      ring.append(core);
      shape.append(ring);

      const label = document.createElement("div");
      label.className = "start-label";
      label.textContent = displayTitle || "Inicio";

      const ports = document.createElement("div");
      ports.className = "node-ports";
      const portOut = document.createElement("span");
      portOut.className = "node-port out";
      portOut.dataset.nodeId = node.id;
      portOut.dataset.port = "out";
      if (workflowState.connectingFrom === node.id) {
        portOut.classList.add("is-connecting");
      }
      ports.append(portOut);

      nodeEl.append(removeButton, shape, label, ports);

      nodeEl.addEventListener("click", (event) => {
        event.stopPropagation();
        selectWorkflowNode(node.id, { render: false });
      });

      nodeEl.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        event.stopPropagation();
        selectWorkflowNode(node.id, { render: false });
        openWorkflowMenu(event.clientX, event.clientY, node.id);
      });

      portOut.addEventListener("pointerdown", (event) => {
        event.stopPropagation();
        startWorkflowConnection(node.id, event);
      });

      bindWorkflowNodeDrag(nodeEl, node);
      workflowNodesLayer.append(nodeEl);
      return;
    }

    if (node.type === "filter") {
      const removeButton = document.createElement("button");
      removeButton.type = "button";
      removeButton.className = "node-delete filter-delete";
      removeButton.setAttribute("aria-label", "Excluir bloco");
      removeButton.textContent = "x";
      removeButton.addEventListener("click", (event) => {
        event.stopPropagation();
        deleteWorkflowNode(node.id);
      });

      const shape = document.createElement("div");
      shape.className = "filter-shape";
      const inner = document.createElement("div");
      inner.className = "filter-inner";
      inner.textContent = displayTitle || "Filtro";
      shape.append(inner);

      const meta = document.createElement("div");
      meta.className = "filter-meta";
      meta.textContent = describeNodeConfig(node);

      const ports = document.createElement("div");
      ports.className = "node-ports";
      const portIn = document.createElement("span");
      portIn.className = "node-port in";
      portIn.dataset.nodeId = node.id;
      portIn.dataset.port = "in";
      if (workflowState.connectingFrom && workflowState.connectingFrom !== node.id) {
        portIn.classList.add("is-available");
      }
      const portOut = document.createElement("span");
      portOut.className = "node-port out";
      portOut.dataset.nodeId = node.id;
      portOut.dataset.port = "out";
      if (workflowState.connectingFrom === node.id) {
        portOut.classList.add("is-connecting");
      }
      ports.append(portIn, portOut);

      nodeEl.append(removeButton, shape, meta, ports);

      nodeEl.addEventListener("click", (event) => {
        event.stopPropagation();
        selectWorkflowNode(node.id, { render: false });
      });

      nodeEl.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        event.stopPropagation();
        selectWorkflowNode(node.id, { render: false });
        openWorkflowMenu(event.clientX, event.clientY, node.id);
      });

      portOut.addEventListener("pointerdown", (event) => {
        event.stopPropagation();
        startWorkflowConnection(node.id, event);
      });
      portIn.addEventListener("pointerdown", (event) => {
        event.stopPropagation();
      });

      bindWorkflowNodeDrag(nodeEl, node);
      workflowNodesLayer.append(nodeEl);
      return;
    }

    if (node.type === "block") {
      nodeEl.classList.add("is-block", "is-xone-locker");

      const removeButton = document.createElement("button");
      removeButton.type = "button";
      removeButton.className = "node-delete block-delete";
      removeButton.setAttribute("aria-label", "Excluir bloco");
      removeButton.textContent = "x";
      removeButton.addEventListener("click", (event) => {
        event.stopPropagation();
        deleteWorkflowNode(node.id);
      });

      const targets = getBlockDisplayTargets(node);
      const actionType = Number(node.config?.actionType ?? 0);
      const targetType = Number(node.config?.targetType ?? 0);
      const actionLabel = ACTION_LABEL[actionType] || "Acao";
      const targetLabel = TARGET_LABEL[targetType] || "Alvo";
      const primaryTarget = targets[0] || "-";
      const targetCount = targets.length;
      const targetSuffix =
        targetCount > 1 ? ` (+${targetCount - 1})` : "";

      const blockHeader = document.createElement("div");
      blockHeader.className = "block-header";
      const customName = String(node.config?.name || "").trim();
      const headerTitle = customName || displayTitle || "Bloqueio";
      const headerLabel = document.createElement("div");
      headerLabel.className = "block-header-title";
      headerLabel.textContent = headerTitle;
      headerLabel.title = headerTitle;
      blockHeader.append(headerLabel);

      const avatar = document.createElement("div");
      avatar.className = "block-avatar";
      const icon = document.createElement("img");
      icon.src = "icons/xone-icon-x-square.svg";
      icon.alt = "";
      icon.className = "is-xone";
      avatar.append(icon);

      const main = document.createElement("div");
      main.className = "block-main";
      const title = document.createElement("div");
      title.className = "block-title";
      title.textContent = `${targetLabel}: ${primaryTarget}${targetSuffix}`;
      title.title = title.textContent;
      const subtitle = document.createElement("div");
      subtitle.className = "block-sub";
      const pluralTargetLabel =
        targetLabel === "Usuario"
          ? "Usuarios"
          : targetLabel === "Hostname"
            ? "Hostnames"
            : `${targetLabel}s`;
      subtitle.textContent = `${pluralTargetLabel}: ${targetCount}`;
      main.append(title, subtitle);

      const body = document.createElement("div");
      body.className = "block-body";
      body.append(avatar, main);

      const meta = document.createElement("div");
      meta.className = "block-meta";
      const startDate = node.config?.startDate || null;
      const endDate = node.config?.endDate || null;
      const scheduleType = Number(node.config?.scheduleType ?? 0);
      const nextValue =
        scheduleType === 0
          ? startDate
            ? formatDate(startDate)
            : "-"
          : startDate
          ? formatDate(startDate)
          : "-";
      const lastRun = node.lastRunAt
        ? `${actionLabel} - ${formatDate(node.lastRunAt)}`
        : "-";
      const nextLine = document.createElement("div");
      nextLine.textContent = `Proxima: ${nextValue}`;
      const lastLine = document.createElement("div");
      lastLine.textContent = `Ultima: ${lastRun}`;
      meta.append(nextLine, lastLine);

      const statusBadge = document.createElement("span");
      statusBadge.className = "badge na";
      const statusValue = node.lastResult?.status || "-";
      if (node.execStatus === "success") {
        statusBadge.className = "badge ok";
        statusBadge.textContent = `Sucesso (${statusValue})`;
      } else if (node.execStatus === "error") {
        statusBadge.className = "badge err";
        statusBadge.textContent = `Erro (${statusValue})`;
      } else if (node.execStatus === "warning") {
        statusBadge.className = "badge na";
        statusBadge.textContent = "Parcial";
      } else {
        statusBadge.className = "badge na";
        statusBadge.textContent = "Sem execucao";
      }

      const isExpired =
        endDate && !Number.isNaN(new Date(endDate).getTime())
          ? new Date(endDate) < new Date()
          : false;
      let expiredBadge = null;
      if (isExpired) {
        expiredBadge = document.createElement("span");
        expiredBadge.className = "badge state-expired";
        expiredBadge.textContent = "Expirado";
      }

      const actions = document.createElement("div");
      actions.className = "block-actions";
      actions.append(statusBadge);
      if (expiredBadge) actions.append(expiredBadge);
      const scheduleChip = document.createElement("div");
      scheduleChip.className = "block-chip";
      const scheduleCount = node.lastResult?.successCount ?? targetCount;
      scheduleChip.textContent = `Agendamentos (${scheduleCount})`;

      const kebab = document.createElement("button");
      kebab.type = "button";
      kebab.className = "icon-btn block-kebab";
      kebab.setAttribute("aria-label", "Acoes");
      const kebabIcon = document.createElement("img");
      kebabIcon.src = "icons/kebab.svg";
      kebabIcon.alt = "";
      kebab.append(kebabIcon);
      kebab.addEventListener("click", (event) => {
        event.stopPropagation();
        openWorkflowMenu(event.clientX, event.clientY, node.id);
      });

      actions.append(scheduleChip);

      const responseChip = document.createElement("button");
      responseChip.type = "button";
      responseChip.className = "block-chip block-chip-action";
      responseChip.textContent = "Ver retorno";
      responseChip.addEventListener("pointerdown", (event) => {
        event.stopPropagation();
      });
      responseChip.addEventListener("click", (event) => {
        event.stopPropagation();
        openWorkflowResponseModal(node.id);
      });
      actions.append(responseChip);

      const ports = document.createElement("div");
      ports.className = "node-ports";
      const portIn = document.createElement("span");
      portIn.className = "node-port in";
      portIn.dataset.nodeId = node.id;
      portIn.dataset.port = "in";
      if (workflowState.connectingFrom && workflowState.connectingFrom !== node.id) {
        portIn.classList.add("is-available");
      }
      const portOut = document.createElement("span");
      portOut.className = "node-port out";
      portOut.dataset.nodeId = node.id;
      portOut.dataset.port = "out";
      if (workflowState.connectingFrom === node.id) {
        portOut.classList.add("is-connecting");
      }
      ports.append(portIn, portOut);

      nodeEl.append(removeButton, blockHeader, body, meta, actions, ports);

      nodeEl.addEventListener("click", (event) => {
        event.stopPropagation();
        selectWorkflowNode(node.id, { render: false });
      });

      nodeEl.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        event.stopPropagation();
        selectWorkflowNode(node.id, { render: false });
        openWorkflowMenu(event.clientX, event.clientY, node.id);
      });

      portOut.addEventListener("pointerdown", (event) => {
        event.stopPropagation();
        startWorkflowConnection(node.id, event);
      });
      portIn.addEventListener("pointerdown", (event) => {
        event.stopPropagation();
      });

      bindWorkflowNodeDrag(nodeEl, node);
      workflowNodesLayer.append(nodeEl);
      return;
    }

    if (node.type === "xone-collaborators") {
      nodeEl.classList.add("is-block", "is-xone-collaborators");

      const removeButton = document.createElement("button");
      removeButton.type = "button";
      removeButton.className = "node-delete block-delete";
      removeButton.setAttribute("aria-label", "Excluir bloco");
      removeButton.textContent = "x";
      removeButton.addEventListener("click", (event) => {
        event.stopPropagation();
        deleteWorkflowNode(node.id);
      });

      const blockHeader = document.createElement("div");
      blockHeader.className = "block-header";
      const headerLabel = document.createElement("div");
      headerLabel.className = "block-header-title";
      headerLabel.textContent = displayTitle || "Get xOne Collaborators";
      headerLabel.title = headerLabel.textContent;
      blockHeader.append(headerLabel);

      const avatar = document.createElement("div");
      avatar.className = "block-avatar";
      const icon = document.createElement("img");
      icon.src = "icons/xone-icon-x-square.svg";
      icon.alt = "";
      icon.className = "is-xone";
      avatar.append(icon);

      const endpoint =
        def?.fixedConfig?.url ||
        String(node.config?.url || "").trim() ||
        "register-api.xonecloud.com/collaborators/api/v1";

      const main = document.createElement("div");
      main.className = "block-main";
      const title = document.createElement("div");
      title.className = "block-title";
      title.textContent = `Endpoint: ${endpoint}`;
      title.title = title.textContent;
      const subtitle = document.createElement("div");
      subtitle.className = "block-sub";
      subtitle.textContent = "Busca colaboradores no xOne";
      main.append(title, subtitle);

      const body = document.createElement("div");
      body.className = "block-body";
      body.append(avatar, main);

      const meta = document.createElement("div");
      meta.className = "block-meta";
      const lastRun = node.lastRunAt ? formatDate(node.lastRunAt) : "-";
      const lastLine = document.createElement("div");
      lastLine.textContent = `Ultima execucao: ${lastRun}`;
      meta.append(lastLine);

      const statusBadge = document.createElement("span");
      statusBadge.className = "badge na";
      const statusValue = node.lastResult?.status || "-";
      if (node.execStatus === "success") {
        statusBadge.className = "badge ok";
        statusBadge.textContent = `Sucesso (${statusValue})`;
      } else if (node.execStatus === "error") {
        statusBadge.className = "badge err";
        statusBadge.textContent = `Erro (${statusValue})`;
      } else if (node.execStatus === "warning") {
        statusBadge.className = "badge na";
        statusBadge.textContent = "Parcial";
      } else {
        statusBadge.className = "badge na";
        statusBadge.textContent = "Sem execucao";
      }

      const actions = document.createElement("div");
      actions.className = "block-actions";
      actions.append(statusBadge);

      const outputItem = getNodeOutputItem(node);
      const count = Array.isArray(outputItem)
        ? outputItem.length
        : outputItem
          ? 1
          : 0;
      const recordsChip = document.createElement("div");
      recordsChip.className = "block-chip";
      recordsChip.textContent = `Colaboradores (${count})`;
      if (!count) recordsChip.classList.add("is-disabled");
      actions.append(recordsChip);

      const responseChip = document.createElement("button");
      responseChip.type = "button";
      responseChip.className = "block-chip block-chip-action";
      responseChip.textContent = "Ver retorno";
      responseChip.addEventListener("pointerdown", (event) => {
        event.stopPropagation();
      });
      responseChip.addEventListener("click", (event) => {
        event.stopPropagation();
        openWorkflowResponseModal(node.id);
      });
      actions.append(responseChip);

      const ports = document.createElement("div");
      ports.className = "node-ports";
      const portIn = document.createElement("span");
      portIn.className = "node-port in";
      portIn.dataset.nodeId = node.id;
      portIn.dataset.port = "in";
      if (workflowState.connectingFrom && workflowState.connectingFrom !== node.id) {
        portIn.classList.add("is-available");
      }
      const portOut = document.createElement("span");
      portOut.className = "node-port out";
      portOut.dataset.nodeId = node.id;
      portOut.dataset.port = "out";
      if (workflowState.connectingFrom === node.id) {
        portOut.classList.add("is-connecting");
      }
      ports.append(portIn, portOut);

      nodeEl.append(removeButton, blockHeader, body, meta, actions, ports);

      nodeEl.addEventListener("click", (event) => {
        event.stopPropagation();
        selectWorkflowNode(node.id, { render: false });
      });

      nodeEl.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        event.stopPropagation();
        selectWorkflowNode(node.id, { render: false });
        openWorkflowMenu(event.clientX, event.clientY, node.id);
      });

      portOut.addEventListener("pointerdown", (event) => {
        event.stopPropagation();
        startWorkflowConnection(node.id, event);
      });
      portIn.addEventListener("pointerdown", (event) => {
        event.stopPropagation();
      });

      bindWorkflowNodeDrag(nodeEl, node);
      workflowNodesLayer.append(nodeEl);
      return;
    }

    if (node.type === "xone-data") {
      nodeEl.classList.add("is-block", "is-xone-data");

      const removeButton = document.createElement("button");
      removeButton.type = "button";
      removeButton.className = "node-delete block-delete";
      removeButton.setAttribute("aria-label", "Excluir bloco");
      removeButton.textContent = "x";
      removeButton.addEventListener("click", (event) => {
        event.stopPropagation();
        deleteWorkflowNode(node.id);
      });

      const blockHeader = document.createElement("div");
      blockHeader.className = "block-header";
      const headerLabel = document.createElement("div");
      headerLabel.className = "block-header-title";
      headerLabel.textContent = displayTitle || "xOne Data";
      headerLabel.title = headerLabel.textContent;
      blockHeader.append(headerLabel);

      const avatar = document.createElement("div");
      avatar.className = "block-avatar";
      const icon = document.createElement("img");
      icon.src = "icons/xone-icon-x-square.svg";
      icon.alt = "";
      icon.className = "is-xone";
      avatar.append(icon);

      const endpoint = String(node.config?.endpoint || "").trim() || "-";
      const checkpointEnabled = node.config?.checkpointEnabled !== "no";
      const checkpointField =
        String(node.config?.checkpointField || "").trim() || "created_date_local";
      const checkpointOperator =
        String(node.config?.checkpointOperator || "").trim() || "gt";
      const checkpointValue = String(node.config?.checkpointValue || "").trim();
      const checkpointLabel = checkpointEnabled
        ? `${checkpointField} ${checkpointOperator} ${checkpointValue || "-"}`
        : "desativado";

      const main = document.createElement("div");
      main.className = "block-main";
      const title = document.createElement("div");
      title.className = "block-title";
      title.textContent = `Endpoint: ${endpoint}`;
      title.title = title.textContent;
      const subtitle = document.createElement("div");
      subtitle.className = "block-sub";
      subtitle.textContent = checkpointEnabled ? "Incremental ativo" : "Incremental desativado";
      main.append(title, subtitle);

      const body = document.createElement("div");
      body.className = "block-body";
      body.append(avatar, main);

      const meta = document.createElement("div");
      meta.className = "block-meta";
      const checkpointLine = document.createElement("div");
      checkpointLine.textContent = `Checkpoint: ${checkpointLabel}`;
      const lastRun = node.lastRunAt ? formatDate(node.lastRunAt) : "-";
      const lastLine = document.createElement("div");
      lastLine.textContent = `Ultima execucao: ${lastRun}`;
      meta.append(checkpointLine, lastLine);

      const statusBadge = document.createElement("span");
      statusBadge.className = "badge na";
      const statusValue = node.lastResult?.status || "-";
      if (node.execStatus === "success") {
        statusBadge.className = "badge ok";
        statusBadge.textContent = `Sucesso (${statusValue})`;
      } else if (node.execStatus === "error") {
        statusBadge.className = "badge err";
        statusBadge.textContent = `Erro (${statusValue})`;
      } else if (node.execStatus === "warning") {
        statusBadge.className = "badge na";
        statusBadge.textContent = "Parcial";
      } else {
        statusBadge.className = "badge na";
        statusBadge.textContent = "Sem execucao";
      }

      const actions = document.createElement("div");
      actions.className = "block-actions";
      actions.append(statusBadge);

      const recordsChip = document.createElement("div");
      recordsChip.className = "block-chip";
      const recordsCount = Array.isArray(node.lastResult?.bodyJson)
        ? node.lastResult.bodyJson.length
        : 0;
      recordsChip.textContent = `Registros (${recordsCount})`;
      if (!recordsCount) recordsChip.classList.add("is-disabled");
      actions.append(recordsChip);

      const responseChip = document.createElement("button");
      responseChip.type = "button";
      responseChip.className = "block-chip block-chip-action";
      responseChip.textContent = "Ver retorno";
      responseChip.addEventListener("pointerdown", (event) => {
        event.stopPropagation();
      });
      responseChip.addEventListener("click", (event) => {
        event.stopPropagation();
        openWorkflowResponseModal(node.id);
      });
      actions.append(responseChip);

      const ports = document.createElement("div");
      ports.className = "node-ports";
      const portIn = document.createElement("span");
      portIn.className = "node-port in";
      portIn.dataset.nodeId = node.id;
      portIn.dataset.port = "in";
      if (workflowState.connectingFrom && workflowState.connectingFrom !== node.id) {
        portIn.classList.add("is-available");
      }
      const portOut = document.createElement("span");
      portOut.className = "node-port out";
      portOut.dataset.nodeId = node.id;
      portOut.dataset.port = "out";
      if (workflowState.connectingFrom === node.id) {
        portOut.classList.add("is-connecting");
      }
      ports.append(portIn, portOut);

      nodeEl.append(removeButton, blockHeader, body, meta, actions, ports);

      nodeEl.addEventListener("click", (event) => {
        event.stopPropagation();
        selectWorkflowNode(node.id, { render: false });
      });

      nodeEl.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        event.stopPropagation();
        selectWorkflowNode(node.id, { render: false });
        openWorkflowMenu(event.clientX, event.clientY, node.id);
      });

      portOut.addEventListener("pointerdown", (event) => {
        event.stopPropagation();
        startWorkflowConnection(node.id, event);
      });
      portIn.addEventListener("pointerdown", (event) => {
        event.stopPropagation();
      });

      bindWorkflowNodeDrag(nodeEl, node);
      workflowNodesLayer.append(nodeEl);
      return;
    }

    const header = document.createElement("div");
    header.className = "node-header";

    const title = document.createElement("div");
    title.className = "node-title";
    title.textContent = displayTitle;

    const headerActions = document.createElement("div");
    headerActions.className = "node-actions";

    const tag = document.createElement("div");
    tag.className = "node-tag";
    tag.textContent = def?.group || "Bloco";

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.className = "node-delete";
    removeButton.setAttribute("aria-label", "Excluir bloco");
    removeButton.textContent = "x";
    removeButton.addEventListener("click", (event) => {
      event.stopPropagation();
      deleteWorkflowNode(node.id);
    });

    headerActions.append(tag, removeButton);
    header.append(title, headerActions);

    const subtitle = document.createElement("div");
    subtitle.className = "node-subtitle";
    subtitle.textContent = def?.subtitle || "Acao configuravel";

    const meta = document.createElement("div");
    meta.className = "node-meta";
    meta.textContent = describeNodeConfig(node);

    let tablePreview = null;
    if (node.type === "table") {
      tablePreview = document.createElement("div");
      tablePreview.className = "node-table";
      const metaInfo = document.createElement("div");
      metaInfo.className = "node-table-meta";
      const sourceNode = node.tableData?.sourceNodeId
        ? workflowState.nodes.find(
            (item) => item.id === node.tableData.sourceNodeId
          )
        : null;
      const sourceLabel = sourceNode ? getNodeDisplayName(sourceNode) : "Sem fonte";
      const updatedAt = node.tableData?.updatedAt
        ? new Date(node.tableData.updatedAt).toLocaleString()
        : null;
      const rowsCount = node.tableData?.rows?.length || 0;
      if (rowsCount > 0) {
        metaInfo.textContent = `Tabela carregada: ${rowsCount} linhas`;
        const details = document.createElement("div");
        details.className = "node-table-meta detail";
        details.textContent = updatedAt
          ? `Fonte: ${sourceLabel} - ${updatedAt}`
          : `Fonte: ${sourceLabel}`;
        tablePreview.append(metaInfo, details);
      } else {
        metaInfo.textContent = "Sem dados.";
        tablePreview.append(metaInfo);
      }
    }

    const ports = document.createElement("div");
    ports.className = "node-ports";
    const portIn = document.createElement("span");
    portIn.className = "node-port in";
    portIn.dataset.nodeId = node.id;
    portIn.dataset.port = "in";
    if (workflowState.connectingFrom && workflowState.connectingFrom !== node.id) {
      portIn.classList.add("is-available");
    }
    const portOut = document.createElement("span");
    portOut.className = "node-port out";
    portOut.dataset.nodeId = node.id;
    portOut.dataset.port = "out";
    if (workflowState.connectingFrom === node.id) {
      portOut.classList.add("is-connecting");
    }
    ports.append(portIn, portOut);

    if (tablePreview) {
      nodeEl.append(header, subtitle, tablePreview, ports);
    } else {
      nodeEl.append(header, subtitle, meta, ports);
    }

    nodeEl.addEventListener("click", (event) => {
      event.stopPropagation();
      selectWorkflowNode(node.id, { render: false });
    });

    nodeEl.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      event.stopPropagation();
      selectWorkflowNode(node.id, { render: false });
      openWorkflowMenu(event.clientX, event.clientY, node.id);
    });

    portOut.addEventListener("pointerdown", (event) => {
      event.stopPropagation();
      startWorkflowConnection(node.id, event);
    });
    portIn.addEventListener("pointerdown", (event) => {
      event.stopPropagation();
    });

    bindWorkflowNodeDrag(nodeEl, node);
    workflowNodesLayer.append(nodeEl);
  });

  scheduleWorkflowEdgesRender();
}

function renderWorkflowInspector(targetBody, node, emptyMessage) {
  if (!targetBody) return;
  targetBody.innerHTML = "";
  if (!node) {
    const empty = document.createElement("div");
    empty.className = "inspector-empty";
    empty.textContent =
      emptyMessage || "Selecione um bloco no canvas para configurar.";
    targetBody.append(empty);
    return;
  }

  const draft = getWorkflowInspectorDraft(node);
  const configDraft = draft?.config || node.config || {};

  const def = getWorkflowBrick(node.type);
  const card = document.createElement("div");
  card.className = "inspector-card";

  const title = document.createElement("div");
  title.className = "inspector-title";
  title.textContent = getNodeDisplayName(node, def);

  const type = document.createElement("div");
  type.className = "inspector-type";
  type.textContent = def?.group || "Bloco";

  card.append(title, type);

  if (def?.fields?.length) {
    const form = document.createElement("form");
    form.className = "inspector-form";
    form.addEventListener("submit", (event) => event.preventDefault());

    def.fields.forEach((field) => {
      if (field.dependsOn) {
        const deps = Array.isArray(field.dependsOn)
          ? field.dependsOn
          : [field.dependsOn];
        const isVisible = deps.every((dep) => {
          const currentValue = configDraft?.[dep.key];
          const expectedValues = dep.values || [dep.value];
          return expectedValues.includes(currentValue);
        });
        if (!isVisible) {
          return;
        }
      }
      const label = document.createElement("label");
      if (field.type !== "link") {
        label.textContent = field.label;
      }

      let input = null;
      if (field.type === "conditions") {
        ensureFilterConditions(configDraft);
        const wrapper = document.createElement("div");
        wrapper.className = "conditions-editor";

        const list = document.createElement("div");
        list.className = "conditions-list";

        const operators = [
          { value: "==", label: "==" },
          { value: "!=", label: "!=" },
          { value: ">=", label: ">=" },
          { value: "<=", label: "<=" },
          { value: "contains", label: "contains" },
          { value: "not contains", label: "not contains" },
        ];

        configDraft.conditions.forEach((condition, index) => {
          const row = document.createElement("div");
          row.className = "conditions-row";

          const fieldInput = document.createElement("input");
          fieldInput.type = "text";
          fieldInput.placeholder = "campo (ex: username)";
          fieldInput.value = condition.field || "";

          const operatorSelect = document.createElement("select");
          operators.forEach((operator) => {
            const option = document.createElement("option");
            option.value = operator.value;
            option.textContent = operator.label;
            operatorSelect.append(option);
          });
          operatorSelect.value = condition.operator || "==";

          const valueInput = document.createElement("input");
          valueInput.type = "text";
          valueInput.placeholder = "valor";
          valueInput.value = condition.value ?? "";

          const removeBtn = document.createElement("button");
          removeBtn.type = "button";
          removeBtn.className = "ghost conditions-remove icon-only";
          removeBtn.setAttribute("aria-label", "Remover condicao");
          removeBtn.append(createMiniIcon("trash"));
          removeBtn.addEventListener("click", () => {
            configDraft.conditions.splice(index, 1);
            if (configDraft.conditions.length === 0) {
              configDraft.conditions.push(normalizeConditionRow({}));
            }
            if (draft) draft.dirty = true;
            renderWorkflowInspectorPanel();
            renderWorkflowModal();
          });

          const updateRow = () => {
            configDraft.conditions[index] = normalizeConditionRow({
              field: fieldInput.value,
              operator: operatorSelect.value,
              value: valueInput.value,
            });
            if (draft) draft.dirty = true;
          };

          fieldInput.addEventListener("change", updateRow);
          operatorSelect.addEventListener("change", updateRow);
          valueInput.addEventListener("change", updateRow);

          row.append(fieldInput, operatorSelect, valueInput, removeBtn);
          list.append(row);
        });

        const addBtn = document.createElement("button");
        addBtn.type = "button";
        addBtn.className = "ghost conditions-add btn-icon";
        const addLabel = document.createElement("span");
        addLabel.textContent = "Adicionar condicao";
        addBtn.append(createMiniIcon("plus"), addLabel);
        addBtn.addEventListener("click", () => {
          configDraft.conditions.push(normalizeConditionRow({}));
          if (draft) draft.dirty = true;
          renderWorkflowInspectorPanel();
          renderWorkflowModal();
        });

        wrapper.append(list, addBtn);
        input = wrapper;
      } else if (field.type === "link") {
        input = document.createElement("a");
        input.href = field.href || "#";
        input.target = "_blank";
        input.rel = "noreferrer";
        input.textContent = field.label || "Abrir";
        input.className = "help-link";
      } else if (field.type === "select") {
        input = document.createElement("select");
        (field.options || []).forEach((option) => {
          const optionEl = document.createElement("option");
          optionEl.value = option.value;
          optionEl.textContent = option.label;
          input.append(optionEl);
        });
        const currentValue =
          configDraft?.[field.key] ?? field.default ?? "";
        input.value = currentValue;
      } else if (field.type === "datetime") {
        input = document.createElement("input");
        input.type = "datetime-local";
        const currentValue = configDraft?.[field.key] ?? "";
        input.value = currentValue ? toInputDateTime(currentValue) || currentValue : "";
      } else if (field.type === "time") {
        input = document.createElement("input");
        input.type = "time";
        const currentValue = configDraft?.[field.key] ?? "";
        input.value = currentValue ? normalizeTime(currentValue) : "";
      } else if (field.type === "textarea") {
        input = document.createElement("textarea");
        input.placeholder = field.placeholder || "";
        input.value = configDraft?.[field.key] ?? "";
        if (field.supportsVariables) {
          input.addEventListener("contextmenu", (event) => {
            event.preventDefault();
            event.stopPropagation();
            openWorkflowVariablesMenu(event.clientX, event.clientY, node, input);
          });
        }
      } else {
        input = document.createElement("input");
        if (field.type === "number") {
          input.type = "number";
        } else {
          input.type = field.inputType || "text";
        }
        input.placeholder = field.placeholder || "";
        if (field.storage === "xone-config") {
          const xoneConfig = draft?.xoneConfig || getXoneConfigCache();
          const patchedValue = draft?.xonePatch?.[field.key];
          const storedValue = xoneConfig ? xoneConfig[field.key] : "";
          if (field.key === "clientSecret") {
            input.value = patchedValue || "";
          } else {
            input.value =
              patchedValue !== undefined ? patchedValue : storedValue || "";
          }
          if (!xoneConfig) {
            input.placeholder = "Carregando...";
            input.disabled = true;
            scheduleIdleTask(() => {
              fetchXoneConfig()
                .then(() => {
                  const draftEntry = workflowInspectorDrafts.get(node.id);
                  if (draftEntry) {
                    draftEntry.xoneConfig = {
                      ...getXoneConfigCache(),
                    };
                  }
                  renderWorkflowInspectorPanel();
                  renderWorkflowModal();
                })
                .catch(() => {
                  input.disabled = false;
                });
            });
          } else {
            if (
              field.key === "clientSecret" &&
              xoneConfig.hasClientSecret &&
              !patchedValue
            ) {
              input.placeholder = "********";
            }
          }
        } else {
          input.value = configDraft?.[field.key] ?? "";
          if (node.type === "xone-data" && field.key === "checkpointValue") {
            const endpointValue = String(configDraft?.endpoint || "").trim();
            const manualOverride = configDraft?.checkpointOverride === true;
            const fallback = getTodayIsoDate();
            if (!input.value) {
              input.value = configDraft?.checkpointValue || fallback;
              configDraft.checkpointValue = input.value;
            }
            input.placeholder = fallback;
            if (manualOverride) {
              input.dataset.touched = "1";
            } else if (endpointValue) {
              scheduleIdleTask(() => {
                fetchXoneCheckpoint(endpointValue)
                  .then((checkpoint) => {
                    if (!checkpoint?.lastValue) return;
                    if (input.dataset.touched === "1") return;
                    input.value = checkpoint.lastValue;
                    configDraft.checkpointValue = checkpoint.lastValue;
                    configDraft.checkpointOverride = false;
                    renderWorkflowInspectorPanel();
                    renderWorkflowModal();
                  })
                  .catch(() => {
                    // ignore
                  });
              });
            }
          }
        }
      }

      if (
        field.type !== "conditions" &&
        field.default !== undefined &&
        field.storage !== "xone-config"
      ) {
        const currentConfig = configDraft?.[field.key];
        const hasValue =
          currentConfig !== undefined &&
          currentConfig !== null &&
          currentConfig !== "";
        if (!hasValue) {
          configDraft[field.key] = field.default;
          if (input.value === "" || input.value === null) {
            input.value = field.default;
          }
        }
      }

      if (field.type !== "conditions") {
        input.addEventListener("change", (event) => {
          if (field.storage === "xone-config") {
            const value = event.target.value;
            if (field.key === "clientSecret" && !value) {
              return;
            }
            if (!draft.xoneConfig) {
              draft.xoneConfig = {};
            }
            draft.xonePatch[field.key] = value;
            draft.xoneConfig[field.key] = value;
            draft.xoneDirty = true;
            return;
          }
          configDraft[field.key] = event.target.value;
          if (draft) draft.dirty = true;
          if (node.type === "xone-data" && field.key === "endpoint") {
            const nextEndpoint = String(event.target.value || "").trim();
            xoneCheckpointCache.delete(nextEndpoint);
            configDraft.checkpointOverride = false;
            configDraft.checkpointValue = "";
          }
          if (node.type === "xone-data" && field.key === "checkpointValue") {
            input.dataset.touched = "1";
            configDraft.checkpointOverride = Boolean(
              String(event.target.value || "").trim()
            );
          }
          renderWorkflowInspectorPanel();
          renderWorkflowModal();
        });
      }

      label.append(input);
      if (field.hint) {
        const hint = document.createElement("div");
        hint.className = "field-hint";
        hint.textContent = field.hint;
        label.append(hint);
      }
      if (field.type !== "conditions") {
        const suggestions = getWorkflowFieldSuggestions(
          { ...node, config: configDraft },
          field
        );
        if (
          suggestions.length &&
          input &&
          input.tagName === "INPUT" &&
          input.type === "text"
        ) {
          const listId = `datalist-${node.id}-${field.key}`;
          const dataList = document.createElement("datalist");
          dataList.id = listId;
          suggestions.forEach((value) => {
            const option = document.createElement("option");
            option.value = value;
            dataList.append(option);
          });
          input.setAttribute("list", listId);
          label.append(dataList);
        }
      }
      form.append(label);
    });

    card.append(form);

    const actions = document.createElement("div");
    actions.className = "actions";
    const saveButton = document.createElement("button");
    saveButton.type = "button";
    saveButton.className = "primary btn-icon";
    const saveLabel = document.createElement("span");
    saveLabel.textContent = "Salvar";
    saveButton.append(createMiniIcon("check"), saveLabel);
    saveButton.addEventListener("click", async () => {
      const activeDraft = getWorkflowInspectorDraft(node);
      if (!activeDraft) return;
      node.config = cloneWorkflowConfig(activeDraft.config);
      saveWorkflowState();
      renderWorkflow();
      renderWorkflowInspectorPanel();
      renderWorkflowModal();

      let xoneSaved = false;
      if (activeDraft.xoneDirty && Object.keys(activeDraft.xonePatch).length) {
        try {
          const data = await saveXoneConfig(activeDraft.xonePatch);
          activeDraft.xoneConfig = data ? { ...data } : activeDraft.xoneConfig;
          activeDraft.xonePatch = {};
          activeDraft.xoneDirty = false;
          xoneSaved = true;
        } catch (err) {
          setWorkflowStatus(
            err?.message || "Falha ao salvar configuracao xOne.",
            "error"
          );
          return;
        }
      }

      activeDraft.dirty = false;
      setWorkflowStatus(
        xoneSaved
          ? "Configuracoes salvas. xOne atualizado."
          : "Configuracoes salvas.",
        "success"
      );
      if (workflowModal?.classList.contains("is-open")) {
        closeWorkflowModal();
      }
    });
    actions.append(saveButton);
    card.append(actions);
  } else {
    const info = document.createElement("div");
    info.className = "node-subtitle";
    info.textContent = "Sem configuracoes para este bloco.";
    card.append(info);
  }

  targetBody.append(card);
}

function renderWorkflowInspectorPanel() {
  const node = workflowState.nodes.find(
    (item) => item.id === workflowState.selectedNodeId
  );
  if (workflowInspectorPanel) {
    workflowInspectorPanel.classList.toggle("is-collapsed", !node);
  }
  renderWorkflowInspector(
    workflowInspectorBody,
    node,
    "Selecione um bloco no canvas para configurar."
  );
}

function renderWorkflowModal() {
  if (!workflowModal || !workflowModalBody) return;
  if (!workflowModal.classList.contains("is-open")) return;
  const node = workflowState.nodes.find(
    (item) => item.id === workflowModalNodeId
  );
  if (!node) {
    closeWorkflowModal();
    return;
  }
  renderWorkflowInspector(
    workflowModalBody,
    node,
    "Selecione um bloco para configurar."
  );
}

function initializeWorkflow() {
  if (!workflowPalette || !workflowCanvas) return;
  renderWorkflowPalette();
  setWorkflowPaletteTab("bricks");
  loadWorkflowState();
  updateWorkflowTitle();
  renderWorkflow();
  renderWorkflowInspectorPanel();
  applyWorkflowViewport();

  workflowPalette.addEventListener("dragstart", (event) => {
    const tile = event.target.closest(".brick-tile");
    if (!tile) return;
    event.dataTransfer.setData("text/plain", tile.dataset.brick);
    event.dataTransfer.effectAllowed = "copy";
  });

  workflowPalette.addEventListener("click", (event) => {
    const tile = event.target.closest(".brick-tile");
    if (!tile) return;
    createWorkflowNode(tile.dataset.brick, getDefaultNodePosition());
  });

  workflowCanvas.addEventListener("dragover", (event) => {
    event.preventDefault();
  });

  workflowCanvas.addEventListener("dragenter", () => {
    workflowCanvas.classList.add("is-dragover");
  });

  workflowCanvas.addEventListener("dragleave", (event) => {
    if (!workflowCanvas.contains(event.relatedTarget)) {
      workflowCanvas.classList.remove("is-dragover");
    }
  });

  workflowCanvas.addEventListener("drop", (event) => {
    event.preventDefault();
    workflowCanvas.classList.remove("is-dragover");
    const type = event.dataTransfer.getData("text/plain");
    if (!type) return;
    createWorkflowNode(type, getDropPosition(event));
  });

  workflowCanvas.addEventListener("click", (event) => {
    if (workflowIgnoreClick) {
      workflowIgnoreClick = false;
      return;
    }
    if (event.target.closest(".workflow-chrome")) return;
    if (event.target.closest(".workflow-node")) return;
    if (event.target.closest(".workflow-edge")) return;
    workflowState.selectedNodeId = null;
    workflowState.connectingFrom = null;
    workflowState.connectingPosition = null;
    if (workflowConnectingHoverPort) {
      workflowConnectingHoverPort.classList.remove("is-hover");
      workflowConnectingHoverPort = null;
    }
    saveWorkflowState();
    renderWorkflow();
    renderWorkflowInspectorPanel();
    closeWorkflowEdgeMenu();
  });

  workflowCanvas.addEventListener("pointerdown", (event) => {
    if (event.target.closest(".workflow-chrome")) return;
    if (event.target.closest(".workflow-node")) return;
    if (event.target.closest(".workflow-edge")) return;
    if (workflowState.connectingFrom) return;
    const isLeft = event.button === 0;
    const isMiddle = event.button === 1;
    if (!isLeft && !isMiddle) return;
    workflowPanCandidate = {
      x: event.clientX,
      y: event.clientY,
      startX: workflowViewport.x,
      startY: workflowViewport.y,
      immediate: isMiddle || workflowSpaceDown,
    };
    if (workflowPanCandidate.immediate) {
      event.preventDefault();
      workflowIsPanning = true;
      workflowPanStart = workflowPanCandidate;
      workflowCanvas.classList.add("is-panning");
    }
  });

  workflowCanvas.addEventListener("wheel", (event) => {
    if (!event.ctrlKey && !event.metaKey) return;
    event.preventDefault();
    const direction = event.deltaY > 0 ? -1 : 1;
    const factor = direction > 0 ? 1.08 : 0.92;
    setWorkflowZoom(workflowViewport.scale * factor, event.clientX, event.clientY);
  }, { passive: false });

  window.addEventListener("pointermove", (event) => {
    if (!workflowIsPanning && workflowPanCandidate && !workflowPanCandidate.immediate) {
      const dx = event.clientX - workflowPanCandidate.x;
      const dy = event.clientY - workflowPanCandidate.y;
      if (Math.hypot(dx, dy) > 3) {
        workflowIsPanning = true;
        workflowPanStart = workflowPanCandidate;
        workflowCanvas.classList.add("is-panning");
        workflowIgnoreClick = true;
      }
    }
    if (workflowIsPanning && workflowPanStart) {
      workflowViewport.x =
        workflowPanStart.startX + (event.clientX - workflowPanStart.x);
      workflowViewport.y =
        workflowPanStart.startY + (event.clientY - workflowPanStart.y);
      applyWorkflowViewport();
      return;
    }
    if (!workflowState.connectingFrom) return;
    updateWorkflowConnectingPosition(event.clientX, event.clientY);
  });

  window.addEventListener("pointerup", (event) => {
    if (workflowIsPanning) {
      workflowIsPanning = false;
      workflowPanStart = null;
      workflowPanCandidate = null;
      workflowCanvas.classList.remove("is-panning");
      workflowIgnoreClick = true;
      setTimeout(() => {
        workflowIgnoreClick = false;
      }, 0);
      return;
    }
    workflowPanCandidate = null;
    if (!workflowState.connectingFrom) return;
    finishWorkflowConnection(event);
  });

  window.addEventListener("keydown", (event) => {
    if (event.code === "Space" && !isTypingTarget(event.target)) {
      workflowSpaceDown = true;
      workflowCanvas?.classList.add("is-pan-ready");
      event.preventDefault();
    }
    if (event.key === "Escape") {
      closeWorkflowMenu();
      closeWorkflowEdgeMenu();
      if (workflowModal?.classList.contains("is-open")) {
        closeWorkflowModal();
      }
      clearWorkflowConnection();
    }
  });

  window.addEventListener("keyup", (event) => {
    if (event.code === "Space") {
      workflowSpaceDown = false;
      workflowCanvas?.classList.remove("is-pan-ready");
    }
  });

  if (workflowEdgesLayer) {
    workflowEdgesLayer.addEventListener("contextmenu", (event) => {
      const edgeEl = event.target.closest(".workflow-edge");
      if (!edgeEl) return;
      event.preventDefault();
      event.stopPropagation();
      closeWorkflowMenu();
      closeWorkflowEdgeMenu();
      const edgeId = edgeEl.dataset.edgeId;
      const edge = workflowState.edges.find((item) => item.id === edgeId);
      if (!edge) return;
      openWorkflowEdgeMenu(event.clientX, event.clientY, edge);
    });
  }

  if (workflowClearButton) {
    workflowClearButton.addEventListener("click", async () => {
      const confirmed = await openConfirmModal({
        title: "Novo fluxo",
        message:
          "Antes de abrir um novo fluxo, salve suas alteracoes atuais. Se continuar, todas as configuracoes e interacoes nao salvas serao perdidas.",
        confirmText: "Abrir novo",
      });
      if (!confirmed) return;
      workflowState.nodes = [];
      workflowState.edges = [];
      workflowState.selectedNodeId = null;
      workflowState.connectingFrom = null;
      workflowState.workflowId = null;
      safeStorageRemove(WORKFLOW_ID_KEY);
      safeStorageRemove(WORKFLOW_NAME_KEY);
      saveWorkflowScheduleDraft(null);
      saveWorkflowState();
      renderWorkflow();
      renderWorkflowInspectorPanel();
      updateWorkflowTitle();
      setWorkflowStatus("Fluxo limpo.", "success");
    });
  }

  if (workflowZoomOut) {
    workflowZoomOut.addEventListener("click", () => {
      setWorkflowZoom(workflowViewport.scale - 0.1);
    });
  }
  if (workflowZoomIn) {
    workflowZoomIn.addEventListener("click", () => {
      setWorkflowZoom(workflowViewport.scale + 0.1);
    });
  }
  if (workflowZoomReset) {
    workflowZoomReset.addEventListener("click", () => {
      workflowViewport.scale = 1;
      workflowViewport.x = 0;
      workflowViewport.y = 0;
      applyWorkflowViewport();
    });
  }

  if (workflowSaveButton) {
    workflowSaveButton.addEventListener("click", () => {
      openWorkflowSaveModal();
    });
  }
  if (workflowLoadButton) {
    workflowLoadButton.addEventListener("click", () => {
      openWorkflowLoadModal();
    });
  }

  if (workflowRunButton) {
    workflowRunButton.addEventListener("click", () => {
      const startNode = workflowState.nodes.find((node) => node.type === "start");
      if (!startNode) {
        setWorkflowStatus("Adicione um bloco Inicio para executar.", "warning");
        return;
      }
      executeWorkflowFromStart(startNode);
    });
  }

  if (workflowPaletteToggle && workflowPalettePanel) {
    workflowPaletteToggle.addEventListener("click", (event) => {
      event.stopPropagation();
      workflowPalettePanel.classList.toggle("is-collapsed");
    });
  }
  if (workflowPaletteTabs && workflowPaletteTabs.length) {
    workflowPaletteTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        setWorkflowPaletteTab(tab.dataset.tab || "bricks");
      });
    });
  }
  if (workflowSchedulesList) {
    workflowSchedulesList.addEventListener("click", (event) => {
      const card = event.target.closest(".schedule-card");
      if (!card) return;
      const workflowId = Number(card.dataset.workflowId);
      if (!workflowId) return;
      loadWorkflowFromServer(workflowId);
    });
    workflowSchedulesList.addEventListener("contextmenu", async (event) => {
      const card = event.target.closest(".schedule-card");
      if (!card) return;
      event.preventDefault();
      event.stopPropagation();
      const workflowId = Number(card.dataset.workflowId);
      if (!workflowId) return;
      const schedule = workflowSchedulesCache.find(
        (item) => Number(item.workflow_id) === workflowId
      );
      const hasSchedule = Boolean(schedule?.has_schedule || schedule?.schedule_id);
      openWorkflowScheduleMenu(event.clientX, event.clientY, workflowId, hasSchedule);
    });
    workflowSchedulesList.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      const card = event.target.closest(".schedule-card");
      if (!card) return;
      const workflowId = Number(card.dataset.workflowId);
      if (!workflowId) return;
      event.preventDefault();
      loadWorkflowFromServer(workflowId);
    });
  }

  if (workflowMenu) {
    workflowMenu.addEventListener("click", (event) => {
      const action = event.target.dataset.action;
      if (!action) return;
      if (action === "properties") {
        if (workflowMenuNodeId) {
          openWorkflowModal(workflowMenuNodeId);
        }
      }
      if (action === "run") {
        const node = workflowState.nodes.find(
          (item) => item.id === workflowMenuNodeId
        );
        if (node && node.type === "start") {
          executeWorkflowFromStart(node);
        }
      }
      if (action === "view-response") {
        if (workflowMenuNodeId) {
          openWorkflowResponseModal(workflowMenuNodeId);
        }
      }
      if (action === "refresh-table") {
        const node = workflowState.nodes.find(
          (item) => item.id === workflowMenuNodeId
        );
        if (node && node.type === "table") {
          refreshTableFromUpstream(node);
        }
      }
      if (action === "view-table") {
        if (workflowMenuNodeId) {
          openWorkflowTableModal(workflowMenuNodeId);
        }
      }
      if (action === "view-items") {
        if (workflowMenuNodeId) {
          openWorkflowItemsModal(workflowMenuNodeId);
        }
      }
      if (action === "remove-links") {
        if (workflowMenuNodeId) {
          removeWorkflowNodeEdges(workflowMenuNodeId);
        }
      }
      if (action === "delete") {
        deleteWorkflowNode(workflowMenuNodeId);
      }
      closeWorkflowMenu();
    });

    document.addEventListener("click", (event) => {
      if (workflowMenu.contains(event.target)) return;
      closeWorkflowMenu();
    });
  }

  if (workflowScheduleMenu) {
    workflowScheduleMenu.addEventListener("click", async (event) => {
      const action = event.target.closest("[data-action]")?.dataset?.action;
      if (!action) return;
      const workflowId =
        Number(workflowScheduleMenu.dataset.workflowId) ||
        workflowScheduleMenuWorkflowId;
      if (!workflowId) return;
      if (action === "delete-schedule") {
        const confirmed = await openConfirmModal({
          title: "Confirmar exclusao",
          message: "Deseja remover o agendamento deste fluxo?",
          confirmText: "Excluir",
        });
        if (!confirmed) return;
        await deleteWorkflowSchedule(workflowId);
      }
      if (action === "stats") {
        setWorkflowStatus(
          "Estatistica em breve.",
          "warning",
          { duration: 2500 }
        );
      }
      closeWorkflowScheduleMenu();
    });

    document.addEventListener("click", (event) => {
      if (workflowScheduleMenu.contains(event.target)) return;
      closeWorkflowScheduleMenu();
    });
  }

  if (workflowEdgeMenu) {
    workflowEdgeMenu.addEventListener("click", (event) => {
      const action = event.target.closest("[data-action]")?.dataset?.action;
      if (action === "delete-edge" && workflowMenuEdge?.id) {
        deleteWorkflowEdge(workflowMenuEdge.id);
      }
      closeWorkflowEdgeMenu();
    });

    document.addEventListener("click", (event) => {
      if (workflowEdgeMenu.contains(event.target)) return;
      closeWorkflowEdgeMenu();
    });
  }

  if (workflowLoadBody) {
    workflowLoadBody.addEventListener("click", (event) => {
      const button = event.target.closest("[data-action]");
      if (!button) return;
      const action = button.dataset.action;
      if (action === "load") {
        loadWorkflowFromServer(button.dataset.id);
        return;
      }
      if (action === "delete") {
        const workflowId = Number(button.dataset.id);
        if (!workflowId) return;
        openConfirmModal({
          title: "Confirmar exclusao",
          message: "Deseja excluir este fluxo? Isso remove o agendamento e as execucoes.",
          confirmText: "Excluir",
        }).then((confirmed) => {
          if (!confirmed) return;
          deleteWorkflow(workflowId);
        });
      }
    });
    workflowLoadBody.addEventListener("contextmenu", async (event) => {
      const row = event.target.closest("tr[data-workflow-id]");
      if (!row) return;
      event.preventDefault();
      const workflowId = Number(row.dataset.workflowId);
      if (!workflowId) return;
      const confirmed = await openConfirmModal({
        title: "Confirmar exclusao",
        message: "Deseja excluir este fluxo? Isso remove o agendamento e as execucoes.",
        confirmText: "Excluir",
      });
      if (!confirmed) return;
      await deleteWorkflow(workflowId);
    });
  }

  if (workflowModalClose) {
    workflowModalClose.addEventListener("click", () => {
      closeWorkflowModal();
    });
  }

  if (workflowResponseClose) {
    workflowResponseClose.addEventListener("click", () => {
      closeWorkflowResponseModal();
    });
  }

  if (workflowTableClose) {
    workflowTableClose.addEventListener("click", () => {
      closeWorkflowTableModal();
    });
  }
  if (workflowLoadClose) {
    workflowLoadClose.addEventListener("click", () => {
      closeWorkflowLoadModal();
    });
  }
  if (workflowLoadCancel) {
    workflowLoadCancel.addEventListener("click", () => {
      closeWorkflowLoadModal();
    });
  }
  if (workflowLoadRefresh) {
    workflowLoadRefresh.addEventListener("click", () => {
      fetchWorkflowList();
    });
  }
  if (workflowSaveClose) {
    workflowSaveClose.addEventListener("click", () => {
      closeWorkflowSaveModal();
    });
  }
  if (workflowSaveCancel) {
    workflowSaveCancel.addEventListener("click", () => {
      closeWorkflowSaveModal();
    });
  }
  if (workflowSaveConfirm) {
    workflowSaveConfirm.addEventListener("click", () => {
      saveWorkflowToServer(workflowSaveName?.value || "");
    });
  }
  if (workflowSaveName) {
    workflowSaveName.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        saveWorkflowToServer(workflowSaveName.value || "");
      }
    });
  }
  if (workflowSaveScheduleToggle) {
    workflowSaveScheduleToggle.addEventListener("change", () => {
      updateWorkflowScheduleVisibility();
      if (workflowSaveScheduleToggle.checked && workflowSaveTimezone) {
        if (!workflowSaveTimezone.value.trim()) {
          workflowSaveTimezone.value = getDefaultTimezone();
        }
      }
      captureWorkflowScheduleDraft();
    });
  }
  if (workflowSaveCron) {
    workflowSaveCron.addEventListener("input", () => {
      captureWorkflowScheduleDraft();
    });
  }
  if (workflowSaveTimezone) {
    workflowSaveTimezone.addEventListener("input", () => {
      captureWorkflowScheduleDraft();
    });
  }

  if (workflowModal) {
    workflowModal.addEventListener("click", (event) => {
      if (event.target === workflowModal) {
        closeWorkflowModal();
      }
    });
  }

  if (workflowResponseModal) {
    workflowResponseModal.addEventListener("click", (event) => {
      if (event.target === workflowResponseModal) {
        closeWorkflowResponseModal();
      }
    });
  }

  if (workflowTableModal) {
    workflowTableModal.addEventListener("click", (event) => {
      if (event.target === workflowTableModal) {
        closeWorkflowTableModal();
      }
    });
  }
  if (workflowSaveModal) {
    workflowSaveModal.addEventListener("click", (event) => {
      if (event.target === workflowSaveModal) {
        closeWorkflowSaveModal();
      }
    });
  }
  if (workflowLoadModal) {
    workflowLoadModal.addEventListener("click", (event) => {
      if (event.target === workflowLoadModal) {
        closeWorkflowLoadModal();
      }
    });
  }

  window.addEventListener("resize", () => {
    scheduleWorkflowEdgesRender();
  });
}

navButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    showView(btn.dataset.view);
    if (btn.dataset.view === "control") loadControl();
    if (btn.dataset.view === "audit") loadAudit();
    if (btn.dataset.view === "records") loadRecords(true);
    if (btn.dataset.view === "users") loadUsers();
    if (btn.dataset.view === "token") loadTokens();
  });
});

if (controlSyncButton) {
  controlSyncButton.addEventListener("click", async () => {
    await syncRules();
    await loadControl();
  });
}

if (controlNewButton) {
  controlNewButton.addEventListener("click", () => {
    resetForm();
    showView("ruleForm");
  });
}

if (controlTabs.length) {
  controlTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const nextTab = tab.dataset.controlTab;
      if (!nextTab) return;
      currentControlTab = nextTab;
      controlTabs.forEach((btn) =>
        btn.classList.toggle("is-active", btn.dataset.controlTab === nextTab)
      );
      renderControl();
    });
  });
}

if (controlSearchInput) {
  controlSearchInput.addEventListener("input", (event) => {
    controlFilters.search = event.target.value || "";
    renderControl();
  });
}

if (controlTargetFilter) {
  controlTargetFilter.addEventListener("change", (event) => {
    controlFilters.target = event.target.value || "all";
    renderControl();
  });
}

if (controlStateFilter) {
  controlStateFilter.addEventListener("change", (event) => {
    controlFilters.state = event.target.value || "all";
    renderControl();
  });
}

if (controlActionFilter) {
  controlActionFilter.addEventListener("change", (event) => {
    controlFilters.action = event.target.value || "all";
    renderControl();
  });
}

if (controlOrderSelect) {
  controlOrderSelect.addEventListener("change", (event) => {
    controlFilters.order = event.target.value || "next";
    renderControl();
  });
}

if (controlMenu) {
  document.addEventListener("click", (event) => {
    if (controlMenu.contains(event.target)) return;
    closeControlMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeControlMenu();
  });

  document.addEventListener(
    "scroll",
    () => {
      closeControlMenu();
    },
    true
  );

  controlMenu.addEventListener("click", (event) => {
    const action = event.target.dataset.action;
    if (!action) return;
    const groupId = controlMenu.dataset.groupId;
    if (!groupId) return;
    const group = controlGroupCache.get(groupId);
    if (!group) return;
    handleControlAction(action, group);
    closeControlMenu();
  });
}

if (workflowVariablesMenu) {
  document.addEventListener("click", (event) => {
    if (workflowVariablesMenu.contains(event.target)) return;
    closeWorkflowVariablesMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeWorkflowVariablesMenu();
  });

  document.addEventListener(
    "scroll",
    () => {
      closeWorkflowVariablesMenu();
    },
    true
  );

  workflowVariablesMenu.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const value = target.dataset.value;
    if (!value) return;
    const context = workflowVariablesContext;
    if (!context?.input) return;
    const insertValue = `{{${value}}}`;
    const input = context.input;
    const start = input.selectionStart ?? input.value.length;
    const end = input.selectionEnd ?? input.value.length;
    input.value = `${input.value.slice(0, start)}${insertValue}${input.value.slice(end)}`;
    input.selectionStart = input.selectionEnd = start + insertValue.length;
    if (context.nodeId) {
      const node = workflowState.nodes.find((item) => item.id === context.nodeId);
      if (node) {
        const draft = workflowInspectorDrafts.get(node.id) || null;
        if (draft?.config) {
          draft.config.filters = input.value;
          draft.dirty = true;
        } else if (node.config) {
          node.config.filters = input.value;
        }
      }
      renderWorkflowInspectorPanel();
      renderWorkflowModal();
    }
    closeWorkflowVariablesMenu();
  });
}

if (goRegisterButton) {
  goRegisterButton.addEventListener("click", () => {
    showView("register");
  });
}

if (goLoginButton) {
  goLoginButton.addEventListener("click", () => {
    showView("login");
  });
}

if (loginForm) {
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (loginFeedback) {
      loginFeedback.textContent = "";
      loginFeedback.className = "feedback";
    }
    const formData = new FormData(loginForm);
    const payload = {
      username: formData.get("username"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      password: formData.get("password"),
    };

    try {
      const response = await apiFetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        retryOnNotFound: true,
        body: JSON.stringify(payload),
      });
      let data = null;
      try {
        data = await response.json();
      } catch {
        data = null;
      }
      if (!response.ok) {
        if (loginFeedback) {
          loginFeedback.textContent =
            data?.error || `Falha ao autenticar (status ${response.status}).`;
          loginFeedback.classList.add("is-error");
        }
        return;
      }

      setAuthToken(data.token);
      setRole(data.role || "user");
      loginForm.reset();
      showView("control");
      await loadControl();
    } catch (err) {
      if (loginFeedback) {
        loginFeedback.textContent =
          err?.message || "Falha ao autenticar.";
        loginFeedback.classList.add("is-error");
      }
    }
  });
}

if (registerForm) {
  registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (registerFeedback) {
      registerFeedback.textContent = "";
      registerFeedback.className = "feedback";
    }
    const formData = new FormData(registerForm);
    const payload = {
      username: formData.get("username"),
      password: formData.get("password"),
    };

    try {
      const response = await apiFetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        retryOnNotFound: true,
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) {
        if (registerFeedback) {
          registerFeedback.textContent =
            data?.error || "Falha ao cadastrar.";
          registerFeedback.classList.add("is-error");
        }
        return;
      }

      if (registerFeedback) {
        registerFeedback.textContent =
          "Cadastro enviado. Aguarde aprovacao do admin.";
        registerFeedback.classList.add("is-success");
      }
      registerForm.reset();
    } catch (err) {
      if (registerFeedback) {
        registerFeedback.textContent = "Falha ao cadastrar.";
        registerFeedback.classList.add("is-error");
      }
    }
  });
}

if (logoutButton) {
  logoutButton.addEventListener("click", async () => {
    try {
      await apiFetch("/api/logout", { method: "POST" });
    } catch {
      // ignore
    }
    handleUnauthorized();
  });
}

if (newRuleButton) {
  newRuleButton.addEventListener("click", () => {
    resetForm();
    showView("ruleForm");
  });
}

if (syncRulesButton) {
  syncRulesButton.addEventListener("click", async () => {
    await syncRules();
  });
}

if (backToListButton) {
  backToListButton.addEventListener("click", async () => {
    resetForm();
    showView("control");
    await loadControl();
  });
}

if (cancelRuleButton) {
  cancelRuleButton.addEventListener("click", async () => {
    resetForm();
    showView("control");
    await loadControl();
  });
}

function updateDaysOfWeekState() {
  if (!recurrenceSelect) return;
  const enabled = recurrenceSelect.value !== "";
  dayInputs.forEach((input) => {
    input.disabled = !enabled;
    if (!enabled) input.checked = false;
  });
  if (daysOfWeekGroup) {
    daysOfWeekGroup.style.display = enabled ? "flex" : "none";
  }
}

function updateScheduleVisibility() {
  if (!scheduleTypeSelect) return;
  const isOnce = scheduleTypeSelect.value === "0";

  if (recurrenceField) recurrenceField.style.display = isOnce ? "none" : "";
  if (startTimeField) startTimeField.style.display = isOnce ? "none" : "";
  if (endTimeField) endTimeField.style.display = isOnce ? "none" : "";

  if (isOnce) {
    if (recurrenceSelect) recurrenceSelect.value = "";
    dayInputs.forEach((input) => (input.checked = false));
    updateDaysOfWeekState();
  } else {
    updateDaysOfWeekState();
  }
}

if (recurrenceSelect) {
  recurrenceSelect.addEventListener("change", updateDaysOfWeekState);
}

if (scheduleTypeSelect) {
  scheduleTypeSelect.addEventListener("change", updateScheduleVisibility);
}

if (refreshAuditButton) {
  refreshAuditButton.addEventListener("click", () => {
    loadAudit();
  });
}

if (refreshRecordsButton) {
  refreshRecordsButton.addEventListener("click", () => {
    loadRecords(true);
  });
}

if (refreshUsersButton) {
  refreshUsersButton.addEventListener("click", () => {
    loadUsers();
  });
}

recordTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    currentRecordView = tab.dataset.record;
    recordTabs.forEach((btn) =>
      btn.classList.toggle("is-active", btn.dataset.record === currentRecordView)
    );
    renderRecords();
  });
});

function resetForm() {
  editingId = null;
  ruleForm.reset();
  dayInputs.forEach((input) => (input.checked = false));
  if (remoteIdInput) remoteIdInput.value = "";
  ruleFeedback.textContent = "";
  ruleFeedback.className = "feedback";
  if (formTitle) formTitle.textContent = "Nova regra";
  if (formSubmitButton) formSubmitButton.textContent = "Salvar e chamar API";
  updateScheduleVisibility();
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatDate(value) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleString("pt-BR");
}

const ACTION_LABEL = {
  0: "Lock",
  1: "Unlock",
};

const TARGET_LABEL = {
  0: "User",
  1: "Hostname",
};

const PLANNED_STATE_LABEL = {
  locked: "Bloqueado",
  unlocked: "Desbloqueado",
  unknown: "Indefinido",
  expired: "Expirado",
};

const PLANNED_STATE_CLASS = {
  locked: "state-lock",
  unlocked: "state-unlock",
  unknown: "state-unknown",
  expired: "state-expired",
};

function getStatus(schedule) {
  if (!schedule.last_api_status) {
    return { label: "Nao chamado", className: "na" };
  }
  if (schedule.last_api_status >= 200 && schedule.last_api_status < 300) {
    return { label: `Sucesso (${schedule.last_api_status})`, className: "ok" };
  }
  return { label: `Erro (${schedule.last_api_status})`, className: "err" };
}

function getAuditStatus(log) {
  if (!log.response_status) {
    return { label: "Sem status", className: "na" };
  }
  if (log.response_status >= 200 && log.response_status < 300) {
    return { label: `Sucesso (${log.response_status})`, className: "ok" };
  }
  return { label: `Erro (${log.response_status})`, className: "err" };
}

function getScheduleLabels() {
  return {
    actionType: {
      0: "Lock",
      1: "Unlock",
    },
    scheduleType: {
      0: "Once",
      1: "Recurring",
    },
    targetType: {
      0: "User",
      1: "Hostname",
    },
    recurrenceType: {
      0: "Daily",
      1: "Weekly",
      2: "Monthly",
    },
  };
}

function buildScheduleSummary(schedule) {
  const labels = getScheduleLabels();
  const actionLabel = labels.actionType[schedule.action_type] || "Acao";
  const scheduleLabel = labels.scheduleType[schedule.schedule_type] || "Tipo";
  const recurrenceLabel =
    schedule.schedule_type === 1
      ? labels.recurrenceType[schedule.recurrence_type] || "-"
      : "-";
  const days =
    Array.isArray(schedule.days_of_week) && schedule.days_of_week.length
      ? schedule.days_of_week.join(",")
      : "-";
  const timeRange =
    schedule.start_time || schedule.end_time
      ? `${schedule.start_time || "-"} - ${schedule.end_time || "-"}`
      : "-";

  return {
    actionLabel,
    scheduleLabel,
    recurrenceLabel,
    days,
    timeRange,
    startDate: formatDate(schedule.start_date),
    endDate: formatDate(schedule.end_date),
  };
}

function getScheduleSortTimestamp(schedule) {
  const createdAt = schedule.created_at ? new Date(schedule.created_at) : null;
  if (createdAt && !Number.isNaN(createdAt.getTime())) {
    return createdAt.getTime();
  }
  const startDate = schedule.start_date ? new Date(schedule.start_date) : null;
  if (startDate && !Number.isNaN(startDate.getTime())) {
    return startDate.getTime();
  }
  return Number.MAX_SAFE_INTEGER;
}

function compareSchedulesByQueue(a, b) {
  const aPriority = a.action_type === 1 ? 0 : 1;
  const bPriority = b.action_type === 1 ? 0 : 1;
  if (aPriority !== bPriority) return aPriority - bPriority;

  const aTime = getScheduleSortTimestamp(a);
  const bTime = getScheduleSortTimestamp(b);
  if (aTime !== bTime) return aTime - bTime;

  const aStart = a.start_date ? new Date(a.start_date).getTime() : Number.MAX_SAFE_INTEGER;
  const bStart = b.start_date ? new Date(b.start_date).getTime() : Number.MAX_SAFE_INTEGER;
  if (aStart !== bStart) return aStart - bStart;

  const aId = Number(a.id || 0);
  const bId = Number(b.id || 0);
  return aId - bId;
}

function sortSchedulesForQueue(schedules) {
  return [...(schedules || [])].sort(compareSchedulesByQueue);
}

function openScheduleListModal(group) {
  if (!group) return;
  const targetLabel = TARGET_LABEL[group.targetType] || "Alvo";
  const sorted = group.sortedSchedules || group.schedules || [];
  const lines = sorted.map((schedule) => {
    const summary = buildScheduleSummary(schedule);
    return [
      `${summary.actionLabel} | ${summary.scheduleLabel}`,
      `Inicio: ${summary.startDate}`,
      `Fim: ${summary.endDate}`,
      `Recorrencia: ${summary.recurrenceLabel}`,
      `Dias: ${summary.days}`,
      `Horario: ${summary.timeRange}`,
    ].join(" | ");
  });

  openModal(
    `Agendamentos - ${targetLabel}: ${group.targetValue}`,
    lines.length ? lines.join("\n") : "Sem agendamentos."
  );
}

function toDateOnly(value) {
  const date = new Date(value);
  date.setHours(0, 0, 0, 0);
  return date;
}

function addDays(date, amount) {
  const next = new Date(date);
  next.setDate(next.getDate() + amount);
  return next;
}

function sameDate(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function parseTime(value) {
  if (!value) return null;
  const parts = String(value).split(":");
  const hour = Number(parts[0]);
  const minute = Number(parts[1] || 0);
  if (Number.isNaN(hour) || Number.isNaN(minute)) return null;
  return { hour, minute };
}

function applyTimeToDate(baseDate, timeValue, referenceDate) {
  const result = new Date(baseDate);
  const parsed = parseTime(timeValue);
  if (parsed) {
    result.setHours(parsed.hour, parsed.minute, 0, 0);
    return result;
  }
  if (referenceDate) {
    const reference = new Date(referenceDate);
    result.setHours(reference.getHours(), reference.getMinutes(), 0, 0);
    return result;
  }
  result.setHours(0, 0, 0, 0);
  return result;
}

function occursOnDate(schedule, dateOnly) {
  const scheduleType = Number(schedule.schedule_type ?? 0);
  const startDate = toDateOnly(schedule.start_date);
  const endDate = schedule.end_date ? toDateOnly(schedule.end_date) : null;

  if (dateOnly < startDate) return false;
  if (endDate && dateOnly > endDate) return false;

  if (scheduleType === 0) {
    return sameDate(dateOnly, startDate);
  }

  const recurrenceType = Number(schedule.recurrence_type ?? 0);
  if (recurrenceType === 0) return true;

  if (recurrenceType === 1) {
    const fallback = [startDate.getDay()];
    const days =
      Array.isArray(schedule.days_of_week) && schedule.days_of_week.length
        ? schedule.days_of_week
        : fallback;
    return days.includes(dateOnly.getDay());
  }

  if (recurrenceType === 2) {
    return dateOnly.getDate() === startDate.getDate();
  }

  return false;
}

function getOccurrenceForDate(schedule, dateOnly) {
  if (!occursOnDate(schedule, dateOnly)) return null;
  const start = applyTimeToDate(dateOnly, schedule.start_time, schedule.start_date);
  let end = applyTimeToDate(dateOnly, schedule.end_time, schedule.start_date);

  if (end < start) end = start;

  if (schedule.end_date) {
    const endBoundary = new Date(schedule.end_date);
    if (sameDate(endBoundary, dateOnly) && endBoundary < end) {
      end = endBoundary;
    }
  }

  return { start, end };
}

function findNextOccurrence(schedule, now) {
  const scheduleType = Number(schedule.schedule_type ?? 0);
  const startDate = new Date(schedule.start_date);
  const endDate = schedule.end_date ? new Date(schedule.end_date) : null;

  if (scheduleType === 0) {
    const start = startDate;
    const end = endDate || startDate;
    if (now <= end) {
      return { start, end, isActive: now >= start && now <= end };
    }
    return null;
  }

  let cursor = toDateOnly(now);
  const startDay = toDateOnly(startDate);
  if (cursor < startDay) cursor = startDay;
  const endDay = endDate ? toDateOnly(endDate) : null;

  for (let i = 0; i <= 370; i += 1) {
    const candidate = addDays(cursor, i);
    if (endDay && candidate > endDay) return null;
    const occurrence = getOccurrenceForDate(schedule, candidate);
    if (!occurrence) continue;
    if (occurrence.end < now) continue;
    return {
      start: occurrence.start,
      end: occurrence.end,
      isActive: now >= occurrence.start && now <= occurrence.end,
    };
  }

  return null;
}

function findLastOccurrence(schedule, now) {
  const scheduleType = Number(schedule.schedule_type ?? 0);
  const startDate = new Date(schedule.start_date);
  const endDate = schedule.end_date ? new Date(schedule.end_date) : null;

  if (scheduleType === 0) {
    const start = startDate;
    const end = endDate || startDate;
    if (start <= now) {
      return { start, end };
    }
    return null;
  }

  let cursor = toDateOnly(now);
  const startDay = toDateOnly(startDate);
  const endDay = endDate ? toDateOnly(endDate) : null;

  for (let i = 0; i <= 370; i += 1) {
    const candidate = addDays(cursor, -i);
    if (candidate < startDay) return null;
    if (endDay && candidate > endDay) continue;
    const occurrence = getOccurrenceForDate(schedule, candidate);
    if (!occurrence) continue;
    if (occurrence.end <= now) {
      return { start: occurrence.start, end: occurrence.end };
    }
  }

  return null;
}

function getScheduleOccurrenceInfo(schedule, now) {
  const scheduleType = Number(schedule.schedule_type ?? 0);
  const endDate = schedule.end_date ? new Date(schedule.end_date) : null;
  const expired = endDate ? endDate < now : false;
  const next = findNextOccurrence(schedule, now);
  const last = findLastOccurrence(schedule, now);
  const active = next ? next.isActive : false;

  return {
    active,
    next,
    last,
    expired,
  };
}

function getApiStatusLabel(status) {
  if (!status) {
    return { label: "Nao chamado", className: "na" };
  }
  if (status >= 200 && status < 300) {
    return { label: `Sucesso (${status})`, className: "ok" };
  }
  return { label: `Erro (${status})`, className: "err" };
}

function buildControlItems(schedules) {
  const groups = new Map();
  const now = new Date();

  schedules.forEach((schedule) => {
    const targetValue = schedule.target_value || "-";
    const targetType = Number(schedule.target_type ?? 0);
    const key = `${targetType}:${targetValue}`;
    if (!groups.has(key)) {
      groups.set(key, {
        targetType,
        targetValue,
        schedules: [],
        lockCount: 0,
        unlockCount: 0,
      });
    }
    const group = groups.get(key);
    group.schedules.push(schedule);
    if (schedule.action_type === 0) group.lockCount += 1;
    if (schedule.action_type === 1) group.unlockCount += 1;
  });

  controlGroupCache.clear();
  const items = [];
  let index = 0;

  groups.forEach((group) => {
    const sortedSchedules = sortSchedulesForQueue(group.schedules);
    const queueLeader = sortedSchedules[0] || null;
    let activeCandidate = null;
    let lastCandidate = null;
    let nextCandidate = null;
    let lastApi = null;
    let expiredCount = 0;

    group.schedules.forEach((schedule) => {
      const info = getScheduleOccurrenceInfo(schedule, now);

      if (info.active) {
        const candidate = {
          actionType: schedule.action_type,
          start: info.next?.start,
          schedule,
        };
        if (
          !activeCandidate ||
          (candidate.start && activeCandidate.start && candidate.start > activeCandidate.start) ||
          (candidate.start &&
            activeCandidate.start &&
            candidate.start.getTime() === activeCandidate.start.getTime() &&
            candidate.actionType === 1)
        ) {
          activeCandidate = candidate;
        } else if (!activeCandidate.start && candidate.start) {
          activeCandidate = candidate;
        }
      }

      if (info.last?.start) {
        const candidate = {
          actionType: schedule.action_type,
          start: info.last.start,
          schedule,
        };
        if (
          !lastCandidate ||
          candidate.start > lastCandidate.start ||
          (candidate.start.getTime() === lastCandidate.start.getTime() &&
            candidate.actionType === 1)
        ) {
          lastCandidate = candidate;
        }
      }

      if (info.next?.start) {
        const candidate = {
          actionType: schedule.action_type,
          start: info.next.start,
          schedule,
        };
        if (
          !nextCandidate ||
          candidate.start < nextCandidate.start ||
          (candidate.start.getTime() === nextCandidate.start.getTime() &&
            candidate.actionType === 1)
        ) {
          nextCandidate = candidate;
        }
      }

      if (info.expired) expiredCount += 1;

      if (schedule.last_api_called_at) {
        const calledAt = new Date(schedule.last_api_called_at);
        if (!lastApi || calledAt > lastApi.calledAt) {
          lastApi = {
            status: schedule.last_api_status,
            calledAt,
            schedule,
          };
        }
      } else if (!lastApi && schedule.last_api_status) {
        lastApi = {
          status: schedule.last_api_status,
          calledAt: null,
          schedule,
        };
      }
    });

    let plannedState = "unknown";
    if (queueLeader) {
      plannedState = queueLeader.action_type === 1 ? "unlocked" : "locked";
    }

    const expired = nextCandidate === null && expiredCount === group.schedules.length;
    const displayState = expired ? "expired" : plannedState;

    const representativeSchedule =
      queueLeader || lastCandidate?.schedule || nextCandidate?.schedule || group.schedules[0];
    const lastApiSchedule = lastApi?.schedule || null;

    const searchText = [
      group.targetValue,
      TARGET_LABEL[group.targetType] || "",
      group.schedules.map((item) => item.remote_schedule_id || "").join(" "),
      group.schedules.map((item) => item.message || "").join(" "),
    ]
      .join(" ")
      .toLowerCase();

    const item = {
      id: `group-${index}`,
      targetType: group.targetType,
      targetValue: group.targetValue,
      lockCount: group.lockCount,
      unlockCount: group.unlockCount,
      plannedState,
      displayState,
      nextOccurrence: nextCandidate,
      lastOccurrence: lastCandidate,
      lastApiStatus: lastApi?.status ?? null,
      lastApiCalledAt: lastApi?.calledAt ?? null,
      lastApiSchedule,
      representativeSchedule,
      schedules: group.schedules,
      sortedSchedules,
      searchText,
    };

    controlGroupCache.set(item.id, item);
    items.push(item);
    index += 1;
  });

  return items;
}

async function loadSchedules() {
  if (!rulesFeedback || !rulesList) return;
  rulesFeedback.textContent = "";
  rulesFeedback.className = "feedback";

  try {
    const response = await apiFetch("/api/schedules");
    const data = await response.json();
    renderSchedules(data);
  } catch (err) {
    rulesFeedback.textContent = "Falha ao carregar regras.";
    rulesFeedback.classList.add("is-error");
  }
}

async function loadControl() {
  if (!controlFeedback || !controlVisual || !controlTable) return;
  controlFeedback.textContent = "";
  controlFeedback.className = "feedback";

  try {
    const response = await apiFetch("/api/schedules");
    const data = await response.json();
    const schedules = Array.isArray(data) ? data : [];
    controlItems = buildControlItems(schedules);
    renderControl();
  } catch (err) {
    controlFeedback.textContent = "Falha ao carregar controle.";
    controlFeedback.classList.add("is-error");
  }
}

async function loadAudit() {
  if (!auditFeedback || !auditList) return;
  auditFeedback.textContent = "";
  auditFeedback.className = "feedback";

  try {
    const response = await apiFetch("/api/audit?limit=200");
    const data = await response.json();
    renderAudit(data);
  } catch (err) {
    auditFeedback.textContent = "Falha ao carregar auditoria.";
    auditFeedback.classList.add("is-error");
  }
}

async function loadRecords(force = false) {
  if (!recordsFeedback || !recordsList) return;
  recordsFeedback.textContent = "";
  recordsFeedback.className = "feedback";

  if (force) {
    await syncRecords();
  }

  if (!force && recordCache[currentRecordView]?.length) {
    renderRecords();
    return;
  }

  try {
    const [schedulesRes, userRes, hostRes] = await Promise.all([
      apiFetch("/api/external/schedules"),
      apiFetch("/api/external/user-unlocks"),
      apiFetch("/api/external/hostname-unlocks"),
    ]);

    const schedulesData = await schedulesRes.json();
    const userData = await userRes.json();
    const hostData = await hostRes.json();

    if (!schedulesRes.ok || !userRes.ok || !hostRes.ok) {
      throw new Error("Falha ao buscar registros na API.");
    }

    recordCache.schedules = schedulesData.data || [];
    recordCache["user-unlocks"] = userData.data || [];
    recordCache["hostname-unlocks"] = hostData.data || [];
    renderRecords();
  } catch (err) {
    recordsFeedback.textContent = err.message || "Falha ao carregar registros.";
    recordsFeedback.classList.add("is-error");
  }
}

async function syncRecords() {
  try {
    const response = await apiFetch("/api/sync", { method: "POST" });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data?.error || "Falha ao sincronizar");
    }

    const summary = [
      `Agendamentos: +${data.schedules.inserted} / ~${data.schedules.updated} / -${data.schedules.deleted}`,
      `Usuarios: +${data.userUnlocks.inserted} / ~${data.userUnlocks.updated} / -${data.userUnlocks.deleted}`,
      `Hostnames: +${data.hostnameUnlocks.inserted} / ~${data.hostnameUnlocks.updated} / -${data.hostnameUnlocks.deleted}`,
    ].join(" | ");

    recordsFeedback.textContent = `Sincronizado. ${summary}`;
    recordsFeedback.classList.add("is-success");
  } catch (err) {
    recordsFeedback.textContent = err.message || "Falha ao sincronizar";
    recordsFeedback.classList.add("is-error");
  }
}

async function syncRules() {
  const feedbackTarget = rulesFeedback || controlFeedback;
  try {
    const response = await apiFetch("/api/sync", { method: "POST" });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data?.error || "Falha ao sincronizar");
    }

    const summary = data.schedules
      ? `Agendamentos: +${data.schedules.inserted} / ~${data.schedules.updated} / -${data.schedules.deleted}`
      : "Sincronizado.";

    if (feedbackTarget) {
      feedbackTarget.textContent = `Sincronizado. ${summary}`;
      feedbackTarget.className = "feedback is-success";
    }
    if (rulesList) {
      await loadSchedules();
    }
  } catch (err) {
    if (feedbackTarget) {
      feedbackTarget.textContent = err.message || "Falha ao sincronizar";
      feedbackTarget.className = "feedback is-error";
    }
  }
}

function renderSchedules(schedules) {
  if (!Array.isArray(schedules) || schedules.length === 0) {
    scheduleCache.clear();
    rulesList.innerHTML = "<p class=\"muted\">Nenhuma regra cadastrada.</p>";
    return;
  }

  scheduleCache.clear();
  schedules.forEach((schedule) => scheduleCache.set(String(schedule.id), schedule));

  const rows = schedules
    .map((schedule) => {
      const status = getStatus(schedule);
      const errorNote = schedule.last_api_error
        ? `<div class=\"rule-note\">${escapeHtml(schedule.last_api_error)}</div>`
        : "";
      const targetLabel = TARGET_LABEL[schedule.target_type] || "Alvo";
      const actionLabel = ACTION_LABEL[schedule.action_type] || "Acao";
      const targetValue = schedule.target_value
        ? `: ${escapeHtml(schedule.target_value)}`
        : "";
      return `
        <tr>
          <td class="mono">${escapeHtml(schedule.remote_schedule_id || "-")}</td>
          <td>${escapeHtml(schedule.message)}</td>
          <td>${escapeHtml(targetLabel)}${targetValue}</td>
          <td>${escapeHtml(actionLabel)}</td>
          <td>${formatDate(schedule.start_date)}</td>
          <td>
            <button class="status-btn" data-id="${schedule.id}">
              <span class=\"badge ${status.className}\">${status.label}</span>
            </button>
            ${errorNote}
          </td>
          <td>${formatDate(schedule.last_api_called_at)}</td>
          <td>
            <button class=\"ghost code-btn\" data-id=\"${schedule.id}\">JSON</button>
            <button class=\"ghost delete-btn\" data-id=\"${schedule.id}\">Excluir</button>
          </td>
        </tr>
      `;
    })
    .join("");

  rulesList.innerHTML = `
    <table class=\"table\">
      <thead>
        <tr>
          <th>ID API</th>
          <th>Mensagem</th>
          <th>Alvo</th>
          <th>Acao</th>
          <th>Inicio</th>
          <th>Status API</th>
          <th>Ultima chamada</th>
          <th>Acoes</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
  `;

  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset.id;
      if (!id) return;
      const confirmDelete = window.confirm("Deseja excluir esta regra?");
      if (!confirmDelete) return;
      await deleteSchedule(id);
    });
  });

  document.querySelectorAll(".code-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      if (!id) return;
      const schedule = scheduleCache.get(String(id));
      if (!schedule) return;
      openJsonModal(schedule);
    });
  });

  document.querySelectorAll(".status-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      if (!id) return;
      const schedule = scheduleCache.get(String(id));
      if (!schedule) return;
      openResponseModal(schedule);
    });
  });

  document.querySelectorAll(".edit-btn").forEach((btn) => btn.remove());
}

function applyControlFilters(items) {
  let filtered = items;
  const search = controlFilters.search.trim().toLowerCase();

  if (search) {
    filtered = filtered.filter((item) => item.searchText.includes(search));
  }

  if (controlFilters.target !== "all") {
    const targetType = controlFilters.target === "user" ? 0 : 1;
    filtered = filtered.filter((item) => item.targetType === targetType);
  }

  if (controlFilters.state !== "all") {
    filtered = filtered.filter((item) => item.displayState === controlFilters.state);
  }

  if (controlFilters.action !== "all") {
    const wantLock = controlFilters.action === "lock";
    filtered = filtered.filter((item) =>
      wantLock ? item.lockCount > 0 : item.unlockCount > 0
    );
  }

  const order = controlFilters.order;
  filtered = [...filtered].sort((a, b) => {
    if (order === "last") {
      const aTime = a.lastOccurrence?.start?.getTime() || 0;
      const bTime = b.lastOccurrence?.start?.getTime() || 0;
      return bTime - aTime;
    }
    if (order === "status") {
      const aStatus = a.lastApiStatus || 0;
      const bStatus = b.lastApiStatus || 0;
      return bStatus - aStatus;
    }
    const aTime = a.nextOccurrence?.start?.getTime() || Number.MAX_SAFE_INTEGER;
    const bTime = b.nextOccurrence?.start?.getTime() || Number.MAX_SAFE_INTEGER;
    return aTime - bTime;
  });

  return filtered;
}

function renderControl() {
  if (!controlVisual || !controlTable) return;
  const items = applyControlFilters(controlItems);

  if (currentControlTab === "visual") {
    controlVisual.style.display = "grid";
    controlTable.style.display = "none";
    renderControlVisual(items);
  } else {
    controlVisual.style.display = "none";
    controlTable.style.display = "block";
    renderControlTable(items);
  }
}

function renderControlVisual(items) {
  if (!controlVisual) return;
  if (!items.length) {
    controlVisual.innerHTML = "<p class=\"muted\">Nenhum alvo encontrado.</p>";
    return;
  }

  const now = new Date();
  const rows = items
    .map((item) => {
      const stateLabel = PLANNED_STATE_LABEL[item.displayState] || "Indefinido";
      const stateClass = PLANNED_STATE_CLASS[item.displayState] || "state-unknown";
      const apiStatus = getApiStatusLabel(item.lastApiStatus);
      const nextLabel = item.nextOccurrence
        ? `${ACTION_LABEL[item.nextOccurrence.actionType] || "Acao"} - ${formatDate(
            item.nextOccurrence.start
          )}`
        : "-";
      const lastLabel = item.lastOccurrence
        ? `${ACTION_LABEL[item.lastOccurrence.actionType] || "Acao"} - ${formatDate(
            item.lastOccurrence.start
          )}`
        : "-";
      const targetLabel = TARGET_LABEL[item.targetType] || "Alvo";
      let icon = "icons/monitor-neutral.svg";
      let iconAlt = item.displayState === "expired" ? "Expirado" : "Indefinido";
      if (item.plannedState === "locked") {
        icon = "icons/monitor-locked.svg";
        iconAlt = "Bloqueado";
      } else if (item.plannedState === "unlocked") {
        icon = "icons/monitor-unlocked.svg";
        iconAlt = "Desbloqueado";
      }
      const expiredClass = item.displayState === "expired" ? "is-expired" : "";
      const scheduleRows = (item.sortedSchedules || item.schedules || [])
        .map((schedule) => {
          const summary = buildScheduleSummary(schedule);
          const info = getScheduleOccurrenceInfo(schedule, now);
          const actionClass =
            Number(schedule.action_type) === 1 ? "is-unlock" : "is-lock";
          const expiredClass = info.expired ? "is-expired" : "";
          const deleteButton = schedule.id
            ? `<button class="ghost control-delete-schedule" data-id="${schedule.id}" type="button">Excluir</button>`
            : "";
          return `
            <div class="control-schedule-row ${actionClass} ${expiredClass}">
              <span class="control-schedule-action">${escapeHtml(
                summary.actionLabel
              )}</span>
              <span>${escapeHtml(summary.scheduleLabel)}</span>
              <span>Inicio: ${escapeHtml(summary.startDate)}</span>
              <span>Fim: ${escapeHtml(summary.endDate)}</span>
              <span>Recorrencia: ${escapeHtml(summary.recurrenceLabel)}</span>
              <span>Dias: ${escapeHtml(summary.days)}</span>
              <span>Horario: ${escapeHtml(summary.timeRange)}</span>
              <span class="control-schedule-spacer"></span>
              ${deleteButton}
            </div>
          `;
        })
        .join("");
      return `
        <div class="control-item ${expiredClass}" data-group-id="${item.id}">
          <div class="control-avatar">
            <img src="${icon}" alt="${iconAlt}" />
          </div>
          <div class="control-main">
            <div class="control-title">${escapeHtml(targetLabel)}: ${escapeHtml(
              item.targetValue
            )}</div>
            <div class="control-sub">
              Locks: ${item.lockCount} / Unlocks: ${item.unlockCount}
            </div>
          </div>
          <div class="control-meta">
            <div>Proxima: ${escapeHtml(nextLabel)}</div>
            <div>Ultima: ${escapeHtml(lastLabel)}</div>
          </div>
          <div class="control-status">
            <span class="badge ${stateClass}">${stateLabel}</span>
            <span class="badge ${apiStatus.className}">${apiStatus.label}</span>
          </div>
          <button class="control-menu-trigger icon-btn" data-group-id="${item.id}" type="button" aria-label="Acoes">
            <img src="icons/kebab.svg" alt="" />
          </button>
          <div class="control-schedule-actions">
            <button class="ghost control-expand-btn" data-group-id="${item.id}" type="button">
              Agendamentos (${item.schedules?.length || 0})
            </button>
          </div>
          <div class="control-schedule-list">
            ${scheduleRows || "<div class=\"muted\">Sem agendamentos.</div>"}
          </div>
        </div>
      `;
    })
    .join("");

  controlVisual.innerHTML = rows;
  attachControlItemEvents();
}

function renderControlTable(items) {
  if (!controlTable) return;
  if (!items.length) {
    controlTable.innerHTML = "<p class=\"muted\">Nenhum alvo encontrado.</p>";
    return;
  }

  const rows = items
    .map((item) => {
      const stateLabel = PLANNED_STATE_LABEL[item.displayState] || "Indefinido";
      const stateClass = PLANNED_STATE_CLASS[item.displayState] || "state-unknown";
      const apiStatus = getApiStatusLabel(item.lastApiStatus);
      const nextLabel = item.nextOccurrence
        ? `${ACTION_LABEL[item.nextOccurrence.actionType] || "Acao"} - ${formatDate(
            item.nextOccurrence.start
          )}`
        : "-";
      const lastLabel = item.lastOccurrence
        ? `${ACTION_LABEL[item.lastOccurrence.actionType] || "Acao"} - ${formatDate(
            item.lastOccurrence.start
          )}`
        : "-";
      const targetLabel = TARGET_LABEL[item.targetType] || "Alvo";
      const expiredClass = item.displayState === "expired" ? "is-expired" : "";
      return `
        <tr class="${expiredClass} control-row" data-group-id="${item.id}">
          <td>${escapeHtml(targetLabel)}: ${escapeHtml(item.targetValue)}</td>
          <td><span class="badge ${stateClass}">${stateLabel}</span></td>
          <td>${escapeHtml(nextLabel)}</td>
          <td>${escapeHtml(lastLabel)}</td>
          <td><span class="badge ${apiStatus.className}">${apiStatus.label}</span></td>
          <td>
            Lock ${item.lockCount} / Unlock ${item.unlockCount}
            <button class="ghost control-view-schedules" data-group-id="${item.id}" type="button">
              Ver
            </button>
          </td>
          <td>
            <button class="control-menu-trigger icon-btn" data-group-id="${item.id}" type="button" aria-label="Acoes">
              <img src="icons/kebab.svg" alt="" />
            </button>
          </td>
        </tr>
      `;
    })
    .join("");

  controlTable.innerHTML = `
    <table class="table">
      <thead>
        <tr>
          <th>Alvo</th>
          <th>Estado planejado</th>
          <th>Proxima acao</th>
          <th>Ultima acao</th>
          <th>Status API</th>
          <th>Agendamentos</th>
          <th>Acoes</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
  `;

  attachControlItemEvents();
}

function attachControlItemEvents() {
  document.querySelectorAll(".control-item, .control-row").forEach((row) => {
    row.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      const groupId = row.dataset.groupId;
      if (!groupId) return;
      openControlMenu(event.clientX, event.clientY, groupId);
    });
  });

  document.querySelectorAll(".control-expand-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const groupId = btn.dataset.groupId;
      if (!groupId) return;
      const card = btn.closest(".control-item");
      if (!card) return;
      card.classList.toggle("is-expanded");
    });
  });

  document.querySelectorAll(".control-view-schedules").forEach((btn) => {
    btn.addEventListener("click", () => {
      const groupId = btn.dataset.groupId;
      if (!groupId) return;
      const group = controlGroupCache.get(groupId);
      if (!group) return;
      openScheduleListModal(group);
    });
  });

  document.querySelectorAll(".control-menu-trigger").forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.stopPropagation();
      event.preventDefault();
      const groupId = btn.dataset.groupId;
      if (!groupId) return;
      const rect = btn.getBoundingClientRect();
      openControlMenu(rect.right, rect.bottom, groupId);
    });
  });

  document.querySelectorAll(".control-delete-schedule").forEach((btn) => {
    btn.addEventListener("click", async (event) => {
      event.preventDefault();
      event.stopPropagation();
      const id = btn.dataset.id;
      if (!id) return;
      const confirmed = await openConfirmModal({
        title: "Confirmar exclusao",
        message: "Deseja excluir este agendamento?",
        confirmText: "Excluir",
      });
      if (!confirmed) return;
      await deleteSchedule(id);
    });
  });
}

function openControlMenu(x, y, groupId) {
  if (!controlMenu) return;
  controlMenu.classList.add("is-open");
  controlMenu.dataset.groupId = groupId;

  const padding = 8;
  controlMenu.style.left = `${x}px`;
  controlMenu.style.top = `${y}px`;

  const rect = controlMenu.getBoundingClientRect();
  let left = x;
  let top = y;

  if (rect.right > window.innerWidth - padding) {
    left = window.innerWidth - rect.width - padding;
  }
  if (rect.bottom > window.innerHeight - padding) {
    top = window.innerHeight - rect.height - padding;
  }

  controlMenu.style.left = `${Math.max(padding, left)}px`;
  controlMenu.style.top = `${Math.max(padding, top)}px`;
}

function closeControlMenu() {
  if (!controlMenu) return;
  controlMenu.classList.remove("is-open");
  controlMenu.dataset.groupId = "";
}

function openWorkflowVariablesMenu(x, y, node, input) {
  if (!workflowVariablesMenu) return;
  const body = workflowVariablesMenu.querySelector(".context-body");
  if (!body) return;
  const suggestions = node ? getVariableSuggestions(node) : [];
  body.innerHTML = "";
  if (!suggestions.length) {
    const empty = document.createElement("div");
    empty.className = "context-item is-empty";
    empty.textContent = "Sem variaveis disponiveis.";
    body.append(empty);
  } else {
    suggestions.forEach((key) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "context-item";
      btn.dataset.value = key;
      btn.textContent = `{{${key}}}`;
      body.append(btn);
    });
  }
  workflowVariablesContext = { nodeId: node?.id || null, input };
  workflowVariablesMenu.classList.add("is-open");

  const padding = 8;
  workflowVariablesMenu.style.left = `${x}px`;
  workflowVariablesMenu.style.top = `${y}px`;
  const rect = workflowVariablesMenu.getBoundingClientRect();
  let left = x;
  let top = y;
  if (rect.right > window.innerWidth - padding) {
    left = window.innerWidth - rect.width - padding;
  }
  if (rect.bottom > window.innerHeight - padding) {
    top = window.innerHeight - rect.height - padding;
  }
  workflowVariablesMenu.style.left = `${Math.max(padding, left)}px`;
  workflowVariablesMenu.style.top = `${Math.max(padding, top)}px`;
}

function closeWorkflowVariablesMenu() {
  if (!workflowVariablesMenu) return;
  workflowVariablesMenu.classList.remove("is-open");
  workflowVariablesContext = null;
}

function openFormForAction({ targetType, targetValue, actionType, startNow }) {
  if (!ruleForm) return;
  resetForm();
  if (ruleForm.elements.targetType && targetType !== null && targetType !== undefined) {
    ruleForm.elements.targetType.value = String(targetType);
  }
  if (ruleForm.elements.targetValue && targetValue) {
    ruleForm.elements.targetValue.value = targetValue;
  }
  if (ruleForm.elements.actionType && actionType !== null && actionType !== undefined) {
    ruleForm.elements.actionType.value = String(actionType);
  }
  if (startNow && ruleForm.elements.startDate) {
    ruleForm.elements.startDate.value = toInputDateTime(new Date().toISOString());
    if (ruleForm.elements.scheduleType) {
      ruleForm.elements.scheduleType.value = "0";
    }
  }
  if (formTitle) formTitle.textContent = "Nova regra";
  if (formSubmitButton) formSubmitButton.textContent = "Salvar e chamar API";
  updateScheduleVisibility();
  showView("ruleForm");
}

function fillFormForClone(schedule) {
  if (!ruleForm) return;
  resetForm();
  ruleForm.elements.message.value = schedule.message || "";
  if (remoteIdInput) remoteIdInput.value = "";
  ruleForm.elements.actionType.value =
    schedule.action_type !== null ? String(schedule.action_type) : "";
  ruleForm.elements.scheduleType.value =
    schedule.schedule_type !== null ? String(schedule.schedule_type) : "";
  ruleForm.elements.startDate.value = toInputDateTime(schedule.start_date);
  ruleForm.elements.endDate.value = toInputDateTime(schedule.end_date);
  ruleForm.elements.recurrenceType.value =
    schedule.recurrence_type !== null ? String(schedule.recurrence_type) : "";
  ruleForm.elements.startTime.value = normalizeTime(schedule.start_time);
  ruleForm.elements.endTime.value = normalizeTime(schedule.end_time);
  ruleForm.elements.targetType.value =
    schedule.target_type !== null ? String(schedule.target_type) : "";
  ruleForm.elements.targetValue.value = schedule.target_value || "";

  dayInputs.forEach((input) => {
    const value = Number(input.value);
    const selected =
      Array.isArray(schedule.days_of_week) &&
      schedule.days_of_week.includes(value);
    input.checked = selected;
  });

  if (formTitle) formTitle.textContent = "Nova regra (duplicada)";
  if (formSubmitButton) formSubmitButton.textContent = "Salvar e chamar API";
  updateScheduleVisibility();
  showView("ruleForm");
}

function openJsonModalWithData(title, data) {
  openModal(title, JSON.stringify(data, null, 2));
}

async function handleControlAction(action, group) {
  if (!group) return;
  const targetType = group.targetType;
  const targetValue = group.targetValue;
  const representativeSchedule = group.representativeSchedule;

  switch (action) {
    case "lock-now":
      createImmediateSchedule(group, 0);
      break;
    case "unlock-now":
      createImmediateSchedule(group, 1);
      break;
    case "schedule-lock":
      openScheduleModal({ actionType: 0, targetType, targetValue });
      break;
    case "schedule-unlock":
      openScheduleModal({ actionType: 1, targetType, targetValue });
      break;
    case "duplicate":
      if (representativeSchedule) {
        fillFormForClone(representativeSchedule);
      } else {
        openFormForAction({ targetType, targetValue, actionType: 0, startNow: false });
      }
      break;
    case "audit":
      showView("audit");
      loadAudit();
      if (auditFeedback) {
        auditFeedback.textContent = `Historico geral. Alvo: ${targetValue}`;
      }
      break;
    case "json":
      if (group.lastApiSchedule || representativeSchedule) {
        const schedule = group.lastApiSchedule || representativeSchedule;
        const targetLabel = TARGET_LABEL[targetType] || "Alvo";
        openJsonModal(schedule, `JSON - ${targetLabel}: ${targetValue}`);
      } else {
        openJsonModalWithData("Resumo do alvo", {
          targetType: TARGET_LABEL[targetType] || targetType,
          targetValue,
          plannedState: PLANNED_STATE_LABEL[group.displayState] || group.displayState,
          nextOccurrence: group.nextOccurrence?.start || null,
          lastOccurrence: group.lastOccurrence?.start || null,
          lockCount: group.lockCount,
          unlockCount: group.unlockCount,
        });
      }
      break;
    case "delete": {
      const scheduleIds = (group.schedules || [])
        .map((schedule) => schedule?.id)
        .filter(Boolean);
      if (!scheduleIds.length) break;
      const targetLabel = TARGET_LABEL[targetType] || "Alvo";
      const confirmed = await openConfirmModal({
        title: "Excluir agendamentos",
        message: `Todos os agendamentos de ${targetLabel}: ${targetValue} serao excluidos. Deseja continuar?`,
        confirmText: "Excluir",
      });
      if (!confirmed) break;
      await deleteSchedulesBulk(scheduleIds);
      break;
    }
    default:
      break;
  }
}

async function createImmediateSchedule(group, actionType) {
  if (!group) return;
  const targetLabel = TARGET_LABEL[group.targetType] || "Alvo";
  const confirmed = await openConfirmModal({
    title: actionType === 1 ? "Confirmar desbloqueio" : "Confirmar bloqueio",
    message: `Deseja ${
      actionType === 1 ? "desbloquear" : "bloquear"
    } agora ${targetLabel}: ${group.targetValue}?`,
    confirmText: actionType === 1 ? "Desbloquear" : "Bloquear",
  });
  if (!confirmed) return;

  const payload = {
    message: actionType === 1 ? "Desbloqueio imediato" : "Bloqueio imediato",
    actionType,
    scheduleType: 0,
    startDate: new Date().toISOString(),
    targetType: group.targetType,
    targetValue: group.targetValue,
  };

  try {
    const response = await apiFetch("/api/schedules", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data?.error || "Falha ao criar bloqueio imediato.");
    }
    const apiFailure = getApiFailureDetails(data?.api);
    if (apiFailure) {
      if (controlFeedback) {
        const detail = apiFailure.detail
          ? ` ${apiFailure.detail}`
          : "";
        controlFeedback.textContent = `${apiFailure.message}${detail}`;
        controlFeedback.className = "feedback is-error";
      }
      await loadControl();
      return;
    }
    if (controlFeedback) {
      controlFeedback.textContent =
        actionType === 1
          ? "Desbloqueio imediato enviado para a API."
          : "Bloqueio imediato enviado para a API.";
      controlFeedback.className = "feedback is-success";
    }
    await loadControl();
  } catch (err) {
    if (controlFeedback) {
      controlFeedback.textContent =
        err.message || "Falha ao criar bloqueio imediato.";
      controlFeedback.className = "feedback is-error";
    }
  }
}

function renderRecords() {
  if (!recordsList) return;
  const data = recordCache[currentRecordView] || [];
  if (!Array.isArray(data) || data.length === 0) {
    recordsList.innerHTML = "<p class=\"muted\">Nenhum registro encontrado.</p>";
    return;
  }

  if (currentRecordView === "schedules") {
    const labels = getScheduleLabels();
    const rows = data
      .map((item) => {
        const actionLabel = labels.actionType[item.actionType] || item.actionType;
        const scheduleLabel =
          labels.scheduleType[item.scheduleType] || item.scheduleType;
        const targetLabel = labels.targetType[item.targetType] || item.targetType;
        const recurrenceLabel =
          labels.recurrenceType[item.recurrenceType] || "-";
        const days =
          Array.isArray(item.daysOfWeek) && item.daysOfWeek.length > 0
            ? item.daysOfWeek.join(", ")
            : "-";
        return `
          <tr>
            <td>${escapeHtml(item.id)}</td>
            <td>${escapeHtml(actionLabel)}</td>
            <td>${escapeHtml(scheduleLabel)}</td>
            <td>${escapeHtml(targetLabel)}</td>
            <td>${escapeHtml(item.targetValue || "-")}</td>
            <td>${formatDate(item.startDate)}</td>
            <td>${formatDate(item.endDate)}</td>
            <td>${escapeHtml(item.startTime || "-")}</td>
            <td>${escapeHtml(item.endTime || "-")}</td>
            <td>${escapeHtml(recurrenceLabel)}</td>
            <td>${escapeHtml(days)}</td>
          </tr>
        `;
      })
      .join("");

    recordsList.innerHTML = `
      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Acao</th>
            <th>Agendamento</th>
            <th>Alvo</th>
          <th>Valor</th>
          <th>Inicio</th>
          <th>Fim</th>
          <th>Hora inicio</th>
          <th>Hora fim</th>
          <th>Recorrencia</th>
          <th>Dias</th>
        </tr>
      </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    `;
    return;
  }

  if (currentRecordView === "user-unlocks") {
    const rows = data
      .map((item) => {
        return `
          <tr>
            <td>${escapeHtml(item.id)}</td>
            <td>${escapeHtml(item.username || "-")}</td>
            <td>${formatDate(item.unlockedAt)}</td>
            <td>${formatDate(item.expiresAt)}</td>
            <td>${escapeHtml(item.unlockExpirationMinutes ?? "-")}</td>
            <td>${formatDate(item.createdAt)}</td>
          </tr>
        `;
      })
      .join("");

    recordsList.innerHTML = `
      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Usuario</th>
            <th>Desbloqueado em</th>
            <th>Expira em</th>
            <th>Minutos</th>
            <th>Criado em</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    `;
    return;
  }

  if (currentRecordView === "hostname-unlocks") {
    const rows = data
      .map((item) => {
        return `
          <tr>
            <td>${escapeHtml(item.id)}</td>
            <td>${escapeHtml(item.hostname || "-")}</td>
            <td>${formatDate(item.unlockedAt)}</td>
            <td>${formatDate(item.expiresAt)}</td>
            <td>${escapeHtml(item.unlockExpirationMinutes ?? "-")}</td>
            <td>${formatDate(item.createdAt)}</td>
          </tr>
        `;
      })
      .join("");

    recordsList.innerHTML = `
      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Hostname</th>
            <th>Desbloqueado em</th>
            <th>Expira em</th>
            <th>Minutos</th>
            <th>Criado em</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    `;
  }
}

function renderAudit(logs) {
  if (!auditList) return;
  if (!Array.isArray(logs) || logs.length === 0) {
    auditCache.clear();
    auditList.innerHTML = "<p class=\"muted\">Nenhum registro de auditoria.</p>";
    return;
  }

  auditCache.clear();
  logs.forEach((log) => auditCache.set(String(log.id), log));

  const rows = logs
    .map((log) => {
      const status = getAuditStatus(log);
      const entityLabel = log.entity_type || "-";
      const entityId = log.entity_id ? String(log.entity_id) : "-";
      return `
        <tr>
          <td>${formatDate(log.created_at)}</td>
          <td>${escapeHtml(log.action)}</td>
          <td>${escapeHtml(entityLabel)}</td>
          <td>${escapeHtml(entityId)}</td>
          <td>
            <span class="badge ${status.className}">${status.label}</span>
          </td>
          <td>
            <button class="ghost audit-btn" data-id="${log.id}">Ver</button>
          </td>
        </tr>
      `;
    })
    .join("");

  auditList.innerHTML = `
    <table class="table">
      <thead>
        <tr>
          <th>Data</th>
          <th>Acao</th>
          <th>Entidade</th>
          <th>ID</th>
          <th>Status</th>
          <th>Detalhes</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
  `;

  document.querySelectorAll(".audit-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      if (!id) return;
      const log = auditCache.get(String(id));
      if (!log) return;
      openAuditModal(log);
    });
  });
}

async function loadUsers() {
  if (!usersFeedback || !usersList) return;
  usersFeedback.textContent = "";
  usersFeedback.className = "feedback";

  try {
    const response = await apiFetch("/api/users");
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data?.error || "Falha ao carregar usuarios.");
    }
    renderUsers(data);
  } catch (err) {
    usersFeedback.textContent = err.message || "Falha ao carregar usuarios.";
    usersFeedback.classList.add("is-error");
  }
}

function renderUsers(users) {
  if (!usersList) return;
  if (!Array.isArray(users) || users.length === 0) {
    usersList.innerHTML = "<p class=\"muted\">Nenhum usuario cadastrado.</p>";
    return;
  }

  const rows = users
    .map((user) => {
      const statusLabel = user.status || "-";
      const canApprove = user.status === "pending";
      return `
        <tr>
          <td>${escapeHtml(user.username)}</td>
          <td>${escapeHtml(user.email || "-")}</td>
          <td>${escapeHtml(user.phone || "-")}</td>
          <td>${escapeHtml(user.role)}</td>
          <td>${escapeHtml(statusLabel)}</td>
          <td>${formatDate(user.created_at)}</td>
          <td>${formatDate(user.approved_at)}</td>
          <td>${escapeHtml(user.approved_by || "-")}</td>
          <td>
            <button class="ghost approve-user" data-id="${user.id}" ${
              canApprove ? "" : "disabled"
            }>Aprovar</button>
            <button class="ghost reject-user" data-id="${user.id}" ${
              canApprove ? "" : "disabled"
            }>Rejeitar</button>
          </td>
        </tr>
      `;
    })
    .join("");

  usersList.innerHTML = `
    <table class="table">
      <thead>
        <tr>
          <th>Usuario</th>
          <th>Email</th>
          <th>Telefone</th>
          <th>Role</th>
          <th>Status</th>
          <th>Criado em</th>
          <th>Aprovado em</th>
          <th>Aprovado por</th>
          <th>Acoes</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
  `;

  document.querySelectorAll(".approve-user").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset.id;
      if (!id) return;
      await updateUserStatus(id, "approve");
    });
  });

  document.querySelectorAll(".reject-user").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset.id;
      if (!id) return;
      await updateUserStatus(id, "reject");
    });
  });
}

async function updateUserStatus(id, action) {
  try {
    const response = await apiFetch(`/api/users/${id}/${action}`, {
      method: "POST",
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data?.error || "Falha ao atualizar usuario.");
    }
    await loadUsers();
  } catch (err) {
    if (usersFeedback) {
      usersFeedback.textContent = err.message || "Falha ao atualizar usuario.";
      usersFeedback.classList.add("is-error");
    }
  }
}

async function deleteSchedule(id) {
  try {
    const response = await apiFetch(`/api/schedules/${id}`, { method: "DELETE" });
    const data = await response.json();
    if (!response.ok) {
      const message = data?.error || "Erro ao excluir";
      throw new Error(message);
    }
    if (rulesList) {
      await loadSchedules();
    }
    if (views.control?.classList.contains("is-active")) {
      await loadControl();
    }
  } catch (err) {
    const targetFeedback =
      views.control?.classList.contains("is-active") && controlFeedback
        ? controlFeedback
        : rulesFeedback;
    if (targetFeedback) {
      targetFeedback.textContent = err.message || "Falha ao excluir a regra.";
      targetFeedback.classList.add("is-error");
    }
  }
}

async function deleteSchedulesBulk(ids) {
  const uniqueIds = Array.from(new Set(ids)).filter(Boolean);
  if (!uniqueIds.length) return;
  let failed = 0;
  for (const id of uniqueIds) {
    try {
      const response = await apiFetch(`/api/schedules/${id}`, { method: "DELETE" });
      const data = await response.json();
      if (!response.ok) {
        const message = data?.error || "Erro ao excluir";
        throw new Error(message);
      }
    } catch {
      failed += 1;
    }
  }

  if (rulesList) {
    await loadSchedules();
  }
  if (views.control?.classList.contains("is-active")) {
    await loadControl();
  }
  if (failed > 0) {
    const targetFeedback =
      views.control?.classList.contains("is-active") && controlFeedback
        ? controlFeedback
        : rulesFeedback;
    if (targetFeedback) {
      targetFeedback.textContent =
        "Alguns agendamentos nao puderam ser excluidos.";
      targetFeedback.classList.add("is-error");
    }
  }
}

async function deleteWorkflow(id) {
  try {
    const response = await apiFetch(`/api/workflows/${id}`, { method: "DELETE" });
    const text = await response.text();
    let data = null;
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = null;
    }
    if (!response.ok) {
      const message = data?.error || text || "Erro ao excluir o fluxo.";
      throw new Error(message);
    }
    if (workflowState.workflowId === Number(id)) {
      workflowState.workflowId = null;
      safeStorageRemove(WORKFLOW_ID_KEY);
      safeStorageRemove(WORKFLOW_NAME_KEY);
      saveWorkflowScheduleDraft(null);
      updateWorkflowTitle();
    }
    if (workflowPaletteTab === "schedules") {
      await fetchWorkflowSchedules();
    }
    await fetchWorkflowList();
    if (workflowLoadFeedback) {
      workflowLoadFeedback.textContent = "Fluxo removido.";
      workflowLoadFeedback.className = "feedback is-success";
    }
    setWorkflowStatus("Fluxo removido.", "success");
  } catch (err) {
    if (workflowLoadFeedback) {
      workflowLoadFeedback.textContent =
        err?.message || "Falha ao excluir o fluxo.";
      workflowLoadFeedback.className = "feedback is-error";
    }
  }
}

function buildPayloadFromSchedule(schedule) {
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
    if (payload[key] === null || payload[key] === undefined || payload[key] === "") {
      delete payload[key];
    }
  });

  return payload;
}

function openModal(title, content) {
  if (!jsonModal || !jsonContent) return;
  if (modalTitle) modalTitle.textContent = title;
  jsonContent.textContent = content;
  jsonModal.classList.add("is-open");
}

function closeJsonModal() {
  if (!jsonModal) return;
  jsonModal.classList.remove("is-open");
}

function openConfirmModal({ title, message, confirmText, cancelText }) {
  if (!confirmModal) {
    return Promise.resolve(window.confirm(message || "Confirmar acao?"));
  }

  if (confirmTitle) confirmTitle.textContent = title || "Confirmar";
  if (confirmMessage) confirmMessage.textContent = message || "Confirmar acao?";
  if (confirmOkButton) confirmOkButton.textContent = confirmText || "Confirmar";
  if (confirmCancelButton)
    confirmCancelButton.textContent = cancelText || "Cancelar";

  confirmModal.classList.add("is-open");

  return new Promise((resolve) => {
    confirmResolver = resolve;
  });
}

function closeConfirmModal(result = false) {
  if (!confirmModal) return;
  confirmModal.classList.remove("is-open");
  if (confirmResolver) {
    confirmResolver(result);
    confirmResolver = null;
  }
}

function openJsonModal(schedule, title) {
  const payload = buildPayloadFromSchedule(schedule);
  const payloadText = JSON.stringify(payload, null, 2);
  const status = schedule.last_api_status ?? "-";
  const errorText = schedule.last_api_error
    ? `Erro: ${schedule.last_api_error}`
    : "Erro: -";
  const responseText = formatResponseText(schedule.last_api_response);
  const calledAt = schedule.last_api_called_at
    ? formatDate(schedule.last_api_called_at)
    : "-";
  const remoteId = schedule.remote_schedule_id || "-";
  const content = [
    "Request:",
    payloadText,
    "",
    "Response:",
    `Ultima chamada: ${calledAt}`,
    `Remote ID: ${remoteId}`,
    `Status: ${status}`,
    errorText,
    "",
    "Body:",
    responseText,
  ].join("\n");
  openModal(title || "JSON enviado para a API", content);
}

function formatResponseText(responseText) {
  if (!responseText) return "Sem resposta.";
  try {
    const parsed = JSON.parse(responseText);
    return JSON.stringify(parsed, null, 2);
  } catch {
    return responseText;
  }
}

function getApiFailureDetails(api) {
  if (!api || api.ok !== false) return null;
  const statusLabel = api.status ? `Status ${api.status}` : "Status desconhecido";
  let detail = api.error || api.responseText || "";
  let parsed = null;
  if (detail && typeof detail !== "string") {
    parsed = detail;
    detail = JSON.stringify(detail);
  } else if (typeof detail === "string" && detail.trim().startsWith("{")) {
    try {
      parsed = JSON.parse(detail);
    } catch {
      parsed = null;
    }
  }
  const parsedStatus = parsed?.status || null;
  const description =
    Array.isArray(parsed?.messages) && parsed.messages.length > 0
      ? parsed.messages
          .map((msg) => msg?.description || msg?.message || "")
          .filter(Boolean)
          .join(" | ")
      : null;
  const formatted =
    parsedStatus || description
      ? [
          parsedStatus ? `Status: ${parsedStatus}` : null,
          description ? `Descricao: ${description}` : null,
        ]
          .filter(Boolean)
          .join("\n")
      : detail
      ? formatResponseText(detail)
      : "";
  return {
    message: `Falha na API externa (${statusLabel}).`,
    detail: formatted,
  };
}

function openResponseModal(schedule) {
  const status = schedule.last_api_status ?? "-";
  const errorText = schedule.last_api_error
    ? `Erro: ${schedule.last_api_error}`
    : "Erro: -";
  const responseText = formatResponseText(schedule.last_api_response);

  const content = `Status: ${status}\n${errorText}\n\nResposta:\n${responseText}`;
  openModal("Retorno da chamada", content);
}

function openAuditModal(log) {
  const status = log.response_status ?? "-";
  const errorText = log.error ? `Erro: ${log.error}` : "Erro: -";
  const requestPayload = log.request_payload
    ? JSON.stringify(log.request_payload, null, 2)
    : "Sem payload.";
  const responseText = formatResponseText(log.response_body);
  const content = `Status: ${status}\n${errorText}\n\nRequest:\n${requestPayload}\n\nResponse:\n${responseText}`;
  openModal("Detalhes da auditoria", content);
}

if (closeModalButton) {
  closeModalButton.addEventListener("click", closeJsonModal);
}

if (jsonModal) {
  jsonModal.addEventListener("click", (event) => {
    if (event.target === jsonModal) closeJsonModal();
  });
}

if (confirmOkButton) {
  confirmOkButton.addEventListener("click", () => {
    closeConfirmModal(true);
  });
}

if (confirmCancelButton) {
  confirmCancelButton.addEventListener("click", () => {
    closeConfirmModal(false);
  });
}

if (confirmCloseButton) {
  confirmCloseButton.addEventListener("click", () => {
    closeConfirmModal(false);
  });
}

if (confirmModal) {
  confirmModal.addEventListener("click", (event) => {
    if (event.target === confirmModal) closeConfirmModal(false);
  });
}

function updateScheduleModalVisibility() {
  if (!scheduleModalTypeSelect) return;
  const isRecurring = scheduleModalTypeSelect.value === "1";
  if (scheduleRecurrenceSelect) {
    scheduleRecurrenceSelect.disabled = !isRecurring;
    if (!isRecurring) scheduleRecurrenceSelect.value = "";
  }
  if (scheduleStartTimeInput) {
    scheduleStartTimeInput.disabled = !isRecurring;
    scheduleStartTimeInput.parentElement.style.display = isRecurring ? "" : "none";
  }
  if (scheduleEndTimeInput) {
    scheduleEndTimeInput.disabled = !isRecurring;
    scheduleEndTimeInput.parentElement.style.display = isRecurring ? "" : "none";
  }
  if (scheduleDaysGroup) {
    scheduleDaysGroup.style.display =
      isRecurring && scheduleRecurrenceSelect?.value === "1"
        ? "flex"
        : "none";
  }
  if (!isRecurring && scheduleDaysInputs.length) {
    scheduleDaysInputs.forEach((input) => {
      input.checked = false;
      input.disabled = true;
    });
  } else if (scheduleDaysInputs.length) {
    scheduleDaysInputs.forEach((input) => {
      input.disabled = !(scheduleRecurrenceSelect?.value === "1");
      if (input.disabled) input.checked = false;
    });
  }
}

function openScheduleModal({ actionType, targetType, targetValue }) {
  if (!scheduleModal) return;
  scheduleContext = { actionType, targetType, targetValue };
  if (scheduleTitle) {
    scheduleTitle.textContent =
      actionType === 1 ? "Agendar desbloqueio" : "Agendar bloqueio";
  }
  if (scheduleFeedback) {
    scheduleFeedback.textContent = "";
    scheduleFeedback.className = "feedback";
  }
  if (scheduleModalTypeSelect) scheduleModalTypeSelect.value = "0";
  if (scheduleStartInput) scheduleStartInput.value = "";
  if (scheduleEndInput) scheduleEndInput.value = "";
  if (scheduleRecurrenceSelect) scheduleRecurrenceSelect.value = "";
  if (scheduleStartTimeInput) scheduleStartTimeInput.value = "";
  if (scheduleEndTimeInput) scheduleEndTimeInput.value = "";
  scheduleDaysInputs.forEach((input) => (input.checked = false));
  updateScheduleModalVisibility();
  scheduleModal.classList.add("is-open");
}

function closeScheduleModal() {
  if (!scheduleModal) return;
  scheduleModal.classList.remove("is-open");
  scheduleContext = null;
}

if (scheduleModalTypeSelect) {
  scheduleModalTypeSelect.addEventListener(
    "change",
    updateScheduleModalVisibility
  );
}

if (scheduleRecurrenceSelect) {
  scheduleRecurrenceSelect.addEventListener("change", updateScheduleModalVisibility);
}

if (scheduleCloseButton) {
  scheduleCloseButton.addEventListener("click", closeScheduleModal);
}

if (scheduleCancelButton) {
  scheduleCancelButton.addEventListener("click", closeScheduleModal);
}

if (scheduleModal) {
  scheduleModal.addEventListener("click", (event) => {
    if (event.target === scheduleModal) closeScheduleModal();
  });
}

if (scheduleSaveButton) {
  scheduleSaveButton.addEventListener("click", async () => {
    if (!scheduleContext) return;
    scheduleSaveButton.disabled = true;
    scheduleSaveButton.textContent = "Salvando...";
    if (scheduleFeedback) {
      scheduleFeedback.textContent = "";
      scheduleFeedback.className = "feedback";
    }

    const startDate = normalizeDateTime(scheduleStartInput?.value);
    const endDate = normalizeDateTime(scheduleEndInput?.value);
    const scheduleType = normalizeNumber(scheduleModalTypeSelect?.value);
    const recurrenceType = normalizeNumber(scheduleRecurrenceSelect?.value);
    const daysOfWeek = Array.from(scheduleDaysInputs)
      .filter((input) => input.checked)
      .map((input) => Number(input.value));

    if (!startDate || !endDate || scheduleType === null) {
      if (scheduleFeedback) {
        scheduleFeedback.textContent =
          "Inicio, fim e tipo de agendamento sao obrigatorios.";
        scheduleFeedback.classList.add("is-error");
      }
      scheduleSaveButton.disabled = false;
      scheduleSaveButton.textContent = "Salvar";
      return;
    }

    if (scheduleType === 1 && recurrenceType === null) {
      if (scheduleFeedback) {
        scheduleFeedback.textContent = "Recorrencia e obrigatoria.";
        scheduleFeedback.classList.add("is-error");
      }
      scheduleSaveButton.disabled = false;
      scheduleSaveButton.textContent = "Salvar";
      return;
    }

    if (scheduleType === 1 && recurrenceType === 1 && daysOfWeek.length === 0) {
      if (scheduleFeedback) {
        scheduleFeedback.textContent = "Selecione pelo menos um dia.";
        scheduleFeedback.classList.add("is-error");
      }
      scheduleSaveButton.disabled = false;
      scheduleSaveButton.textContent = "Salvar";
      return;
    }

    const actionLabel =
      scheduleContext.actionType === 1 ? "desbloqueio" : "bloqueio";
    const targetLabel = TARGET_LABEL[scheduleContext.targetType] || "Alvo";
    const confirmed = await openConfirmModal({
      title: "Confirmar agendamento",
      message: `Deseja agendar ${actionLabel} para ${targetLabel}: ${scheduleContext.targetValue}?`,
      confirmText: "Salvar",
    });
    if (!confirmed) {
      scheduleSaveButton.disabled = false;
      scheduleSaveButton.textContent = "Salvar";
      return;
    }

    const payload = {
      message:
        scheduleContext.actionType === 1
          ? "Agendamento de desbloqueio"
          : "Agendamento de bloqueio",
      actionType: scheduleContext.actionType,
      scheduleType,
      startDate,
      endDate,
      recurrenceType: scheduleType === 1 ? recurrenceType : null,
      daysOfWeek: scheduleType === 1 && daysOfWeek.length ? daysOfWeek : null,
      startTime:
        scheduleType === 1
          ? normalizeTimeForApi(scheduleStartTimeInput?.value)
          : null,
      endTime:
        scheduleType === 1
          ? normalizeTimeForApi(scheduleEndTimeInput?.value)
          : null,
      targetType: scheduleContext.targetType,
      targetValue: scheduleContext.targetValue,
    };

    if (scheduleType === 1 && (!payload.startTime || !payload.endTime)) {
      if (scheduleFeedback) {
        scheduleFeedback.textContent =
          "Hora inicial e hora final sao obrigatorias para recorrencia.";
        scheduleFeedback.classList.add("is-error");
      }
      scheduleSaveButton.disabled = false;
      scheduleSaveButton.textContent = "Salvar";
      return;
    }

    if (scheduleType === 1) {
      const startSeconds = timeToSeconds(payload.startTime);
      const endSeconds = timeToSeconds(payload.endTime);
      if (
        startSeconds !== null &&
        endSeconds !== null &&
        endSeconds <= startSeconds
      ) {
        if (scheduleFeedback) {
          scheduleFeedback.textContent =
            "Hora final deve ser maior que hora inicial.";
          scheduleFeedback.classList.add("is-error");
        }
        scheduleSaveButton.disabled = false;
        scheduleSaveButton.textContent = "Salvar";
        return;
      }
    }

    try {
      const response = await apiFetch("/api/schedules", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      let data = null;
      try {
        data = await response.json();
      } catch {
        data = null;
      }
      if (!response.ok) {
        throw new Error(data?.error || "Falha ao agendar.");
      }
      const apiFailure = getApiFailureDetails(data?.api);
      if (apiFailure) {
        if (scheduleFeedback) {
          const detailBlock = apiFailure.detail
            ? `<div class="response-box">${escapeHtml(apiFailure.detail)}</div>`
            : "";
          scheduleFeedback.innerHTML = `<div>${escapeHtml(
            apiFailure.message
          )}</div>${detailBlock}`;
          scheduleFeedback.classList.add("is-error");
        }
        return;
      }
      closeScheduleModal();
      showView("control");
      if (controlFeedback) {
        controlFeedback.textContent = "Agendamento criado.";
        controlFeedback.className = "feedback is-success";
      }
      await loadControl();
    } catch (err) {
      if (scheduleFeedback) {
        scheduleFeedback.textContent = err.message || "Falha ao agendar.";
        scheduleFeedback.classList.add("is-error");
      }
    } finally {
      scheduleSaveButton.disabled = false;
      scheduleSaveButton.textContent = "Salvar";
    }
  });
}

async function loadScheduleForEdit(id) {
  try {
    const response = await apiFetch(`/api/schedules/${id}`);
    if (!response.ok) throw new Error("Erro ao carregar regra");
    const schedule = await response.json();
    fillFormForEdit(schedule);
    showView("ruleForm");
  } catch (err) {
    const targetFeedback = controlFeedback || rulesFeedback;
    if (targetFeedback) {
      targetFeedback.textContent = "Falha ao carregar a regra para edicao.";
      targetFeedback.classList.add("is-error");
    }
  }
}

function fillFormForEdit(schedule) {
  editingId = schedule.id;
  ruleForm.elements.message.value = schedule.message || "";
  if (remoteIdInput) remoteIdInput.value = schedule.remote_schedule_id || "";
  ruleForm.elements.actionType.value =
    schedule.action_type !== null ? String(schedule.action_type) : "";
  ruleForm.elements.scheduleType.value =
    schedule.schedule_type !== null ? String(schedule.schedule_type) : "";
  ruleForm.elements.startDate.value = toInputDateTime(schedule.start_date);
  ruleForm.elements.endDate.value = toInputDateTime(schedule.end_date);
  ruleForm.elements.recurrenceType.value =
    schedule.recurrence_type !== null ? String(schedule.recurrence_type) : "";
  ruleForm.elements.startTime.value = normalizeTime(schedule.start_time);
  ruleForm.elements.endTime.value = normalizeTime(schedule.end_time);
  ruleForm.elements.targetType.value =
    schedule.target_type !== null ? String(schedule.target_type) : "";
  ruleForm.elements.targetValue.value = schedule.target_value || "";

  dayInputs.forEach((input) => {
    const value = Number(input.value);
    const selected =
      Array.isArray(schedule.days_of_week) &&
      schedule.days_of_week.includes(value);
    input.checked = selected;
  });

  ruleFeedback.textContent = "";
  ruleFeedback.className = "feedback";
  if (formTitle) formTitle.textContent = "Editar regra";
  if (formSubmitButton) formSubmitButton.textContent = "Atualizar e chamar API";
  updateScheduleVisibility();
}

function normalizeDateTime(value) {
  if (!value) return null;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toISOString();
}

function extractTimeFromIso(value) {
  if (!value) return null;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return null;
  const pad = (num) => String(num).padStart(2, "0");
  return `${pad(parsed.getHours())}:${pad(parsed.getMinutes())}`;
}

function timeToSeconds(value) {
  if (!value) return null;
  const [hour, minute, second] = String(value).split(":");
  const h = Number(hour);
  const m = Number(minute);
  const s = Number(second || 0);
  if (Number.isNaN(h) || Number.isNaN(m) || Number.isNaN(s)) return null;
  return h * 3600 + m * 60 + s;
}

function toInputDateTime(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const pad = (num) => String(num).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function normalizeTime(value) {
  if (!value) return "";
  if (value.length >= 5) return value.slice(0, 5);
  return value;
}

function normalizeText(value) {
  if (!value) return null;
  return value.trim();
}

function normalizeTimeForApi(value) {
  if (!value) return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (/^\d{2}:\d{2}:\d{2}$/.test(trimmed)) return trimmed.slice(0, 5);
  if (/^\d{2}:\d{2}$/.test(trimmed)) return trimmed;
  return trimmed;
}

function normalizeNumber(value) {
  if (value === null || value === undefined || value === "") return null;
  const parsed = Number(value);
  if (Number.isNaN(parsed)) return null;
  return parsed;
}

function normalizeTimeoutSeconds(value) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return WEBHOOK_DEFAULT_TIMEOUT_SECONDS;
  }
  return Math.round(parsed);
}

async function fetchWithTimeout(url, options, timeoutSeconds) {
  const timeoutMs = Math.max(1, timeoutSeconds) * 1000;
  const controller =
    typeof AbortController !== "undefined" ? new AbortController() : null;
  let timeoutId = null;
  const fetchPromise = fetch(url, {
    ...options,
    signal: controller ? controller.signal : undefined,
  });
  const timeoutPromise = new Promise((_, reject) => {
    timeoutId = window.setTimeout(() => {
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

ruleForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  ruleFeedback.textContent = "";
  ruleFeedback.className = "feedback";

  const formData = new FormData(ruleForm);
  const daysOfWeek = Array.from(
    document.querySelectorAll('input[name="daysOfWeek"]:checked')
  ).map((input) => Number(input.value));

  const payload = {
    message: normalizeText(formData.get("message")),
    actionType: normalizeNumber(formData.get("actionType")),
    scheduleType: normalizeNumber(formData.get("scheduleType")),
    startDate: normalizeDateTime(formData.get("startDate")),
    endDate: normalizeDateTime(formData.get("endDate")),
    recurrenceType: normalizeNumber(formData.get("recurrenceType")),
    daysOfWeek: daysOfWeek.length > 0 ? daysOfWeek : null,
    startTime: normalizeTimeForApi(formData.get("startTime")),
    endTime: normalizeTimeForApi(formData.get("endTime")),
    targetType: normalizeNumber(formData.get("targetType")),
    targetValue: normalizeText(formData.get("targetValue")),
  };

  if (
    !payload.message ||
    payload.actionType === null ||
    payload.scheduleType === null ||
    !payload.startDate ||
    payload.targetType === null ||
    !payload.targetValue
  ) {
    ruleFeedback.textContent =
      "Campos obrigatorios: mensagem, acao, agendamento, inicio e alvo.";
    ruleFeedback.classList.add("is-error");
    return;
  }

  if (payload.scheduleType === 1 && !payload.endDate) {
    ruleFeedback.textContent = "Fim e obrigatorio para recorrencia.";
    ruleFeedback.classList.add("is-error");
    return;
  }

  if (payload.scheduleType === 1) {
    if (!payload.startTime || !payload.endTime) {
      ruleFeedback.textContent =
        "Hora inicial e hora final sao obrigatorias para recorrencia.";
      ruleFeedback.classList.add("is-error");
      return;
    }
    const startSeconds = timeToSeconds(payload.startTime);
    const endSeconds = timeToSeconds(payload.endTime);
    if (
      startSeconds !== null &&
      endSeconds !== null &&
      endSeconds <= startSeconds
    ) {
      ruleFeedback.textContent =
        "Hora final deve ser maior que hora inicial.";
      ruleFeedback.classList.add("is-error");
      return;
    }
  }

  try {
    const actionLabel =
      payload.actionType === 1 ? "desbloqueio" : "bloqueio";
    const targetLabel = TARGET_LABEL[payload.targetType] || "Alvo";
    const confirmed = await openConfirmModal({
      title: editingId ? "Confirmar atualizacao" : "Confirmar agendamento",
      message: `Deseja salvar o agendamento de ${actionLabel} para ${targetLabel}: ${payload.targetValue}?`,
      confirmText: editingId ? "Atualizar" : "Salvar",
    });
    if (!confirmed) return;

    const url = editingId ? `/api/schedules/${editingId}` : "/api/schedules";
    const method = editingId ? "PUT" : "POST";
    const response = await apiFetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      ruleFeedback.textContent = data.error || "Erro ao salvar a regra.";
      ruleFeedback.classList.add("is-error");
      return;
    }

    const apiFailure = getApiFailureDetails(data?.api);
    if (apiFailure) {
      const detailBlock = apiFailure.detail
        ? `<div class="response-box">${escapeHtml(apiFailure.detail)}</div>`
        : "";
      ruleFeedback.innerHTML = `<div>${escapeHtml(
        apiFailure.message
      )}</div>${detailBlock}`;
      ruleFeedback.classList.add("is-error");
      return;
    }

    const statusInfo = data.api?.status
      ? `Status da API: ${data.api.status}`
      : "Status da API nao registrado.";
    const responseText = data.api?.responseText
      ? escapeHtml(data.api.responseText)
      : "Sem resposta.";

    const actionText = editingId ? "Regra atualizada" : "Regra salva";
    ruleFeedback.innerHTML = `
      <div>${actionText}. ${escapeHtml(statusInfo)}</div>
      <div class="response-box">${responseText}</div>
    `;
    ruleFeedback.classList.add("is-success");

    await loadControl();
    showView("control");
    resetForm();
  } catch (err) {
    ruleFeedback.textContent = "Falha ao salvar a regra.";
    ruleFeedback.classList.add("is-error");
  }
});

tokenForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  tokenFeedback.textContent = "";
  tokenFeedback.className = "feedback";

  const formData = new FormData(tokenForm);
  const payload = {
    bearer_token: formData.get("bearer_token"),
  };

  try {
    const response = await apiFetch("/api/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) throw new Error("Erro ao salvar token");
    tokenFeedback.textContent = "Token salvo com sucesso.";
    tokenFeedback.classList.add("is-success");
  } catch (err) {
    tokenFeedback.textContent = "Falha ao salvar token.";
    tokenFeedback.classList.add("is-error");
  }
});

if (tokenToggleButton && tokenForm) {
  tokenToggleButton.addEventListener("click", () => {
    const input = tokenForm.elements.bearer_token;
    if (!input) return;
    const isHidden = input.type === "password";
    input.type = isHidden ? "text" : "password";
    tokenToggleButton.textContent = isHidden ? "Ocultar" : "Mostrar";
  });
}

if (tokenCopyButton && tokenForm) {
  tokenCopyButton.addEventListener("click", async () => {
    const input = tokenForm.elements.bearer_token;
    if (!input || !input.value) return;
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(input.value);
      } else {
        input.select();
        document.execCommand("copy");
        input.setSelectionRange(0, 0);
      }
      tokenFeedback.textContent = "Token copiado.";
      tokenFeedback.className = "feedback is-success";
    } catch {
      tokenFeedback.textContent = "Nao foi possivel copiar o token.";
      tokenFeedback.className = "feedback is-error";
    }
  });
}

async function loadTokens() {
  tokenFeedback.textContent = "";
  tokenFeedback.className = "feedback";

  try {
    const response = await apiFetch("/api/token");
    const data = await response.json();
    tokenForm.elements.bearer_token.value = data.bearer_token || "";
    tokenForm.elements.bearer_token.type = "password";
    if (tokenToggleButton) {
      tokenToggleButton.textContent = "Mostrar";
    }
  } catch (err) {
    tokenFeedback.textContent = "Falha ao carregar token.";
    tokenFeedback.classList.add("is-error");
  }
}

async function initializeApp() {
  updateScheduleVisibility();
  setRole(null);
  const token = getAuthToken();
  if (!token) {
    showView("login");
    return;
  }

  const response = await apiFetch("/api/session");
  if (!response.ok) {
    handleUnauthorized();
    return;
  }

  const session = await response.json();
  setRole(session.role || "user");

  showView("control");
  await loadControl();
}

initializeWorkflow();
initializeApp();
