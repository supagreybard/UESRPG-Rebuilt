import { defineBaseCharacteristics } from '../shared/characteristics';
import { defineGrant } from '../shared/grants';
import { BaseRuleItemData } from './abstract/BaseRuleItem';

const fields = foundry.data.fields;

export class RaceData extends BaseRuleItemData {
    static defineSchema() {
        return {
            ...super.defineSchema(),
            characteristics: new fields.SchemaField(defineBaseCharacteristics(), { required: true }),
            grants: new fields.ArrayField(new fields.SchemaField(defineGrant())),
        };
    }
}
