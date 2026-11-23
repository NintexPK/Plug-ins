import { i as css, s as LitElement, y as html } from './query-assigned-elements-8a604587.js';

/* =====================================================================
   Milestones table (v1.0)
   Una fila por milestone: Name (texto) | Type (desplegable) |
   Status (desplegable) | CompletionDate (fecha).
   Valor que se guarda (updatedJson):
     [{"Name":"...","Type":"...","Status":"...","CompletionDate":"2026-11-30"}, ...]
   Si falta algún campo obligatorio, la primera fila lleva "_faltan": true
   (lo pueden leer las reglas del formulario para bloquear el envío).
   Tabla sin filas = valor vacío ("").
   ===================================================================== */

const TAG = 'pk-milestones-table';

// Columnas fijas. "key" es el nombre en el JSON; "label" es la cabecera; "options" los valores del desplegable.
const FIELDS = [
  { key: 'Name', label: 'Milestone name', kind: 'text' },
  { key: 'Description', label: 'Milestone description', kind: 'text' },
  { key: 'Type', label: 'Milestone type', kind: 'select', options: ['Health', 'Implementation', 'Money Step'] },
  { key: 'Status', label: 'Milestone status', kind: 'select', options: ['Not started', 'Started', 'Completed', 'Cancelled'] },
  { key: 'CompletionDate', label: 'Milestone completion date', kind: 'date' }
];

// Obligatoriedad por defecto (igual que el formulario actual). "Reglas de obligatorio" la cambia.
const DEFAULT_REQUIRED = { Name: 'siempre', Description: 'nunca', Type: 'siempre', Status: 'siempre', CompletionDate: 'siempre' };

// Textos visibles (para traducirlos, cambiar solo aquí)
const MSG = {
  required: 'This is a required field.',
  cantSave: 'The milestone cannot be saved:',
  isRequired: l => `${l}: this is a required field.`,
  chooseOption: (l, o) => `${l}: choose one of the options (${o.join(', ')}).`,
  badDate: l => `${l}: enter a valid date.`,
  duplicated: n => `There is already a milestone named "${n}".`,
  mustExist: f => `A milestone with ${f} is required.`,
  mustBe: (f, c) => `Every milestone with ${f} must have ${c}.`,
  mustExistWith: (f, c) => `A milestone with ${f} and ${c} is required.`,
  missingIn: (n, ls) => `${n || '(no name)'}: ${ls.join(', ')}`,
  empty: 'No milestones yet. Click "Add" to create one.',
  search: 'Search...'
};

