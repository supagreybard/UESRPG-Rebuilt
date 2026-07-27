import { BaseItemData } from '../abstract/BaseItem';

// const fields = foundry.data.fields;

export class WeaponQualityData extends BaseItemData {
    static defineSchema() {
        return {
            ...super.defineSchema(),
        };
    }
}
