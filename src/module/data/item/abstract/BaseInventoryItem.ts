import type { NumberField } from '../../util/fields';

import { BaseItemData, BaseItemSchema } from './BaseItemData';

const fields = foundry.data.fields;

export interface BaseInventoryItemSchema extends BaseItemSchema {
    quantity: NumberField;
    encumbrance: NumberField;
}

export class BaseInventoryItemData extends BaseItemData<BaseInventoryItemSchema> {
    static defineSchema() {
        return {
            ...super.defineSchema(),
            quantity: new fields.NumberField({ initial: 1, integer: true, min: 0 }),
            encumbrance: new fields.NumberField({ initial: 0, min: 0 }),
        };
    }
}
