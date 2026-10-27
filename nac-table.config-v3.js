const config = {
  controlName: 'Nac table v3',
  description: 'Tabla editable para NAC con reglas (v3)',
  groupName: 'Presales Controls',
  fallbackDisableSubmit: false,
  standardProperties: {
    readOnly: true,
    required: false,
    description: true
  },
  version: '3.1',
  properties: {
    collection: {
      type: 'string',
      title: 'JSONData (plantilla)'
    },
    maxRows: {
      type: 'integer',
      title: 'Máximo de filas (0 = sin límite)',
      defaultValue: 0
    },
    lockedColumns: {
      type: 'string',
      title: 'Columnas solo editables al crear la fila (separadas por comas)'
    },
    columnRules: {
      type: 'string',
      title: "Reglas de columnas (JSON). Ej: {'Year':{'tipo':'año'},'Type':{'opciones':['Actual','Forecast']}}"
    },
    stage: {
      type: 'string',
      title: 'Etapa actual (enlazar al campo de etapa)'
    },
    stageRules: {
      type: 'string',
      title: "Solo lectura por etapa (JSON). Ej: {'L0*':'Todo','L1*':'Todo','L2*':'Actual','L3*':'Forecast','Submitted*':'Todo'}. Etapas no indicadas = todo editable"
    },
    editableMonths: {
      type: 'integer',
      title: 'Nº de meses editables Actual (incluido el actual)'
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
