const config = {
  controlName: 'Nac Table',
  description: 'Editable Table for NAC',
  groupName: 'Presales Controls',
  fallbackDisableSubmit: false,
  standardProperties: {
    readOnly: false,
    required: false,
    description: true
  },
  version: '1.1',
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
    value: {
      type: 'string',
      title: 'updatedJson',
      isValueField: true
    }
  }
};
export { config };
