import type { BooleanField, NumberField } from '../../util/fields';

import { BaseItemData, BaseItemSchema } from './BaseItem';

const fields = foundry.data.fields;

export interface BaseInventoryItemSchema extends BaseItemSchema {
    quantity: NumberField;
    encumbrance: NumberField;
    equipped: BooleanField;
}

export class BaseInventoryItemData extends BaseItemData<BaseInventoryItemSchema> {
    static defineSchema() {
        return {
            ...super.defineSchema(),
            quantity: new fields.NumberField({ initial: 1, integer: true, min: 0 }),
            encumbrance: new fields.NumberField({ initial: 0, min: 0 }),
            equipped: new fields.BooleanField({ initial: false }),
        };
    }
}
