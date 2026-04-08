import { PARAMETER_TYPES } from '../../config/constants';

const fields = foundry.data.fields;

export const defineParameter = () => ({
    type: new fields.StringField({
        choices: Object.keys(PARAMETER_TYPES),
        initial: PARAMETER_TYPES.text,
        required: true,
    }),
    value: new fields.StringField({ initial: '' }),
});
