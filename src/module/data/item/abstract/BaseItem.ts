import type { DataSchema, SchemaField, StringField } from "../../util/fields";

const fields = foundry.data.fields;

export interface ProseSchema extends DataSchema {
    description: StringField;
    flavorText: StringField;
    notes: StringField;
}

export interface BaseItemSchema extends DataSchema {
    prose: SchemaField<ProseSchema>;
    slug: StringField;
    source: StringField;
};

export class BaseItemData<T extends DataSchema | undefined> extends foundry.abstract.TypeDataModel<
    BaseItemSchema & T,
    Item.Implementation
> {
    static defineSchema() {
        return {
            ...super.defineSchema(),
            prose: new fields.SchemaField({
                description: new fields.HTMLField({ initial: '' }),
                flavorText: new fields.StringField({ initial: '' }),
                notes: new fields.HTMLField({ initial: '' }),
            }),
            slug: new fields.StringField(),
            source: new fields.StringField(),
        };
    }
}