const baseStyle = css`
  :host {
    display: block;
    width: 100%;
    box-sizing: border-box;
    --_ink: var(--nac-ink, var(--pk-ink, rgba(0, 0, 0, 0.87)));
    --_muted: var(--nac-muted, var(--pk-muted, rgba(0, 0, 0, 0.54)));
    --_bg: var(--nac-bg, var(--pk-white, #fff));
    --_line: var(--nac-line, #c4c4c4);
    --_line-strong: var(--nac-line-strong, #b5b5b5);
    --_line-hover: var(--nac-line-hover, var(--pk-line-hover, rgba(0, 0, 0, 0.87)));
    --_primary: var(--nac-primary, var(--pk-primary, rgb(25, 118, 210)));
    --_primary-dark: var(--nac-primary-dark, var(--pk-primary-dark, rgb(13, 71, 161)));
    --_primary-soft: var(--nac-primary-soft, var(--pk-primary-soft, rgba(25, 118, 210, 0.08)));
    --_focus-ring: var(--nac-focus-ring, var(--pk-focus-ring, 0 0 0 1px rgb(25, 118, 210)));
    --_header-bg: var(--nac-header-bg, var(--pk-surface-tint, #fff));
    --_header-border: var(--nac-header-border, var(--pk-primary, #ccc));
    --_hover-bg: var(--nac-hover-bg, rgba(0, 0, 0, 0.03));
    --_selected-bg: var(--nac-selected-bg, var(--pk-primary-soft, rgba(25, 118, 210, 0.08)));
    --_selected-border: var(--nac-selected-border, var(--pk-primary, transparent));
    --_locked-fg: var(--nac-locked-fg, var(--pk-disabled-fg, rgba(0, 0, 0, 0.45)));
    --_disabled-fg: var(--nac-disabled-fg, rgba(0, 0, 0, 0.3));
    --_danger: var(--nac-danger, #e00000);
    --_toolbar-bg: var(--nac-toolbar-bg, var(--pk-surface-tint, rgba(0, 0, 0, 0.04)));
    --_radius: var(--nac-radius, var(--pk-radius, 4px));
    --_radius-sm: var(--nac-radius-sm, var(--pk-radius-sm, 4px));
    font-family: var(--nac-font, var(--pk-font));
    color: var(--_ink);
  }
  .nac-root {
    box-sizing: border-box;
    background-color: var(--nac-host-bg, #ffffff) !important;
    padding: var(--nac-host-padding, 0.75rem);
    border-radius: var(--_radius);
  }
  .top-panel { display: flex; justify-content: space-between; align-items: center; gap: 1rem; margin-bottom: 1rem; }

  /* Buscador */
  .search-wrapper { height: 3.5rem; width: 100%; max-width: 26.25rem; position: relative; }
  .search-icon { position: absolute; top: 50%; transform: translateY(-50%); left: 1rem; color: var(--_muted); fill: currentColor; }
  .search-input { height: 3.5rem; width: 100%; padding: 0 0.875rem 0 3rem; color: var(--_ink); background: var(--_bg); font-size: 1rem; }
  .input-styled { border-radius: var(--_radius); box-sizing: border-box; border: 1px solid var(--_line-strong); outline: none; font-family: inherit; transition: border-color .15s, box-shadow .15s; }
  .input-styled:hover { border-color: var(--_line-hover); }
  .input-styled:focus { box-shadow: var(--_focus-ring); border-color: var(--_primary); }

  /* Barra de botones */
  .toolbar { display: flex; justify-content: space-between; align-items: center; box-sizing: border-box; height: 3.5rem; padding: 0 14px; width: 100%; max-width: 420px; background: var(--_toolbar-bg); border: 1px solid var(--_line); border-radius: var(--_radius); }
  .toolbar button { background: transparent; cursor: pointer; display: flex; align-items: center; gap: 2px; border: none; border-radius: var(--_radius-sm); padding: 8px; font-family: inherit; font-weight: 600; color: var(--nac-btn-color, var(--_muted)); }
  .toolbar button:hover:not(:disabled) { color: var(--_primary-dark); background: var(--_primary-soft); }
  .toolbar button:focus-visible { box-shadow: var(--_focus-ring); }
  .toolbar button:disabled { cursor: default; color: var(--_disabled-fg); }
  .toolbar button.delete { color: var(--_danger); }
  .toolbar button.delete:disabled { color: var(--_disabled-fg); }

  /* Mensajes */
  .msg { margin: 0 0 0.75rem; padding: 0.6rem 0.9rem; border-radius: var(--_radius-sm); font-size: 0.875rem; border: 1px solid; }
  .msg ul { margin: 0.25rem 0 0; padding-left: 1.1rem; }
  .msg.ko { color: var(--nac-ko, #c62828); background: var(--nac-ko-bg, #fdecea); border-color: var(--nac-ko, #c62828); }
  .msg.warn { color: var(--nac-warn, #b45309); background: var(--nac-warn-bg, #fff4e5); border-color: var(--nac-warn, #e67e22); }

  /* Tabla */
  .table-wrapper { border-radius: var(--_radius); overflow: hidden; border: 1px solid var(--_line); }
  table { width: 100%; border-collapse: collapse; font-size: 0.875rem; background: var(--_bg); table-layout: fixed; }
  th, td { padding: 0 0.5rem; border-top: 1px solid var(--_line); text-align: left; vertical-align: middle; position: relative; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  th { white-space: normal; line-height: 1.2; font-weight: 700; height: 3.5rem; border-top: none; border-bottom: 2px solid var(--_header-border); cursor: pointer; user-select: none; }
  th .req { color: var(--_danger); margin-left: 2px; }
  th .arrow { margin-left: 4px; font-size: 0.75rem; opacity: 0.7; }
  th.col-Name { width: 22%; }
  th.col-Description { width: 28%; }
  thead tr { background: var(--_header-bg); }
  tr { height: 3.25rem; }
  tbody tr:hover { background: var(--_hover-bg); }
  tr.selected, tr.selected:hover { background: var(--_selected-bg); }
  tr.selected td:first-child { box-shadow: inset 3px 0 0 var(--_selected-border); }
  tr.locked { color: var(--_locked-fg); cursor: not-allowed; }
  td.locked-cell { color: var(--_locked-fg); }
  tr.edit td { padding: 4px; }
  .cell-input { width: 100%; height: 2.6rem; padding: 0 0.5rem; font-size: inherit; color: inherit; background: var(--_bg); border-radius: var(--_radius-sm); }
  select.cell-input { cursor: pointer; }
  td.invalid .cell-input { border-color: var(--_danger); box-shadow: 0 0 0 1px var(--_danger); }
  .req-tag { display: inline-block; padding: 2px 8px; border-radius: 2px; background: var(--_danger); color: #fff; font-size: 0.75rem; }
  .empty-row td { text-align: center; color: var(--_muted); height: 4rem; white-space: normal; }

  /* Paginación */
  .pagination { display: flex; justify-content: flex-end; align-items: center; gap: 0.25rem; padding: 0.5rem 0; font-size: 0.875rem; }
  .pagination span { margin-right: 1rem; }
  .pagination button { border: 0; background: transparent; border-radius: 50%; padding: 0.4rem 0.6rem; cursor: pointer; color: var(--_primary); font-size: 1rem; }
  .pagination button:disabled { cursor: default; color: var(--_disabled-fg); }

  @media (max-width: 872px) {
    .top-panel { flex-direction: column; align-items: stretch; }
  }
`;

const ICONS = {
  add: 'M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z',
  edit: 'M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z',
  discard: 'M13.5,7A6.5,6.5 0 0,1 20,13.5A6.5,6.5 0 0,1 13.5,20H10V18H13.5C16,18 18,16 18,13.5C18,11 16,9 13.5,9H7.83L10.91,12.09L9.5,13.5L4,8L9.5,2.5L10.92,3.91L7.83,7H13.5M6,18H8V20H6V18Z',
  save: 'M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z',
  del: 'M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z',
  search: 'M9.5,4C13.09,4 16,6.91 16,10.5C16,12.12 15.41,13.6 14.43,14.73L20.08,20.38L19.37,21.09L13.72,15.44C12.59,16.41 11.11,17 9.5,17C5.91,17 3,14.09 3,10.5C3,6.91 5.91,4 9.5,4M9.5,5C6.46,5 4,7.46 4,10.5C4,13.54 6.46,16 9.5,16C12.54,16 15,13.54 15,10.5C15,7.46 12.54,5 9.5,5Z'
};
const icon = d => html`<svg height="18" width="18" viewBox="0 0 24 24" fill="currentColor"><path d="${d}"></path></svg>`;

