const config = {
  controlName: 'Milestones table',
  description: 'Tabla editable de milestones (nombre, descripción, tipo, estado y fecha) con reglas de obligatoriedad y solo lectura por etapa',
  groupName: 'Presales Controls',
  fallbackDisableSubmit: false,
  standardProperties: {
    readOnly: true,
    required: false,
    description: true
  },
  version: '1.1',
  properties: {
    stage: {
      type: 'string',
      title: 'Etapa actual (enlazar)'
    },
    controlField: {
      type: 'string',
      title: 'Campo de control 1 (Pass to L3)'
    },
    controlField2: {
      type: 'string',
      title: 'Campo de control 2 (Pass to L4)'
    },
    tableRules: {
      type: 'string',
      title: "Reglas de tabla (JSON). Ej: [{'cuando':{'campo':['Yes']},'filas':{'Type':['Health']}}]"
    },
    requiredRules: {
      type: 'string',
      title: "Reglas de obligatorio (JSON). Ej: {'CompletionDate':{'si':{'Status':['Completed']}},'Type':{'etapa':['L2*','L3*']}}"
    },
    stageRules: {
      type: 'string',
      title: "Read only por etapa (JSON). Ej: {'L3*':['Type'],'Submitted*':'Todo'}"
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
