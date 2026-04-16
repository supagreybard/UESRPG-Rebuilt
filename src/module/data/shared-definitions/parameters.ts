import { PARAMETER_TYPES } from '../../config/constants';

const fields = foundry.data.fields;

export const defineParameter = () => ({
  id: new fields.StringField({
    required: true,
    initial: () => foundry.utils.randomID(),
  }),
  type: new fields.StringField({
    choices: Object.keys(PARAMETER_TYPES),
    initial: PARAMETER_TYPES.text,
    required: true,
  }),
  value: new fields.StringField({ initial: '' }),
});
