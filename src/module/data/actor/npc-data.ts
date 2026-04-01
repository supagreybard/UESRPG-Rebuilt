import { BaseActorData } from './base-actor-data';

const fields = foundry.data.fields;

export class NPCData extends BaseActorData {
  static defineSchema() {
    return {
      ...super.defineSchema(),
      characteristics: new fields.SchemaField({
        strength: new fields.NumberField({ initial: 0, integer: true }),
        endurance: new fields.NumberField({ initial: 0, integer: true }),
        agility: new fields.NumberField({ initial: 0, integer: true }),
        intelligence: new fields.NumberField({ initial: 0, integer: true }),
        willpower: new fields.NumberField({ initial: 0, integer: true }),
        perception: new fields.NumberField({ initial: 0, integer: true }),
        personality: new fields.NumberField({ initial: 0, integer: true }),
        luck: new fields.NumberField({ initial: 0, integer: true }),
      }),
      details: new fields.SchemaField({
        notes: new fields.HTMLField({ initial: '' }),
        role: new fields.StringField({ initial: 'minion', blank: false }),
      }),
    };
  }
}
