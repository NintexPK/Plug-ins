import { i, _ as _decorate, s, e, y, a as e$1 } from './query-assigned-elements-8a604587.js';
 
const baseStyle = i`
  :host {
    height: 100%;
    width: 100%;
    display: block;

    /* ===== Tema =====
       Orden de prioridad de cada color:
         1) --nac-*  -> para cambiar algo en un formulario concreto
         2) --pk-*   -> variables corporativas del CSS del formulario
         3) valor neutro si no existe ninguna de las dos            */
    --_ink: var(--nac-ink, var(--pk-ink, rgba(0, 0, 0, 0.87)));
    --_muted: var(--nac-muted, var(--pk-muted, rgba(0, 0, 0, 0.54)));
    --_bg: var(--nac-bg, var(--pk-white, #fff));
    --_line: var(--nac-line, var(--pk-line, #ccc));
    --_line-strong: var(--nac-line-strong, var(--pk-line-strong, rgba(0, 0, 0, 0.23)));
    --_line-hover: var(--nac-line-hover, var(--pk-line-hover, rgba(0, 0, 0, 0.87)));
    --_primary: var(--nac-primary, var(--pk-primary, rgb(25, 118, 210)));
    --_primary-dark: var(--nac-primary-dark, var(--pk-primary-dark, rgb(13, 71, 161)));
    --_primary-soft: var(--nac-primary-soft, var(--pk-primary-soft, rgba(25, 118, 210, 0.08)));
    --_focus-ring: var(--nac-focus-ring, var(--pk-focus-ring, 0 0 0 1px rgb(25, 118, 210)));
    --_header-bg: var(--nac-header-bg, var(--pk-surface-tint, #fff));
    --_header-fg: var(--nac-header-fg, var(--pk-ink, rgba(0, 0, 0, 0.87)));
    --_header-border: var(--nac-header-border, var(--pk-primary, #ccc));
    --_hover-bg: var(--nac-hover-bg, rgba(0, 0, 0, 0.03));
    --_selected-bg: var(--nac-selected-bg, var(--pk-primary-soft, rgba(25, 118, 210, 0.08)));
    --_selected-fg: var(--nac-selected-fg, currentColor);
    --_selected-border: var(--nac-selected-border, var(--pk-primary, transparent));
    --_locked-fg: var(--nac-locked-fg, var(--pk-disabled-fg, rgba(0, 0, 0, 0.45)));
    --_disabled-fg: var(--nac-disabled-fg, var(--pk-line-hover, rgba(0, 0, 0, 0.3)));
    --_danger: var(--nac-danger, var(--pk-primary, #d32f2f));
    --_toolbar-bg: var(--nac-toolbar-bg, var(--pk-surface-tint, rgba(0, 0, 0, 0.04)));
    --_radius: var(--nac-radius, var(--pk-radius, 4px));
    --_radius-sm: var(--nac-radius-sm, var(--pk-radius-sm, 4px));

    font-family: var(--nac-font, var(--pk-font)); /* si no hay ninguna, hereda la del formulario */
    color: var(--_ink);
  }
`;
const NacTableStyles = i`
.table-wrapper {
  border-radius: var(--_radius);
  overflow: hidden;
  border: 1px solid var(--_line);
}
table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  font-family: inherit;
  font-size: 0.875rem;
  color: var(--_ink);
  background-color: var(--_bg);
}

th,
td {
  padding: 0 0.5rem;
  border-top: 1px solid var(--_line);
  text-align: left;
  vertical-align: middle;
  position: relative;
}

th {
  font-weight: 700;
  height: 3.5rem;
  text-transform: capitalize;
  border-top: none;
  border-bottom: 2px solid var(--_header-border);
  color: var(--_header-fg);
  cursor: pointer;
}
thead tr {
  background-color: var(--_header-bg) !important;
}

tr {
  background-color: var(--_bg);
  height: 3.25rem;
}

tbody tr:hover {
  background-color: var(--_hover-bg);
}

.table-row.selected,
.table-row.selected:hover {
  background-color: var(--_selected-bg);
  color: var(--_selected-fg);
}

.table-row.selected td:first-child {
  box-shadow: inset 3px 0 0 var(--_selected-border);
}

.locked-cell {
  color: var(--_locked-fg);
}

.table-row.edit .table-cell-value.locked-cell {
  visibility: visible;
}

.table-row.locked {
  color: var(--_locked-fg);
  cursor: not-allowed;
}

.table-row.locked:hover {
  background-color: var(--_bg);
}

.table-cell-value {
  visibility: visible;
}

.table-row.edit .table-cell-value {
  visibility: hidden;
}

.table-cell-input {
  position: absolute;
  left: 4px;
  right: 4px;
  top: 4px;
  bottom: 4px;
  padding: 0 0.5rem;
  font-size: inherit;
  color: inherit;
  background: var(--_bg);
  border-radius: var(--_radius-sm);
}

.dsc {
  transform: rotate(180deg);
}

.flex-item {
  display: flex;
}

.flex-item svg {
  fill: var(--_primary);
}

.top-panel {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.margin-left-4 {
  margin-left: 0.25rem;
}

.opacity {
  opacity: 1;
}

/* v3: validación y desplegables */
.error-msg {
  margin: 0 0 0.75rem;
  padding: 0.6rem 0.9rem;
  border-radius: var(--_radius);
  background: var(--_primary-soft);
  color: var(--_primary-dark);
  border: 1px solid var(--_primary);
  font-size: 0.875rem;
}
.error-msg ul {
  margin: 0.25rem 0 0;
  padding-left: 1.1rem;
}
td.invalid .table-cell-input {
  border-color: var(--_primary);
  box-shadow: var(--_focus-ring);
}
select.table-cell-input {
  cursor: pointer;
}
.table-row.edit td.month-locked {
  background-color: rgba(0, 0, 0, 0.025);
}

/*  search start*/
.search-wrapper {
  height: 3.5rem;
  width: 100%;
  max-width: 26.25rem;
  position: relative;
}
.search-icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 1rem;
  color: var(--_muted);
  fill: currentColor;
}
.search-input {
  height: 3.5rem;
  width: 100%;
  padding: 1.03125rem 0.875rem;
  padding-left: 3rem;
  color: var(--_ink);
  background: var(--_bg);
  font-family: inherit;
  font-size: 1rem;
}

.input-styled {
  border-radius: var(--_radius);
  box-sizing: border-box;
  border: 1px solid;
  border-color: var(--_line-strong);
  outline: none;
  font-family: inherit;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.input-styled:hover {
  border-color: var(--_line-hover);
}

.input-styled:focus {
  box-shadow: var(--_focus-ring);
  border-color: var(--_primary);
}
/* search end */

/* Pagination-start */
.pagination {
  color: var(--_ink);
  font-size: 0.875rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0.5rem 0;
  font-family: inherit;
}
.pagination-total {
  display: inline-flex;
  align-items: center;
  margin-right: 2rem;
}
.pagination-button {
  border: 0;
  outline: 0;
  padding: 0.5rem;
  background-color: transparent;
  border-radius: 50%;
  transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--_primary);
}

.pagination-button:hover {
  background-color: var(--_primary-soft);
}

.pagination-button:disabled {
  cursor: default;
  background-color: transparent;
  color: var(--_disabled-fg);
}


@media (max-width: 872px) {
  .top-panel {
    flex-direction: column;
  }
  .search-wrapper {
    margin-bottom: 1rem;
  }
}


@media (max-width: 767px) {
  th:not(:nth-of-type(1)):not(:nth-of-type(2)):not(:nth-of-type(3)),
  td:not(:nth-of-type(1)):not(:nth-of-type(2)):not(:nth-of-type(3)) {
    display: none;
  }
}
`;
const styles = [baseStyle, NacTableStyles];
 
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */console.warn("The main 'lit-element' module entrypoint is deprecated. Please update your imports to use the 'lit' package: 'lit' and 'lit/decorators.ts' or import from 'lit-element/lit-element.ts'. See https://lit.dev/msg/deprecated-import-path for more information.");
 
