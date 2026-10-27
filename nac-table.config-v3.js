const config = {
  controlName: 'Nac table v3',
  description: 'Tabla editable para NAC con reglas (v3)',
  groupName: 'Presales Controls',
  fallbackDisableSubmit: false,
  standardProperties: {
    readOnly: false,
    required: false,
    description: true
  },
  version: '3.0',
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
    uniqueColumns: {
      type: 'string',
      title: 'Columnas que no se pueden repetir juntas (ej. Year,Type)'
    },
    stage: {
      type: 'string',
      title: 'Etapa actual (enlazar al campo de etapa)'
    },
    stageRules: {
      type: 'string',
      title: "Edición por etapa (JSON). Ej: {'L0':'Ninguno','L1':'Ninguno','L2':'Forecast','L3':'Actual','Submitted*':'Ninguno'}. Etapas no indicadas = todo editable"
    },
    editableMonths: {
      type: 'integer',
      title: 'Meses editables de Actual, incluido el actual (vacío = sin límite)'
    },
    currentMonthRows: {
      type: 'string',
      title: 'Filas a las que se aplica el límite de meses (Columna:valores)',
      defaultValue: 'Type:Actual'
    },
    editableRows: {
      type: 'string',
      title: 'Filas editables si no hay regla de etapa (Columna:valores). Vacío = todas'
    },
    yearColumn: {
      type: 'string',
      title: 'Columna del año',
      defaultValue: 'Year'
    },
    referenceDate: {
      type: 'string',
      title: 'Fecha de referencia (vacío = hoy)'
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