class NacMilestones extends LitElement {
  static get styles() {
    return [baseStyle];
  }

  static get properties() {
    return {
      value: { type: String },
      stage: { type: String },
      controlField: {},
      controlField2: {},
      tableRules: { type: String },
      requiredRules: { type: String },
      stageRules: { type: String },
      allowDelete: { type: Boolean },
      readOnly: { type: Boolean },
      readonly: { type: String }
    };
  }

  static getMetaConfig() {
    return import('./plugin-milestone.config.js').then(x => x.config);
  }

  constructor() {
    super();
    this.value = '';
    this.stage = '';
    this.controlField = '';
    this.controlField2 = '';
    this.tableRules = '';
    this.ready = false;
    this.requiredRules = '';
    this.stageRules = '';
    this.dateFormat = 'dd/mm/yyyy'; // formato fijo de la fecha mostrada
    this.allowDelete = true;
    this.readOnly = false;
    this.readonly = false;

    this.data = [];
    this.selected = null;   // fila seleccionada (objeto de this.data)
    this.editMode = false;
    this.draft = null;      // copia de la fila mientras se edita
    this.isNew = false;     // la fila en edición se acaba de añadir con Add
    this.errors = [];
    this.invalid = [];
    this.searchText = '';
    this.sort = { field: '', dir: 'asc' };
    this.page = 1;
    this.pageSize = 10;
    this.userEdited = false;
    this.lastEmitted = null;
  }

  /* ---------------------------- utilidades ---------------------------- */

