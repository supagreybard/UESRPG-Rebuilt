import { BaseItemData } from './BaseItemData';

const fields = foundry.data.fields;

export class BaseInventoryItem extends BaseItemData {
  static defineSchema() {
    return {
      ...super.defineSchema(),
      quantity: new fields.NumberField({ initial: 1, integer: true, min: 0 }),
      encumbrance: new fields.NumberField({ initial: 0, min: 0 }),
    };
  }
}
