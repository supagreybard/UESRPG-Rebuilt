import { GRANT_TYPES } from '../../config/constants';

const fields = foundry.data.fields;

const defineGrantParameterOverride = () => ({
  id: new fields.StringField({
    required: true,
  }),
  value: new fields.StringField({ initial: '' }),
});

export const defineGrant = () => ({
  type: new fields.StringField({
    required: true,
    choices: Object.keys(GRANT_TYPES),
  }),
  slug: new fields.StringField({
    required: false,
    nullable: true,
    initial: null,
  }),
  sourceUuid: new fields.StringField({
    required: false,
    nullable: true,
    initial: null,
  }),
  sourceName: new fields.StringField({
    required: false,
    nullable: true,
    initial: null,
  }),
  optionGroup: new fields.StringField({
    required: false,
    nullable: true,
    initial: null,
  }),
  parameters: new fields.ArrayField(
    new fields.SchemaField(defineGrantParameterOverride()),
    {
      initial: [],
    },
  ),
});