_decorate([e$1("lit-toolbar-v3")], function (_initialize, _LitElement) {
  class LitToolbar extends _LitElement {
    constructor(...args) {
      super(...args);
      _initialize(this);
    }
  }
  return {
    F: LitToolbar,
    d: [{
      kind: "field",
      decorators: [e({
        type: Boolean
      })],
      key: "editMode",
      value() {
        return false;
      }
    }, {
      kind: "field",
      decorators: [e({
        type: Boolean
      })],
      key: "hasSelectedRow",
      value() {
        return false;
      }
    }, {
      kind: "field",
      decorators: [e({
        type: Boolean
      })],
      key: "canAdd",
      value() {
        return true;
      }
    }, {
      kind: "field",
      decorators: [e({
        type: Boolean
      })],
      key: "canEdit",
      value() {
        return true;
      }
    }, {
      kind: "field",
      decorators: [e({
        type: Boolean
      })],
      key: "canDelete",
      value() {
        return true;
      }
    }, {
      kind: "get",
      static: true,
      key: "styles",
      value: function styles() {
        return i`
      :host {
        background-color: var(--_toolbar-bg, rgba(0, 0, 0, 0.04));
        border-radius: var(--_radius, 4px);
        width: 100%;
        max-width: 420px;
        font-family: inherit;
      }
      .button-wrapper {
        box-sizing: border-box;
        height: 56px;
        padding: 16.5px 14px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      button {
        background-color: transparent;
        cursor: pointer;
        display: flex;
        align-items: center;
        border: none;
        border-radius: var(--_radius-sm, 4px);
        outline: none;
        padding: 8px;
        margin: 0;
        font-family: inherit;
        font-weight: 600;
        color: var(--nac-btn-color, var(--_muted, rgba(0, 0, 0, 0.87)));
        transition: color 0.15s ease, background-color 0.15s ease;
      }

      .delete {
        color: var(--_danger, #d32f2f);
      }

      button:hover:not(:disabled) {
        color: var(--_primary-dark, rgb(13, 71, 161));
        background-color: var(--_primary-soft, rgba(25, 118, 210, 0.08));
      }

      button:focus-visible {
        box-shadow: var(--_focus-ring, 0 0 0 2px rgb(25, 118, 210));
      }

      button:disabled {
        cursor: default;
        color: var(--_disabled-fg, rgba(0, 0, 0, 0.3));
      }

      button > svg {
        margin-right: 2px;
      }
    `;
      }
    }, {
      kind: "method",
      key: "render",
      value: function render() {
        return y`
      <div class="button-wrapper">
        <button
          @click="${() => this.dispatchEvent(new CustomEvent("add-row"))}"
          ?disabled="${!this.canAdd}"
        >
          <svg
            height="18px"
            width="18px"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
          </svg>
          Add
        </button>
        <button
          @click="${() => this.dispatchEvent(new CustomEvent("edit-row"))}"
          ?disabled="${!this.hasSelectedRow || !this.canEdit || this.editMode}"
        >
          <svg
            height="18px"
            width="18px"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 22 22"
            fill="currentColor"
          >
            <path
              d="M16 2H17V3H18V4H19V5H20V6H19V7H18V8H17V7H16V6H15V5H14V4H15V3H16M12 6H14V7H15V8H16V10H15V11H14V12H13V13H12V14H11V15H10V16H9V17H8V18H7V19H6V20H2V16H3V15H4V14H5V13H6V12H7V11H8V10H9V9H10V8H11V7H12"
            />
          </svg>
          Edit
        </button>
        <button
          @click="${() => this.dispatchEvent(new CustomEvent("discard-row"))}"
          ?disabled="${!this.editMode}"
        >
          <svg
            height="18px"
            fill="currentColor"
            width="18px"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              d="M13.5,7A6.5,6.5 0 0,1 20,13.5A6.5,6.5 0 0,1 13.5,20H10V18H13.5C16,18 18,16 18,13.5C18,11 16,9 13.5,9H7.83L10.91,12.09L9.5,13.5L4,8L9.5,2.5L10.92,3.91L7.83,7H13.5M6,18H8V20H6V18Z"
            />
          </svg>
 
          Discard
        </button>
        <button
          @click="${() => this.dispatchEvent(new CustomEvent("save-row"))}"
          ?disabled="${!this.editMode}"
        >
          <svg
            height="18px"
            fill="currentColor"
            width="18px"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              d="M17 3H5C3.9 3 3 3.9 3 5V19C3 20.11 3.9 21 5 21H11.81C11.42 20.34 11.17 19.6 11.07 18.84C9.5 18.31 8.66 16.6 9.2 15.03C9.61 13.83 10.73 13 12 13C12.44 13 12.88 13.1 13.28 13.29C15.57 11.5 18.83 11.59 21 13.54V7L17 3M15 9H5V5H15V9M15.75 21L13 18L14.16 16.84L15.75 18.43L19.34 14.84L20.5 16.25L15.75 21"
            />
          </svg>
          Save
        </button>
${this.canDelete ? y`        <button
          class="delete"
          @click="${() => this.dispatchEvent(new CustomEvent("delete-row"))}"
          ?disabled="${!this.hasSelectedRow || this.editMode}"
        >
          <svg
            height="18px"
            width="18px"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
            />
          </svg>
          Delete
        </button>` : null}
      </div>
    `;
      }
    }]
  };
}, s);
 
