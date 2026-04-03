import { BaseInventoryItem } from './BaseInventoryItem';

const fields = foundry.data.fields;

export class GearData extends BaseInventoryItem {
  static defineSchema() {
    return {
      ...super.defineSchema(),
      equipped: new fields.BooleanField({ initial: false }),
    };
  }
}
