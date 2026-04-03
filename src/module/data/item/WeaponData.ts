import { BaseInventoryItem } from './BaseInventoryItem';

const fields = foundry.data.fields;

export class WeaponData extends BaseInventoryItem {
  static defineSchema() {
    return {
      ...super.defineSchema(),
      damage: new fields.StringField({ initial: '1d6', blank: false }),
      range: new fields.StringField({ initial: 'melee', blank: false }),
    };
  }
}
