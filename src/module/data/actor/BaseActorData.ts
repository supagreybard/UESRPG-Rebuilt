const fields = foundry.data.fields;

export class BaseActorData extends foundry.abstract.TypeDataModel<
  any,
  Actor.Implementation
> {
  static defineSchema() {
    return {
      resources: new fields.SchemaField({
        health: new fields.SchemaField({
          value: new fields.NumberField({ initial: 10, integer: true, min: 0 }),
          max: new fields.NumberField({ initial: 10, integer: true, min: 0 }),
        }),
        stamina: new fields.SchemaField({
          value: new fields.NumberField({ initial: 5, integer: true, min: 0 }),
          max: new fields.NumberField({ initial: 5, integer: true, min: 0 }),
        }),
        magicka: new fields.SchemaField({
          value: new fields.NumberField({ initial: 5, integer: true, min: 0 }),
          max: new fields.NumberField({ initial: 5, integer: true, min: 0 }),
        }),
      }),
      prose: new fields.SchemaField({
        description: new fields.HTMLField({ initial: '' }),
        flavorText: new fields.StringField({ initial: '' }),
        notes: new fields.HTMLField({ initial: '' }),
      }),
    };
  }
}
