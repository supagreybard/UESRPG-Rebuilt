import { GRANT_TYPES } from "../../config/constants";
const fields = foundry.data.fields;

export const defineGrant = () => ({
    type: new fields.StringField({ required: true, choices: Object.keys(GRANT_TYPES) }),
    slug: new fields.StringField({ required: true }),
    optionGroup: new fields.StringField(),
});

