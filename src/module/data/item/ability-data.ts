import { BaseItemData } from './base-item-data';

const fields = foundry.data.fields;

export class AbilityData extends BaseItemData {
  static defineSchema() {
    return {
      ...super.defineSchema(),
      cost: new fields.NumberField({ initial: 0, integer: true, min: 0 }),
      cooldown: new fields.NumberField({ initial: 0, integer: true, min: 0 }),
    };
  }
}
