const config = {
  controlName: 'Nac Table v2',
  description: 'Editable Table for NAC',
  groupName: 'Presales Controls',
  fallbackDisableSubmit: false,
  standardProperties: {
    readOnly: false,
    required: false,
    description: true
  },
  version: '1.2',
  properties: {
    collection: {
      type: 'string',
      title: 'JSONData to be surfaced or displayed'
    },
    maxRows: {
      type: 'integer',
      title: 'Máximo de filas (0 = sin límite)',
      defaultValue: 0
    },
    lockedColumns: {
      type: 'string',
      title: 'Columnas bloqueadas (separadas por comas)'
    },
    value: {
      type: 'string',
      title: 'updatedJson',
      isValueField: true
    }
  }
};

export { config };
