const views = {
  login: document.getElementById("view-login"),
  register: document.getElementById("view-register"),
  control: document.getElementById("view-control"),
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

  closeControlMenu();
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

function getAuthToken() {
  return window.localStorage.getItem(AUTH_TOKEN_KEY);
}

function setAuthToken(token) {
  if (token) {
    window.localStorage.setItem(AUTH_TOKEN_KEY, token);
  } else {
    window.localStorage.removeItem(AUTH_TOKEN_KEY);
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

function handleControlAction(action, group) {
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
      const scheduleId = representativeSchedule?.id;
      if (!scheduleId) break;
      const confirmDelete = window.confirm(
        "Deseja excluir a regra mais recente deste alvo?"
      );
      if (!confirmDelete) break;
      deleteSchedule(scheduleId);
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

async function loadTokens() {
  tokenFeedback.textContent = "";
  tokenFeedback.className = "feedback";

  try {
    const response = await apiFetch("/api/token");
    const data = await response.json();
    tokenForm.elements.bearer_token.value = data.bearer_token || "";
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

initializeApp();
