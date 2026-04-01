import { BaseItemData } from './base-item-data';

const fields = foundry.data.fields;

export class GearData extends BaseItemData {
  static defineSchema() {
    return {
      ...super.defineSchema(),
      equipped: new fields.BooleanField({ initial: false }),
    };
  }
}
