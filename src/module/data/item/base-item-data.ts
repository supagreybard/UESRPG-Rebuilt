const fields = foundry.data.fields;

export class BaseItemData extends foundry.abstract.TypeDataModel<any, Item.Implementation> {
  static defineSchema() {
    return {
      description: new fields.HTMLField({ initial: '' }),
      quantity: new fields.NumberField({ initial: 1, integer: true, min: 0 }),
      weight: new fields.NumberField({ initial: 0, min: 0 }),
    };
  }
}
