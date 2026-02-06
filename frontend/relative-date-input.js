/**
 * Exemplo de Interface Frontend para Tempo Relativo
 * 
 * Componentes React/JavaScript para o formulário de bloqueio
 * com suporte a expressões de tempo relativo
 */

// ===== UTILITÁRIOS DO LADO DO CLIENTE =====

/**
 * Formata um Date para display amigável
 */
function formatDateForDisplay(date) {
  const now = new Date();
  const diff = date.getTime() - now.getTime();
  
  const seconds = Math.floor(Math.abs(diff) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  const prefix = diff < 0 ? 'há' : 'em';
  
  if (days > 0) {
    return `${prefix} ${days} dia${days > 1 ? 's' : ''}`;
  }
  if (hours > 0) {
    return `${prefix} ${hours} hora${hours > 1 ? 's' : ''}`;
  }
  if (minutes > 0) {
    return `${prefix} ${minutes} minuto${minutes > 1 ? 's' : ''}`;
  }
  return 'agora';
}

/**
 * Preview visual para campos de data
 */
function updateDatePreview(inputElementId, previewElementId) {
  const input = document.getElementById(inputElementId);
  const preview = document.getElementById(previewElementId);
  
  if (!input || !preview) return;
  
  const value = input.value?.trim();
  
  if (!value) {
    preview.textContent = '';
    preview.className = 'date-preview empty';
    return;
  }
  
  // Chamar API de validação
  validateDateExpression(value)
    .then(result => {
      if (result.error) {
        preview.textContent = `❌ ${result.error}`;
        preview.className = 'date-preview error';
      } else {
        const date = new Date(result.resolved);
        const formatted = formatDateForDisplay(date);
        const absolute = date.toLocaleString('pt-BR');
        preview.textContent = `${formatted} (${absolute})`;
        preview.className = 'date-preview valid';
      }
    })
    .catch(err => {
      preview.textContent = `❌ Erro: ${err.message}`;
      preview.className = 'date-preview error';
    });
}

/**
 * Valida uma expressão de data via API
 */
async function validateDateExpression(dateInput) {
  const response = await fetch(
    `/api/schedules/validate-date?date=${encodeURIComponent(dateInput)}`
  );
  
  if (!response.ok) {
    const error = await response.json();
    return { error: error.error };
  }
  
  return response.json();
}

/**
 * Carrega presets de datas disponíveis
 */
async function loadDatePresets() {
  try {
    const response = await fetch('/api/schedules/date-presets');
    if (!response.ok) throw new Error('Erro ao carregar presets');
    return await response.json();
  } catch (err) {
    console.error('Erro ao carregar presets:', err);
    return { presets: [] };
  }
}

// ===== COMPONENTE: Input de Data com Presets =====

/**
 * HTML para campo de data relativa
 */
const HTML_RELATIVE_DATE_INPUT = `
<div class="date-input-container">
  <label for="date-input">Data</label>
  
  <!-- Abas: Preset vs Personalizado -->
  <div class="date-input-tabs">
    <button type="button" class="tab-btn active" data-tab="preset">
      Presets
    </button>
    <button type="button" class="tab-btn" data-tab="custom">
      Personalizado
    </button>
  </div>

  <!-- Aba de Presets -->
  <div class="tab-content active" id="preset-tab">
    <div class="preset-buttons">
      <button type="button" class="preset-btn" data-value="now">
        Agora
      </button>
      <button type="button" class="preset-btn" data-value="now+1h">
        +1h
      </button>
      <button type="button" class="preset-btn" data-value="now+6h">
        +6h
      </button>
      <button type="button" class="preset-btn" data-value="now+1d">
        +1 dia
      </button>
      <button type="button" class="preset-btn" data-value="now+7d">
        +7 dias
      </button>
      <button type="button" class="preset-btn" data-value="now+1w">
        +1 semana
      </button>
      <button type="button" class="preset-btn" data-value="now+1mo">
        +1 mês
      </button>
    </div>
  </div>

  <!-- Aba Personalizada -->
  <div class="tab-content" id="custom-tab">
    <div class="input-group">
      <input 
        type="text" 
        id="date-input" 
        class="date-input"
        placeholder="Ex: now+7d, now+1d+12h, 2026-02-18T10:00:00Z"
        autocomplete="off"
      />
      <small class="help-text">
        Use "now" com modificadores: +7d, -3h, +1w+2d, etc.
      </small>
    </div>
  </div>

  <!-- Preview -->
  <div class="date-preview empty" id="date-preview"></div>
</div>

<style>
.date-input-container {
  margin-bottom: 1rem;
}

.date-input-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid #ccc;
}

.tab-btn {
  padding: 0.5rem 1rem;
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  color: #666;
  transition: all 0.3s;
}

.tab-btn.active {
  color: #0066cc;
  border-bottom-color: #0066cc;
}

.tab-content {
  display: none;
}

.tab-content.active {
  display: block;
  animation: slideIn 0.2s;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.preset-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.preset-btn {
  padding: 0.5rem 1rem;
  background: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.preset-btn:hover {
  background: #e0e0e0;
  border-color: #999;
}

.preset-btn:active {
  background: #0066cc;
  color: white;
  border-color: #0066cc;
}

.date-input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: monospace;
  font-size: 0.95rem;
}

.date-input:focus {
  outline: none;
  border-color: #0066cc;
  box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.1);
}

.help-text {
  display: block;
  margin-top: 0.5rem;
  color: #666;
  font-size: 0.85rem;
}

.date-preview {
  margin-top: 0.5rem;
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 0.9rem;
  min-height: 1.5rem;
}

.date-preview.empty {
  display: none;
}

.date-preview.valid {
  background: #e8f5e9;
  color: #2e7d32;
  border: 1px solid #4caf50;
}

.date-preview.error {
  background: #ffebee;
  color: #c62828;
  border: 1px solid #f44336;
}
</style>
`;

// ===== CONTROLADOR DO COMPONENTE =====

class RelativeDateInput {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.init();
  }

  init() {
    // Adicionar HTML
    this.container.innerHTML = HTML_RELATIVE_DATE_INPUT;

    // Elementos
    this.input = this.container.querySelector('#date-input');
    this.preview = this.container.querySelector('#date-preview');
    this.tabs = this.container.querySelectorAll('.tab-btn');
    this.presetBtns = this.container.querySelectorAll('.preset-btn');
    this.tabContents = this.container.querySelectorAll('.tab-content');

    // Event listeners
    this.input.addEventListener('input', () => this.onInputChange());
    this.tabs.forEach(tab => {
      tab.addEventListener('click', (e) => this.switchTab(e.target.dataset.tab));
    });
    this.presetBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.selectPreset(btn.dataset.value);
      });
    });
  }

  switchTab(tabName) {
    // Atualizar botões
    this.tabs.forEach(tab => {
      tab.classList.toggle('active', tab.dataset.tab === tabName);
    });

    // Atualizar conteúdo
    this.tabContents.forEach(content => {
      content.classList.toggle(
        'active',
        content.id === `${tabName}-tab`
      );
    });
  }

  selectPreset(value) {
    this.input.value = value;
    this.switchTab('custom');
    this.input.focus();
    this.onInputChange();
  }

  async onInputChange() {
    const value = this.input.value?.trim();

    if (!value) {
      this.preview.textContent = '';
      this.preview.className = 'date-preview empty';
      return;
    }

    try {
      const result = await validateDateExpression(value);
      
      if (result.error) {
        this.preview.textContent = `❌ ${result.error}`;
        this.preview.className = 'date-preview error';
      } else {
        const date = new Date(result.resolved);
        const formatted = formatDateForDisplay(date);
        const absolute = date.toLocaleString('pt-BR');
        this.preview.textContent = `✓ ${formatted} (${absolute})`;
        this.preview.className = 'date-preview valid';
      }
    } catch (err) {
      this.preview.textContent = `❌ Erro: ${err.message}`;
      this.preview.className = 'date-preview error';
    }
  }

  getValue() {
    return this.input.value?.trim() || null;
  }

  setValue(value) {
    this.input.value = value;
    this.onInputChange();
  }
}

// ===== EXEMPLO DE USO =====

/*
HTML:
<form id="bloqueio-form">
  <div id="inicio-container"></div>
  <div id="fim-container"></div>
  <button type="submit">Bloquear</button>
</form>

JavaScript:
const inputInicio = new RelativeDateInput('inicio-container');
const inputFim = new RelativeDateInput('fim-container');

document.getElementById('bloqueio-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const payload = {
    message: "Wagner, procure seu gestor",
    actionType: 0,
    scheduleType: 1,
    startDate: inputInicio.getValue(),
    endDate: inputFim.getValue(),
    targetType: 0,
    targetValue: "wagner.santos@company.com"
  };

  const response = await fetch('/api/schedules', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (response.ok) {
    alert('Bloqueio criado com sucesso!');
  } else {
    const error = await response.json();
    alert(`Erro: ${error.error}`);
  }
});
*/

// Exportar para uso
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    RelativeDateInput,
    validateDateExpression,
    loadDatePresets,
    formatDateForDisplay,
  };
}
