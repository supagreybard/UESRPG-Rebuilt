export type DataSchema = foundry.data.fields.DataSchema;
export type DataField = foundry.data.fields.DataField.Any;

export type StringField = foundry.data.fields.StringField;
export type HTMLField = foundry.data.fields.HTMLField;
export type NumberField = foundry.data.fields.NumberField;
export type JavaScriptField = foundry.data.fields.JavaScriptField;

export type SchemaField<T extends DataSchema> = foundry.data.fields.SchemaField<T>;
export type ArrayField<T extends DataField> = foundry.data.fields.ArrayField<T>;
