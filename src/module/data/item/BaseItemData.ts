const fields = foundry.data.fields;

export class BaseItemData extends foundry.abstract.TypeDataModel<
  any,
  Item.Implementation
> {
  static defineSchema() {
    return {
      prose: new fields.SchemaField({
        description: new fields.HTMLField({ initial: '' }),
        flavorText: new fields.StringField({ initial: '' }),
        notes: new fields.HTMLField({ initial: '' }),
      }),
    };
  }
}
