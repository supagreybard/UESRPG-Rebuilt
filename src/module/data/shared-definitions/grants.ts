import { GRANT_TYPES } from "../../config/constants";
import { defineParameter } from "./parameters";
const fields = foundry.data.fields;

export const defineGrant = () => ({
    type: new fields.StringField({ required: true, choices: Object.keys(GRANT_TYPES) }),
    slug: new fields.StringField({ required: true }),
    optionGroup: new fields.StringField(),
    parameters: new fields.ArrayField(new fields.SchemaField(defineParameter()))
});

