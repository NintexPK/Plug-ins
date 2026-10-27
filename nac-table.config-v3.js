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
  version: '3.2',
  properties: {
    collection: {
      type: 'string',
      title: 'JSONData (plantilla)'
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
      title: "Read only por etapa y fila (JSON). Ej: {'L1*':'Actual','L3*':'Forecast','Submitted*':'Todo'}"
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