  decodeText(v) {
    return String(v ?? '').trim()
      .replace(/&#0*39;|&apos;/gi, "'")
      .replace(/&quot;|&#0*34;/gi, '"')
      .replace(/&lt;/gi, '<')
      .replace(/&gt;/gi, '>')
      .replace(/&amp;/gi, '&');
  }

  parseJson(text) {
    const raw = this.decodeText(text);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch (err) {
      // Admite comillas simples y tipográficas, habituales al escribir en Nintex
      return JSON.parse(raw.replace(/[‘’“”']/g, '"'));
    }
  }

  usableJson(text) {
    const t = typeof text === 'string' ? text.trim() : '';
    if (/^[\[{]/.test(t)) return t;
    // La columna de SharePoint puede llegar envuelta en el XML de la sección repetida:
    // <RepeaterData>...<Item><_id type="System.String">[{...}]</_id></Item>...</RepeaterData>
    if (t.startsWith('<')) {
      const m = t.match(/<Item>\s*<[^>]+>([\s\S]*?)<\/[^>]+>\s*<\/Item>/i);
      const inner = m ? this.decodeText(m[1]) : '';
      if (/^[\[{]/.test(inner)) return inner;
    }
    return '';
  }

  // Valor de un control de Nintex: puede llegar como texto, lista u objeto
  plain(v) {
    if (Array.isArray(v)) v = v[0];
    if (v && typeof v === 'object') v = v.value ?? v.label ?? v.text ?? '';
    return String(v ?? '').trim();
  }

  // Lista separada por ; o saltos de línea (o por comas si no hay ;). También acepta JSON ["a","b"]
  toList(v) {
    if (Array.isArray(v)) return v.map(x => this.plain(x)).filter(Boolean);
    const t = this.decodeText(v);
    if (!t) return [];
    if (t.startsWith('[')) {
      try {
        const arr = this.parseJson(t);
        if (Array.isArray(arr)) return arr.map(x => this.plain(x)).filter(Boolean);
      } catch (e) { /* se trata como texto */ }
    }
    const sep = /[;\n]/.test(t) ? /[;\n]/ : /,/;
    return t.split(sep).map(x => x.trim()).filter(Boolean);
  }

  lower(v) {
    return String(v ?? '').trim().toLowerCase();
  }

  // Patrón de etapa: exacto (sin distinguir mayúsculas) o con * al final ('L3*'). '*' = cualquiera
  matches(value, patterns) {
    const v = this.lower(value);
    const list = Array.isArray(patterns) ? patterns : this.toList(patterns);
    return list.some(p => {
      const t = this.lower(p);
      if (t === '*') return !!v;
      if (t.endsWith('*')) return v.startsWith(t.slice(0, -1));
      // 'Yes' vale también para Sí, Si, true, 1 (y 'No' para false, 0)
      const yes = ['yes', 'sí', 'si', 'true', '1', 'y'];
      const no = ['no', 'false', '0', 'n'];
      if (yes.includes(t)) return yes.includes(v);
      if (no.includes(t)) return no.includes(v);
      return v === t;
    });
  }

  fieldOf(name) {
    const n = this.lower(name);
    return FIELDS.find(f => f.key.toLowerCase() === n || f.label.toLowerCase() === n) || null;
  }

  // Busca en un objeto una clave por nombre interno o etiqueta
  pick(obj, field) {
    if (!obj || typeof obj !== 'object') return undefined;
    const k = Object.keys(obj).find(x => {
      const l = x.toLowerCase();
      return l === field.key.toLowerCase() || l === field.label.toLowerCase();
    });
    return k === undefined ? undefined : obj[k];
  }

  isReadOnly() {
    const ro = v => v === true || String(v).toLowerCase() === 'true';
    return ro(this.readOnly) || ro(this.readonly);
  }

  canDelete() {
    return this.allowDelete !== false && String(this.allowDelete) !== 'false';
  }

  /* ------------------------------ fechas ------------------------------ */

  toISO(v) {
    const t = String(v ?? '').trim();
    if (!t) return '';
    let m = t.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (m) return `${m[1]}-${m[2]}-${m[3]}`;
    m = t.match(/^(\d{1,2})[\/.\-](\d{1,2})[\/.\-](\d{4})$/);
    if (m) {
      const us = this.lower(this.dateFormat).startsWith('mm');
      const d = us ? m[2] : m[1];
      const mo = us ? m[1] : m[2];
      return `${m[3]}-${mo.padStart(2, '0')}-${d.padStart(2, '0')}`;
    }
    return t;
  }

  validISO(t) {
    const m = String(t).match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (!m) return false;
    const d = new Date(+m[1], +m[2] - 1, +m[3]);
    return d.getFullYear() === +m[1] && d.getMonth() === +m[2] - 1 && d.getDate() === +m[3];
  }

  showDate(iso) {
    const m = String(iso ?? '').match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (!m) return iso ?? '';
    const f = this.lower(this.dateFormat) || 'dd/mm/yyyy';
    if (f.startsWith('yyyy')) return iso;
    if (f.startsWith('mm')) return `${m[2]}/${m[3]}/${m[1]}`;
    return `${m[3]}/${m[2]}/${m[1]}`;
  }

  /* ------------------------------ datos ------------------------------ */

  normalizeRow(r) {
    const row = {};
    FIELDS.forEach(f => {
      const v = this.pick(r, f);
      row[f.key] = f.kind === 'date' ? this.toISO(v) : String(v ?? '').trim();
    });
    // Se conservan otras columnas que vengan en el JSON (ID, etc.), salvo las internas "_"
    Object.keys(r || {}).forEach(k => {
      if (!k.startsWith('_') && !this.fieldOf(k)) row[k] = r[k];
    });
    return row;
  }

  loadRows(text) {
    const parsed = this.parseJson(text);
    const arr = Array.isArray(parsed) ? parsed : parsed && typeof parsed === 'object' ? [parsed] : [];
    return arr
      .filter(r => r && typeof r === 'object' && Object.keys(r).some(k => !k.startsWith('_')))
      .map(r => this.normalizeRow(r));
  }

  optionsFor(field) {
    return field.kind === 'select' && field.options && field.options.length ? field.options : null;
  }

  /* --------------------------- obligatoriedad --------------------------- */

  requiredMap() {
    const map = { ...DEFAULT_REQUIRED };
    const t = this.decodeText(this.requiredRules);
    if (!t) return map;
    try {
      const r = this.parseJson(t);
      if (r && typeof r === 'object' && !Array.isArray(r)) {
        // '*' = regla para todas las columnas; después se aplican las de cada columna
        const all = Object.keys(r).find(k => ['*', 'todos', 'todas', 'all'].includes(this.lower(k)));
        if (all !== undefined) FIELDS.forEach(f => (map[f.key] = r[all]));
        Object.keys(r).forEach(k => {
          if (k === all) return;
          const f = this.fieldOf(k);
          if (f) map[f.key] = r[k];
          else console.warn(`Milestones: la columna "${k}" de "Reglas de obligatorio" no existe.`);
        });
      }
    } catch (err) {
      console.warn("Milestones: 'Reglas de obligatorio' no es un JSON válido; se usan las reglas por defecto.", `(${t.length} caracteres) …${t.slice(-60)}`);
    }
    return map;
  }

  // Condición de fila: {'Status':['Completed','Done']}  ('*' = con cualquier valor)
  rowCondition(cond, row) {
    if (!cond || typeof cond !== 'object') return true;
    return Object.keys(cond).every(col => {
      const f = this.fieldOf(col);
      const v = f ? row[f.key] : row[col];
      return this.matches(v, cond[col]);
    });
  }

  ruleApplies(rule, row) {
    if (rule === undefined || rule === null) return false;
    if (typeof rule === 'boolean') return rule;
    if (Array.isArray(rule)) return rule.some(r => this.ruleApplies(r, row)); // cualquiera de ellas (O)
    if (typeof rule === 'string') {
      const t = this.lower(rule);
      if (['siempre', 'si', 'sí', 'yes', 'true', 'always'].includes(t)) return true;
      if (['', 'nunca', 'no', 'false', 'never'].includes(t)) return false;
      return this.matches(this.stage, rule); // texto suelto = patrón(es) de etapa
    }
    if (typeof rule === 'object') {
      // Todas las condiciones indicadas se tienen que cumplir (Y)
      if (rule.etapa !== undefined && !this.matches(this.stage, rule.etapa)) return false;
      if (rule.campo !== undefined && !this.matches(this.plain(this.controlField), rule.campo)) return false;
      if (rule.campo2 !== undefined && !this.matches(this.plain(this.controlField2), rule.campo2)) return false;
      if (rule.si !== undefined && !this.rowCondition(rule.si, row)) return false;
      if (rule.excepto !== undefined && this.rowCondition(rule.excepto, row)) return false;
      return true;
    }
    return false;
  }

  isRequired(field, row) {
    return this.ruleApplies(this.requiredMap()[field.key], row || {});
  }

  // ¿Se debe mostrar el asterisco en la cabecera? (si es obligatorio en alguna situación actual)
  headerRequired(field) {
    const rule = this.requiredMap()[field.key];
    if (this.ruleApplies(rule, {})) return true;
    return this.data.some(r => this.ruleApplies(rule, r));
  }

  missingFields(row) {
    return FIELDS.filter(f => this.isRequired(f, row) && !String(row[f.key] ?? '').trim());
  }

  // Problemas de toda la tabla (filas guardadas a las que les falta algo con la etapa actual)
  /* Filas tal como se envían: la fila que se está editando va con lo escrito hasta ahora
     (así no se pierde si se envía el formulario sin pulsar Save en la tabla) */
  snapshot() {
    const out = [];
    this.data.forEach(r => {
      if (this.editMode && r === this.selected && this.draft) {
        const row = { ...r };
        FIELDS.forEach(f => (row[f.key] = String(this.draft[f.key] ?? '').trim()));
        if (this.isNew && FIELDS.every(f => !row[f.key])) return; // fila nueva todavía vacía
        out.push(row);
      } else {
        out.push({ ...r });
      }
    });
    return out;
  }

  tableIssues() {
    const issues = [];
    this.missingKo = false;
    this.snapshot().forEach(r => {
      const miss = this.missingFields(r);
      if (miss.length) {
        this.missingKo = true;
        issues.push(MSG.missingIn(r.Name, miss.map(f => f.label)));
      }
    });
    return [...new Set(issues.concat(this.tableRuleIssues()))]; // sin avisos repetidos
  }

  /* Reglas de tabla (JSON, lista). Cada regla:
       cuando : {'etapa':[...], 'campo':[...], 'campo2':[...]}  (todas se tienen que cumplir; opcional)
       filas  : {'Type':['Health']}         -> tiene que existir al menos un milestone así
       con    : {'Status':['Completed']}    -> (opcional) y todos esos milestones deben cumplir esto
       mensaje: texto propio (opcional)                                                  */
  tableRuleIssues() {
    const t = this.decodeText(this.tableRules);
    if (!t) return [];
    let rules;
    try {
      rules = this.parseJson(t);
    } catch (e) {
      console.warn("Milestones: 'Reglas de tabla' no es un JSON válido:", `(${t.length} caracteres) …${t.slice(-60)}`);
      return [];
    }
    // Sin corchetes (Nintex los toma como variables): {'r1':{...},'r2':{...}} equivale a una lista
    let entries;
    if (Array.isArray(rules)) entries = rules.map((r, i) => ['r' + (i + 1), r]);
    else if (rules && typeof rules === 'object') entries = rules.filas ? [['r1', rules]] : Object.entries(rules);
    else entries = [];
    const rows = this.snapshot();
    const describe = c => Object.keys(c || {}).map(k => {
      const f = this.fieldOf(k);
      const v = Array.isArray(c[k]) ? c[k].join(' / ') : c[k];
      return `${f ? f.label : k} = ${v}`;
    }).join(' and ');
    const issues = [];
    this.koKeys = [];
    entries.forEach(([key, r]) => {
      if (!r || typeof r !== 'object' || !r.filas) return;
      const when = r.cuando || {};
      if (!this.ruleApplies(when, {})) return;
      const matching = rows.filter(row => this.rowCondition(r.filas, row));
      let ok = matching.length > 0;
      if (ok && r.con) ok = matching.every(row => this.rowCondition(r.con, row));
      if (!ok) {
        let msg;
        if (!r.con) msg = MSG.mustExist(describe(r.filas));
        else if (matching.length) msg = MSG.mustBe(describe(r.filas), describe(r.con));
        else msg = MSG.mustExistWith(describe(r.filas), describe(r.con)); // no hay ninguno: falta y además debe cumplir 'con'
        issues.push(r.mensaje || msg);
        this.koKeys.push(String(key).replace(/[^A-Za-z0-9]/g, ''));
      }
    });
    return issues;
  }

  /* ----------------------------- solo lectura ----------------------------- */

  // Columnas bloqueadas por la etapa actual. 'Todo' = toda la tabla
  stageLocked() {
    const res = { all: false, cols: [] };
    const stage = this.lower(this.stage);
    const t = this.decodeText(this.stageRules);
    if (!stage || !t) return res;
    let rules;
    try {
      rules = this.parseJson(t);
    } catch (e) {
      console.warn("Milestones: 'Read only por etapa' no es un JSON válido:", `(${t.length} caracteres) …${t.slice(-60)}`);
      return res;
    }
    if (!rules || typeof rules !== 'object' || Array.isArray(rules)) return res;
    const keys = Object.keys(rules);
    let key = keys.find(k => this.lower(k) === stage);
    if (key === undefined) key = keys.find(k => k.trim().endsWith('*') && this.matches(this.stage, [k]));
    if (key === undefined) return res;
    const v = rules[key];
    const list = Array.isArray(v) ? v : this.toList(v);
    if (list.some(x => ['todo', 'todos', 'all', '*'].includes(this.lower(x)))) return { all: true, cols: FIELDS.map(f => f.key) };
    res.cols = list.map(x => this.fieldOf(x)).filter(Boolean).map(f => f.key);
    return res;
  }

  isRowLocked(row) {
    if (!row) return true;
    return this.stageLocked().all;
  }

  isCellLocked(row, field) {
    if (this.isNew && row === this.selected) return false; // fila nueva: todo editable
    if (this.isRowLocked(row)) return true;
    return this.stageLocked().cols.includes(field.key);
  }

  canEditRow(row) {
    return !!row && !this.isRowLocked(row) && FIELDS.some(f => !this.isCellLocked(row, f));
  }

  /* ----------------------------- validación ----------------------------- */

  validateRow(row, item) {
    const errors = [];
    const bad = new Set();
    FIELDS.forEach(f => {
      const v = String(row[f.key] ?? '').trim();
      if (!v) {
        if (this.isRequired(f, row)) {
          errors.push(MSG.isRequired(f.label));
          bad.add(f.key);
        }
        return;
      }
      const opts = this.optionsFor(f);
      if (opts) {
        const match = opts.find(o => o.toLowerCase() === v.toLowerCase());
        if (!match) {
          errors.push(MSG.chooseOption(f.label, opts));
          bad.add(f.key);
        } else {
          row[f.key] = match;
        }
      }
      if (f.kind === 'date' && !this.validISO(v)) {
        errors.push(MSG.badDate(f.label));
        bad.add(f.key);
      }
    });
    const name = this.lower(row.Name);
    if (name && this.data.some(o => o !== item && this.lower(o.Name) === name)) {
      errors.push(MSG.duplicated(row.Name));
      bad.add('Name');
    }
    return { errors, bad: [...bad] };
  }

  /* --------------------------- ciclo de vida --------------------------- */

  updated(changed) {
    const ruleProps = ['stage', 'controlField', 'controlField2', 'requiredRules', 'tableRules', 'stageRules'];
    if (ruleProps.some(p => changed.has(p))) {
      // Diagnóstico: en la consola del navegador (F12) se ve qué recibe el control
      console.info('Milestones · valores recibidos:', {
        etapa: this.stage,
        campo: this.controlField,
        campo2: this.controlField2,
        reglasTabla: this.decodeText(this.tableRules) || '(vacío)',
        avisos: this.tableIssues()
      });
      this.syncFlag();
    }
    if (this.userEdited) return; // lo editado por el usuario no se sobrescribe

    // Valor guardado (lo que Nintex restaura al abrir el formulario)
    const saved = this.usableJson(this.value);
    if (changed.has('value') && saved && saved !== this.lastEmitted) {
      try {
        const rows = this.loadRows(saved);
        this.data = rows;
        this.lastEmitted = saved;
        this.unselect();
        this.refresh();
        this.syncFlag();
        return;
      } catch (e) {
        console.error('Milestones: error al leer el valor guardado', e);
      }
    }
  }

  firstUpdated() {
    // Margen para que Nintex entregue el valor guardado antes de enviar nada
    setTimeout(() => {
      this.ready = true;
      this.syncFlag();
    }, 1500);
  }

  // Si cambia la etapa/campos/reglas, se reenvía el valor para actualizar la marca "_faltan"
  syncFlag() {
    if (!this.ready && !this.userEdited && !this.lastEmitted) return;
    // Hay un valor guardado que todavía no se ha cargado: no se envía nada para no pisarlo
    if (!this.userEdited && !this.data.length && String(this.value || '').trim() && this.value !== this.lastEmitted) return;
    if (this.isReadOnly() && !this.userEdited) return; // en solo lectura no se modifica nada
    const sent = (String(this.lastEmitted || '').match(/"_(faltan|ko_[A-Za-z0-9]+)":true/g) || []).sort().join('|');
    const now = this.flags().map(f => `"${f}":true`).join('|');
    if (sent !== now) this.emit();
  }

  /* Marcas que se añaden a la primera fila para las reglas del formulario:
     "_faltan": hay algún problema;  "_ko_<regla>": no se cumple esa regla de tabla (ej. "_ko_r3") */
  flags() {
    const issues = this.tableIssues();
    if (!issues.length) return [];
    this.tableRuleIssues(); // actualiza this.koKeys
    const keys = [...new Set(this.koKeys || [])];
    if (this.missingKo) keys.push('campos'); // algún milestone con campos obligatorios vacíos
    return ['_faltan', ...keys.map(k => '_ko_' + k)].sort();
  }

  emit() {
    let value = '';
    const rows = this.snapshot();
    const marks = {};
    this.flags().forEach(f => (marks[f] = true));
    if (rows.length) {
      Object.assign(rows[0], marks);
      value = JSON.stringify(rows);
    } else if (Object.keys(marks).length) {
      value = JSON.stringify([marks]); // tabla vacía pero falta algo (p. ej. el milestone Health)
    }
    this.lastEmitted = value;
    this.dispatchEvent(new CustomEvent('ntx-value-change', {
      bubbles: true,
      cancelable: false,
      composed: true,
      detail: value
    }));
  }

  refresh() {
    const total = Math.max(1, Math.ceil(this.visibleRows().length / this.pageSize));
    if (this.page > total) this.page = total;
    if (this.page < 1) this.page = 1;
    this.requestUpdate();
  }

  unselect() {
    this.selected = null;
    this.editMode = false;
    this.draft = null;
    this.isNew = false;
  }

  /* ------------------------------ acciones ------------------------------ */

  onAdd() {
    if (this.editMode || this.stageLocked().all) return;
    this.searchText = '';
    const s = this.shadowRoot?.querySelector('#search-input');
    if (s) s.value = '';
    this.sort = { field: '', dir: 'asc' };
    const row = {};
    FIELDS.forEach(f => (row[f.key] = ''));
    this.data.push(row);
    this.selected = row;
    this.draft = { ...row };
    this.isNew = true;
    this.editMode = true;
    this.errors = [];
    this.invalid = [];
    this.page = Math.ceil(this.visibleRows().length / this.pageSize);
    this.refresh();
    this.focusFirst();
  }

  onEdit() {
    if (!this.selected || this.editMode || !this.canEditRow(this.selected)) return;
    this.draft = { ...this.selected };
    this.isNew = false;
    this.editMode = true;
    this.errors = [];
    this.invalid = [];
    this.requestUpdate();
    this.focusFirst();
  }

  onDiscard() {
    if (!this.editMode) return;
    if (this.isNew) {
      const i = this.data.indexOf(this.selected);
      if (i >= 0) this.data.splice(i, 1);
    }
    this.errors = [];
    this.invalid = [];
    this.unselect();
    this.refresh();
    if (this.userEdited) this.emit(); // se quita lo que se había enviado de la fila descartada
  }

  onSave() {
    if (!this.editMode || !this.selected) return;
    const item = this.selected;
    // Solo se aceptan cambios en celdas editables
    const finalRow = { ...item };
    FIELDS.forEach(f => {
      if (!this.isCellLocked(item, f)) finalRow[f.key] = String(this.draft[f.key] ?? '').trim();
    });
    const check = this.validateRow(finalRow, item);
    if (check.errors.length) {
      this.errors = check.errors;
      this.invalid = check.bad;
      this.requestUpdate();
      return;
    }
    Object.assign(item, finalRow);
    this.errors = [];
    this.invalid = [];
    this.userEdited = true;
    this.unselect();
    this.refresh();
    this.emit();
  }

  onDelete() {
    if (!this.canDelete() || !this.selected || this.editMode || this.isRowLocked(this.selected)) return;
    const i = this.data.indexOf(this.selected);
    if (i >= 0) this.data.splice(i, 1);
    this.userEdited = true;
    this.unselect();
    this.refresh();
    this.emit();
  }

  onRowClick(item) {
    if (this.isReadOnly()) return;
    if (this.editMode) {
      if (this.selected === item) return;
      this.onDiscard(); // salir de la fila en edición sin guardar
    }
    this.selected = this.selected === item ? null : item;
    this.requestUpdate();
  }

  onRowDblClick(item) {
    if (this.isReadOnly() || this.editMode) return;
    this.selected = item;
    this.onEdit();
  }

  onKey(e) {
    if (!this.editMode) return;
    if (e.key === 'Enter' && e.target.tagName !== 'SELECT') {
      e.preventDefault();
      this.onSave();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      this.onDiscard();
    }
  }

  setDraft(field, value) {
    this.draft = { ...this.draft, [field.key]: value };
    if (this.invalid.includes(field.key)) this.invalid = this.invalid.filter(k => k !== field.key);
    this.userEdited = true;
    this.requestUpdate();
    this.emit(); // se envía ya, aunque no se pulse Save en la tabla
  }

  onSort(field) {
    if (this.editMode) return;
    this.sort = this.sort.field === field.key
      ? { field: field.key, dir: this.sort.dir === 'asc' ? 'desc' : 'asc' }
      : { field: field.key, dir: 'asc' };
    this.page = 1;
    this.requestUpdate();
  }

  focusFirst() {
    setTimeout(() => {
      const el = this.shadowRoot?.querySelector('tr.edit input:not([disabled]), tr.edit select:not([disabled])');
      if (el) el.focus();
    }, 50);
  }

  /* ------------------------------ vistas ------------------------------ */

  visibleRows() {
    const q = this.lower(this.searchText);
    let rows = this.data.filter(r => (this.editMode && r === this.selected) || !q ||
      FIELDS.some(f => this.lower(f.kind === 'date' ? this.showDate(r[f.key]) : r[f.key]).includes(q)));
    const { field, dir } = this.sort;
    if (field) {
      rows = [...rows].sort((a, b) => {
        const x = this.lower(a[field]);
        const y = this.lower(b[field]);
        if (x < y) return dir === 'asc' ? -1 : 1;
        if (x > y) return dir === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return rows;
  }

  render() {
    const ro = this.isReadOnly();
    return html`
      <div class="nac-root" @keydown="${e => this.onKey(e)}">
        <div class="top-panel">
          ${this.renderSearch()} ${ro ? null : this.renderToolbar()}
        </div>
        ${this.errors.length ? html`<div class="msg ko" role="alert">
              <strong>${MSG.cantSave}</strong>
              <ul>${this.errors.map(m => html`<li>${m}</li>`)}</ul>
            </div>` : null}
        ${this.renderTable(ro)}
      </div>
    `;
  }

  renderSearch() {
    return html`<div class="search-wrapper">
      <svg class="search-icon" height="24" width="24" viewBox="0 0 24 24"><path d="${ICONS.search}"></path></svg>
      <input id="search-input" class="search-input input-styled" placeholder="${MSG.search}"
        @input="${e => { this.searchText = e.target.value; this.page = 1; this.requestUpdate(); }}" />
    </div>`;
  }

  renderToolbar() {
    const sel = this.selected;
    const lockedAll = this.stageLocked().all;
    return html`<div class="toolbar">
      <button @click="${() => this.onAdd()}" ?disabled="${this.editMode || lockedAll}">${icon(ICONS.add)} Add</button>
      <button @click="${() => this.onEdit()}" ?disabled="${!sel || this.editMode || !this.canEditRow(sel)}">${icon(ICONS.edit)} Edit</button>
      <button @click="${() => this.onDiscard()}" ?disabled="${!this.editMode}">${icon(ICONS.discard)} Discard</button>
      <button @click="${() => this.onSave()}" ?disabled="${!this.editMode}">${icon(ICONS.save)} Save</button>
      ${this.canDelete() ? html`<button class="delete" @click="${() => this.onDelete()}"
          ?disabled="${!sel || this.editMode || this.isRowLocked(sel)}">${icon(ICONS.del)} Delete</button>` : null}
    </div>`;
  }

  renderTable(ro) {
    const rows = this.visibleRows();
    const totalPages = Math.max(1, Math.ceil(rows.length / this.pageSize));
    const start = (this.page - 1) * this.pageSize;
    const pageRows = rows.slice(start, start + this.pageSize);
    return html`
      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              ${FIELDS.map(f => html`<th class="col-${f.key}" @click="${() => this.onSort(f)}">
                  ${f.label}${this.headerRequired(f) ? html`<span class="req">*</span>` : null}
                  ${this.sort.field === f.key ? html`<span class="arrow">${this.sort.dir === 'asc' ? '▲' : '▼'}</span>` : null}
                </th>`)}
            </tr>
          </thead>
          <tbody>
            ${pageRows.length ? pageRows.map(item => this.renderRow(item, ro))
              : html`<tr class="empty-row"><td colspan="${FIELDS.length}">${MSG.empty}</td></tr>`}
          </tbody>
        </table>
      </div>
      ${totalPages > 1 ? html`<div class="pagination">
          <span>${start + 1}-${Math.min(start + this.pageSize, rows.length)} of ${rows.length}</span>
          <button ?disabled="${this.page === 1}" @click="${() => { this.page = 1; this.requestUpdate(); }}">«</button>
          <button ?disabled="${this.page === 1}" @click="${() => { this.page--; this.requestUpdate(); }}">‹</button>
          <button ?disabled="${this.page === totalPages}" @click="${() => { this.page++; this.requestUpdate(); }}">›</button>
          <button ?disabled="${this.page === totalPages}" @click="${() => { this.page = totalPages; this.requestUpdate(); }}">»</button>
        </div>` : null}
    `;
  }

  renderRow(item, ro) {
    const editing = this.editMode && this.selected === item;
    const locked = this.isRowLocked(item) && !(editing && this.isNew);
    const cls = [
      'table-row',
      editing ? 'edit' : '',
      this.selected === item ? 'selected' : '',
      locked ? 'locked' : ''
    ].join(' ');
    return html`<tr class="${cls}" @click="${() => this.onRowClick(item)}" @dblclick="${() => this.onRowDblClick(item)}">
      ${FIELDS.map(f => editing ? this.renderEditCell(item, f) : this.renderCell(item, f, ro))}
    </tr>`;
  }

  renderCell(item, f, ro) {
    const v = item[f.key];
    const empty = !String(v ?? '').trim();
    const missing = empty && this.isRequired(f, item);
    const text = f.kind === 'date' ? this.showDate(v) : v;
    return html`<td class="${this.isCellLocked(item, f) ? 'locked-cell' : ''}" title="${text ?? ''}">
      ${missing && !ro ? html`<span class="req-tag">${MSG.required}</span>` : text}
    </td>`;
  }

  renderEditCell(item, f) {
    const view = this.draft || item;
    const v = view[f.key] ?? '';
    const locked = this.isCellLocked(item, f);
    const tdCls = this.invalid.includes(f.key) ? 'invalid' : '';
    if (locked) {
      return html`<td class="locked-cell">${f.kind === 'date' ? this.showDate(v) : v}</td>`;
    }
    const opts = this.optionsFor(f);
    const req = this.isRequired(f, view);
    if (opts) {
      const current = String(v).toLowerCase();
      const known = opts.some(o => o.toLowerCase() === current);
      return html`<td class="${tdCls}">
        <select class="cell-input input-styled" aria-label="${f.label}" ?required="${req}"
          @click="${e => e.stopPropagation()}"
          @change="${e => this.setDraft(f, e.target.value)}">
          <option value="" ?selected="${!v}"></option>
          ${!known && v ? html`<option value="${v}" selected>${v}</option>` : null}
          ${opts.map(o => html`<option value="${o}" ?selected="${o.toLowerCase() === current}">${o}</option>`)}
        </select>
      </td>`;
    }
    if (f.kind === 'date') {
      return html`<td class="${tdCls}">
        <input type="date" class="cell-input input-styled" aria-label="${f.label}" ?required="${req}"
          .value="${this.validISO(v) ? v : ''}"
          @click="${e => e.stopPropagation()}"
          @change="${e => this.setDraft(f, e.target.value)}"
          @input="${e => this.setDraft(f, e.target.value)}" />
      </td>`;
    }
    return html`<td class="${tdCls}">
      <input type="text" class="cell-input input-styled" aria-label="${f.label}" ?required="${req}"
        .value="${v}"
        @click="${e => e.stopPropagation()}"
        @input="${e => this.setDraft(f, e.target.value)}" />
    </td>`;
  }
}

if (!customElements.get(TAG)) customElements.define(TAG, NacMilestones);

export { NacMilestones };
