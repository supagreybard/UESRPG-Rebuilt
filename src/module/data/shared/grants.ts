import { GRANT_TYPES } from '../../config/constants';
import { defineParameterOverride } from './parameters';

const fields = foundry.data.fields;

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
        new fields.SchemaField(defineParameterOverride()),
        {
            initial: [],
        },
    ),
});