let AndysTable = _decorate([e$1('andys-table-v3')], function (_initialize, _LitElement) {
  class AndysTable extends _LitElement {
    constructor(...args) {
      super(...args);
      _initialize(this);
    }
  }
  return {
    F: AndysTable,
    d: [{
      kind: "field",
      static: true,
      key: "styles",
      value() {
        return styles;
      }
    }, {
      kind: "field",
      decorators: [e({
        type: String
      })],
      key: "collection",
      value() {
        return '';
      }
    }, {
      kind: "field",
      decorators: [e({
        type: String
      })],
      key: "value",
      value() {
        return '';
      }
    }, {
      kind: "field",
      key: "lastEmitted",
      value() {
        return null;
      }
    }, {
      kind: "field",
      key: "userEdited",
      value() {
        return false;
      }
    }, {
      kind: "field",
      key: "tempRow",
      value() {
        return null;
      }
    }, {
      kind: "method",
      key: "firstUpdated",
      value: function firstUpdated() {
        // No se envía nada al cargar: el valor guardado solo se modifica cuando el
        // usuario pulsa Save o Delete en la tabla (evita sobrescribir lo guardado con la plantilla)
      }
    }, {
      kind: "field",
      decorators: [e({
        type: Number
      })],
      key: "maxRows",
      value() {
        return 0;
      }
    }, {
      kind: "field",
      decorators: [e({
        type: String
      })],
      key: "lockedColumns",
      value() {
        return '';
      }
    }, {
      kind: "field",
      key: "newRows",
      value() {
        return new WeakSet();
      }
    }, {
      kind: "field",
      decorators: [e({
        type: String
      })],
      key: "columnRules",
      value() {
        return '';
      }
    }, {
      kind: "field",
      decorators: [e({
        type: String
      })],
      key: "uniqueColumns",
      value() {
        return '';
      }
    }, {
      kind: "field",
      decorators: [e({
        type: String
      })],
      key: "editableRows",
      value() {
        return '';
      }
    }, {
      kind: "field",
      decorators: [e({
        type: String
      })],
      key: "currentMonthRows",
      value() {
        return 'Type:Actual';
      }
    }, {
      kind: "field",
      decorators: [e({
        type: String
      })],
      key: "yearColumn",
      value() {
        return 'Year';
      }
    }, {
      kind: "field",
      decorators: [e({
        type: String
      })],
      key: "referenceDate",
      value() {
        return '';
      }
    }, {
      kind: "field",
      decorators: [e({
        type: Number
      })],
      key: "editableMonths",
      value() {
        return null;
      }
    }, {
      kind: "field",
      decorators: [e({
        type: String
      })],
      key: "stage",
      value() {
        return '';
      }
    }, {
      kind: "field",
      decorators: [e({
        type: String
      })],
      key: "stageRules",
      value() {
        return '';
      }
    }, {
      kind: "field",
      decorators: [e({
        type: Boolean
      })],
      key: "allowDelete",
      value() {
        return true;
      }
    }, {
      kind: "field",
      key: "errors",
      value() {
        return [];
      }
    }, {
      kind: "field",
      key: "invalidFields",
      value() {
        return [];
      }
    }, {
      kind: "method",
      key: "toList",
      value: function toList(v) {
        return String(v || '').split(',').map(x => x.trim().toLowerCase()).filter(Boolean);
      }
    }, {
      kind: "method",
      key: "parseRowRule",
      value: function parseRowRule(text) {
        // Formato "Columna:valor1,valor2"  (ej. "Type:Actual,Forecast"). Vacío = sin regla
        const t = String(text || '').trim();
        const i = t.indexOf(':');
        if (i < 1) return null;
        return {
          column: t.slice(0, i).trim(),
          values: this.toList(t.slice(i + 1))
        };
      }
    }, {
      kind: "method",
      key: "cellValue",
      value: function cellValue(row, column) {
        if (!row || !column) return '';
        if (column in row) return row[column];
        const k = Object.keys(row).find(x => x.toLowerCase() === String(column).toLowerCase());
        return k ? row[k] : '';
      }
    }, {
      kind: "method",
      key: "rowMatches",
      value: function rowMatches(rule, row) {
        if (!rule) return false;
        return rule.values.includes(String(this.cellValue(row, rule.column) ?? '').trim().toLowerCase());
      }
    }, {
      kind: "method",
      key: "toMonths",
      value: function toMonths(v) {
        // Nº de meses editables (incluye el actual). Vacío, 0 o no numérico = sin límite
        const n = parseInt(v, 10);
        return n > 0 ? n : null;
      }
    }, {
      kind: "method",
      key: "effectiveRule",
      value: function effectiveRule() {
        // Por defecto todo editable. "Edición por etapa" solo restringe las etapas que aparecen en ella
        const typeCol = (this.parseRowRule(this.currentMonthRows) || {}).column || 'Type';
        const base = {
          rowRule: this.parseRowRule(this.editableRows),
          months: this.toMonths(this.editableMonths)
        };
        const stage = String(this.stage || '').trim().toLowerCase();
        const text = String(this.stageRules || '').trim();
        if (!stage || !text) return base;
        let rules;
        try {
          rules = this.parseCollection(text);
        } catch (err) {
          console.warn("NAC table: 'Edición por etapa' no es un JSON válido:", text.slice(0, 80));
          return base;
        }
        if (!rules || typeof rules !== 'object' || Array.isArray(rules)) return base;
        const keys = Object.keys(rules);
        let key = keys.find(k => k.trim().toLowerCase() === stage);
        if (key === undefined) {
          // Comodín al final: 'Submitted*' vale para 'Submitted for L3 approval'
          key = keys.find(k => k.trim().endsWith('*') && stage.startsWith(k.trim().slice(0, -1).toLowerCase()));
        }
        if (key === undefined) return base;
        const r = rules[key];
        const tipos = r && typeof r === 'object' ? r.tipos : r;
        const t = String(tipos ?? '').trim();
        let rowRule;
        if (['*', 'todo', 'todos'].includes(t.toLowerCase())) rowRule = null;
        else if (!t || t.toLowerCase() === 'ninguno') rowRule = { column: typeCol, values: [] };
        else if (t.includes(':')) rowRule = this.parseRowRule(t);
        else rowRule = { column: typeCol, values: this.toList(t) };
        const months = r && typeof r === 'object' && r.meses !== undefined ? this.toMonths(r.meses) : base.months;
        return { rowRule, months };
      }
    }, {
      kind: "method",
      key: "isRowEditable",
      value: function isRowEditable(row) {
        const rule = this.effectiveRule().rowRule;
        return !rule || this.rowMatches(rule, row);
      }
    }, {
      kind: "method",
      key: "monthIndex",
      value: function monthIndex(field) {
        const map = {
          jan: 0, ene: 0, feb: 1, mar: 2, apr: 3, abr: 3, may: 4, jun: 5,
          jul: 6, aug: 7, ago: 7, sep: 8, set: 8, oct: 9, nov: 10, dec: 11, dic: 11
        };
        const k = String(field).trim().toLowerCase().slice(0, 3);
        return k in map ? map[k] : -1;
      }
    }, {
      kind: "method",
      key: "referenceNow",
      value: function referenceNow() {
        // Fecha de referencia pasada desde Nintex; si no hay o no es válida, la fecha actual
        const raw = String(this.referenceDate || '').trim();
        if (raw) {
          const d = new Date(raw);
          if (!isNaN(d.getTime())) return d;
        }
        return new Date();
      }
    }, {
      kind: "method",
      key: "allowedMonths",
      value: function allowedMonths(count) {
        // Los últimos "count" meses incluyendo el actual, como pares "año-mes"
        const ref = this.referenceNow();
        const set = new Set();
        for (let k = 0; k < count; k++) {
          const d = new Date(ref.getFullYear(), ref.getMonth() - k, 1);
          set.add(d.getFullYear() + '-' + d.getMonth());
        }
        return set;
      }
    }, {
      kind: "method",
      key: "isMonthLocked",
      value: function isMonthLocked(row, field) {
        // "Filas limitadas al mes actual" (ej. "Type:Actual"): solo mes actual/anterior del año correspondiente
        const rule = this.parseRowRule(this.currentMonthRows);
        const m = this.monthIndex(field);
        const months = this.effectiveRule().months;
        if (!rule || m < 0 || !months) return false; // sin límite configurado: todos los meses editables
        // Fila nueva sin tipo elegido todavía: meses bloqueados hasta elegirlo
        if (!String(this.cellValue(row, rule.column) ?? '').trim()) return true;
        if (!this.rowMatches(rule, row)) return false;
        const year = String(this.cellValue(row, this.yearColumn || 'Year') ?? '').trim();
        return !this.allowedMonths(months).has(year + '-' + m);
      }
    }, {
      kind: "method",
      key: "isCellLocked",
      value: function isCellLocked(item, field, view) {
        const row = view || item;
        const f = String(field).toLowerCase();
        if (!this.newRows.has(item)) {
          if (!this.isRowEditable(item)) return true;
          if (this.toList(this.lockedColumns).includes(f) || this.toList(item._lockedCols).includes(f)) return true;
        }
        return this.isMonthLocked(row, field);
      }
    }, {
      kind: "method",
      key: "rowView",
      value: function rowView(item) {
        // Fila con los cambios en curso (para evaluar reglas mientras se edita)
        return this.tempEditRowData && this.tempRow === item ? this.tempEditRowData : item;
      }
    }, {
      kind: "method",
      key: "canEditRow",
      value: function canEditRow(item) {
        if (!item || item._locked) return false;
        if (this.newRows.has(item)) return true;
        return this.columns.some(c => !this.isCellLocked(item, c.field));
      }
    }, {
      kind: "method",
      key: "getColumnRules",
      value: function getColumnRules() {
        const t = String(this.columnRules || '').trim();
        if (!t) return {};
        try {
          const r = this.parseCollection(t);
          return r && typeof r === 'object' && !Array.isArray(r) ? r : {};
        } catch (err) {
          console.warn("NAC table: 'Reglas de columnas' no es un JSON válido:", t.slice(0, 80));
          return {};
        }
      }
    }, {
      kind: "method",
      key: "ruleFor",
      value: function ruleFor(field) {
        const rules = this.getColumnRules();
        if (field in rules) return rules[field];
        const k = Object.keys(rules).find(x => x.toLowerCase() === String(field).toLowerCase());
        return k ? rules[k] : null;
      }
    }, {
      kind: "method",
      key: "optionsFor",
      value: function optionsFor(field) {
        // Opciones del desplegable; si hay "Filas editables" sobre esta columna, solo las permitidas
        const rule = this.ruleFor(field);
        let opts = rule && Array.isArray(rule.opciones) ? rule.opciones.map(String) : null;
        if (!opts) return null;
        const er = this.effectiveRule().rowRule;
        if (er && er.column.toLowerCase() === String(field).toLowerCase()) {
          opts = opts.filter(o => er.values.includes(o.trim().toLowerCase()));
        }
        return opts;
      }
    }, {
      kind: "method",
      key: "validateRow",
      value: function validateRow(item, row) {
        const errors = [];
        const bad = new Set();
        const isNew = this.newRows.has(item);
        for (const c of this.columns) {
          const rule = this.ruleFor(c.field);
          if (!rule) continue;
          const v = String(row[c.field] ?? '').trim();
          const tipo = String(rule.tipo || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
          if (rule.obligatorio && !v) {
            errors.push(`${c.label}: es obligatorio.`);
            bad.add(c.field);
            continue;
          }
          if (['ano', 'anio', 'year'].includes(tipo)) {
            if (!/^\d{4}$/.test(v)) {
              errors.push(`${c.label}: debe ser un año de 4 cifras.`);
              bad.add(c.field);
            }
          } else if (['numero', 'number'].includes(tipo)) {
            if (v && !/^-?\d+([.,]\d+)?$/.test(v)) {
              errors.push(`${c.label}: debe ser un número.`);
              bad.add(c.field);
            }
          }
          if (Array.isArray(rule.opciones)) {
            const match = rule.opciones.map(String).find(o => o.toLowerCase() === v.toLowerCase());
            if (!match) {
              errors.push(`${c.label}: elige una opción (${rule.opciones.join(', ')}).`);
              bad.add(c.field);
            } else {
              row[c.field] = match;
            }
          }
        }
        // Filas nuevas: solo de los tipos editables en este momento
        const er = this.effectiveRule().rowRule;
        if (isNew && er && !this.rowMatches(er, row)) {
          errors.push(`No se pueden añadir filas con ${er.column} = "${this.cellValue(row, er.column) || ''}" en este momento.`);
          bad.add(er.column);
        }
        // Sin duplicados en la combinación de "Columnas únicas"
        const uc = String(this.uniqueColumns || '').split(',').map(x => x.trim()).filter(Boolean);
        if (uc.length) {
          const key = r => uc.map(col => String(this.cellValue(r, col) ?? '').trim().toLowerCase()).join('|');
          const k = key(row);
          if (uc.every(col => String(this.cellValue(row, col) ?? '').trim()) && this.data.some(other => other !== item && key(other) === k)) {
            errors.push(`Ya existe una fila con ${uc.map(col => `${col} = ${this.cellValue(row, col)}`).join(' y ')}.`);
            uc.forEach(col => bad.add(col));
          }
        }
        return { errors, bad: [...bad] };
      }
    }, {
      kind: "method",
      key: "removeUnsavedNewRow",
      value: function removeUnsavedNewRow() {
        // Una fila añadida con Add que nunca se ha guardado se elimina al descartar/salir de ella
        const item = this.selectedRow;
        if (item && this.newRows.has(item)) {
          const i = this.data.indexOf(item);
          if (i >= 0) this.data.splice(i, 1);
          this.newRows.delete(item);
          return true;
        }
        return false;
      }
    }, {
      kind: "field",
      decorators: [e({
        type: String
      })],
      key: "readonly",
      value() {
        return false;
      }
    }, {
      kind: "field",
      key: "data",
      value() {
        return [];
      }
    }, {
      kind: "field",
      key: "editCell",
      value() {
        return null;
      }
    }, {
      kind: "field",
      key: "pageData",
      value() {
        return [];
      }
    }, {
      kind: "field",
      key: "totalPages",
      value() {
        return 1;
      }
    }, {
      kind: "field",
      key: "currentPage",
      value() {
        return 1;
      }
    }, {
      kind: "field",
      key: "pageSize",
      value() {
        return 12;
      }
    }, {
      kind: "field",
      key: "searchText",
      value() {
        return "";
      }
    }, {
      kind: "field",
      key: "tableSort",
      value() {
        return {
          field: "",
          direction: "asc"
        };
      }
    }, {
      kind: "field",
      key: "selectedRow",
      value() {
        return null;
      }
    }, {
      kind: "field",
      key: "editMode",
      value() {
        return false;
      }
    }, {
      kind: "field",
      key: "tempEditRowData",
      value() {
        return null;
      }
    }, {
      kind: "get",
      key: "filteredData",
      value:
      // @property({ type: Boolean })
      // readOnly = false;
 
      function filteredData() {
        return this.data.filter(item => {
          return Object.values(item).map(val => String(val)).some(val => val.toLowerCase().includes(this.searchText.toLowerCase()));
        });
      }
    }, {
      kind: "get",
      key: "sortedData",
      value: function sortedData() {
        const {
          field,
          direction
        } = this.tableSort;
        return this.filteredData.sort((a, b) => {
          const aVal = a[field];
          const bVal = b[field];
          if (aVal < bVal) return direction === "asc" ? -1 : 1;
          if (aVal > bVal) return direction === "asc" ? 1 : -1;
          return 0;
        });
      }
    }, {
      kind: "get",
      key: "columns",
      value: function columns() {
        const sampleRow = this.data[0] || {};
        return Object.keys(sampleRow).filter(field => !field.startsWith('_')).map(field => {
          return {
            label: field,
            field: field
          };
        });
      }
    }, {
      kind: "method",
      key: "updated",
      value: function updated(changedProps) {
        // 1) Datos guardados (valor del control que Nintex restaura al editar) tienen prioridad
        if (this.userEdited) return; // lo que el usuario ha editado no se sobrescribe
        // Solo cuenta como guardado si es JSON de verdad (Nintex puede pasar "__splf_Campo" sin resolver)
        const saved = this.usableJson(this.value);
        if (changedProps.has("value") && saved && saved !== this.lastEmitted) {
          try {
            const parsed = this.parseCollection(saved);
            if (Array.isArray(parsed) && parsed.length) {
              this.data = parsed;
              this.lastEmitted = saved;
              this.unselect();
              this.updatePageData();
              return;
            }
          } catch (e) {
            console.error("Error parsing saved value: ", e);
          }
        }
        // 2) Si ya hay datos guardados, la plantilla (JSONData) no los sobrescribe
        if (changedProps.has("collection") && saved && this.data.length) return;
        if (changedProps.has("collection")) {
          const template = this.usableJson(this.collection);
          if (!template) {
            if (this.collection) console.warn("NAC table: JSONData no es un JSON válido (¿referencia de Nintex sin resolver?):", String(this.collection).slice(0, 60));
            return;
          }
          try {
            this.data = this.parseCollection(template);
            this.updatePageData();
          } catch (e) {
            console.error("Error parsing table data: ", e);
          }
        }
      }
    }, {
      kind: "method",
      key: "usableJson",
      value: function usableJson(text) {
        // Devuelve el texto solo si parece JSON (empieza por [ o {); si no, cadena vacía
        const t = typeof text === "string" ? text.trim() : "";
        return /^[\[{]/.test(t) ? t : "";
      }
    }, {
      kind: "method",
      key: "parseCollection",
      value: function parseCollection(text) {
        const raw = String(text || '').trim();
        if (!raw) return [];
        try {
          return JSON.parse(raw);
        } catch (err) {
          // Permite JSON escrito con comillas simples (necesario en fórmulas de Nintex)
          return JSON.parse(raw.replace(/'/g, '"'));
        }
      }
    }, {
      kind: "method",
      static: true,
      key: "getMetaConfig",
      value: function getMetaConfig() {
        return import('./nac-table.config-v3.js').then(x => x.config);
      }
    }, {
      kind: "method",
      key: "unselect",
      value: function unselect() {
        this.selectedRow = null;
        this.editMode = false;
        this.tempEditRowData = null;
        this.editCell = null;
      }
    }, {
      kind: "method",
      key: "onSortClick",
      value: function onSortClick(field) {
        const {
          direction
        } = this.tableSort;
        this.unselect();
        if (this.tableSort.field === field) {
          this.tableSort.direction = direction === "asc" ? "desc" : "asc";
        } else {
          this.tableSort = {
            field: field,
            direction: "asc"
          };
        }
        this.currentPage = 1;
        this.updatePageData();
      }
    }, {
      kind: "method",
      key: "onPageChange",
      value: function onPageChange(page) {
        this.unselect();
        if (page >= 1 && page <= this.totalPages) {
          this.currentPage = page;
          this.updatePageData();
        }
      }
 
      // Handle edit event for a cell
    }, {
      kind: "method",
      key: "onCellEdit",
      value: function onCellEdit({
        field,
        value
      }) {
        if (this.editCell && this.selectedRow) {
          const found = this.tempEditRowData && this.tempRow === this.selectedRow ? this.tempEditRowData : this.selectedRow;
          this.tempRow = this.selectedRow;
          const editedRow = {
            ...found
          };
          editedRow[field] = value;
          this.tempEditRowData = editedRow;
          this.requestUpdate();
        }
      }
    }, {
      kind: "method",
      key: "render",
      value: function render() {
        return y`
      <div class="top-panel">
        ${this.renderSearch()} ${this.readonly ? null : this.renderToolbar()}
      </div>
      <br />
      ${this.errors.length ? y`<div class="error-msg" role="alert">
            <strong>No se puede guardar la fila:</strong>
            <ul>${this.errors.map(m => y`<li>${m}</li>`)}</ul>
          </div>` : null}
      ${this.renderTable()}
    `;
      }
    }, {
      kind: "method",
      key: "renderSearch",
      value: function renderSearch() {
        return y`<div class="search-wrapper">
      <svg
        class="search-icon"
        height="24px"
        width="24px"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path
          d="M9.5,4C13.09,4 16,6.91 16,10.5C16,12.12 15.41,13.6 14.43,14.73L20.08,20.38L19.37,21.09L13.72,15.44C12.59,16.41 11.11,17 9.5,17C5.91,17 3,14.09 3,10.5C3,6.91 5.91,4 9.5,4M9.5,5C6.46,5 4,7.46 4,10.5C4,13.54 6.46,16 9.5,16C12.54,16 15,13.54 15,10.5C15,7.46 12.54,5 9.5,5Z"
        />
      </svg>
      <input
        class="search-input input-styled"
        id="search-input"
        placeholder="Search..."
 
        @input=${event => {
          this.searchText = event.target.value;
          this.updatePageData();
        }}
      />
    </div> `;
      }
    }, {
      kind: "method",
      key: "renderToolbar",
      value: function renderToolbar() {
        return y`
      <lit-toolbar-v3
        @add-row="${this.onAddRow}"
        @edit-row="${this.onEditRow}"
        @delete-row="${this.onDeleteRow}"
        @save-row="${this.onSaveRow}"
        @discard-row="${this.onDiscardRow}"
        .editMode="${this.editMode}"
        .hasSelectedRow="${!!this.selectedRow}"
        .canAdd="${!this.editMode && (!this.maxRows || this.data.length < this.maxRows) && !((r => r && !r.values.length)(this.effectiveRule().rowRule))}"
        .canEdit="${this.canEditRow(this.selectedRow)}"
        .canDelete="${this.allowDelete !== false && String(this.allowDelete) !== 'false'}"
      ></lit-toolbar-v3>
    `;
      }
    }, {
      kind: "method",
      key: "renderTable",
      value: function renderTable() {
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        this.pageData = this.sortedData.slice(start, end);
        return y`
 
      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              
              ${this.columns.map(column => y`
                  <th @click="${() => this.onSortClick(column.field)}">
                    ${y`<span class="flex-item">
                      ${column.label}
                      ${this.tableSort.direction === "asc" ? y`<svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            height="18px"
                            width="18px"
                            opacity="0"
                            class="margin-left-4 ${this.tableSort.field === column.field ? "opacity" : ""}"
                          >
                            <path
                              d="M11,4H13V16L18.5,10.5L19.92,11.92L12,19.84L4.08,11.92L5.5,10.5L11,16V4Z"
                            />
                          </svg>` : y`<svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            height="18px"
                            width="18px"
                            opacity="0"
                            class="margin-left-4 dsc ${this.tableSort.field === column.field ? "opacity" : ""}"
                          >
                            <path
                              d="M11,4H13V16L18.5,10.5L19.92,11.92L12,19.84L4.08,11.92L5.5,10.5L11,16V4Z"
                            />
                          </svg>`}
                    </span>`}
                  </th>
                `)}
            </tr>
          </thead>
          <tbody>
            ${this.pageData.map(item => y`
              
                <tr
                  @click="${() => {
          if (this.readonly || item._locked) return;
          if (this.editMode && this.selectedRow !== item) {
            this.removeUnsavedNewRow();
            this.unselect();
            this.errors = [];
            this.updatePageData();
          }
          if (this.selectedRow === item && !this.editMode) {
            this.selectedRow = null;
          } else {
            this.selectedRow = item;
          }
          this.requestUpdate();
        }}"
                  class="table-row ${item._locked ? "locked" : ""} ${this.editMode && this.selectedRow === item ? "edit" : ""} ${this.selectedRow === item ? "selected" : ""}"
                >
                  ${this.columns.map(column => {
          const editing = this.editMode && this.selectedRow === item;
          const view = editing ? this.rowView(item) : item;
          const locked = this.isCellLocked(item, column.field, view);
          const opts = editing && !locked ? this.optionsFor(column.field) : null;
          const tdClass = (editing && this.invalidFields.includes(column.field) ? "invalid " : "") + (editing && locked && this.monthIndex(column.field) >= 0 ? "month-locked" : "");
          return y`
                      <td class="${tdClass}">
                        ${editing && !locked && opts ? y`<select
                              class="table-cell-input input-styled"
                              @focus="${() => {
            this.editCell = { columnName: column.field, row: item };
          }}"
                              @change="${event => {
            this.editCell = { columnName: column.field, row: item };
            this.onCellEdit({ field: column.field, value: event.target.value });
          }}"
                            >
                              <option value="" ?selected="${!view[column.field]}"></option>
                              ${opts.map(o => y`<option value="${o}" ?selected="${String(view[column.field] ?? '').toLowerCase() === o.toLowerCase()}">${o}</option>`)}
                            </select>` : editing && !locked ? y`<input
                              type="text"
                              .value="${item[column.field] ?? ''}"
                              class="table-cell-input input-styled"
                              @input="${event => this.onCellEdit({
          field: column.field,
          value: event.target.value
        })}"
                              @focus="${() => {
          this.editCell = {
            columnName: column.field,
            row: item
          };
          this.requestUpdate();
        }}"
                              @blur="${() => {
          if (this.editCell?.row === item) {
            this.editCell = {
              columnName: column.field,
              row: item
            };
            this.requestUpdate();
          }
        }}"
                              ?disabled=${!!this.readonly}
                            />` : y`<span class="table-cell-value ${locked ? "locked-cell" : ""}"
                              >${item[column.field]}</span
                            >`}
                      </td>
                    `;
        })}
                </tr>
              `)}
          </tbody>
        </table>
      </div>
      ${this.onLoad(this.collection)}                    
      ${this.totalPages > 1 ? this.renderPagination() : null}
      
    `;
      }
    }, {
      kind: "method",
      key: "renderPagination",
      value: function renderPagination() {
        const start = (this.currentPage - 1) * this.pageSize + 1;
        const end = Math.min(start + this.pageSize - 1, this.filteredData.length);
        const total = this.filteredData.length;
        return y`
      <div class="pagination">
        <span class="pagination-total">${start}-${end} of ${total}</span>
        <button
          class="pagination-button"
          @click="${() => this.onPageChange(1)}"
          ?disabled="${this.currentPage === 1}"
        >
          <svg
            height="24px"
            width="24px"
            fill="currentColor"
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
          >
            <path
              d="M18.41 16.59 13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z"
            ></path>
          </svg>
        </button>
        <button
          class="pagination-button"
          @click="${() => this.onPageChange(this.currentPage - 1)}"
          ?disabled="${this.currentPage === 1}"
        >
          <svg
            height="24px"
            width="24px"
            fill="currentColor"
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
          >
            <path
              d="M15.41 16.59 10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"
            ></path>
          </svg>
        </button>
        <button
          class="pagination-button"
          @click="${() => this.onPageChange(this.currentPage + 1)}"
          ?disabled="${this.currentPage === this.totalPages}"
        >
          <svg
            height="24px"
            width="24px"
            fill="currentColor"
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
          >
            <path
              d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"
            ></path>
          </svg>
        </button>
        <button
          class="pagination-button"
          @click="${() => this.onPageChange(this.totalPages)}"
          ?disabled="${this.currentPage === this.totalPages}"
        >
          <svg
            height="24px"
            width="24px"
            fill="currentColor"
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
          >
            <path
              d="M5.59 7.41 10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z"
            ></path>
          </svg>
        </button>
      </div>
      <script>
        
  const nacTable = document.querySelector("andys-table-v3");
 
  
</script>
    `;
      }
    }, {
      kind: "method",
      key: "saveSelectedRow",
      value: function saveSelectedRow() {
        if (!this.selectedRow) return;
        const editedRow = this.data.find(item => item === this.selectedRow);
        if (editedRow) {
          Object.assign(editedRow, this.tempEditRowData);
          this.dispatchEvent(new CustomEvent("change", {
            detail: {
              collection: JSON.stringify(this.data)
            }
          }));
        }
      }
    }, {
      kind: "method",
      key: "updatePageData",
      value: function updatePageData() {
        this.totalPages = Math.ceil(this.filteredData.length / this.pageSize);
        if (this.currentPage > this.totalPages) {
          this.currentPage = this.totalPages;
        }
        if (this.totalPages < 1) {
          this.currentPage = 1;
        }
        this.requestUpdate();
      }
    }, {
      kind: "method",
      key: "onAddRow",
      value: function onAddRow() {
        if (this.maxRows && this.data.length >= this.maxRows) return;
        this.searchText = "";
        this.tableSort = {
          field: "",
          direction: "asc"
        };
        const searchInput = this.shadowRoot?.querySelector("#search-input");
        if (searchInput) searchInput.value = "";
        this.updatePageData();
        this.errors = [];
        this.invalidFields = [];
        const newRow = {};
        this.columns.forEach(column => newRow[column.field] = "");
        this.userEdited = true;
        this.newRows.add(newRow);
        this.data.push(newRow);
        this.selectedRow = newRow;
        this.editMode = true;
        this.editCell = null;
        this.updatePageData();
        this.currentPage = this.totalPages;
        this.focusInputOnEdit();
      }
    }, {
      kind: "method",
      key: "onEditRow",
      value: function onEditRow() {
        if (this.selectedRow && this.canEditRow(this.selectedRow)) {
          this.errors = [];
          this.invalidFields = [];
          this.tempEditRowData = null;
          this.tempRow = null;
          this.editMode = true;
          this.editCell = {
            columnName: "",
            row: this.selectedRow
          };
          this.requestUpdate();
          this.focusInputOnEdit();
        }
      }
    }, {
      kind: "method",
      key: "onDeleteRow",
      value: function onDeleteRow() {
        if (this.allowDelete === false || String(this.allowDelete) === 'false') return;
        if (this.selectedRow) {
          this.userEdited = true;
          const index = this.data.indexOf(this.selectedRow);
          this.data.splice(index, 1);
          this.unselect();
          this.updatePageData();
          this.dispatchEvent(new CustomEvent("change", {
            detail: {
              collection: JSON.stringify(this.data)
            }
          }));
          this.onChange(this.data);
        }
      }
    }, {
      kind: "method",
      key: "onSaveRow",
      value: function onSaveRow() {
        if (!this.selectedRow) return;
        if (this.editMode) {
          const item = this.selectedRow;
          const candidate = this.rowView(item);
          // Solo se aceptan los cambios de celdas editables según las reglas
          const finalRow = { ...item };
          this.columns.forEach(c => {
            if (!this.isCellLocked(item, c.field, candidate)) finalRow[c.field] = candidate[c.field];
          });
          const check = this.validateRow(item, finalRow);
          if (check.errors.length) {
            this.errors = check.errors;
            this.invalidFields = check.bad;
            this.requestUpdate();
            return;
          }
          this.errors = [];
          this.invalidFields = [];
          this.tempEditRowData = finalRow;
          this.tempRow = item;
          this.newRows.delete(item); // tras guardar, Year/Type (columnas bloqueadas) ya no se pueden cambiar
          this.editMode = false;
          this.saveSelectedRow();
          this.tempEditRowData = null;
          this.tempRow = null;
          this.userEdited = true;
          this.unselect(); // la fila deja de quedar marcada tras guardar
          this.updatePageData();
          this.onChange(this.data);
        }
      }
    }, {
      kind: "method",
      key: "onDiscardRow",
      value: function onDiscardRow() {
        this.errors = [];
        this.invalidFields = [];
        if (this.removeUnsavedNewRow()) {
          this.unselect();
          this.updatePageData();
          return;
        }
        if (this.selectedRow) {
          const editedRow = this.pageData.find(item => item === this.selectedRow);
          if (editedRow) {
            this.tempEditRowData = null;
            this.tempRow = null;
            this.editMode = false;
            this.editCell = null;
            this.requestUpdate();
            this.onChange(this.data);
          }
        }
      }
    }, {
      kind: "method",
      key: "onChange",
      value: function onChange(e) {
        const value = typeof e === "string" ? e : JSON.stringify(e);
        this.lastEmitted = value;
        const args = {
          bubbles: true,
          cancelable: false,
          composed: true,
          detail: value
        };
        const event = new CustomEvent('ntx-value-change', args);
        this.dispatchEvent(event);
      }
    }, {
      kind: "method",
      key: "onLoad",
      value: function onLoad(e) {
        // Ya no envía el texto en bruto de JSONData (ver firstUpdated)
      }
    }, {
      kind: "method",
      key: "focusInputOnEdit",
      value: function focusInputOnEdit() {
        setTimeout(() => {
          const inputElement = this.shadowRoot?.querySelector(".selected")?.querySelector("input");
          if (inputElement) inputElement.focus();
        }, 50);
      }
    }]
  };
}, s);
 
export { AndysTable };
