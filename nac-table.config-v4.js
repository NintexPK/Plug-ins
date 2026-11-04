const config = {
  controlName: 'Nac table v4',
  description: 'Tabla editable para NAC con reglas y comprobación Forecast vs Annualized (v4)',
  groupName: 'Presales Controls',
  fallbackDisableSubmit: false,
  standardProperties: {
    readOnly: true,
    required: false,
    description: true
  },
  version: '4.3',
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
      title: 'Etapa actual'
    },
    stageRules: {
      type: 'string',
      title: "Read only por etapa y fila (JSON). Ej: {'L1*':'Actual','L3*':'Forecast','Submitted*':'Todo'}"
    },
    annualized: {
      type: 'integer',
      title: 'Annualized (enlazar al campo Annualized de la fila)'
    },
    rowType: {
      type: 'string',
      title: 'Tipo de fila (enlazar al campo tipo: Recurring benefits...)'
    },
    recurringTypes: {
      type: 'string',
      title: 'Recurring benefits; Recurring negative impacts'
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
