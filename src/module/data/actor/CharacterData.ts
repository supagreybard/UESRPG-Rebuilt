import { BaseActorData } from './BaseActorData';

const fields = foundry.data.fields;

export class CharacterData extends BaseActorData {
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
      experience: new fields.NumberField({ initial: 0, integer: true, min: 0 }),
    };
  }
}
