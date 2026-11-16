const config = {
  controlName: 'Milestones table',
  description: 'Tabla editable de milestones (nombre, tipo, estado y fecha) con reglas de obligatoriedad y solo lectura por etapa',
  groupName: 'Presales Controls',
  fallbackDisableSubmit: false,
  standardProperties: {
    readOnly: true,
    required: true,
    description: true
  },
  version: '1.1',
  properties: {
    stage: {
      type: 'string',
      title: 'Etapa actual (enlazar al campo de etapa)'
    },
    controlField: {
      type: 'string',
      title: 'Campo de control 1 (enlazar a cualquier campo; en las reglas se llama "campo")'
    },
    controlField2: {
      type: 'string',
      title: 'Campo de control 2 (enlazar a cualquier campo; en las reglas se llama "campo2")'
    },
    tableRules: {
      type: 'string',
      title: "Reglas de tabla (JSON). Ej: [{'cuando':{'campo':['Yes']},'filas':{'Type':['Health']}}]"
    },
    requiredRules: {
      type: 'string',
      title: "Reglas de obligatorio (JSON). Ej: {'CompletionDate':{'si':{'Status':['Completed']}},'Type':{'etapa':['L2*','L3*']}}"
    },
    minRows: {
      type: 'string',
      title: "Mínimo de milestones (número o JSON por etapa). Ej: 1  o  {'L2*':1,'L3*':2}"
    },
    stageRules: {
      type: 'string',
      title: "Read only por etapa (JSON). Ej: {'L3*':['Type'],'Submitted*':'Todo'}"
    },
    lockedStatuses: {
      type: 'string',
      title: 'Estados que bloquean la fila (separados por ;). Ej: Completed; Cancelled'
    },
    dateFormat: {
      type: 'string',
      title: 'Formato de fecha mostrado (dd/mm/yyyy, mm/dd/yyyy o yyyy-mm-dd)',
      defaultValue: 'dd/mm/yyyy'
    },
    allowDelete: {
      type: 'boolean',
      title: 'Permitir eliminar filas',
      defaultValue: true
    },
    value: {
      type: 'string',
      title: 'updatedJson',
      isValueField: true
    }
  }
};

export { config };
